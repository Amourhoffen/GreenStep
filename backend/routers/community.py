"""Community router — Feed, leaderboard, stats with JSON file persistence"""
import uuid
import json
import os
from datetime import datetime, timezone
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from services.gemini_service import generate_community_story

router = APIRouter()

DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "community.json")

# Ensure data directory exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

DEFAULT_POSTS = [
    {
        "id": "p1", "user_name": "Rajan Kumar", "user_city": "Bangalore", "user_avatar": "R",
        "tree_species": "Gulmohar", "co2_offset_kg": 18.4, "post_type": "tree",
        "caption": "Planted a beautiful Gulmohar outside my office! 🌺 My flight to Pune is now offset.",
        "likes": 47, "liked_by": [], "comments": [], "created_at": "2026-06-10T12:00:00Z",
        "badges": ["✈️ Flight Offset"], "photo_url": None,
    },
    {
        "id": "p2", "user_name": "Meera Iyer", "user_city": "Chennai", "user_avatar": "M",
        "tree_species": "Banyan", "co2_offset_kg": 28.3, "post_type": "tree",
        "caption": "This banyan will grow to offset 28kg CO2 every year. Small acts, big impact 💚",
        "likes": 89, "liked_by": [], "comments": [], "created_at": "2026-06-10T10:30:00Z",
        "badges": ["🌳 Tree Pioneer"], "photo_url": None,
    },
    {
        "id": "p3", "user_name": "Arjun Mehta", "user_city": "Mumbai", "user_avatar": "A",
        "tree_species": "Mango", "co2_offset_kg": 15.8, "post_type": "tree",
        "caption": "Fruit + carbon offset — what a deal! 🥭 Mango tree planted in our building terrace garden.",
        "likes": 123, "liked_by": [], "comments": [], "created_at": "2026-06-10T08:00:00Z",
        "badges": ["🌟 Green Streak: 7 Days"], "photo_url": None,
    },
]

def load_posts():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return DEFAULT_POSTS.copy()
    return DEFAULT_POSTS.copy()

def save_posts(posts):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2)

_leaderboard = [
    {"rank": 1, "name": "Arjun Mehta", "city": "Mumbai", "co2_offset": 285, "trees": 12, "streak": 21},
    {"rank": 2, "name": "Meera Iyer", "city": "Chennai", "co2_offset": 241, "trees": 10, "streak": 14},
    {"rank": 3, "name": "Priya Sharma", "city": "Patna", "co2_offset": 178, "trees": 7, "streak": 9},
    {"rank": 4, "name": "Rajan Kumar", "city": "Bangalore", "co2_offset": 156, "trees": 6, "streak": 6},
    {"rank": 5, "name": "Kiran Patel", "city": "Ahmedabad", "co2_offset": 134, "trees": 5, "streak": 5},
]


class VerifyPostRequest(BaseModel):
    image_base64: str
    activity_text: str
    offset_text: str

class NewPost(BaseModel):
    user_name: str
    user_city: Optional[str] = "India"
    user_avatar: Optional[str] = "U"
    tree_species: Optional[str] = None
    co2_offset_kg: Optional[float] = 0.0
    post_type: Optional[str] = "update"
    caption: str
    badges: Optional[List[str]] = []
    photo_url: Optional[str] = None
    ai_score: Optional[int] = None
    ai_feedback: Optional[str] = None

class NewComment(BaseModel):
    user_name: str
    text: str


@router.get("/feed")
async def get_feed(page: int = 1, limit: int = 20):
    posts = load_posts()
    sorted_posts = sorted(posts, key=lambda p: p.get("created_at", ""), reverse=True)
    start = (page - 1) * limit
    end = start + limit
    return {
        "posts": sorted_posts[start:end],
        "page": page,
        "total": len(posts),
        "has_more": end < len(posts)
    }

@router.post("/verify-and-score")
async def verify_and_score(request: VerifyPostRequest):
    from services.gemini_service import verify_and_score_post
    result = await verify_and_score_post(request.image_base64, request.activity_text, request.offset_text)
    return result

@router.post("/post")
async def create_post(post: NewPost):
    posts = load_posts()
    new_id = f"p_{int(datetime.now().timestamp())}_{str(uuid.uuid4())[:6]}"
    
    # Save base64 image if it's a data URL
    photo_url = post.photo_url
    if photo_url and photo_url.startswith("data:image"):
        try:
            # We will just store the base64 string directly in the JSON for simplicity
            # since it's a local demo, or we could save to disk.
            # Storing directly since we want it to work out of the box without changing static mounts.
            pass
        except Exception as e:
            print("Error handling image:", e)

    new_post = {
        "id": new_id,
        "user_name": post.user_name,
        "user_city": post.user_city,
        "user_avatar": post.user_avatar or post.user_name[0].upper(),
        "tree_species": post.tree_species,
        "co2_offset_kg": post.co2_offset_kg or 0.0,
        "post_type": post.post_type or "update",
        "caption": post.caption,
        "likes": 0,
        "liked_by": [],
        "comments": [],
        "created_at": datetime.now(timezone.utc).isoformat(),
        "badges": post.badges or [],
        "photo_url": photo_url,
        "ai_score": post.ai_score,
        "ai_feedback": post.ai_feedback
    }
    posts.insert(0, new_post)
    save_posts(posts)
    return {"success": True, "post": new_post}


@router.post("/like/{post_id}")
async def toggle_like(post_id: str, user_id: str = "anonymous"):
    posts = load_posts()
    for p in posts:
        if p["id"] == post_id:
            liked_by = p.get("liked_by", [])
            if user_id in liked_by:
                liked_by.remove(user_id)
                p["likes"] = max(0, p.get("likes", 0) - 1)
                liked = False
            else:
                liked_by.append(user_id)
                p["likes"] = p.get("likes", 0) + 1
                liked = True
            p["liked_by"] = liked_by
            save_posts(posts)
            return {"success": True, "likes": p["likes"], "liked": liked}
    return {"success": False, "error": "Post not found"}

@router.delete("/post/{post_id}")
async def delete_post(post_id: str):
    posts = load_posts()
    original_len = len(posts)
    posts = [p for p in posts if p["id"] != post_id]
    if len(posts) < original_len:
        save_posts(posts)
        return {"success": True}
    return {"success": False, "error": "Post not found"}

@router.post("/comment/{post_id}")
async def add_comment(post_id: str, comment: NewComment):
    posts = load_posts()
    for p in posts:
        if p["id"] == post_id:
            if "comments" not in p:
                p["comments"] = []
            new_comment = {
                "id": str(uuid.uuid4())[:8],
                "user_name": comment.user_name,
                "text": comment.text,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            p["comments"].append(new_comment)
            save_posts(posts)
            return {"success": True, "comment": new_comment}
    return {"success": False, "error": "Post not found"}


@router.get("/leaderboard")
async def get_leaderboard():
    return {"leaderboard": _leaderboard}


@router.get("/stats")
async def get_stats():
    posts = load_posts()
    total_trees = sum(1 for p in posts if p.get("tree_species"))
    total_offset = sum(p.get("co2_offset_kg", 0) for p in posts)
    stats = {
        "trees_planted": 2847 + total_trees,
        "total_co2_offset_kg": 51234.7 + total_offset,
        "active_members": 2847,
        "top_city": "Mumbai",
        "total_posts": len(posts),
    }
    story = await generate_community_story(stats)
    return {**stats, "community_story": story}
