export interface UserState {
    username: string;
    email: string;
    isAuthenticated: boolean;
}

export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

interface setAuthenticated {
    type: typeof SET_AUTHENTICATED;
    payload: boolean;
}

export type UserActionTypes = setAuthenticated;