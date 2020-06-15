//订单规则处理
function orderHandle(customerInfo,bookCount,hestoryOrderInfo){
	//判断学校用户，还是非学校用户
	let userType = 'commonUser';
	if(customerInfo.schoolInfo.id){
		userType = 'schoolUser';
	}
	
	//判断第一单还是第二单，还是其他单
	let buyCount = 0;
	let couponBuyCount = 0;
	buyCount = hestoryOrderInfo.normalOrder + 1;
	couponBuyCount = hestoryOrderInfo.couponOrder + 1;
	
	//判断是否有押金
	let deposit = customerInfo.deposit;  
				
	// 正常订单判断规则号
	let payRuleType = 0;
	if(buyCount === 1){   //首单
		if(userType === 'schoolUser'){	//学校用户
			// if(0 < bookCount && bookCount <=3){
			// 	payRuleType = 1
			// }
			if(0 < bookCount && bookCount <=10){
				payRuleType = 2
			}					
		}else if(userType === 'commonUser'){	//游客用户
			if(0 < bookCount && bookCount <=10){
				payRuleType = 3
			}
		}
	}else if(buyCount > 1){  //非首单
		if(userType === 'schoolUser'){	//学校用户
			if(0 < bookCount && bookCount  <=10){
				payRuleType = 4
			}				
		}else if(userType === 'commonUser'){	//游客用户
			if(0 < bookCount && bookCount <=10){
				payRuleType = 5
			}
		}
	}
	
	//特殊订单判断
	if(couponBuyCount === 1){   //首单
		if(userType === 'schoolUser'){	//学校用户
			if(0 < bookCount && bookCount <=3){
				payRuleType = 1
			}									
		}
	}
	
	//获取支付信息
	let orderPayInfo = payRule(payRuleType);
	console.log(orderPayInfo);
	
	// 非首次购买查看是否有押金，没有的话要补上
	if(parseInt(deposit) === 0 && buyCount > 1) {
		if(userType === 'schoolUser'){	//学校用户
			orderPayInfo.deposit = 100;
			orderPayInfo.payMoney = orderPayInfo.afterDiscountMoney + orderPayInfo.deposit;
		}else if(userType === 'commonUser'){	//游客用户
			orderPayInfo.deposit = 200;
			orderPayInfo.payMoney = orderPayInfo.afterDiscountMoney + orderPayInfo.deposit;
		}
	}
	
	//如果有押金的情况，清空初始化押金信息
	if(parseInt(deposit) !== 0) {
		orderPayInfo.payMoney = orderPayInfo.payMoney - orderPayInfo.deposit;
		orderPayInfo.deposit = 0;
	}
	
	return orderPayInfo;
	
}
// 支付规则
function payRule(type){
	switch (type){
		case 1:
			return {
				userType:'学校用户',
				discountType:'绘本到家',
				couponType:'pictureBookArriver',
				deposit:100,
				orderMoney:30,
				discountMoney:30,
				afterDiscountMoney:0,
				payMoney:100
			}
			break;
		case 2:
			return {
				userType:'学校用户',
				discountType:'首次体验10本优惠',
				couponType:'',
				deposit:100,
				orderMoney:30,
				discountMoney:12,
				afterDiscountMoney:18,
				payMoney:118
			}
			break;
		case 3:
			return {
				userType:'游客用户',
				discountType:'首次体验10本优惠',
				couponType:'',
				deposit:200,
				orderMoney:45,
				discountMoney:17,
				afterDiscountMoney:28,
				payMoney:228
			}
			break;
		case 4:
			return {
				userType:'学校用户',
				discountType:'无优惠',
				couponType:'',
				deposit:0,
				orderMoney:30,
				discountMoney:0,
				afterDiscountMoney:30,
				payMoney:30
			}
			break;
		case 5:
			return {
				userType:'游客用户',
				discountType:'无优惠',
				couponType:'',
				deposit:0,
				orderMoney:45,
				discountMoney:0,
				afterDiscountMoney:45,
				payMoney:45
			}
			break;
		default :
			return false;
	}
}


module.exports = {
	orderHandle
};
