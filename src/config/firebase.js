import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBMCSW8NheI9zeKphyFjzieYeAOnK3TNw",
  authDomain: "book-store-89971.firebaseapp.com",
  projectId: "book-store-89971",
  storageBucket: "book-store-89971.appspot.com",
  messagingSenderId: "942396816580",
  appId: "1:942396816580:web:78d26b3af6fe1a67db9d91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
