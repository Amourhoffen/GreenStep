import { useState, useEffect } from 'react';
import { Gift, Tag, Lock, Unlock, ArrowRight, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/appStore';
import { fetchGlobalRewards, fetchUserRewards, unlockUserReward } from '../services/firebaseService';

export default function Rewards() {
  const { user, getCarbonScore } = useAppStore();
  const [points, setPoints] = useState(getCarbonScore() * 10); // Example points
  const [rewards, setRewards] = useState([]);
  const [userRewards, setUserRewards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;
      const globalRewards = await fetchGlobalRewards();
      const myRewards = await fetchUserRewards(user.uid);
      
      const myMap = {};
      myRewards.forEach(mr => { myMap[mr.id] = mr; });
      
      setUserRewards(myMap);
      setRewards(globalRewards);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const unlockReward = async (reward) => {
    if (!user?.uid) return;
    if (points >= reward.cost) {
      setPoints(p => p - reward.cost);
      const code = `GS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      await unlockUserReward(user.uid, reward.id, code);
      setUserRewards(prev => ({ ...prev, [reward.id]: { unlocked_at: new Date(), code } }));
      toast.success(`Unlocked ${reward.title}!`);
    } else {
      toast.error('Not enough Green Points!');
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Rewards Store</h1>
          <p className="page-subtitle">Spend your Green Points to unlock real-world eco-perks and discounts.</p>
        </div>
        <div style={{
          background: 'rgba(34, 197, 94, 0.15)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          padding: '12px 20px',
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <Zap size={24} color="var(--green-400)" />
          <div>
            <div style={{ fontSize: 12, color: 'var(--green-500)', fontWeight: 600, textTransform: 'uppercase' }}>Green Points</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'white', fontFamily: 'Space Grotesk' }}>{points.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginTop: 24 }}>
        {loading ? (
          <div style={{ color: 'var(--text-dim)', padding: 24 }}>Loading rewards...</div>
        ) : rewards.map(reward => {
          const isUnlocked = !!userRewards[reward.id];
          const promoCode = isUnlocked ? userRewards[reward.id].code : null;

          return (
          <div key={reward.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: `linear-gradient(135deg, ${reward.color}22, transparent)`, padding: 24, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 40 }}>{reward.icon}</span>
                {isUnlocked ? (
                  <div style={{ background: 'rgba(34,197,94,0.1)', color: 'var(--green-400)', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Unlock size={14} /> Unlocked
                  </div>
                ) : (
                  <div style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '6px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Lock size={14} /> {reward.cost} pts
                  </div>
                )}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', fontFamily: 'Space Grotesk', marginBottom: 4 }}>{reward.title}</h3>
              <p style={{ fontSize: 14, color: reward.color, fontWeight: 600 }}>{reward.brand}</p>
            </div>
            
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
              <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: 24 }}>
                {reward.description}
              </p>
              
              <div style={{ marginTop: 'auto' }}>
                {isUnlocked ? (
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Promo Code</div>
                    <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px dashed var(--green-500)', padding: '12px 16px', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: 18, color: 'var(--green-400)', fontWeight: 700, letterSpacing: '0.1em' }}>{promoCode}</span>
                      <button onClick={() => { navigator.clipboard.writeText(promoCode); toast.success('Copied to clipboard!')}} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}>
                        Copy
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => unlockReward(reward)}
                    disabled={points < reward.cost}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '14px', borderRadius: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: points < reward.cost ? 0.5 : 1 }}
                  >
                    Unlock Reward <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
