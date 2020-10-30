<template>
	<view class="card-box">
		<view class="card">
			<view class="title" v-if="title">
				<view class="left">
					<image :src="$aliImage + 'read-line.png'" mode="" class="line"></image>
					<text>热门打卡</text>
				</view>
				<view class="right">
					<text>换一批</text>
					<image :src="$aliImage + 'read-reload.png'" mode=""></image>
				</view>
			</view>
			<scroll-view class="list" style="max-height: 1000rpx;" scroll-y>
				<view class="item" v-for="n in 1" :key="n">
					<view class="user">
						<view class="show">
							<image :src="userInfo.avatar" mode=""></image>
						</view>
						<view class="context">
							<view class="preson-info">
								<view class="left">
									<text>小A小朋友</text>
									<view class="vitality">
										<image :src="$aliImage + 'read-vitality.png'" mode=""></image>
										<text>24</text>
									</view>
								</view>
								<view class="right" @tap="handleComment">
									<image :src="$aliImage + 'read-ellipsis.png'" mode=""></image>
								</view>
							</view>
							<view class="grade-info">
								<text style="margin-right: 8rpx;">大良幸福幼儿园</text>
								<text>小小班1班</text>
							</view>
						</view>
						
					</view>
					<view class="content">
						<text style="color: #2AAEC4;margin-right: 10rpx;">#活力打卡#</text>
						<text>我今天和爸爸一起看了《巴巴和圣诞老人》</text>
					</view>
					<view class="photo">
						<image :src="$aliImage + 'read-upload.png'"></image>
						<image :src="$aliImage + 'read-upload.png'"></image>
						<image :src="$aliImage + 'read-upload.png'"></image>
						<image :src="$aliImage + 'read-upload.png'"></image>
					</view>
					<view class="comment">
						<text class="time">2020-10-28 10:06</text>
						<view class="detail">
							<view class="comment-item" v-for="(item, index) in commentList" :key="index" @tap="handleClick(index)">
								<image :src="$aliImage + item.imgUrl"></image>
								<text>{{ item.title }}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 控制是否显示标题
			title: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				commentList: [
					{
						imgUrl: 'read-like.png',
						title: '点赞'
					},
					{
						imgUrl: 'read-comment.png',
						title: '评论'
					},
					{
						imgUrl: 'read-share.png',
						title: '分享'
					}
				],
			}
		},
		methods: {
			// 点赞、评论、分享打卡
			handleClick(index) {
				switch(index) {
					case 0:
					console.log('点赞')
					break
					case 1:
					this.$emit('comment')
					break
					case 2:
					console.log('分享')
					break
					default:
					return
				}
			},
			// 点击缩略点
			handleComment() {
				this.$emit('handleComment')
			}
		}
		
	}
</script>
<style>
	::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
</style>
<style scoped>
	.card-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-top: 24rpx;
	}
	.card {
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16); 
	}
	.title {
		height: 72rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(112,112,112,.2);
	}
	.title .left {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}
	.title .left .line {
		width: 10rpx;
		height: 33rpx;
		margin-right: 10rpx;
	}
	.title .right {
		font-size: 24rpx;
		color: #2AAEC4;
		display: flex;
		align-items: center;
	}
	.title .right image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	.list {
		box-sizing: border-box;
	}
	.list .item {
		box-sizing: border-box;
		padding: 48rpx 0;
		border-bottom: 1px solid rgba(112,112,112,.2);
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.item .user {
		display: flex;
		align-items: center;
	}
	.user .show {
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		margin-right: 10rpx;
	}
	.user .show image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.item .context {
		flex: 1;
	}
	.item .context .preson-info {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item .context .preson-info .left {
		font-size: 30rpx;
		font-weight: 700;
		display: flex;
		flex: 1;
		align-items: center;
	}
	.item .context .preson-info .right {
		width: 30rpx;
		height: 30rpx;
		flex-shrink: 0;
	}
	.item .context .preson-info .left .vitality {
		width: 86rpx;
		height: 32rpx;
		background: #ebf8ff;
		border-radius: 16rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10rpx;
		font-weight: normal;
	}
	.item .context .preson-info .left image {
		width: 16rpx;
		height: 27rpx;
	}
	.item .context .preson-info .right image {
		width: 100%;
		height: 100%;
	}
	.item .context .grade-info {
		color: #2AAEC4;
		font-size: 22rpx;
		margin-top: 4rpx;
	}
	.item .content {
		font-size: 24rpx;
		margin-top: 40rpx;
		/* margin-bottom: 20rpx; */
	}
	.item .photo {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	.item .photo image {
		width: 200rpx;
		height: 200rpx;
		margin-top: 20rpx;
		margin-right: 20rpx;
		display: block;
	}
	.item .photo image:nth-child(3n) {
		margin-right: 0;
	}
	.item .comment {
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		color: #808080;
		margin-top: 20rpx;
	}
	.item .comment .detail {
		display: flex;
		align-items: center;
	}
	.item .comment .detail .comment-item {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
	}
	.item .comment .detail .comment-item:last-child {
		margin-right: 0;
	}
	.item .comment .detail .comment-item image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 4rpx;
	}
</style>
