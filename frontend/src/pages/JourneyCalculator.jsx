import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car, MapPin, Zap, Bus, Train, Bike, ChevronRight,
  Leaf, AlertCircle, BarChart3, Lightbulb, Navigation,
  ArrowRight, CheckCircle, Loader2, RefreshCw, Clock,
  TrendingDown, Wind
} from 'lucide-react';
import { useAppStore } from '../store/appStore';
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ─── Vehicle options ──────────────────────────────────────────────────────────
const VEHICLES = [
  { key: 'car_petrol',  label: 'Petrol Car',    icon: '🚗', factor: 0.192, color: '#ef4444' },
  { key: 'car_diesel',  label: 'Diesel Car',    icon: '🚙', factor: 0.175, color: '#f97316' },
  { key: 'ev',          label: 'Electric Vehicle (EV)', icon: '⚡', factor: 0.041, color: '#22c55e' },
  { key: 'bus',         label: 'Bus',           icon: '🚌', factor: 0.089, color: '#3b82f6' },
  { key: 'metro',       label: 'Metro / Train', icon: '🚇', factor: 0.041, color: '#8b5cf6' },
  { key: 'bike_petrol', label: 'Petrol Bike',   icon: '🏍️', factor: 0.113, color: '#f59e0b' },
  { key: 'cab_ola',     label: 'Cab / Taxi',    icon: '🚕', factor: 0.192, color: '#ef4444' },
];

// ─── Colour helpers ───────────────────────────────────────────────────────────
function co2Color(kg) {
  if (kg < 5)   return '#22c55e';
  if (kg < 20)  return '#84cc16';
  if (kg < 50)  return '#f59e0b';
  if (kg < 150) return '#f97316';
  return '#ef4444';
}

// ─── Animated SVG Emission Ring ───────────────────────────────────────────────
function EmissionRing({ co2Kg, maxKg, color, size = 180 }) {
  const r = size / 2 - 18;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(co2Kg / maxKg, 1);
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} style={{ overflow: 'visible' }}>
      {/* Track */}
      <circle cx={size/2} cy={size/2} r={r} fill="none"
        stroke="rgba(255,255,255,0.06)" strokeWidth={14} />
      {/* Fill */}
      <motion.circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={14} strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ filter: `drop-shadow(0 0 10px ${color}80)` }}
      />
      {/* Center text */}
      <text x={size/2} y={size/2 - 6} textAnchor="middle"
        fill={color} fontSize="28" fontWeight="800"
        fontFamily="Space Grotesk, sans-serif">
        {co2Kg >= 1000 ? `${(co2Kg/1000).toFixed(1)}t` : co2Kg.toFixed(1)}
      </text>
      <text x={size/2} y={size/2 + 16} textAnchor="middle"
        fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="500"
        fontFamily="Inter, sans-serif">
        kg CO₂e
      </text>
    </svg>
  );
}

// ─── Alternative bar card ─────────────────────────────────────────────────────
function AltBar({ alt, primaryCo2, delay }) {
  const pct = Math.min((alt.co2_kg / primaryCo2) * 100, 100);
  const barColor = alt.type === 'Metro' ? '#8b5cf6' : alt.type === 'Bus' ? '#3b82f6' : '#22c55e';
  const emoji = alt.type === 'Metro' ? '🚇' : alt.type === 'Bus' ? '🚌' : '⚡';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '14px 18px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>{emoji}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{alt.type}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: barColor }}>{alt.co2_kg.toFixed(1)} kg</span>
          <div style={{
            background: `${barColor}18`,
            border: `1px solid ${barColor}40`,
            borderRadius: 20,
            padding: '2px 10px',
            fontSize: 12,
            fontWeight: 700,
            color: barColor,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <TrendingDown size={11} />
            {alt.reduction_percentage.toFixed(1)}% less
          </div>
        </div>
      </div>

      {/* Bar */}
      <div style={{
        height: 7, background: 'rgba(255,255,255,0.06)',
        borderRadius: 99, overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: delay + 0.2, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${barColor}99, ${barColor})`,
            borderRadius: 99,
            boxShadow: `0 0 8px ${barColor}60`,
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {[180, 120, 90, 90, 90].map((h, i) => (
        <div key={i} className="skeleton" style={{ height: h, borderRadius: 16 }} />
      ))}
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function JourneyCalculator() {
  const { user } = useAppStore();
  const [form, setForm] = useState({ origin: '', destination: '', vehicle_type: 'car_petrol' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const resultsRef = useRef(null);

  const selectedVehicle = VEHICLES.find(v => v.key === form.vehicle_type) || VEHICLES[0];

  async function handleCalculate(e) {
    e.preventDefault();
    if (!form.origin.trim() || !form.destination.trim()) {
      toast.error('Please enter both origin and destination.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    setSaved(false);

    try {
      const res = await fetch(`${API_BASE}/api/maps/trip-emissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: form.origin.trim(),
          destination: form.destination.trim(),
          vehicle_type: form.vehicle_type,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || `Server error ${res.status}`);
      }

      const data = await res.json();
      setResult(data);

      // Scroll to results smoothly
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    } catch (err) {
      setError(err.message || 'Unable to calculate emissions. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    setSaved(true);
    try {
      const uid = user?.uid || 'demo';
      await fetch(`${API_BASE}/api/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: uid,
          category: 'transport',
          activity_type: form.vehicle_type,
          description: `${result.trip_details.from} → ${result.trip_details.to}`,
          co2_kg: result.calculation_breakdown.total_co2_kg,
          details: {
            distance_km: result.trip_details.actual_distance_km,
            vehicle: result.trip_details.selected_vehicle,
          },
        }),
      });
      toast.success('Trip saved to your activity log! 🌿');
    } catch {
      toast.error('Could not save. Check your connection.');
      setSaved(false);
    }
  }

  const co2Total = result?.calculation_breakdown?.total_co2_kg ?? 0;
  const ringColor = result ? co2Color(co2Total) : selectedVehicle.color;
  // ring scale: use max of (co2Total * 1.5, 50) for sensible arc fill
  const ringMax = Math.max(co2Total * 1.5, 50);

  const isHighConfidence = result?.calculation_breakdown?.confidence_level?.includes('HIGH');

  return (
    <div style={{ padding: '32px 0', maxWidth: 860, margin: '0 auto' }}>

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 32 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'linear-gradient(135deg, #22c55e22, #16a34a33)',
            border: '1px solid rgba(34,197,94,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Navigation size={22} color="var(--green-400)" />
          </div>
          <div>
            <h1 style={{
              fontFamily: 'Space Grotesk', fontSize: 26, fontWeight: 800,
              color: 'var(--text-primary)', margin: 0,
            }}>
              Journey Carbon Calculator
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: 0, marginTop: 2 }}>
              Real driving distance · IPCC AR6 emission factors · Instant alternatives
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}
           className="grid-responsive">

        {/* ── LEFT: Input panel ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card"
          style={{ padding: 28 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <MapPin size={16} color="var(--green-400)" />
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'Space Grotesk' }}>
              Plan Your Route
            </span>
          </div>

          <form onSubmit={handleCalculate} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Origin */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
                📍 From (Origin)
              </label>
              <input
                id="journey-origin"
                className="input"
                value={form.origin}
                onChange={e => setForm(f => ({ ...f, origin: e.target.value }))}
                placeholder="e.g. Delhi, Mumbai, Bangalore"
                required
                autoComplete="off"
              />
            </div>

            {/* Arrow divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ArrowRight size={14} color="var(--text-dim)" />
              </div>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            {/* Destination */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
                🏁 To (Destination)
              </label>
              <input
                id="journey-destination"
                className="input"
                value={form.destination}
                onChange={e => setForm(f => ({ ...f, destination: e.target.value }))}
                placeholder="e.g. Chennai, Pune, Kolkata"
                required
                autoComplete="off"
              />
            </div>

            {/* Vehicle type */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
                🚘 Vehicle Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {VEHICLES.map(v => (
                  <button
                    key={v.key}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, vehicle_type: v.key }))}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: form.vehicle_type === v.key
                        ? `1px solid ${v.color}60`
                        : '1px solid var(--border)',
                      background: form.vehicle_type === v.key
                        ? `${v.color}14`
                        : 'var(--bg-card)',
                      color: form.vehicle_type === v.key ? v.color : 'var(--text-dim)',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'Inter, sans-serif',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{v.icon}</span>
                    <span style={{ lineHeight: 1.2 }}>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Emission preview chip */}
            <div style={{
              background: `${selectedVehicle.color}0d`,
              border: `1px solid ${selectedVehicle.color}30`,
              borderRadius: 10, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <Wind size={14} color={selectedVehicle.color} />
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Emission factor:&nbsp;
                <strong style={{ color: selectedVehicle.color }}>{selectedVehicle.factor} kg CO₂/km</strong>
              </span>
            </div>

            {/* Submit */}
            <button
              id="calculate-emissions-btn"
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '13px 24px' }}
            >
              {loading
                ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Fetching real distance…</>
                : <><BarChart3 size={18} /> Calculate Emissions</>
              }
            </button>
          </form>
        </motion.div>

        {/* ── RIGHT: Results panel ─────────────────────────────────────── */}
        <div ref={resultsRef}>
          <AnimatePresence mode="wait">
            {/* Loading */}
            {loading && <LoadingSkeleton key="loading" />}

            {/* Error */}
            {!loading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="glass-card"
                style={{ padding: 28, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.06)' }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <AlertCircle size={22} color="var(--red-400)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--red-400)', marginBottom: 6 }}>
                      Distance Unavailable
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{error}</div>
                  </div>
                </div>
                <button
                  onClick={() => { setError(''); setForm(f => ({ ...f, origin: '', destination: '' })); }}
                  className="btn-secondary"
                  style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
                >
                  <RefreshCw size={14} /> Try again
                </button>
              </motion.div>
            )}

            {/* Empty state */}
            {!loading && !error && !result && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass-card"
                style={{ padding: 40, textAlign: 'center' }}
              >
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(34,197,94,0.08)',
                  border: '1px solid rgba(34,197,94,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <Navigation size={28} color="var(--green-400)" style={{ opacity: 0.6 }} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  Enter your journey details
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>
                  We'll fetch the actual driving distance via Google Maps and calculate your precise CO₂ footprint.
                </div>
              </motion.div>
            )}

            {/* RESULTS */}
            {!loading && !error && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >

                {/* Route + distance card */}
                <div className="glass-card" style={{ padding: '20px 24px' }}>
                  {/* Route display */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                    <div style={{
                      background: 'rgba(34,197,94,0.1)', borderRadius: 8, padding: '4px 10px',
                      fontSize: 13, fontWeight: 700, color: 'var(--green-400)',
                      whiteSpace: 'nowrap', maxWidth: '40%', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      📍 {result.trip_details.from}
                    </div>
                    <ArrowRight size={14} color="var(--text-dim)" style={{ flexShrink: 0 }} />
                    <div style={{
                      background: 'rgba(34,197,94,0.1)', borderRadius: 8, padding: '4px 10px',
                      fontSize: 13, fontWeight: 700, color: 'var(--green-400)',
                      whiteSpace: 'nowrap', maxWidth: '40%', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      🏁 {result.trip_details.to}
                    </div>
                  </div>

                  {/* Stats row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    {[
                      { label: 'Distance', value: `${result.trip_details.actual_distance_km.toFixed(1)} km`, icon: <Navigation size={13} /> },
                      { label: 'Drive Time', value: result.trip_details.duration_min > 0
                          ? `~${Math.round(result.trip_details.duration_min / 60)}h ${Math.round(result.trip_details.duration_min % 60)}m`
                          : 'N/A', icon: <Clock size={13} /> },
                      { label: 'Vehicle', value: result.trip_details.selected_vehicle, icon: <Car size={13} /> },
                    ].map(({ label, value, icon }) => (
                      <div key={label} style={{
                        background: 'var(--bg-card)', borderRadius: 10, padding: '10px 12px',
                        border: '1px solid var(--border)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-dim)', fontSize: 11, marginBottom: 4 }}>
                          {icon} {label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Confidence badge */}
                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '4px 10px',
                      borderRadius: 20,
                      background: isHighConfidence ? 'rgba(34,197,94,0.1)' : 'rgba(245,158,11,0.1)',
                      border: `1px solid ${isHighConfidence ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)'}`,
                      fontSize: 11, fontWeight: 700,
                      color: isHighConfidence ? 'var(--green-400)' : 'var(--gold)',
                    }}>
                      {isHighConfidence ? <CheckCircle size={11} /> : <AlertCircle size={11} />}
                      {result.calculation_breakdown.confidence_level}
                    </div>
                    {!isHighConfidence && (
                      <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>
                        Distance from city-pair lookup table
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary emissions ring */}
                <motion.div
                  className="glass-card"
                  initial={{ scale: 0.92 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  style={{ padding: '28px 24px', textAlign: 'center' }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
                    Your Carbon Footprint
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                    <EmissionRing co2Kg={co2Total} maxKg={ringMax} color={ringColor} size={180} />
                  </div>

                  <div style={{
                    background: 'var(--bg-card)', borderRadius: 10, padding: '10px 16px',
                    border: '1px solid var(--border)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Formula used</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'monospace' }}>
                      {result.trip_details.actual_distance_km.toFixed(1)} km × {result.calculation_breakdown.emission_factor_used} = {co2Total.toFixed(2)} kg
                    </span>
                  </div>
                </motion.div>

                {/* Alternatives */}
                {result.alternatives?.length > 0 && (
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, paddingLeft: 4 }}>
                      Greener Alternatives
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {result.alternatives.map((alt, i) => (
                        <AltBar key={alt.type} alt={alt} primaryCo2={co2Total} delay={i * 0.1} />
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Tip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.04))',
                    border: '1px solid rgba(34,197,94,0.25)',
                    borderRadius: 14, padding: '18px 20px',
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: 'rgba(34,197,94,0.15)',
                      border: '1px solid rgba(34,197,94,0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Lightbulb size={18} color="var(--green-400)" />
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--green-500)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        AI Reduction Tip
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {result.ai_reduction_tip}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Save button */}
                <button
                  id="save-to-activity-log-btn"
                  onClick={handleSave}
                  disabled={saved}
                  className={saved ? 'btn-secondary' : 'btn-primary'}
                  style={{ width: '100%', justifyContent: 'center', padding: '13px 24px' }}
                >
                  {saved
                    ? <><CheckCircle size={16} /> Saved to Activity Log</>
                    : <><Leaf size={16} /> Save to Activity Log</>
                  }
                </button>

                {/* Reset */}
                <button
                  onClick={() => { setResult(null); setSaved(false); setForm({ origin: '', destination: '', vehicle_type: 'car_petrol' }); }}
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <RefreshCw size={14} /> Calculate another journey
                </button>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom facts strip ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}
        className="grid-responsive"
      >
        {[
          { icon: '🌍', title: 'Real Distance', desc: 'Powered by Google Maps Distance Matrix API — actual driving routes, not straight-line estimates.' },
          { icon: '📊', title: 'IPCC AR6 Factors', desc: 'Emission factors sourced from IPCC AR6 (2022) and India MoRTH/CEA data for maximum accuracy.' },
          { icon: '🔄', title: 'Instant Alternatives', desc: 'Automatically compares Metro, Bus and EV options with exact % savings so you can make smarter choices.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="glass-card" style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.6 }}>{desc}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
