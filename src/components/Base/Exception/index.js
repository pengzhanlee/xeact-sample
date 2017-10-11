import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import ReactWebComponent, {exposed, observed} from "../../../core/WebComponentParser";


/**
 * Exception (出错、空、普通提示)
 * @class
 *
 */

@ReactWebComponent('exception')
export default class Exception extends PureComponent {

    static propTypes = {
        style: PropTypes.object,

        // 异常类型
        @observed
        type: PropTypes.oneOf(['empty', 'error', 'info']).isRequired,

        // 文案
        tip: PropTypes.string
    };

    static defaultProps = {
        styles: {},
        tip: ''
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps() {
    }

    componentWillUpdate() {
    }

    componentDidUpdate() {
    }

    say() {

    }

    @exposed
    get xxx() {
        return this.counter || 0;
    }

    @exposed
    set xxx(c) {
        console.log('set xxx', c);
        return this.counter = c;
    }

    @exposed
    get zzz() {
        return 45;
    }

    // @exposed
    set zzz(z) {
        return 'yyy';
    }

    @exposed
    what() {
        console.log(this.props);
    }

    @exposed
    hi() {

    }

    render() {
        const styles = require('./style.scss');
        let {style, type, tip} = this.props;
        if (!type) return null;

        if (!tip) {
            if (type === 'empty') {
                tip = '暂时没有查询到相关内容';
            } else {
                tip = 'oops, 这里出现了一些错误';
            }
        }

        let typeImg = require(`./${type}.png`);

        return (
            <div className={`${styles.container} row`} style={style}>
                <div className="col-sm-6 col-sm-offset-3">
                    {/*<img src={typeImg} className={styles.img}/>*/}
                    <div className={styles.img} style={{
                        backgroundImage: `url(${typeImg})`
                    }}/>

                    {type === 'empty' &&
                    <div className={`text-warning ${styles.tip}`} dangerouslySetInnerHTML={{__html: tip}}/>
                    }
                    {(type === 'error' || type === 'info') &&
                    <div className={`text-danger ${styles.tip}`} dangerouslySetInnerHTML={{__html: tip}}/>
                    }
                </div>
            </div>
        )
    }
}
