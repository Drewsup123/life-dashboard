import { ApplicationState, ApplicationTypes , TOGGLE_SIDEBAR } from './types';

const initialState: ApplicationState = {
    sideBarOpen: false,
}

export const applicationReducer = (state = initialState, action: ApplicationTypes) => {
    switch(action.type){
        case TOGGLE_SIDEBAR:
            return { ...state, sideBarOpen: action.payload };
        default:
            return state;
    }
}