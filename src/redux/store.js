import {applyMiddleware, combineReducers, createStore} from "redux";
import middleware from 'redux-thunk';
import authReducer from "./reducers/auth-reducer";
import articleReducer from "./reducers/article-reducer";
import appReducer from "./reducers/app-reducer";

const reducers = combineReducers({
    auth: authReducer,
    articles: articleReducer,
    app: appReducer,
})

const store = createStore(reducers, applyMiddleware(middleware));

export default store;