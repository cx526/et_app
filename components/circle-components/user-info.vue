<template>
	<view class="user-box">
		<view class="user">
			<view class="left">
				<!-- 根据身份显示不同的标识，没有登录显示默认头像 -->
				<image :src="$aliImage + 'read-student.png'" class="identity" mode="widthFix"></image>
				<image :src="userInfo.avatar" class="header"></image>
			</view>
			<view class="center">
				<view class="user-name">小A小朋友</view>
				<view class="grade-info">
					<text style="margin-right: 8rpx;">大良幸福幼儿园</text>
					<text>小小班3班</text>
				</view>
			</view>
			<view class="right">
				<view class="vitality">
					<view class="topic">
						<image :src="$aliImage + 'read-vitality.png'" mode="widthFix"></image>
						<text>活力值</text>
					</view>
					<view class="number">28</view>
				</view>
				<view class="message">
					<image :src="$aliImage + 'read-message.png'" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo')
			}
		},
	}
</script>

<style scoped>
	.user-box {
		box-sizing: border-box;
		padding: 62rpx 42rpx 16rpx 42rpx;
	}
	.user {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.user .left {
		box-sizing: border-box;
		width: 150rpx;
		height: 150rpx;
		flex-shrink: 0;
		position: relative;
		margin-right: 16rpx;
	}
	.left .identity {
		width: 100%;
		height: 100%;
		display: block;
	}
	.left .header {
		width: 102rpx;
		height: 102rpx;
		position: absolute;
		left: 49%;
		top: 49%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}
	.user .center {
		box-sizing: border-box;
		flex: 1;
	}
	.center .user-name {
		font-size: 30rpx;
		font-weight: 700;
	}
	.center .grade-info {
		font-size: 22rpx;
		margin-top: 8rpx;
	}
	.user .right {
		flex-shrink: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.right .vitality {
		box-sizing: border-box;
	}
	.vitality .topic {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-weight: 500;
	}
	.vitality .topic image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.vitality .number {
		font-size: 32rpx;
		font-weight: 700;
		color: #2AAEC4;
		text-align: right;
		margin-top: 6rpx;
	}
	.right .message {
		box-sizing: border-box;
		width: 70rpx;
		height: 64rpx;
		margin-left: 36rpx;
	}
	.right .message image {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
