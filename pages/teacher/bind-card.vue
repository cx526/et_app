<template>
	<view>
		<!-- banner -->
		<view class="banner">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-scan.png" mode="widthFix"></image>
		</view>
		<!-- 输入框 -->
		<view class="form">
			<view class="input-box">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-01.png" mode="widthFix"></image>
				<input 
				type="text" 
				placeholder="请扫码绑定童书卡" 
				placeholder-style="color: #666"
				@input="cardNumber"
				class="uni-input" 
				cursor-spacing="40"
				:value="val"/>
				<image 
				src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-02.png" 
				mode="widthFix"
				@tap="scan" ></image>
			</view>
			<view class="btn-box">
				<view class="btn" @tap="cancel">暂不绑卡</view>
				<view class="btn" @tap="login">绑定登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				val: ''
			}
		},
		methods: {
			// 监听input框的输入值
			cardNumber(event) {
				let val = event.detail.value;
				this.val = val;
			},
			// 调用微信扫一扫
			scan() {
				uni.scanCode({
					success: res => {
						console.log(res)
					}
				})
			},
			// 绑卡登录
			login() {
				let val = this.val;
				let identifying = val.substring(2,3);
				console.log(identifying);
				if(val.replace(/\s+/g,"") == '') {
					uni.showToast({
						title: '请输入卡号',
						icon: 'none',
						duration: 2000
					})
					return
				}else if(identifying != 0 && identifying != 1) {
					uni.showToast({
						title: '请核对输入的卡号',
						icon: 'none',
						duration: 2000
					})
					return
				}else if(identifying == 0 && val != '') {
					uni.showToast({
						title: '您的身份是家长',
						icon: 'none',
						duration: 2000,
						success: () => {
							uni.redirectTo({
								url: '/pages/library/tied-card'
							})
						}
					})
				}else {
					uni.showToast({
						title: '您的身份是老师',
						icon: 'none',
						duration: 2000,
						success: () => {
							uni.navigateTo({
								url: '/pages/teacher/create-grade'
							})
						}
					})
				}
			},
			// 暂不绑卡
			cancel() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>
<style>
	page {
		background: #ebf8ff;
	}
</style>
<style scoped>
	/* banner */
	.banner {
		padding-top: 140rpx;
		padding-bottom: 100rpx;
		box-sizing: border-box;
		text-align: center;
	}
	.banner image {
		width: 460rpx;
	}
	/* 输入框 */
	.form {
		box-sizing: border-box;
		padding: 0 50rpx;
	}
	.form .input-box {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: 100rpx;
		padding: 0 28rpx;
		border: 1px solid #e1eef5;
		background: #fff;
		border-radius: 80rpx;
	}
	.form .input-box image {
		flex-shrink: 0;
	}
	.form .input-box image:nth-child(1) {
		margin-right: 20rpx;
		width: 65rpx;
		height: 65rpx;
	}
	.form .input-box image:nth-child(3) {
		margin-left: 20rpx;
		width: 58rpx;
		height: 58rpx;
	}
	.form .input-box input {
		flex: 1;
	}
	.form .btn-box {
		box-sizing: border-box;
		display: flex;
		line-height: 100rpx;
		margin-top: 80rpx;
	}
	.form .btn-box .btn {
		box-sizing: border-box;
		width: calc(50% - 10rpx);
		font-size: 30rpx;
		text-align: center;
		border-radius: 60rpx;
	}
	.form .btn-box .btn:nth-child(1) {
		box-shadow: 0 0 6rpx #dae6ed;
		margin-right: 10rpx;
		background: #fff;
		color: #b3b3b3;
	}
	.form .btn-box .btn:nth-child(2) {
		margin-left: 10rpx;
		color: #fff;
		background-image: linear-gradient(to right, #9BE6E7, #7BCFEC);
		font-weight: bold;
	}
</style>
