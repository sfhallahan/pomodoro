import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, Image, ListView } from 'react-native'
import { colors, fontSizes } from '../../styles'

Leader.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

export default function Leader (props) {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image style={styles.image} source={{uri: props.avatar}} />
        <Text style={styles.nameText}>{props.name}</Text>
      </View>
      <Text style={styles.scoreText}>Score: {props.score}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  nameText: {
    padding: 10,
    fontSize: fontSizes.secondary,
    color: colors.primary,
  },
  scoreText: {
    color: colors.secondary,
  },
})
