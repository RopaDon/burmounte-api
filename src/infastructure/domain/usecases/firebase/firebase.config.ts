import * as admin from "firebase-admin";
import * as serviceAccount from "./burmounte-firebase-adminsdk.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE!,
});

// Initialize Firebase Storage
export { admin as adminSdk };
