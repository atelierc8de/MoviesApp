
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC4tmYExf9hQJpd7KdtPPtgzj7BAyOaGW8",
  authDomain: "movieappex-6c5c2.firebaseapp.com",
  databaseURL: "https://movieappex-6c5c2-default-rtdb.firebaseio.com",
  projectId: "movieappex-6c5c2",
  storageBucket: "movieappex-6c5c2.appspot.com",
  messagingSenderId: "56274833302",
  appId: "1:56274833302:web:f6fa176d9297be4a7b17b7",
  measurementId: "G-WJZMV8EK6J"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const instance = firebase.firestore();
const auth = firebase.auth();
const firestore = {
  instance,
  favorites: () => instance.collection('dev').doc('favorites')
}


export { firebase, firestore, auth, instance };
