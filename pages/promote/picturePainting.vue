<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_home.png" style="width: 100%;" mode="widthFix"></image>
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
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    onLoad() {
        
    },
    methods: {
		toUrl() {
			if (this.userInfo.name === 'guest') {
				//游客 发出提示
				uni.showModal({
					title: '请先登录',
					confirmText: '登录',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}
					}
				})
			} else {
				uni.navigateTo({
					url:'/pages/promote/promoteUpload?pTitle=童彩小画社',
				})
			}
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
	width: 500UPX;
	height: 100upx;
	position: absolute;
	bottom: 120upx;
	/* background-color: #FFFFFF; */
}
</style>
