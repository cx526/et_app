<template>
	<view class="btn-content" @tap="btnClick">
		<image :src="img" class="img"></image>
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		img: String
	},
	methods: {
		btnClick() {
			this.$emit('clickHandle')
		}
	}
}
</script>

<style>
.btn-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 12upx 12upx;
}
.img {
	height: 200upx;
	width: 200upx;
}
.title {
	padding-top: 15upx;
	font-size: 30upx;
	color: rgba(74,74,74,1)
}
</style>
