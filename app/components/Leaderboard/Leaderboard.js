import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Platform, ActivityIndicator, ListView } from 'react-native'
import { ReactModoroNavbar, Hamburger } from '../../components'
import { colors } from '../../styles'
import  Leader from './Leader'

Leaderboard.propTypes = {
  openDrawer: PropTypes.func,
  listenerSet: PropTypes.bool.isRequired,
  renderRow: PropTypes.func.isRequired,
  dataSource: PropTypes.object.isRequired,
}

export default function Leaderboard (props) {
  return (
    <View style={styles.container}>
      <ReactModoroNavbar
        title='Leaderboard'
        leftButton={Platform.OS === 'android' ? <Hamburger onPress={props.openDrawer} /> : null} />
      {props.listenerSet === false
        ? <ActivityIndicator size='small' style={styles.activityIndicator} color={colors.secondary} />
        : <ListView renderRow={props.renderRow} dataSource={props.dataSource} />}
    </View>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginBottom: 50,
  }

})
