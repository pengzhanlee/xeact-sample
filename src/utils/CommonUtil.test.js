import {
    isArrayValid,
    isObjectValid,
    matchUrl,
    matchApiUrl,
    isDevEnv,
} from './CommonUtil';


beforeEach(() => {
});

describe('isArrayValid', () => {
    test('normal valid array', () => {
        expect(isArrayValid([1, 2])).toBe(true);
    });

    test('normal invalid array', () => {
        expect(isArrayValid([])).toBe(false);
    });

    test('allowedZero, normal invalid array', () => {
        expect(isArrayValid([], true)).toBe(true);
    });
});


describe('isObjectValid', () => {
    test('normal valid object', () => {
        expect(isObjectValid({})).toBe(false);
    });
    test('normal valid array', () => {
        expect(isObjectValid({
            x: 'y'
        })).toBe(true);
    });
});

describe('matchUrl', () => {

    test('not page', () => {
        expect(matchUrl({
            systemFlag: 'cook',
            path: '/path',
            query: {
                query1: 1,
                query2: 2
            }
        })).toBe('//cook.ufstest.com//path?query1=1&query2=2');
    });

    test('page', () => {
        expect(matchUrl({
            systemFlag: 'cook',
            path: '/path',
            isPage: true,
        })).toBe('//cook.ufstest.com//path.html');
    });

    test('invalid system flag', () => {
        expect(matchUrl({
            systemFlag: 'xxx',
        })).toBe('//xxx/');
    });

    test('no path', () => {
        expect(matchUrl({
            systemFlag: 'cook',
        })).toBe('//cook.ufstest.com/');
    });
});


describe('matchApiUrl', () => {

    test('匹配节点的内部地址', () => {
        expect(matchApiUrl('/data/aaa/bbb')).toBe('//data.ufstest.com/aaa/bbb');
    });

    test('未匹配节点的内部地址', () => {
        expect(matchApiUrl('/xxxxxx/aaa')).toBe('/');
    });

    test('外部地址', () => {
        expect(matchApiUrl('//jd.com/aaa')).toBe('//jd.com/aaa');
    });

});

describe('isDevEnv', () => {
    test('normal valid object', () => {
        expect(isDevEnv()).toBe(true);
    });
});
