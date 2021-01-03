import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDBen8kv2BotA7kEeadJsO0JpZJP65plmk",
  authDomain: "chat-me-ebf5a.firebaseapp.com",
  projectId: "chat-me-ebf5a",
  storageBucket: "chat-me-ebf5a.appspot.com",
  messagingSenderId: "899020716619",
  appId: "1:899020716619:web:f4346ef25030d682c02bce",
  measurementId: "G-ED0KDL0E5G"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const IOS = '899020716619-k7nsma4onfru5k8hrjke5m6ope6q2fbs.apps.googleusercontent.com';
  const AND = '899020716619-jimjhp25jro4gukan0hpglmf5bpq2g36.apps.googleusercontent.com';

  export {db, firebaseApp, IOS, AND};
