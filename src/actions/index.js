import { auth, provider, strorage } from "../firebase";
import db from "../firebase";
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload.user,
});

export const setUserNull = () => ({
  type: SET_USER,
  user: null,
});

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  loading: status,
});

export const getArticle = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
});

/**
 *
 * @returns Authentication for sign-in with Google with a popup with a payload as a Object.
 */
export function signInAPI() {
  return (dispatch) => {
    auth
      .signInWithPopup(provider)
      .then((payload) => {
        console.log(payload);
        dispatch(setUser(payload));
      })
      .catch((error) => alert(error.message));
  };
}

/**
 *
 * @returns Returns a new user after login is successfull.
 */
export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      console.log("Page Refreshed");
      if (user) {
        dispatch(setUser(user));
      }
    });
  };
}

/**
 *
 * @returns Sets the users to NULL after signOut.
 */
export function signOutAPI() {
  return (dispatch) => {
    console.log(auth);
    auth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

/**
 * Function to upload the image in firebase storage.
 * @param {*} payload
 * @returns
 */
export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true));
    if (payload.image != "") {
      const upload = strorage
        .ref(`images/${payload.image.name}`)
        .put(payload.image);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            user: {
              email: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            shareImg: downloadURL,
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    } else if (payload.video != "") {
      console.log("Video Upload Started");
      const upload = strorage
        .ref(`videos/${payload.video.name}`)
        .put(payload.video);
      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress : ${progress}%`);
          if (snapshot.state === "RUNNING") {
            console.log(`Progress : ${progress}%`);
          }
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await upload.snapshot.ref.getDownloadURL();
          db.collection("articles").add({
            user: {
              email: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: downloadURL,
            shareImg: "",
            comments: 0,
            description: payload.description,
          });
          dispatch(setLoading(false));
        }
      );
    }else{
      db.collection("articles").add({
        user: {
          email: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: "",
        shareImg: "",
        comments: 0,
        description: payload.description,
      });
      dispatch(setLoading(false));
    }
  };
}

export function getArticleAPI() {
  return (dispatch) => {
    let payload;

    db.collection("articles")
      .orderBy("user.date", "desc")
      .onSnapshot((snapshot) => {
        payload = snapshot.docs.map((doc) => doc.data());
        console.log(payload);
        dispatch(getArticle(payload));
      });
  };
}
