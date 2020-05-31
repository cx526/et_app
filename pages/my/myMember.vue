<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_member.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-month" @tap="toUrl"></view>
		<view class="content-season" @tap="toUrl"></view>
		<view class="content-year" @tap="toUrl"></view>
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
			// uni.switchTab({
			// 	url:'/pages/index/kind'
			// })
			
			uni.showToast({
				title:'暂未开放，敬请期待！',
				duration:2000,
				icon:"none"
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
.content-month {
	width: 650upx;
	height: 400upx;
	position: absolute;
	bottom: 1100upx;
	/* background-color: #FFFFFF; */
}
.content-season {
	width: 650upx;
	height: 400upx;
	position: absolute;
	bottom: 650upx;
	/* background-color: #007AFF; */
}
.content-year {
	width: 650upx;
	height: 400upx;
	position: absolute;
	bottom: 200upx;
	/* background-color: #DD524D; */
}
</style>
