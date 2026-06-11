import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Presentation() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: '#0a0f0c', color: 'white', padding: '20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              padding: '8px 16px', borderRadius: '8px', color: '#a1a1aa', cursor: 'pointer'
            }}
          >
            <ArrowLeft size={16} /> Back to App
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#4ade80' }}>
            GreenStep Pitch Deck
          </h1>
          <div style={{ width: '100px' }}></div> {/* Spacer */}
        </div>

        {/* Canva Embed */}
        <div style={{
          position: 'relative', width: '100%', height: 0, paddingTop: '56.2500%',
          paddingBottom: 0, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.5)', 
          overflow: 'hidden', borderRadius: '12px', willChange: 'transform',
          border: '1px solid rgba(74, 222, 128, 0.2)'
        }}>
          <iframe 
            loading="lazy" 
            style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
            src="https://www.canva.com/design/DAHMSz8Uako/6DER3m_1iQnMD-85O3dlqA/view?embed" 
            allowFullScreen="allowfullscreen" 
            allow="fullscreen"
          />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#a1a1aa', fontSize: '14px' }}>
          Use the arrows on the slides or your keyboard to navigate the presentation.
        </div>

      </div>
    </div>
  );
}
