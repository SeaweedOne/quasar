import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmXu2PT7K4lwyWDsgttJZR6cIIfETGyQ0",
  authDomain: "firstfirebase-834df.firebaseapp.com",
  projectId: "firstfirebase-834df",
  storageBucket: "firstfirebase-834df.appspot.com",
  messagingSenderId: "989981968402",
  appId: "1:989981968402:web:697fd5e5c96c041b01f0cb",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();

export const auth = firebase.auth();
export const db = firebase.firestore();
