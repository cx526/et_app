<template>
	<view class="content" >
		<view class="img-content-position">
			<image class="img-content" v-for="(item,index) in imgInfo" :key="index" :src="item.imgUrl" ></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		imgInfo: Array
	},
	methods: {
	
	}
}
</script>

<style>
.content {
	width: 100%;
}
.img-content-position {
	width: 300upx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}
.img-content {
	width: 50upx;
	height: 50upx;
	margin-left: -30upx;
}
</style>
