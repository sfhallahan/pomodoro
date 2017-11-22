import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Splash } from '../../components'
import { GoogleSignin } from 'react-native-google-signin'
import { handleFacebookAuthWithFirebase, handleGoogleAuthWithFirebase } from '../../redux/modules/authentication'


class SplashContainer extends Component {

  componentDidMount() {
    GoogleSignin.hasPlayServices({ autoResolve: true})
    GoogleSignin.configure({offlineAccess: false})
  }


  handleFacebookLoginFinished = (error, result) => {
    if (error) {
      console.warn('Error in handleLoginFinished')
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      this.props.dispatch(handleFacebookAuthWithFirebase())
    }
  }

  handleGoogleLogin = () => {
    GoogleSignin.configure()
    GoogleSignin.signIn()
      .then((result) => console.log(result))
      .catch((error) => console.log(error))
      .done()
      //this.props.dispatch(handleGoogleAuthWithFirebase())
  }

  render () {
    return (
      <Splash
        onFacebookLoginFinished={this.handleFacebookLoginFinished}
        onGoogleLogin={this.handleGoogleLogin} />
    )
  }
}

export default connect()(SplashContainer)
