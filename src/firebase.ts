import { initializeApp } from "firebase/app";
import { browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBX9LcVjHgRI0Q6_62f4Mhpjsfb0isu7es",
  authDomain: "rustic-charm-ordering.firebaseapp.com",
  projectId: "rustic-charm-ordering",
  storageBucket: "rustic-charm-ordering.firebasestorage.app",
  messagingSenderId: "656151796239",
  appId: "1:656151796239:web:78b13e1df2a0183989217a",
};

const app = initializeApp(firebaseConfig);

// Use localStorage persistence so auth startup does not depend on IndexedDB availability.
export const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
export const storage = getStorage(app);

export default app;
