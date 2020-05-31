<template>
	<view class="content">
		<view class="sign-button" @tap="toTest">
			<text style="font-size: 24upx;">支付测试</text>
		</view> 
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="member-position" @tap="toMemberUrl">
				<view class="member-content"> 
					<et-member title="会员获得更多权益"></et-member>
				</view>
			</view>
			
			<view class="white-space"></view>
			
			<view class="white-border address-position">
				<view style="width: 100%;" v-if="defalutAddress.name">
					<picker style="width: 100%;" @change="bindPickerChange" :value="addressIndex" :range="addressList">
						<et-address style="width:100%;" :address='defalutAddress' @changeAddressInfo="changeAddressInfo" v-if="defalutAddress.name"></et-address>
					</picker>
				</view>
				<view v-else class="add-address-position" @tap='addAddress'>
					<image src="../../static/cart/add.png" style="width: 120upx; height: 120upx;"></image>
					<text style="color:#9FB2BF; font-size: 25upx;">请添加收货地址</text>
				</view>
			</view>
			
			<view class="white-space"></view>
			
			<view class="order-list-position white-border">
				<et-order-list :orderList="orderList"></et-order-list>
			</view>
			
			<view class="white-space"></view>
			
			<view class="pay-position white-border">
				<et-order-pay :orderPayInfo="finalPayOrderInfo"></et-order-pay>
			</view>
			
			<view class="white-space" style="height: 150upx;"></view>
			
			
			<!-- 底部栏目 -->
			<view class="bottom-position">
				<view class="bottom-content">
					<view class="bottom-text">
						<text>共计：</text>
						<text style="color: #DB3E49;">{{bookCount}}</text>
						<text>本</text>
					</view>
					
					<view class="bottom-text">
						<text>支付金额：</text>
						<text style="color: #DB3E49;">{{moneyCount}}</text>
						<text>元</text>
					</view>
					
					<view class="bottom-tag">
						<et-tag backgroundColor="#2AAEC4" title="确认借书" fontColor="#FFFFFF" class="tag-style" @tap="buySelect"></et-tag>
					</view>
				</view>
			</view>
			
			<view class="white-space"></view>
		</view>
		
	</view>
</template>

<script>
import etMember from '../../components/etMember.vue'
import etAddress from '../../components/etAddress.vue'
import etOrderList from '../../components/etOrderList.vue'
import etOrderPay from '../../components/etOrderPay.vue'
import etTag from '../../components/etTag.vue'
const wxPay = require('@/common/wxPay')
const formatDate = require('@/common/formatDate')
const toUrlFunction = require('@/common/toUrlFunction');

export default {
	components: {
		etMember,
		etAddress,
		etOrderList,
		etOrderPay,
		etTag
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	data() {
		return {
			allcustomInfo: {},
			customerInfo:{},		//客户信息
			bookCount: "0",
			moneyCount: "0",
			defalutAddress : {},	//客户选择的发货地址
			orderList :{
				goodsInfo:[]
			},
			addressIndex: 0,		//被选择地址的索引
			addressList: [],		//选择框的地址列表
			hestoryOrderInfo: [],   //客户历史订单信息，用于第几次订单
			finalPayOrderInfo:{},	//最终的订单支付信息
			bookidString: '',
		}
	},
	onShow(){
		this.dataInit();
		this.getCustomerInfo();
	},
	// onLoad(option) {
	// 	this.dataInit();
	// },
	methods: {
		toTest() {
			this.finalPayOrderInfo.afterDiscountMoney = '0.01'
			this.finalPayOrderInfo.deposit = '1'
			// this.moneyCount = '0.01';
			this.finalPayOrderInfo.payMoney = '0.02'
		},
		toMemberUrl(){
			toUrlFunction.toUrl('/pages/my/myMember');
		},
		async getCustomerInfo(){
			this.userInfo = uni.getStorageSync('userInfo');
			this.allcustomInfo = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
		},
		dataInit() {
			// 获取customerID
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.customerInfo = res.data[0];
				
				if(this.customerInfo.addressInfo.length > 0){
					this.customerInfo.addressInfo.map(item=>{
						if(item.is_default === '1'){
							this.defalutAddress = item;
							this.defalutAddress.optionType = 'orderDetail';
							this.defalutAddress.is_default = '0';
						}
						
						//合成更换地址数组，用于用户更换地址
						let addressString = item.name + "," + item.mobile + "," + item.showing_address+item.address;
						this.addressList.push(addressString);
					});
				}
				
				//获取客户历史订单
				this.$api.checkExistOrder({ custom_id: this.customerInfo.id }).then(res=>{
					this.hestoryOrderInfo = res.data;
					
					let orderObject = uni.getStorageSync('orderInfo');
					if(orderObject.defalutAddress){
						this.defalutAddress = orderObject.defalutAddress;
						this.defalutAddress.is_default = 0;
						this.defalutAddress.optionType = 'orderDetail';
					}
					this.bookCount = orderObject.bookCount;
					this.orderList.goodsInfo = orderObject.goodsInfo;
					
					console.log(orderObject);
					
					//最终支付订单信息
					this.finalPayOrderInfo = this.orderHandle();
					this.finalPayOrderInfo.createTime = formatDate.formatDate(new Date());
					this.finalPayOrderInfo.returnTime = formatDate.getDateDuration(new Date(), 15);
					this.moneyCount = this.finalPayOrderInfo.payMoney;
					
					console.log(this.orderList.goodsInfo);
				});
			});
			
			
		},
		addAddress(){
			uni.navigateTo({
				url:'/pages/cart/addressEdit?toBackUrl=/pages/cart/orderDetail'
			})
		},
		btnClick() {
			console.log(this.defalutAddress);
		},
		changeAddressInfo(){
			console.log("123");
		},
		bindPickerChange(e){
			this.defalutAddress = this.customerInfo.addressInfo[e.detail.value];
			this.defalutAddress.optionType = 'orderDetail';
			this.defalutAddress.is_default = '0';
		},
		buySelect() {
			// 判断物流信息是否为空，如果为空不可以执行下面的操作
			if(this.defalutAddress.name === '' || this.defalutAddress.name === undefined){
				uni.showToast({
					title:'请填写好物流信息',
					duration: 2000,
					icon:'none'
				})
				return;
			}
			
			//组合商品id
			this.bookidString = '';
			this.orderList.goodsInfo.map(item=>{
				this.bookidString = this.bookidString + ',' + item.id;
			});
			this.bookidString = this.bookidString.substr(1);
			
			// 发起微信支付请求
			// 注意：仅限正式环境才能发起支付
			// 请求参数 userInfo {}
			// 请求参数 money 0.01
			// 请求参数 usage 用途
			if (true) {
			// if (process.env.NODE_ENV === 'production') {
				// const userInfo = uni.getStorageSync('userInfo')
				if (this.userInfo.name !== 'guest') {
					let param = {
						userInfo: this.userInfo,
						orderInfo: {
							goods: this.bookidString,
							count: this.bookCount,
							order_type: 'online',
							price: this.finalPayOrderInfo.afterDiscountMoney,
							deposit: this.finalPayOrderInfo.deposit,
							final_price: this.finalPayOrderInfo.payMoney,
							address_id: this.defalutAddress.id
						}
					}
					this.$api.getPayment(param).then(res => {
						let resData = res.data.finalRes.xml 
						let order_no = res.data.order_no
						console.log(resData)
						if (resData.return_code[0] === 'SUCCESS') {
							let { paySign, time, APPID, nonceStr } = wxPay.wxReSign(resData.prepay_id[0])
							wxPay.wxPay(time, nonceStr, resData.prepay_id[0], paySign, 
								res => {
									// res.errMsg = "requestPayment:ok"
									if (res.errMsg === "requestPayment:ok") {
										this.$api.updatePayment({
											order_no: order_no, 
											custom_id: this.allcustomInfo.id,
											deposit: this.finalPayOrderInfo.deposit,
											userInfo: this.userInfo,
											orderInfo: {
												goods: this.bookidString,
												count: this.bookCount,
												order_type: 'online',
												price: this.finalPayOrderInfo.afterDiscountMoney,
												deposit: this.finalPayOrderInfo.deposit,
												final_price: this.finalPayOrderInfo.payMoney,
												address_id: this.defalutAddress.id
											}
										}).then(res => {
											//跳出支付成功界面
											if (res.data.xml.return_code[0] === 'SUCCESS') {
												uni.navigateTo({
													url:'/pages/cart/paysuccess'
												})
												//更新书篮数据
												uni.setStorageSync('carListInfo', [])
											}
										})
									}
								},
								err => {
									// uni.showToast({ icon: 'none', title: 'pay fail' + JSON.stringify(err) })
								}
							)
						} else {
							uni.showToast({ icon: 'none', title: resData.return_msg[0] })
						}
					})
				} else {
					uni.reLaunch({ url: '../guide/auth' })
				}
			} else {
				uni.showToast({ icon: 'none', title: '测试环境暂不能够支付' })
			}
		},
		//订单规则处理
		orderHandle(){
			//判断学校用户，还是非学校用户
			let userType = 'commonUser';
			if(this.customerInfo.schoolInfo.id){
				userType = 'schoolUser';
			}
			
			//判断第一单还是第二单，还是其他单
			let buyCount = 0;
			buyCount = this.hestoryOrderInfo.length + 1;
			
			//判断商品数量
			let bookCount = this.bookCount;
			
			//判断是否有押金
			let deposit = this.customerInfo.deposit;
						
			// 判断规则号
			let payRuleType = 0;
			if(buyCount === 1){   //首单
				if(userType === 'schoolUser'){	//学校用户
					if(0 < bookCount <=3){
						payRuleType = 1
					}
					if(3 < bookCount <=10){
						payRuleType = 2
					}					
				}else if(userType === 'commonUser'){	//游客用户
					if(0 < bookCount <=10){
						payRuleType = 3
					}
				}
			}else if(buyCount > 1){  //非首单
				if(userType === 'schoolUser'){	//学校用户
					if(0 < bookCount <=10){
						payRuleType = 4
					}				
				}else if(userType === 'commonUser'){	//游客用户
					if(0 < bookCount <=10){
						payRuleType = 5
					}
				}
			}
			
			//获取支付信息
			let orderPayInfo = this.payRule(payRuleType);
			console.log(orderPayInfo);
			
			// 非首次购买查看是否有押金，没有的话要补上
			if(parseInt(deposit) === 0 && buyCount > 1) {
				if(userType === 'schoolUser'){	//学校用户
					orderPayInfo.deposit = 100;
					orderPayInfo.payMoney = orderPayInfo.payMoney + 100;
				}else if(userType === 'commonUser'){	//游客用户
					orderPayInfo.deposit = 200;
					orderPayInfo.payMoney = orderPayInfo.payMoney + 200;
				}
			}
			
			//更新微信支付信息
			
			
			return orderPayInfo;
			
		},
		// 支付规则
		payRule(type){
			switch (type){
				case 1:
					return {
						userType:'学校用户',
						discountType:'绘本到家',
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
						discountType:'首次体验优惠',
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
						discountType:'首次体验优惠',
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
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-position {
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-radius: 20upx;
	height: 230upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.member-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #FFFBE6;
	padding: 10upx 0;
}
.address-position {
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.add-address-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.order-list-position {
	width: 90%;
}
.pay-position {
	width: 90%;
}
.bottom-position {
	z-index: 3;
	width: 100%;
	background-color: #FFFFFF;
	padding: 30upx;
	position: fixed;
	bottom: 0;
	font-size: 25upx;
	color: #9A9A9A;
}
.bottom-content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	background-color: #FFFFFF;
}
.bottom-tag {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.tag-style {
	width: 150upx;
	height: 45upx;
	margin-right: 20upx;
}
.sign-button {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 60%;
	right: 0upx;
	z-index: 999;
	width: 120upx;
	height: 120upx;
	border-radius: 60upx;
	background: #ccc;
}
</style>
