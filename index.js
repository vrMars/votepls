// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';

// Add the Firebase products and methods that you want to use
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

let rsvpListener = null;
let guestbookListener = null;

let db, auth;

async function main() {
  // Add Firebase project configuration object here
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyBEuGYJeA2LWlxkd9B5vmrV10JjMOL0YOg',
    authDomain: 'vote-741c8.firebaseapp.com',
    projectId: 'vote-741c8',
    storageBucket: 'vote-741c8.appspot.com',
    messagingSenderId: '1014504745860',
    appId: '1:1014504745860:web:c277da5744549754fa4bd1',
    measurementId: 'G-92B4ZWBPYS',
  };

  initializeApp(firebaseConfig);
  auth = getAuth();
  db = getFirestore();

  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      startRsvpButton.textContent = 'LOGOUT';
    } else {
      startRsvpButton.textContent = 'RSVP';
    }
  });
  // startRsvpButton.addEventListener('click', () => {
  //   if (auth.currentUser) {
  //     // User is signed in; allows user to sign out
  //     signOut(auth);
  //   } else {
  //     // No user is signed in; allows user to sign in
  //     ui.start('#firebaseui-auth-container', uiConfig);
  //   }
  // });

  // FirebaseUI config
  // const uiConfig = {
  //   credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  //   signInOptions: [
  //     // Email / Password Provider.
  //     // auth.AnonymousAuthProvider.PROVIDER_ID,
  //   ],
  //   callbacks: {
  //     signInSuccessWithAuthResult: function (authResult, redirectUrl) {
  //       // Handle sign-in.
  //       // Return false to avoid redirect.
  //       return false;
  //     },
  //   },
  // };

  // const ui = new firebaseui.auth.AuthUI(auth);
  // Initialize the FirebaseUI widget using Firebase
  const ui = new firebaseui.auth.AuthUI(auth);

  rsvpYes.addEventListener('click', () => {
    addDoc(collection(db, 'counter'), {
      count: 1,
    });
  });
  rsvpNo.addEventListener('click', () => {
    addDoc(collection(db, 'counter'), {
      count: 1,
    });
  });

  const q = query(collection(db, 'counter'));
  onSnapshot(q, (snaps) => {
    var counter = 0;
    snaps.forEach((doc) => {
      counter += 1;
    });
    count.innerHTML = counter;
  });
}
main();
