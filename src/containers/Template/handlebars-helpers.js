import numbro from 'numbro';

const escape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

const badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
    return escape[chr];
}

export function extend(obj/* , ...source */) {
    for (let i = 1; i < arguments.length; i++) {
        for (let key in arguments[i]) {
            if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
                obj[key] = arguments[i][key];
            }
        }
    }

    return obj;
}

export let toString = Object.prototype.toString;

// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
let isFunction = function(value) {
    return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
    isFunction = function(value) {
        return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
}
export {isFunction};
/* eslint-enable func-style */

/* istanbul ignore next */
export const isArray = Array.isArray || function(value) {
        return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
    };

// Older IE versions do not directly support indexOf so we must implement our own, sadly.
export function indexOf(array, value) {
    for (let i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
}


export function escapeExpression(string) {
    if (typeof string !== 'string') {
        // don't escape SafeStrings, since they're already safe
        if (string && string.toHTML) {
            return string.toHTML();
        } else if (string == null) {
            return '';
        } else if (!string) {
            return string + '';
        }

        // Force a string conversion as this will be done by the append regardless and
        // the regex test will do this transparently behind the scenes, causing issues if
        // an object's to string has escaped characters in it.
        string = '' + string;
    }

    if (!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
}

export function isEmpty(value) {
    if (!value && value !== 0) {
        return true;
    } else if (isArray(value) && value.length === 0) {
        return true;
    } else {
        return false;
    }
}

export function createFrame(object) {
    let frame = extend({}, object);
    frame._parent = object;
    return frame;
}

export function blockParams(params, ids) {
    params.path = ids;
    return params;
}

export function appendContextPath(contextPath, id) {
    return (contextPath ? contextPath + '.' : '') + id;
}


export default function (Handlebars) {

    // if alternative (velocity syntax conflict)
    Handlebars.registerHelper('ifx', function(conditional, options) {
        if (isFunction(conditional)) { conditional = conditional.call(this); }

        if ((!options.hash.includeZero && !conditional) || isEmpty(conditional)) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    });

    // 比较第一个变量是否等于第二个
    Handlebars.registerHelper('et', function (left, right, options) {
        if (arguments.length !== 3) {
            throw new Error('helper "lt" needs 2 arguments');
        }
        if (left == right) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 比较第一个变量是否大于第二个
    Handlebars.registerHelper('gt', function (left, right, options) {
        if (arguments.length !== 3) {
            throw new Error('helper "gt" needs 2 arguments');
        }
        if (left > right) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    // 比较第一个变量是否小于第二个
    Handlebars.registerHelper('lt', function (left, right, options) {
        if (arguments.length !== 3) {
            throw new Error('helper "lt" needs 2 arguments');
        }
        if (left < right) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('abs', function (num) {
        if (isNaN(num) || null === num) {
            return 0;
        }
        num = +num;
        return numbro(Math.abs(num)).format('0,0.00');
    });
}