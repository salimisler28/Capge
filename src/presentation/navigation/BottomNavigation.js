import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavsScreen } from "../screens/favs/FavsScreen";
import { PostsScreen } from "../screens/posts/PostsScreen";
import Icon from "react-native-vector-icons/MaterialIcons";

const Bottom = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (<Bottom.Navigator>
    <Bottom.Screen
      component={PostsScreen}
      name="Characters"
      options={{
        headerShown: false,
        tabBarIcon: (props => <Icon name="home" {...props} />),
      }}
    />
    <Bottom.Screen
      component={FavsScreen}
      name="Favorites"
      options={{
        headerShown: false,
        tabBarIcon: (props => <Icon name="favorite" {...props} />)
      }} />
  </Bottom.Navigator>);
};
