import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../styles'

Hamburger.propTypes = {
  size: PropTypes.number.isRequired,
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
}

Hamburger.defaultProps = {
  size: 30,
}

export default function Hamburger (props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.styles}>
      <Icon
        name='ios-menu-outline'
        size={props.size}
        color={colors.blue} />

    </TouchableOpacity>
  )
}
