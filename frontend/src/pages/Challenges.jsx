import { useState, useEffect } from 'react';
import { Trophy, Target, Medal, CheckCircle2, Clock, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/appStore';
import { fetchGlobalChallenges, fetchUserChallenges, joinUserChallenge } from '../services/firebaseService';

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
      toast.error("You have already joined this challenge.");
      return;
    }

    await joinUserChallenge(user.uid, id);
    setUserChallenges(prev => ({ ...prev, [id]: { progress: 0 } }));
    toast.success(`Joined challenge! Good luck!`);
  };

  const calculateDaysLeft = (targetDate) => {
    if (!targetDate) return 0;
    const end = targetDate.toDate ? targetDate.toDate() : new Date(targetDate);
    const diff = end.getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 3600 * 24));
    return days > 0 ? days : 0;
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
          const daysLeft = calculateDaysLeft(challenge.target_date);
          
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

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: 'var(--text-dim)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Users size={14} /> {Math.floor(Math.random() * 500) + 100} joined</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} /> {daysLeft} days left</span>
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
                  <button className="btn-primary" style={{ width: '100%', marginTop: 16, padding: '10px', borderRadius: 12 }} disabled>
                    <CheckCircle2 size={16} style={{ display: 'inline', marginRight: 6 }} /> Completed
                  </button>
                ) : (
                  <button onClick={() => toggleJoin(challenge.id)} className="btn-secondary" style={{ width: '100%', marginTop: 16, padding: '10px', borderRadius: 12 }}>
                    Leave Challenge
                  </button>
                )}
              </div>
            ) : (
              <button 
                onClick={() => toggleJoin(challenge.id)}
                className="btn-primary" 
                style={{ width: '100%', marginTop: 'auto', padding: '12px', borderRadius: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <Target size={18} /> Join Challenge
              </button>
            )}
          </div>
        )})}
      </div>
    </div>
  );
}
