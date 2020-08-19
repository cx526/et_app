<template>
	<view>
		<!-- banner -->
		<view class="banner"></view>
		<!-- info -->
		<view class="main">
			<view class="context">
				<view class="topic">
					<image class="bg"
					src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-proxy-return.png" 
					mode="widthFix">
					</image>
					<view class="number">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-06.png" mode="widthFix"></image>
						<text>10</text>
					</view>
				</view>
				<view class="list">
					<scroll-view scroll-y :style="{maxHeight: '640rpx'}">
						<block v-for="n in 10" :key="n">
							<view class="item" @tap="goDeatil">
								<view class="left">
									<text class="name">小A</text>
									<view class="notice">
										<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-08.png" mode="widthFix"></image>
										<text>已逾期3天</text>
									</view>
								</view>
								<view class="right">
									<text class="name">3本</text>
									<image 
									src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" 
									mode="widthFix">
									</image>
								</view>
							</view>
						</block>
					</scroll-view>
				</view>
			</view>	
			<!-- btn -->
			<view class="btn">
				<view>代理凭证</view>
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
			// 详情
			goDeatil() {
				uni.navigateTo({
					url: '/pages/teacher/return-detail'
				})
			},
		}
	}
</script>
<style>
	page {
		background: #ebf8ff;
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
	/* banner */
	.banner {
		height: 300rpx;
		background-image: linear-gradient(to right,#9BE6E7,#7BCFEC);
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	/* info */
	.main {
		box-sizing: border-box;
		padding: 0 32rpx;
		position: relative;
		top: -190rpx;
	}
	.main .context {
		box-sizing: border-box;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx #ddd;
		background: #fff;
	}
	.main .topic {
		box-sizing: border-box;
		position: relative;
	}
	.main .topic .bg {
		width: 100%;
		display: block;
	}
	.main .topic .number  {
		position: absolute;
		bottom: 96rpx;
		right: 48rpx;
		width: 40rpx;
		height: 40rpx;
	}
	.main .topic .number image {
		width: 40rpx;
		height: 40rpx;
	}
	.main .topic .number text {
		position: absolute;
		font-size: 24rpx;
		color: #fff;
		left: 50%;
		top: 48%;
		transform: translate(-50%,-50%);
	}
	.main .list {
		box-sizing: border-box;
		padding: 20rpx 26rpx 0 26rpx;
	}
	.main .list .item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90rpx;
		font-size: 30rpx;
		border-bottom: 1px dashed #b3b3b3;
		padding: 0 12rpx;
	}
	.main .list .item:last-child {
		border-bottom: none;
	}
	.main .list .left {
		flex: 1;
		display: flex;
		align-items: center;
	}
	.main .list .left .notice {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #ccc;
		margin-left: 16rpx;
	}
	.main .list .left .notice image {
		width: 40rpx;
		margin-right: 12rpx;
	}
	.main .list .right {
		flex-shrink: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.main .list .right image {
		width: 30rpx;
		margin-left: 8rpx;
	}
	/* btn */
	.btn {
		box-sizing: border-box;
		padding: 56rpx 25% 0 25%;
	}
	.btn view {
		background-image: linear-gradient(to right, #9BE6E7, #7BCFEC);
		color: #fff;
		line-height: 80rpx;
		font-weight: bold;
		font-size: 34rpx;
		display: flex;
		justify-content: center;
		border-radius: 60rpx;
	}
</style>
