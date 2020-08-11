<template>
	<view>
		<view class="pay-box">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/library-money.png" mode="widthFix" class="banner"></image>
			<view class="context">
				<view class="item">
					<view class="topic">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/library-money-icon01.png" mode="" class="icon"></image>
						<text>五车贝</text>
					</view>
					<view class="number">
						<text>300</text>
					</view>
					<view class="btn" @tap="goPay">
						<text>立即充值</text>
					</view>
				</view>
				
				<view class="item">
					<view class="topic">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/library-money-icon02.png" mode="" class="icon"></image>
						<text>押金</text>
					</view>
					<view class="number">
						<text>29.9</text>
					</view>
					<view class="btn">
						<text>立即提现</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="pay-record">
			<view class="title">
				<text class="line" style="margin-right: 16rpx;"></text>
				<text class="circle" style="margin-right: 20rpx;"></text>
				<text style="margin: 0 40rpx;">五车贝记录</text>
				<text class="circle" style="margin-left: 20rpx;"></text>
				<text class="line" style="margin-left: 16rpx;"></text>
			</view>
			<view class="context">
				<block v-for="n in 3" :key="n">
					<view class="main">
						<view class="item">
							<view class="topic">
								<text>书柜借阅</text>
								<text>-39.00</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">创建时间：2020.07.15</text>
								<text>16:00:00</text>
							</view>
						</view>
					</view>
				</block>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转充值页面
			goPay() {
				uni.navigateTo({
					url: './pay'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
	}
	.pay-box {
		box-sizing: border-box;
		padding-top: 36rpx;
		position: relative;
	}
	.pay-box .banner {
		width: 100%;
	}
	.pay-box .context {
		box-sizing: border-box;
		position: absolute;
		left: 70rpx;
		top: 156rpx;
		color: #fff;
		display: flex;
	}
	.pay-box .context .item {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.pay-box .context .item:nth-child(1) {
		margin-right: 56rpx;
	}
	.pay-box .context .topic {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.pay-box .context .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 8rpx;
	}
	.pay-box .context .number {
		box-sizing: border-box;
/* 		padding: 8rpx 0; */
		font-weight: bold;
		font-size: 60rpx;
	}
	.pay-box .context .btn {
		background: rgba(255,255,255,.4);
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 4rpx 16rpx;
		border-radius: 30rpx;
		text-shadow: 0 0 10rpx #2AAEC4;
		display: inline-block;
	}
	/* 充值记录 */
	.pay-record {
		box-sizing: border-box;
		padding: 36rpx 32rpx;
	}
	.pay-record .title {
		text-align: center;
		font-size: 30rpx;
		margin-bottom: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
		font-weight: bold;
	}
	.pay-record .title .line {
		width: 74rpx;
		background: #CAE6F2;
		height: 1px;
	}
	.pay-record .title .circle {
		width: 16rpx;
		height: 16rpx;
		background: #CAE6F2;
		transform: rotate(45deg);
	}
	.pay-record .context {
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		padding-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.pay-record .context .main {
		box-sizing: border-box;
		padding: 30rpx 22rpx 0 22rpx;
	}
	.pay-record .context .item {
		box-sizing: border-box;
		border-bottom: 1px dashed #ADADAD;
	}
	.pay-record .context .main:last-child .item {
		box-sizing: border-box;
		border-bottom: none;
	}
	.pay-record .context .main:last-child .time {
		margin-bottom: 0;
	}
	.pay-record .context .topic {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		font-size: 30rpx;
		box-sizing: border-box;
		padding: 0 10rpx;
	}
	.pay-record .context .time {
		font-size: 24rpx;
		color: #ADADAD;
		box-sizing: border-box;
		padding: 0 10rpx;
		margin-bottom: 22rpx;
	}
</style>
