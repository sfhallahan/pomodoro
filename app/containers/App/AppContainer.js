import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ReactModoroNavigator, SplashContainer } from '../../containers'
import { PreSplash, FlashNotification } from '../../components'
import { firebaseAuth } from '../../config/constants'
import { onAuthChange } from '../../redux/modules/authentication'
import { hideFlashNotification } from '../../redux/modules/flashNotification'

console.disableYellowBox = true

class AppContainer extends Component {

  static propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    flashNotificaitonIsPermanent: PropTypes.bool.isRequired,
    flashNotificationLocation: PropTypes.string.isRequired,
    flashNotificationText: PropTypes.string.isRequired,
    showFlashNotification: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged((user) => this.props.dispatch(onAuthChange(user)))
  }

  handleHideNotification = () => {
    this.props.dispatch(hideFlashNotification())
  }

  render () {
    return (
      <View style={{flex:1}}>
        {this.props.isAuthenticating === true
          ? <PreSplash />
          : this.props.isAuthed === true
            ? <ReactModoroNavigator />
            : <SplashContainer /> }
        {this.props.showFlashNotification === true
          ? <FlashNotification
              permanent={this.props.flashNotificaitonIsPermanent}
              location={this.props.flashNotificationLocation}
              text={this.props.flashNotificationText}
              onHideNotification={this.handleHideNotification} />
          : null}
      </View>
    )
  }
}

function mapStateToProps({authentication, flashNotification}) {
  return {
    isAuthenticating: authentication.isAuthenticating,
    isAuthed: authentication.isAuthed,
    flashNotificaitonIsPermanent: flashNotification.permanent,
    flashNotificationLocation: flashNotification.location,
    flashNotificationText: flashNotification.text,
    showFlashNotification: flashNotification.showFlashNotification,
  }
}

export default connect(
  mapStateToProps,
)(AppContainer)
