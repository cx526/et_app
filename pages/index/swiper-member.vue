<template>
	<view style="position: relative;">
		<image :src="$aliImage + 'member-plan.png'" mode="widthFix" style="width: 100%;"></image>
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
