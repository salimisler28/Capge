import firestore from "@react-native-firebase/firestore";

export const saveAccount = (uid, email) => {
  return firestore()
    .collection("users")
    .doc(uid)
    .set({
      id: uid,
      email: email,
    });
};

export const getAccountById = (userId) => {
  return firestore()
    .collection("users")
    .doc(userId)
    .get()
    .then((result) => {
      return result.data();
    });
};

export const setUserProfilePhotoUrl = (userId, url) => {
  return firestore()
    .collection("users")
    .doc(userId)
    .update({
      pp_url: url,
    });
};

export const setName = (userId, name) => {
  return firestore()
    .collection("users")
    .doc(userId)
    .update({
      name: name,
    });
};
