import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuthStore } from '../store/authStore';
import { getUserProfile } from '../services/userService';

/**
 * Sets up the Firebase auth state listener.
 * Call this once at the root of the app (in App.tsx).
 *
 * On auth state change:
 * - Sets firebaseUser in the store
 * - Fetches the Firestore UserProfile (if it exists)
 * - Sets isInitialized = true so navigation can render
 */
export function useAuthListener() {
  const {
    setFirebaseUser,
    setUserProfile,
    setLoading,
    setInitialized,
  } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          setUserProfile(profile); // null if first-time user (no username yet)
        } catch (error: any) {
          console.error('Failed to fetch user profile:', error?.code, error?.message);
          // Don't block the app — treat as new user with no profile
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }

      setLoading(false);
      setInitialized(true);
    });

    return unsubscribe;
  }, []);
}
