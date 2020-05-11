<template>
	<view class="btn-content">
		<view class="btn-content-top">
			<image class="btn-start" :src="img" mode=""></image>
			<text class="btn-title">{{title}}</text>
		</view>
		<text class="btn-url" @tap="btnClick('toUrl')">更多></text>
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
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 12upx 40upx;
}
.btn-content-top {
	display: flex;
	align-items:center;
}
.btn-start {
	height: 40upx;
	width: 40upx;
}
.btn-title,.btn-url {
	font-size: 32upx;
}
.btn-title {
	font-weight: bold;
	margin-left: 20upx;
}
.btn-url {
	color: rgba(42,174,196,1);
}
</style>
