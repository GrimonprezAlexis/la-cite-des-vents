import * as admin from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    db = admin.firestore();
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { db };
export default admin;
