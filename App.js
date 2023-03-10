import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigation } from "./src/presentation/navigation/StackNavigation";
import { Provider, useDispatch, useSelector } from "react-redux";
import { persistore, store } from "./src/presentation/redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import auth from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";
import { saveUser } from "./src/data/asyncstorage/User";
import { getCurrentUserDetailUseCase } from "./src/domain/AuthUseCases";
import { useColorScheme } from "react-native";
import { darkTheme } from "@react-native-material/core";
import { lightTheme } from "./src/presentation/style/Themes";

const App = () => {
  const theme = useColorScheme();

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
        <NavigationContainer theme={theme == "dark" ? darkTheme : lightTheme}>
          <StackNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
