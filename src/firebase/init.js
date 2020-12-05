import firebase from '@firebase/app';
import 'firebase/auth';
import 'firebase/storage'; 
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB3ossYi3gZPtq6g8szcYiWexi6geKM-gI",
  authDomain: "emilia-blascakova-clinic.firebaseapp.com",
  databaseURL: "https://emilia-blascakova-clinic.firebaseio.com",
  projectId: "emilia-blascakova-clinic",
  storageBucket: "emilia-blascakova-clinic.appspot.com",
  messagingSenderId: "737491160785",
  appId: "1:737491160785:web:82e67db12a74ca642d3ff0",
  measurementId: "G-4ZEVJ4HRQ5"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
// db.settings({timestampsInSnapshots: true});

const auth = firebase.auth()

export {fb, db, auth};