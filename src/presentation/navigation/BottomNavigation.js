import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavsScreen } from "../screens/favs/FavsScreen";
import { CharacterScreen } from "../screens/chars/CharacterScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Account, Character, Favs } from "../constants/Screens";
import { AccountScreen } from "../screens/account/AccountScreen";

const Bottom = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (<Bottom.Navigator screenOptions={{
    tabBarInactiveTintColor: "white",
    tabBarActiveTintColor: "green",
    tabBarActiveBackgroundColor: "black",
    tabBarInactiveBackgroundColor: "black",
  }}>
    <Bottom.Screen
      component={CharacterScreen}
      name={Character}
      options={{
        headerShown: false,
        tabBarIcon: (props => <Icon name="home" {...props} />),
      }}
    />
    <Bottom.Screen
      component={FavsScreen}
      name={Favs}
      options={{
        headerShown: false,
        tabBarIcon: (props => <Icon name="favorite" {...props} />),
      }} />
    <Bottom.Screen
      component={AccountScreen}
      name={Account}
      options={{
        headerShown: false,
        tabBarIcon: (props => <Icon name="person" {...props} />),
      }} />
  </Bottom.Navigator>);
};

//
// let iconName;
// let iconColor;
//
// if (route.name === Character) {
//   iconName = "home";
//   iconColor = focused ? "green" : "gray";
// } else if (route.name === Favs) {
//   iconName = "favorite";
//   iconColor = focused ? "green" : "gray";
// } else if (route.name === Account) {
//   iconName = "person";
//   iconColor = focused ? "green" : "gray";
// }
//
// return (
//   <Icon
//     name={iconName}
//     style={{ color: iconColor, width: 43, aspectRatio: 1 }} />
// );
