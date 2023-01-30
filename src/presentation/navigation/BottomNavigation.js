import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavsScreen } from "../screens/favs/FavsScreen";
import { PostsScreen } from "../screens/posts/PostsScreen";

const Bottom = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (
    <Bottom.Navigator>
      <Bottom.Screen component={PostsScreen} name="Posts" options={{
        headerShown: false,
      }} />
      <Bottom.Screen component={FavsScreen} name="Favs" options={{
        headerShown: false,
      }} />
    </Bottom.Navigator>
  );
};
