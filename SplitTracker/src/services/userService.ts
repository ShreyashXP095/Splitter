import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
  arrayUnion,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfile } from '../types';

const USERS = 'users';

// ─── Fetch a user profile by UID ─────────────────────────────────────────────
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, USERS, uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() } as UserProfile;
}

// ─── Create a new user document (first login) ────────────────────────────────
export async function createUserProfile(
  profile: Omit<UserProfile, 'createdAt' | 'friendIds'>
): Promise<void> {
  await setDoc(doc(db, USERS, profile.uid), {
    username: profile.username,
    email: profile.email,
    displayName: profile.displayName,
    photoURL: profile.photoURL,
    friendIds: [],
    expoPushToken: '',
    createdAt: Date.now(),
  });
}

// ─── Check if a username is already taken ────────────────────────────────────
export async function isUsernameTaken(username: string): Promise<boolean> {
  const q = query(
    collection(db, USERS),
    where('username', '==', username.toLowerCase()),
    limit(1)
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

// ─── Search users by username prefix (case-insensitive) ──────────────────────
// Firestore doesn't support true ILIKE, so we store usernames lowercase
// and query with >= / <= range trick for prefix matching.
export async function searchUsersByUsername(
  prefix: string,
  currentUserId: string
): Promise<UserProfile[]> {
  if (!prefix || prefix.length < 2) return [];

  const lower = prefix.toLowerCase();
  const upper = lower.slice(0, -1) + String.fromCharCode(lower.charCodeAt(lower.length - 1) + 1);

  const q = query(
    collection(db, USERS),
    where('username', '>=', lower),
    where('username', '<', upper),
    limit(10)
  );

  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ uid: d.id, ...d.data() } as UserProfile))
    .filter((u) => u.uid !== currentUserId);
}

// ─── Add friend (mutual) ─────────────────────────────────────────────────────
export async function addFriend(
  currentUserId: string,
  friendId: string
): Promise<void> {
  await Promise.all([
    updateDoc(doc(db, USERS, currentUserId), {
      friendIds: arrayUnion(friendId),
    }),
    updateDoc(doc(db, USERS, friendId), {
      friendIds: arrayUnion(currentUserId),
    }),
  ]);
}

// ─── Update push token ───────────────────────────────────────────────────────
export async function updatePushToken(
  uid: string,
  token: string
): Promise<void> {
  await updateDoc(doc(db, USERS, uid), { expoPushToken: token });
}

// ─── Update username ──────────────────────────────────────────────────────────
export async function updateUsername(
  uid: string,
  username: string
): Promise<void> {
  await updateDoc(doc(db, USERS, uid), { username: username.toLowerCase() });
}
