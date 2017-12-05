import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Home } from '../../components'
import { connect } from 'react-redux'
import { incrementAndHandleScore, decrementAndHandleScore } from '../../redux/modules/scores'
import BackgroundTimer from 'react-native-background-timer'
import PushNotification from 'react-native-push-notification'

function secondsToHMS(secs) {
  const hours = Math.floor(secs / 3600)
  const mins = Math.floor(secs % 3600 / 60)
  const seconds = Math.floor(secs % 3600 % 60)
  return ((hours > 0 ? hours + ":" + (mins < 10 ? "0" : "") : "") + mins + ":" + (seconds < 10 ? "0" : "") + seconds)
}

class HomeContainer extends Component {
  static propTypes = {
    openDrawer: PropTypes.func,
    navigation: PropTypes.object.isRequired,
    timerDuration: PropTypes.number.isRequired,
    restDuration: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    scoringIsActive: PropTypes.bool.isRequired,
  }
  state = {
    timer: this.props.timerDuration,
    rest: this.props.restDuration,
    activeCountdown: 'timer',
    countdownRunning: false,
  }
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({tintColor}) => <Icon size={30} name={'ios-home-outline'} color={tintColor} />
  }

  componentDidMount() {
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION', notification)
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.timerDuration !== nextProps.timerDuration) {
      this.setState({
        timer: nextProps.timerDuration,
      })
    }
    if (this.props.restDuration !== nextProps.restDuration) {
      this.setState({
        rest: nextProps.restDuration,
      })
    }

  }

  handleToggleCountdown = () => {
    if (this.state.countdownRunning === true) {
      this.setState({countdownRunning: false})
      this.calculateNegativeScoreAdjustments()
      return BackgroundTimer.clearInterval(this.interval)
    }

    this.setState({countdownRunning: true})

    this.interval = BackgroundTimer.setInterval(() => {
      const activeCountdown = this.state.activeCountdown // either timer or rest
      const nextSecond = this.state[activeCountdown] - 1

      if (nextSecond === 0) {
        if (this.state.activeCountdown === 'timer') {
            PushNotification.localNotification({
              title: "Work Period Complete",
              message: `Work period complete. Starting ${this.props.restDuration/60} minute rest period`,
            })
        } else {
           PushNotification.localNotification({
              title: "Rest Period Complete",
              message: `Rest period complete. Starting ${this.props.timerDuration/60} minute work period`,
            })
        }
        this.setState({
          [activeCountdown]: this.state.activeCountdown === 'timer' ? this.props.timerDuration : this.props.restDuration,
          activeCountdown: this.state.activeCountdown === 'timer' ? 'rest' : 'timer'
        })

        this.calculatePositiveScoreAdjustments(true)
      } else {
        this.setState({
          [activeCountdown]: nextSecond,
        })
      }

      if (nextSecond % 60 === 0) {
        this.calculatePositiveScoreAdjustments(false)
      }
    }, 1000)
  }

  handleReset = () => {
    BackgroundTimer.clearInterval(this.interval)
    this.setState({
      timer: this.props.timerDuration,
      countdownRunning: false,
    })
    this.calculateNegativeScoreAdjustments()
  }

  handleSkipRest = () => {
    this.setState({
      rest: this.props.restDuration,
      activeCountdown: 'timer'
    })
  }

  getProgress = () => {
    return this.state.activeCountdown === 'timer'
      ? 1 - (this.state.timer / this.props.timerDuration)
      : 1 - (this.state.rest / this.props.restDuration)
  }

  calculateNegativeScoreAdjustments = () => {
    const timeElapsed = this.props.timerDuration - this.state.timer
    if (!this.props.scoringIsActive || timeElapsed < 15) {
      return
    }
    this.props.dispatch(decrementAndHandleScore(5))
  }

  calculatePositiveScoreAdjustments = (isRoundComplete) => {
    if (!this.props.scoringIsActive) {
      return
    }
    if (isRoundComplete) {
      this.props.dispatch(incrementAndHandleScore(this.props.timerDuration/60))
    } else {
      const scoreMultiplier = Math.floor(this.state.timer/60/10) + 1
      this.props.dispatch(incrementAndHandleScore(scoreMultiplier * 1))
    }
  }


  render () {
    return (
      <Home
        openDrawer={this.props.openDrawer}
        navigation={this.props.navigation}
        timer={secondsToHMS(this.state.timer)}
        rest={secondsToHMS(this.state.rest)}
        activeCountdown ={this.state.activeCountdown}
        onReset={this.handleReset}
        onSkipRest={this.handleSkipRest}
        onToggleCountdown={this.handleToggleCountdown}
        countdownRunning={this.state.countdownRunning}
        progress={this.getProgress()}
        score={this.props.score}
        />
    )
  }
}

function mapStateToProps({settings, scores, authentication}) {
  return {
    timerDuration: settings.timerDuration * 60,
    restDuration: settings.restDuration * 60,
    score: scores.usersScores[authentication.authedId],
    scoringIsActive: scores.scoringIsActive,
  }
}

export default connect(
  mapStateToProps,
)(HomeContainer)


/**
  * Scoring rules:
  * 1 point/minute completed
  * Multipler for every 10 minutes consecutive (X2 for 10-20, X3 20-30)
  * Bonus points = length of the round for round completed.
  * 15 second
  */
