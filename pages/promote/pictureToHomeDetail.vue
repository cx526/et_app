<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_pictureToHome_detail.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-button" @tap="toUrl">
			
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
	background-color: #CAE6CE;
	position: relative;
}
.content-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 120upx;
}
</style>
