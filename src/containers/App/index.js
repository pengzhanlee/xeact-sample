import React, {Component} from "react";
import {connect} from "react-redux";
import {asyncConnect} from "redux-async-connect";
import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
import Exception from 'components/Base/Exception';
import Loading from 'components/Base/Loading';
import SidebarNav from 'components/Common/SidebarNav';
import ModalEasyTip from 'components/Base/ModalEasyTip';
import {push} from 'react-router-redux';
import 'styles/main.scss';
import {
    hideModal,
    requestBaseinfo,
    querySidebar
} from "redux/modules/common";
import {isDevEnv} from 'utils/CommonUtil';

const skins = ['blue'];

@asyncConnect([{
    deferred: isDevEnv(),
    promise: ({store: {dispatch, getState}}) => {
        const promises = [];

        let {baseInfo: {loaded: baseInfoLoaded}} = getState();
        if (!baseInfoLoaded) {
            // promises.push(dispatch(requestBaseinfo()));
        }

        promises.push(dispatch(querySidebar()));
        return Promise.all(promises);
    }
}])

@connect(
    state => ({
        modal: state.modal,
        baseInfo: state.baseInfo.data,
        baseInfoLoading: state.baseInfo.loading,
        baseInfoLoaded: state.baseInfo.loaded,
        baseInfoError: state.baseInfo.error,


        sidebar: state.sidebar
    }))

export default
class App extends Component {

    constructor(props) {
        super(props);
    }


    getBody({title, content}) {
        return <div>
            {title &&
            <section className="content-header">
                <h1>{title}</h1>
            </section>
            }
            <section className="content">
                {content}
            </section>
        </div>
    }

    render() {
        const {modal = {}, baseInfo = {}, baseInfoLoading, baseInfoLoaded, baseInfoError = {}, location: {pathname}} = this.props;
        let {menuTree} = baseInfo;
        let content;

        if (baseInfoLoading) {
            // baseInfo loading

            content = this.getBody({
                content: <Loading />
            });
        } else if (baseInfoLoaded) {
            // baseInfo loaded success

            const hasPermission = menuTree && menuTree.length;
            if (hasPermission) {
                content = this.props.children;
                // this.showIntro();
            } else {
                content = this.getBody({
                    content: <Exception type={'error'} tip={'抱歉，您暂未拥有对任何系统功能的访问权限，请联系管理员'}/>
                });
            }
        } else {
            // baseInfo loaded fail

            let {message: baseInfoErrorMsg} = baseInfoError;
            let errorTip = baseInfoErrorMsg || '用户校验失败，请稍后再试';

            // fail /api/index
            content = this.getBody({
                content: <Exception type={'error'} tip={errorTip}/>
            });
        }

        if (isDevEnv()) {
            content = this.props.children;
        }


        let showSidebar = this.props.sidebar.show;

        return (
            <div id="root-body" className={`sidebar-mini ${showSidebar ? '' : 'sidebar-collapse'}`}>
                <div className="wrapper skin-fresh">

                    <Header menuList={menuTree} userInfo={{
                        userName: baseInfo.userName
                    }}/>

                    <SidebarNav menuList={menuTree}/>

                    <div className="content-wrapper">
                        {content}
                    </div>

                    <Footer/>

                    <ModalEasyTip {...modal.data} show={modal.show || false}/>
                </div>
            </div>
        );
    }

}
