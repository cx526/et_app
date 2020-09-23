<template>
	<view>
		<view class="goods-info">
			<view class="goods">
				<view class="item">
					<text>商品名称</text>
					<text>{{ name }}</text>
				</view>
				<!-- <view class="item">
					<text>会员到期日</text>
					<text>2021-09-17</text>
				</view> -->
				<view class="item">
					<text>可借阅次数</text>
					<text>有效期内无限次借阅</text>
				</view>
			</view>
		</view>
		<view class="goods-info">
			<view class="goods">
				<view class="item">
					<text>金额</text>
					<text style="color: #2AAEC4;">￥{{ price }}</text>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left">
				<view style="margin-right: 24rpx;color: #808080;
				font-weight: 700;">
					<text>实付：</text>
					<text style="color: #2AAEC4;">{{ price }}</text>
					<text>元</text>
				</view>
				<!-- <view style="color: #808080;font-size: 20rpx;">
					<text>已优惠：270元</text>
				</view> -->
			</view>
			<view class="right" @tap="open">
				<text>确认开通</text>
			</view>
		</view>
	</view>
</template>

<script>
	const wxPay = require('@/common/wxPay')
	export default {
		data() {
			return {
				name: '',//会员卡名称
				price: 0.01,//会员卡价格
				id: '',//会员卡id
				userInfo: uni.getStorageSync("userInfo"),//个人信息
				order_no : '',//购买订单号
			}
		},
		onLoad(option) {
			let memberInfo = JSON.parse(option.param)
			this.name = memberInfo.name //会员卡名称
			// this.price = memberInfo.price //会员卡价格
			this.id = memberInfo.id //会员卡id
			// 获取用户个人信息(id)
			this.getUserInfo()
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				let mobile = this.userInfo.mobile
				if(mobile && mobile != '') {
					this.$api.offlineUserDockerInfo({ mobile })
					.then(res => {
						console.log(res)
						this.userInfo.id = res.data.id
					})
				}else {
					uni.showToast({
						title: '请前往授权登录',
						icon: 'none',
						duration: 1500,
						success: () => {
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					})
				}
			},
			// 购买会员
			buyMemberCard() {
				uni.showLoading({
					title: '提交订单中',
					mask: true
				})
				let param = {
					userInfo: this.userInfo,
					member_id: String(this.id),
					price: String(this.price)
				}
				this.$api.buyMemberCard(param).then(res => {
					uni.hideLoading()
					console.log(res)
					let resData = res.data.finalRes.xml
					this.order_no = res.data.order_no //订单号
					if(resData.return_code[0] === 'SUCCESS') {
						// 调起微信支付
						this.updatePayment(resData.prepay_id[0])
					}
				})
			},
			// 微信支付
			updatePayment(prepay_id) {
				uni.showLoading({
					title: '发起支付',
					mask: true
				})
				console.log(prepay_id)
				// 获取微信签名
				let {paySign, time, APPID, nonceStr}= wxPay.wxReSign(prepay_id)
				wxPay.wxPay(time, nonceStr, prepay_id, paySign,
					// 成功回调
					res => {
						console.log(res)
						if(res.errMsg === "requestPayment:ok") {
							let param = {
								userInfo: {
									id: String(this.userInfo.id)
								},
								order_no: this.order_no
							}
							this.$api.updatePaymentCard(param).then(res => {
								uni.hideLoading()
								console.log(res)
								if(res.data.status === 'ok') {
									uni.showToast({
										title: '购买成功',
										duration: 1500
									})
									//成功支付后跳转页面
									uni.redirectTo({
										url: '/pages/member/member-success'
									})
								}else {
									uni.showToast({
										title: res.data.msg
									})
								}
							})
						}
					},
					// 失败回调
					error => {
						uni.hideLoading()
						uni.showToast({
							title: '支付失败',
							icon: 'none',
							duration: 2000
						})
					}
				)
			},
			// 立即开通
			open() {
				this.buyMemberCard()
				console.log(this.userInfo)
				
			},
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		background: #F9F9F9;
		padding-bottom: 100rpx;
	}
</style>
<style scoped>
	.goods-info {
		box-sizing: border-box;
		padding: 24rpx;
	}
	.goods-info .goods {
		box-sizing: border-box;
		background: #fff;
		padding: 0 24rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16); 
		border-radius: 30rpx;
	}
	.goods-info .item {
		box-sizing: border-box;
		display: flex;
		line-height: 90rpx;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
		font-size: 28rpx;
		padding: 0 24rpx;
	}
	.goods-info .item:last-child {
		border-bottom: none;
	}
	.bottom {
		box-sizing: border-box;
		padding: 0 31rpx 0 49rpx;
		position: fixed;
		line-height: 100rpx;
		background: #fff;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bottom .left {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}
	.bottom .right {
		line-height: 60rpx;
		width: 200rpx;
		color: #fff;
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
		background-image: linear-gradient(to right, #67DCE6, #38B2D1);
		border-radius: 40rpx;
	}
</style>
