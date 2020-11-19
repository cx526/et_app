<template>
	<view>
		<view class="message-box">
			<view class="message">
				<image :src="$aliImage + 'read-inform.png'" mode="widthFix"></image>
				<swiper vertical autoplay circular :interval="2000" disable-touch>
					<swiper-item v-for="(item, index) in rewardList" :key="index">
						<text>{{ item.childName }}参与{{ item.topicTitle }}活力值达成，</text>
						<text v-if="item.reward_shell !== '0' || item.reward_coin !== '0' || item.reward_free !== '0' || item.reward_gift === '' " >
							获得{{ item.reward_shell }}五车贝{{ item.reward_coin }}积分{{ item.reward_free }}免费次数
						</text>
						<text v-else>获得{{ item.reward_gift }}</text>
					</swiper-item>
				
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			rewardList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				$aliImage: this.$aliImage
			}
		},
		watch: {
			rewardList(newVal) {
				this.rewardList = newVal
			}
		},
	}
</script>

<style scoped>
	.message-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-top: 20rpx;
	}
	.message {
		height: 60rpx;
		background: #fff;
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
