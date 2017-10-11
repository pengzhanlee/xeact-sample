import React, {Component, PropTypes} from "react";
import Loading from 'components/Base/Loading';

/**
 * mask Loading Wave
 * 要求外部容器具备 position: relative
 * @class
 *
 */
export default
class MaskLoading extends Component {
    static propTypes = {};
    static defaultProps = {};
    constructor(props) {
        super(props);
    }
    render() {
        const styles = require('./style.scss');
        return (
            <div className={styles.container}>
                <Loading className={styles.loading} />
                {/*<span className={styles.loadingBg} />*/}
            </div>
        )
    }
}