import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import ReduxThunk from 'redux-thunk';
import { BUILD } from "../config/constants";
import boatRampsData from './reducers/boad-ramps-reducer';

export default function createReduxStore() {
    let reduxState = combineReducers({
        rootReducer: combineReducers({
            boatRampsData
        })
    }),
        middleWare = applyMiddleware(ReduxThunk);
    return createStore(reduxState, BUILD === "dev" && window.devToolsExtension ?
        compose(middleWare, window.devToolsExtension()) : middleWare);
}