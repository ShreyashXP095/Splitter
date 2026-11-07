# Project Context — Split Tracker

## What's Been Built

### Task 1: Project Setup & Navigation Shell ✅
- Initialized Expo SDK 58 project with TypeScript
- Installed all dependencies (React Navigation v6, React Native Paper, Zustand, Firebase 11, Expo Notifications, Camera, QR Code, NetInfo, AsyncStorage, expo-auth-session, gesture-handler v3.3, safe-area-context v5.11)
- Created full folder structure and all placeholder screens
- Implemented pure utility functions: splitCalculator, debtSimplifier, balanceCalculator
- Wired up full navigation tree: AuthStack → AppTabs (Home + Friends) + modal screens
- TypeScript compiles clean

### Task 2: Firebase Setup & Google Auth → Email/Password Auth ✅
- Replaced Google OAuth entirely with email/password auth (Google OAuth redirect flow was incompatible with Expo Go due to URI scheme restrictions)
- Created `src/services/authService.ts` — registerWithEmail, signInWithEmail, signOutUser, sendPasswordReset, getAuthErrorMessage (maps Firebase error codes to readable messages)
- Updated `src/services/firebase.ts` — clean init with AsyncStorage persistence
- Rewrote `LoginScreen.tsx` — email + password inputs, show/hide password, forgot password link, link to Register
- Created `RegisterScreen.tsx` — full name, email, password, confirm password, validation
- Created `ForgotPasswordScreen.tsx` — sends Firebase password reset email, shows success state
- Updated `UsernameSetupScreen.tsx` — unchanged, fires after registration to set unique username
- Updated `src/store/authStore.ts` — signOut action wired to Firebase
- Created `src/hooks/useAuthListener.ts` — onAuthStateChanged listener fetches Firestore profile, sets isInitialized
- Updated `App.tsx` — mounts useAuthListener at root
- Updated navigation — AuthStack now has Login → Register → ForgotPassword → UsernameSetup; routing based on firebaseUser + userProfile.username
- TypeScript: 0 errors

## Current State
Auth is fully wired. The app routes correctly based on login state. Two config values still need to be filled in before Google Sign-In works on a real device:
1. `src/services/firebase.ts` — replace `YOUR_*` values with your Firebase project config
2. `src/hooks/useGoogleAuth.ts` — replace `YOUR_WEB_CLIENT_ID` with the OAuth web client ID from Firebase Console

## What's Coming Next
- **Task 3: Friends System** — Firestore username search with real-time results, mutual friend adding, personal QR code display (react-native-qrcode-svg), QR scanner (expo-camera) to add friends instantly.
