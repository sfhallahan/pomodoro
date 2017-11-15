import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Splash } from '../../components'
import { handleAuthWithFirebase } from '../../redux/modules/authentication'


class SplashContainer extends Component {

  handleLoginFinished = (error, result) => {
    if (error) {
      console.warn('Error in handleLoginFinished')
    } else if (result.isCancelled === true) {
      console.log('Auth cancelled')
    } else {
      this.props.dispatch(handleAuthWithFirebase())
    }
  }

  render () {
    return (
      <Splash
        onLoginFinished={this.handleLoginFinished} />
    )
  }
}

export default connect()(SplashContainer)
