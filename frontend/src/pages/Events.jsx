import { useState, useEffect, useMemo } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Compass } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppStore } from '../store/appStore';
import { fetchGlobalEvents, fetchUserEvents, rsvpUserEvent } from '../services/firebaseService';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '100%' };
const defaultCenter = { lat: 19.0760, lng: 72.8777 }; // Mumbai default

export default function Events() {
  const { user } = useAppStore();
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState({});
  const [loading, setLoading] = useState(true);

  // Load Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;
      const globalEvents = await fetchGlobalEvents();
      const myEvents = await fetchUserEvents(user.uid);
      
      const myMap = {};
      myEvents.forEach(me => { myMap[me.id] = me; });
      
      setUserEvents(myMap);
      setEvents(globalEvents);
      setLoading(false);
    };
    loadData();
  }, [user]);

  const handleRSVP = async (id) => {
    if (!user?.uid) return;
    if (userEvents[id]) return; // already RSVP'd
    
    await rsvpUserEvent(user.uid, id);
    setUserEvents(prev => ({ ...prev, [id]: { rsvp_at: new Date() } }));
    toast.success("RSVP Confirmed! See you there.");
  };

  const mapCenter = events.length > 0 ? { lat: events[0].lat, lng: events[0].lng } : defaultCenter;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Local Green Events</h1>
          <p className="page-subtitle">Join climate action events, cleanups, and workshops happening near you.</p>
        </div>
        <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 12 }}>
          <MapPin size={18} /> Change City (Mumbai)
        </button>
      </div>

      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 24, marginTop: 24, minHeight: 'calc(100vh - 200px)' }}>
        
        {/* Map Area */}
        <div style={{ 
          background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 24, 
          overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {!isLoaded ? (
            <div style={{ color: 'var(--text-dim)' }}>Loading Map...</div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={11}
              center={mapCenter}
              options={{ styles: [{ elementType: "geometry", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] }, { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] }] }}
            >
              {events.map(event => (
                <Marker key={event.id} position={{ lat: event.lat, lng: event.lng }} title={event.title} />
              ))}
            </GoogleMap>
          )}
        </div>

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto', paddingRight: 8 }}>
          {loading ? (
            <div style={{ color: 'var(--text-dim)', padding: 24 }}>Loading events...</div>
          ) : events.map(event => {
            const hasRsvp = !!userEvents[event.id];
            
            return (
            <div key={event.id} className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: 120, backgroundImage: `url(${event.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', color: 'white', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                  {event.type}
                </div>
              </div>
              <div style={{ padding: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 12 }}>{event.title}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-dim)' }}>
                    <Calendar size={14} color="var(--green-400)" /> {event.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-dim)' }}>
                    <MapPin size={14} color="var(--green-400)" /> {event.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-dim)' }}>
                    <Users size={14} color="var(--green-400)" /> {event.attendees} Attending
                  </div>
                </div>

                {hasRsvp ? (
                  <button onClick={() => toast.success("Already RSVP'd!")} className="btn-secondary" style={{ width: '100%', padding: '10px', borderRadius: 8, fontSize: 13, color: 'var(--green-400)', borderColor: 'var(--green-500)', background: 'rgba(34,197,94,0.1)' }}>
                    RSVP Confirmed ✓
                  </button>
                ) : (
                  <button onClick={() => handleRSVP(event.id)} className="btn-primary" style={{ width: '100%', padding: '10px', borderRadius: 8, fontSize: 13, display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }}>
                    RSVP Now <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )})}
        </div>

      </div>
      <style>{`
        .pulse-pin {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          70% { box-shadow: 0 0 0 15px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }
      `}</style>
    </div>
  );
}
