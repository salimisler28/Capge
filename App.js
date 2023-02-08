import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./src/presentation/navigation/StackNavigation";
import { Provider } from "react-redux";
import { persistore, store } from "./src/presentation/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import auth from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";
import { saveUser } from "./src/data/asyncstorage/User";
import { getCurrentUserDetailUseCase } from "./src/domain/AuthUseCases";

const App = () => {
  useEffect(() => {
    getCurrentUserDetailUseCase()
      .then((result) => {
        if (result != null) {
          return saveUser(result);
        } else {
          return Promise.resolve(null);
        }
      })
      .then((result) => {
        return RNBootSplash.hide();
      });
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
