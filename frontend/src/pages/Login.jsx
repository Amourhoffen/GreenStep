import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Leaf, ArrowRight, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, isConfigured } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAppStore((s) => s.setUser);

  const handleAuthSuccess = (user) => {
    setUser({ uid: user.uid, displayName: user.displayName || user.email.split('@')[0], email: user.email, photoURL: user.photoURL });
    navigate('/dashboard');
  };

  const handleDemoLogin = () => {
    setUser({ uid: 'demo-user', displayName: 'Priya Sharma', email: 'priya@greenstep.app', photoURL: null });
    useAppStore.setState({ isDemo: true });
    navigate('/dashboard');
    toast.success('🌱 Welcome to GreenStep Demo!');
  };

  const handleGoogleSignIn = async () => {
    if (!isConfigured) { handleDemoLogin(); return; }
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      handleAuthSuccess(result.user);
      toast.success('Signed in with Google!');
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isConfigured) { handleDemoLogin(); return; }
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    try {
      setLoading(true);
      if (isLogin) {
        const r = await signInWithEmailAndPassword(auth, email, password);
        handleAuthSuccess(r.user);
        toast.success('Welcome back!');
      } else {
        const r = await createUserWithEmailAndPassword(auth, email, password);
        handleAuthSuccess(r.user);
        toast.success('Account created!');
      }
    } catch (e) { toast.error(e.message); } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', padding: '20px',
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Background glow orbs */}
      <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '15%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px', pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: '100%', maxWidth: 440,
          background: 'rgba(11, 22, 16, 0.85)',
          backdropFilter: 'blur(32px)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
          borderRadius: 28,
          padding: '48px 40px',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(34,197,94,0.08)',
          position: 'relative', zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 72, height: 72, borderRadius: 20,
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
              boxShadow: '0 12px 30px rgba(34,197,94,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          >
            <Leaf size={34} color="white" />
          </motion.div>
          <h1 style={{ fontSize: 30, fontWeight: 800, fontFamily: 'Space Grotesk', color: '#f0fdf4', marginBottom: 8, letterSpacing: '-0.02em' }}>
            GreenStep
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(134,239,172,0.7)', fontWeight: 400, textAlign: 'center', lineHeight: 1.5 }}>
            {isLogin ? 'Welcome back, earthling 🌱' : 'Join the movement. Plant your future 🌿'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Email field */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
              <Mail size={18} color="rgba(74,222,128,0.5)" />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '15px 16px 15px 48px',
                background: 'rgba(14, 26, 17, 0.9)',
                border: '1px solid rgba(74, 222, 128, 0.15)',
                borderRadius: 14,
                color: '#f0fdf4',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(34,197,94,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(74,222,128,0.15)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Password field */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
              <Lock size={18} color="rgba(74,222,128,0.5)" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '15px 16px 15px 48px',
                background: 'rgba(14, 26, 17, 0.9)',
                border: '1px solid rgba(74, 222, 128, 0.15)',
                borderRadius: 14,
                color: '#f0fdf4',
                fontSize: 15,
                fontFamily: 'Inter, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(34,197,94,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(34,197,94,0.1)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(74,222,128,0.15)'; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Sign In Button */}
          <motion.button
            whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '15px 24px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              border: 'none', borderRadius: 14,
              color: 'white', fontSize: 16, fontWeight: 700,
              fontFamily: 'Inter, sans-serif',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 8px 24px rgba(34,197,94,0.35)',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s',
              marginTop: 4,
            }}
          >
            {loading ? (
              <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            ) : (
              <><LogIn size={18} /> {isLogin ? 'Sign In' : 'Create Account'}</>
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '24px 0' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(74,222,128,0.12)' }} />
          <span style={{ fontSize: 12, color: 'rgba(134,239,172,0.4)', fontWeight: 600, letterSpacing: '0.1em' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: 'rgba(74,222,128,0.12)' }} />
        </div>

        {/* Google Button */}
        <motion.button
          whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.08)' }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleSignIn}
          type="button"
          style={{
            width: '100%', padding: '14px 24px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 14,
            color: '#f0fdf4', fontSize: 15, fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            transition: 'all 0.2s',
          }}
        >
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: '#4285F4', fontWeight: 900, fontSize: 12 }}>G</span>
          </div>
          Continue with Google
        </motion.button>

        {/* Demo Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDemoLogin}
          type="button"
          style={{
            width: '100%', padding: '13px 24px',
            background: 'rgba(34,197,94,0.06)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 14, marginTop: 12,
            color: '#4ade80', fontSize: 14, fontWeight: 600,
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s',
          }}
        >
          <Sparkles size={16} /> Try Demo — No Account Needed
        </motion.button>

        {/* Toggle auth mode */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'rgba(134,239,172,0.6)', fontFamily: 'Inter, sans-serif' }}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span style={{ color: '#4ade80', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
              {isLogin ? 'Sign up' : 'Sign in'} <ArrowRight size={13} />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
