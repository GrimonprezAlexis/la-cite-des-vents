"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDlOG3bFGDiSspNwxvy_lNIPAitkk6YXdA",
  authDomain: "lacitefleurie-54767.firebaseapp.com",
  projectId: "lacitefleurie-54767",
  storageBucket: "lacitefleurie-54767.firebasestorage.app",
  messagingSenderId: "393690807314",
  appId: "1:393690807314:web:de7d3087bb4763caa9accb",
  measurementId: "G-Q2HSJE2NBB"
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

if (typeof window !== "undefined") {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

export { app, auth, db, storage };
