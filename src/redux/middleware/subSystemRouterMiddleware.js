import {
    receiveSubSystem
} from "redux/modules/common";

import {LOCATION_CHANGE} from 'react-router-redux';

import {getSystemFlag} from 'utils/SubSystemUtil';

/**
 * 同步子系统标记
 * @param history
 * @returns {function({dispatch?: *, getState: *}): function(*): function(*=)}
 */
export default function subSystemRouterMiddleware(history) {

    return ({ dispatch, getState}) => next => (action) => {

        next(action);

        if(action.type === LOCATION_CHANGE) {

            let path = history.getCurrentLocation().pathname;

            try {
                const systemFlag = getSystemFlag(path);
                dispatch(receiveSubSystem(systemFlag, path));
            } catch (e) {
                dispatch(receiveSubSystem(''));
            }
        }

    }
}
