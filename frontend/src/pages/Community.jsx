import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { verifyAndScorePost } from '../services/api';
import { Heart, Share2, Trophy, TreePine, MapPin, Clock, Users, Leaf, Send, RefreshCw, MessageSquare, Flame, Image as ImageIcon, X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

function timeAgo(date) {
  if (!date) return 'Just now';
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return 'Just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const POST_TYPE_CONFIG = {
  tree:     { icon: '🌳', label: 'Tree Planted', cls: 'post-type-tree', bg: 'rgba(34,197,94,0.08)' },
  activity: { icon: '📊', label: 'Activity Logged', cls: 'post-type-activity', bg: 'rgba(96,165,250,0.08)' },
  update:   { icon: '💬', label: 'Green Update', cls: 'post-type-update', bg: 'rgba(167,139,250,0.08)' },
};

function PostCard({ post, onLike, onShare, onComment, onImageClick, onDelete, currentUser }) {
  const [likeAnim, setLikeAnim] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const typeConfig = POST_TYPE_CONFIG[post.post_type] || POST_TYPE_CONFIG.update;

  const handleLike = () => {
    setLikeAnim(true);
    onLike(post.id);
    setTimeout(() => setLikeAnim(false), 500);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div
      className="post-card animate-fade-up"
      style={{ background: typeConfig.bg, borderColor: 'var(--border)' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
        <Link to={`/profile/${encodeURIComponent(post.user_name)}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            style={{
              width: 44, height: 44, borderRadius: '50%',
              background: `linear-gradient(135deg, var(--green-500), var(--green-600))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 18, color: 'white',
              boxShadow: `0 4px 12px rgba(34,197,94,0.3)`,
            }}
          >
            {(post.user_avatar || post.user_name?.[0] || 'U').toUpperCase()}
          </motion.div>
        </Link>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
            <Link to={`/profile/${encodeURIComponent(post.user_name)}`} style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{post.user_name}</span>
            </Link>
            <span className={`badge ${typeConfig.cls}`} style={{ fontSize: 11, padding: '2px 8px' }}>
              {typeConfig.icon} {typeConfig.label}
            </span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={10} /> {post.user_city}
            <span>·</span>
            <Clock size={10} /> {timeAgo(post.created_at)}
          </div>
        </div>

        {/* AI Impact Score Badge */}
        {post.ai_score !== undefined && post.ai_score !== null && (
          <div style={{ 
            background: 'linear-gradient(135deg, var(--gold), #d97706)', padding: '4px 10px', 
            borderRadius: 12, color: 'white', fontWeight: 800, fontSize: 12,
            boxShadow: '0 4px 10px rgba(245,158,11,0.3)'
          }}>
            Score: {post.ai_score}/100
          </div>
        )}

        {/* Delete Button */}
        {currentUser && currentUser.displayName === post.user_name && onDelete && (
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '4px 8px', color: 'var(--red-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 4 }}
            title="Delete post"
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {/* Caption (Markdown support) */}
      <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 14 }} className="markdown-content">
        <ReactMarkdown>{post.caption}</ReactMarkdown>
      </div>

      {/* Uploaded Photo */}
      {post.photo_url && (
        <div 
          onClick={onImageClick} 
          style={{ marginBottom: 14, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', cursor: onImageClick ? 'pointer' : 'default' }}
        >
          <img src={post.photo_url} alt="Community Post" style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }} />
        </div>
      )}

      {/* AI Feedback */}
      {post.ai_feedback && (
        <div style={{ background: 'rgba(34,197,94,0.1)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(34,197,94,0.3)', marginBottom: 14, fontSize: 13, color: 'var(--text-secondary)' }}>
          <strong>🤖 AI Impact Note:</strong> {post.ai_feedback}
        </div>
      )}

      {/* Divider */}
      <div className="divider" style={{ margin: '0 0 12px' }} />

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <button 
          className={`like-btn ${post.liked ? 'liked' : ''} ${likeAnim ? 'animate-heart' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setLikeAnim(true);
            onLike(post.id);
            setTimeout(() => setLikeAnim(false), 500);
          }}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {post.liked ? '❤️' : '🤍'} {post.likes}
        </button>
        <button 
          className="btn-secondary"
          onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
          style={{ padding: '7px 14px', fontSize: 12, borderRadius: 20, background: showComments ? 'var(--bg-glass-light)' : '' }}
        >
          <MessageSquare size={13} /> {post.comments?.length || 0}
        </button>

        <button
          onClick={() => onShare(post)}
          className="btn-secondary"
          style={{ padding: '7px 14px', fontSize: 12, borderRadius: 20 }}
        >
          <Share2 size={13} /> Share
        </button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', marginTop: 12 }}
          >
            <div style={{ padding: '12px', background: 'rgba(0,0,0,0.15)', borderRadius: 12, border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12, maxHeight: 200, overflowY: 'auto' }}>
                {(!post.comments || post.comments.length === 0) && (
                  <div style={{ fontSize: 12, color: 'var(--text-dim)', textAlign: 'center', padding: '8px 0' }}>
                    No comments yet. Start the conversation!
                  </div>
                )}
                {post.comments?.map((c, i) => (
                  <div key={i} style={{ fontSize: 13 }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', marginRight: 6 }}>{c.user_name}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={e => setCommentText(e.target.value)}
                  className="input"
                  style={{ padding: '8px 12px', fontSize: 13, background: 'rgba(255,255,255,0.03)' }}
                />
                <button type="submit" disabled={!commentText.trim()} className="btn-primary" style={{ padding: '8px 12px' }}>
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Community() {
  const { user, communityPosts, leaderboard, likePost, addCommunityPost, fetchCommunityPosts, communityLoading, addCommunityComment, ecoTasks, completeTaskWithProof, deleteCommunityPost } = useAppStore();
  const [activeTab, setActiveTab] = useState('feed');
  
  // Post state
  const [postText, setPostText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [postSubmitting, setPostSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    fetchCommunityPosts();
    refreshIntervalRef.current = setInterval(() => {
      fetchCommunityPosts();
    }, 45000);
    return () => clearInterval(refreshIntervalRef.current);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchCommunityPosts();
    toast.success('Feed refreshed!', { duration: 1500 });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!postText.trim() && !imageBase64) {
      toast.error('Please write something or attach an image.');
      return;
    }

    setPostSubmitting(true);
    let score = null;
    let aiFeedback = null;

    const newPost = {
      user_name: user?.displayName || 'Green Earthling',
      user_city: 'India',
      user_avatar: (user?.displayName?.[0] || 'G').toUpperCase(),
      tree_species: null,
      co2_offset_kg: 0,
      post_type: 'update',
      caption: postText,
      photo_url: imageBase64,
      ai_score: score,
      ai_feedback: aiFeedback
    };

    const createdPost = await addCommunityPost(newPost); // Wait for the new post

    // Automatically check if there are pending ML tasks, and use this post as proof
    if (imageBase64 && ecoTasks) {
      const pendingTask = ecoTasks.find(t => t.status === 'pending');
      if (pendingTask) {
        completeTaskWithProof(pendingTask.id, newPost.id || `temp_${Date.now()}`);
        toast.success(`🎉 Eco Task Completed: ${pendingTask.title}`);
      }
    }

    setPostText('');
    setImagePreview(null);
    setImageBase64(null);
    setPostSubmitting(false);
    toast.success('✅ Posted to community!');
  };

  const handleLike = useCallback((id) => {
    likePost(id);
  }, [likePost]);

  const handleComment = useCallback((id, text) => {
    addCommunityComment(id, text);
  }, [addCommunityComment]);

  const handleShare = useCallback((post) => {
    const text = `🌱 ${post.user_name} on GreenStep: Check out my latest offset action! #GreenStep #ClimateAction`;
    if (navigator.share) {
      navigator.share({ title: 'GreenStep', text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => toast.success('Copied to clipboard!'));
    }
  }, []);

  const totalCommunityOffset = communityPosts.reduce((s, p) => s + (p.co2_offset_kg || 0), 0);
  const totalTrees = communityPosts.filter(p => p.tree_species).length;

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Space Grotesk', marginBottom: 6 }}>
          🌐 Community Feed
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
          Log your activities, verify your offsets with AI, and climb the leaderboard!
        </p>
      </div>

      {/* Community stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { icon: TreePine, label: 'Trees Planted', value: `${totalTrees}`, color: '#22c55e' },
          { icon: Leaf, label: 'CO₂ Offset (kg)', value: `${(totalCommunityOffset).toFixed(1)}`, color: '#4ade80' },
          { icon: Users, label: 'Active Members', value: `${new Set(communityPosts.map(p => p.user_name)).size}`, color: '#60a5fa' },
        ].map(({ icon: Icon, label, value, color }) => (
          <motion.div key={label} whileHover={{ scale: 1.02 }} className="glass-card" style={{ padding: '18px', textAlign: 'center' }}>
            <Icon size={22} color={color} style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Space Grotesk', color }}>{value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2 }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Tabs + Refresh */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { id: 'feed', label: '🌿 Feed' },
            { id: 'leaderboard', label: '🏆 Leaderboard' },
          ].map(({ id, label }) => (
            <button key={id} className={`tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>
              {label}
            </button>
          ))}
        </div>
        {activeTab === 'feed' && (
          <button
            onClick={handleRefresh}
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            <RefreshCw size={13} style={{ animation: communityLoading ? 'spin 1s linear infinite' : 'none' }} />
            {communityLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        )}
      </div>

      {activeTab === 'feed' && (
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          {/* Create Post Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
            style={{ padding: '20px', marginBottom: 24, border: '1px solid var(--border-hover)', background: 'var(--bg-surface)' }}
          >
            <form onSubmit={handleCreatePost}>
              <div style={{ marginBottom: 16 }}>
                <textarea 
                  value={postText} 
                  onChange={(e) => setPostText(e.target.value)} 
                  className="input" 
                  placeholder="What's on your green mind? Share your activities or offsets..." 
                  style={{ width: '100%', padding: '14px', minHeight: '100px', resize: 'vertical' }} 
                />
              </div>
              
              {/* Image Preview Area */}
              {imagePreview && (
                <div style={{ position: 'relative', marginBottom: 16, borderRadius: 12, overflow: 'hidden' }}>
                  <img src={imagePreview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />
                  <button 
                    type="button"
                    onClick={() => { setImagePreview(null); setImageBase64(null); }}
                    style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '50%', padding: 6, cursor: 'pointer', border: 'none' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <input type="file" accept="image/*" id="post-image" style={{ display: 'none' }} onChange={handleImageChange} />
                  <label htmlFor="post-image" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, cursor: 'pointer' }}>
                    <ImageIcon size={16} /> Add Photo
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={postSubmitting}
                  style={{ padding: '8px 24px', fontSize: 14 }}
                >
                  {postSubmitting ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
                  {postSubmitting ? 'Verifying AI...' : 'Post'}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Post Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AnimatePresence initial={false}>
              {communityPosts.map((post, index) => (
                  <div 
                    key={post.id} 
                    style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                  >
                    <div>
                      <PostCard
                        post={post}
                        onLike={handleLike}
                        onShare={handleShare}
                        onComment={handleComment}
                        onImageClick={() => setSelectedPost(post)}
                        onDelete={(id) => {
                          if (window.confirm('Are you sure you want to delete this post?')) {
                            deleteCommunityPost(id);
                            toast.success('Post deleted successfully');
                          }
                        }}
                        currentUser={user}
                      />
                    </div>
                  </div>
              ))}
            </AnimatePresence>
            {communityPosts.length === 0 && !communityLoading && (
              <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
                No posts yet. Be the first to share! 🌱
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="glass-card" style={{ padding: '24px', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <Trophy size={20} color="var(--gold)" />
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Carbon Offset Leaderboard</h2>
            <div className="badge badge-gold" style={{ marginLeft: 'auto' }}>India-wide · Live</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {leaderboard.map((entry, i) => (
              <motion.div
                key={entry.rank}
                whileHover={{ x: 4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px',
                  background: i === 0 ? 'rgba(245,158,11,0.08)' : i === 1 ? 'rgba(148,163,184,0.06)' : i === 2 ? 'rgba(180,83,9,0.06)' : 'var(--bg-card)',
                  borderRadius: 12,
                  border: `1px solid ${i === 0 ? 'rgba(245,158,11,0.25)' : i === 1 ? 'rgba(148,163,184,0.2)' : i === 2 ? 'rgba(180,83,9,0.2)' : 'var(--border)'}`,
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: '50%',
                  background: i === 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' :
                    i === 1 ? 'linear-gradient(135deg, #94a3b8, #64748b)' :
                    i === 2 ? 'linear-gradient(135deg, #b45309, #92400e)' : 'var(--bg-card-hover)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i < 3 ? 16 : 12, fontWeight: 700, color: 'white', flexShrink: 0,
                  boxShadow: i === 0 ? '0 4px 12px rgba(245,158,11,0.4)' : 'none',
                }}>
                  {i < 3 ? ['🥇', '🥈', '🥉'][i] : entry.rank}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{entry.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <MapPin size={10} /> {entry.city} · {entry.trees} trees
                    {entry.streak > 0 && <><Flame size={10} color="#f59e0b" /> {entry.streak}d streak</>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 16, fontWeight: 800, fontFamily: 'Space Grotesk', color: 'var(--green-400)' }}>
                    {entry.co2_offset} kg
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>CO₂ offset</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: '12px 16px', background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-dim)', textAlign: 'center' }}>
            🌱 Plant more trees to climb the leaderboard! Updated daily.
          </div>
        </div>
      )}

      {/* Post Detail Modal Overlay */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
              overflowY: 'auto'
            }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                background: 'var(--bg-base)', border: '1px solid var(--border)', borderRadius: 20,
                width: '100%', maxWidth: 700, padding: 30, position: 'relative',
                maxHeight: '90vh', overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedPost(null)}
                style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
              >
                <X size={20} />
              </button>
              
              <div style={{ marginTop: 10 }}>
                {/* We render the actual interactive PostCard inside the modal */}
                <PostCard
                  post={communityPosts.find(p => p.id === selectedPost.id) || selectedPost}
                  onLike={handleLike}
                  onShare={handleShare}
                  onComment={handleComment}
                  onDelete={(id) => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                      deleteCommunityPost(id);
                      setSelectedPost(null);
                      toast.success('Post deleted successfully');
                    }
                  }}
                  currentUser={user}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style>{`
        .markdown-content strong { color: var(--text-primary); font-weight: 700; }
        .markdown-content p { margin-bottom: 8px; }
      `}</style>
    </div>
  );
}
