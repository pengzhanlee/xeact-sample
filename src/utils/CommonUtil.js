
import {systemEndpoint} from 'config/index';

export function isArrayValid(array, allowedZero) {
    if(allowedZero) {
        return array && array instanceof Array;
    }

    return !!(array && array.length);
}

export function isObjectValid(obj) {
    for(let i in obj){
        if (obj.hasOwnProperty(i)){
            return true;
        }
    }
    return false;
}


/**
 * url
 * @param systemFlag
 * @param path
 * @param query
 * @returns {string}
 */


/**
 * vm 页面请求 url
 * @param systemFlag
 * @param path
 * @param query
 * @param isPage
 * @returns {string}
 */
export function matchUrl({systemFlag, path = '', query = {}, isPage}) {
    let endpoint = systemEndpoint[systemFlag];
    let queryString = [];

    let extension = isPage ? '.html' : '';

    if(!path){
        extension = '';
    }

    Object.keys(query).forEach((key) => {
        let value = query[key];
        queryString.push(`${key}=${value}`);
    });

    queryString = queryString.join('&');

    if(queryString){
        queryString = `?${queryString}`;
    }

    if(!endpoint){
        return `//${systemFlag}/${path}${queryString}`;
    }

    return `${endpoint}/${path}${extension}${queryString}`;
}

/**
 * vm api 请求 url
 * @param url
 * @returns {string}
 */
export function matchApiUrl(url) {

    // 系统内部请求
    let isInternalUrl = /^\/[\w-\d]/.test(url);

    if(isInternalUrl){
        let systemFlag = url.match(/^\/([\w-\d]+)/)[1];
        let endpoint = systemEndpoint[systemFlag];
        if(!endpoint) {
            console.error(`错误的系统标记: ${systemFlag}, original url: ${url}`);
            return '/';
        }
        url = url.replace(`/${systemFlag}`, '');
        return `${endpoint}${url}`;
    }

    return url;
}

/**
 * 开发环境
 * @returns {*}
 */
export function isDevEnv() {
    return __DEVELOPMENT__;
}
