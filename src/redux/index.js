import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import { BUILD } from "../config/constants";
import boadRamps from './reducers/boad-ramps-reducer';

export default function createReduxStore() {
    let reduxState = combineReducers({
        rootReducer: combineReducers({
            boadRamps
        })
    }),
        middleWare = applyMiddleware(ReduxThunk);
    return createStore(reduxState, BUILD === "dev" && window.devToolsExtension ?
        compose(middleWare, window.devToolsExtension()) : middleWare);
}