import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDW2l-0t_LjqBvXbf8g2fCv_mHL_-QB83w",
  authDomain: "reactmodoro-f0436.firebaseapp.com",
  databaseURL: "https://reactmodoro-f0436.firebaseio.com",
  projectId: "reactmodoro-f0436",
  storageBucket: "reactmodoro-f0436.appspot.com",
  messagingSenderId: "232465234583"
};
firebase.initializeApp(config);

const ref = firebase.database().ref()
const firebaseAuth = firebase.auth()
const facebookProvider = firebase.auth.FacebookAuthProvider

export {
  ref,
  firebaseAuth,
  facebookProvider,
}
