import { TOGGLE_SIDEBAR } from "./types"

export const toggleSideBar = (shouldOpen: boolean) => (dispatch: any) => {
    dispatch({ type: TOGGLE_SIDEBAR, payload: shouldOpen });
}