import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ActivityLogger from './pages/ActivityLogger';
import TreePlanting from './pages/TreePlanting';
import Community from './pages/Community';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';
import Login from './pages/Login';
import Knowledge from './pages/Knowledge';
import Onboarding from './pages/Onboarding';
import Challenges from './pages/Challenges';
import Rewards from './pages/Rewards';
import Events from './pages/Events';
import JourneyCalculator from './pages/JourneyCalculator';
import Presentation from './pages/Presentation';
import { useAppStore } from './store/appStore';
import { auth, isConfigured } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { initializeGlobalData } from './services/firebaseService';
import './index.css';

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
    </BrowserRouter>
  );
}
