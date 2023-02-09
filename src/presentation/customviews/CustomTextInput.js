import { TextInput } from "react-native";
import { textInputStyle } from "../style/TextInputStyle";

export const CustomTextInput = ({ style, placeholder, onChangeText, editable = true, value = "" }) => {
  return (
    <TextInput
      style={{ ...textInputStyle.input, ...style }}
      placeholder={placeholder}
      onChangeText={onChangeText}
      editable={editable}
      value={value}
    />
  );
};

export const CustomPasswordInput = ({ style, placeholder, onChangeText }) => {
  return (
    <TextInput
      style={{ ...textInputStyle.input, ...style }}
      placeholder={placeholder == null ? "Password" : placeholder}
      onChangeText={onChangeText}
      secureTextEntry={true}
    />
  );
};
