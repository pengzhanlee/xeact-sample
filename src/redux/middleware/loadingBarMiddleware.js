import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function loadingBarMiddleware(config = {}) {
    return ({ dispatch }) => next => (action) => {
        if (action.type) {
            if (/BEGIN_GLOBAL_LOAD/.test(action.type)) {
                dispatch(showLoading());

            } else if (/END_GLOBAL_LOAD/.test(action.type)) {
                dispatch(hideLoading());
            }
        }

        return next(action);
    }
}