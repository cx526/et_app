<template>
	<view class="btn-content" @tap="btnClick">
		<view class="img-content">
			<image :src="dataArr.forGoodsPic[0].url" class="img"></image>
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

<style scoped>
.btn-content {
	width: 150upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.img-content {
	margin-left: 20upx;
}
.img {
	height: 150upx;
	width: 150upx;
}
.title {
	width:150upx;
	padding-top: 8upx;
	font-size: 20upx;
	color: rgb(94,94,94);
	text-align: center;
	
	/* 显示一行，省略号 */
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
}
</style>
