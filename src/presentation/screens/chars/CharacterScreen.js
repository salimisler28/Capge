import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getCharsByPageNumber } from "../../../data/network/CharacterApi";
import { CharItem } from "./CharItem";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FAV, REMOVE_FAV } from "../../redux/FavsActions";
import { CharDetail } from "../../constants/Screens";
import { useTheme } from "@react-navigation/native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const newPageLoadingComponent = () => {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Text style={{ color: colors.textColor1 }}>Loading</Text>
    </View>
  );
};

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export const CharacterScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const favs = useSelector(state => state.favs);

  const [mainLoading, setMainLoading] = useState(false);
  const [newPageLoading, setNewPageLoading] = useState(false);
  const [chars, setChars] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      setMainLoading(true);
    } else {
      setNewPageLoading(true);
    }

    getCharsByPageNumber(page)
      .then((response) => {
        if (page === 1) {
          setChars(response.data.results);
          setTotalPage(response.data.info.pages);
          setMainLoading(false);
        } else {
          const newList2 = [...chars, ...response.data.results];
          setChars(newList2);
          setNewPageLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: colors.background }}
        data={mainLoading ? [1, 1, 1, 1, 1, 1, 1, 1, 1] : chars}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        renderItem={({ item }) => {
          if (mainLoading) {
            return <View style={{ flex: 1, flexDirection: "row" }}>
              <ShimmerPlaceHolder
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 12,
                  margin: 15,
                }}
                shimmerColors={[colors.background, colors.itemBackgroundColor, colors.textColor1]}
              />
              <ShimmerPlaceHolder
                style={{
                  height: 20,
                  borderRadius: 12,
                  margin: 15,
                }}
                shimmerColors={[colors.background, colors.itemBackgroundColor, colors.textColor1]}
              />
            </View>;
          } else {
            return <CharItem
              char={item}
              isFavVisible={true}
              isFav={favs.favs.some(fav => fav.id === item.id)}
              onClick={(char) => {
                navigation.navigate(CharDetail, { char: char });
              }}
              onFavClick={(char) => {
                const isFav = favs.favs.some(item => item.id === char.id);
                if (!isFav) dispatch(ADD_FAV(char));
                else dispatch(REMOVE_FAV(char.id));
              }}
            />;
          }
        }}
        ListFooterComponent={() => {
          if (newPageLoading) {
            return newPageLoadingComponent();
          }
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!mainLoading && !newPageLoading && page < totalPage) {
            setPage(page + 1);
          }
        }}
      />
    </View>
  );
};
