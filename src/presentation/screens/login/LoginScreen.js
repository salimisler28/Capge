import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { firebaseLoginWithEmailAndPassword } from "../../firebase/Auth";
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../../validation/Validators";

export const LoginScreen = ({ navigation }) => {
  const [mailValue, setMailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (errorMessage != null) {
      ToastAndroid.show(errorMessage.toString(), ToastAndroid.SHORT);
      setErrorMessage(null);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (loginSuccess === true) {
      navigation.navigate("Bottom");
    }
  }, [loginSuccess]);

  const login = (email, password) => {
    setLoginLoading(true);

    if (emailValidator(mailValue) && passwordValidator(passwordValue)) {
      firebaseLoginWithEmailAndPassword(email, password)
        .then(() => {
          console.log("succ");
          setLoginLoading(false);
          setLoginSuccess(true);
        })
        .catch((error) => {
          setErrorMessage(error);
          setLoginSuccess(false);
          setLoginLoading(false);
        });
    } else {
      setErrorMessage("Validation failed");
    }
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 22 }}>Welcome!</Text>
      <TextInput style={{ padding: 15 }} placeholder="Email" onChangeText={(text) => {
        setMailValue(text);
      }} />
      <TextInput style={{ padding: 15 }} placeholder="Password" onChangeText={(text) => {
        setPasswordValue(text);
      }} />
      <Button title="Login" disabled={loginLoading} onPress={() => {
        login(mailValue, passwordValue);
      }} />
      <TouchableOpacity onPress={() => {
        navigation.navigate("Register");
      }}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
