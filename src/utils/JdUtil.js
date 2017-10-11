
import {logoutUrl, systemEndpoint} from 'config/index';

/**
 * 登出
 */
export function logout() {
    //let returnUrl = encodeURIComponent(location.href);
    //location.href = `${logoutUrl}?ReturnUrl=${returnUrl}`;
    location.href = `${systemEndpoint.root}${logoutUrl}`;
}


