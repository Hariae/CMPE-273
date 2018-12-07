import { combineReducers } from 'redux';
import  LoginReducer from './reducer';
import SignupReducer from './SignupReducer';
import { reducer as formReducer } from "redux-form";
import ProfileReducer from './ProfileReducer';
import ListPropertyReducer from './ListPropertyReducer';
import HomeReducer from './HomeReducer';

const rootReducer = combineReducers({
    login: LoginReducer,
    signup: SignupReducer,
    profile: ProfileReducer,
    listProperty: ListPropertyReducer,
    home: HomeReducer,
    form: formReducer
});

export default rootReducer;