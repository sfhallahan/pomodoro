import { firebaseAuth, facebookProvider, ref, googleProvider } from '../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'

export function getFacebookAccessToken() {
  return AccessToken.getCurrentAccessToken()
}

export function authWithFacebookToken (accessToken) {
  return firebaseAuth
    .signInWithCredential(facebookProvider.credential(accessToken))
}

export function authWithGoogleToken (accessToken) {
  return firebaseAuth
    .signInWithCredential(googleProvider.credential(accessToken))
}

export function updateUser (user) {
  return Promise.all([
    ref.child(`users/${user.uid}`).set(user),
    ref.child(`scores/${user.uid}`).update(user),
  ])
}

// TODO update system to be conscious of signin type
export function logout () {
  LoginManager.logOut()
  GoogleSignin.signOut()
  firebaseAuth.signOut()
  ref.off()
}
