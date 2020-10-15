<template>
	<view class="context">
		<image class="banner" mode="widthFix" :src="$aliImage + 'member-extand.png'" @tap="goMember"></image>
		<view class="list">
			<view class="item">
				<view class="label">
					<text>充值金额</text>
				</view>
				<view class="ipt">
					<input type="number" :value="value" 
					:disabled="flag" 
					@input="customMoney"/>
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>充值五车贝</text>
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
						<image :src="$aliImage + 'library-pay-number.png'" mode="widthFix"
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
				<text>2.一元人民币可充值10五车贝（单次充值不低于10元）</text>
			</view>
			<view class="item">
				<text>3.充值后不可提现</text>
			</view>
			<!-- <view class="item">
				<text>4.首次线下借阅需要提交29元押金（线上已提交过且押金大于29元的不需要再次提交押金，押金可退）</text>
			</view> -->
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<view type="default" @tap="sure">确认充值</view>
		</view>
	</view>
</template>

<script>
	const wxPay = require('@/common/wxPay')
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				flag: true,
				value: 10, //充值金额
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
				userInfo: '', //储存用户个人账户信息
				deposit: 0, //押金
				totalMoney: 0, //充值金额+押金
			}
		},
		onLoad() {
			// 获取用户个人信息
			this.getUserInfo()
		},
		methods: {
			// 自定义输入金额
			customMoney(event) {
				this.value = (+event.detail.value);
			},
			// 跳转会员列表页
			goMember() {
				uni.navigateTo({
					url: '/pages/member/member'
				})
			},
			// 改变充值金额
			changeMoney(index) {
				if(index == 2 || index == 3 || index == 4) {
					uni.showToast({
						title: '畅读年卡无限次会员借阅更优惠哦',
						icon: 'none',
						duration: 2000
					})
				}
				// 点击index
				this.moneyList.currentIndex = index;
				if(index !== 5) {
					this.value = this.moneyList.list[index].money;
					this.flag = true
				}else {
					this.flag = false;
					this.value = ''
				}
			},
			// 获取用户账户信息
			getUserInfo() {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({ filterItems: { mobile } }).then(res => {
					this.userInfo = res.data[0];
				})
			},
			// 点击确认充值
			sure() {
				if(this.value == '' && this.value !== 0) {
					uni.showToast({
						title: '充值金额不能为空',
						icon: 'none'
					})
					return
				}
				// 充值金额小于10
				else if(this.value < 10) {
					uni.showToast({
						title: '充值金额不能小于10元',
						icon: 'none'
					})
					return
				}
				// 没有支付过押金(押金已有单独充值入口)
				// else if(this.userInfo.deposit < 29) {
				// 	uni.showModal({
				// 		title: '您还没提交过押金(押金可退)',
				// 		content: '需要在充值金额上累加29元押金',
				// 		success: res => {
				// 			if(res.confirm) {
				// 				let deposit = this.userInfo.deposit >= 29 ? 0 : 29
				// 				this.totalMoney = deposit + this.value;
				// 				// 调起支付
				// 				this.goPay()
				// 			}else {
				// 				uni.showToast({
				// 					title: '支付失败',
				// 					icon: 'none',
				// 					duration: 2000
				// 				})
				// 			}
				// 		}
				// 	})
				// 	return
				// }
				this.goPay()
			},
			// 充值
			async goPay() {	
				// 计算押金
				// let deposit = this.userInfo.deposit >= 29 ? 0 : 29
				// 计算总金额
				this.totalMoney = this.value;
				uni.showLoading({
					title: '发起支付中',
					mask: true
				})
				let id = this.userInfo.id;
				let userInfo = uni.getStorageSync("userInfo");
				userInfo.id = id; // 个人id
				let resData = '';
				let order_no = '';//订单号
				// 从后台读取订单号
				await this.$api.offlinePayMent({
					userInfo: userInfo,
					shell: Number(this.value) * 10, //五车贝
					deposit: 0, //押金
					totalMoney: this.totalMoney, // 充值金额
					event: "recharge"
				})
				.then(res => {
					resData = res.data.finalRes.xml
					order_no = res.data.order_no;
				})
				if(resData.return_code[0] === 'SUCCESS') {
					// 获取微信签名
					let { paySign, time, APPID, nonceStr } = wxPay.wxReSign(resData.prepay_id[0]);
					// 调起微信支付
					wxPay.wxPay(time, nonceStr, resData.prepay_id[0], paySign,
						res => {
							if(res.errMsg === "requestPayment:ok") {
								this.$api.offlineUpdatePayMent({
									userInfo: userInfo,//个人信息
									event: "recharge",//充值类型
									order_no: order_no,//订单号
									shell: this.value * 10, //充值金额
									deposit: 0, //押金
									totalMoney: this.totalMoney, // 充值金额+押金
								}).then(res => {
									uni.hideLoading()
									// 跳转到我的钱包页
									uni.redirectTo({
										url: './virtual'
									})
								})
							}
						},
						err => {
							uni.hideLoading();
							uni.showToast({
								title: '支付失败',
								icon: 'none',
								duration: 2000
							})
							console.log(err)
						}
					)
				}

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
	.banner {
		display: block;
		width: 100%;
		margin-bottom: 20rpx;
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
		width: 196rpx;
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
