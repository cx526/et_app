<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="userInfo-position">
				<view class="user-left-position">
					<view class="userInfo-content">
						<text style="color: #FFFFFF;font-size: 40upx;">{{userInfo.name === 'guest' ? '五车书游客, 您好！' : userInfo.name}}</text>
						<view class="white-space-width"></view>
						<!-- <image src="../../static/my/diamond.png" style="width: 40upx; height: 40upx;"></image> -->
					</view>
					
					<view style="height: 10upx;"></view>
					
					<!-- 
					<view class="userInfo-member">
						<view class="userInfo-member-border">
							<text>会员截止日期：{{userInfo.overTime}}</text>
						</view>
					</view> 
					-->
				</view>
				
				<view class="user-right-position">
					<view v-if="userInfo.name === 'guest'" @tap="goAuth">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/avatar.png" style="border-radius: 50%; width: 120upx; height: 120upx;"></image>
					</view>
					<view v-else @tap="clearSessionAction">
						<image :src="userInfo.avatar" style="border-radius: 50%; width: 120upx; height: 120upx;"></image>
					</view>
				</view>
			</view>
			
			<view class="vip-button-position"  @tap="vipButton">
				<image style="width: 640upx; height: 145upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/vip_button.png"></image>
			</view>
			
			<view class="white-space"></view>
			
			<view class="vip-button-position" @tap="vipBanner">
				<image style="width: 660upx; height: 200upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/vip_banner.png"></image>
			</view>
			
			<view class="white-space"></view>
			
			<view class="my-box-position" v-if="updateOrderInfo">
				<etMyBox :myMenuInfo="myOrderInfo"></etMyBox>
			</view>
			
			<view class="white-space" style="height: 25upx;"></view>
			
			<view class="my-box-position">
				<etMyBox :myMenuInfo="myAppInfo"></etMyBox>
			</view>
			
			<view class="white-space" style="height: 25upx;"></view>
			
			<view class="my-box-position">
				<et-my-read-book-data :myMenuInfo="myReadInfo"></et-my-read-book-data>
			</view>
			
			<view class="white-space"></view>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'
import etMyReadBookData from '../../components/etMyReadBookData.vue'
const toUrlFunction = require('@/common/toUrlFunction');
const checkLogin = require('@/common/checkLogin');
const bookListData = require('@/common/carDataOption');

export default {
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	components: {
		etMyBox,
		etMyReadBookData
	},
	data() {
		return {
			updateOrderInfo: false,
			test: '123456',
			// userInfo: {
			// 	'name':'开发者',
			// 	'overTime':'20120-05-19',
			// 	'babyName':'开发者baby',
			// 	'school':'林头幼儿园',
			// 	'class':'一年一班'
			// },
			myOrderInfo: {
				'menuTitle' : '我的订单',
				'moreMenu' : '更多 >',
				'moreMenuUrl':'/pages/cart/orderList?status_text=全部',
				'allMenu': [
					{
						'imgSrc' : this.$aliImage + 'my1_1.png',
						'title'	: '待支付',
						'toUrl'	: '/pages/cart/orderList?status_text=待支付',
						'status' : '1'
						// 'count'	: '99+'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_2.png',
						'title'	: '待发货',
						'toUrl'	: '/pages/cart/orderList?status_text=待发货',
						'status' : '2'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_3.png',
						'title'	: '待收货',
						'toUrl'	: '/pages/cart/orderList?status_text=待收货',
						'status' : '3'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_4.png',
						'title'	: '待还书',
						'toUrl'	: '/pages/cart/orderList?status_text=待还书',
						// 'count'	: '2'
						'status' : '4'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_5.png',
						'title'	: '待取件',
						'toUrl'	: '/pages/cart/orderList?status_text=待取件',
						'status' : '5'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_6.png',
						'title'	: '待评价',
						'toUrl'	: '/pages/cart/orderList?status_text=待评价',
						'status' : '6'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_7.png',
						'title'	: '退款',
						'toUrl'	: '/pages/cart/orderList?status_text=退款',
						'status' : '8'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_8.png',
						'title'	: '逾期',
						'toUrl'	: '/pages/cart/orderList?status_text=逾期',
						'status' : '7'
					}
				]
			},
			myAppInfo: {
				'menuTitle' : '我的应用',
				'allMenu': [
					{
						'imgSrc' : this.$aliImage + 'my2_1.png',
						'title'	: '押金',
						'toUrl'	: '/pages/my/myDeposit',
						'buttomContent' : ''
					},
					{
						'imgSrc' : this.$aliImage + 'my2_2.png',
						'title'	: '积分',
						'toUrl'	: '/pages/my/myIntegral',
						'buttomContent' : ''
					},
					{
						'imgSrc' : this.$aliImage + 'my2_3.png',
						'title'	: '签到',
						'toUrl'	: '/pages/index/sign',
						'buttomContent' : ''
					},
					{
						'imgSrc' : this.$aliImage + 'my2_4.png',
						'title'	: '活动',
						'toUrl' : '/pages/promote/promoteSummeryBook',
						// 'count'	: '2'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_5.png',
						'title'	: '完善信息',
						'toUrl'	: '/pages/my/myInfoList'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_6.png',
						'title'	: '会员',
						'toUrl'	: '/pages/my/myMember'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_7.png',
						'title'	: '客服',
						'toUrl'	: '请前往【我的五车书】公众号咨询客服'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_8.png',
						'title'	: '收货地址',
						'toUrl'	: '/pages/cart/addressList'
					}
				]
			},
			myReadInfo: {
				'menuTitle' : '我的借阅',
				'moreMenu' : '更多 >',
				'moreMenuUrl':'/pages/my/myReadList',
				'allMenu': [
					{
						'title'	: '累计已读',
						'count'	: '0'
					},
					{
						'title'	: '在读',
						'count'	: '0'
					}
				]
			}
		}
	},
	onLoad() {
		this.getOrderCount();
		//更新tab
		let bookCount = bookListData.cartBookCount();
		this.getReadCount();
	},
	onShow() {
		this.getOrderCount();
		//更新tab
		let bookCount = bookListData.cartBookCount();
		this.getReadCount();
	},
	methods: {
		clearSessionAction() {
			uni.showActionSheet({
			    itemList: ['重新登录'],
			    success: res => {
					if (res.tapIndex === 0) {
						uni.removeStorageSync('userInfo')
						uni.removeStorageSync('carListInfo')
						uni.clearStorageSync()
						uni.reLaunch({url: '../guide/guide'})
					}
			    },
			    fail: res => {
			        console.log(res.errMsg);
			    }
			});
		},
		goAuth() {
			uni.removeStorageSync('userInfo')
			uni.reLaunch({url: '../guide/guide'})
		},
		vipButton(){
			uni.showToast({
				title:'暂未开放，敬请期待！',
				duration:2000,
				icon:"none"
			})
		},
		vipBanner(){
			toUrlFunction.toUrl('/pages/my/myMember');
		},
		getOrderCount(){
			let guestStatus = checkLogin.checkLogin(true);
			if(guestStatus){
				this.updateOrderInfo = true
				return;
			}
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.$api.getOrderCountWithCustomID({  custom_id: res.data[0].id }).then(sres=>{
					sres.data.map((item,index) => {
						this.myOrderInfo.allMenu.map((sitem,sindex) => {
							if(item.status == sitem.status){
								this.myOrderInfo.allMenu[sindex].count = item.order_total;
							}
						});
						console.log(this.myOrderInfo);
					});
					this.updateOrderInfo = true
				});
			});
		},
		getReadCount(){
			if(this.userInfo.name === 'guest' || !this.userInfo.name){
				return;
			}
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.$api.getHistoryOrderCount({custom_id: res.data[0].id}).then(sres=>{
					console.log(sres);
					this.myReadInfo.allMenu.map((item,index)=>{
						if(item.title === '累计已读'){
							this.myReadInfo.allMenu[index].count = sres.data.readCount;
						}else if(item.title === '在读'){
							this.myReadInfo.allMenu[index].count = sres.data.currentReading;
						}
						
					})
				});
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
	height: 350upx;
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
}
.userInfo-position {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 40upx 0;
}
.user-left-position {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.userInfo-content {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.userInfo-member-border {
	background-color: #2AAEC4;
	border-radius: 30upx;
	color: #FFFFFF;
	font-size: 20UPX;
	padding: 10upx 20upx;
}
.vip-button-position {
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.my-box-position {
	width: 94%;
}
</style>
