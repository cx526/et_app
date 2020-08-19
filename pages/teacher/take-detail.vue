<template>
	<view>
		<view class="list">
			<view class="item">
				<view class="topic">
					<text class="name">小A</text>
					<text class="time">待取书 17:00:00</text>
				</view>
				<view class="books">
					<block v-for="n in 3" :key="n">
						<view class="books-item">
							<view class="books-info">
								<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1590117215765.jpg" mode="widthFix"></image>
								<text class="title">巴巴和圣诞老人</text>
							</view>
							
							<text class="number">x1</text>
						</view>
					</block>
				</view>
			</view>
			
			<view class="item">
				<view class="topic">
					<text class="name">小A</text>
					<text class="time">待取书 17:00:00</text>
				</view>
				<view class="books">
					<block v-for="n in 3" :key="n">
						<view class="books-item">
							<view class="books-info">
								<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1590117215765.jpg" mode="widthFix"></image>
								<text class="title">巴巴和圣诞老人</text>
							</view>
							
							<text class="number">x1</text>
						</view>
					</block>
				</view>
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
			
		}
	}
</script>
<style>
	page {
		background: #ebf8ff;
	}
</style>
<style scoped>
	.list {
		box-sizing: border-box;
		padding: 26rpx 26rpx 0 26rpx;
	}
	.list .item {
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 0 20rpx #ddd;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-bottom: 24rpx;
	}
	.list .item:last-child {
		margin-bottom: 0;
	}
	.list .item .topic {
		box-sizing: border-box;
		padding: 0 14rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #e2e2e2;
		font-size: 30rpx;
	}
	.list .item .name {
		flex: 1;
		font-weight: bold;
	}
	.list .item .time {
		color: #56bed0;
	}
	.list .books {
		box-sizing: border-box;
		padding: 18rpx 14rpx 36rpx 14rpx;
	}
	.list .books .books-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
	}
	.list .books .books-info {
		flex: 1;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.list .books .books-info:last-child {
		margin-bottom: 0;
	}
	.list .books .books-info image {
		width: 120rpx;
		height: 120rpx;
		border: 1px solid #efefef;
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	.list .books .books-info .title {
		font-weight: bold;
	}
	.list .books .number {
		color: #b0b0b0;
	}
</style>
