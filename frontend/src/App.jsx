import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect, Suspense, lazy } from 'react';
import { useAppStore } from './store/appStore';
import { auth, isConfigured } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeGlobalData } from './services/firebaseService';
import './index.css';

// Lazy loading all pages to improve Lighthouse / PageSpeed rank
const Layout = lazy(() => import('./components/Layout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ActivityLogger = lazy(() => import('./pages/ActivityLogger'));
const TreePlanting = lazy(() => import('./pages/TreePlanting'));
const Community = lazy(() => import('./pages/Community'));
const Profile = lazy(() => import('./pages/Profile'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const Login = lazy(() => import('./pages/Login'));
const Knowledge = lazy(() => import('./pages/Knowledge'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Rewards = lazy(() => import('./pages/Rewards'));
const Events = lazy(() => import('./pages/Events'));
const JourneyCalculator = lazy(() => import('./pages/JourneyCalculator'));
const Presentation = lazy(() => import('./pages/Presentation'));

// Simple loading spinner for Suspense fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-main)' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 40, height: 40, border: '3px solid rgba(34,197,94,0.2)', borderTopColor: '#22c55e', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
      <div style={{ color: 'var(--green-500)', fontWeight: 600, letterSpacing: '0.05em' }}>Loading GreenStep...</div>
    </div>
  </div>
);

export default function App() {
  const { isAuthenticated, hasCompletedOnboarding, setUser } = useAppStore();

  useEffect(() => {
    if (isConfigured && auth) {
      initializeGlobalData();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({
            uid: user.uid,
            displayName: user.displayName || user.email.split('@')[0],
            email: user.email,
            photoURL: user.photoURL,
          });
          useAppStore.setState({ isDemo: false });
          useAppStore.getState().fetchUserData();
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#142018',
            color: '#f0fdf4',
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#22c55e', secondary: '#142018' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#142018' },
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Pitch Deck Route */}
          <Route path="/presentation" element={<Presentation />} />

          <Route path="/login" element={!isAuthenticated ? <Login /> : (hasCompletedOnboarding ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />)} />
          
          <Route path="/onboarding" element={isAuthenticated && !hasCompletedOnboarding ? <Onboarding /> : <Navigate to="/dashboard" replace />} />

          <Route path="/" element={isAuthenticated ? (hasCompletedOnboarding ? <Layout /> : <Navigate to="/onboarding" replace />) : <Navigate to="/login" replace />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="track" element={<ActivityLogger />} />
            <Route path="plant" element={<TreePlanting />} />
            <Route path="community" element={<Community />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="journey" element={<JourneyCalculator />} />
            <Route path="events" element={<Events />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
