import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, Video } from 'lucide-react';

const MOCK_VIDEOS = [
  { id: '1', title: '10 Ways to Reduce Your Carbon Footprint', thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80', url: 'https://youtube.com/embed/placeholder1' },
  { id: '2', title: 'The Future of Renewable Energy', thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80', url: 'https://youtube.com/embed/placeholder2' },
  { id: '3', title: 'Why Planting Trees Matters', thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&q=80', url: 'https://youtube.com/embed/placeholder3' },
  { id: '4', title: 'Zero Waste Lifestyle Guide', thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15f?w=400&q=80', url: 'https://youtube.com/embed/placeholder4' },
];

export default function YouTubeCarousel() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  const [playingId, setPlayingId] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!apiKey || apiKey === 'YOUR_YOUTUBE_API_KEY_HERE') {
        // Fallback to mock videos if API key is missing
        setVideos(MOCK_VIDEOS);
        setLoading(false);
        return;
      }

      try {
        const query = encodeURIComponent('reduce carbon footprint climate change solutions');
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${query}&type=video&videoDuration=medium&key=${apiKey}`);
        const data = await res.json();
        
        if (data.items) {
          const formatted = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
            url: `https://www.youtube.com/embed/${item.id.videoId}`,
          }));
          setVideos(formatted);
        } else {
          setVideos(MOCK_VIDEOS);
        }
      } catch (err) {
        console.warn('Failed to fetch YouTube videos', err);
        setVideos(MOCK_VIDEOS);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) return null;
  if (!videos.length) return null;

  return (
    <div className="glass-card" style={{ padding: '20px', overflow: 'hidden', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Video size={20} color="var(--red-500)" />
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Learn & Grow: Climate Action</h3>
        <span className="badge badge-red" style={{ marginLeft: 'auto' }}>YouTube Picks</span>
      </div>

      <div style={{ position: 'relative' }}>
        <button
          onClick={() => scroll('left')}
          style={{
            position: 'absolute', left: -10, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '50%',
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <ChevronLeft size={20} />
        </button>

        <div
          ref={scrollRef}
          style={{
            display: 'flex', gap: 16, overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none',
            paddingBottom: 8, scrollSnapType: 'x mandatory'
          }}
          className="hide-scrollbar"
        >
          {videos.map((vid) => (
            <motion.div
              key={vid.id}
              whileHover={playingId === vid.id ? {} : { scale: 1.02 }}
              style={{
                flexShrink: 0, width: playingId === vid.id ? 400 : 280, borderRadius: 12, overflow: 'hidden',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                scrollSnapAlign: 'start', position: 'relative', cursor: playingId === vid.id ? 'default' : 'pointer',
                transition: 'width 0.3s ease'
              }}
              onClick={() => { if (playingId !== vid.id) setPlayingId(vid.id); }}
            >
              <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                {playingId === vid.id ? (
                  <iframe
                    src={`${vid.url}?autoplay=1`}
                    title={vid.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  />
                ) : (
                  <>
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                        boxShadow: '0 0 15px rgba(239, 68, 68, 0.6)'
                      }}>
                        <Play size={24} fill="white" style={{ marginLeft: 4 }} />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {playingId !== vid.id && (
                <div style={{ padding: '12px 14px' }}>
                  <h4 style={{ fontSize: 13, fontWeight: 600, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--text-primary)' }}>
                    {vid.title}
                  </h4>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          style={{
            position: 'absolute', right: -10, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '50%',
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-primary)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
