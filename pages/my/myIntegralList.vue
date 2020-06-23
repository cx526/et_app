<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="top-content-position">
				<view class="top-content" v-if='userInfoAll.id'>
					<view class="top-left-position">
						<image style="height: 120upx;width: 120upx;border-radius: 50%;" :src="userInfoAll.avatar" class="marginStyle"></image>
						<image style="width: 40upx;height: 40upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_coin.png" class="marginStyle"></image>
						<text class="marginStyle">当前积分</text>
					</view> 
					 
					<view class="top-right-position">
						<view class="top-right-content">
							<text>{{userInfoAll.coin}}</text>
						</view>
					</view>
				</view>
				
				<view class="top-content" v-else @tap='toLogin'>
					<view class="login-button-style">
						<text>请先登录</text>
					</view>
				</view>
			</view>
			
			<view class="content-title-position">
				<!-- 标题留位 -->
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myIntegral_line.png" style="width: 400upx;" mode="widthFix"></image>
				<text style="font-weight: bold; z-index: 99; position: absolute;left: 140upx;">积分明细</text>
			</view>
			
			<view class="bottom-content-position">
				<view class="bottom-content white-border">
					<view class="cell" v-for="(item,index) in showData">
						<et-integrai-list-data :dataObj='item'></et-integrai-list-data>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import etIntegraiListData from '../../components/etIntegraiListData.vue'
const checkLogin = require('@/common/checkLogin');

export default {
	components: {
		etIntegraiListData
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	onLoad() {
		this.getCustomerInfo();
		this.getListData();
	},
	data() {
		return {
			userInfoAll: {},
			listData: [
				{
					name:'sign',
					create_date:'2020.06.09 12:30:25',
					coin:'+200'
				},
				{
					name:'旧人注册',
					create_date:'2020.06.09 12:30:25',
					coin:'+200'
				}
			],
			showData: []
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
		getListData(){
			this.listData.map((item,index) =>{
				let dataObj = this.changeListData(item.name);
				item.imgInfo = dataObj.imgInfo;
				this.showData.push(item);
			})
			// this.$forceupdate();
		},
		changeListData(name){
			switch(name){
				case 'sign':
					return {name:'注册',imgInfo:'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/auth_logo.png'}
					break;
				default:
					return {name:'未知',imgInfo:'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/avatar.png'}
			}
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
	background-image: linear-gradient(to bottom, #F0F0F0 , #CECECE);
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
.login-button-style {
	background-color: #7ED1E6;
	border-radius: 40upx;
	color: #FFFFFF;
	font-weight: bold;
	padding: 10upx 50upx;
}
.bottom-content-position {
	width: 100%;
	margin-top: 40upx;
}
.bottom-content {
	width: 96%;
	padding: 20upx 20upx;
}
.cell {
	padding: 30upx 5upx;
}
.cell + .cell {
	border-top: 1px dashed #A0A0A0;

}
.content-title-position {
	margin-top: 30upx;
	
	position: relative;
}
</style>
