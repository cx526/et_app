<template>
	<view>
		<view class="user">
			<view class="left">
				<view class="avatar">
					<image :src="userInfo.avatar" mode="widthFix" class="user-avatar"></image>
				</view>
				<view class="info">
					<view class="name">小A小朋友</view>
					<view class="vigour">
						<image :src="$aliImage+ 'read-vitality.png'" mode=""></image>
						<text>活力值：30</text>
					</view>
				</view>
			</view>
			<view class="right">
				<image :src="$aliImage + 'read-medal-bg.png'" mode="widthFix"></image>
				<text class="number">20</text>
			</view>
		</view>
		<view class="list">
			<scroll-view scroll-y style="max-height: 1032rpx;">
				<view class="item" v-for="n in 20" :key="n">
					<view class="left">
						<view class="rank">
							<text>{{ n+1 > 9 ? n+1 : '0' + (n+1) }}</text>
						</view>
						<image :src="userInfo.avatar"></image>
						<text class="name">小A小朋友</text>
					</view>
					<view class="right">
						<image :src="$aliImage + 'read-medal-No'+(n+1)+'.png'" mode="widthFix" class="medal"
						v-if="(n+1) <= 3"></image>
						<view class="vigour">
							<image :src="$aliImage + 'read-vitality.png'" mode="widthFix"></image>
							<text>活力值：20</text>
						</view>
					</view>
				</view>
			</scroll-view>
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
		methods: {
			
		}
	}
</script>
<style>
	page {
		background: #EBF8FF;
	}
	::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
</style>
<style scoped>
	.user {
		box-sizing: border-box;
		height: 320rpx;
		background-image: linear-gradient(to bottom, #7BCFEC, #9BE6E7);
		border-radius: 0px 0px 30rpx 30rpx;
		padding: 0 56rpx;
		display: flex;
	}
	.user .left {
		flex: 1;
		box-sizing: border-box;
		display: flex;
		padding-top: 70rpx;
		/* align-items: center; */
	}
	.user .right {
		width: 185rpx;
		height: 227rpx;
		box-sizing: border-box;
		flex-shrink: 0;
		position: relative;
	}
	.user .left .avatar {
		width: 105rpx;
		height: 105rpx;
		position: relative;
		background: #fff;
		border-radius: 50%;
		margin-right: 28rpx;
		box-sizing: border-box;
	}
	.user .left .avatar .user-avatar {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 8;
		border-radius: 50%;
	}
	.user .left .info {
		box-sizing: border-box;
	}
	.user .left .name {
		font-size: 30rpx;
		color: #fff;
	}
	.user .left .vigour {
		height: 36rpx;
		width: 180rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 18rpx;
		font-size: 24rpx;
		margin-top: 9rpx;
	}
	.user .left .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.user .right image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.user .right .number {
		font-size: 60rpx;
		color: #2AAEC4;
		left: 56rpx;
		top: 93rpx;
		position: absolute;
	}
	
	.list {
		box-sizing: border-box;
		padding: 0 25rpx;
		position: relative;
		top: -73rpx;
	}
	.list scroll-view {
		box-sizing: border-box;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 6rpx 0px rgba(0,0,0,0.16); 
		padding: 0 30rpx;
	}
	.list .item {
		box-sizing: border-box;
		
		border-bottom: 1px dashed  #b3b3b3;
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .left {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.list .item .left .rank {
		width: 40rpx;
		height: 83rpx;
		background: linear-gradient(180deg,#7bcfec, #9be6e7);
		border-radius: 10rpx 0px 0px 10rpx;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list .item .left image {
		width: 100rpx;
		height: 100rpx;
		margin: 0 20rpx;
		border-radius: 50%;
	}
	.list .item .left .name {
		font-size: 28rpx;
		font-weight: 700;
	}
	.list .item .right {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.list .item .right .medal {
		width: 40rpx;
		height: 50rpx;
		margin-right: 18rpx;
	}
	.list .item .right .vigour {
		width: 180rpx;
		height: 36rpx;
		background: #ffffff;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
	.list .item .right .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
</style>
