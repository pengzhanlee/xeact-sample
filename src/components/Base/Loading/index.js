import React, {Component} from "react";
import PropTypes from 'prop-types';
import ReactWebComponent from "../../../core/WebComponentParser";

/**
 * Loading Wave
 * @class
 *
 */
@ReactWebComponent('loading')
export default
class Loading extends Component {

    static propTypes = {
        className: PropTypes.string
    };

    static defaultProps = {
        className: ''
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {

        // this.forceUpdate();
    }

    componentWillUnmount() {
    }

    render() {

        require('./style.scss');
        const {className} = this.props;
        return (
            <div className={`sk-wave-wrapper ${className ? className : ''}`}>
                <div className="sk-wave">
                    <div className="sk-rect sk-rect1" />
                    <div className="sk-rect sk-rect2" />
                    <div className="sk-rect sk-rect3" />
                    <div className="sk-rect sk-rect4" />
                    <div className="sk-rect sk-rect5" />
                </div>
            </div>
        )
    }

}
