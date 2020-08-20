<template>
	<view class="none-context">
		<view class="title">
			您没有相关订单
		</view>
		<view class="topic">
			可以去看看那些书想看的
		</view>
		<image :src="$aliImage+'no-order-list.png'" mode="widthFix" style="width: 500rpx;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,//静态图片域名
			}
		}
	}
</script>

<style>
	.none-context {
		position: relative; 
		top: 100rpx;
		text-align: center
	}
	.title {
		color: #3CAFC7;
		font-size: 30rpx;
		font-weight: blod;
		text-align: center;
		margin-bottom: 24rpx
	}
	.topic {
		font-size: 28rpx;
		text-align: center;
	}
</style>
