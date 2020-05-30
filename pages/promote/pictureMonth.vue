<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month.png" style="width: 100%;" mode="widthFix"></image>
		<view class="to-picture-button" @tap="toPictureeUrl"></view>
		<view class="to-gift-button" @tap="toGiftUrl"></view>
		<view class="to-sign-button" @tap="toSignUrl"></view>
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
		toPictureeUrl() {
			uni.navigateTo({
				url:'/pages/promote/pictureToHomeDetail'
			})
		},
		toGiftUrl() {
			uni.showToast({
				title:'活动即将开放',
				icon:"none",
				duration:2000
			})
			// uni.navigateTo({
			// 	url:'/pages/promote/pictureToHome'
			// })
		},
		toSignUrl() {
			uni.navigateTo({
				url:'/pages/index/sign'
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
.to-picture-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 1915upx;
	right: 40upx;
	/* background-color: #FFFFFF; */
}
.to-gift-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 1600upx;
	right: 100upx;
	/* background-color: #FFFFFF; */
}
.to-sign-button {
	width: 100%;
	height: 300upx;
	position: absolute;
	bottom: 900upx;
	/* right: 100upx; */
	/* background-color: #FFFFFF; */
}
.painting-button {
	width: 100%;
	height: 300upx;
	position: absolute;
	bottom: 550upx;
	/* right: 250upx; */
	/* background-color: #FFFFFF; */
}
.work-button {
	width: 100%;
	height: 300upx;
	position: absolute;
	bottom: 230upx;
	/* right: 100upx; */
	/* background-color: #FFFFFF; */
}
</style>
