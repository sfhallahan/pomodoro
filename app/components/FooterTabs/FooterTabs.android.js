import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Text, DrawerLayoutAndroid } from 'react-native'
import { HomeContainer, LeaderboardContainer } from '../../containers'
import Drawer from './Drawer'

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
}

export default function FooterTabs (props) {
  const closeDrawer = () => this.drawer.closeDrawer()
  const openDrawer = () => this.drawer.openDrawer()
  return (
    <DrawerLayoutAndroid
      ref={(drawer) => this.drawer = drawer}
      drawerWidth={290}
      renderNavigationView={() => (
        <Drawer
          activeFooterTab={props.activeFooterTab}
          onTabSelect={props.onTabSelect}
          close={closeDrawer} />
      )}>
      {props.activeFooterTab === 'home'
        ? <HomeContainer openDrawer={openDrawer} navigation={props.navigation}/>
        : <LeaderboardContainer openDrawer={openDrawer} />}
    </DrawerLayoutAndroid>
  )
}
const styles = StyleSheet.create({
})
