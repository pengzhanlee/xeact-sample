import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import {Provider} from 'react-redux';
import {Router, applyRouterMiddleware, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {ReduxAsyncConnect} from 'redux-async-connect';
import {useScroll} from 'react-router-scroll';
import {AppContainer} from 'react-hot-loader';
import getRoutes from './routes';
import {configure} from 'core/WebComponentParser';

const dest = document.getElementById('root');
const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

configure({
    store,
    dispatch: store.dispatch
});

const component = (
    <Router render={(props) =>
        <ReduxAsyncConnect {...props}
                           filter={item => !item.deferred}
                           render={applyRouterMiddleware(useScroll())}/>
    } history={history}>
        {getRoutes(store)}
    </Router>
);

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            {component}
        </Provider>
    </AppContainer>
    ,
    dest
);

// if (module.hot) {
//     module.hot.accept();
// }
//

if (module.hot) {
    module.hot.accept('./routes', () => {

        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    {component}
                </Provider>
            </AppContainer>
            ,
            dest
        );
    })
}

export default store;

// if (module.hot) module.hot.accept('./', () => {
//
//     ReactDOM.render(
//         <AppContainer>
//         <Provider store={store} key="provider">
//             {component}
//         </Provider>
//         </AppContainer>,
//         dest
//     );
// });