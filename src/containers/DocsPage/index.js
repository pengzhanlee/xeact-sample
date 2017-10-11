import React, {Component} from "react";
import {asyncConnect} from "redux-async-connect";
import {requestDoc} from 'redux/modules/common';
import {connect} from "react-redux";
import DynamicPage from 'containers/Base/DynamicPage';
import marked from 'marked';
import hljs from 'components/Base/Highlight/origin';

const docsRoot = 'docs/';

@asyncConnect([{
    deferred: false,
    promise: ({store: {dispatch}, params: {splat}}) => {
        const promises = [];
        let path = `/${docsRoot}${splat}.md`;
        promises.push(dispatch(requestDoc(path)));
        return Promise.all(promises);
    }
}])

@connect(
    state => ({
        doc: state.doc.data.content,
    }))

export default
class DocsPage extends DynamicPage {


    constructor(props) {
        super(props);

        let renderer = new marked.Renderer();
        renderer.link = ( href, title, text ) => {
            title = title || '';
            return '<a target="_blank" href="'+ href +'" title="' + title + '">' + text + '</a>';
        };

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            langPrefix:'hljs ',
            highlight: (code) => {
                return hljs.highlightAuto(code).value;
            }
        });
    }

    componentDidMount() {
        super.componentDidMount();
    }

    render() {

        let styles = require('./style.scss');
        let {doc} = this.props;

        let parsedDoc = marked(doc);

        return (
            <div className="content">
                <div className={styles.doc} ref="content">
                    <div dangerouslySetInnerHTML={{__html: parsedDoc}}/>
                </div>
            </div>
        );

    }

}
