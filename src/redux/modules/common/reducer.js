import {makeBasicReducer, initialState} from './makeReducer';


export const RECEIVE_SUB_SYSTEM = '@@admin/RECEIVE_SUB_SYSTEM';

export const REQUEST_VM_PAGE = '@@admin/vmPage/LOAD';
export const RECEIVE_VM_PAGE_SUCCESS = '@@admin/vmPage/LOAD_SUCCESS';
export const RECEIVE_VM_PAGE_FAIL = '@@admin/vmPage/LOAD_FAIL';

export const REQUEST_VM_API = '@@admin/vmAPI/LOAD';
export const RECEIVE_VM_API_SUCCESS = '@@admin/vmAPI/LOAD_SUCCESS';
export const RECEIVE_VM_API_FAIL = '@@admin/vmAPI/LOAD_FAIL';

export const REQUEST_BASE_INFO = '@@admin/baseInfo/LOAD';
export const RECEIVE_BASE_INFO_SUCCESS = '@@admin/baseInfo/LOAD_SUCCESS';
export const RECEIVE_BASE_INFO_FAIL = '@@admin/baseInfo/LOAD_FAIL';

export const REQUEST_SKU = '@@admin/SKU/LOAD';
export const RECEIVE_SKU_SUCCESS = '@@admin/SKU/LOAD_SUCCESS';
export const RECEIVE_SKU_FAIL = '@@admin/SKU/LOAD_FAIL';

export const REQUEST_DOC = '@@admin/DOC/LOAD';
export const RECEIVE_DOC_SUCCESS = '@@admin/DOC/LOAD_SUCCESS';
export const RECEIVE_DOC_FAIL = '@@admin/DOC/LOAD_FAIL';

export const SHOW_MODAL = 'admin/Common/modal/show';
export const HIDE_MODAL = 'admin/Common/modal/hide';

export const UPDATE_SIDEBAR = 'admin/Common/sidebar/update';

export const UPLOAD_FILE = 'admin/Common/upload/file/LOAD';
export const UPLOAD_FILE_SUCCESS = 'admin/Common/upload/file/SUCCESS';
export const UPLOAD_FILE_FAIL = 'admin/Common/upload/file/FAIL';


export let uploadFile = makeBasicReducer(UPLOAD_FILE, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_FAIL);
export let sku = makeBasicReducer(REQUEST_SKU, RECEIVE_SKU_SUCCESS, RECEIVE_SKU_FAIL);
export let baseInfo = makeBasicReducer(REQUEST_BASE_INFO, RECEIVE_BASE_INFO_SUCCESS, RECEIVE_BASE_INFO_FAIL);


export let vmApi = function (state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_VM_API:
            return {
                ...state,
                loading: true
            };
        case RECEIVE_VM_API_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: {
                    content: action.result,
                    pageId: action.meta.vmPageId
                },
                error: null
            };
        case RECEIVE_VM_API_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                data: {},
                error: action.error
            };
        default:
            return state;
    }
};

export let doc = function (state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_DOC:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: false
            };
        case RECEIVE_DOC_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: {
                    content: action.result,
                },
                error: false
            };
        case RECEIVE_DOC_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                data: {},
                error: true
            };
        default:
            return state;
    }
};

export let vmPage = function (state = initialState, action = {}) {
    switch (action.type) {
        case REQUEST_VM_PAGE:
            return {
                ...state,
                loading: true,
                loaded: false,
                error: false
            };
        case RECEIVE_VM_PAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                data: {
                    content: action.result,
                    pageId: action.meta.vmPageId
                },
                error: false
            };
        case RECEIVE_VM_PAGE_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false,
                data: {},
                error: true
            };
        default:
            return state;
    }
};


export function modal(state = {data: {
    show: false,
}}, action = {}) {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                show: true,
                data: action.data
            };
        case HIDE_MODAL:
            return {
                show: false,
                data: action.data
            };
        default:
            return state;
    }
}

export function system(state = {}, action = {}) {
    switch (action.type) {
        case RECEIVE_SUB_SYSTEM:
            return {
                flag: action.data.flag,
                path: action.data.path,
            };
        default:
            return state;
    }
}



export function sidebar(state = {}, action = {}) {
    switch (action.type) {
        case UPDATE_SIDEBAR:
            return {
                show: action.data.show,
            };
        default:
            return state;
    }
}


