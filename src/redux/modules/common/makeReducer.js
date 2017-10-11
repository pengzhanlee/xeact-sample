export const initialState = {
    loaded: false,
    loading: false,
    data: {
        // 兼容老分页接口
        pageQuery: {},

        page: {}
    }
};

/**
 * 创建简单Reducer
 * @param fetchAction
 * @param successAction
 * @param failAction
 * @param {=} clearAction
 * @returns {Function}
 */
export function makeBasicReducer(fetchAction, successAction, failAction, clearAction) {

    return function (state = initialState, action = {}) {
        switch (action.type) {
            case fetchAction:
                return {
                    ...state,
                    loading: true
                };
            case successAction:
                return {
                    ...state,
                    loading: false,
                    loaded: true,
                    data: action.result,
                    error: null
                };
            case failAction:
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    data: {},
                    error: action.error
                };

            case clearAction:
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    data: {},
                    error: null
                };
            default:
                return state;
        }
    }
}


/**
 * 创建简单Reducer
 * @param keys
 * @param fetchAction
 * @param successAction
 * @param failAction
 * @param {=} clearAction
 * @returns {Function}
 *
 * @example
 * makeExtensibleReducer([{
        key: 'topicList',
        type: Array
    }], ...);
 */
export function makeExtensibleReducer(keys = [], fetchAction, successAction, failAction, clearAction) {

    return function (state = initialState, action = {}) {
        switch (action.type) {
            case fetchAction:
                return {
                    ...state,
                    loading: true
                };
            case successAction:

                let data = action.result;
                keys.forEach((item) => {
                    let key = item.key,
                        keyType = item.type;

                    if (keyType === Array) {
                        let toBeExtend = state.data[key] || [];
                        if (data[key]) {
                            data[key] = toBeExtend.concat(data[key]);
                        }
                    } else if (keyType === Object) {
                        let toBeExtend = state.data[key] || {};
                        if (data[key]) {
                            for(let i in toBeExtend){
                                if(toBeExtend.hasOwnProperty(i)){
                                    data[key][i] = toBeExtend[i];
                                }
                            }
                        }
                    }

                });

                return {
                    ...state,
                    loading: false,
                    loaded: true,
                    data: data,
                    error: null
                };
            case failAction:
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    data: {},
                    error: action.error
                };

            case clearAction:
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    data: initialState.data,
                    error: null
                };
            default:
                return state;
        }
    }
}