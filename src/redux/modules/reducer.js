import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as reduxAsyncConnect} from "redux-async-connect";
import {loadingBarReducer} from "react-redux-loading-bar";

import {
    system,
    sidebar,
    vmPage,
    vmApi,
    baseInfo,
    doc,
    modal,
    sku,
    uploadFile,
} from './common/reducer';

export default combineReducers({

    // base
    routing: routerReducer,
    reduxAsyncConnect,
    loadingBar: loadingBarReducer,

    // common
    system,
    sidebar,
    vmPage,
    vmApi,
    baseInfo,
    doc,
    modal,
    sku,
    uploadFile,
});
