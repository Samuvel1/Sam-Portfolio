import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCOYnafjAZ2T3XI_7BRhejE5mBIMw5nB3Y",
  authDomain: "sam-portfolio-8580e.firebaseapp.com",
  projectId: "sam-portfolio-8580e",
  storageBucket: "sam-portfolio-8580e.firebasestorage.app",
  messagingSenderId: "367246192819",
  appId: "1:367246192819:web:b25cfc376c1caa98dd40c6",
  measurementId: "G-NR49MCL481",
  databaseURL: "https://sam-portfolio-8580e-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);