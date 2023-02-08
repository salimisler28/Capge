import { getPPRef, uploadProfilePhoto } from "../data/firebase/Storage";
import { getCurrentUser } from "../data/firebase/Auth";
import { setUserProfilePhotoUrl } from "../data/firebase/Firestore";

export const loadImageUseCase = (uri) => {
  const currentUserId = getCurrentUser().uid;
  const ref = getPPRef(currentUserId);

  return Promise.resolve()
    .then(() => {
      return uploadProfilePhoto(ref, uri);
    })
    .then(() => {
      return ref.getDownloadURL();
    })
    .then((result) => {
      console.log(result);
      return setUserProfilePhotoUrl(currentUserId, result);
    });
};
