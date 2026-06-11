import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/appStore';
import { useNavigate } from 'react-router-dom';
import { Leaf, Car, Home, Utensils, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'diet',
    title: "What's your typical diet?",
    icon: Utensils,
    options: [
      { id: 'vegan', label: 'Vegan', value: 1.5, desc: 'Plant-based only' },
      { id: 'vegetarian', label: 'Vegetarian', value: 2.0, desc: 'No meat, includes dairy' },
      { id: 'flexitarian', label: 'Flexitarian', value: 3.5, desc: 'Meat occasionally' },
      { id: 'meat', label: 'Meat Lover', value: 5.5, desc: 'Meat most days' },
    ]
  },
  {
    id: 'transport',
    title: 'How do you usually commute?',
    icon: Car,
    options: [
      { id: 'walk', label: 'Walk / Cycle', value: 0.1, desc: 'Active transport' },
      { id: 'transit', label: 'Public Transit', value: 1.2, desc: 'Bus, train, metro' },
      { id: 'bike', label: 'Motorbike', value: 2.5, desc: 'Two-wheeler' },
      { id: 'car', label: 'Car', value: 6.0, desc: 'Personal vehicle' },
    ]
  },
  {
    id: 'home',
    title: 'What best describes your home?',
    icon: Home,
    options: [
      { id: 'shared', label: 'Shared / Hostel', value: 1.0, desc: 'Shared utilities' },
      { id: 'apartment', label: 'Apartment', value: 2.5, desc: '1-3 BHK flat' },
      { id: 'house', label: 'Independent House', value: 4.5, desc: 'Standard house' },
      { id: 'villa', label: 'Large Villa', value: 8.0, desc: 'High energy usage' },
    ]
  }
];

export default function Onboarding() {
  const { completeOnboarding, user } = useAppStore();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(-1); // -1 is welcome screen
  const [answers, setAnswers] = useState({});
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
      } else {
        calculateResult();
      }
    }, 400);
  };

  const calculateResult = () => {
    setCalculating(true);
    setStep(QUESTIONS.length);
    
    // Simulate calculation
    setTimeout(() => {
      const total = Object.values(answers).reduce((a, b) => a + b, 0);
      const monthlyBaseline = total * 30; // rough estimate kg CO2
      setResult(monthlyBaseline);
      setCalculating(false);
    }, 2000);
  };

  const finishOnboarding = () => {
    completeOnboarding();
    navigate('/dashboard', { replace: true });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />

      <div style={{
        width: '100%',
        maxWidth: 600,
        background: 'rgba(20,32,24,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: 24,
        padding: 40,
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        minHeight: 450,
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {step === -1 && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
              <div style={{ 
                width: 80, height: 80, borderRadius: 24, 
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(34,197,94,0.3)',
                marginBottom: 32
              }}>
                <Leaf size={40} color="white" />
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 32, fontWeight: 800, color: 'white', marginBottom: 16 }}>
                Welcome to GreenStep
              </h1>
              <p style={{ color: 'var(--text-dim)', fontSize: 16, lineHeight: 1.6, maxWidth: 400, marginBottom: 40 }}>
                Hi {user?.displayName?.split(' ')[0] || 'there'}! Before we start tracking, let's take 30 seconds to calculate your personalized carbon baseline.
              </p>
              <button 
                onClick={() => setStep(0)}
                className="btn-primary"
                style={{ width: '100%', padding: '16px 24px', fontSize: 16, borderRadius: 16, display: 'flex', gap: 12, justifyContent: 'center' }}
              >
                Let's Go <ArrowRight size={20} />
              </button>
            </motion.div>
          )}

          {/* Quiz Steps */}
          {step >= 0 && step < QUESTIONS.length && (
            <motion.div 
              key={`q-${step}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
            >
              {/* Progress bar */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={{ 
                    flex: 1, height: 4, borderRadius: 2,
                    background: i <= step ? 'var(--green-500)' : 'rgba(255,255,255,0.1)',
                    transition: 'background 0.3s'
                  }} />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                {(() => {
                  const Icon = QUESTIONS[step].icon;
                  return <Icon size={32} color="var(--green-400)" />;
                })()}
                <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: 'white' }}>
                  {QUESTIONS[step].title}
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, flex: 1 }}>
                {QUESTIONS[step].options.map(opt => {
                  const isSelected = answers[QUESTIONS[step].id] === opt.value;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => handleSelect(QUESTIONS[step].id, opt.value)}
                      style={{
                        background: isSelected ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.03)',
                        border: `2px solid ${isSelected ? 'var(--green-500)' : 'rgba(255,255,255,0.05)'}`,
                        borderRadius: 16, padding: 20, cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex', flexDirection: 'column', gap: 8
                      }}
                      onMouseEnter={(e) => { if(!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                      onMouseLeave={(e) => { if(!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                    >
                      <div style={{ fontWeight: 600, color: isSelected ? 'var(--green-400)' : 'var(--text-primary)' }}>
                        {opt.label}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>{opt.desc}</div>
                    </div>
                  );
                })}
              </div>

              {step > 0 && (
                <button 
                  onClick={() => setStep(s => s - 1)}
                  style={{ 
                    marginTop: 32, background: 'none', border: 'none', 
                    color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                    alignSelf: 'flex-start'
                  }}
                >
                  <ChevronLeft size={16} /> Back
                </button>
              )}
            </motion.div>
          )}

          {/* Calculating & Results Step */}
          {step === QUESTIONS.length && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
            >
              {calculating ? (
                <>
                  <div className="spinner" style={{ 
                    width: 48, height: 48, border: '4px solid rgba(34,197,94,0.2)',
                    borderTopColor: 'var(--green-500)', borderRadius: '50%', marginBottom: 24,
                    animation: 'spin 1s linear infinite'
                  }} />
                  <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, color: 'white', marginBottom: 8 }}>Analyzing Lifestyle...</h2>
                  <p style={{ color: 'var(--text-dim)' }}>Calculating your personalized baseline.</p>
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </>
              ) : (
                <>
                  <CheckCircle2 size={64} color="var(--green-500)" style={{ marginBottom: 24 }} />
                  <h2 style={{ fontFamily: 'Space Grotesk', fontSize: 24, color: 'white', marginBottom: 8 }}>Your Baseline is Set!</h2>
                  <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>Based on your answers, your estimated starting footprint is:</p>
                  
                  <div style={{ 
                    background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)',
                    borderRadius: 20, padding: '24px 40px', marginBottom: 40
                  }}>
                    <div style={{ fontSize: 48, fontWeight: 800, fontFamily: 'Space Grotesk', color: 'var(--green-400)', lineHeight: 1 }}>
                      {result?.toFixed(0)} <span style={{ fontSize: 20, fontWeight: 500 }}>kg CO₂</span>
                    </div>
                    <div style={{ color: 'var(--green-500)', marginTop: 8, fontWeight: 500 }}>per month</div>
                  </div>

                  <button 
                    onClick={finishOnboarding}
                    className="btn-primary"
                    style={{ width: '100%', padding: '16px 24px', fontSize: 16, borderRadius: 16 }}
                  >
                    Enter Dashboard
                  </button>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
