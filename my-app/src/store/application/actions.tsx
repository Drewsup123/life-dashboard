import { TOGGLE_SIDEBAR } from "./types"

export const toggleSideBar = () => (dispatch: any) => {
    dispatch({ type: TOGGLE_SIDEBAR });
}