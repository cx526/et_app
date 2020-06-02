<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_pictureToHome1.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-button" @tap="toUrl">
			<text>立即体验</text>
		</view>
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
		toUrl() {
			uni.navigateTo({
				url:'/pages/index/kind'
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
}
.content-button {
	margin-top: 30UPX;
	width: 200UPX;
	background-color: #00B4C9;
	border-radius: 30UPX;
	padding: 10upx 50upx;
	color: #FFFFFF;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
