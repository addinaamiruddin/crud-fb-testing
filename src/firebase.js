import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC2UNxX7wRtfbWT2N7HmOR5qmhi-cI0t3g",
  authDomain: "crud-fb-e5e05.firebaseapp.com",
  projectId: "crud-fb-e5e05",
  storageBucket: "crud-fb-e5e05.appspot.com",
  messagingSenderId: "489166454746",
  appId: "1:489166454746:web:9d13b35d4fcc47f7a3cae3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
