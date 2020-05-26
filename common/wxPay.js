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



// 序号	订单类型	优惠	角色	支付规则	备注		

// 一、	支付订单	绘本到家	学校用户	
// "1、商品<=3，享受绘本到家服务；
// 2、填写物流信息；
// 3、押金 100；
// 4、订单金额  0；"	1--3	第一单	"学校用户：有学校id 
// 游客：无学校id 已微信手机授权"

// 二	支付订单	首次体验优惠	学校用户	
// "1、3<商品<=10，享受首次；
// 2、填写物流信息；
// 3、押金 100；
// 4、订单金额  30；
// 5、优惠金额 12；（固定）
// 6、优惠后金额：18；
// 7、支付金额：118"	4--10	第一单	

// 三	支付订单	首次体验优惠	游客	
//"1、3<商品<=10，享受首次；
// 2、填写物流信息；
// 3、押金 200；
// 3、订单金额  45；
// 4、优惠金额 17；
// 5、优惠后金额：28；
// 6、支付金额228"	4--10	第一单	

// 四	支付订单	无优惠	学校用户	
// "1、0<商品<=10，已享受首次体验优惠；
// 2、填写物流信息；
// 3、订单金额  30；
// 4、判断是否有押金，没有押金则继续收取100元押金，有押金则只需收取支付金额；
// 5、支付金额：30;"		第二单	

// 五	支付订单	无优惠	游客	
// "1、0<商品<=10，已享受首次体验优惠；
// 2、填写物流信息；
// 3、订单金额  30；
// 4、判断是否有押金，没有押金则继续收取200元押金，有押金则只需收取支付金额；
// 5、支付金额：45;"		第二单	

// 六	会员订单	无优惠	学校用户	1、扣减免费借阅次数	后面迭代		

// 七	会员订单	无优惠	游客	1、扣减免费借阅次数	后面迭代		
