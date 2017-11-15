import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Settings } from '../../components'
import { handleUnauth } from '../../redux/modules/authentication'
import { showFlashNotification } from '../../redux/modules/flashNotification'
import { handleAndUpdateTimer, handleAndUpdateRest } from '../../redux/modules/settings'

class SettingsContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
  }
  state = {
    timerDuration: this.props.timerDuration,
    restDuration: this.props.restDuration,
  }

  handleTimerChange = (timerDuration) => {
    this.setState({timerDuration})
  }

  handleRestChange = (restDuration) => {
    this.setState({restDuration})
  }

  handleTimerComplete = () => {
    this.props.dispatch(handleAndUpdateTimer(this.state.timerDuration))
      .then(() => this.props.dispatch(showFlashNotification({text: 'Duration saved!'})))
      .catch(() => this.props.dispatch(showFlashNotification({text: 'Error updating timer duration'})))
  }

  handleRestComplete = () => {
    this.props.dispatch(handleAndUpdateRest(this.state.restDuration))
      .then(() => this.props.dispatch(showFlashNotification({text: 'Duration saved!'})))
      .catch(() => this.props.dispatch(showFlashNotification({text: 'Error updating rest duration'})))
  }

  handleLogout = () => {
    this.props.dispatch(handleUnauth())
  }

  render () {
    return (
      <Settings
        onTimerChange={this.handleTimerChange}
        onRestChange={this.handleRestChange}
        onTimerComplete={this.handleTimerComplete}
        onRestComplete={this.handleRestComplete}
        onLogout={this.handleLogout}
        timerDuration={this.state.timerDuration}
        restDuration={this.state.restDuration} />
    )
  }
}

function mapStateToProps({settings}) {
  return {
    timerDuration: settings.timerDuration,
    restDuration: settings.restDuration,
  }
}


export default connect(
  mapStateToProps,
)(SettingsContainer)
