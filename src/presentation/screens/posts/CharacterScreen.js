import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getCharsByPageNumber } from "../../../data/network/CharacterApi";
import { CharItem } from "./CharItem";
import { useDispatch, useSelector } from "react-redux";
import { ADD_FAV, REMOVE_FAV } from "../../redux/FavsActions";
import { CharDetail } from "../../constants/Screens";

const newPageLoadingComponent = () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Text>Loading</Text>
    </View>
  );
};

export const CharacterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favs = useSelector(state => state.favs);

  const [mainLoading, setMainLoading] = useState(false);
  const [newPageLoading, setNewPageLoading] = useState(false);
  const [chars, setChars] = useState([]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log(favs);
  }, [favs]);

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

  if (mainLoading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={chars}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
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
          }}
          ListFooterComponent={newPageLoading ? newPageLoadingComponent : ""}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!mainLoading && !newPageLoading) {
              setPage(page + 1);
            }
          }}
        />
      </View>
    );
  }
};
