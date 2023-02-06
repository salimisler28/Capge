import auth from "@react-native-firebase/auth";

export const firebaseLoginWithEmailAndPassword = (email, password) => {
  return auth()
    .signInWithEmailAndPassword(email, password);
};

export const createAccountWithEmailAndPassword = (email, password) => {
  return auth()
    .createUserWithEmailAndPassword(email, password);
};

export const getCurrentUser = () => {
  return auth()
    .currentUser;
};
