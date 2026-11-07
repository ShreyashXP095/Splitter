import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from './firebase';

// ─── Register new user ────────────────────────────────────────────────────────
export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string
) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  // Set displayName on the Firebase Auth profile
  await updateProfile(credential.user, { displayName });
  return credential.user;
}

// ─── Sign in existing user ────────────────────────────────────────────────────
export async function signInWithEmail(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

// ─── Sign out ─────────────────────────────────────────────────────────────────
export async function signOutUser() {
  await signOut(auth);
}

// ─── Password reset ───────────────────────────────────────────────────────────
export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email);
}

// ─── Firebase error → human-readable message ─────────────────────────────────
export function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Incorrect email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
