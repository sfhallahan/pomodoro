import React, { PropTypes, Component } from 'react'
import { StackNavigator } from 'react-navigation'
import FooterTabsContainer from '../../containers/FooterTabs/FooterTabsContainer'
import SettingsContainer from '../../containers/Settings/SettingsContainer'

export const ReactModoroNavigator = StackNavigator({
    FooterTabs: { screen: FooterTabsContainer },
    Settings: { screen: SettingsContainer }
});
