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
