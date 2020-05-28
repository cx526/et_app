<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="top-content-position">
				<view class="top-content">
					<view class="top-left-position">
						<image style="height: 120upx;width: 120upx;border-radius: 50%;" src="../../static/cart/test.png" class="marginStyle"></image>
						<image style="width: 40upx;height: 40upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_coin.png" class="marginStyle"></image>
						<text class="marginStyle">当前积分</text>
					</view> 
					 
					<view class="top-right-position">
						<view class="top-right-content">
							<text>{{userInfoAll.coin}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="bottom-position">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_integralExplain.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'

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
			this.userInfoAll = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
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
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-bottom-right-radius: 30upx;
	border-bottom-left-radius: 30upx;
	height: 280upx;
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
	background:linear-gradient(160deg,#FFFBE6 0%,#FEBF4A 70%);
	box-shadow:0px -3px 6px rgba(0,0,0,0.16);
	border: 8upx solid #FDB841;
	border-bottom: 0;
	border-top-left-radius: 20upx;
	border-top-right-radius: 20upx;
	opacity:1;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}
.top-left-position {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.top-right-content {
	background-color: #C89E60;
	border-radius: 40upx;
	padding: 10upx 30upx;
	color: #FFFFFF;
	font-size: 30upx;
	font-weight: bold;
}
.marginStyle {
	margin-left: 8upx;
}
.bottom-position {
	width: 670upx;
	display: flex;
	padding-top: 30upx;
	justify-content: center;
	align-items: center;
}
</style>
