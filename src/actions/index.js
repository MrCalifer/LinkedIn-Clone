import { auth, provider } from "../firebase";
import { SET_USER } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload.user,
});

export const setUserNull = () => ({
    type: SET_USER,
    user: null,
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
      console.log(user);
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
