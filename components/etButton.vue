<template>
	<view class="btn-content" @tap="btnClick">
		<view class="img-content">
			<view class="count-content" v-if='count'>
				<text>{{count}}</text>
			</view>
			<image :src="img" class="img"></image>
		</view>
		<text class="title">{{title}}</text>
		<text class="buttom-content">{{buttomContent}}</text>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		img: String,
		count: String,
		buttomContent: String
	},
	methods: {
		btnClick() {
			this.$emit('clickHandle')
		}
	}
}
</script>

<style scoped>
.btn-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 12upx 12upx;

}
.img-content {
	position: relative;
}
.count-content {
	width: 30upx;
	height: 30upx;
	background-color: #DD524D;
	border-radius: 50%;
	padding: 8upx;
	color: #FFFFFF;
	font-size: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top:0;
	right: 10upx;
	z-index: 99;
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
.buttom-content {
	font-size: 20upx;
	color: rgba(128,128,128,1)
}
</style>
