<template>
	<view>
		<view class="list">
			<view class="item">
				<view class="left">
					<text class="title">智能借书柜借阅</text>
					<text class="time">创建时间：2020-7-15 16：00：00</text>
				</view>
				<view class="right">
					<text>-39.99</text>
				</view>
			</view>
			<view class="item">
				<view class="left">
					<text class="title">充值</text>
					<text class="time">创建时间：2020-7-15 16：00：00</text>
				</view>
				<view class="right">
					<text>+99</text>
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
		background: rgb(245,245,245);
	}
	.list {
		box-sizing: border-box;
		padding: 20rpx;
	}
	.list .item {
		background: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx;
		margin-bottom: 24rpx;
		border-radius: 8rpx;
	}
	.list .item .left {
		display: flex;
		flex-direction: column;
	}
	.list .item .title {
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 12rpx;
	}
	.list .item .time {
		font-size: 26rpx;
		color: #999;
	}
	.list .item .right {
		font-size: 28rpx;
	}
</style>
