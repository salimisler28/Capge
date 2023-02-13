import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

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
  const { colors } = useTheme();

  let char = props.char;
  let isFav = props.isFav;
  const onPress = () => props.onClick(char);
  const onFavClick = () => props.onFavClick(char);
  const isFavVisible = props.isFavVisible;

  return (
    <TouchableOpacity onPress={onPress} style={{ margin: 10 }}>
      <View style={[styles.container, { backgroundColor: colors.itemBackgroundColor }]}>
        <Image
          source={{ uri: char.image }}
          style={[styles.image, {}]}
        />

        <View style={[styles.rightSide, {}]}>
          <View style={[styles.header]}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                flex: 1,
                color: colors.textColor1,
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {char.name}
            </Text>

            {isFavVisible ?
              <IconButton
                icon={props => <Icon
                  name={isFav ? "favorite" : "favorite-border"}
                  style={{ color: "red" }} {...props} />}
                onPress={onFavClick}
              /> : ""}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{
              width: 10,
              aspectRatio: 1,
              backgroundColor: getColor(char.status),
              borderRadius: 12,
            }} />
            <Text style={{
              marginStart: 8,
              color: colors.textColor1,
            }}>{char.status}</Text>
          </View>

          <Text
            style={{
              fontWeight: "bold",
              opacity: 0.66,
              marginTop: 8,
              color: colors.textColor2,
            }} numberOfLines={1} ellipsizeMode="tail">
            Last known location:
          </Text>
          <Text style={{ color: colors.textColor1, fontWeight: "bold" }}>{char.location.name}</Text>

          <Text
            style={{
              fontWeight: "bold",
              opacity: 0.66,
              marginTop: 8,
              color: colors.textColor2,
            }}
            numberOfLines={1}
            ellipsizeMode="tail">First seen in:
          </Text>
          <Text style={{
            fontWeight: "bold",
            color: colors.textColor1,
          }}>{char.origin.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 175,
    aspectRatio: 1,
  },
  rightSide: {
    flexDirection: "column",
    flex: 1,
    marginStart: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
