import { useState } from 'react';
import { useAppStore } from '../store/appStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Calendar, MapPin, Coffee, Activity, Trash2, Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8 AM to 8 PM

const EVENT_TYPES = {
  general: { icon: Activity, label: 'General', color: '#6366f1' },
  traveling: { icon: MapPin, label: 'Traveling', color: '#f59e0b' },
  food: { icon: Coffee, label: 'Food', color: '#10b981' }
};

export default function RoutineBuilder() {
  const { routine, setRoutine } = useAppStore();
  const events = routine.events || [];
  
  const [selectedSlot, setSelectedSlot] = useState(null); // { day, hour, event? }
  
  // Modal State
  const [title, setTitle] = useState('');
  const [type, setType] = useState('general');
  const [details, setDetails] = useState('');

  const handleCellClick = (day, hour) => {
    const existingEvent = events.find(e => e.day === day && e.hour === hour);
    if (existingEvent) {
      setTitle(existingEvent.title);
      setType(existingEvent.type);
      setDetails(existingEvent.details);
      setSelectedSlot({ day, hour, event: existingEvent });
    } else {
      setTitle('');
      setType('general');
      setDetails('');
      setSelectedSlot({ day, hour, event: null });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }
    
    let newEvents = [...events];
    
    if (selectedSlot.event) {
      // Edit
      newEvents = newEvents.map(ev => 
        ev.id === selectedSlot.event.id 
          ? { ...ev, title, type, details } 
          : ev
      );
    } else {
      // Add
      newEvents.push({
        id: `evt_${Date.now()}`,
        day: selectedSlot.day,
        hour: selectedSlot.hour,
        title,
        type,
        details
      });
    }
    
    setRoutine({ events: newEvents });
    setSelectedSlot(null);
    toast.success('Schedule updated!');
  };

  const handleDelete = () => {
    if (!selectedSlot.event) return;
    const newEvents = events.filter(e => e.id !== selectedSlot.event.id);
    setRoutine({ events: newEvents });
    setSelectedSlot(null);
    toast.success('Event removed');
  };

  return (
    <div style={{ marginTop: 20 }}>
      {/* Schedule Settings / Controls Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={18} color="var(--blue-400)" /> Interactive Schedule Builder
        </h3>
        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Click a cell to add an activity</span>
      </div>

      <div style={{ 
        overflowX: 'auto', 
        background: 'rgba(0,0,0,0.15)', 
        borderRadius: 12, 
        border: '1px solid var(--border)',
        padding: '10px 0' 
      }}>
        <div style={{ minWidth: 900, padding: '0 10px' }}>
          {/* Header Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ padding: 12, background: 'transparent' }}></div>
            {DAYS.map(day => (
              <div key={day} style={{ 
                padding: '12px 8px', 
                textAlign: 'center', 
                fontWeight: 600, 
                fontSize: 13,
                borderLeft: '1px solid var(--border)',
                background: 'var(--bg-glass-light)',
                color: 'var(--text-primary)'
              }}>
                {day}
              </div>
            ))}
          </div>

          {/* Time Rows */}
          {HOURS.map(hour => (
            <div key={hour} style={{ display: 'grid', gridTemplateColumns: '80px repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
              {/* Hour Label */}
              <div style={{ 
                padding: '12px 4px', 
                textAlign: 'center', 
                fontSize: 11, 
                color: 'var(--text-dim)',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: '1px solid var(--border)'
              }}>
                {hour.toString().padStart(2, '0')}:00
              </div>

              {/* Days Cells */}
              {DAYS.map(day => {
                const event = events.find(e => e.day === day && e.hour === hour);
                return (
                  <div 
                    key={`${day}-${hour}`}
                    onClick={() => handleCellClick(day, hour)}
                    style={{ 
                      borderRight: '1px solid rgba(255,255,255,0.03)',
                      height: 50,
                      padding: 4,
                      cursor: 'pointer',
                      background: 'transparent',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => { if(!event) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseLeave={(e) => { if(!event) e.currentTarget.style.background = 'transparent' }}
                  >
                    {event && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                          background: EVENT_TYPES[event.type].color,
                          color: '#fff',
                          height: '100%',
                          borderRadius: 8,
                          padding: '6px 10px',
                          fontSize: 12,
                          fontWeight: 600,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                          overflow: 'hidden'
                        }}
                      >
                        <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {event.title}
                        </div>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Popup for Adding/Editing */}
      <AnimatePresence>
        {selectedSlot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 20
            }}
            onClick={() => setSelectedSlot(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              style={{
                background: 'var(--bg-base)', border: '1px solid var(--border)',
                borderRadius: 16, width: '100%', maxWidth: 400, padding: 24,
                position: 'relative'
              }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedSlot(null)}
                style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
              >
                <X size={20} />
              </button>

              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
                {selectedSlot.event ? 'Edit Activity' : 'Add Activity'}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-dim)', marginBottom: 20 }}>
                {selectedSlot.day} at {selectedSlot.hour.toString().padStart(2, '0')}:00
              </p>

              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Type</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                    {Object.entries(EVENT_TYPES).map(([k, v]) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setType(k)}
                        style={{
                          padding: '10px 8px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          background: type === k ? `${v.color}20` : 'var(--bg-card)',
                          border: `1px solid ${type === k ? v.color : 'var(--border)'}`,
                          color: type === k ? v.color : 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        <v.icon size={16} />
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Title</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="e.g. Morning Commute, Lunch" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    style={{ width: '100%', padding: 12 }}
                    autoFocus
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Details (For ML Tracking)</label>
                  <textarea 
                    className="input" 
                    placeholder={
                      type === 'traveling' ? "e.g. 15km via Petrol Car" :
                      type === 'food' ? "e.g. Chicken Rice Meal" :
                      "e.g. Office work, gym"
                    }
                    value={details} 
                    onChange={e => setDetails(e.target.value)} 
                    style={{ width: '100%', padding: 12, minHeight: 80 }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <button type="submit" className="btn-primary" style={{ flex: 1, padding: 12 }}>
                    {selectedSlot.event ? 'Update' : 'Save'}
                  </button>
                  {selectedSlot.event && (
                    <button type="button" onClick={handleDelete} style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, padding: '0 16px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
