import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BottomNavigation } from "./BottomNavigation";
import { PostsDetail } from "../screens/postdetail/PostsDetail";

const Stack = createStackNavigator();

export const StackNavigation = ({ isLoggedIn }) => {
  return (
    <Stack.Navigator initialRouteName={
      isLoggedIn ? "Bottom" : "PostDetail"
    }>
      <Stack.Screen
        name="Bottom"
        component={BottomNavigation}
        options={{
          headerShown: false,
        }} />

      <Stack.Screen
        name="PostDetail"
        component={PostsDetail}
        options={{
          headerShown: false,
        }} />
    </Stack.Navigator>
  );
};
