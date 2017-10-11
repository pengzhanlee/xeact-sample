import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from "react-redux";
import {getSystemFlag} from 'utils/SubSystemUtil';
import {isDevEnv} from 'utils/CommonUtil';

const devMenuList = [{
    name: 'dev',
    childList: [{
        name: '开发文档',
        header: true,

        // dev
        dev: true,

        childList: [{
            name: '快速上手',
            url: '/docs/README',
            icon: 'plug'
        }, {
            name: '自定义标签',
            icon: 'leaf',
            includes: '/docs/tags',
            childList: [{
                name: '概念',
                url: '/docs/tags/intro'
            },{
                name: '可绑定数据源的自定义标签',
                url: '/docs/tags/dataSourceBind'
            }, {
                name: 'Pager 分页',
                url: '/docs/tags/pager'
            }, {
                name: 'ImageUploader 图片上传',
                url: '/docs/tags/imageUploader'
            }, {
                name: 'FileUploader 文件上传',
                url: '/docs/tags/fileUploader'
            }, {
                name: 'Chart 数据图形',
                url: '/docs/tags/chart'
            }, {
                name: 'DataGrid 数据表格',
                url: '/docs/tags/dataGrid'
            }, {
                name: 'DataTable 数据表格',
                url: '/docs/tags/dataTable'
            }, {
                name: 'DataBoard 数据面板',
                url: '/docs/tags/dataBoard'
            }, {
                name: 'RangePicker',
                url: '/docs/tags/rangePicker'
            }, {
                name: 'Exception',
                url: '/docs/tags/exception'
            }]
        }, {
            name: '三方库',
            icon: 'github',
            includes: '/docs/third-party',
            childList: [{
                name: '表单校验',
                url: '/docs/third-party/validation'
            },{
                name: '时间处理',
                url: '/docs/third-party/moment'
            },{
                name: '数字处理',
                url: '/docs/third-party/numbro'
            }]
        }, {
            name: '参考',
            icon: 'external-link',
            childList: [{
                name: 'Bootstrap',
                url: 'http://getbootstrap.com/css/',
                external: true
            }, {
                name: '布局规则',
                url: 'http://getbootstrap.com/css/#grid',
                external: true
            }, {
                name: 'Bootstrap 组件',
                url: 'http://getbootstrap.com/components/',
                external: true
            }, {
                name: 'AdminLTE',
                url: 'http://almsaeedstudio.com/themes/AdminLTE/index2.html',
                external: true
            }, {
                name: '图标 FontAwesome',
                url: 'http://fontawesome.io/icons/',
                external: true
            }]
        }]
    }]
}];

@connect(
    (state) => ({
        system: state.system,
        pageLoaded: state.vmPage.loaded,
    })
)
export default
class SidebarNav extends Component {

    static propTypes = {
        menuList: PropTypes.array
    };

    static defaultProps = {
        menuList: []
    };

    constructor(props) {
        super(props);
    }


    updateActiveLink() {
        let {system: {path}} = this.props;
        if(path) {
            let {$} = window;
            let $menu = $(this.refs.menu);
            // let $selectedLink = $menu.find(`a[href="${path}"]`);

            let $allLink = $menu.find('a');
            let $selectedLink;
            $allLink.each((index, link) => {
                let $link = $(link);
                let href = $link.attr('href');
                if(path.startsWith(href)){
                    $selectedLink = $link;
                }
            });

            $menu.find(`li`).removeClass('active');
            if($selectedLink && $selectedLink.size()) {
                $selectedLink.parent().addClass('active');
                $selectedLink.parents('.treeview-menu').each((index, tree) => {
                    $(tree).parent().addClass('active');
                });
            }
        }
    }

    componentDidMount() {
        this.updateActiveLink();
    }

    componentDidUpdate(prevProps){

        // console.log('componentDidUpdate', prevProps.pageLoaded, '->', this.props.pageLoaded, prevProps.menuList.length, '->', this.props.menuList.length);
        if(
            (!prevProps.pageLoaded && this.props.pageLoaded)
            ||
            (this.props.menuList.length > prevProps.menuList.length)
        ) {
            this.updateActiveLink();
        }
    }

    render() {
        let {menuList, system = {}} = this.props;
        let subMenuIcon = <i className="fa fa-circle-o"/>;

        let index = 0;
        let productSubMenus = (menu, level = 1) => {
            ++index;
            let subMenu = menu.childList;
            if (subMenu && subMenu.length) {
                ++level;
                return <li key={`li-${index}`}>
                    <Link to={subMenu.url}>
                        {menu.icon &&
                        <em className={`fa fa-${menu.icon}`}/>
                        }
                        <span>{menu.name}</span>
                        <span className="pull-right-container">
                            <i className="fa fa-angle-left pull-right"/>
                        </span>
                    </Link>
                    <ul key={`ul-${index}`} className="treeview-menu">

                        {subMenu.map((menu) => {
                            return productSubMenus(menu, level);
                        })}
                    </ul>
                </li>;
            }

            return <li key={index}>
                <Link to={menu.url} target={`${menu.external ? '_blank' : ''}`}>
                    {menu.icon &&
                    <em className={`fa fa-${menu.icon}`}/>
                    }
                    {!menu.icon && level > 1 &&
                    subMenuIcon
                    }
                    <span>{menu.name}</span>
                </Link>
            </li>;
        };

        let productMenu = (menu) => {
            let systemRootMenus = menu.childList;
            if (systemRootMenus && systemRootMenus.length) {
                systemRootMenus.forEach((systemRootMenu, index) => {
                    if (systemRootMenu.header) {
                        menuEl.push(<li key={`header-${menu.name}-${index}`}
                                        className="header">{systemRootMenu.name}</li>);
                        if (systemRootMenu.childList && systemRootMenu.childList.length) {
                            systemRootMenu.childList.forEach((subMenu) => {
                                menuEl.push(productSubMenus(subMenu));
                            });
                        }
                    } else {
                        menuEl.push(productSubMenus(systemRootMenu));
                    }
                });
            }
        };

        let menuEl = [];
        menuList.forEach((menu, index) => {
            let menuInSystem = getSystemFlag(menu.url);
            if ((system.flag === menuInSystem)) {
                productMenu(menu);
            }
        });

        if(isDevEnv()) {
            devMenuList.forEach((menu, index) => {
                productMenu(menu);
            });
        }

        return <aside className="main-sidebar">
            <section className="sidebar">
                <ul className="sidebar-menu" ref="menu">
                    {menuEl}
                </ul>
            </section>
        </aside>
    }
}
