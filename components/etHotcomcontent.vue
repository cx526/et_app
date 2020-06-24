<template>
	<view class="btn-content" @tap="btnClick">
		<view class="img-content">
			<image :src="dataArr.forGoodsPic[0].url" class="img"></image>
			<!-- <text class="book-count">{{bookCount}}本</text> -->
		</view>
		
		<text class="title">{{dataArr.title}}</text>
	</view>
</template>

<script>
export default {
	props: {
		dataArr: Object
	},
	methods: {
		btnClick() {
			this.$emit('toBookDetail')
		}
	}
}
</script>

<style>
.btn-content {
	width: 205upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 12upx 0;
	border-radius: 8upx;
	box-shadow: 1upx 1upx 1upx 1upx rgba(179,179,179,0.4);
	margin-top: 20upx;
	background-color: #FFFFFF;
	padding-bottom: 20upx;
}
.img-content {
	position: relative;
}
.img {
	height: 180upx;
	width: 180upx;
	border: 1upx solid rgba(179,179,179,0.1);
}
.book-count {
	color: #FFFFFF;
	background-color: rgba(154,152,153,0.5);
	border-top-right-radius:10upx;
	font-size: 28upx;
	position: absolute;
	left: 0;
	bottom: 0;
}
.title {
	width:150upx;
	padding-top: 8upx;
	font-size: 25upx;
	color: rgb(94,94,94);
	
	/* 显示一行，省略号 */
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
}
</style>
