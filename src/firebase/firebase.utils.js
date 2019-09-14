import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBqyFsv8e8uDwiw5ucmuOipI9OF2AyYqSI",
    authDomain: "e-shop-c0845.firebaseapp.com",
    databaseURL: "https://e-shop-c0845.firebaseio.com",
    projectId: "e-shop-c0845",
    storageBucket: "",
    messagingSenderId: "502008702220",
    appId: "1:502008702220:web:142df1619578b4e0ba5529"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  // to trigger google popup when using google auth provider for auth and sign in
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;