import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'
import { colors } from '../../styles'

Countdown.propTypes = {
  formattedTime: PropTypes.string.isRequired,
}

export default function Countdown (props) {
  return (
      <Text style={styles.textContainer}>
        {props.formattedTime}
      </Text>
  )
}
const styles = StyleSheet.create({
  textContainer: {
    color: colors.white,
    fontSize: 80,
    textAlign: 'center',
    margin: 30,
    marginTop: 50,
    fontWeight: '100',
  }
})
