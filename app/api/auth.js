import { firebaseAuth, facebookProvider, ref } from '../config/constants'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

export function getAccessToken() {
  return AccessToken.getCurrentAccessToken()
}

export function authWithToken (accessToken) {
  return firebaseAuth
    .signInWithCredential(facebookProvider.credential(accessToken))
}

export function updateUser (user) {
  return Promise.all([
    ref.child(`users/${user.uid}`).set(user),
    ref.child(`scores/${user.uid}`).update(user),
  ])
}

export function logout () {
  LoginManager.logOut()
  firebaseAuth.signOut()
  ref.off()
}
