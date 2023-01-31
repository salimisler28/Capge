import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialIcons";

const getColor = (status) => {
  switch (status) {
    case "Alive":
      return "green";
    case "Dead":
      return "red";
    default:
      return "yellow";
  }
};

export const CharItem = (props) => {
  let char = props.char;
  let isFav = props.isFav;
  const onPress = () => props.onClick(char);
  const onFavClick = () => props.onFavClick(char);
  const isFavVisible = props.isFavVisible;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{ flexDirection: "row", backgroundColor: "white", margin: 10, borderRadius: 12, overflow: "hidden" }}>
        <Image
          source={{ uri: char.image }}
          style={{ width: 150, aspectRatio: 1 }}
        />

        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10, flex: 1 }}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
              {char.name}
            </Text>

            {isFavVisible ?
              <IconButton
                icon={props => <Icon name={isFav ? "favorite" : "favorite-border"} {...props} />}
                onPress={onFavClick}
              />
              :
              ""}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{
              width: 10,
              aspectRatio: 1,
              backgroundColor: getColor(char.status), borderRadius: 12, marginStart: 10,
            }} />
            <Text style={{ marginStart: 8 }}>{char.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
