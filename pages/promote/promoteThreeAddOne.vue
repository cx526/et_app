<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_threeAddOne.png" style="width: 100%;" mode="widthFix"></image>
		<!-- <view class="content-kan" @tap="toKanUrl"></view> -->
		<view class="content-button" @tap="toUrl"></view>
	</view>
</template>

<script>
const toUrlFunction = require('@/common/toUrlFunction');

export default {
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		toUrl() {
			toUrlFunction.toUrl('/pages/index/kind');
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #CAE6CE;
	position: relative;
}
.content-kan {
	width: 600UPX;
	height: 400upx;
	position: absolute;
	bottom: 300upx;
	left: 50upx;
	/* background-color: #007AFF; */
}
.content-button {
	width: 430UPX;
	height: 110upx;
	position: absolute;
	bottom: 90upx;
	/* background-color: #007AFF; */
}
</style>
