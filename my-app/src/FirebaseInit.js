// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCKjTjYf8H-1tkKAbwfhVnHhdUYg5gcAIo",
    authDomain: "life-dashboard-93e1c.firebaseapp.com",
    databaseURL: "https://life-dashboard-93e1c.firebaseio.com",
    projectId: "life-dashboard-93e1c",
    storageBucket: "life-dashboard-93e1c.appspot.com",
    messagingSenderId: "869775988563",
    appId: "1:869775988563:web:dafcc2f570806fd787b3a6",
    measurementId: "G-YGQ61WFBYZ"
}

const initializeApp = () => firebase.initializeApp(firebaseConfig)

export default initializeApp;