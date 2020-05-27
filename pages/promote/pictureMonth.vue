<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month.png" style="width: 100%;" mode="widthFix"></image>
		<view class="to-home-button" @tap="toHomeUrl"></view>
		<view class="painting-button" @tap="paintingUrl"></view>
		<view class="work-button" @tap="workUrl"></view>
	</view>
</template>

<script>

export default {
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		toHomeUrl() {
			uni.navigateTo({
				url:'/pages/promote/pictureToHome'
			})
		},
		paintingUrl() {
			uni.navigateTo({
				url:'/pages/promote/picturePainting'
			})
		},
		workUrl() {
			uni.navigateTo({
				url:'/pages/promote/pictureWork'
			})
		},
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
.to-home-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 1100upx;
	right: 100upx;
	/* background-color: #FFFFFF; */
}
.painting-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 750upx;
	right: 250upx;
	/* background-color: #FFFFFF; */
}
.work-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 430upx;
	right: 100upx;
	/* background-color: #FFFFFF; */
}
</style>
