import React, {Component, PropTypes} from 'react';
import {
    hideModal
} from "redux/modules/common";
import {connect} from 'react-redux';


@connect(
    state => ({
    }))
export default
class ModalEasyTip extends Component {

    static LOADING = 'loading';
    static ERROR = 'error';
    static SUCCESS = 'success';

    static propTypes = {
        type: PropTypes.oneOf(['loading', 'error', 'success', 'image', 'element', '']),
        text: PropTypes.string,
        image: PropTypes.element,
        element: PropTypes.element,
        show: PropTypes.bool.isRequired,
    };

    static defaultProps = {
    };

    constructor(props) {
        super(props);
        this.tryCloseOnModal = this.tryCloseOnModal.bind(this);
    }

    tryCloseOnModal() {
        const {type, text, show, dispatch} = this.props;
        if(type !== 'loading') {
            dispatch(hideModal());
        }
    }

    render() {

        const styles = require('./style.scss');
        const {type, text, show, image, element} = this.props;

        if(!show){
            return null;
        }

        return (
            <div className={`${styles.modal} ${styles.mask} ${show ? styles.show : styles.dismiss}`} onClick={this.tryCloseOnModal}>
                <div className={`${styles.modalMain}`}>
                    {type === 'loading' &&
                    <div className={`${styles.icon} ${styles.loading} ${!text ? styles.loadingOnly : ''}`}>
                        <div className={`sk-child sk-double-bounce1`}></div>
                        <div className={`sk-child sk-double-bounce2`}></div>
                    </div>
                    }
                    {type === 'error' &&
                    <div className={`${styles.icon} ${styles.error}`}></div>
                    }
                    {type === 'success' &&
                    <div className={`${styles.icon} ${styles.success}`}></div>
                    }
                    {type === 'image' && image &&
                    <div className={`${styles.image}`}>
                        {image}
                    </div>
                    }
                    {type === 'element' &&
                    element
                    }
                    {type === ''}
                    {text &&
                    <p>{text}</p>
                    }
                </div>
            </div>
        )
    }

}
