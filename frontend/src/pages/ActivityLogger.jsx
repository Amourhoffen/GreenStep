import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { calculateCO2 } from '../services/api';
import toast from 'react-hot-toast';
import { Car, Utensils, Zap, ShoppingBag, Loader2, CheckCircle, Plus } from 'lucide-react';

const TABS = [
  { id: 'transport', icon: Car, label: 'Transport', emoji: '🚗' },
  { id: 'food', icon: Utensils, label: 'Food', emoji: '🥗' },
  { id: 'energy', icon: Zap, label: 'Energy', emoji: '⚡' },
  { id: 'shopping', icon: ShoppingBag, label: 'Shopping', emoji: '🛍' },
];

const VEHICLES = [
  { value: 'car_petrol', label: '🚗 Car (Petrol)', factor: 0.192 },
  { value: 'car_diesel', label: '🚙 Car (Diesel)', factor: 0.171 },
  { value: 'bike_petrol', label: '🏍 Bike (Petrol)', factor: 0.113 },
  { value: 'auto_cng', label: '🛺 Auto-rickshaw (CNG)', factor: 0.267 },
  { value: 'bus', label: '🚌 Bus (Diesel)', factor: 0.089 },
  { value: 'metro', label: '🚇 Metro/Train', factor: 0.041 },
  { value: 'flight_short', label: '✈️ Flight (Short-haul)', factor: 0.255 },
  { value: 'ev', label: '⚡ Electric Vehicle', factor: 0.041 },
];

const FOODS = [
  { value: 'chicken', label: '🍗 Chicken', factor: 6.9 },
  { value: 'fish', label: '🐟 Fish (farmed)', factor: 5.4 },
  { value: 'eggs', label: '🥚 Eggs', factor: 4.5 },
  { value: 'dairy', label: '🥛 Dairy', factor: 3.2 },
  { value: 'rice', label: '🍚 Rice', factor: 2.7 },
  { value: 'vegetables', label: '🥦 Vegetables', factor: 1.0 },
  { value: 'lentils', label: '🫘 Lentils/Dal', factor: 0.9 },
];

const APPLIANCES = [
  { value: 'ac', label: '❄️ Air Conditioner (1.5T)', watts: 1500 },
  { value: 'fan', label: '🌀 Ceiling Fan', watts: 70 },
  { value: 'fridge', label: '🧊 Refrigerator', watts: 150 },
  { value: 'tv', label: '📺 TV (LED 43")', watts: 80 },
  { value: 'washing', label: '🧺 Washing Machine', watts: 500 },
  { value: 'laptop', label: '💻 Laptop', watts: 65 },
  { value: 'geysers', label: '🚿 Water Heater/Geyser', watts: 2000 },
  { value: 'microwave', label: '📦 Microwave', watts: 1100 },
];

const SHOPPING_ITEMS = [
  { value: 'smartphone', label: '📱 Smartphone', co2: 85 },
  { value: 'laptop', label: '💻 Laptop', co2: 350 },
  { value: 'clothing_fast', label: '👕 Clothing (Fast Fashion)', co2: 20 },
  { value: 'clothing_organic', label: '🌿 Clothing (Organic)', co2: 6 },
  { value: 'online_delivery', label: '📦 Online Delivery (package)', co2: 1.0 },
  { value: 'tv', label: '📺 Television', co2: 300 },
  { value: 'books', label: '📚 Books (paper)', co2: 2.5 },
];

function ResultCard({ result, onSave, saving }) {
  if (!result) return null;
  return (
    <div className="glass-card animate-fade-up" style={{
      padding: '24px', marginTop: 20,
      border: '1px solid rgba(34,197,94,0.3)',
      background: 'rgba(34,197,94,0.04)',
    }}>
      {/* Main CO2 value */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: 'rgba(239,68,68,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, border: '1px solid rgba(239,68,68,0.2)',
        }}>🌡️</div>
        <div>
          <div style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Space Grotesk', color: '#ef4444', lineHeight: 1 }}>
            {result.co2_kg?.toFixed(3)} <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--text-dim)' }}>kg CO₂e</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 4 }}>
            ≈ {result.equivalent_trees_monthly?.toFixed(1)} trees/month to offset
            {result.annual_projection_kg > 0 && ` · ${result.annual_projection_kg} kg/year (projected)`}
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <div className={`badge badge-${result.confidence === 'high' ? 'green' : result.confidence === 'medium' ? 'gold' : 'red'}`}>
            {result.confidence?.toUpperCase()} CONFIDENCE
          </div>
        </div>
      </div>

      <div className="divider" />

      {/* India / World comparison */}
      {(result.vs_india_pct !== undefined) && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 10 }}>📊 Your footprint vs. averages</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: '🇮🇳 vs. India daily avg', pct: result.vs_india_pct, threshold: 100 },
              { label: '🌍 vs. World daily avg', pct: result.vs_world_pct, threshold: 100 },
            ].map(({ label, pct, threshold }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: pct > threshold ? 'var(--red-400)' : 'var(--green-400)' }}>{pct}%</span>
                </div>
                <div className="progress-bar">
                  <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, background: pct > threshold ? '#ef4444' : '#22c55e', borderRadius: 999, transition: 'width 1s ease', boxShadow: `0 0 6px ${pct > threshold ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)'}` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Breakdown */}
      {result.breakdown && (
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--border)', marginBottom: 14, fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>🔬 Calculation Breakdown</div>
          {result.breakdown}
        </div>
      )}

      {/* Alternatives */}
      {result.alternatives?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8 }}>⚡ Lower-carbon alternatives</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {result.alternatives.map((alt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(34,197,94,0.06)', borderRadius: 8, border: '1px solid rgba(34,197,94,0.15)' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{alt.mode}</span>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--green-400)', fontWeight: 600 }}>{alt.co2} kg</span>
                  <span className="badge badge-green" style={{ fontSize: 10 }}>-{alt.saving_pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reduction Tip */}
      {result.reduction_tip && (
        <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: 10, padding: '12px 14px', border: '1px solid rgba(34,197,94,0.2)', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--green-500)', fontWeight: 700, marginBottom: 4 }}>💡 AI Reduction Tip</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{result.reduction_tip}</div>
        </div>
      )}

      {/* Data sources */}
      {result.data_sources?.length > 0 && (
        <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          Sources: {result.data_sources.map((s, i) => <span key={i} className="badge badge-blue" style={{ fontSize: 10, padding: '2px 8px' }}>{s}</span>)}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          className="btn-primary"
          onClick={onSave}
          disabled={saving}
          style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
        >
          {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <CheckCircle size={16} />}
          {saving ? 'Saving...' : 'Save to My Log'}
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={async () => {
              const storeState = useAppStore.getState();
              const userName = storeState.user?.displayName || storeState.user?.email?.split('@')[0] || 'Green Earthling';
              const newPost = {
                id: `p_${Date.now()}`,
                user_name: userName,
                user_city: 'India',
                user_avatar: userName.charAt(0).toUpperCase(),
                caption: `I just tracked my CO₂ footprint! It was ${result.co2_kg.toFixed(2)} kg CO₂e.\n\n${result.reduction_tip ? '💡 Tip: ' + result.reduction_tip : ''}`,
                post_type: 'update',
                likes: 0, liked_by: [], comments: [], badges: ['🌿 Activity Tracked'], created_at: new Date().toISOString()
              };
              await storeState.addCommunityPost(newPost);
              toast.success('Shared to Community Feed! 🌍');
            }}
            style={{ 
              flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', 
              border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontWeight: 600, fontSize: 14, transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Post
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My GreenStep Activity',
                  text: `I just calculated my carbon footprint using GreenStep! It was ${result.co2_kg.toFixed(2)} kg CO₂e. 🌿\n\n${result.reduction_tip ? '💡 Tip: ' + result.reduction_tip : ''}`,
                  url: window.location.origin
                }).catch(err => console.log('Error sharing', err));
              } else {
                toast.error('Sharing not supported on this device');
              }
            }}
            style={{ 
              flex: 1, padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', 
              border: '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontWeight: 600, fontSize: 14, transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ActivityLogger() {
  const { addActivity } = useAppStore();
  const [activeTab, setActiveTab] = useState('transport');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);
  const [lastPayload, setLastPayload] = useState(null);

  // Transport form
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState('car_petrol');

  // Food form
  const [foodType, setFoodType] = useState('chicken');
  const [foodQty, setFoodQty] = useState('0.3');

  // Energy form
  const [appliance, setAppliance] = useState('ac');
  const [hours, setHours] = useState('8');
  const [location, setLocation] = useState('Delhi');

  // Shopping form
  const [shopItem, setShopItem] = useState('clothing_fast');
  const [shopQty, setShopQty] = useState('1');

  const buildPayload = () => {
    if (activeTab === 'transport') {
      const v = VEHICLES.find(v => v.value === vehicle);
      return {
        category: 'transport', activity_type: v?.label || vehicle,
        details: { from: origin, to: destination, vehicle: v?.label, factor_kg_km: v?.factor },
        origin, destination, vehicle_type: vehicle,
      };
    }
    if (activeTab === 'food') {
      const f = FOODS.find(f => f.value === foodType);
      return {
        category: 'food', activity_type: f?.label || foodType,
        details: { food_type: f?.label, quantity_kg: parseFloat(foodQty), factor_kg_per_kg: f?.factor },
      };
    }
    if (activeTab === 'energy') {
      const a = APPLIANCES.find(a => a.value === appliance);
      return {
        category: 'energy', activity_type: a?.label || appliance,
        details: { appliance: a?.label, hours: parseFloat(hours), watts: a?.watts, location },
        location,
      };
    }
    if (activeTab === 'shopping') {
      const s = SHOPPING_ITEMS.find(s => s.value === shopItem);
      return {
        category: 'shopping', activity_type: s?.label || shopItem,
        details: { item: s?.label, quantity: parseInt(shopQty), co2_per_unit: s?.co2 },
      };
    }
  };

  const handleCalculate = async () => {
    const payload = buildPayload();
    if (!payload) return;
    if (activeTab === 'transport' && (!origin.trim() || !destination.trim())) {
      toast.error('Please enter origin and destination');
      return;
    }
    setLoading(true);
    setResult(null);
    setLastPayload(payload);
    try {
      const data = await calculateCO2(payload);
      setResult(data);
    } catch (e) {
      // Offline fallback — calculate locally
      const localResult = computeLocally(payload);
      setResult(localResult);
      toast('Using local calculation (backend offline)', { icon: '⚠️' });
    } finally {
      setLoading(false);
    }
  };

  const computeLocally = (payload) => {
    let co2 = 0;
    if (payload.category === 'transport') {
      const v = VEHICLES.find(v => v.value === payload.vehicle_type);
      const distKm = 20; // fallback distance
      co2 = (v?.factor || 0.192) * distKm;
    } else if (payload.category === 'food') {
      const f = FOODS.find(f => f.value === foodType);
      co2 = (f?.factor || 6.9) * parseFloat(foodQty);
    } else if (payload.category === 'energy') {
      const a = APPLIANCES.find(a => a.value === appliance);
      const kwh = (a?.watts || 1500) * parseFloat(hours) / 1000;
      co2 = kwh * 0.716;
    } else if (payload.category === 'shopping') {
      const s = SHOPPING_ITEMS.find(s => s.value === shopItem);
      co2 = (s?.co2 || 20) * parseInt(shopQty);
    }
    return {
      co2_kg: parseFloat(co2.toFixed(3)),
      calculation_method: 'Local calculation using standard emission factors',
      equivalent_trees_monthly: parseFloat((co2 / 1.81).toFixed(2)),
      confidence: 'medium',
      breakdown: `${payload.activity_type}: ${co2.toFixed(3)} kg CO₂`,
      reduction_tip: 'Consider lower-carbon alternatives for this activity.',
    };
  };

  const handleSave = async () => {
    if (!result || !lastPayload) return;
    setSaving(true);
    const activity = {
      id: Date.now().toString(),
      ...lastPayload,
      co2_kg: result.co2_kg,
      calculation_method: result.calculation_method,
      created_at: new Date(),
    };
    addActivity(activity);
    toast.success(`✅ ${result.co2_kg.toFixed(2)} kg CO₂ logged!`);
    setResult(null);
    setSaving(false);
  };

  return (
    <div className="animate-fade-up" style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: 'Space Grotesk', marginBottom: 6 }}>
          📊 Track Activity
        </h1>
        <p style={{ color: 'var(--text-dim)', fontSize: 14 }}>
          Log your daily activities. Gemini AI calculates the CO₂ using live data.
        </p>
      </div>

      {/* Tab selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {TABS.map(({ id, label, emoji }) => (
          <button
            key={id}
            className={`tab-btn ${activeTab === id ? 'active' : ''}`}
            onClick={() => { setActiveTab(id); setResult(null); }}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      {/* Form card */}
      <div className="glass-card" style={{ padding: '28px' }}>
        {activeTab === 'transport' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                From (Origin City/Area)
              </label>
              <input className="input" placeholder="e.g. Patna, Bihar" value={origin} onChange={e => setOrigin(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                To (Destination City/Area)
              </label>
              <input className="input" placeholder="e.g. Gaya, Bihar" value={destination} onChange={e => setDestination(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Vehicle Type
              </label>
              <select className="input" value={vehicle} onChange={e => setVehicle(e.target.value)}>
                {VEHICLES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Food Type
              </label>
              <select className="input" value={foodType} onChange={e => setFoodType(e.target.value)}>
                {FOODS.map(f => <option key={f.value} value={f.value}>{f.label} — {f.factor} kg CO₂/kg</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Quantity (kg)
              </label>
              <input className="input" type="number" min="0.01" step="0.05" value={foodQty} onChange={e => setFoodQty(e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'energy' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Appliance
              </label>
              <select className="input" value={appliance} onChange={e => setAppliance(e.target.value)}>
                {APPLIANCES.map(a => <option key={a.value} value={a.value}>{a.label} ({a.watts}W)</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Hours used today
              </label>
              <input className="input" type="number" min="0.1" max="24" step="0.5" value={hours} onChange={e => setHours(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Location (for grid intensity)
              </label>
              <input className="input" placeholder="e.g. Delhi, Mumbai" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === 'shopping' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Item
              </label>
              <select className="input" value={shopItem} onChange={e => setShopItem(e.target.value)}>
                {SHOPPING_ITEMS.map(s => <option key={s.value} value={s.value}>{s.label} (~{s.co2} kg CO₂)</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Quantity
              </label>
              <input className="input" type="number" min="1" step="1" value={shopQty} onChange={e => setShopQty(e.target.value)} />
            </div>
          </div>
        )}

        <button
          className="btn-primary"
          onClick={handleCalculate}
          disabled={loading}
          style={{ marginTop: 24, width: '100%', justifyContent: 'center', padding: '14px' }}
        >
          {loading ? (
            <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Calculating with Gemini AI...</>
          ) : (
            <><Plus size={18} /> Calculate CO₂</>
          )}
        </button>
      </div>

      <ResultCard result={result} onSave={handleSave} saving={saving} />
    </div>
  );
}
