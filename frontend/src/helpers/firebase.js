import { getEnv } from '@/helpers/getEnv'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "blog-space-5ecbc.firebaseapp.com",
  projectId: "blog-space-5ecbc",
  storageBucket: "blog-space-5ecbc.firebasestorage.app",
  messagingSenderId: "391761358644",
  appId: "1:391761358644:web:20c5879916ef3542607f61"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider}