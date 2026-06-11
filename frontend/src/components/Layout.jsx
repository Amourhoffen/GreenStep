import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import {
  LayoutDashboard, Activity, TreePine, Users, MessageCircle,
  Menu, X, Leaf, ChevronRight, ChevronLeft, Settings, LogOut, User as UserIcon, Flame, Car
} from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import { BookOpen, Target, Gift, MapPin } from 'lucide-react';
const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/track', icon: Activity, label: 'Track Activity' },
  { to: '/journey', icon: Car, label: 'Journey Calculator' },
  { to: '/plant', icon: TreePine, label: 'Plant a Tree' },
  { to: '/community', icon: Users, label: 'Community' },
  { to: '/challenges', icon: Target, label: 'Challenges' },
  { to: '/events', icon: MapPin, label: 'Local Events' },
  { to: '/rewards', icon: Gift, label: 'Rewards' },
  { to: '/knowledge', icon: BookOpen, label: 'Knowledge Hub' },
  { to: '/profile', icon: UserIcon, label: 'Profile' },
  { to: '/chat', icon: MessageCircle, label: 'AI Advisor' },
];

export default function Layout() {
  const { user, trees, activities, getNetBalance, getCarbonScore, isDemo, logout } = useAppStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const netBalance = getNetBalance();
  const score = getCarbonScore();
  const isPositive = netBalance >= 0;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>

      {/* ── Sidebar Desktop ── */}
      <motion.aside 
        className="sidebar-desktop" 
        animate={{ width: isCollapsed ? 84 : 272 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          flexShrink: 0,
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
          position: 'sticky', top: 0, height: '100vh', zIndex: 50,
        }}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            position: 'absolute', top: 28, right: -14,
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '50%', width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', zIndex: 60, color: 'var(--text-dim)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Logo */}
        <div style={{ padding: isCollapsed ? '24px 0 20px' : '24px 20px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(34,197,94,0.45)',
              flexShrink: 0,
            }}>
              <Leaf size={20} color="white" />
            </div>
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 19, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>GreenStep</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 1 }}>Carbon Tracker AI</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* User card */}
        <div style={{ padding: isCollapsed ? '16px 0' : '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
          {isCollapsed ? (
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #22c55e, #4ade80)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14, color: 'white',
            }}>
              {user?.displayName?.[0] || 'P'}
            </div>
          ) : (
            <div style={{
              background: 'var(--bg-card)', borderRadius: 12, width: '100%',
              padding: '12px 14px', border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, color: 'white', flexShrink: 0
                }}>
                  {user?.displayName?.[0] || 'P'}
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user?.displayName || 'Demo User'}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>Carbon Score: {score}/100</div>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${score}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: isCollapsed ? '16px 8px' : '16px 12px', overflowY: 'auto', overflowX: 'hidden' }}>
          {!isCollapsed && (
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-dim)', padding: '0 8px 10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Navigation
            </div>
          )}
          {NAV.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
              style={{ 
                marginBottom: 4, 
                justifyContent: isCollapsed ? 'center' : 'flex-start', 
                padding: isCollapsed ? '12px 0' : undefined,
                overflow: 'hidden'
              }}
              title={isCollapsed ? label : undefined}
            >
              <Icon size={isCollapsed ? 22 : 18} style={{ flexShrink: 0 }} />
              {!isCollapsed && <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{label}</span>}
              {!isCollapsed && location.pathname === to && <ChevronRight size={14} style={{ flexShrink: 0 }} />}
            </NavLink>
          ))}
        </nav>

        {/* Net balance pill */}
        <div style={{ padding: isCollapsed ? '16px 0' : '12px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center' }}>
          {isCollapsed ? (
             <div style={{
               width: 44, height: 44, borderRadius: '50%',
               background: isPositive ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
               border: `1px solid ${isPositive ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
               display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
               color: isPositive ? 'var(--green-400)' : 'var(--red-400)',
             }} title={isPositive ? `Net Saver: +${netBalance.toFixed(0)} kg` : `Net Emitter: ${netBalance.toFixed(0)} kg`}>
               {isPositive ? <Leaf size={16} /> : <Flame size={16} />}
               <span style={{ fontSize: 9, fontWeight: 800, marginTop: 2 }}>{Math.abs(netBalance).toFixed(0)}</span>
             </div>
          ) : (
            <div style={{ width: '100%' }}>
              <div style={{
                background: isPositive ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                border: `1px solid ${isPositive ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: 10, padding: '10px 14px',
              }}>
                <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 2 }}>Net Carbon Balance</div>
                <div style={{
                  fontSize: 20, fontWeight: 800, fontFamily: 'Space Grotesk',
                  color: isPositive ? 'var(--green-400)' : 'var(--red-400)',
                  whiteSpace: 'nowrap'
                }}>
                  {isPositive ? '+' : ''}{netBalance.toFixed(1)} <span style={{ fontSize: 12, fontWeight: 400 }}>kg CO₂</span>
                </div>
                <div style={{ fontSize: 11, color: isPositive ? 'var(--green-500)' : 'var(--red-400)', marginTop: 2, whiteSpace: 'nowrap' }}>
                  {isPositive ? '🟢 Net Carbon Saver' : '🔴 Net Emitter'}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: 'var(--text-dim)', flex: 1, whiteSpace: 'nowrap'
                }}>
                  <TreePine size={13} color="var(--green-500)" />
                  {trees.length} trees planted
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: 'var(--text-dim)', whiteSpace: 'nowrap'
                }}>
                  <Activity size={13} color="var(--red-400)" />
                  {activities.length} activities
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.aside>

      {/* ── Mobile Nav ── */}
      <div className="mobile-nav" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '12px 0 20px',
        justifyContent: 'space-around',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.2)'
      }}>
        {['/community', '/track', '/knowledge', '/chat', '/profile'].map(path => {
          const item = NAV.find(n => n.to === path);
          if (!item) return null;
          const { to, icon: Icon, label } = item;
          return (
            <NavLink key={to} to={to} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textDecoration: 'none' }}>
              {({ isActive }) => (
                <>
                  <Icon size={24} color={isActive ? 'var(--green-400)' : 'var(--text-dim)'} />
                  <span style={{ fontSize: 11, color: isActive ? 'var(--green-400)' : 'var(--text-dim)', fontWeight: 600 }}>{label.split(' ')[0]}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 110, backdropFilter: 'blur(4px)'
            }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, width: 280,
                background: 'var(--bg-surface)', borderRight: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', overflowY: 'auto'
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #22c55e, #16a34a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Leaf size={18} color="white" />
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: 18, color: 'var(--text-primary)' }}>GreenStep</div>
                </div>
                <button onClick={() => setMobileOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                  <X size={24} />
                </button>
              </div>
              <nav style={{ padding: '16px 12px', flex: 1 }}>
                {NAV.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                    style={{ marginBottom: 4 }}
                  >
                    <Icon size={18} style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{label}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', paddingBottom: 80 }}>
        {/* Top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(6, 12, 8, 0.92)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 32px',
          height: 64,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button className="mobile-nav" onClick={() => setMobileOpen(true)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 0 }}>
              <Menu size={24} />
            </button>
            <span style={{ fontSize: 13, color: 'var(--text-dim)' }} className="hide-on-mobile">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
            {isDemo && (
              <div className="badge badge-green" style={{ gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-500)', display: 'inline-block' }} />
                Demo Mode
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <NavLink to="/profile" style={{ textDecoration: 'none' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #22c55e, #4ade80)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14, color: 'white', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(34,197,94,0.3)',
              }}>
                {user?.displayName?.[0] || 'G'}
              </div>
            </NavLink>
            <button
              onClick={() => {
                logout(); // clears all user state + chat history
                if (!isDemo) signOut(auth).catch(() => {});
              }}
              style={{
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 10, color: 'var(--red-400)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, transition: 'all 0.2s',
              }}
              title="Log Out"
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div className="page-padding" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
