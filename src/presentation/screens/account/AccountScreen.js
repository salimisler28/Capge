import { Image, View } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { launchCamera } from "react-native-image-picker";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getAccountById } from "../../../data/firebase/Firestore";
import { getCurrentUser } from "../../../data/firebase/Auth";
import { uploadProfilePhoto } from "../../../data/firebase/Storage";
import { logPlugin } from "@babel/preset-env/lib/debug";
import storage from "@react-native-firebase/storage";

export const AccountScreen = ({ navigation }) => {
  const [ppUri, setPpUri] = useState("");
  const [currentUser, setCurrentUser] = useState({});

  const [firstName, setFirstName] = useState("");
  const [updatedName, setUpdatedName] = useState("");

  useEffect(() => {
    getAccountById(getCurrentUser().uid)
      .then((data) => {
        setCurrentUser(data);
        if (data.name !== null) {
          setFirstName(data.name);
        }
      });
  }, []);

  return (
    <View style={{
      flex: 1,
      padding: 24,
    }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {
          (ppUri == "") ?
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

      <Button
        title="Update Profile Photo"
        style={{ marginHorizontal: 40, marginTop: 10 }}
        onPress={() => {
          launchCamera(null)
            .then(async (result) => {
              setPpUri(result.assets[0].uri)
              await storage()
                .ref(currentUser.id)
                .child("deneme")
                .putFile(result.assets[0].uri);
            });
        }} />

      <TextInput
        focusable={false}
        editable={false}
        value={currentUser.email}
        variant="outlined"
        label="Mail Address"
        style={{ marginTop: 60 }} />

      <TextInput
        value={updatedName}
        label="Your Name"
        onChangeText={(text) => {
          setUpdatedName(text);
        }}
        placeholder="Enter your name"
        variant="outlined"
        style={{ marginTop: 20 }} />

      <Button
        disabled={firstName === updatedName}
        title="Update Your Profile" />
    </View>
  );
};
