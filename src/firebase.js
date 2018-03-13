import * as firebase from 'firebase';
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAUnl54L2onYTjfVzPP67fXDXm2HuY99xI",
  authDomain: "portfolio-1a25d.firebaseapp.com",
  databaseURL: "https://portfolio-1a25d.firebaseio.com",
  projectId: "portfolio-1a25d",
  storageBucket: "",
  messagingSenderId: "155393483612"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('/notes');

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
