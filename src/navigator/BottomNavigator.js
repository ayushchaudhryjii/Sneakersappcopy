import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import SneakPeakScreen from '../screens/SneakPeakScreen'
import ProfileScreen from '../screens/ProfileScreen'
import PortfolioScreen from '../screens/PortfolioScreen'



const Tab = createBottomTabNavigator();


const BottomNavigator = () => {
  return (
   <NavigationContainer>
    <Tab.Navigator>
    <Tab.Screen component={HomeScreen} name="HomeScreen"/>
    <Tab.Screen component={SneakPeakScreen} name="SneakPeakScreen"/>
    <Tab.Screen component={PortfolioScreen} name="PortfolioScreen"/>
    <Tab.Screen component={ProfileScreen} name="ProfileScreen"/>
    </Tab.Navigator>

   </NavigationContainer>
  )
}

export default BottomNavigator