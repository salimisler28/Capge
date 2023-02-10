import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BottomNavigation } from "./BottomNavigation";
import { CharDetailScreen } from "../screens/chardetail/PostsDetail";
import { LoginScreen } from "../screens/login/LoginScreen";
import { RegisterScreen } from "../screens/register/RegisterScreen";
import { Bottom, CharDetail, Login, Register } from "../constants/Screens";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export const StackNavigation = ({ isLoggedIn }) => {
  const auth = useSelector(state => state.auth);

  if (auth.isLoggedIn) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={Bottom}
          component={BottomNavigation}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name={CharDetail}
          component={CharDetailScreen}
          options={{
            headerShown: true,
          }} />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={Login}
          component={LoginScreen}
          options={{
            headerShown: false,
          }} />
        <Stack.Screen
          name={Register}
          component={RegisterScreen} />
      </Stack.Navigator>
    );
  }


  // return (
  //   <Stack.Navigator initialRouteName={
  //     auth.isLoggedIn ? Bottom : Login
  //   }>
  //     <Stack.Screen
  //       name={Login}
  //       component={LoginScreen}
  //       options={{
  //         headerShown: false,
  //       }} />
  //     <Stack.Screen
  //       name={Register}
  //       component={RegisterScreen} />
  //     <Stack.Screen
  //       name={Bottom}
  //       component={BottomNavigation}
  //       options={{
  //         headerShown: false,
  //       }} />
  //     <Stack.Screen
  //       name={CharDetail}
  //       component={CharDetailScreen}
  //       options={{
  //         headerShown: true,
  //       }} />
  //   </Stack.Navigator>
  // );
};
