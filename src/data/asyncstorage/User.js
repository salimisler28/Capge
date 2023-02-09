import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_USER = "key_user";

export const saveUser = (user) => {
  return AsyncStorage.setItem(KEY_USER, JSON.stringify(user));
};

export const getUser = () => {
  return AsyncStorage.getItem(KEY_USER)
    .then((result) => {
      return JSON.parse(result);
    });
};

export const removeUser = () => {
  return AsyncStorage.removeItem(KEY_USER);
};
