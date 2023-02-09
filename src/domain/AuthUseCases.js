import {
  createAccountWithEmailAndPassword,
  firebaseLoginWithEmailAndPassword,
  getCurrentUser, signOut,
} from "../data/firebase/Auth";
import { getAccountById, saveAccount } from "../data/firebase/Firestore";
import { removeUser, saveUser } from "../data/asyncstorage/User";

export const loginUseCase = (email, password) => {
  return Promise.resolve()
    .then(() => {
      return firebaseLoginWithEmailAndPassword(email, password);
    })
    .then((result) => {
      return getAccountById(result.user.uid);
    })
    .then((result) => {
      return saveUser(result);
    });
};

export const registerUseCase = (email, password) => {
  return Promise.resolve()
    .then(() => {
      return createAccountWithEmailAndPassword(email, password);
    })
    .then((result) => {
      return saveAccount(result.user.uid, email);
    })
    .then((result) => {
      return loginUseCase(email, password);
    });
};

export const getCurrentUserDetailUseCase = () => {
  let user = getCurrentUser();
  if (user != null) {
    return getAccountById(user.uid);
  } else {
    return Promise.resolve(null);
  }
};

export const signOutUseCase = () => {
  return Promise.resolve()
    .then((r) => {
      return signOut();
    })
    .then((r) => {
      return removeUser();
    });
};
