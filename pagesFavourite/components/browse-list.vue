<template>
	<view class="list">
		<block v-for="n in 3" :key="n">
			<view class="item">
				<view class="show">
					<image :src="$aliImage + 'xmly-cover-demo.png'" mode=""></image>
				</view>
				<view class="main">
					<view class="title">
						<text>【唐诗市的唐猫猫】第3集_奇怪的风儿【宝宝巴士故事】</text>
						<image :src="$aliImage + 'xmly-play.png'" mode=""></image>
					</view>
					<view class="info">
						<view>
							<image :src="$aliImage + 'xmly-listen.png'" mode=""></image>
							<text>7.77万</text>
						</view>
						<view>
							<image :src="$aliImage + 'xmly-clock.png'" mode=""></image>
							<text>2020.12.18</text>
						</view>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
			}
		}
	}
</script>

<style scoped>
	.list {
		box-sizing: border-box;
	}
	.list .item {
		box-sizing: border-box;
		padding: 16rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx dashed #B3B3B3;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .show {
		flex-shrink: 0;
		margin-right: 30rpx;
		width: 120rpx;
		height: 120rpx;
	}
	.list .item .show image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.list .item .main {
		box-sizing: border-box;
		flex: 1;
		
	}
	.list .item .main .title {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		margin-bottom: 4rpx;
	}
	.list .item .main .title image {
		flex-shrink: 0;
		margin-left: 40rpx;
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.list .item .main .info {
		display: flex;
		align-items: center;
		color: #808080;
		font-size: 20rpx;
	}
	.list .item .main .info view {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-right: 45rpx;
	}
	.list .item .main .info view image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
</style>
