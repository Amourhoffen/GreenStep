import { useAppStore } from '../store/appStore';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TreePine, Activity, TrendingDown, Award, ArrowRight, Flame, Globe } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const CATEGORY_CONFIG = {
  transport: { icon: '🚗', color: '#f87171', label: 'Transport' },
  food:      { icon: '🥗', color: '#fb923c', label: 'Food' },
  energy:    { icon: '⚡', color: '#facc15', label: 'Energy' },
  shopping:  { icon: '🛍',  color: '#a78bfa', label: 'Shopping' },
};

function StatCard({ icon: Icon, label, value, unit, color, sub }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 12px 30px ${color}15` }}
      className="glass-card bento-card"
      style={{ 
        padding: '24px', 
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${color}20`,
        background: `linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)`
      }}
    >
      <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, borderRadius: '50%' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: `${color}15`, border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Icon size={22} color={color} />
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-dim)', fontWeight: 600, letterSpacing: '0.02em' }}>{label}</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Space Grotesk', color, lineHeight: 1, textShadow: `0 2px 10px ${color}30` }}>
        {value}
        <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-dim)', marginLeft: 6 }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: 13, color: sub.positive ? 'var(--green-500)' : 'var(--red-400)', marginTop: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
        {sub.text}
      </div>}
    </motion.div>
  );
}

function CarbonScoreRing({ score }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const filled = (score / 100) * circ;
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  return (
    <div style={{ position: 'relative', width: 128, height: 128, flexShrink: 0 }}>
      <svg width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(74,222,128,0.07)" strokeWidth="10" />
        <circle
          cx="64" cy="64" r={r} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${filled} ${circ}`}
          transform="rotate(-90 64 64)"
          style={{ transition: 'all 1.2s ease', filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: 26, fontWeight: 900, fontFamily: 'Space Grotesk', color }}>{score}</div>
        <div style={{ fontSize: 10, color: 'var(--text-dim)', fontWeight: 600, marginTop: 2 }}>SCORE</div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, activities, trees, totalCO2Emitted, totalCO2Offset, getBadges, getCarbonScore, weekStreak, weeklyGoalKg, weeklyEmittedKg, ecoTasks } = useAppStore();
  const score = getCarbonScore();
  const badges = getBadges();
  const netBalance = totalCO2Offset - totalCO2Emitted;
  const isPositive = netBalance >= 0;
  const firstName = user?.displayName?.split(' ')[0] || 'Earthling';

  const INDIA_AVG = 28.4;
  const WORLD_AVG = 87.5;
  const weeklyPct = weeklyGoalKg > 0 ? Math.min(100, Math.round((weeklyEmittedKg / weeklyGoalKg) * 100)) : 0;

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const dayActs = activities.filter(a => new Date(a.created_at).toDateString() === d.toDateString());
    const dayOffset = trees.reduce((s, t) => s + t.co2_kg_year / 365, 0);
    return {
      day: d.toLocaleDateString('en-IN', { weekday: 'short' }),
      emitted: parseFloat(dayActs.reduce((s, a) => s + a.co2_kg, 0).toFixed(2)),
      offset: parseFloat(dayOffset.toFixed(2)),
    };
  });

  const categoryMap = {};
  activities.forEach(a => { categoryMap[a.category] = (categoryMap[a.category] || 0) + a.co2_kg; });

  return (
    <motion.div 
      className="animate-fade-up" 
      style={{ display: 'flex', flexDirection: 'column', gap: 32, paddingBottom: 60 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* ── Welcome Hero Banner ── */}
      <motion.div 
        style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border)', 
          borderRadius: '24px', 
          padding: '36px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
          position: 'relative', overflow: 'hidden'
        }}
        whileHover={{ boxShadow: '0 12px 40px rgba(34,197,94,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ position: 'absolute', right: -50, top: -50, width: 300, height: 300, background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Space Grotesk', marginBottom: 6, lineHeight: 1.2 }}>
            Welcome back, <span className="gradient-text">{firstName}</span> 🌱
          </h1>
          <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <NavLink to="/track" className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
            <Activity size={15} /> Log Activity
          </NavLink>
          <NavLink to="/plant" className="btn-secondary" style={{ padding: '10px 18px', fontSize: 13 }}>
            <TreePine size={15} /> Plant Tree
          </NavLink>
        </div>
      </motion.div>

      {/* ── Eco Tasks (ML Generated) ── */}
      {ecoTasks && ecoTasks.length > 0 && (
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Award size={20} color="var(--gold)" />
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Your Personalized ML Eco Tasks</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {ecoTasks.map(task => (
              <div key={task.id} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column', gap: 12
              }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{task.title}</div>
                
                {task.status === 'pending' ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: 12, color: 'var(--red-400)', fontWeight: 600 }}>Pending Proof</span>
                    <NavLink to="/community" className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12, background: 'rgba(34,197,94,0.1)', color: 'var(--green-400)', border: '1px solid rgba(34,197,94,0.2)' }}>
                      Upload Proof
                    </NavLink>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{ fontSize: 12, color: 'var(--green-500)', fontWeight: 600 }}>✅ Completed</span>
                    <NavLink to="/community" style={{ fontSize: 12, color: 'var(--blue-400)', textDecoration: 'underline' }}>
                      View Verified Proof
                    </NavLink>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Carbon Score + 3 Stat Cards ── */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: 20 }}>

        {/* Score card */}
        <div className="glass-card bento-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: 24, minWidth: 260, border: '1px solid rgba(34,197,94,0.15)', background: 'linear-gradient(135deg, rgba(34,197,94,0.05) 0%, transparent 100%)' }}>
          <CarbonScoreRing score={score} />
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Carbon Score</div>
            <div style={{
              fontSize: 18, fontWeight: 800, marginBottom: 12,
              color: score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444',
            }}>
              {score >= 70 ? '🌟 Eco Champion' : score >= 40 ? '📈 Making Progress' : '⚠️ High Emitter'}
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: 13, color: 'var(--text-dim)', fontWeight: 500 }}>
              <span>🌳 {trees.length} trees</span>
              <span>📊 {activities.length} logs</span>
            </div>
          </div>
        </div>

        <StatCard icon={Activity} label="Total CO₂ Emitted" value={totalCO2Emitted.toFixed(1)} unit="kg" color="#ef4444" sub={{ text: `${activities.length} activities logged`, positive: false }} />
        <StatCard icon={TreePine} label="Total CO₂ Offset" value={totalCO2Offset.toFixed(1)} unit="kg" color="#22c55e" sub={{ text: `${trees.length} trees planted`, positive: true }} />
        <StatCard icon={TrendingDown} label="Net Balance" value={(isPositive ? '+' : '') + netBalance.toFixed(1)} unit="kg" color={isPositive ? '#22c55e' : '#ef4444'} sub={{ text: isPositive ? '🟢 Net Carbon Saver' : '🔴 Net Emitter', positive: isPositive }} />
      </div>

      {/* ── Chart + Right Column ── */}
      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>

        {/* 7-Day Chart */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>📈 7-Day Trend</h2>
              <p style={{ fontSize: 12, color: 'var(--text-dim)' }}>Daily emissions vs. tree offsets</p>
            </div>
            <div style={{ display: 'flex', gap: 18, fontSize: 11, color: 'var(--text-dim)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: '#ef4444', display: 'inline-block' }} /> Emitted</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: '#22c55e', display: 'inline-block' }} /> Offset</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="emitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="offsetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#101e14', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, fontSize: 12 }} labelStyle={{ color: '#f0fdf4' }} />
              <Area type="monotone" dataKey="emitted" name="Emitted (kg)" stroke="#ef4444" strokeWidth={2.5} fill="url(#emitGrad)" />
              <Area type="monotone" dataKey="offset" name="Offset (kg)" stroke="#22c55e" strokeWidth={2.5} fill="url(#offsetGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Weekly goal */}
          <div className="glass-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
                <Flame size={16} color="#f59e0b" /> Weekly Goal
              </h3>
              <span className="badge badge-gold">{weekStreak} day streak 🔥</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)', marginBottom: 8 }}>
                <span>This week</span>
                <span style={{ fontWeight: 700, color: weeklyPct > 80 ? 'var(--red-400)' : 'var(--text-primary)' }}>
                  {weeklyEmittedKg} / {weeklyGoalKg} kg
                </span>
              </div>
              <div className="streak-bar">
                <div className="streak-fill" style={{ width: `${weeklyPct}%`, background: weeklyPct > 80 ? 'linear-gradient(90deg, #ef4444, #f87171)' : undefined }} />
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 8 }}>
              {weeklyPct > 80 ? '⚠️ Near limit — consider offsetting!' : '✅ On track — keep going!'}
            </div>
          </div>

          {/* CO2 Comparison */}
          <div className="glass-card" style={{ padding: '22px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <Globe size={16} color="var(--blue-400)" />
              <h3 style={{ fontSize: 14, fontWeight: 700 }}>Your CO₂ vs. Averages</h3>
            </div>
            {[
              { label: 'You', value: totalCO2Emitted, color: isPositive ? '#22c55e' : '#ef4444', max: WORLD_AVG * 1.2 },
              { label: '🇮🇳 India avg', value: INDIA_AVG, color: '#f59e0b', max: WORLD_AVG * 1.2 },
              { label: '🌍 World avg', value: WORLD_AVG, color: '#60a5fa', max: WORLD_AVG * 1.2 },
            ].map(({ label, value, color, max }) => (
              <div key={label} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color }}>{value.toFixed(1)} kg/mo</span>
                </div>
                <div className="compare-bar-wrap">
                  <motion.div
                    className="compare-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (value / max) * 100)}%` }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Activities + Badges + Category ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>

        {/* Recent Activities */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Activities</h2>
            <NavLink to="/track" style={{ fontSize: 12, color: 'var(--green-400)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              Log new <ArrowRight size={12} />
            </NavLink>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {activities.slice(0, 6).map((a, i) => {
              const cat = CATEGORY_CONFIG[a.category] || { icon: '📊', color: '#6b7280', label: a.category };
              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 16px',
                    background: 'rgba(255,255,255,0.025)',
                    borderRadius: 12, border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                    {cat.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.activity_type}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>{new Date(a.created_at).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#ef4444', flexShrink: 0 }}>{a.co2_kg.toFixed(2)} kg</div>
                </motion.div>
              );
            })}
            {activities.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)', fontSize: 14 }}>
                No activities yet.<br />
                <NavLink to="/track" style={{ color: 'var(--green-400)', textDecoration: 'none', marginTop: 8, display: 'inline-block' }}>Log your first activity →</NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Right: Badges + Category */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Badges */}
          <div className="glass-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700 }}>🏅 Achievements</h2>
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{badges.length} earned</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {badges.map((b, i) => (
                <motion.div whileHover={{ scale: 1.06 }} key={i} className={`badge badge-${b.color}`} style={{ fontSize: 12, padding: '5px 11px' }}>
                  {b.icon} {b.label}
                </motion.div>
              ))}
              {badges.length === 0 && <div style={{ fontSize: 12, color: 'var(--text-dim)', padding: '8px 0' }}>Start tracking to earn badges! 🌱</div>}
            </div>
          </div>

          {/* Category breakdown */}
          <div className="glass-card" style={{ padding: '20px', flex: 1 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>By Category</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {Object.entries(categoryMap).map(([cat, val]) => {
                const cfg = CATEGORY_CONFIG[cat] || { icon: '📊', color: '#6b7280', label: cat };
                const pct = totalCO2Emitted > 0 ? (val / totalCO2Emitted) * 100 : 0;
                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 5 }}>{cfg.icon} {cfg.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: cfg.color }}>{val.toFixed(1)} kg</span>
                    </div>
                    <div className="progress-bar">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, delay: 0.2 }}
                        style={{ height: '100%', background: cfg.color, borderRadius: 999, boxShadow: `0 0 8px ${cfg.color}80` }} />
                    </div>
                  </div>
                );
              })}
              {Object.keys(categoryMap).length === 0 && (
                <div style={{ fontSize: 12, color: 'var(--text-dim)', textAlign: 'center', padding: '20px 0' }}>No activities yet 🚗</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
