<template>
	<view>
		<!-- 话题简介 -->
		<topicOutline parent="award-list" />
		<view class="comment">
			<scroll-view class="list" scroll-y style="max-height: 515rpx;">
				<view class="title">
					<view class="left">
						<image :src="$aliImage + 'read-line.png'" mode="widthFix"></image>
						<text>获奖名单</text>
					</view>
					
				</view>
				<view class="item" v-for="n in 5" :key="n">
					<view class="left">
						<image :src="userInfo.avatar" mode="widthFix"></image>
					</view>
					<view class="right">
						<view class="context">
							<text class="name">小A小朋友：</text>
						</view>
						<view class="grade-info">
							<text>大良幸福幼儿园  大班3班</text>
						</view>
					</view>
					<view class="vigour">
						<image :src="$aliImage + 'read-vitality.png'" mode=""></image>
						<text>活力值：21</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import topicOutline from '@/components/circle-components/topic-outline.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
			}
		},
		components: {
			topicOutline
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding: 0 25rpx 0 25rpx;
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
	.comment {
		box-sizing: border-box;
		padding: 25rpx;
	}
	.list {
		box-sizing: border-box;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16);
		padding: 0 30rpx;
		background: #fff;
	}
	.title {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		border-bottom: 1px dashed #b3b3b3;
	}
	.title .left {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.title .left image {
		width: 10rpx;
		height: 33rpx;
		margin-right: 12rpx;
	}
	.list .item {
		box-sizing: border-box;
		padding: 32rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 1px dashed #b3b3b3;
	}
	.list .item:last-child {
		border-bottom: 0
	}
	.list .item .left {
		box-sizing: border-box;
		width: 70rpx;
		height: 70rpx;
		margin-right: 28rpx;
		flex-shrink: 0;
	}
	.list .item .left image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 50%;
	}
	.list .item .right {
		box-sizing: border-box;
		flex: 1;
	}
	.list .item .right .context {
		font-size: 24rpx;
	}
	.list .item .right .context .name {
		font-weight: 700;
	}
	.list .item .right .grade-info {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		color: #B3B3B3;
		margin-top: 6rpx;
	}
	.list .item .vigour {
		width: 180rpx;
		height: 36rpx;
		background: #ffffff;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		font-size: 24rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list .item .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
</style>
