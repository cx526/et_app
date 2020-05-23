/**
 * 微信小程序支付,仅支持正式环境
 *
 * @param : nonceStr(String) ->支付随机码
 * @param : packages(String) ->支付id
 * @param : signType(String) ->加密方式(默认MD5)
 * @param : paySign(String)  ->接口返回支付签名
 *
 * 小程序支付调用
 *
 * wxPay(nonceStr, packages, paySign,res=>{},fail=>{})
 */
 
const wxPay = (nonceStr, packages, paySign, success, fail) => (
    uni.requestPayment({
        provider: 'wxpay',
        timeStamp: new Date().getTime(),
        nonceStr: nonceStr,
        package: 'prepay_id=' + packages,
        signType: 'MD5',
        paySign: paySign,
        success(res) { success(res) }, 
        fail(err) { fail(err) }
    })
)
 
export default wxPay;
