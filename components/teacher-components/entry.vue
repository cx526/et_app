<template>
	<view>
		<!-- userInfo -->
		<view class="userInfo-box">
			<view class="userInfo">
				<image class="banner"
				src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-entry-bg.png"
				mode="widthFix">
				</image>
				<view class="main">
					<view class="context">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/user-default.png" mode="widthFix" class="default"></image>
						<view class="user">
							<view class="name">王老师</view>
							<view class="number">ET08765876</view>
						</view>
						<image 
						src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-03.png" 
						mode="widthFix" 
						class="edit"
						@tap="edit">
						</image>
					</view>
				</view>
			</view>
		</view>
		<!-- adhibition -->
		<view class="adhibition-box">
			<view class="adhibition">
				<view class="topic">
					<view class="main" >
						<view class="line"></view>
						<view>
							我的应用
						</view>
					</view>
					
				</view>
				<view class="list">
					<block 
					v-for="(item,index) in adhibitionList" 
					:key="index">
						<view class="item" @tap="goSubPage(index)">
							<image :src="item.imgUrl" mode="widthFix"></image>
							<view class="text">
								{{item.text}}
							</view>
							<view class="badge" v-if="item.number">
								<uni-badge
								size="small"
								:text="item.number" 
								type="error"></uni-badge>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		data() {
			return {
				adhibitionList: [
					{
						imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-entry-01.png',
						text: '我的班级'
					},
					{
						imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-entry-02.png',
						text: '待取书单',
						number: 8
					},
					{
						imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-entry-03.png',
						text: '代还书单',
						number: 10
					},
					{
						imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-entry-04.png',
						text: '订单凭证'
					}
				],
			}
		},
		components: {
			uniBadge
		},
		methods: {
			// 编辑
			edit() {
				uni.navigateTo({
					url: '/pages/teacher/edit-info'
				})
			},
			// 跳转子页面
			goSubPage(index) {
				switch(index) {
					case 0:
					uni.navigateTo({
						url: '/pages/teacher/my-grade'
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background: #f9f9f9;
	}
</style>
<style scoped>
	/* userInfo */
	.userInfo-box {
		box-sizing: border-box;
		padding: 32rpx;
	}
	.userInfo-box .userInfo {
		box-sizing: border-box;
		position: relative;
	}
	.userInfo-box .userInfo .banner {
		width: 100%;
	}
	.userInfo-box .userInfo .main {
		position: absolute;
		box-sizing: border-box;
		padding: 80rpx 44rpx 0 44rpx;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.userInfo-box  .main .context {
		width: 100%;
		align-items: center;
		display: flex;
	}
	.userInfo-box .main .context .default {
		width: 110rpx;
		height: 110rpx;
		flex-shrink: 0;
		margin-right: 28rpx;
	}
	.userInfo-box .main .context .edit {
		width: 40rpx;
		height: 40rpx;
		flex-shrink: 0;
		position: relative;
		top: -28rpx;
	}
	.userInfo-box .main .context .user {
		box-sizing: border-box;
		flex: 1;
		color: #fff;
	}
	.userInfo-box .main .context .name {
		font-size: 30rpx;
		margin-left: 12rpx;
		font-weight: bold;
	}
	.userInfo-box .main .context .number {
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 2rpx 24rpx;
		border-radius: 24rpx;
		margin-top: 6rpx;
		background: rgba(0,0,0,0.3);
		display: inline-block;
	}
	/* adhibition */
	.adhibition-box {
		box-sizing: border-box;
		padding: 0 32rpx;
	}
	.adhibition-box .adhibition {
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 0 12rpx #f0f0f0;
		border-radius: 20rpx;
	}
	.adhibition-box .topic {
		box-sizing: border-box;
		padding: 0 26rpx;
	}
	.adhibition-box .main {
		line-height: 70rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #e2e2e2;
	}
	.adhibition-box .line {
		width: 10rpx;
		height: 36rpx;
		background-image: linear-gradient(to bottom,#3ab4d2, #66dbe5);
		flex-shrink: 0;
		margin-right: 12rpx;
		border-radius: 8rpx;
	}
	.adhibition-box .list {
		box-sizing: border-box;
		padding: 20rpx 26rpx 40rpx 26rpx;
		display: flex;
		justify-content: space-between;
	}
	.adhibition-box .list .item {
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		color: #999;
		position: relative;
	}
	.adhibition-box .list .item image {
		width: 90rpx;
		height: 90rpx;
		margin-bottom: 8rpx;
	}
	.adhibition-box .list .item .badge {
		position: absolute;
		right: 0;
		top: 0;
	}
</style>