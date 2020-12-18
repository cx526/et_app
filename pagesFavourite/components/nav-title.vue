<template>
	<view class="title">
		<view class="main">
			<view class="line"></view>
			<text>{{ title }}</text>
		</view>
		
		<view class="more" v-if="isShow" @tap="checkMore">
			<text>更多</text>
			<image :src="$aliImage + 'xmly-icon-right.png'" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
			}
		},
		props: {
			title: String,
			isShow: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			// 点击更多
			checkMore() {
				this.$emit('checkMore')
			}
		}
	}
</script>

<style scoped>
	.title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2rpx dashed #b3b3b3;
		line-height: 70rpx;
	}
	.title .main {
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.title .main .line {
		width: 10rpx;
		height: 34rpx;
		background-image: linear-gradient(to bottom, #7BCFEC, #9BE6E7);
		flex-shrink: 0;
		margin-right: 12rpx;
		border-radius: 16rpx;
	}
	.title .more {
		font-size: 24rpx;
		color: #2AAEC4;
		display: flex;
		align-items: center;
	}
	.title .more image {
		width: 20rpx;
		height: 20rpx;
		margin-left: 10rpx;
	}
</style>
