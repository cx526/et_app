<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-kan" @tap="toGiftUrl"></view>
		<view class="content-button" @tap="toScoreUrl"></view>
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
		toGiftUrl() {
			uni.showToast({
				title:"暂未开放，敬请期待",
				duration: 2000,
				icon:"none"
			})
			// toUrlFunction.toUrl('/pages/promote/pictureMonth');
		},
		toScoreUrl(){
			toUrlFunction.toUrl('/pages/promote/pictureMonth');
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
	width: 450UPX;
	height: 80upx;
	position: absolute;
	bottom: 200upx;
	/* background-color: #007AFF; */
}
.content-button {
	width: 450UPX;
	height: 80upx;
	position: absolute;
	bottom: 100upx;
	/* background-color: #333333; */
}
</style>
