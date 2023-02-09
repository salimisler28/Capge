import { customButtonStyle } from "../style/CustomButton";
import { Text, TouchableOpacity } from "react-native";

export const CustomButton = ({ style, title, onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={{ ...customButtonStyle.buttonContainer, ...style }}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[customButtonStyle.buttonText]}>{title}</Text>
    </TouchableOpacity>
  );
};
