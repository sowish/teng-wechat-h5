function pay({appId, timeStamp, nonceStr, Package, paySign, callback}) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            // "debug": true,
            "appId": appId,     //公众号名称，由商户传入
            "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": nonceStr, //随机串
            "package": Package,
            "signType": "HMAC-SHA256",         //微信签名方式：
            "paySign": paySign//微信签名
        },
        function (res) {
            // Log('支付的回调', res)
            callback(res)
        });
}

export function weixinPay({appId, timeStamp, nonceStr, Package, paySign, callback}) {
    if (typeof WeixinJSBridge !== "undefined") {
        pay({appId, timeStamp, nonceStr, Package, paySign, callback})
    } else {
        setTimeout(function () {
            weixinPay({appId, timeStamp, nonceStr, Package, paySign, callback})
        }, 1000)
    }
}

