import React, { PropTypes, Component } from 'react'
import { TabNavigator } from 'react-navigation'
import SettingsContainer from '../../containers/Settings/SettingsContainer'
import HomeContainer from '../../containers/Home/HomeContainer'
import LeaderboardContainer from '../../containers/Leaderboard/LeaderboardContainer'
import { colors } from '../../styles'

const routeConfiguration = {
  Leaderboard: { screen: LeaderboardContainer },
  Home: { screen: HomeContainer },
  Settings: { screen: SettingsContainer },
}

const tabBarConfiguration = {
  tabBarOptions: {
    activeTintColor: colors.blue,
    inactiveTintColor: colors.primary,
    showIcon: true,
    showLabel: true,
    upperCaseLabel: false,
    indicatorStyle: {
      backgroundColor: colors.blue,
    },
    tabStyle: {
      height: 60,
    },
    labelStyle: {
      marginTop: 2,
    },
    iconStyle: {
      marginTop: 10,
    },
    style: {
      backgroundColor: colors.white,
    }
  },
  animationEnabled: true,
  tabBarPosition: 'bottom',
  initialRouteName: 'Home',
  swipeEnabled: true,
}

export const TabBarNavigator = TabNavigator(routeConfiguration, tabBarConfiguration);
