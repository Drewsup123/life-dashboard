import { SET_AUTHENTICATED } from "./types"

export const setAuthenticated = (toSet: boolean) => (dispatch: any) => { dispatch({ type: SET_AUTHENTICATED, payload: toSet }); }