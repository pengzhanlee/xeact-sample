export default

function () {
    return function (param) {

        param = param || {
            dataType: 'json'
        };

        // 携带凭据
        param.xhrFields = param.xhrFields || {};
        param.xhrFields.withCredentials = true;

        param.headers = param.headers || {};

        param.timeout = param.timeout || 30 * 60 * 1e3;

        // ajax 标识
        param.headers['X-Requested-With'] = 'XMLHttpRequest';

        param.data = param.data || {};
        const timestamp = new Date().getTime().toString(36);
        if(typeof param.data === 'string'){
            if(param.data.length) {
                param.data += `&_t=${timestamp}`;
            }else{
                param.data = `?_t=${timestamp}`;
            }
        }else{
            param.data._t = timestamp;
        }

        return $.ajax(param).then(function(rsp) {

            if((typeof rsp).toUpperCase() === 'STRING'){

                return new $.Deferred().resolve(rsp).promise();

            }else if (rsp && rsp.success === false) {
                return new $.Deferred().reject({
                    message: rsp.resultMessage || '网络异常，请稍后再试.'
                }).promise();

            }else if(rsp && rsp.success) {

                return new $.Deferred().resolve(rsp.data).promise();

            }

            throw new Error('Request error on success', rsp);

        }, function(rsp, text, msg) {
            let {status} = rsp;
            let tip = '出错啦，请确保您的网络正常访问';

            if(status === 401){
                // Unauthorized
                let redirect = rsp.getResponseHeader('Location');
                if(redirect) {
                    location.href = `${redirect}`;
                    tip = '用户未认证，请先登录';
                }
            } else if(status === 403){
                // Permission deny
                tip = "抱歉，您暂未拥有对本功能的访问权限，请联系管理员";
            } else if(status >= 500) {
                tip = "服务器开了小差，请联系管理员";
            }

            return $.Deferred().reject({
                message: tip,
                isNetworkError: true
            }).promise();
        });
    };
}
