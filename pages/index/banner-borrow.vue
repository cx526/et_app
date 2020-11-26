<template>
	<view style="position: relative;">
		<image :src="$aliImage + 'school-borrow.png'" mode="widthFix"  ></image>
		<button  @tap="go"></button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage, //静态图片路径
			}
		},
		onShareAppMessage(res) {
			if(res.from === 'menu') {
				return {
					title: '开学有礼',
					path: '/pages/index/banner-borrow'
				}
			}
		},
		methods: {
			go() {
				uni.switchTab({
					url: '/pages/library'
				})
			}
		}
	}
</script>

<style scoped>
	image {
		display: block;
		position: relative;
		width: 100%;
	}
	button {
		position: absolute;
		z-index: 12;
		left: 50%;
		top: 61%;
		background: transparent;
		width: 240rpx;
		height: 100rpx;
		transform: translateX(-50%);
		border: none;
		
	}
	button:after {
		border: none;
	}
</style>
