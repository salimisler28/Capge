import storage from "@react-native-firebase/storage";

export const getPPRef = (userId) => {
  return storage()
    .ref(userId)
    .child("pp");
};

export const uploadProfilePhoto = (ref, fileUri) => {
  return ref
    .putFile(fileUri);
};
