import { Image, Text, TextInput, ToastAndroid, TouchableOpacity, View, StyleSheet } from "react-native";
import { Button } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../../validation/Validators";
import { loginUseCase } from "../../../domain/AuthUseCases";

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
      loginUseCase(email, password)
        .then(() => {
          setLoginLoading(false);
          setLoginSuccess(true);
        })
        .catch((error) => {
          setErrorMessage(error);
          setLoginSuccess(false);
          setLoginLoading(false);
        });
    } else {
      setLoginLoading(false);
      setErrorMessage("Validation failed");
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: "white", justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200, marginBottom: 50 }}
          source={require("../../../../assets/splash.png")} />
      </View>

      <Text style={{ fontSize: 22 }}>Login</Text>

      <TextInput
        style={[styles.input, {}]}
        placeholder="Email"
        onChangeText={(text) => {
          setMailValue(text);
        }}
      />

      <TextInput
        style={[styles.input, {}]}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => {
          setPasswordValue(text);
        }} />

      <Button
        title="Login"
        disabled={loginLoading}
        style={{ height: 56, justifyContent: "center", borderRadius: 12, marginTop: 20 }}
        onPress={() => {
          login(mailValue, passwordValue);
        }} />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text>Not registered yet.</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}>
          <Text style={{ marginStart: 5, fontWeight: "bold" }}>Click here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#eeeeee",
    borderRadius: 15,
  },
});
