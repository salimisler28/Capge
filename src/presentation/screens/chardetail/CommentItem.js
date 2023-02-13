import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

export const CommentItem = ({ comment }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.itemBackgroundColor }]}>
      <Text style={[styles.header, { color: colors.textColor1 }]}>Email: {comment.email}</Text>
      <Text style={[styles.content, { color: colors.textColor1 }]}>{comment.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: "column",
    margin: 15,
  },
  header: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20
  },
});
