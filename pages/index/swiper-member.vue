<template>
	<view style="position: relative;">
		<image :src="$aliImage + 'member-plan-banner.png'" mode="widthFix" style="width: 100%;"></image>
		<view class="btn" @tap="goMember"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage
			}
		},
		onShareAppMessage(res) {
			if(res.from === 'menu') {
				return {
					title: '会员计划',
					path: '/pages/index/swiper-member'
				}
			}
		},
		methods: {
			goMember() {
				uni.navigateTo({
					url: '/pages/member/member'
				})
			}
		}
	}
</script>

<style scoped>
	.btn {
		position: absolute;
		bottom: 145rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 300rpx;
		height: 80rpx;
		background: transparent;
		z-index: 8;
	}
</style>
