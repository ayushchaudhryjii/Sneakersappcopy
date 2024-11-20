import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import OnBoardScreen from "../screens/OnBoardScreen";
import BottomNavigator from "./BottomNavigator";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import WishListScreen from "../screens/WishListScreen";
import Buying from "../screens/Buying";
// import WishlistScreen from "../screens/WishlistScreen";

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={SplashScreen}
          name="SplashScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={OnBoardScreen}
          name="OnBoardScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={BottomNavigator}
          name="HomeScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ProductDetailScreen}
          name="ProductDetailScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WishListScreen"
          component={WishListScreen}
        />
        <Stack.Screen
          name="Buying"
          component={Buying}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
