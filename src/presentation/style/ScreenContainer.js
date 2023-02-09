import { StyleSheet } from "react-native";
import { Size } from "./Size";

export const screenContainer = StyleSheet.create({
  container: {
    flex: 1,
    padding: Size.screenCustomPadding,
    backgroundColor: "white",
  },
});
