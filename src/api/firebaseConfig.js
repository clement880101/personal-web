import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA8O4Etd9qQANBJzz_otSqCEEHGAiU9mkg",
    authDomain: "personalwebsite-4b72f.firebaseapp.com",
    projectId: "personalwebsite-4b72f",
    storageBucket: "personalwebsite-4b72f.appspot.com",
    messagingSenderId: "824149975722",
    appId: "1:824149975722:web:f7cfabafc00f9bcd5766d3",
    measurementId: "G-HJ8H8JDLP3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();


export { app, db, storage };