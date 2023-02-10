import { Image, Text, TextInput, ToastAndroid, TouchableOpacity, View, Button, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { emailValidator, passwordValidator } from "../../validation/Validators";
import { loginUseCase } from "../../../domain/AuthUseCases";
import { textInputStyle } from "../../style/TextInputStyle";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../redux/AuthActions";
import { customButtonStyle } from "../../style/CustomButton";
import { CustomButton } from "../../customviews/CustomButton";
import { CustomPasswordInput, CustomTextInput } from "../../customviews/CustomTextInput";
import { screenContainer } from "../../style/ScreenContainer";
import { Size } from "../../style/Size";

export const LoginScreen = ({ navigation }) => {
  const [mailValue, setMailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (errorMessage != null) {
      ToastAndroid.show(errorMessage.toString(), ToastAndroid.SHORT);
      setErrorMessage(null);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (loginSuccess === true) {
      // navigation.navigate("Bottom");
    }
  }, [loginSuccess]);

  const login = (email, password) => {
    setLoginLoading(true);

    let emailValidationResult = emailValidator(mailValue);
    let passwordValidationResult = passwordValidator(passwordValue);

    if (!emailValidationResult.result) {
      setLoginLoading(false);
      setErrorMessage(emailValidationResult.message);
      return;
    }

    if (!passwordValidationResult.result) {
      setLoginLoading(false);
      setErrorMessage(passwordValidationResult.message);
      return;
    }

    loginUseCase(email, password)
      .then(() => {
        setLoginLoading(false);
        setLoginSuccess(true);
        dispatch(LOGIN());
      })
      .catch((error) => {
        setErrorMessage(error);
        setLoginSuccess(false);
        setLoginLoading(false);
      });
  };

  return (
    <ScrollView style={[screenContainer.container]}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../../../assets/splash.png")} />
      </View>

      <Text style={{
        fontSize: 22,
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: Size.maxMarginTop,
      }}>Login</Text>

      <CustomTextInput
        style={{ marginTop: Size.highMarginTop }}
        placeholder="Email"
        value={mailValue}
        onChangeText={(text) => {
          setMailValue(text);
        }}
      />

      <CustomPasswordInput
        style={{ marginTop: Size.normalMarginTop }}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPasswordValue(text);
        }} />

      <CustomButton
        style={{ marginTop: Size.highMarginTop }}
        title="Login"
        onPress={() => {
          login(mailValue, passwordValue);
        }}
        disabled={loginLoading}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text>Not registered yet.</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}>
          <Text style={{ marginStart: 5, fontWeight: "bold", color: "green" }}>Click here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
