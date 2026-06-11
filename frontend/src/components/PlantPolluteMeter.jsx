import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/appStore';

export default function PlantPolluteMeter() {
  const { totalCO2Emitted, totalCO2Offset } = useAppStore();
  const canvasRef = useRef(null);
  const [animVal, setAnimVal] = useState(0);

  const netBalance = totalCO2Offset - totalCO2Emitted;
  const maxVal = Math.max(totalCO2Emitted, totalCO2Offset, 10);
  // -1 = full red (polluting), +1 = full green (saving)
  const ratio = Math.max(-1, Math.min(1, netBalance / maxVal));

  useEffect(() => {
    let frame;
    const target = ratio;
    let current = animVal;
    const animate = () => {
      current += (target - current) * 0.06;
      setAnimVal(current);
      if (Math.abs(target - current) > 0.001) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [ratio]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const cx = W / 2, cy = H * 0.78;
    const R = W * 0.42;
    const startAngle = Math.PI;
    const endAngle = 2 * Math.PI;

    // BG arc track
    ctx.beginPath();
    ctx.arc(cx, cy, R, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 22;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Color fill arc
    const needleAngle = startAngle + ((animVal + 1) / 2) * Math.PI;
    const midAngle = startAngle + Math.PI / 2; // center = 6 o'clock

    if (animVal >= 0) {
      // Green side
      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, '#f59e0b');
      grad.addColorStop(1, '#22c55e');
      ctx.beginPath();
      ctx.arc(cx, cy, R, midAngle, needleAngle);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 22;
      ctx.lineCap = 'round';
      ctx.stroke();
    } else {
      // Red side
      const grad = ctx.createLinearGradient(cx - R, cy, cx + R, cy);
      grad.addColorStop(0, '#ef4444');
      grad.addColorStop(1, '#f59e0b');
      ctx.beginPath();
      ctx.arc(cx, cy, R, needleAngle, midAngle);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 22;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    // Glow effect
    ctx.beginPath();
    ctx.arc(cx, cy, R, startAngle, endAngle);
    ctx.strokeStyle = animVal >= 0 ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)';
    ctx.lineWidth = 40;
    ctx.stroke();

    // Needle dot
    const ndx = cx + R * Math.cos(needleAngle);
    const ndy = cy + R * Math.sin(needleAngle);
    const needleColor = animVal >= 0 ? '#22c55e' : '#ef4444';

    ctx.beginPath();
    ctx.arc(ndx, ndy, 12, 0, Math.PI * 2);
    ctx.fillStyle = needleColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(ndx, ndy, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Outer glow on needle
    ctx.beginPath();
    ctx.arc(ndx, ndy, 18, 0, Math.PI * 2);
    ctx.fillStyle = `${needleColor}33`;
    ctx.fill();

    // Zone labels
    ctx.font = '600 11px Inter, sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.textAlign = 'center';
    ctx.fillText('POLLUTING', cx - R * 0.85, cy + 18);
    ctx.fillStyle = '#22c55e';
    ctx.fillText('SAVING', cx + R * 0.85, cy + 18);

  }, [animVal]);

  const isPositive = netBalance >= 0;
  const color = isPositive ? '#22c55e' : '#ef4444';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        width={320}
        height={190}
        style={{ maxWidth: '100%' }}
      />
      <div style={{ textAlign: 'center', marginTop: -10 }}>
        <div style={{
          fontSize: 38, fontWeight: 900, fontFamily: 'Space Grotesk',
          color, lineHeight: 1,
          textShadow: `0 0 30px ${color}55`,
        }}>
          {isPositive ? '+' : ''}{netBalance.toFixed(1)}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>kg CO₂ net balance</div>
        <div style={{
          marginTop: 10, padding: '6px 16px',
          background: `${color}18`,
          border: `1px solid ${color}44`,
          borderRadius: 20,
          fontSize: 13, fontWeight: 600, color,
          display: 'inline-block',
        }}>
          {isPositive ? '🟢 Net Carbon Saver' : Math.abs(ratio) < 0.3 ? '🟡 Near Neutral' : '🔴 Net Emitter'}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 24, marginTop: 20, width: '100%', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#ef4444', fontFamily: 'Space Grotesk' }}>
            {totalCO2Emitted.toFixed(1)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>kg emitted</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)' }} />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#22c55e', fontFamily: 'Space Grotesk' }}>
            {totalCO2Offset.toFixed(1)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>kg offset</div>
        </div>
      </div>
    </div>
  );
}
