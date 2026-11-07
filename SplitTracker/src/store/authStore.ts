import { create } from 'zustand';
import { User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { UserProfile } from '../types';

interface AuthState {
  firebaseUser: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  // true after onAuthStateChanged fires for the first time
  // (prevents flash of login screen on restart)
  isInitialized: boolean;

  setFirebaseUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signOut: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  userProfile: null,
  isLoading: false,
  isInitialized: false,

  setFirebaseUser: (user) => set({ firebaseUser: user }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setLoading: (loading) => set({ isLoading: loading }),
  setInitialized: (initialized) => set({ isInitialized: initialized }),

  signOut: async () => {
    await firebaseSignOut(auth);
    set({ firebaseUser: null, userProfile: null });
  },

  reset: () =>
    set({
      firebaseUser: null,
      userProfile: null,
      isLoading: false,
    }),
}));
