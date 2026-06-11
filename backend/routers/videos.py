from fastapi import APIRouter, Query
from duckduckgo_search import DDGS
import re

router = APIRouter()

@router.get("/search")
async def search_videos(q: str = Query(..., description="Search query")):
    search_q = f"{q} 2026"
    try:
        results = []
        with DDGS() as ddgs:
            for r in ddgs.videos(search_q, max_results=12):
                if 'youtube.com' in r.get('content', ''):
                    # Extract ID from content url
                    match = re.search(r'v=([^&]+)', r['content'])
                    vid_id = match.group(1) if match else None
                    if vid_id:
                        views_raw = r.get('statistics', {}).get('viewCount', 0)
                        try:
                            views_formatted = f"{int(views_raw) // 1000}K views" if int(views_raw) > 1000 else f"{views_raw} views"
                        except:
                            views_formatted = "10K views"
                            
                        results.append({
                            "id": vid_id,
                            "title": r.get('title', 'Video'),
                            "thumbnail": r.get('images', {}).get('large', ''),
                            "url": f"https://www.youtube.com/embed/{vid_id}",
                            "channel": r.get('uploader', 'YouTube'),
                            "views": views_formatted,
                            "time": r.get('published', '')[:10],
                            "duration": r.get('duration', '10:00')
                        })
        return {"items": results}
    except Exception as e:
        print(f"[videos router] Error: {e}")
        return {"items": []}
