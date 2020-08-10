<template>
	<view class="context">
		<view class="list">
			<view class="item">
				<view class="label">
					<text>充值金额</text>
				</view>
				<view class="ipt">
					<input type="text" :value="value" 
					:disabled="flag" 
					@input="customMoney"/>
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>充值借书币</text>
				</view>
				<view class="ipt">
					<input type="text" :value="value * 10" disabled />
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>赠送积分</text>
				</view>
				<view class="ipt">
					<input type="text" :value="value * 10" disabled />
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="money">
			<view class="title">
				<text>选择充值面额</text>
			</view>
			<view class="money-list">
				<view class="item"
				v-for="(item, index) in moneyList.list"
				:key="index"
				@tap="changeMoney(index)">
					<text 
					style="font-size: 30rpx;"
					v-if="index < 5">{{ item.value }}贝</text>
					<text 
					style="color: #4F5355;font-size: 26rpx;"
					v-if="index < 5">
						售价{{ item.money }}元</text>
					<text
					style="font-size: 30rpx;"
					v-if="index == 5">{{ item.value }}</text>
					<text
					style="color: #4F5355;font-size: 26rpx;"
					v-if="index == 5">
						{{ item.money }}</text>
					<view class="img-bottom">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/library-pay-number.png" mode="widthFix"
						v-if="moneyList.currentIndex === index"></image>
					</view>
				</view>
				
			</view>
			
		</view>
		<!-- 提示 -->
		<view class="notice">
			<view class="title">
				<text>温馨提示：</text>
			</view>
			<view class="item">
				<text>1.五车贝为五车书平台虚拟货币，仅适用于平台借阅消费或购买教育产品</text>
			</view>
			<view class="item">
				<text>2.一元人民币可充值10五车贝</text>
			</view>
			<view class="item">
				<text>3.充值后不可提现</text>
			</view>
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<view type="default" @tap="goPay">确认充值</view>
		</view>
	</view>
</template>

<script>
	const wxPay = require('@/common/wxPay')
	export default {
		data() {
			return {
				flag: true,
				value: 10,
				moneyList: {
					currentIndex: 0,
					list: [
						{
							value: 100,
							money: 10
						},
						{
							value: 200,
							money: 20
						},
						{
							value: 300,
							money: 30
						},
						{
							value: 500,
							money: 50
						},
						{
							value: 1000,
							money: 100
						},
						{
							value: '其他',
							money: '自定义金额'
						}
					]
					
				},
				
			}
		},
		methods: {
			// 自定义输入金额
			customMoney(event) {
				this.value = (+event.detail.value);
			},
			// 改变充值金额
			changeMoney(index) {
				this.moneyList.currentIndex = index;
				if(index !== 5) {
					this.value = this.moneyList.list[index].money;
					this.flag = true
				}else {
					this.flag = false;
					this.value = ''
				}
			},
			
			// 充值
			goPay() {
				if(this.value < 10) {
					uni.showToast({
						title: '充值金额不能小于10元',
						icon: 'none'
					})
					return
				}
				uni.showLoading({
					title: '发起支付中',
					mask: true
				})
				let mobile = uni.getStorageSync("userInfo").mobile;
				console.log(mobile);
				// 获取用户的id
				this.$api.getCustom({ filterItems: { mobile: mobile } }).then(res => {
					console.log(res.data[0].id);
					var id = res.data[0].id;
					var userInfo = uni.getStorageSync("userInfo");
					userInfo.id = id;
					let params = {
						userInfo: userInfo,
						shell:  "0.01",
						event: "recharge"
					}
					// 从后台读取订单号
					this.$api.offlinePayMent(params).then(res => {
						let resData = res.data.finalRes.xml 
						let order_no = res.data.order_no;
						console.log(resData);
						console.log(order_no);
						if(resData.return_code[0] === 'SUCCESS') {
							// 获取微信签名
							let { paySign, time, APPID, nonceStr } = wxPay.wxReSign(resData.prepay_id[0])
							// 调起微信支付
							wxPay.wxPay(time, nonceStr, resData.prepay_id[0], paySign,
								// 支付成功回调事件
								res => {
									uni.hideLoading();
									if(res.errMsg === "requestPayment:ok") {
										this.$api.offlineUpdatePayMent({
											userInfo: userInfo,//个人信息
											event: "recharge",//充值类型
											order_no: order_no,//订单号
											shell:  "0.01",//充值金额
										}).then(res => {
											console.log(res)
										})
									}
								},
								// 支付失败回调事件
								err => {
									uni.hideLoading();
								}
							)
						}
					})
				})
			}
		}
	
	
	
	}
	
	
	
</script>
<style>
	page {
		background: #F9F9F9;
	}
</style>
<style scoped>
	.context {
		box-sizing: border-box;
		padding: 36rpx;
	}
	.list {
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		padding: 0 20rpx;
		border-radius: 20rpx;
	}
	.list .item {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		border-bottom: 1px solid #EEEEEF;
		line-height: 80rpx;
		align-items: center;
	}
	.list .item:nth-child(2) .ipt {
		color: #58BACF;
	}
	.list .item .ipt {
		text-align: right;
		box-sizing: border-box;
		padding-right: 12rpx;
		width: 200rpx;
		line-height: 80rpx;
		color: #939393;
	}
	/* 充值金额 */
	.money {
		box-sizing: border-box;
		padding: 0 20rpx;
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		border-radius: 20rpx;
		margin-top: 24rpx;
	}
	.money .title {
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.money .money-list {
		display: flex;
		flex-wrap: wrap;
	}
	.money .item {
		width: 200rpx;
		height: 130rpx;
		margin-right: 19rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		background: #EBF7FF;
		box-sizing: border-box;
		border: 1px solid #8EC9E4;
		margin-bottom: 24rpx;
		position: relative;
	}
	.money .item .img-bottom {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 200rpx;
		z-index: 10;
	}
	.money .item .img-bottom image {
		width: 100%;
		display: block;
	}
	.money .item:nth-child(3n) {
		margin-right: 0;
	}
	.money .item.active {
		color: #fff;
		background: #00B7CC;
	}
	.notice {
		box-sizing: border-box;
		padding: 0 20rpx;
		font-size: 28rpx;
	}
	.notice .title {
		line-height: 80rpx;
		font-size: 30rpx;
	}
	.notice .item {
		color: #666;
	}
	.btn {
		box-sizing: border-box;
		padding: 60rpx 20%;
		
	}
	.btn view {
		background-image: linear-gradient(180deg, #40AED1, #69D9E4);
		color: #fff;
		font-weight: bold;
		display: flex;
		justify-content: center;
		line-height: 80rpx;
		border-radius: 40rpx;

	}
</style>
