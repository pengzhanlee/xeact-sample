import React, {Component} from "react";
import ReactDOM from 'react-dom';
import {asyncConnect} from "redux-async-connect";
import {requestVmPage, requestApi} from 'redux/modules/common';
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import DynamicPage from 'containers/Base/DynamicPage';
import DynamicComponenentParser from 'core/DynamicComponentParser';
import Exception from 'components/Base/Exception';
import {matchUrl, matchApiUrl} from 'utils/CommonUtil';
import registerHandlebarHelpers from './handlebars-helpers';
import numbro from 'numbro';

import {
    showModal,
    hideModal
} from "redux/modules/common";


@asyncConnect([{
    deferred: false,
    promise: ({store: {dispatch, getState}, params: {systemFlag, splat}, location: {query}}) => {

        const promises = [];
        promises.push(dispatch(requestVmPage(systemFlag, splat, query)));
        return Promise.all(promises);
    }
}])

@connect(
    state => ({
        pageContent: state.vmPage.data.content,
        pageId: state.vmPage.data.pageId,
        pageLoaded: state.vmPage.loaded,
        pageLoadError: state.vmPage.error,

    }))

export default
class Template extends DynamicPage {

    state = {
    };

    constructor(props) {
        super(props);

        this.handlePageLoad = this.handlePageLoad.bind(this);
    }

    handlePageLoad() {
        let {dispatch, pageContent} = this.props;
        let {$} = window;
        this.contentEl = this.refs.content;

        // this.contentEl.innerHTML = pageContent;
        $(this.contentEl).html(pageContent);

    }

    componentDidMount() {
        super.componentDidMount();

        let {pageLoaded} = this.props;

        if (pageLoaded) {
            this.handlePageLoad();
        }
    }

    componentWillUpdate() {

    }

    componentDidUpdate(prevProps) {
        let {pageId: prevPageId, pageLoaded: prevPageLoaded} = prevProps;
        let {pageId, pageLoaded} = this.props;

        if (pageLoaded && !prevPageLoaded) {
            this.handlePageLoad();
        }
    }

    render() {
        let {pageLoaded, pageLoadError, pageContent} = this.props;

        let {} = this.state;

        let contentEl;

        if (!pageLoadError) {
            {
                contentEl = <div ref="content" />;
            }
        } else {
            contentEl = <Exception type={'error'} tip={'加载失败'} />;
        }
        return (
            <div>
                {contentEl}
            </div>
        );

    }

}
