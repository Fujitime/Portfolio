import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBDlDZCQOR4DBejHFwJSq-BCIYjxl1Qv1A",
  authDomain: "vue-blog-1b72c.firebaseapp.com",
  projectId: "vue-blog-1b72c",
  storageBucket: "vue-blog-1b72c.appspot.com",
  messagingSenderId: "902033285642",
  appId: "1:902033285642:web:89208a21a8f7e87b05f5f3",
};

firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
export function signInWithGoogle() {
  return firebase.auth().signInWithPopup(provider);
}
export function signOut() {
  return firebase.auth().signOut();
}

export const db = firebase.firestore();
export const auth = firebase.auth();
const projectFirestore = firebase.firestore();

export { projectFirestore };
