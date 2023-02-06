import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./src/presentation/navigation/StackNavigation";
import { Provider, useSelector } from "react-redux";
import { persistore, store } from "./src/presentation/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import auth from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";

const App = () => {
  useEffect(() => {
    RNBootSplash.hide(); // fade with 220ms default duration
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistore}>
        <NavigationContainer>
          <StackNavigation isLoggedIn={auth().currentUser != null} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
