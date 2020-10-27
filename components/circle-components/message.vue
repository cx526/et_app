<template>
	<view>
		<view class="message-box">
			<view class="message">
				<image :src="$aliImage + 'read-inform.png'" mode="widthFix"></image>
				<swiper vertical autoplay circular :interval="2000" disable-touch>
					<swiper-item>
						<text>小朋友参与什么阅读话题活力值达成，获得50五车贝获得50五车贝获得50五车贝</text>
					</swiper-item>
					<swiper-item>
						<text>小朋友参与什么阅读话题活力值达成，获得50五车贝</text>
					</swiper-item>
					<swiper-item>
						<text>小朋友参与什么阅读话题活力值达成，获得50五车贝</text>
					</swiper-item>
				</swiper>
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
		}
	}
</script>

<style scoped>
	.message-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin: 20rpx 0;
	}
	.message {
		height: 60rpx;
		background: #fffbe6;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16); 
		display: flex;
		align-items: center;
		padding: 0 40rpx;
	}
	.message image {
		flex-shrink: 0;
		display: block;
		width: 48rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	.message swiper {
		flex: 1;
		box-sizing: border-box;
		font-size: 22rpx;
		color: #2AAEC4;
		height: 100%;
		line-height: 60rpx;
	}
	.message swiper swiper-item {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
