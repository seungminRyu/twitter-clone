import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCtMR3k0E3Cerl1h56BsxCGf3B1YnxS5sk",
    authDomain: "twitter-clone-2dd80.firebaseapp.com",
    projectId: "twitter-clone-2dd80",
    storageBucket: "twitter-clone-2dd80.appspot.com",
    messagingSenderId: "243508196566",
    appId: "1:243508196566:web:62ea863062b9a7f2f08577",
};

export default firebase.initializeApp(firebaseConfig);
