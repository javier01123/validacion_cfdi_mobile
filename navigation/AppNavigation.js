import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import PermissionsScreen from "../screens/PermissionsScreen";
import { navigationRef } from "./RootNavigation";
import ScanScreen from "../screens/ScanScreen";

const Stack = createStackNavigator();

const AppNavigator = ({ navigation }) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Scanner">
        <Stack.Screen name="Permissions" component={PermissionsScreen} />    
        <Stack.Screen name="Scanner" component={ScanScreen} />       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
