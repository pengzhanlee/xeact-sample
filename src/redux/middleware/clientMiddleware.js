import {
    showModal,
    hideModal
} from "redux/modules/common";


export default function clientMiddleware(client) {



    return ({dispatch, getState}) => {
        return next => action => {

            if (typeof action === 'function') {
                return action(dispatch, getState);
            }

            const {promise, meta = {}, types, ...rest} = action; // eslint-disable-line no-redeclare
            if (!promise) {
                return next(action);
            }

            const [REQUEST, SUCCESS, FAILURE] = types;
            next({...rest, type: REQUEST});

            const {block, blockTip} = meta;

            let modalShown = false;

            // 阻塞 API
            if(block) {
                dispatch(showModal({
                    type: 'loading',
                    text: blockTip || ''
                }));
                modalShown = true;
            }

            const actionPromise = promise(client, dispatch, getState);

            actionPromise.then(
                (result) => {

                    if(modalShown){
                        dispatch(hideModal());
                    }

                    if(typeof result === 'string'){
                        next({...rest, result, meta, type: SUCCESS});
                        return;
                    }

                    next({...rest, result, meta, type: SUCCESS});
                },
                (error) => {

                    if(modalShown){
                        dispatch(hideModal());
                    }

                    if(error.message && block) {
                        dispatch(showModal({
                            type: 'error',
                            text: error.message
                        }));
                    }

                    next({...rest, error, meta, type: FAILURE});
                }
            );

            return actionPromise;
        };
    };
}
