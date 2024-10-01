import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "../screens/SplashScreen";
import OnBoardScreen from "../screens/OnBoardScreen";
import HomeScreen from "../screens/HomeScreen";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={SplashScreen} name="SplashScreen" options={{headerShown:false}} />
        <Stack.Screen component={OnBoardScreen} name="OnBoardScreen" options={{headerShown:false}} />
        <Stack.Screen component={HomeScreen} name="HomeScreen" options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
