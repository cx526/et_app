<template>
	<view>
		<view class="report">
			<view class="item">
				<text class="label">举报原因</text>
				<view style="display: flex;align-items: center;">
					<picker :range="reason" range-key="title">
						<text>{{ reason[reasonIndex].title }}</text>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'"></image>
				</view>
				
			</view>
		</view>
		<view class="btn" >
			<text>立即举报</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				reasonIndex: 0,
				// 1 内容不雅 2 政治不正确 3 反党反社会 4 负能量 5 其他
				reason: [
					{
						title: '内容不雅',
						value: 1
					},
					{
						title: '政治不正确',
						value: 2
					},
					{
						title: '反党反社会',
						value: 3
					},
					{
						title: '负能量',
						value: 4
					},
					{
						title: '其他',
						value: 5
					}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		box-sizing: border-box;
		padding: 25rpx;
		background: #EBF8FF;
	}
</style>
<style scoped>
	.report {
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16);
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.report .item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
	}
	.report .item .label {
		font-weight: 700;
	}
	.report .item image {
		width: 21rpx;
		height: 21rpx;
		margin-left: 4rpx;
	}
	.btn {
		box-sizing: border-box;
		height: 90rpx;
		width: 416rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		background-image: linear-gradient(to right, #67DCE5, #3CB5D2);
		border-radius: 60rpx;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 36rpx;
	}
</style>
