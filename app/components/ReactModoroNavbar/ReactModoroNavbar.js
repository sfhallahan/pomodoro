import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Platform } from 'react-native'
import NavigationBar from 'react-native-navbar'
import { colors } from '../../styles'
ReactModoroNavbar.propTypes = {
  title: PropTypes.string.isRequired,
  rightButton: PropTypes.element,
  leftButton: PropTypes.element,
}

export default function ReactModoroNavbar (props) {
  // NavigationBar left and right buttons cannot be listed as attributes with a value of
  // null, so this is the workaround
  let optionalAttributes = {}
  props.leftButton && (optionalAttributes.leftButton = React.cloneElement(props.leftButton,{
    styles: {marginLeft: 10, justifyContent: 'center'}
  }))
  props.rightButton && (optionalAttributes.rightButton = React.cloneElement(props.rightButton,{
    styles: {marginRight: 10, justifyContent: 'center'}
  }))
  return (
    <NavigationBar
      {...optionalAttributes}
      style={Platform.OS === 'android' ? { marginTop: 8, marginBottom: 8} : null}
      tintColor={colors.tabPrimary}
      title={{title: props.title}} />
  )
}
