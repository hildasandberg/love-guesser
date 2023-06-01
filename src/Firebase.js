import { initializeApp } from 'Firebase/app';
	import { getFirestore } from 'Firebase/firestore';
	import { collection, setDoc, doc } from 'Firebase/firestore';

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


export const poepleRef = collection(db, 'shows', 'gvfo', 'people');

export const createPeople = async () => {
      await setDoc(doc(poepleRef, 'arvid'), {
        id: 1,
        name: 'arvid',
        result: true
      });
      await setDoc(doc(poepleRef, 'ida'), {
        id: 2,
        name: 'Ida',
        result: true
      });
      await setDoc(doc(poepleRef, 'agust'), {
        id: 3,
        name: 'Agust',
        result: false
      });
      await setDoc(doc(poepleRef, 'carro'), {
        id: 4,
        name: 'Carro',
        result: false
      });
      await setDoc(doc(poepleRef, 'lina'), {
        id: 5,
        name: 'Lina',
        result: false
      });
      await setDoc(doc(poepleRef, 'alex'), {
        id: 6,
        name: 'Alex',
        result: true
      });
      await setDoc(doc(poepleRef, 'stina'), {
        id: 7,
        name: 'Stina',
        result: true
      });
      await setDoc(doc(poepleRef, 'fredrik'), {
        id: 8,
        name: 'Fredrik',
        result: true
      });
    }
