<template>
	<view>
		<view class="banner">
			<image :src="$aliImage + 'member-success.png'" 
			mode="widthFix"></image>
		</view>
		<view class="topic">
			<text style="color: #2AAEC4;">畅读年卡</text>
			<text>办理成功</text>
		</view>
		<view class="btn">
			<view @tap="borrow">立即借阅</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage
			}
		},
		methods: {
			// 立即借阅
			borrow() {
				uni.switchTab({
					url: '/pages/library/library'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
	}
</style>
<style scoped>
	.banner image {
		width: 100%;
	}
	.topic {
		box-sizing: border-box;
		padding: 60rpx 0;
		font-size: 36rpx;
		font-weight: 700;
		text-align: center;
	}
	.btn {
		box-sizing: border-box;
		text-align: center;
	}
	.btn view {
		display: inline-block;
		width: 416rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 28rpx;
		text-align: center;
		border-radius: 60rpx;
		font-weight: 700;
		background-image: linear-gradient(to right, #67DCE6, #38B2D1);
	}
</style>
