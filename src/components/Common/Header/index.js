import React, {Component, PropTypes} from 'react';
import HeaderNav from 'components/Common/HeaderNav';
import {Link} from 'react-router';
import LoadingBar from 'react-redux-loading-bar';


export default
class Header extends Component {

    state = {};

    static propTypes = {
        menuList: PropTypes.array,
        userInfo: PropTypes.object
    };

    static defaultProps = {
        menuList: [],
        userInfo: {}
    };

    componentDidMount() {

    }

    constructor(props) {
        super(props);
    }


    render() {

        const style = require('./style.scss');

        return <header className="main-header">
            <LoadingBar className={style.loadingBar}/>
            <HeaderNav
                menuList={this.props.menuList}
                userInfo={this.props.userInfo}
            />
        </header>;
    }
}
