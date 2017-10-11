import React from 'react';
import {IndexRoute, Route, Redirect} from 'react-router';
import {
    App,
    Home,
    Template,
    DocsPage,

} from './containers';

export default (store) => {

    return (
        <Route path="/" component={App}>

            { /* 首页 */ }
            <IndexRoute component={Home}/>

            {/* docs */}
            <Route path="docs/**" component={DocsPage} />

            {/* 模板类型 examples */}

            { /* Catch all route */ }
            <Route path=":systemFlag(/**)" component={Template}  />
            <Route path="*" component={Template}  />
        </Route>
    );
};
