import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getReactNativePersistence } = require('@firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyDl12zhIg1OOU0QrEGQbB6_N0fl6VcqEEo',
  authDomain: 'splitter-b4a53.firebaseapp.com',
  projectId: 'splitter-b4a53',
  storageBucket: 'splitter-b4a53.firebasestorage.app',
  messagingSenderId: '708052823068',
  appId: '1:708052823068:web:f715e3ea4838fa8e5fc3d9',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;
