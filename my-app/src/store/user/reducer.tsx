import { UserState, UserActionTypes, SET_AUTHENTICATED } from './types';

const initialState: UserState = {
    username: "",
    email: "",
    isAuthenticated: false,
}

export const userReducer = (state = initialState, action: UserActionTypes) => {
    switch(action.type){
        case SET_AUTHENTICATED:
            return state;
        default:
            return state;
    }
}