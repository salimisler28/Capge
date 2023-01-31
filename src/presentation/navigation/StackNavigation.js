import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BottomNavigation } from "./BottomNavigation";
import { PostsDetail } from "../screens/chardetail/PostsDetail";
import { LoginScreen } from "../screens/login/LoginScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { Bottom, CharDetail, Login, Register } from "../constants/Screens";

const Stack = createStackNavigator();

export const StackNavigation = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName={
      isLoggedIn ? Bottom : Login
    }>
      <Stack.Screen
        name={Login}
        component={LoginScreen}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen
        name={Register}
        component={RegisterScreen} />
      <Stack.Screen
        name={Bottom}
        component={BottomNavigation}
        options={{
          headerShown: false,
        }} />
      <Stack.Screen
        name={CharDetail}
        component={PostsDetail}
        options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  );
};
