import {applyMiddleware, combineReducers, createStore} from "redux";
import middleware from 'redux-thunk';

const reducers = combineReducers({})

const store = createStore(reducers, applyMiddleware(middleware));

export default store;