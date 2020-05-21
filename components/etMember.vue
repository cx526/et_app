<template>
	<view class="content" >
		<text  style="padding-right: 10upx;">{{title}}</text>
		<view class="tag-style">
			<text>立即办理</text>
		</view>
	</view>
</template>

<script>
import etTag from './etTag.vue'

export default {
	components: {
		etTag
	},
	props: {
		title: String
	},
	methods: {
	
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	border-radius: 20upx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	padding: 5upx ;
	font-size: 30upx;
	font-weight: 400;
}
.tag-style {
	background-color: #CEA76C;
	color: #FFFFFF;
	font-weight: 600;
	font-size: 25upx;
	border-radius: 30upx;
	padding:5upx 20upx;
}
</style>
