export interface ApplicationState {
    sideBarOpen: boolean;
}

export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";

interface setAuthenticated {
    type: typeof TOGGLE_SIDEBAR;
    payload: boolean;
}

export type ApplicationTypes = setAuthenticated;