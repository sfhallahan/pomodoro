import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text } from 'react-native'
import DrawerHeader from './DrawerHeader'
import DrawerTab from './DrawerTab'

Drawer.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
}

export default function Drawer (props) {
  return (
      <View style={styles.container}>
        <DrawerHeader />
        <DrawerTab
          title='Home'
          selected={props.activeFooterTab === 'home'}
          onPress={() => {
            props.onTabSelect('home')
            props.close()
            }}
          icon='ios-home-outline'/>
          <DrawerTab
            title='Leaderboard'
            selected={props.activeFooterTab === 'leaderboard'}
            onPress={() => {
              props.onTabSelect('leaderboard')
              props.close()
            }}
            icon='ios-trophy-outline'/>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
