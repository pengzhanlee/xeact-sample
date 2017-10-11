import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

import modules from './modules';


const composeEnhancers = process.browser ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

export default function configureStore(initialState) {
  const store = createStore(modules, initialState, composeEnhancers(applyMiddleware()));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}