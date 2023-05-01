import firebase from "firebase/app";
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

const projectFirestore = firebase.firestore();

export { projectFirestore };
