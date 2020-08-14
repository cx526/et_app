<template>
	<view class="content">
		<!-- 顶部底图 -->
		<view class="top-position">
			<view class="userInfo-position">
				<view class="user-left-position">
					<view class="userInfo-content">
						<text style="color: #FFFFFF;font-size: 40upx;">{{userInfo.name === 'guest' ? '五车书游客, 您好！' : userInfo.name}}</text>
					</view>
					<view class="bindCard" @tap="goTiedCard">
						绑卡
					</view>
					
					
					
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
		</view>
		
		<view class="content-position">
			<!-- <view class="userInfo-position">
				<view class="user-left-position">
					<view class="userInfo-content">
						<text style="color: #FFFFFF;font-size: 40upx;">{{userInfo.name === 'guest' ? '五车书游客, 您好！' : userInfo.name}}</text>
						<view class="white-space-width"></view>
					</view>
					
					<view style="height: 10upx;"></view>
					
				</view>
				
				<view class="user-right-position">
					<view v-if="userInfo.name === 'guest'" @tap="goAuth">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/avatar.png" style="border-radius: 50%; width: 120upx; height: 120upx;"></image>
					</view>
					<view v-else @tap="clearSessionAction">
						<image :src="userInfo.avatar" style="border-radius: 50%; width: 120upx; height: 120upx;"></image>
					</view>
				</view>
			</view> -->
			
			<view class="white-space"></view>
			<!-- 线下订单 -->
			<view class="offline-box">
				<view class="offline">
					<view class="offline-order" 
					style="border-radius: 0;
					box-shadow: none;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;">
						<view class="left">
							<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-all.png" mode=""></image>
							<text>智慧书柜订单</text>
						</view>
						<view class="center">
							<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-cut-line.png" mode="widthFix"></image>
						</view>
						<view class="right">
							<block 
							v-for="(item, index) in offlineOrderList" 
							:key="index">
								<view class="item" @tap="goOffline(item.url)">
									<image :src="item.imgUrl" mode="widthFix"></image>
									<text>{{ item.text }}</text>
								</view>
							</block>
						</view>
					</view>
					<view
					style="width: 100%; box-sizing: border-box; padding: 0 18rpx;">
						<uni-notice-bar
						v-if="failLen > 0"
						scrollable="true" 
						single="true" 
						:text="noticeText" 
						backgroundColor="#EBF8FF"
						color="#333" 
						showIcon
						:single="true">
						</uni-notice-bar>
					</view>
				</view>
				
				
				
			</view>
			
			
			<!-- 线上订单 -->
			<view class="offline-box">
				<view class="offline-order">
					<view class="left" @tap="goOnlineAll">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-00.png" mode=""></image>
						<text>邮寄借阅订单</text>
					</view>
					<view class="center">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-cut-line.png" mode="widthFix"></image>
					</view>
					<view class="online-right">
						<scroll-view scroll-x>
							<block 
							v-for="(item, index) in onlineOrderList" 
							:key="index">
								<view class="item" @tap="goOnline(item.url)">
									<image :src="item.imgUrl" mode=""></image>
									<view>{{ item.text }}</view>
								</view>
							</block>
						</scroll-view>
						
					</view>
					<image
					src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png"
					style="position: absolute;right: 12rpx;top: 50%;transform: translateY(-50%);width: 24rpx;height: 24rpx;"></image>
				</view>
				
				
			</view>
			
			<view class="my-box-position">
				<etMyBox :myMenuInfo="myAppInfo"></etMyBox>
			</view>
			
			<view class="white-space" style="height: 25upx;"></view>
			
			<view class="my-box-position">
				<et-my-read-book-data :myMenuInfo="myReadInfo"></et-my-read-book-data>
			</view>
			
			<view class="white-space"></view>
			<!-- 底图 -->
			<view class="bottom-banner" @tap="phone">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my-bottom-banner.png" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'
import etMyReadBookData from '../../components/etMyReadBookData.vue'
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
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
		etMyReadBookData,
		uniNoticeBar
	},
	data() {
		return {
			noticeText: '',
			failLen: 0,
			updateOrderInfo: false,
			test: '123456',
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
			},
			offlineOrderList: [
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-01.png',
					text: '待取书',
					url: '/pages/library/take-books?status=0'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-02.png',
					text: '待还书',
					url: '/pages/library/return-books?status=0'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-03.png',
					text: '已归还',
					url: '/pages/library/return-books?status=1'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-04.png',
					text: '已失效',
					url: '/pages/library/take-books?status=1'
				},
			],
			onlineOrderList: [
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-01.png',
					text: '待支付',
					url: '/pages/cart/orderList?status_text=待支付'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-02.png',
					text: '待发货',
					url: '/pages/cart/orderList?status_text=待发货'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-03.png',
					text: '待收货',
					url: '/pages/cart/orderList?status_text=待收货'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-04.png',
					text: '待归还',
					url: '/pages/cart/orderList?status_text=待还书'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-05.png',
					text: '待取件',
					url: '/pages/cart/orderList?status_text=待取件'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-06.png',
					text: '待评价',
					url: '/pages/cart/orderList?status_text=待评价'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-07.png',
					text: '退款',
					url: '/pages/cart/orderList?status_text=退款'
				},
				{
					imgUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/online-icon-08.png',
					text: '逾期',
					url: '/pages/cart/orderList?status_text=逾期'
				},
			],
			
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
		// 获取逾期书单判断是否出现通知条
		this.getUserInfo()
	},
	methods: {
		// 获取个人信息
		getUserInfo() {
			let mobile = uni.getStorageSync("userInfo").mobile;
			this.$api.getCustom({ filterItems: { mobile } }).then(res => {
				this.getOrderFail(res.data[0].id,res.data[0].dockerInfo.docker_mac)
				
			})
		},
		// 获取逾期书单判断是否出现通知条
		getOrderFail(id ,docker_mac) {
				this.$api.offlineUserOrderList({
					docker_mac: docker_mac,
					filterItems:{
						custom_id: id,
						order_type: 5 //失效书单类型
					}
				}).then(res => {
					
					this.failLen = res.data.rows.length;
					this.noticeText = `您有${this.failLen}笔订单将逾期，请移步至订单页及时处理`
				})
		},
		// 跳转到绑卡页面
		goTiedCard() {
			uni.navigateTo({
				url: '/pages/library/tied-card'
			})
		},
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
			console.log(guestStatus)
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
		},
		// 线下订单页跳转
		goOffline(url) {
			uni.navigateTo({
				url
			})
		},
		// 线上订单页跳转
		goOnline(url) {
			uni.navigateTo({
				url
			})
		},
		// 查看线上全部订单
		goOnlineAll() {
			uni.navigateTo({
				url: '/pages/cart/orderList?status_text=全部'
			})
		},
		// 拨打号码
		phone() {
			uni.makePhoneCall({
			    phoneNumber: '400-0022-708' //仅为示例
			});
		},
	},
		
}
</script>

<style scoped>
/* 线下订单 */
.offline-box {
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 24rpx;
	padding: 0 24rpx;
}
.offline-box .offline {
	background-color: rgb(255,255,255) !important;
	box-sizing: border-box;
	padding-bottom: 10rpx;
	box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3) ;
	border-radius: 20rpx;
}
.offline-box .offline-order {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding: 36rpx 0;
	background: #fff;
	border-radius: 20rpx;
	box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
	font-size: 24rpx;
	position: relative;
}
.offline-box .offline-order .left {
	width: 180rpx;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 24rpx;
	font-weight: bold;
	position: relative;
	left: 9rpx;

}
.offline-box .offline-order .center {
	flex-shrink: 0;
}
.offline-box .offline-order image {
	width: 26rpx;
	height: 110rpx;
}
.offline-box .offline-order .right {
	width: 496rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 24rpx 0 18rpx;
}
.offline-box .offline-order .right .item {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #666;

}
.offline-box .offline-order .right .item image {
	width: 60rpx;
	height: 60rpx;
}
.offline-box .offline-order .online-right {
	flex: 1;
}
.offline-box .offline-order .online-right scroll-view {
	white-space: nowrap;
	width: 496rpx;
	box-sizing: border-box;
	padding: 0 24rpx 0 18rpx;
	
}
.offline-box .offline-order .online-right .item {
	display: inline-block;
	width: 25%;
	text-align: center;
	font-size: 24rpx;
	color: #666;
	
}
.offline-box .offline-order .online-right .item image {
	width: 60rpx;
	height: 60rpx;
	display: block;
	position: relative;
	left: 50%;
	transform: translateX(-30rpx);
}
.offline-box .offline-order .left image {
	width: 60rpx;
	height: 60rpx;
}
/* 底图 */
.bottom-banner {
	box-sizing: border-box;
	width: 100%;
	padding-bottom: 24rpx;
}
.bottom-banner image {
	width: 100%;
}
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
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: -150rpx;
}
.userInfo-position {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 40upx 0;
	margin: 0 auto;
}
.user-left-position {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.userInfo-content {
/* 	display: flex;
	flex-direction: column; */
	/* display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center; */
}
.user-left-position .bindCard {
	color: #fff;
	font-size: 28rpx;
	background: rgba(255,255,255, 0.3);
	box-sizing: border-box;
	padding: 4rpx 20rpx;
	border-radius: 24rpx;
	display: inline-block;
	margin-top: 14rpx;
}
.userInfo-member-border {
	/* background-color: #2AAEC4; */
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
