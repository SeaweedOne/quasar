import firebase from 'firebase/app';
import 'firebase/auth'


const firebaseConfig={
  apiKey: "AIzaSyBmXu2PT7K4lwyWDsgttJZR6cIIfETGyQ0",
  authDomain: "firstfirebase-834df.firebaseapp.com",
  projectId: "firstfirebase-834df",
  storageBucket: "firstfirebase-834df.appspot.com",
  messagingSenderId: "989981968402",
  appId: "1:989981968402:web:ec0ecedf2963dec301f0cb"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.analytics();

export const auth = firebase.auth();