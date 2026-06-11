import { useParams, NavLink } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { TreePine, Activity, Leaf, MapPin, Award, Calendar, Flame, Heart, Share2, Trash2, Smartphone, Link } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import RoutineBuilder from '../components/RoutineBuilder';
import { fetchUserIntegrations, saveUserIntegration } from '../services/firebaseService';

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return 'Just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

const POST_TYPE_CONFIG = {
  tree:     { icon: '🌳', label: 'Tree Planted', color: '#22c55e' },
  activity: { icon: '📊', label: 'Activity Logged', color: '#60a5fa' },
  update:   { icon: '💬', label: 'Green Update', color: '#a78bfa' },
};

// Monthly CO2 data for chart (demo — last 6 months)
function buildMonthlyChart(activities, trees) {
  const months = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - i));
    return {
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
      year: d.getFullYear(),
      monthIndex: d.getMonth(),
      emitted: 0,
      offset: 0,
    };
  });
  
  activities.forEach(a => {
    const ad = new Date(a.created_at);
    const idx = months.findIndex(m => m.monthIndex === ad.getMonth() && m.year === ad.getFullYear());
    if (idx !== -1) months[idx].emitted += a.co2_kg;
  });

  months.forEach(m => {
    trees.forEach(t => {
      const td = new Date(t.planted_at);
      // If tree was planted in or before this month, it offsets CO2
      if (td.getFullYear() < m.year || (td.getFullYear() === m.year && td.getMonth() <= m.monthIndex)) {
         m.offset += (t.co2_kg_year / 12);
      }
    });
    // Format to 2 decimal places
    m.emitted = parseFloat(m.emitted.toFixed(2));
    m.offset = parseFloat(m.offset.toFixed(2));
  });

  return months;
}

const ACHIEVEMENT_LIST = [
  { id: 'first_tree', icon: '🌱', label: 'First Tree', desc: 'Planted your first tree', check: (t) => t >= 1, color: 'green' },
  { id: 'five_trees', icon: '🌳', label: 'Forest Starter', desc: 'Planted 5 trees', check: (t) => t >= 5, color: 'green' },
  { id: 'ten_trees', icon: '🏕️', label: 'Forest Builder', desc: 'Planted 10 trees', check: (t) => t >= 10, color: 'gold' },
  { id: 'offset_50', icon: '💚', label: '50kg Offset Hero', desc: 'Offset 50kg of CO₂', check: (_, o) => o >= 50, color: 'green' },
  { id: 'offset_100', icon: '💯', label: '100kg Hero', desc: 'Offset 100kg of CO₂', check: (_, o) => o >= 100, color: 'gold' },
  { id: 'tracker', icon: '📊', label: 'Consistent Tracker', desc: 'Logged 7+ activities', check: (__, ___, a) => a >= 7, color: 'blue' },
  { id: 'transit', icon: '🚇', label: 'Transit Hero', desc: 'Used public transit', check: () => false, color: 'blue' },
];

export default function Profile() {
  const { userId } = useParams();
  const { user, communityPosts, activities, trees, totalCO2Offset, getCarbonScore, weekStreak, routine, setRoutine, deleteCommunityPost } = useAppStore();

  const isOwnProfile = !userId;
  const profileName = isOwnProfile ? (user?.displayName || 'Demo User') : decodeURIComponent(userId);
  const isCurrentUser = user?.displayName === profileName;
  
  const [activeTab, setActiveTab] = useState('updates');
  const [mlLoading, setMlLoading] = useState(false);
  const [mlInsights, setMlInsights] = useState(null);
  const [integrations, setIntegrations] = useState({});

  useEffect(() => {
    if (user?.uid && isOwnProfile) {
      fetchUserIntegrations(user.uid).then(setIntegrations);
    }
  }, [user, isOwnProfile]);

  const toggleIntegration = async (appName) => {
    if (!user?.uid) return;
    const isConnected = !!integrations[appName];
    const newIntegrations = { ...integrations, [appName]: !isConnected };
    setIntegrations(newIntegrations);
    await saveUserIntegration(user.uid, newIntegrations);
    toast.success(`${isConnected ? 'Disconnected' : 'Connected'} ${appName} successfully!`);
  };

  // Posts for this profile
  const userPosts = communityPosts.filter(p => p.user_name === profileName);

  // Stats
  const userTrees = isOwnProfile ? trees.length : userPosts.filter(p => p.tree_species).length;
  const userOffset = isOwnProfile
    ? totalCO2Offset
    : userPosts.reduce((s, p) => s + (p.co2_offset_kg || 0), 0);
  const userActivities = isOwnProfile ? activities.length : userPosts.filter(p => p.post_type === 'activity').length;
  const score = isOwnProfile ? getCarbonScore() : Math.min(99, 68 + Math.floor(Math.abs(profileName.charCodeAt(0) % 25)));

  const scoreColor = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  const monthlyChart = isOwnProfile ? buildMonthlyChart(activities, trees) : [];

  // Achievements
  const achievements = ACHIEVEMENT_LIST.map(a => ({
    ...a,
    earned: isOwnProfile ? a.check(trees.length, totalCO2Offset, activities.length) : (userTrees >= 1),
  }));
  const earnedCount = achievements.filter(a => a.earned).length;

  const handleGenerateInsights = async () => {
    setMlLoading(true);
    setTimeout(() => {
      let weeklyCo2 = 0;
      let travelEvents = 0;
      let foodEvents = 0;
      let meatEvents = 0;
      let carEvents = 0;

      const events = routine.events || [];
      
      events.forEach(ev => {
        const details = (ev.details || '').toLowerCase();
        const title = (ev.title || '').toLowerCase();
        const textToAnalyze = details + ' ' + title;

        if (ev.type === 'traveling') {
          travelEvents++;
          if (textToAnalyze.includes('car') || textToAnalyze.includes('drive') || textToAnalyze.includes('petrol')) {
            weeklyCo2 += 4.5;
            carEvents++;
          } else if (textToAnalyze.includes('metro') || textToAnalyze.includes('train') || textToAnalyze.includes('bus')) {
            weeklyCo2 += 0.8;
          } else {
            weeklyCo2 += 2.0;
          }
        } else if (ev.type === 'food') {
          foodEvents++;
          if (textToAnalyze.includes('meat') || textToAnalyze.includes('chicken') || textToAnalyze.includes('beef') || textToAnalyze.includes('mutton')) {
            weeklyCo2 += 3.0;
            meatEvents++;
          } else if (textToAnalyze.includes('veg') || textToAnalyze.includes('plant')) {
            weeklyCo2 += 1.0;
          } else {
            weeklyCo2 += 1.5;
          }
        } else {
          weeklyCo2 += 0.5; // General activity base load
        }
      });

      // If they haven't filled it out much, add some baseline
      if (weeklyCo2 === 0 && events.length > 0) weeklyCo2 = events.length * 1.5;

      const monthlyCo2 = weeklyCo2 * 4;
      const trees = Math.ceil(monthlyCo2 / 21.7);

      let tip = "Your schedule looks great! Try adding more specific details to get better insights.";
      if (events.length === 0) {
        tip = "Your routine is empty! Add your classes, commutes, and meals to the calendar to get a real ML footprint calculation.";
      } else if (carEvents >= 2) {
        tip = `You travel by car frequently (${carEvents} slots). Switching just 2 of those trips to the Metro could save roughly 30kg of CO₂ this month!`;
      } else if (meatEvents >= 2) {
        tip = `You've logged multiple meat-heavy meals. Substituting just one with a plant-based option weekly saves about 8kg CO₂ monthly.`;
      } else if (travelEvents === 0 && foodEvents === 0) {
        tip = "Try logging specific Food or Traveling events in your calendar to see your exact carbon breakdown.";
      } else {
        tip = "Excellent routine! Your mix of activities is very eco-friendly. Keep logging to train the ML further.";
      }

      setMlInsights({
        estimatedMonthlyCo2: monthlyCo2.toFixed(1),
        treesNeeded: trees,
        tip: tip,
        confidence: events.length > 5 ? "High (based on structured schedule)" : "Low (needs more routine data)"
      });
      useAppStore.getState().generateMLTasks(); // Trigger Task Generation
      setMlLoading(false);
      toast.success("AI Insights generated from your Schedule!");
    }, 1200);
  };

  return (
    <div className="animate-fade-up">

      {/* Profile Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ padding: '0', marginBottom: 24, overflow: 'hidden' }}
      >
        {/* Banner */}
        <div style={{
          height: 100,
          background: 'linear-gradient(135deg, rgba(34,197,94,0.25) 0%, rgba(74,222,128,0.1) 50%, rgba(16,30,20,0) 100%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15), transparent 60%)',
          }} />
        </div>

        <div style={{ padding: '0 28px 28px', position: 'relative', marginTop: -40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginBottom: 20 }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 32, color: 'white',
              boxShadow: '0 8px 24px rgba(34,197,94,0.4)',
              border: '4px solid var(--bg-card)',
              flexShrink: 0,
            }}>
              {profileName[0].toUpperCase()}
            </div>

            {/* Name + actions */}
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <h1 style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Space Grotesk', marginBottom: 2 }}>{profileName}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-dim)', fontSize: 13 }}>
                <MapPin size={13} /> {isOwnProfile ? 'GreenStep Member' : 'Community Member'}
                {isOwnProfile && weekStreak > 0 && (
                  <>
                    <span>·</span>
                    <Flame size={13} color="#f59e0b" /> <span style={{ color: '#f59e0b', fontWeight: 600 }}>{weekStreak}-day streak</span>
                  </>
                )}
              </div>
            </div>

            {isOwnProfile && (
              <NavLink to="/track" className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
                <Activity size={14} /> Log Activity
              </NavLink>
            )}
          </div>

          {/* Score + Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
            {[
              { label: 'Carbon Score', value: `${score}/100`, color: scoreColor, icon: '🌡️' },
              { label: 'Trees Planted', value: userTrees, color: '#22c55e', icon: '🌳' },
              { label: 'Total Posts', value: userPosts.length, color: '#a78bfa', icon: '💬' },
              { label: 'CO₂ Offset', value: `${userOffset.toFixed(1)} kg`, color: '#4ade80', icon: '♻️' },
              { label: 'Activities', value: userActivities, color: '#60a5fa', icon: '📊' },
            ].map(({ label, value, color, icon }, i) => (
              <motion.div 
                key={label} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.06)', borderColor: color }}
                style={{ textAlign: 'center', padding: '14px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid var(--border)', transition: 'all 0.2s' }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Space Grotesk', color, marginBottom: 2 }}>{value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

        {/* Left: Posts */}
        <div>
          {/* Monthly Chart (own profile only) */}
          {isOwnProfile && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card"
              style={{ padding: '20px', marginBottom: 20 }}
            >
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>📈 Monthly Emissions (6 months)</h3>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={monthlyChart} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
                  <defs>
                    <linearGradient id="colorEmitted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
                    </linearGradient>
                    <linearGradient id="colorOffset" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(16,30,20,0.85)', backdropFilter: 'blur(10px)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, fontSize: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.5)' }}
                    labelStyle={{ color: '#f0fdf4', fontWeight: 700, marginBottom: 4 }}
                    formatter={(v, name) => [`${v} kg CO₂`, name === 'emitted' ? 'Emitted' : 'Offset']}
                  />
                  <Bar dataKey="emitted" name="emitted" fill="url(#colorEmitted)" radius={[6, 6, 0, 0]} maxBarSize={40} />
                  <Bar dataKey="offset" name="offset" fill="url(#colorOffset)" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {isOwnProfile && (
            <div style={{ display: 'flex', background: 'var(--bg-card)', padding: 4, borderRadius: 12, marginBottom: 20, border: '1px solid var(--border)' }}>
              <button 
                onClick={() => setActiveTab('updates')} 
                style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 700, borderRadius: 8, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', background: activeTab === 'updates' ? 'rgba(34,197,94,0.1)' : 'transparent', color: activeTab === 'updates' ? 'var(--green-400)' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}
              >
                🌍 Public Updates
              </button>
              <button 
                onClick={() => setActiveTab('routine')} 
                style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 700, borderRadius: 8, transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', background: activeTab === 'routine' ? 'rgba(34,197,94,0.1)' : 'transparent', color: activeTab === 'routine' ? 'var(--green-400)' : 'var(--text-dim)', border: 'none', cursor: 'pointer' }}
              >
                🔒 Daily Routine
              </button>
            </div>
          )}

          {activeTab === 'updates' ? (
            <>
              {/* Posts */}
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>
                {isOwnProfile ? 'Your Updates' : `${profileName}'s Updates`}
              </h2>

          {userPosts.length === 0 ? (
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🌱</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No posts yet</div>
              <div style={{ fontSize: 13 }}>
                {isOwnProfile
                  ? <NavLink to="/community" style={{ color: 'var(--green-400)' }}>Share your first green update →</NavLink>
                  : 'This user hasn\'t posted yet.'}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {userPosts.map((post, i) => {
                const typeConfig = POST_TYPE_CONFIG[post.post_type] || POST_TYPE_CONFIG.update;
                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card"
                    style={{ padding: '18px 20px', position: 'relative', overflow: 'hidden' }}
                    whileHover={{ y: -2, boxShadow: `0 8px 30px ${typeConfig.color}15` }}
                  >
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: typeConfig.color, boxShadow: `0 0 10px ${typeConfig.color}` }} />

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 18 }}>{typeConfig.icon}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: typeConfig.color }}>{typeConfig.label}</span>
                      <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Calendar size={10} /> {timeAgo(post.created_at)}
                      </span>
                    </div>

                    <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 12 }}>
                      {post.caption}
                    </p>

                    {post.photo_url && (
                      <div style={{ marginBottom: 12, borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <img src={post.photo_url} alt="Update" style={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
                      </div>
                    )}

                    {post.tree_species && (
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
                        borderRadius: 20, marginBottom: 12,
                        background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                        fontSize: 12, color: '#22c55e', fontWeight: 600,
                      }}>
                        <TreePine size={13} /> {post.tree_species} · {(post.co2_offset_kg || 0).toFixed(1)} kg CO₂/yr
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--text-dim)', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Heart size={12} /> {post.likes} likes
                        </span>
                        {post.badges?.map((b, bi) => (
                          <span key={bi} className="badge badge-gold" style={{ fontSize: 10, padding: '2px 7px' }}>{b}</span>
                        ))}
                      </div>

                      {isOwnProfile && (
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm('Are you sure you want to delete this post?')) {
                              deleteCommunityPost(post.id);
                              toast.success('Post deleted successfully');
                            }
                          }}
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '4px 8px', color: 'var(--red-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          title="Delete post"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
          </>
          ) : (
            // Routine Tab
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Activity color="var(--blue-400)" />
                <h2 style={{ fontSize: 18, fontWeight: 700 }}>Your Private Routine</h2>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 24 }}>This data is private and helps us calculate a more accurate baseline carbon footprint for you.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <RoutineBuilder />
              </div>

              <div style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Smartphone color="var(--green-400)" size={20} />
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>Smart Integrations</h2>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 20 }}>Connect your apps to automatically log walking, cycling, and home energy usage.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { name: 'Google Fit', id: 'google_fit', icon: '🏃' },
                    { name: 'Strava', id: 'strava', icon: '🚴' },
                    { name: 'Smart Home Meter', id: 'smart_home', icon: '⚡' }
                  ].map(app => {
                    const isConnected = !!integrations[app.id];
                    return (
                    <div key={app.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', padding: '12px 16px', borderRadius: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ fontSize: 24 }}>{app.icon}</div>
                        <div style={{ fontWeight: 600, color: 'white' }}>{app.name}</div>
                      </div>
                      <button 
                        onClick={() => toggleIntegration(app.id)}
                        className={isConnected ? 'btn-secondary' : 'btn-primary'} 
                        style={{ padding: '6px 16px', borderRadius: 20, fontSize: 12, opacity: isConnected ? 0.7 : 1 }}
                      >
                        {isConnected ? 'Connected' : 'Connect'}
                      </button>
                    </div>
                  )})}
                </div>
              </div>

            </motion.div>
          )}
        </div>

        {/* Right: Impact + Achievements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Impact Summary */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card"
            style={{ padding: '20px' }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Leaf size={16} color="var(--green-400)" /> Impact Summary
            </h3>
            {[
              { label: 'Total CO₂ Offset', value: `${userOffset.toFixed(1)} kg`, color: 'var(--green-400)', note: '≈ ' + (userOffset / 21.77).toFixed(1) + ' trees/year' },
              { label: 'Trees Planted', value: userTrees, color: 'var(--green-500)', note: isOwnProfile ? `${(userTrees * 21.77).toFixed(0)} kg CO₂/yr absorbing` : '' },
            ].map(({ label, value, color, note }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Space Grotesk', color, marginBottom: 2 }}>{value}</div>
                {note && <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{note}</div>}
              </div>
            ))}
          </motion.div>

          {/* AI Advanced ML Insights */}
          {isOwnProfile && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
              className="glass-card"
              style={{ padding: '20px', border: '1px solid rgba(167, 139, 250, 0.3)', position: 'relative', overflow: 'hidden' }}
              whileHover={{ boxShadow: '0 8px 30px rgba(167, 139, 250, 0.15)' }}
            >
              <div style={{ position: 'absolute', top: -80, right: -80, width: 160, height: 160, background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--purple-400)' }}>
                ✨ Advanced ML Insights
              </h3>
              
              {!mlInsights ? (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <p style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 14 }}>Analyze your routine and activities using our predictive ML model.</p>
                  <button 
                    className="btn-secondary" 
                    onClick={handleGenerateInsights}
                    disabled={mlLoading}
                    style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--purple-300)', border: '1px solid rgba(167, 139, 250, 0.2)' }}
                  >
                    {mlLoading ? 'Analyzing...' : 'Generate Insights'}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>Predicted Monthly Emissions</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--red-400)' }}>{mlInsights.estimatedMonthlyCo2} kg</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>Trees Needed to Offset</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--green-400)' }}>{mlInsights.treesNeeded} Trees</div>
                  </div>
                  <div style={{ background: 'rgba(167, 139, 250, 0.1)', padding: 12, borderRadius: 8, border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--purple-300)', marginBottom: 4 }}>AI Suggestion</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{mlInsights.tip}</div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
            style={{ padding: '20px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={16} color="var(--gold)" /> Achievements
              </h3>
              <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{earnedCount}/{achievements.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {achievements.map(a => (
                <motion.div key={a.id} whileHover={{ scale: a.earned ? 1.02 : 1 }} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: a.earned ? `rgba(${a.color === 'green' ? '34,197,94' : a.color === 'gold' ? '245,158,11' : '96,165,250'},0.08)` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${a.earned ? `rgba(${a.color === 'green' ? '34,197,94' : a.color === 'gold' ? '245,158,11' : '96,165,250'},0.2)` : 'var(--border)'}`,
                  opacity: a.earned ? 1 : 0.45,
                  cursor: a.earned ? 'pointer' : 'default',
                  boxShadow: a.earned ? `0 4px 12px rgba(${a.color === 'green' ? '34,197,94' : a.color === 'gold' ? '245,158,11' : '96,165,250'},0.1)` : 'none'
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0, filter: a.earned ? 'none' : 'grayscale(1)' }}>{a.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: a.earned ? 'var(--text-primary)' : 'var(--text-dim)' }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{a.desc}</div>
                  </div>
                  {a.earned && <span style={{ fontSize: 14 }}>✅</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
