import { Image, View } from "react-native";
import { Button } from "@react-native-material/core";
import { CustomTextInput } from "../../customviews/CustomTextInput";
import { launchCamera } from "react-native-image-picker";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { getUser } from "../../../data/asyncstorage/User";
import { loadImageUseCase } from "../../../domain/LoadImageUseCase";
import { signOut } from "../../../data/firebase/Auth";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/AuthActions";

export const AccountScreen = ({ navigation }) => {
  const [id, setId] = useState(null);
  const [mail, setMail] = useState(null);
  const [ppUri, setPpUri] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [updatedName, setUpdatedName] = useState(null);

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

  const loadImageToFirebase = async (uri) => {
    await loadImageUseCase(uri);
  };

  return (
    <View style={{
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
              setPpUri(result.assets[0].uri);
              await loadImageToFirebase(result.assets[0].uri);
            });
        }} />

      <CustomTextInput
        editable={false}
        value={mail}
        variant="outlined"
        style={{ marginTop: 60 }} />

      <CustomTextInput
        value={updatedName}
        onChangeText={(text) => {
          setUpdatedName(text);
        }}
        placeholder="Enter your name"
        style={{ marginTop: 20 }} />

      <Button
        disabled={firstName === updatedName}
        title="Update Your Profile" />

      <Button
        style={{ backgroundColor: "red", marginTop: 60 }}
        title="Sign Out"
        onPress={() => {
          signOut()
            .then(r => {
              dispatch(LOGOUT());
            });
        }}
      />
    </View>
  );
};
