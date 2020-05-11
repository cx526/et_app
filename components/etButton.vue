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
	height: 120upx;
	width: 120upx;
}
.title {
	padding-top: 8upx;
	font-size: 30upx;
	color: rgba(128,128,128,1)
}
</style>
