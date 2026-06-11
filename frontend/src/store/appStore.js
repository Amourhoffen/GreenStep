import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchUserActivities, fetchUserTrees, saveActivityToDB, saveTreeToDB } from '../services/firebaseService';
import { getCommunityFeed, createCommunityPost, toggleLikePost, deleteCommunityPost as deleteCommunityPostAPI } from '../services/api';

const DEMO_USER = {
  uid: 'demo-user',
  displayName: 'Priya Sharma',
  email: 'priya@greenstep.app',
  photoURL: null,
};

const DEMO_ACTIVITIES = [
  { id: '1', category: 'transport', activity_type: '🚗 Car (Petrol)', co2_kg: 2.3, created_at: new Date(Date.now() - 86400000), details: { from: 'Patna', to: 'Gaya' } },
  { id: '2', category: 'food', activity_type: '🍗 Chicken', co2_kg: 2.07, created_at: new Date(Date.now() - 172800000), details: { food_type: 'Chicken', quantity_kg: 0.3 } },
  { id: '3', category: 'energy', activity_type: '❄️ Air Conditioner (1.5T)', co2_kg: 3.84, created_at: new Date(Date.now() - 259200000), details: { appliance: 'AC', hours: 8, watts: 1500 } },
  { id: '4', category: 'transport', activity_type: '🚇 Metro/Train', co2_kg: 0.33, created_at: new Date(Date.now() - 345600000), details: { from: 'AIIMS', to: 'Rajiv Chowk' } },
  { id: '5', category: 'food', activity_type: '🫘 Lentils/Dal', co2_kg: 0.27, created_at: new Date(Date.now() - 432000000), details: { food_type: 'Dal', quantity_kg: 0.3 } },
  { id: '6', category: 'shopping', activity_type: '👕 Clothing (Fast Fashion)', co2_kg: 19.5, created_at: new Date(Date.now() - 518400000), details: { item: 'Fast fashion' } },
];

const DEMO_TREES = [
  { id: 't1', species: 'Neem (Azadirachta indica)', species_common: 'Neem', co2_kg_year: 21.7, estimated_age_years: 2, planted_at: new Date(Date.now() - 30 * 86400000), location: 'Patna', photo_url: null },
  { id: 't2', species: 'Peepal (Ficus religiosa)', species_common: 'Peepal', co2_kg_year: 22.6, estimated_age_years: 3, planted_at: new Date(Date.now() - 60 * 86400000), location: 'Delhi', photo_url: null },
];

const DEMO_POSTS = [
  { id: 'p1', user_name: 'Rajan Kumar', user_city: 'Bangalore', user_avatar: 'R', tree_species: 'Gulmohar', co2_offset_kg: 18.4, post_type: 'tree', caption: 'Planted a beautiful Gulmohar outside my office! 🌺 My flight to Pune is now offset.', likes: 47, liked_by: [], created_at: new Date(Date.now() - 3600000).toISOString(), badges: ['✈️ Flight Offset'] },
  { id: 'p2', user_name: 'Meera Iyer', user_city: 'Chennai', user_avatar: 'M', tree_species: 'Banyan', co2_offset_kg: 28.3, post_type: 'tree', caption: 'This banyan will grow to offset 28kg CO2 every year. Small acts, big impact 💚', likes: 89, liked_by: [], created_at: new Date(Date.now() - 7200000).toISOString(), badges: ['🌳 Tree Pioneer'] },
  { id: 'p3', user_name: 'Arjun Mehta', user_city: 'Mumbai', user_avatar: 'A', tree_species: 'Mango', co2_offset_kg: 15.8, post_type: 'tree', caption: 'Fruit + carbon offset — what a deal! 🥭 Mango tree planted in our building terrace garden.', likes: 123, liked_by: [], created_at: new Date(Date.now() - 14400000).toISOString(), badges: ['🌟 Green Streak: 7 Days'] },
  { id: 'p4', user_name: 'Priya Verma', user_city: 'Delhi', user_avatar: 'P', tree_species: 'Neem', co2_offset_kg: 21.7, post_type: 'tree', caption: 'Neem trees are so underrated! Natural air purifier + CO2 absorber 🌱', likes: 56, liked_by: [], created_at: new Date(Date.now() - 21600000).toISOString(), badges: ['💯 100kg Offset Hero'] },
  { id: 'p5', user_name: 'Kiran Patel', user_city: 'Ahmedabad', user_avatar: 'K', tree_species: null, co2_offset_kg: 0, post_type: 'update', caption: 'Switched to public transport this week. Saved approx 8.4kg CO2! Every choice matters 🚇', likes: 34, liked_by: [], created_at: new Date(Date.now() - 28800000).toISOString(), badges: [] },
  { id: 'p6', user_name: 'Sneha Rao', user_city: 'Hyderabad', user_avatar: 'S', tree_species: null, co2_offset_kg: 0, post_type: 'activity', caption: 'Calculated my first carbon footprint: 6.2 kg CO2 from AC usage. Time to offset! 📊', likes: 21, liked_by: [], created_at: new Date(Date.now() - 36000000).toISOString(), badges: ['📊 First Track'] },
];

export const useAppStore = create(
  persist(
    (set, get) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  isDemo: false,
  hasCompletedOnboarding: false,

  completeOnboarding: () => set({ hasCompletedOnboarding: true }),

  // Activities
  activities: DEMO_ACTIVITIES,
  totalCO2Emitted: DEMO_ACTIVITIES.reduce((s, a) => s + a.co2_kg, 0),

  // Trees
  trees: DEMO_TREES,
  totalCO2Offset: DEMO_TREES.reduce((s, t) => s + (t.co2_kg_year / 12) * t.estimated_age_years, 0),

  // Community
  communityPosts: DEMO_POSTS,
  communityLoading: false,
  lastFetchedAt: null,
  leaderboard: [
    { rank: 1, name: 'Arjun Mehta', city: 'Mumbai', co2_offset: 285, trees: 12, streak: 21 },
    { rank: 2, name: 'Meera Iyer', city: 'Chennai', co2_offset: 241, trees: 10, streak: 14 },
    { rank: 3, name: 'Priya Sharma', city: 'Patna', co2_offset: 178, trees: 7, streak: 9 },
    { rank: 4, name: 'Rajan Kumar', city: 'Bangalore', co2_offset: 156, trees: 6, streak: 6 },
    { rank: 5, name: 'Kiran Patel', city: 'Ahmedabad', co2_offset: 134, trees: 5, streak: 5 },
  ],

  // Gamification
  weekStreak: 4,
  weeklyGoalKg: 10.0,
  weeklyEmittedKg: 6.4,

  // UI State
  sidebarOpen: true,
  loading: false,
  currentPage: 'dashboard',

  // Profile Routine (Private)
  routine: {
    events: [] // array of { id, day, hour, type, title, details }
  },
  
  // ML Generated Tasks
  ecoTasks: [],

  // Chat
  chatMessages: [
    {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm GreenStep's AI climate advisor. Choose a model above — **free HuggingFace LLMs** (Llama 3.1, Qwen 2.5, DeepSeek R1, Gemma 3) or **Google AI** (Gemini, ADK Agent). Ask me anything about your carbon footprint! 🌱",
      timestamp: new Date(),
      modelLabel: 'GreenStep AI',
      provider: 'System',
    }
  ],

  // ── Actions ────────────────────────────────────────────────────────────────
  setUser: (user) => {
    // Clear ALL user-specific data when switching accounts
    // This prevents chat/activities from bleeding between different Google accounts
    const welcomeMsg = {
      id: 'welcome',
      role: 'assistant',
      content: `👋 Hi${user?.displayName ? ' ' + user.displayName.split(' ')[0] : ''}! I'm GreenStep's AI climate advisor, powered by Gemini 2.0 Flash with knowledge from IPCC AR6, India MoEF, and FAO. Ask me anything about your carbon footprint!`,
      timestamp: new Date(),
    };
    set({
      user,
      isAuthenticated: !!user,
      // Reset per-user data on every login
      chatMessages: [welcomeMsg],
      activities: DEMO_ACTIVITIES,
      trees: DEMO_TREES,
      totalCO2Emitted: DEMO_ACTIVITIES.reduce((s, a) => s + a.co2_kg, 0),
      totalCO2Offset: DEMO_TREES.reduce((s, t) => s + (t.co2_kg_year / 12) * t.estimated_age_years, 0),
      weeklyEmittedKg: 6.4,
    });
  },

  logout: () => {
    const welcomeMsg = {
      id: 'welcome',
      role: 'assistant',
      content: "👋 Hi! I'm GreenStep's AI climate advisor. Ask me anything about your carbon footprint!",
      timestamp: new Date(),
    };
    set({
      user: null,
      isAuthenticated: false,
      isDemo: false,
      chatMessages: [welcomeMsg],
      activities: DEMO_ACTIVITIES,
      trees: DEMO_TREES,
      totalCO2Emitted: DEMO_ACTIVITIES.reduce((s, a) => s + a.co2_kg, 0),
      totalCO2Offset: DEMO_TREES.reduce((s, t) => s + (t.co2_kg_year / 12) * t.estimated_age_years, 0),
    });
  },

  fetchUserData: async () => {
    const { user, isDemo } = get();
    if (!user || isDemo) return;
    set({ loading: true });
    try {
      const [activities, trees] = await Promise.all([
        fetchUserActivities(user.uid),
        fetchUserTrees(user.uid),
      ]);
      set({
        activities: activities.length ? activities : DEMO_ACTIVITIES,
        trees: trees.length ? trees : DEMO_TREES,
        totalCO2Emitted: (activities.length ? activities : DEMO_ACTIVITIES).reduce((s, a) => s + a.co2_kg, 0),
        totalCO2Offset: (trees.length ? trees : DEMO_TREES).reduce((s, t) => s + (t.co2_kg_year / 12) * Math.max(t.estimated_age_years, 1), 0),
      });
    } catch (e) { console.error('fetchUserData error:', e); }
    finally { set({ loading: false }); }
  },

  fetchCommunityPosts: async () => {
    set({ communityLoading: true });
    try {
      const data = await getCommunityFeed(1);
      if (data?.posts?.length) {
        set({
          communityPosts: data.posts,
          lastFetchedAt: Date.now(),
        });
      }
    } catch (e) {
      console.warn('Community feed fetch failed, using demo data:', e.message);
    } finally {
      set({ communityLoading: false });
    }
  },

  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setRoutine: (updates) => set((state) => ({ routine: { ...state.routine, ...updates } })),

  generateMLTasks: () => {
    const { routine, ecoTasks } = get();
    const events = routine.events || [];
    let carEvents = 0;
    let meatEvents = 0;

    events.forEach(ev => {
      const details = (ev.details || '').toLowerCase();
      const title = (ev.title || '').toLowerCase();
      const textToAnalyze = details + ' ' + title;
      if (textToAnalyze.includes('car') || textToAnalyze.includes('drive') || textToAnalyze.includes('petrol')) carEvents++;
      if (textToAnalyze.includes('meat') || textToAnalyze.includes('chicken') || textToAnalyze.includes('beef')) meatEvents++;
    });

    const newTasks = [];
    if (carEvents >= 2) {
      newTasks.push({ id: `t_${Date.now()}_1`, title: 'Take the Metro instead of your car to offset emissions', status: 'pending', proof_post_id: null });
    }
    if (meatEvents >= 2) {
      newTasks.push({ id: `t_${Date.now()}_2`, title: 'Eat a fully plant-based meal today', status: 'pending', proof_post_id: null });
    }
    if (events.length > 0 && carEvents === 0 && meatEvents === 0) {
      newTasks.push({ id: `t_${Date.now()}_3`, title: 'Plant a tree to keep up your green momentum!', status: 'pending', proof_post_id: null });
    }
    
    // Only add tasks that don't already exist (by title)
    set((state) => {
      const currentTaskTitles = state.ecoTasks.map(t => t.title);
      const filteredNewTasks = newTasks.filter(nt => !currentTaskTitles.includes(nt.title));
      return { ecoTasks: [...filteredNewTasks, ...state.ecoTasks] };
    });
  },

  completeTaskWithProof: (taskId, postId) => {
    set((state) => ({
      ecoTasks: state.ecoTasks.map(t => 
        t.id === taskId ? { ...t, status: 'completed', proof_post_id: postId } : t
      )
    }));
  },

  addActivity: async (activity) => {
    const { user, isDemo } = get();
    let finalActivity = activity;
    if (user && !isDemo) {
      finalActivity = await saveActivityToDB(user.uid, activity);
    }
    set((state) => {
      const newActivities = [finalActivity, ...state.activities];
      const weeklyEmitted = newActivities
        .filter(a => {
          const d = new Date(a.created_at);
          const now = new Date();
          const weekAgo = new Date(now - 7 * 86400000);
          return d >= weekAgo;
        })
        .reduce((s, a) => s + a.co2_kg, 0);
      return {
        activities: newActivities,
        totalCO2Emitted: newActivities.reduce((s, a) => s + a.co2_kg, 0),
        weeklyEmittedKg: parseFloat(weeklyEmitted.toFixed(2)),
      };
    });
  },

  addTree: async (tree) => {
    const { user, isDemo } = get();
    let finalTree = tree;
    if (user && !isDemo) {
      finalTree = await saveTreeToDB(user.uid, tree);
    }
    set((state) => {
      const newTrees = [finalTree, ...state.trees];
      return {
        trees: newTrees,
        totalCO2Offset: newTrees.reduce((s, t) => s + (t.co2_kg_year / 12) * Math.max(t.estimated_age_years, 1), 0),
      };
    });
  },

  addCommunityPost: async (post) => {
    const { user } = get();
    // Optimistically add to local state
    set((state) => ({ communityPosts: [post, ...state.communityPosts] }));
    // Try to persist to backend
    try {
      const res = await createCommunityPost({
        user_name: post.user_name,
        user_city: post.user_city || 'India',
        user_avatar: post.user_name?.[0]?.toUpperCase() || 'U',
        tree_species: post.tree_species || null,
        co2_offset_kg: post.co2_offset_kg || 0,
        post_type: post.post_type || 'update',
        caption: post.caption,
        badges: post.badges || [],
        photo_url: post.photo_url || null,
      });
      // Replace optimistic post with real one from backend
      if (res?.post) {
        set((state) => ({
          communityPosts: state.communityPosts.map(p =>
            p.id === post.id ? { ...res.post } : p
          ),
        }));
      }
    } catch (e) {
      console.warn('Post to backend failed, keeping local:', e.message);
    }
  },

  deleteCommunityPost: async (postId) => {
    // Optimistic delete
    set((state) => ({ communityPosts: state.communityPosts.filter(p => p.id !== postId) }));
    try {
      await deleteCommunityPostAPI(postId);
    } catch (e) {
      console.warn('Delete post failed:', e.message);
    }
  },

  likePost: async (postId) => {
    const { user } = get();
    const userId = user?.uid || 'anonymous';
    // Optimistic update
    set((state) => ({
      communityPosts: state.communityPosts.map(p =>
        p.id === postId
          ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
          : p
      ),
    }));
    // Persist
    try {
      await toggleLikePost(postId, userId);
    } catch (e) {
      console.warn('Like API failed, using local state');
    }
  },

  addCommunityComment: async (postId, text) => {
    const { user } = get();
    const userName = user?.displayName || 'Green Earthling';
    
    // Opt update (basic)
    const newComment = { id: `temp-${Date.now()}`, user_name: userName, text, created_at: new Date().toISOString() };
    set((state) => ({
      communityPosts: state.communityPosts.map(p =>
        p.id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p
      ),
    }));

    try {
      const { addCommunityComment } = await import('../services/api');
      const res = await addCommunityComment(postId, userName, text);
      if (res?.comment) {
        set((state) => ({
          communityPosts: state.communityPosts.map(p =>
            p.id === postId ? {
              ...p,
              comments: (p.comments || []).map(c => c.id === newComment.id ? res.comment : c)
            } : p
          ),
        }));
      }
    } catch (e) {
      console.warn('Comment API failed:', e);
    }
  },

  addChatMessage: (message) => set((state) => ({
    chatMessages: [...state.chatMessages, message],
  })),

  updateChatMessage: (id, updates) => set((state) => ({
    chatMessages: state.chatMessages.map(m => m.id === id ? { ...m, ...updates } : m),
  })),

  clearChatMessages: () => set({
    chatMessages: [{
      id: 'welcome-' + Date.now(),
      role: 'assistant',
      content: "👋 Chat cleared! Choose a model above and ask me anything about your carbon footprint. 🌱",
      timestamp: new Date(),
      modelLabel: 'GreenStep AI',
      provider: 'System',
    }]
  }),

  setLoading: (loading) => set({ loading }),

  // ── Computed ───────────────────────────────────────────────────────────────
  getNetBalance: () => {
    const { totalCO2Offset, totalCO2Emitted } = get();
    return totalCO2Offset - totalCO2Emitted;
  },

  getCarbonScore: () => {
    const { totalCO2Offset, totalCO2Emitted } = get();
    if (totalCO2Emitted === 0) return 100;
    const ratio = totalCO2Offset / totalCO2Emitted;
    return Math.min(100, Math.round(ratio * 70 + 30));
  },

  getWeeklyProgress: () => {
    const { weeklyEmittedKg, weeklyGoalKg } = get();
    if (weeklyGoalKg <= 0) return 0;
    return Math.min(100, Math.round((weeklyEmittedKg / weeklyGoalKg) * 100));
  },

  getBadges: () => {
    const { trees, activities, totalCO2Offset, weekStreak } = get();
    const badges = [];
    if (trees.length >= 1) badges.push({ icon: '🌱', label: 'First Tree', color: 'green' });
    if (trees.length >= 5) badges.push({ icon: '🌳', label: '5 Trees', color: 'green' });
    if (trees.length >= 10) badges.push({ icon: '🏕️', label: '10 Trees', color: 'green' });
    if (totalCO2Offset >= 50) badges.push({ icon: '💚', label: '50kg Hero', color: 'green' });
    if (totalCO2Offset >= 100) badges.push({ icon: '💯', label: '100kg Hero', color: 'gold' });
    if (activities.length >= 7) badges.push({ icon: '📊', label: 'Consistent Tracker', color: 'blue' });
    if (weekStreak >= 7) badges.push({ icon: '🔥', label: `${weekStreak}-Day Streak`, color: 'gold' });
    const hasTransit = activities.some(a => a.activity_type?.toLowerCase().includes('metro') || a.activity_type?.toLowerCase().includes('bus'));
    if (hasTransit) badges.push({ icon: '🚇', label: 'Transit Hero', color: 'blue' });
    return badges;
  },
}),
{
  name: 'greenstep-storage',
  partialize: (state) => ({ 
    routine: state.routine, 
    ecoTasks: state.ecoTasks,
    activities: state.activities,
    trees: state.trees,
    totalCO2Emitted: state.totalCO2Emitted,
    totalCO2Offset: state.totalCO2Offset,
    weeklyEmittedKg: state.weeklyEmittedKg,
    communityPosts: state.communityPosts
  }),
}));
