<template>
	<view>
		<view class="order-box">
			<view class="order" v-for="n in 3" :key="n">
				<view class="left">
					<image :src="$aliImage + 'book-demo.png'" mode="widthFix">
					</image>
				</view>
				<view class="right">
					<view class="topic">
						<text style="font-weight: 700;">巴巴和圣诞老人</text>
						<text style="color: #2AAEC4;">39.9贝</text>
					</view>
					<view class="number">
						<text>x1</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background: #f9f9f9;
	}
</style>
<style scoped>
	.order-box {
		box-sizing: border-box;
		padding: 34rpx 24rpx 0  24rpx;
	}
	.order {
		box-sizing: border-box;
		background: #fff;
		padding: 10rpx 36rpx 10rpx 26rpx;
		display: flex;
		border-radius: 20rpx;
		box-shadow: 0px 0px 3rpx 0px rgba(0,0,0,0.1); 
		margin-bottom: 14rpx;
	}
	.order-box .left {
		flex-shrink: 0;
		box-sizing: border-box;
		margin-right: 20rpx;
	}
	.order-box .left image {
		width: 120rpx;
		height: 120rpx;
		display: block;
	}
	.order-box .right {
		flex: 1;
	}
	.order-box .right .topic {
		box-sizing: border-box;
		padding-top: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}
	.order-box .right .number {
		text-align: right;
		color: #808080;
		font-size: 28rpx;
		margin-top: 10rpx;
	}
</style>
