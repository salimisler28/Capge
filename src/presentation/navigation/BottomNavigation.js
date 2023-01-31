import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FavsScreen } from "../screens/favs/FavsScreen";
import { CharacterScreen } from "../screens/chars/CharacterScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Character, Favs } from "../constants/Screens";

const Bottom = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (<Bottom.Navigator>
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
  </Bottom.Navigator>);
};
