<template>
	<view>
		<view class="goods-info">
			<view class="goods">
				<view class="item">
					<text>商品名称</text>
					<text>畅读年卡</text>
				</view>
				<view class="item">
					<text>会员到期日</text>
					<text>2021-09-17</text>
				</view>
				<view class="item">
					<text>可借阅次数</text>
					<text>有效期内无限次借阅</text>
				</view>
			</view>
		</view>
		<view class="goods-info">
			<view class="goods">
				<view class="item">
					<text>金额</text>
					<text style="color: #2AAEC4;">￥328</text>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="left">
				<view style="margin-right: 24rpx;color: #808080;
				font-weight: 700;">
					<text>实付：</text>
					<text style="color: #2AAEC4;">328</text>
					<text>元</text>
				</view>
				<view style="color: #808080;font-size: 20rpx;">
					<text>已优惠：270元</text>
				</view>
			</view>
			<view class="right" @tap="open">
				<text>确认开通</text>
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
			// 立即开通
			open() {
				// 成功支付后跳转页面
				uni.navigateTo({
					url: '/pages/member/member-success'
				})
			},
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		background: #F9F9F9;
		padding-bottom: 100rpx;
	}
</style>
<style scoped>
	.goods-info {
		box-sizing: border-box;
		padding: 24rpx;
	}
	.goods-info .goods {
		box-sizing: border-box;
		background: #fff;
		padding: 0 24rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16); 
		border-radius: 30rpx;
	}
	.goods-info .item {
		box-sizing: border-box;
		display: flex;
		line-height: 90rpx;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
		font-size: 28rpx;
		padding: 0 24rpx;
	}
	.goods-info .item:last-child {
		border-bottom: none;
	}
	.bottom {
		box-sizing: border-box;
		padding: 0 31rpx 0 49rpx;
		position: fixed;
		line-height: 100rpx;
		background: #fff;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bottom .left {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}
	.bottom .right {
		line-height: 60rpx;
		width: 200rpx;
		color: #fff;
		text-align: center;
		font-size: 28rpx;
		font-weight: 700;
		background-image: linear-gradient(to right, #67DCE6, #38B2D1);
		border-radius: 40rpx;
	}
</style>
