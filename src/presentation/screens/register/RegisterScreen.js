import { TextInput, ToastAndroid, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../../validation/Validators";
import { registerUseCase } from "../../../domain/AuthUseCases";
import { textInputStyle } from "../../style/TextInputStyle";

export const RegisterScreen = ({ navigation }) => {
  const [mailValue, setMailValue] = useState("");
  const [passValue, setPassValue] = useState("");

  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (errorMessage != null) {
      ToastAndroid.show(errorMessage.toString(), ToastAndroid.SHORT);
      setErrorMessage(null);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (registerSuccess == true) {
      navigation.navigate("Bottom");
      setRegisterSuccess(null);
    }
  }, [registerSuccess]);

  const register = (mail, password) => {
    setRegisterLoading(true);

    if (emailValidator(mailValue) && passwordValidator(passValue)) {
      registerUseCase(mail, password)
        .then((response) => {
          setRegisterSuccess(true);
          setRegisterLoading(false);
        })
        .catch((errorMessage) => {
          console.log(errorMessage);
          setErrorMessage(errorMessage);
        });
    } else {
      setErrorMessage("Validation Error");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={[textInputStyle.input, {}]}
        placeholder="Email address"
        onChangeText={(text) => {
          setMailValue(text);
        }} />

      <TextInput
        style={[textInputStyle.input, {}]}
        placeholder="Password at least 6 char"
        onChangeText={(text) => {
          setPassValue(text);
        }} />
      <Button
        title="Register"
        onPress={() => {
          register(mailValue, passValue);
        }} />
    </View>
  );
};
