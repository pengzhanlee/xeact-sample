import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {logout} from 'utils/JdUtil';
import {connect} from "react-redux";
import {
    toggleSidebar
} from "redux/modules/common";

@connect(
    state => ({
        system: state.system
    }))

export default class HeaderNav extends Component {

    static propTypes = {
        menuList: PropTypes.array,
        userInfo: PropTypes.object
    };

    componentDidMount() {

    }

    constructor(props) {
        super(props);
    }


    render() {
        const styles = require('./style.scss');
        let {userInfo, menuList, system = {}} = this.props;

        let rootMenuEl = menuList.map((menu, index) => {
            const url = menu.url;
            return <li key={index} className={ (system.flag && url.startsWith(`/${system.flag}`)) ? 'active' : ''}>
                <Link {...navItemProps} to={url}>{menu.name}</Link>
            </li>;
        });

        let navItemProps = {
            activeClassName: "active"
        };

        return <nav className="navbar navbar-static-top">
            <span className="sidebar-toggle"  data-intro='点击可收起 / 展开侧边栏' style={{
                cursor: 'pointer'
            }} onClick={(e) => {
                this.props.dispatch(toggleSidebar());
            }}>
                <span className="sr-only">Toggle navigation</span>
            </span>

            <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                <ul className="nav navbar-nav">
                    {rootMenuEl}
                </ul>
            </div>
            <div className="pull-right hidden-xs">
                <ul className="nav navbar-nav">
                    <li className={`${styles.authInfo}`}>
                        <span className={`hidden-xs ${styles.userName}`}>
                            {userInfo.userName}
                            <span className={`${styles.sep}`}>|</span>
                            <em className="fa fa-fw fa-user" />
                            <span className={styles.userLogout} onClick={() => {
                                logout();
                            }}> 退出</span>
                        </span>
                    </li>
                </ul>
            </div>
        </nav>
    }
}
