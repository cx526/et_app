<template>
	<view class="content">
		<view class="img-content-position">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_deposit.png" style="width: 500upx;" mode="widthFix"></image>
			<view class="content-position">
				<view class="money-style">
					<text>¥ {{userInfoAll.deposit}}</text>
				</view>
				
				<text style="color:#7D4700; font-size: 25upx; margin-top: 10upx;">可退还押金</text>
			</view>
		</view>
		<!-- <view class="content-button" @tap="toUrl">
			<view class="button-style">
				<text>立即提现</text>
			</view>
		</view> -->
	</view>
</template>

<script>

export default {
    data() {
        return {
			userInfoAll:{}
        }
    },
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    onLoad() {
        this.getCustomerInfo();
    },
    methods: {
		toUrl() {
			uni.switchTab({
				url:'/pages/index/kind'
			})
		},
		getCustomerInfo(){
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.userInfoAll = res.data[0];
				console.log(this.userInfoAll);
			});
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #EBF8FF;
}
.img-content-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}
.content-position {
	position: absolute;
	bottom: 450upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.money-style {
	color:#FFFFFF;
	font-weight: bold;
	font-size: 60upx;
}
</style>
