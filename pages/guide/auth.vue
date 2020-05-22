<template>
	<view class="content">
		<view class="img-content">
			<image class="image-content" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/auth_logo.png" mode=""></image>
		</view>
		
		<view class="sub-content">
			<button :disabled="weChatCheck" class="auth-button" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">1、微信授权</button>
			<view style="height: 40upx;"></view>
			<button :disabled="phoneCheck" class="auth-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">2、手机授权</button> 
			<view style="height: 40upx;"></view>
			<view class="auth-button" style="margin: 0 auto; text-align: center; line-height: 2.4; background: #fff; color: rgba(0,183,204,1); border: 1px solid #ccc;
" @tap="goIndex">暂不登录</view>
		</view>
	</view>
</template>

<script>
const WxAuth = require('@/common/WxAuth');

export default {
    data() {
        return {
			allInfo: {},
			weChatCheck: false,
			phoneCheck: false
        }
    },
    onLoad() {
        // #ifdef MP-WEIXIN
		WxAuth.onLogin();
		// #endif
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
					this.weChatCheck = true
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
			if (this.allInfo.userInfo && Object.keys(this.allInfo.userInfo).length > 0) {
				this.allInfo.detail = e.detail
				WxAuth.checkSession().then(code => {
					this.allInfo.code = code
					this.$api.getAuthData(this.allInfo).then(res => {
						console.log(res.data)
						if (res.data.status === 'ok') {
							uni.setStorageSync('userInfo', res.data)
							// uni.reLaunch({url: '../index/index'})
							this.phoneCheck = true
							uni.navigateTo({ url: './register' })
						} else {
							uni.showToast({
								icon : 'none',
								title: '授权失败!'
							})
						}
					})
				})
			} else {
				uni.showToast({
					icon : 'none',
					title: '请先进行微信授权!'
				})
			}
		},
		goIndex() {
			uni.setStorageSync('userInfo', { 
				name: 'guest',
				avator: '',
				gender: '',
				mobile: ''
			});
			uni.reLaunch({ url: '../index/index' })
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
