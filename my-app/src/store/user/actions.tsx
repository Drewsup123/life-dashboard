import firebase from "firebase";
import { LOGIN_SUCCESSFUL, LOGOUT, SET_AUTHENTICATED } from "./types"

export const setAuthenticated = (toSet: boolean) => (dispatch: any) => { dispatch({ type: SET_AUTHENTICATED, payload: toSet }); }

export const logout = () => (dispatch: any) => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({ type: LOGOUT })
    }).catch(function(error) {
        // An error happened.
    });
}

export const login = (loginObject: any) => (dispatch: any) => {
    dispatch({ type: LOGIN_SUCCESSFUL, payload: loginObject })
}