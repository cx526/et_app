<template>
	<view>
		<userInfo parent="my-remark" @chooseItem="chooseItem" :custom_type="custom_type" />
		<view class="list">
			<scroll-view scroll-y style="max-height: 1000rpx;">
				<view class="item" v-for="n in 10" :key="n" @tap="checkTopicDetail">
					<view class="time">
						<text>18</text>
						<text>10月</text>
					</view>
					<image :src="$aliImage + 'read-demo.png'" mode="widthFix"></image>
					<view class="context">
						<view class="type">#活力打卡</view>
						<view class="content">我今天和爸爸一起看了《巴巴和圣诞老人》,画风好可爱呀我今天和爸爸一起看了《巴巴和圣诞老人》,画风好可爱呀我今天和爸爸一起看了《巴巴和圣诞老人》,画风好可爱呀</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import userInfo from '@/components/circle-components/user-info.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				custom_type: ''
			}
		},
		components: {
			userInfo
		},
		onLoad(options) {
			this.custom_type = options.custom_type
		},
		methods: {
			// 查看话题详情
			checkTopicDetail() {
				uni.navigateTo({
					url: '/pages/circle/topic-detail'
				})
			},
			chooseItem() {
				
			}
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		padding-bottom: 60rpx;
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
	.list {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	.list scroll-view {
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16);
		 box-sizing: border-box;
		 padding: 0 30rpx;
	}
	.list .item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 25rpx 0;
		border-bottom: 1px dashed #B3B3B3;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .time {
		flex-shrink: 0;
	}
	.list .item .time text:nth-child(1) {
		font-size: 40rpx;
		font-weight: 700;
	}
	.list .item .time text:nth-child(2) {
		font-size: 18rpx;
	}
	.list .item image {
		width: 150rpx;
		height: 150rpx;
		margin-left: 13rpx;
		margin-right: 18rpx;
		flex-shrink: 0;
	}
	.list .item .context {
		font-size: 22rpx;
		flex: 1;
		overflow: hidden;
	}
	.list .item .context .type {
		color: #2AAEC4;
		margin-bottom: 4rpx;
	}
	.list .item .context .content {
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
