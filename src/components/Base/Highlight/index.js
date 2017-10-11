import React, {Component, PropTypes} from 'react';
import hljs from 'components/Base/Highlight/origin';

export default
class Highlight extends Component {

    static propTypes = {
        lang: PropTypes.string,
        code: PropTypes.string
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        hljs.highlightBlock(this.refs.pre);
    }

    componentDidUpdate() {

    }

    componentWillMount() {
    }

    componentWillUnmount() {

    }


    render() {

        let {lang, code} = this.props;
        return <pre ref="pre">
            <code className={lang}>{code}</code>
        </pre>
    }

}

