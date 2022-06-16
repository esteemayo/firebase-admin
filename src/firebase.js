import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'admin-firebase-696b1.firebaseapp.com',
  projectId: 'admin-firebase-696b1',
  storageBucket: 'admin-firebase-696b1.appspot.com',
  messagingSenderId: '1056094285725',
  appId: '1:1056094285725:web:9d6cd5c5c2614690bd0974',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default app;
