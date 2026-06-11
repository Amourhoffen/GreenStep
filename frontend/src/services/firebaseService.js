import { collection, doc, setDoc, deleteDoc, getDocs, getDoc, query, where, orderBy, addDoc } from 'firebase/firestore';
import { db, isConfigured } from '../firebase';

export const saveActivityToDB = async (userId, activity) => {
  if (!isConfigured || !db) return activity;
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'activities'), activity);
    return { ...activity, id: docRef.id };
  } catch (error) {
    console.error("Error saving activity:", error);
    return activity;
  }
};

export const fetchUserActivities = async (userId) => {
  if (!isConfigured || !db) return [];
  try {
    const q = query(collection(db, 'users', userId, 'activities'), orderBy('created_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};

export const saveTreeToDB = async (userId, tree) => {
  if (!isConfigured || !db) return tree;
  try {
    const docRef = await addDoc(collection(db, 'users', userId, 'trees'), tree);
    return { ...tree, id: docRef.id };
  } catch (error) {
    console.error("Error saving tree:", error);
    return tree;
  }
};

export const fetchUserTrees = async (userId) => {
  if (!isConfigured || !db) return [];
  try {
    const q = query(collection(db, 'users', userId, 'trees'), orderBy('planted_at', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      planted_at: doc.data().planted_at?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error fetching trees:", error);
    return [];
  }
};

export const initializeGlobalData = async () => {
  if (!isConfigured || !db) return;
  try {
    const challengesSnap = await getDocs(collection(db, 'challenges'));
    if (challengesSnap.empty) {
      console.log('Seeding challenges...');
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 7);
      const c = [
        { title: 'Meatless Week', description: 'Go an entire week without eating meat.', points: 500, icon: '🥦', target_date: targetDate },
        { title: 'Zero Plastic Weekend', description: 'Avoid single-use plastics for 48 hours.', points: 300, icon: '🛍️', target_date: targetDate },
        { title: 'Walk 10km instead of Driving', description: 'Log 10km of walking/cycling.', points: 800, icon: '🚶', target_date: targetDate }
      ];
      for (const item of c) await addDoc(collection(db, 'challenges'), item);
    }

    const eventsSnap = await getDocs(collection(db, 'patna_events'));
    if (eventsSnap.empty) {
      console.log('Seeding real events for Patna...');
      const e = [
        { title: 'JP Ganga Path Sapling Drive', date: 'Sun, 14 June • 07:00 AM', location: 'Marine Drive, Patna', lat: 25.6253, lng: 85.1415, attendees: 450, image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&q=80', type: 'Planting' },
        { title: 'Special Monsoon Cleanup', date: 'Tue, 16 June • 08:30 AM', location: 'Kankarbagh, Patna', lat: 25.6015, lng: 85.1517, attendees: 120, image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80fabe5?w=500&q=80', type: 'Cleanup' },
        { title: 'Climate Action Webinar by ADRI', date: 'Sat, 20 June • 05:00 PM', location: 'ADRI Institute, Patna', lat: 25.6111, lng: 85.1396, attendees: 300, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80', type: 'Workshop' }
      ];
      for (const item of e) await addDoc(collection(db, 'patna_events'), item);
    }

    const rewardsSnap = await getDocs(collection(db, 'rewards'));
    if (rewardsSnap.empty) {
      console.log('Seeding rewards...');
      const r = [
        { brand: 'Yulu Bikes', title: '50% off Next 5 Rides', description: 'Get 50% off on your next 5 Yulu e-bike rentals.', cost: 500, icon: '🚲', color: '#0ea5e9' },
        { brand: 'EcoWear India', title: 'Flat 20% Off Apparel', description: 'Sustainable fashion made from recycled materials.', cost: 1200, icon: '👕', color: '#10b981' },
        { brand: 'NurseryLive', title: 'Free Plant Kit', description: 'Get a free indoor plant kit delivered to your home.', cost: 800, icon: '🌱', color: '#f59e0b' },
        { brand: 'SolarCity', title: '₹5000 Off Solar Panel Install', description: 'Massive discount on home solar panel installation.', cost: 5000, icon: '☀️', color: '#f43f5e' }
      ];
      for (const item of r) await addDoc(collection(db, 'rewards'), item);
    }
  } catch(e) {
    console.error("Error seeding global data", e);
  }
};

export const fetchGlobalChallenges = async () => {
  if (!isConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'challenges'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchGlobalEvents = async () => {
  if (!isConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'patna_events'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchGlobalRewards = async () => {
  if (!isConfigured || !db) return [];
  const snapshot = await getDocs(collection(db, 'rewards'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchUserIntegrations = async (userId) => {
  if (!isConfigured || !db || !userId) return {};
  const docRef = doc(db, 'users', userId);
  const snap = await getDoc(docRef);
  if (snap.exists() && snap.data().integrations) {
    return snap.data().integrations;
  }
  return {};
};

export const saveUserIntegration = async (userId, integrations) => {
  if (!isConfigured || !db || !userId) return;
  await setDoc(doc(db, 'users', userId), { integrations }, { merge: true });
};

export const fetchUserChallenges = async (userId) => {
  if (!isConfigured || !db || !userId) return [];
  const snapshot = await getDocs(collection(db, 'users', userId, 'challenges'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const joinUserChallenge = async (userId, challengeId) => {
  if (!isConfigured || !db || !userId) return;
  const docRef = doc(db, 'users', userId, 'challenges', challengeId);
  await setDoc(docRef, { joined_at: new Date(), progress: 0 });
};

export const leaveUserChallenge = async (userId, challengeId) => {
  if (!isConfigured || !db || !userId) return;
  const docRef = doc(db, 'users', userId, 'challenges', challengeId);
  await deleteDoc(docRef);
};

export const fetchUserRewards = async (userId) => {
  if (!isConfigured || !db || !userId) return [];
  const snapshot = await getDocs(collection(db, 'users', userId, 'rewards'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const unlockUserReward = async (userId, rewardId, code) => {
  if (!isConfigured || !db || !userId) return;
  const docRef = doc(db, 'users', userId, 'rewards', rewardId);
  await setDoc(docRef, { unlocked_at: new Date(), code });
};

export const rsvpUserEvent = async (userId, eventId) => {
  if (!isConfigured || !db || !userId) return;
  const docRef = doc(db, 'users', userId, 'events', eventId);
  await setDoc(docRef, { rsvp_at: new Date() });
};

export const fetchUserEvents = async (userId) => {
  if (!isConfigured || !db || !userId) return [];
  const snapshot = await getDocs(collection(db, 'users', userId, 'events'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
