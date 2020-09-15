<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="top-content-position">
				<view class="top-content" v-if='userInfoAll.id'>
					<view class="top-left-position">
						<image style="height: 160upx;width: 160upx;border-radius: 50%;" :src="userInfoAll.avatar" class="marginStyle"></image>
						<view style='display: flex;flex-direction: column;justify-content: center;align-items: flex-start; margin-left: 10upx;'>
							<view style='display: flex;flex-direction: row;justify-content: center;align-items: center; text-align: center;'>
								<image style="width: 70upx;height: 70upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myIntegral_top_coin.png" class="marginStyle"></image>
								<text class="marginStyle">当前积分</text>
							</view>	
							<view style="margin-top: 10upx;padding-left: 5upx;font-size: 50upx;">
								<text>{{userInfoAll.coin}}</text>
							</view>
							
						</view>
					</view> 
				</view>
				
				<view class="top-content" style="padding-bottom: 120upx;" v-else @tap='toLogin'>
					<view class="login-button-style">
						<text>请先登录</text>
					</view>
				</view>
			</view>
			
			<view class="white-space" style="height: 60upx;"></view>
			
			<view class="middle-button-position" v-if='userInfoAll.id'>
				<view class="middle-button" @tap="toUrl(1)"></view>
				<view class="middle-button" style="left: 227upx;" @tap="toUrl(2)"></view>
				<view class="middle-button" style="left: 456upx;" @tap="toUrl(3)"></view>
			</view>
			
			<view class="bottom-position">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_integralExplain-01.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'
const checkLogin = require('@/common/checkLogin');
const toUrlFunction = require('@/common/toUrlFunction');

export default {
	components: {
		etMyBox
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	onLoad() {
		this.getCustomerInfo()
	},
	data() {
		return {
			userInfoAll: {}
		}
	},
	methods: {
		async getCustomerInfo(){
			//没登录不显示积分
			let guestStatus = checkLogin.checkLogin(true);
			if(guestStatus){
				return;
			}
			this.userInfoAll = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
			console.log(this.userInfoAll);
		},
		toLogin(){
			checkLogin.checkLogin();
		},
		toUrl(type){
			let urlString = '';
			switch(type){
				case 1:
					urlString = '/pages/my/myIntegralList';
					break;
				case 2:
					urlString = '/pages/promote/promoteMonthGift';
					break;
				case 3:
					urlString = '/pages/promote/promoteMonthGiftUserDetail';
					break;
				default:
					urlString = '';
			}
			
			toUrlFunction.toUrl(urlString);
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
	background-color: #FFFFFF;
	position: relative;
}
.top-position {
	/* background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8); */
	background-image: url('https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myIntegral_top_background.png');
	background-repeat:no-repeat;
	background-position:center;
	background-size: 100% 100%;
	border-bottom-right-radius: 30upx;
	border-bottom-left-radius: 30upx;
	min-height: 423upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 90upx;
}
.top-content {
	width:650upx;
	height:180upx;
	/* background:linear-gradient(160deg,#FFFBE6 0%,#FEBF4A 70%); */
	/* box-shadow:0px -3px 6px rgba(0,0,0,0.16);
	border: 8upx solid #FDB841; */
	border-bottom: 0;
	border-top-left-radius: 20upx;
	border-top-right-radius: 20upx;
	opacity:1;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
.top-left-position {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 35upx;
	font-weight: bold;
	color: #FFFFFF;
}
.top-right-content {
	background-color: #C89E60;
	border-radius: 40upx;
	padding: 10upx 30upx;
	color: #FFFFFF;
	font-size: 30upx;
	font-weight: 550;
}
.marginStyle {
	/* margin-left: 8upx; */
}
.bottom-position {
	width: 670upx;
	display: flex;
	padding-top: 30upx;
	justify-content: center;
	align-items: center;
}
.login-button-style {
	background-color: #FF7F51;
	border-radius: 40upx;
	color: #FFFFFF;
	font-weight: bold;
	padding: 10upx 50upx;
}
.middle-button-position{
	background-image: url('https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myIntegral_top_button_group.png');
	background-repeat:no-repeat;
	background-position:center;
	background-size: 684upx 212upx;
	min-height: 230upx;
	width: 100%;
	position: relative;
}
.middle-button {
	/* background-color: #FFFFFF; */
	width: 225upx;
	height: 215upx;
	position: absolute;
}
</style>
