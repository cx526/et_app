<template>
	<view class="btn-content">
		<image src="" mode=""></image>
		<text>{{title}}</text>
		<text @tap="btnClick('toUrl')">更多></text>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		img: String,
		toUrl: String
	},
	methods: {
		btnClick(toUrlSting) {
			this.$router.push(toUrlSting)
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
	padding: 12upx 24upx;
}
.img {
	height: 60upx;
	width: 60upx;
}
.title {
	padding-top: 8upx;
	font-size: 24upx;
	color: #333;
}
</style>
