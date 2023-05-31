import { initializeApp } from 'Firebase/app';
	import { getFirestore } from 'Firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC5cjRCV275aYB9OqznWvwUZToE4Fi0Vzk",
  authDomain: "love-guesser.firebaseapp.com",
  projectId: "love-guesser",
  storageBucket: "love-guesser.appspot.com",
  messagingSenderId: "633599458706",
  appId: "1:633599458706:web:299429f33077c28abad54b",
  measurementId: "G-8G5MT00MFE"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);