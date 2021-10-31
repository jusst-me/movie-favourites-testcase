import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAwIFQEDIvjpy095bvixKXqMhNorRnrJJE",
  authDomain: "favourite-movies-e19d0.firebaseapp.com",
  projectId: "favourite-movies-e19d0",
  storageBucket: "favourite-movies-e19d0.appspot.com",
  messagingSenderId: "847065902051",
  appId: "1:847065902051:web:bc1b66783dec41dac64ed6",
  measurementId: "G-XSJ1WFH8L7",
  databaseURL: "https://favourite-movies-e19d0-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

export default app;
