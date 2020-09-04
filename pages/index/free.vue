<template>
	<view>
		<image :src="$aliImage + 'free-read.png'" mode="widthFix" style="width: 100%;" @tap="go"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage, //静态图片路径
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

<style>

</style>
