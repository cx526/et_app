<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="member-position">
				<view class="member-content"> 
					<et-member title="会员获得更多权益"></et-member>
				</view>
			</view>
			
			<view class="white-space"></view>
			
			<view class="white-border address-position">
				<et-address :address='defalutAddress' @tap='btnClick' v-if="defalutAddress.name"></et-address>
				<view v-else class="add-address-position">
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
				<et-order-pay :paydata="orderList"></et-order-pay>
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

export default {
	components: {
		etMember,
		etAddress,
		etOrderList,
		etOrderPay,
		etTag
	},
	data() {
		return {
			bookCount: "0",
			moneyCount: "0",
			defalutAddress : {
				// 'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
			},
			orderList : {
				bookList: []
			},
			userInfo: {}
		}
	},
	onLoad(option) {
		this.bookCount = JSON.parse(decodeURIComponent(option.bookCount));
		this.moneyCount = JSON.parse(decodeURIComponent(option.moneyCount));
		this.orderList.bookList = JSON.parse(decodeURIComponent(option.orderList));
		
	},
	methods: {
		async getCustomerInfo(){
			this.userInfo = uni.getStorageSync('userInfo');
			const userInfoArr = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
		},
		btnClick() {
			console.log(this.defalutAddress);
		},
		buySelect() {
			// 发起微信支付请求
			// 注意：仅限正式环境才能发起支付
			// 请求参数 userInfo {}
			// 请求参数 money 0.01
			// 请求参数 usage 用途
			if (process.env.NODE_ENV === 'production') {
				// const userInfo = uni.getStorageSync('userInfo')
				if (userInfo.name !== 'guest') {
					let param = {
						userInfo: this.userInfo,
						orderInfo: {
							goods: '669,184,229',
							count: 3,
							order_type: 'online',
							price: '0.01',
							deposit: '0.01',
							final_price: '0.02',
							address_id: '2',
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
										this.$api.updatePayment({order_no: order_no}).then(res => {
											//跳出支付成功界面
											//res.data.xml.return_code[0] === 'SUCCESS'
											console.log(res)
										})
									}
								},
								err => {
									uni.showToast({ icon: 'none', title: 'pay fail' + JSON.stringify(err) })
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
</style>
