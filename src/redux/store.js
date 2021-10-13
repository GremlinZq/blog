import {applyMiddleware, combineReducers, createStore} from "redux";
import middleware from 'redux-thunk';
import {reducer as formReducer } from 'redux-form';
import authReducer from "./reducers/auth-reducer";

const reducers = combineReducers({
    auth: authReducer,
    form: formReducer
})

const store = createStore(reducers, applyMiddleware(middleware));

export default store;