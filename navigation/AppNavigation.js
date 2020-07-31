import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import { navigationRef } from "./RootNavigation";
import ValidadorScreen from "../screens/ValidadorScreen";

const Stack = createStackNavigator();

const AppNavigator = ({ navigation }) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={ValidadorScreen} />                   
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
