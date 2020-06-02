<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/guide_borrowExplain1.png" style="width: 100%;" mode="widthFix"></image>
		<!-- <view class="content-button" @tap="toUrl">
			<text>立即借阅</text>
		</view> -->
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
	position: relative;
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
	
	position: absolute;
	bottom:50upx;
}
</style>
