<template>
	<view class="btn-content" @tap="btnClick">
		<view class="img-content">
			<image :src=img class="img"></image>
		</view>
		
		<view class="font-content">
			<view class="title">
				<text>{{title}}</text>
			</view>			
			<view class="tag-style">
				<text class="tag-content"  v-for="(item,i) in tag" :key="i">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		bookCount: String,
		img: String,
		tag: Array
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
	width: 300upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20upx 24upx;
	border-radius: 8px;
	box-shadow: 0upx 0upx 20upx rgba(179,179,179,0.3);
	margin-top: 30upx;
}
.img-content {
	position: relative;
	width: 260upx;
	height: 280upx;
	background-color: rgba(179,179,179,1);
}
.img {
	height: 280upx;
	width: 260upx;
	border: 1upx solid rgba(179,179,179,0.1);
}
.font-content {
	width:260upx;
	padding-top: 10upx;
}
.title {
	width:260upx;
	padding-top: 8upx;
	font-size: 30upx;
	color: rgb(94,94,94);
	
	/* 显示一行，省略号 */
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
}
.tag-style {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding-top: 10upx;
}
.tag-content {
	color: rgba(179,179,179,1);
	border: 1px solid rgba(179,179,179,1);
	border-radius: 8upx;
	padding: 5upx;
	margin-right: 10upx;
	font-size: 24upx;
}
</style>
