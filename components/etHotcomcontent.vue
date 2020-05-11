<template>
	<view class="btn-content" @tap="btnClick">
		<!-- <image :src="img" class="img"></image> -->
		<text class="book-count">{{bookCount}}本</text>
		<text class="title">{{title}}</text>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		bookCount: String,
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
	padding: 12upx 24upx;
}
.img {
	height: 60upx;
	width: 60upx;
}
.book-count{

}
.title {
	padding-top: 8upx;
	font-size: 24upx;
	color: #333;
}
</style>
