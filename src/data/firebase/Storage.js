import storage from "@react-native-firebase/storage";

export const uploadProfilePhoto = (userId, fileUri) => {
  return storage()
    .ref(userId)
    .putFile(fileUri)
};
