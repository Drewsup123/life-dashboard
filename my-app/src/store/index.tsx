import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { applicationReducer } from './application/reducer';

const rootReducer = combineReducers({
    userReducer,
    applicationReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;