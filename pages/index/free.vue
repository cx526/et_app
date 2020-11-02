<template>
	<view style="position: relative;">
		<image :src="$aliImage + 'index-free-03.png'" mode="widthFix"  ></image>
		<button  @tap="go"></button>
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log(option.imgURL)
			this.src = option.imgURL
		},
		onShareAppMessage(res) {
			if(res.from === 'menu') {
				return {
					title: '专享免费借阅',
					path: '/pages/index/free'
				}
			}
		},
		data() {
			return {
				$aliImage: this.$aliImage, //静态图片路径
				src: ''
			}
		},
		methods: {
			go() {
				uni.switchTab({
					url: '/pages/library/library'
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
		top: 58%;
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
