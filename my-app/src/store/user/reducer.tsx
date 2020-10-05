import { UserState, UserActionTypes, SET_AUTHENTICATED, LOGIN_SUCCESSFUL, LOGOUT } from './types';
import * as firebase from 'firebase';

const initialState: UserState = {
    username: "",
    email: "",
    UID: "",
    emailVerified: false,
    isAuthenticated: true,
}

export const userReducer = (state = initialState, action: UserActionTypes) => {
    switch(action.type){
        case SET_AUTHENTICATED:
            return state;
        case LOGIN_SUCCESSFUL:
            return { 
                ...state, 
                isAuthenticated: true, 
                email: action.payload.email,
                emailVerified: action.payload.emailVerified,
                UID: action.payload.UID
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}