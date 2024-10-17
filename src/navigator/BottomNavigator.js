import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SneakPeakScreen from '../screens/SneakPeakScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PortfolioScreen from '../screens/PortfolioScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          if (route.name === 'HomeScreen') {
            iconSource = focused
              ? require('../images/home_tab.png')  
              : require('../images/home.png')       
          } else if (route.name === 'SneakPeakScreen') {
            iconSource = focused
              ? require('../images/layout_tab.png')
              : require('../images/layout.png')
          } else if (route.name === 'PortfolioScreen') {
            iconSource = focused
              ? require('../images/shoe_tab.png')
              : require('../images/shoe.png')
          } else if (route.name === 'ProfileScreen') {
            iconSource = focused
              ? require('../images/circle_tab.png')
              : require('../images/circle.png')
          }

          return (
            <Image
              source={iconSource}
              style={{ width: 24, height: 24 }} 
            />
          );
        },
        tabBarActiveTintColor: 'black',  
        tabBarInactiveTintColor: 'gray',  
      })}
    >

      <Tab.Screen 
        component={HomeScreen} 
        name="HomeScreen" 
        options={{ tabBarLabel: 'Home' }} 
      />
      <Tab.Screen 
        component={SneakPeakScreen} 
        name="SneakPeakScreen" 
        options={{ tabBarLabel: 'Sneakpeak' }} 
      />
      <Tab.Screen 
        component={PortfolioScreen} 
        name="PortfolioScreen" 
        options={{ tabBarLabel: 'Portfolio' }} 
      />
      <Tab.Screen 
        component={ProfileScreen} 
        name="ProfileScreen" 
        options={{ tabBarLabel: 'Profile' }} 
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
