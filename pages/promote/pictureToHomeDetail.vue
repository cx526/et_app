<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_pictureToHome_detail.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-kan" @tap="toKanUrl"></view>
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
			uni.navigateTo({
				url:'/pages/index/kind'
			})
		},
		toKanUrl(){
			toUrlFunction.toUrl('/pages/promote/promoteNewCovid');
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
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 120upx;
	/* background-color: #FFFFFF; */
}
</style>
