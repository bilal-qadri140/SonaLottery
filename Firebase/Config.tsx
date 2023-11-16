// import { firestore } from "firebase-admin";
import firebase, { initializeApp } from "firebase/app";
import "firebase/firestore";
import firestore from '@react-native-firebase/firestore';


const firebaseConfig = {
    apiKey: 'AIzaSyCspEXdkbZy1-mVBZbQnKNzqtXmwr-WOqI',
    authDomain: 'lottery-816a8.firebaseapp.com', // Derived from the project_id
    projectId: 'lottery-816a8',
    storageBucket: 'lottery-816a8.appspot.com',
    messagingSenderId: '307298536597',
    appId: '1:307298536597:android:9e87a93b9aa12af33c5f9c',
    databaseURL: 'https://lottery-816a8-default-rtdb.firebaseio.com', // This is your Realtime Database URL
  };
initializeApp(firebaseConfig);

export const db = firestore();