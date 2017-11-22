import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Platform, TouchableOpacity, StyleSheet } from 'react-native'
import { ReactModoroNavbar, Gear, Hamburger } from '../../components'
import { colors } from '../../styles'
import Score from './Score'
import Countdown from './Countdown'
import ProgressBar from './ProgressBar'
import TimerButtons from './TimerButtons'
import SkipRest from './SkipRest'

Home.propTypes = {
  openDrawer: PropTypes.func,
  navigation: PropTypes.object.isRequired,
  timer: PropTypes.string.isRequired,
  rest: PropTypes.string.isRequired,
  activeCountdown: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  onSkipRest: PropTypes.func.isRequired,
  onToggleCountdown: PropTypes.func.isRequired,
  countdownRunning: PropTypes.bool.isRequired,
  progress: PropTypes.number.isRequired,
}

export default function Home (props) {
  const { navigate } = props.navigation
  return (
    <View style={[styles.container, {backgroundColor: props.activeCountdown === 'timer' ? colors.blue : colors.red}]}>
      <Score count={props.score}/>
      <Countdown formattedTime={props[props.activeCountdown]} />
      <ProgressBar style={{marginLeft: 20, marginRight: 20}} progress={props.progress} />
      <View style={styles.footer}>
        {props.activeCountdown === 'timer'
          ? <TimerButtons
              countdownRunning={props.countdownRunning}
              onToggle={props.onToggleCountdown}
              onReset={props.onReset} />
          : <SkipRest onSkipRest={props.onSkipRest} />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  }
})
