import { Image, ScrollView, Text, TextInput, ToastAndroid, View } from "react-native";
import { Button } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { emailValidator, passwordRepeatValidator, passwordValidator } from "../../validation/Validators";
import { registerUseCase } from "../../../domain/AuthUseCases";
import { textInputStyle } from "../../style/TextInputStyle";
import { screenContainer } from "../../style/ScreenContainer";
import { Size } from "../../style/Size";
import { CustomButton } from "../../customviews/CustomButton";
import { CustomPasswordInput, CustomTextInput } from "../../customviews/CustomTextInput";
import { useDispatch } from "react-redux";
import { LOGIN } from "../../redux/AuthActions";

export const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [mailValue, setMailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [passRepeatValue, setPassRepeatValue] = useState("");

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
      setRegisterSuccess(null);
    }
  }, [registerSuccess]);

  const register = (mail, password, passRepeat) => {
    setRegisterLoading(true);

    const emailValidationResult = emailValidator(mailValue);
    const passwordValidationResult = passwordValidator(passValue);
    const passwordRepeatValidationResult = passwordRepeatValidator(passValue, passRepeatValue);

    if (!emailValidationResult.result) {
      setErrorMessage(emailValidationResult.message);
      setRegisterLoading(false);
      return;
    }

    if (!passwordValidationResult.result) {
      setErrorMessage(passwordValidationResult.message);
      setRegisterLoading(false);
      return;
    }

    if (!passwordRepeatValidationResult.result) {
      setErrorMessage(passwordRepeatValidationResult.message);
      setRegisterLoading(false);
      return;
    }

    registerUseCase(mail, password)
      .then((response) => {
        console.log("deneme");
        setRegisterLoading(false);
        setRegisterSuccess(true);
        dispatch(LOGIN());
      })
      .catch((errorMessage) => {
        console.log(errorMessage);
        setRegisterLoading(false);
        setErrorMessage(errorMessage);
      });
  };

  return (
    <ScrollView style={[screenContainer.container]}>

      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../../../assets/splash.png")} />
      </View>

      <Text
        style={{
          marginTop: Size.maxMarginTop,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 22,
        }}
      >
        Register
      </Text>

      <CustomTextInput
        style={{ marginTop: Size.highMarginTop }}
        placeholder="Email address"
        onChangeText={(text) => {
          setMailValue(text);
        }}
      />

      <CustomPasswordInput
        style={{ marginTop: Size.normalMarginTop }}
        placeholder="Password at least 6 char"
        onChangeText={(text) => {
          setPassValue(text);
        }}
      />

      <CustomPasswordInput
        style={{ marginTop: Size.normalMarginTop }}
        placeholder="Repeat Your Password"
        onChangeText={(text) => {
          setPassRepeatValue(text);
        }}
      />

      <CustomButton
        style={{ marginTop: Size.highMarginTop }}
        title="Register"
        disabled={registerLoading}
        onPress={() => {
          register(mailValue, passValue, passRepeatValue);
        }}
      />
    </ScrollView>
  );
};
