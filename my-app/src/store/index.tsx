import { combineReducers } from 'redux';
import { userReducer } from './user/reducer';
import { applicationReducer } from './application/reducer';

const rootReducer = combineReducers({
    User: userReducer,
    Application: applicationReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;