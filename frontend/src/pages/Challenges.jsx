import { useState, useEffect } from 'react';
import { Trophy, Target, Medal, CheckCircle2, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/appStore';
import { fetchGlobalChallenges, fetchUserChallenges, joinUserChallenge, leaveUserChallenge } from '../services/firebaseService';

/**
 * Displays a countdown timer to a target date.
 * @param {{ targetDate: any }} props 
 */
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    if (!targetDate) return;
    const end = targetDate.toDate ? targetDate.toDate().getTime() : new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / 1000 / 60) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Space Grotesk', fontSize: 13, fontWeight: 700 }}>
      <Clock size={14} color="var(--gold)" />
      <div style={{ display: 'flex', gap: 4 }}>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>{String(timeLeft.d).padStart(2, '0')}d</span>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>{String(timeLeft.h).padStart(2, '0')}h</span>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4 }}>{String(timeLeft.m).padStart(2, '0')}m</span>
        <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, color: 'var(--gold)' }}>{String(timeLeft.s).padStart(2, '0')}s</span>
      </div>
    </div>
  );
}

export default function Challenges() {
  const { user } = useAppStore();
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;
      const globalChallenges = await fetchGlobalChallenges();
      const myChallenges = await fetchUserChallenges(user.uid);
      
      const myMap = {};
      myChallenges.forEach(mc => { myMap[mc.id] = mc; });
      
      setUserChallenges(myMap);
      setChallenges(globalChallenges);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const toggleJoin = async (id) => {
    if (!user?.uid) return;
    
    if (userChallenges[id]) {
      await leaveUserChallenge(user.uid, id);
      setUserChallenges(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setChallenges(prev => prev.map(c => 
        c.id === id ? { ...c, participants_count: Math.max(0, (c.participants_count || 0) - 1) } : c
      ));
      toast.success("Left the challenge.");
    } else {
      await joinUserChallenge(user.uid, id);
      setUserChallenges(prev => ({ ...prev, [id]: { progress: 0 } }));
      setChallenges(prev => prev.map(c => 
        c.id === id ? { ...c, participants_count: (c.participants_count || 0) + 1 } : c
      ));
      toast.success(`Joined challenge! Good luck!`);
    }
  };



  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Community Challenges</h1>
          <p className="page-subtitle">Complete weekly eco-quests to earn massive Green Points and unlock badges.</p>
        </div>
        <div style={{
          background: 'rgba(234, 179, 8, 0.15)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          padding: '12px 20px',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <Trophy size={24} color="#eab308" />
          <div>
            <div style={{ fontSize: 12, color: '#eab308', fontWeight: 600, textTransform: 'uppercase' }}>Your Points</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', fontFamily: 'Space Grotesk' }}>2,450</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginTop: 24 }}>
        {loading ? (
          <div style={{ color: 'var(--text-dim)', padding: 24 }}>Loading challenges...</div>
        ) : challenges.map(challenge => {
          const isJoined = !!userChallenges[challenge.id];
          const progress = isJoined ? (userChallenges[challenge.id].progress || 0) : 0;
          
          return (
            <div key={challenge.id} className="glass-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 40 }}>{challenge.icon}</div>
              <div style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--green-400)', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                +{challenge.points} pts
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 6 }}>{challenge.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{challenge.description}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> {challenge.participants_count || 0} joined</span>
              <CountdownTimer targetDate={challenge.target_date} />
            </div>

            {isJoined ? (
              <div style={{ marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 8, color: 'white' }}>
                  <span>Progress</span>
                  <span style={{ color: 'var(--green-400)' }}>{progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                {progress >= 100 ? (
                  <button className="btn-primary" style={{ width: '100%', marginTop: 16, padding: '10px', borderRadius: 12 }} disabled aria-label="Challenge completed">
                    <CheckCircle2 size={16} style={{ display: 'inline', marginRight: 6 }} aria-hidden="true" /> Completed
                  </button>
                ) : (
                  <button onClick={() => toggleJoin(challenge.id)} className="btn-secondary" style={{ width: '100%', marginTop: 16, padding: '10px', borderRadius: 12 }} aria-label={`Leave challenge ${challenge.title}`}>
                    Leave Challenge
                  </button>
                )}
              </div>
            ) : (
              <button 
                onClick={() => toggleJoin(challenge.id)}
                className="btn-primary" 
                style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                aria-label={`Join challenge ${challenge.title}`}
              >
                <Target size={18} aria-hidden="true" /> Join Challenge
              </button>
            )}
          </div>
        )})}
      </div>
    </div>
  );
}
