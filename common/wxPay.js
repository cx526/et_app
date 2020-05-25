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
 const MD5 = require('md5');
 
function wxPay(time, nonceStr, packages, paySign, success, fail) { 
    uni.requestPayment({
        provider: 'wxpay',
        timeStamp: time,
        nonceStr: nonceStr,
        package: 'prepay_id=' + packages,
        signType: 'MD5',
        paySign: paySign,
        success(res) { success(res) }, 
        fail(err) { fail(err) }
    })
}

//产生一个n位随机字符串
function randomStr(n) {
	let str = '';
	let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

	for(let i=1; i<=n; i++){
	  let random = Math.floor(Math.random() * arr.length);
	  str += arr[random];
	}
	return str;
}

function wxReSign(packages) {
	const APPID = 'wx4d51a694ef6697ff'
	const MCHAPISECRET = '5FBH0YP95JULMV68T1SVTOXHAOQHEGB2'
	const nonceStr = randomStr(32)
	const time = new Date().getTime()+''
	let signString = `appId=${APPID}&nonceStr=${nonceStr}&package=prepay_id=${packages}&signType=MD5&timeStamp=${time}&key=${MCHAPISECRET}`
	let paySign = MD5(signString).toString().toUpperCase()
	return { 
		paySign,
		time,
		APPID,
		nonceStr
	}
}

module.exports = {
    wxPay,
	wxReSign
};
