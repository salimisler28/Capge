import { FlatList, Text, View } from "react-native";
import { CharItem } from "../chars/CharItem";
import { useEffect, useState } from "react";
import { getCommentsById } from "../../../data/network/CharacterApi";
import { CommentItem } from "./CommentItem";

export const CharDetailScreen = ({ navigation, route }) => {
  const { char } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  useEffect(() => {
    navigation.setOptions({ title: char.name });
    setItems([{ "type": "header", "item": char }, { "type": "loading" }]);

    getCommentsById(char.id)
      .then((res) => {
        if (res.data.length != 0) {
          console.log(res.data);
          const list = res.data.map((item) => {
            return { "type": "comment", "item": item };
          });
          setItems([{ "type": "header", "item": char }, ...list]);
        } else {
          setItems([{ "type": "header", "item": char }, { "type": "no_comment" }]);
        }
      });
  }, []);

  const Dynamic = ({ item }) => {
    switch (item.type) {
      case "header":
        return <CharItem char={item.item} isFavVisible={false} onClick={() => {
        }} />;
      case "comment":
        return <CommentItem comment={item.item} />;
      case "loading":
        return <Text>Loading</Text>;
      default:
        return <Text>No Comment</Text>;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return <Dynamic item={item} />;
        }} />
    </View>
  );
};
