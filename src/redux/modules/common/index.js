import {matchUrl, matchApiUrl} from 'utils/CommonUtil';
import * as actions from './reducer';



// actions

/**
 * doc
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function requestDoc(path) {
    return {
        types: [actions.REQUEST_DOC, actions.RECEIVE_DOC_SUCCESS, actions.RECEIVE_DOC_FAIL],
        meta: {
        },
        promise: (apiClient) => {
            return apiClient({
                url: path,
                type: 'GET'
            });
        }
    };
}

/**
 * vm page
 * @returns {{types: [*,*,*], promise: (function(*))}}
 */
export function requestVmPage(systemFlag, path, query) {

    let url = matchUrl({
        systemFlag,
        path,
        query,
        isPage: true
    });

    return {
        types: [actions.REQUEST_VM_PAGE, actions.RECEIVE_VM_PAGE_SUCCESS, actions.RECEIVE_VM_PAGE_FAIL],
        meta: {
            vmPageId: `${systemFlag}--${path}--${JSON.stringify(query)}`,
            isPage: true
        },
        promise: (apiClient) => {
            return apiClient({
                url,
                type: 'GET'
            });
        }
    };
}

export function requestBaseinfo() {
    let url = matchApiUrl('/root/api/index');

    return {
        types: [actions.REQUEST_BASE_INFO, actions.RECEIVE_BASE_INFO_SUCCESS, actions.RECEIVE_BASE_INFO_FAIL],
        meta: {
        },
        promise: (apiClient) => {
            return apiClient({
                url,
                type: 'get'
            })
        }
    }
}

/**
 *
 * @param systemFlag 当前所在页面的系统名
 * @param url
 * @param system 调用时配置的系统名
 * @param method
 * @param data
 * @param block UI 阻塞
 * @param blockTip UI 阻塞时提示
 * @returns {{types: *[], meta: {vmApi: boolean, block: boolean, blockTip: *}, promise: (function(*))}}
 */
export function requestApi({url, method = 'GET', data = {}, block = true, blockTip}) {

    url = matchApiUrl(url);

    return {
        types: [actions.REQUEST_VM_API, actions.RECEIVE_VM_API_SUCCESS, actions.RECEIVE_VM_API_FAIL],
        meta: {
            vmApi: true,
            block,
            blockTip
        },
        promise: (apiClient) => {
            return apiClient({
                url,
                type: method,
                data
            })
        }
    }
}

/**
 *
 * @param skuList
 * @param block
 * @param blockTip
 * @returns {{types: [*,*,*], meta: {block: boolean, blockTip: string}, promise: (function(*))}}
 */
export function requestSku(skuList, block = false, blockTip = '') {

    let url = matchApiUrl('/cook/api/common/querySkuInfoList');

    let data = {
        skuids: skuList.join(',')
    };

    return {
        types: [actions.REQUEST_SKU, actions.RECEIVE_SKU_SUCCESS, actions.RECEIVE_SKU_FAIL],
        meta: {
            block,
            blockTip
        },
        promise: (apiClient) => {
            return apiClient({
                url: url,
                type: 'GET',
                data
            })
        }
    }
}



/**
 * 显示modal
 * @param data
 * @returns {{type, data: {type: *, text: *}}}
 */
export function showModal(data) {

    return {
        type: actions.SHOW_MODAL,
        data
    };
}

/**
 * 关闭 modal
 * @returns {{type, data: {type: string, text: string}}}
 */
export function hideModal() {
    return {
        type: actions.HIDE_MODAL,
        data: {
            type: '',
            text: ''
        }
    };
}

/**
 * sidebar
 * @returns {{type, data: {type: string, text: string}}}
 */
export function querySidebar() {

    let collapse = localStorage.getItem('admin-sidebar-collapse');

    return {
        type: actions.UPDATE_SIDEBAR,
        data: {
            show: !collapse
        }
    };
}

/**
 * sidebar
 * @returns {{type, data: {type: string, text: string}}}
 */
export function toggleSidebar() {

    let originalCollapse = localStorage.getItem('admin-sidebar-collapse');
    let show = originalCollapse ? '' : '1';
    localStorage.setItem('admin-sidebar-collapse', show);

    return {
        type: actions.UPDATE_SIDEBAR,
        data: {
            show: !show
        }
    };
}

export function receiveSubSystem(flag, path) {
    return {
        type: actions.RECEIVE_SUB_SYSTEM,
        data: {
            flag,
            path
        }
    };
}

/**
 * 图片上传
 * @param fileInput
 * @param fileName
 * @param extraData
 * @param block
 * @param blockTip
 * @param url
 * @returns {{types: [null,null,null], meta: {block: boolean, blockTip: string}, promise: (function(*))}}
 */
export function uploadImg({ fileInput, fileName = 'file', extraData = {}, block = false, blockTip = '', url = matchApiUrl('/root/imgUpload/mobile') }) {

    return {
        types: [actions.UPLOAD_FILE, actions.UPLOAD_FILE_SUCCESS, actions.UPLOAD_FILE_FAIL],

        meta: {
            block,
            blockTip
        },

        promise: (apiClient) => {

            let files = fileInput.files;
            let file = files[0];

            let formData = new FormData();
            formData.append(fileName, file);

            if(extraData) {
                Object.keys(extraData).forEach(function (key) {
                    let value = extraData[key];
                    formData.append(key, value);
                });
            }

            return apiClient({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: false,
                processData: false,
                cache: false,
                data: formData
            });
        }
    };
}

