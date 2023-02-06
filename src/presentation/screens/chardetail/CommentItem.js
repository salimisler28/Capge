import { Text, View } from "react-native";

export const CommentItem = ({ comment }) => {
  return (
    <View style={{ flex: 1, padding: 15, flexDirection: "column", backgroundColor: "white", margin: 15 }}>
      <Text>Email: {comment.email}</Text>
      <Text style={{ marginTop: 10 }}>{comment.body}</Text>
    </View>
  );
};
