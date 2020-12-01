<template>
	<view class="btn">
		<text @click="handleClick">{{ title }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			}
		},
		methods: {
			handleClick() {
				this.$emit('handleClick')
			}
		}
	}
</script>

<style scoped>
	.btn {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
	}
	.btn text {
		box-sizing: border-box;
		line-height: 90rpx;
		width: 416rpx;
		font-size: 30rpx;
		background-image: linear-gradient(to right, #67DCE5, #39B3D1);
		border-radius: 60rpx;
		color: #fff;
		font-weight: 700;
		text-align: center;
	}
</style>
