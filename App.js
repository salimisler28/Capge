import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./src/presentation/navigation/StackNavigation";
import { Provider, useSelector } from "react-redux";
import { persistore, store } from "./src/presentation/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import auth from "@react-native-firebase/auth";

const App = () => {
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
