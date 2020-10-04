export interface UserState {
    username: string;
    email: string;
    isAuthenticated: boolean;
}

export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGOUT = "LOGOUT";

interface setAuthenticated {
    type: typeof SET_AUTHENTICATED;
    payload: boolean;
}

interface loginSuccess {
    type: typeof LOGIN_SUCCESSFUL;
    payload: {
        email: string;
        id: string;
    };
}

interface logout {
    type: typeof LOGOUT;
}

export type UserActionTypes = setAuthenticated | loginSuccess | logout;