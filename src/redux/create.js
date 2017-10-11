import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import clientMiddleware from './middleware/clientMiddleware';
import {loadingBarMiddleware} from './middleware/loadingBarMiddleware';
import subSystemRouterMiddleware from './middleware/subSystemRouterMiddleware';
import ApiClient from 'core/ApiClient';

export default function createStore(history) {
    const reduxRouterMiddleware = routerMiddleware(history);

    const middleware = [loadingBarMiddleware(), clientMiddleware(ApiClient()), subSystemRouterMiddleware(history), reduxRouterMiddleware, thunk];

    let finalCreateStore;


    if(__DEVELOPMENT__){
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        finalCreateStore = composeEnhancers(
            applyMiddleware(...middleware),
        )(_createStore);
    }else{
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }




    const reducer = require('./modules/reducer');
    const store = finalCreateStore(reducer);

    // if (module.hot) {
    //     module.hot.accept('./modules/reducer', () => {
    //         store.replaceReducer(require('./modules/reducer'));
    //     });
    // }

    return store;
}
