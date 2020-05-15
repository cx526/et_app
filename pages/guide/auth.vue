<template>
	<view class="content">
		<view class="img-content">
			<image class="image-content" src="../../static/auth/logo.png" mode=""></image>
		</view>
		
		<view class="sub-content">
			<button class="auth-button" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">微信授权</button>
			<view style="height: 40upx;"></view>
			<button class="auth-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机授权</button> 
			<view style="height: 40upx;"></view>
			<button class="auth-button" @tap="goIndex">暂不登录</button>
		</view>
	</view>
</template>

<script>

export default {
    data() {
        return {
			allInfo: {}
        }
    },
    onLoad() {
        
    },
    methods: {
        /**
         * 微信授权 uni.getUserInfo
         */
        getuserinfo() {
			uni.showLoading()			
			wx.getUserInfo({
				success: res => {
					this.allInfo.userInfo = res.userInfo
					console.log(this.allInfo)
					uni.hideLoading()
					uni.showToast({
						title: '微信授权成功!'
					})
				}
			})
		},
    
		/**
		 * 手机号授权
		 * @param {*} e 
		 */
		getPhoneNumber(e) {
			this.allInfo.detail = e.detail
			wx.login({ success: res => {
				if (res.code) {
					this.allInfo.code = res.code
					this.$api.getAuthData(this.allInfo).then(res => {
					   console.log(res.data)
					})
				}
			}})
		},
		goIndex() {
			uni.switchTab({
				"url": "pages/index/index"
			}) 
		}
	}
}
</script>

<style scoped>
.content {
	/* height: 100vh; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
}
.img-content {
	padding-top: 100upx;
}
.image-content {
	width: 312upx;
	height: 151upx;
}
.sub-content {
	width: 100%;
	padding-top: 260upx;
}
.auth-button {
	width: 50%;
	background: rgba(0,183,204,1);
	color: #fff;
	font-size: 32upx;
	border-radius: 50upx;
}
</style>
