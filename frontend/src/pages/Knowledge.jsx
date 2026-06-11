import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Filter, Zap, Info, Flame, TrendingUp } from 'lucide-react';

const MOCK_VIDEOS = [
  { id: 'EtW2rrLHs08', url: 'https://www.youtube.com/embed/EtW2rrLHs08', title: 'Climate Change 101 with Bill Nye', thumbnail: 'https://img.youtube.com/vi/EtW2rrLHs08/maxresdefault.jpg', channel: 'National Geographic', views: '2.5M views', time: '5 years ago', duration: '4:10' },
  { id: 'wbR-5mHI6bo', url: 'https://www.youtube.com/embed/wbR-5mHI6bo', title: 'Can YOU Fix Climate Change?', thumbnail: 'https://img.youtube.com/vi/wbR-5mHI6bo/maxresdefault.jpg', channel: 'Kurzgesagt', views: '14M views', time: '3 years ago', duration: '11:20' },
  { id: 'nUnJQWO4YJY', url: 'https://www.youtube.com/embed/nUnJQWO4YJY', title: 'The diet that helps fight climate change', thumbnail: 'https://img.youtube.com/vi/nUnJQWO4YJY/maxresdefault.jpg', channel: 'TED-Ed', views: '1.2M views', time: '1 year ago', duration: '5:21' },
  { id: 'B5NiTN0chj0', url: 'https://www.youtube.com/embed/B5NiTN0chj0', title: 'Sustainability explained through animation', thumbnail: 'https://img.youtube.com/vi/B5NiTN0chj0/hqdefault.jpg', channel: 'Realeyes', views: '800K views', time: '4 years ago', duration: '2:45' },
  { id: 'eRLJscAlk1M', url: 'https://www.youtube.com/embed/eRLJscAlk1M', title: 'Dear Future Generations: Sorry', thumbnail: 'https://img.youtube.com/vi/eRLJscAlk1M/maxresdefault.jpg', channel: 'Prince Ea', views: '28M views', time: '8 years ago', duration: '6:02' },
  { id: 'G4H1N_yXBiA', url: 'https://www.youtube.com/embed/G4H1N_yXBiA', title: 'Causes and Effects of Climate Change', thumbnail: 'https://img.youtube.com/vi/G4H1N_yXBiA/maxresdefault.jpg', channel: 'National Geographic', views: '8.1M views', time: '6 years ago', duration: '3:04' },
];

const CATEGORIES = ['All', 'Carbon Footprint', 'Trees & Forests', 'Renewable Energy', 'Lifestyle Changes', 'Green Tech'];

const getMockVideos = (cat) => {
  let filtered = [...MOCK_VIDEOS];
  if (cat !== 'All') {
    // We will assign 2-3 videos specifically to categories by using their array index or title matching
    if (cat === 'Trees & Forests') {
      filtered = [MOCK_VIDEOS[5], MOCK_VIDEOS[2], MOCK_VIDEOS[0]];
    } else if (cat === 'Carbon Footprint') {
      filtered = [MOCK_VIDEOS[3], MOCK_VIDEOS[1], MOCK_VIDEOS[4]];
    } else if (cat === 'Renewable Energy') {
      filtered = [MOCK_VIDEOS[1], MOCK_VIDEOS[5], MOCK_VIDEOS[3]];
    } else if (cat === 'Lifestyle Changes') {
      filtered = [MOCK_VIDEOS[4], MOCK_VIDEOS[2], MOCK_VIDEOS[0]];
    } else if (cat === 'Green Tech') {
      filtered = [MOCK_VIDEOS[0], MOCK_VIDEOS[1], MOCK_VIDEOS[5]];
    }
  }
  
  // A robust deterministic shuffle based on category name length so it always looks different
  const seed = cat.length;
  return filtered.sort((a, b) => {
    const hashA = (a.title.charCodeAt(0) * seed) % 10;
    const hashB = (b.title.charCodeAt(0) * seed) % 10;
    return hashA - hashB;
  });
};

export default function Knowledge() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);

      try {
        const query = encodeURIComponent(`reduce carbon footprint ${activeCategory === 'All' ? '' : activeCategory}`);
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
        const res = await fetch(`${backendUrl}/api/videos/search?q=${query}`);
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
          const formatted = data.items.map(item => ({
            id: item.id,
            title: item.title,
            thumbnail: item.thumbnail,
            url: item.url,
            channel: item.channel,
            views: item.views,
            time: item.time,
            duration: item.duration
          }));
          setVideos(formatted.length > 0 ? formatted : getMockVideos(activeCategory));
        } else {
          setVideos(getMockVideos(activeCategory));
        }
      } catch (err) {
        console.warn('Failed to fetch videos from backend', err);
        setVideos(getMockVideos(activeCategory));
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeCategory]);

  return (
    <div className="animate-fade-up" style={{ paddingBottom: 60 }}>
      {/* ── YouTube-Style Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, background: 'var(--red-500)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239,68,68,0.3)'
          }}>
            <Play fill="white" color="white" size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Space Grotesk', margin: 0 }}>Knowledge Hub</h1>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Curated videos & climate science</div>
          </div>
        </div>

        {/* Search Bar */}
        <div 
          style={{
            display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
            borderRadius: '24px', padding: '4px 16px', width: '100%', maxWidth: 400, transition: 'all 0.2s'
          }}
        >
          <Search size={18} color="var(--text-dim)" />
          <input
            type="text"
            placeholder="Search climate topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              padding: '10px 12px', color: 'var(--text-primary)', fontSize: 15
            }}
            onFocus={e => { e.currentTarget.parentElement.style.borderColor = 'var(--green-500)'; e.currentTarget.parentElement.style.boxShadow = '0 0 20px rgba(34,197,94,0.15)'; }}
            onBlur={e => { e.currentTarget.parentElement.style.borderColor = 'var(--border)'; e.currentTarget.parentElement.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* ── Category Chips ── */}
      <div style={{
        display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 16,
        scrollbarWidth: 'none', msOverflowStyle: 'none'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px', borderRadius: '20px', whiteSpace: 'nowrap', cursor: 'pointer',
              fontWeight: 600, fontSize: 14, transition: 'all 0.2s',
              background: activeCategory === cat ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat ? 'var(--green-400)' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
              boxShadow: activeCategory === cat ? '0 0 20px rgba(34,197,94,0.2)' : 'none',
            }}
            onMouseEnter={e => { if(activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
            onMouseLeave={e => { if(activeCategory !== cat) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Featured Educational Post (CO2 Formula) ── */}
      <div className="glass-card" style={{
        padding: 24, marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 16,
        position: 'relative', overflow: 'hidden', border: '1px solid rgba(234, 179, 8, 0.2)'
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 250, height: 250, background: 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.15)', padding: 6, borderRadius: 8 }}>
            <Zap size={20} color="var(--gold)" />
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Community Knowledge: Electricity CO₂ Calculation</h2>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>The Formula</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green-500)', fontFamily: 'Space Grotesk' }}>
                CO₂ Emissions (kg) = Energy Consumed (kWh) × Grid Emission Factor (kg CO₂/kWh)
              </div>
            </div>
            <div style={{ marginTop: 16, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>GEF Averages:</strong><br/>
              🇮🇳 India: ~0.82 kg CO₂/kWh<br/>
              🇺🇸 US: ~0.38 kg CO₂/kWh
            </div>
          </div>
          
          <div style={{ flex: '1 1 300px', background: 'rgba(34, 197, 94, 0.05)', padding: 16, borderRadius: 12, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: 'var(--green-500)', marginBottom: 8 }}>
              <Info size={16} /> Example Calculation
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              If you used <strong>250 kWh</strong> in an Indian household:<br/>
              <code style={{ display: 'block', background: 'var(--bg-card)', padding: '8px 12px', borderRadius: 6, marginTop: 8, color: 'var(--text-primary)' }}>
                250 kWh × 0.82 = <strong>205 kg of CO₂</strong>
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* ── Video Grid ── */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
              <div style={{ width: '100%', aspectRatio: '16/9', background: 'rgba(255,255,255,0.05)', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s infinite' }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                  <div style={{ height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 4, width: '90%', animation: 'pulse 1.5s infinite' }} />
                  <div style={{ height: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 4, width: '60%', animation: 'pulse 1.5s infinite' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {videos.filter(v => v.title.toLowerCase().includes(searchQuery.toLowerCase())).map((vid, index) => (
            <motion.div 
              key={vid.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card"
              style={{ display: 'flex', flexDirection: 'column', padding: 16, cursor: 'pointer' }}
              whileHover={{ y: -4, borderColor: 'rgba(34,197,94,0.4)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
              onClick={() => setPlayingVideo(vid)}
            >
              <div 
                style={{ 
                  position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: 12, overflow: 'hidden',
                  background: '#000', marginBottom: 16
                }}
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s'
                }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <div style={{ background: 'rgba(34,197,94,0.9)', borderRadius: '50%', padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play fill="white" color="white" size={24} />
                  </div>
                </div>
                <div style={{
                  position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.8)',
                  color: 'white', fontSize: 12, fontWeight: 600, padding: '4px 8px', borderRadius: 6
                }}>
                  {vid.duration || '10:00'}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ 
                  width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18,
                  flexShrink: 0, boxShadow: '0 4px 10px rgba(16,185,129,0.3)'
                }}>
                  {vid.channel?.[0] || 'G'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4 }}>
                    {vid.title}
                  </h3>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                    {vid.channel || 'Green Earth'} <span style={{ color: '#3b82f6' }}>✓</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                    {vid.views} • {vid.time}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Video Player Modal */}
      {playingVideo && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
          }} 
          onClick={() => setPlayingVideo(null)}
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ width: '100%', maxWidth: 1000, position: 'relative', aspectRatio: '16/9', background: '#000', borderRadius: 16, overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setPlayingVideo(null)}
              style={{
                position: 'absolute', top: 16, right: 16,
                background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white', zIndex: 10, transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.8)'; e.currentTarget.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            {playingVideo.url && (
              <iframe
                src={`${playingVideo.url}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            )}
          </motion.div>
        </motion.div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
