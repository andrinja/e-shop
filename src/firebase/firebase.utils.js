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

  // api request
  export const createUserProfileDocument = async (userAuth, additionalData) => {
    // if false then exist the function
    if(!userAuth) return;

    //const collectionRef = firestore.collection('users');
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    // snapshot reference data
    const snapShot = await userRef.get();
    // const collectionSnapshot = await collectionRef.get();
    // console.log({collection: collectionSnapshot.docs.map(doc => doc.data())});

    // create user ref in database
    if(!snapShot.exists) {
      // use document reference for CRUD data
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName, 
          email, 
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  // firebase created collection reference 
  console.log(collectionRef);

  // batch right or call right. Set all or dont set anything 
  const batch = firestore.batch();
 // FOREACH() is almost the same as .map() but Foreach() doesn't return array
 objectsToAdd.forEach(obj => {
   //get emty string. Firebase gives new doc ref for this collection. Generate random ID
   const newDocRef = collectionRef.doc();
   batch.set(newDocRef, obj);
 });
 // fire off batch request. Returns a promise. When commit succeeds it will come back and resolve void value (NULL)
 return await batch.commit()
} 


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  // to trigger google popup when using google auth provider for auth and sign in
  provider.setCustomParameters({ prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;