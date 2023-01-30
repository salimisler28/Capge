import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CharItem } from "../posts/CharItem";
import React from "react";

export const FavsScreen = ({ navigation }) => {
  const favs = useSelector(state => state.favs);

  console.log(favs);

  return (
    <View style={{ flex: 1 }}>
      <Text>deneme</Text>
      <FlatList
        data={favs.favs}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          return <CharItem
            char={item}
            isFavVisible={false}
            isFav={true}
            onFavClick={(char) => {

            }}
            onClick={(char) => {
              navigation.navigate("PostDetail", { char: char });
            }}
          />;
        }} />
    </View>
  );
};
