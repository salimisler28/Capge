import { Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from "react-native";
import { IconButton } from "@react-native-material/core";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getUser } from "../../../data/asyncstorage/User";
import { loadImageUseCase } from "../../../domain/LoadImageUseCase";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/AuthActions";
import { signOutUseCase } from "../../../domain/AuthUseCases";
import { setName } from "../../../data/firebase/Firestore";
import { useTheme } from "@react-navigation/native";
import { Size } from "../../style/Size";
import { customButtonStyle } from "../../style/CustomButton";
import { CustomButton } from "../../customviews/CustomButton";

export const AccountScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [id, setId] = useState(null);
  const [mail, setMail] = useState(null);
  const [ppUri, setPpUri] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [updatedName, setUpdatedName] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getUser()
      .then((data) => {
        console.log(JSON.stringify(data));
        setId(data.id);
        setMail(data.email);
        setPpUri(data.pp_url);
        setFirstName(data.name);
        setUpdatedName(data.name);
      });
  }, []);

  useEffect(() => {

  });

  const loadImageToFirebase = async (uri) => {
    await loadImageUseCase(uri);
  };

  const _launchCamera = async () => {
    return launchCamera(null)
      .then(async (result) => {
        if (!result.didCancel) {
          setPpUri(result.assets[0].uri);
          await loadImageUseCase(result.assets[0].uri);
        }
      });
  };

  const _launchGallery = async () => {
    return launchImageLibrary(null)
      .then(async (result) => {
        if (!result.didCancel) {
          setPpUri(result.assets[0].uri);
          await loadImageUseCase(result.assets[0].uri);
        }
      });
  };

  return (
    <ScrollView style={{
      flex: 1,
      paddingHorizontal: 24,
    }}>
      <View style={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: Size.maxMarginTop,
      }}>
        {
          (ppUri == null) ?
            (
              <Icon name="person" size={150} style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                borderWidth: 1,
                marginTop: 10,
              }} />
            ) :
            (
              <Image
                source={{ uri: ppUri }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  borderWidth: 1,
                  justifyContent: "center",
                }} />
            )
        }
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
        <IconButton
          icon={props => <Icon name="camera" style={{ color: "red" }} {...props} />}
          style={{ backgroundColor: colors.itemBackgroundColor }}
          onPress={async () => {
            await _launchCamera();
          }}
        />
        <IconButton
          icon={props => <Icon name="image" style={{ color: "red" }} {...props} />}
          style={{ backgroundColor: colors.itemBackgroundColor }}
          onPress={async () => {
            await _launchGallery();
          }}
        />
      </View>

      <Text
        style={{
          marginTop: Size.highMarginTop,
          color: colors.textColor1,
        }}>Email Address</Text>

      <TextInput
        editable={false}
        value={mail}
        style={[styles.input, {
          backgroundColor: colors.itemBackgroundColor,
          color: colors.textColor1,
          marginTop: Size.normalMarginTop,
        }]} />

      <Text
        style={{
          marginTop: Size.highMarginTop,
          color: colors.textColor1,
        }}>Name</Text>

      <TextInput
        value={updatedName}
        onChangeText={(text) => {
          setUpdatedName(text);
        }}
        placeholder="Enter your name"
        style={[styles.input, {
          backgroundColor: colors.itemBackgroundColor,
          color: colors.textColor1,
          marginTop: Size.normalMarginTop,
        }]} />

      <CustomButton
        title="Update Your Name"
        style={{
          marginTop: Size.highMarginTop,
          backgroundColor: (firstName === updatedName) ? "gray" : "green",
        }}
        onPress={() => {
          if (firstName !== updatedName) {
            setName(id, updatedName)
              .then(() => {
                setFirstName(updatedName);
              });
          } else {
            ToastAndroid.show("You should update change name", ToastAndroid.SHORT);
          }
        }} />

      <CustomButton
        title="Sign Out"
        style={{ marginTop: 60, backgroundColor: "red" }}
        onPress={async () => {
          signOutUseCase()
            .then(r => {
              dispatch(LOGOUT());
            });
        }} />

      {/*<Button*/}
      {/*  disabled={firstName === updatedName}*/}
      {/*  style={{ marginTop: Size.highMarginTop }}*/}
      {/*  title="Update Your Name"*/}
      {/*  onPress={async () => {*/}
      {/*    await setName(id, updatedName);*/}
      {/*  }} />*/}

      {/*<Button*/}
      {/*  style={{ backgroundColor: "red", marginTop: 60 }}*/}
      {/*  title="Sign Out"*/}
      {/*  onPress={() => {*/}

      {/*  }}*/}
      {/*/>*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderRadius: 12,
  },
});
