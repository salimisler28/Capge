import { Image, ScrollView, View } from "react-native";
import { Button, TextInput } from "@react-native-material/core";
import { launchCamera } from "react-native-image-picker";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getUser } from "../../../data/asyncstorage/User";
import { loadImageUseCase } from "../../../domain/LoadImageUseCase";
import { signOut } from "../../../data/firebase/Auth";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/AuthActions";
import { signOutUseCase } from "../../../domain/AuthUseCases";
import { setName } from "../../../data/firebase/Firestore";

export const AccountScreen = ({ navigation }) => {
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

  return (
    <ScrollView style={{
      flex: 1,
      padding: 24,
    }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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

      <Button
        title="Update Profile Photo"
        style={{ marginHorizontal: 40, marginTop: 10 }}
        onPress={() => {
          launchCamera(null)
            .then(async (result) => {
              if (!result.didCancel) {
                setPpUri(result.assets[0].uri);
                await loadImageToFirebase(result.assets[0].uri);
              }
            });
        }} />

      <TextInput
        editable={false}
        value={mail}
        label="Email Address"
        variant="outlined"
        style={{ marginTop: 60 }} />

      <TextInput
        value={updatedName}
        onChangeText={(text) => {
          setUpdatedName(text);
        }}
        label="Name"
        variant="outlined"
        placeholder="Enter your name"
        style={{ marginTop: 20 }} />

      <Button
        disabled={firstName === updatedName}
        title="Update Your Name"
        onPress={async () => {
          await setName(id, updatedName);
        }} />

      <Button
        style={{ backgroundColor: "red", marginTop: 60 }}
        title="Sign Out"
        onPress={() => {
          signOutUseCase()
            .then(r => {
              dispatch(LOGOUT());
            });
        }}
      />
    </ScrollView>
  );
};
