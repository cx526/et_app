<template>
	<view class="content">
		<view class="sub-content">
			<button class="auth-button" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">微信授权</button>
			<view style="height: 40upx;"></view>
			<button class="auth-button" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机授权</button> 
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
			wx.login({ success: res => {
				if (res.code) {
					this.allInfo.code = res.code
					wx.getUserInfo({
						success: res => {
							this.allInfo.userInfo = res.userInfo
							console.log(this.allInfo)
						}
					})
				}
			}})
		},
    
		/**
		 * 手机号授权
		 * @param {*} e 
		 */
		getPhoneNumber(e) {
			this.allInfo.detail = e.detail
			console.log(this.allInfo)
		}
	}
}
</script>

<style scoped>
.content {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sub-content {
	width: 100%;
}
.auth-button {
	width: 50%;
	background: #4CD964;
	color: #fff;
	font-size: 32upx;
}
</style>
