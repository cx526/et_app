<template>
	<view>
		<markUp :title="false" />
		<!-- 评论列表 -->
		<view class="comment">
			<scroll-view class="list" scroll-y style="max-height: 515rpx;">
				<view class="title">
					<view class="left">
						<image :src="$aliImage + 'read-line.png'" mode="widthFix"></image>
						<text>评论</text>
					</view>
					<view class="right">
						<text>共8条</text>
					</view>
				</view>
				<view class="item" v-for="n in 5" :key="n" @tap="handleComment">
					<view class="left">
						<image :src="userInfo.avatar" mode="widthFix"></image>
					</view>
					<view class="right">
						<view class="context">
							<text class="name">小A小朋友：</text>
							<text class="content">这本书非常值得借阅这本书非常值得借阅这本书非常值得借阅</text>
						</view>
						<view class="grade-info">
							<text>大良幸福幼儿园  大班3班</text>
							<text>2020-10-20  08:54</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 评论框 -->
		<view class="comment-input">
			<view class="input">
				<input type="text" placeholder="评论" placeholder-style="font-size: 26rpx" />
				<button type="primary">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import markUp from '@/components/circle-components/mark-up.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo')
			}
		},
		components: {
			markUp
		},
		methods: {
			// 举报/删除打卡
			handleComment() {
				uni.showActionSheet({
					itemList:['举报','删除'],
					success: res => {
						console.log(res)
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report'
							})
						}else if(res.tapIndex === 1) {
							console.log('删除')
						}else {
							return
						}
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding-bottom: 80rpx;
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
	.title .right {
		font-size: 24rpx;
		color: #2AAEC4;
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
	
	.comment-input {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		padding: 12rpx;
		background: #F3F3F3;
	}
	.comment-input .input {
		width: 100%;
		height: 100%;
		display: flex;
	}
	.comment-input .input button {
		font-size: 26rpx;
		margin-left: 6rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.comment-input .input input {
		flex: 1;
		box-sizing: border-box;
		height: 100%;
		background: #FFFFFF;
		padding: 0 6rpx;
		border-radius: 4rpx;
	}
</style>
