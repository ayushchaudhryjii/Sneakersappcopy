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
              ? require('../images/layout3.png')
              : require('../images/layout.png')
          } else if (route.name === 'PortfolioScreen') {
            iconSource = focused
              ? require('../images/shoe3.png')
              : require('../images/shoe.png')
          } else if (route.name === 'ProfileScreen') {
            iconSource = focused
              ? require('../images/234.png')
              : require('../images/circle.png')
          }

          return (
            <Image
              source={iconSource}
              style={{ width: 25, height: 25 }} 
            />
          );
        },
        tabBarActiveTintColor: 'black',  
        tabBarInactiveTintColor: 'gray',  
        headerTitleAlign: 'center',      // Center the title
        headerTintColor: 'white',        // Set title color to white
        headerStyle: {
          backgroundColor: 'black',      // Set background color to black
        },
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
