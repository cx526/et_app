<template>
	<view :style="{ backgroundColor: backgroundColor, color: fontColor }" class="content" >
		<text class="title-content">{{title}}</text>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		backgroundColor: String,
		fontColor: String
	},
	methods: {
	
	}
}
</script>

<style>
.content {
	border-radius: 20upx;
	display: flex;
	justify-items: center;
	align-items: center;
	text-align: center;
	padding: 5upx 10rpx ;
	box-sizing: border-box;
	
}
.title-content {
	font-size: 23upx;
	margin: 0 auto;
}
</style>
