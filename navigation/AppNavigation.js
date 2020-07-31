import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import PermissionsScreen from "../screens/PermissionsScreen";
import { navigationRef } from "./RootNavigation";

const Stack = createStackNavigator();

const AppNavigator = ({ navigation }) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Permissions">
        <Stack.Screen name="Permissions" component={PermissionsScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
