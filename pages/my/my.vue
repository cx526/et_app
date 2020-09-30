<template>
	<view class="content">
		<!-- 顶部 -->
		<view class="top-position">
			<!-- 底图 -->
			<image :src="$aliImage + 'userInfo-bg.png'" 
			mode="widthFix"
			class="bg"></image>
			<!-- 卡号 -->
			<view class="card-number" v-if="card_no">
					<text>{{ card_no }}</text>
			</view>
			<!-- context -->
			<view class="context">
				<view class="userInfo-position">
					<!-- left -->
					<view class="user-left-position">
						<!-- 头像 -->
						<view class="user-right-position">
							<view @tap="goAuth"
							 v-if="!userInfo.name || userInfo.name === 'guest'" >
								<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/avatar.png"></image>
							</view>
							<view v-else @tap="clearSessionAction">
								<image :src="userInfo.avatar"></image>
							</view>
						</view>
						<!-- 昵称 -->
						<view class="userInfo-content">
							<view class="userInfo-name" >
								<text style="margin-right: 10rpx;">
								{{!userInfo.name || userInfo.name === 'guest' ? '五车书游客, 您好！' : userInfo.name}}
								</text>
								<!-- 后端返回 -->
								<image mode="widthFix" v-if="isLogin && member_status == 1 && memberIcon && memberIcon != ''"
								:src="memberIcon">
								</image>
								
							</view>
							<template v-if="isLogin">
								<text style="font-size: 20rpx;" v-if="!member_status">
									您当前尚未开通会员服务
								</text>
								<text style="font-size: 20rpx;" v-else>
									会员到期日：{{ formatMemberDueDate }}
								</text>
							</template>
							
							
						</view>
						
					
					</view>	
					<view class="user-right" v-if="isLogin">
						<image mode="widthFix"
						:src="$aliImage + 'menber-btn.png'" 
						v-if="!member_status"
						@tap="goMember"></image>
						<image @tap="goMember"
						:src="$aliImage + 'member-icon-02.png'" 
						mode="widthFix"
						v-else>
						</image>
					</view>
				</view>
				<view class="borrow-count" v-if="isLogin && member_status == '1'"
				@tap="checkRecord">
					<view style="flex: 1;">
					</view>
					<view class="right">
						<text>查看会员记录</text>
						<image :src="$aliImage + 'member-icon-05.png'" mode="widthFix">
							
						</image>
					</view>
					
				</view>
			</view>
			
			
		</view>
		
		<view class="content-position">
			<!-- <view class="white-space"></view> -->
			<!-- 线下订单 -->
			<view class="offline-box">
				<view class="offline">
					<view class="offline-order" 
					style="border-radius: 0;
					box-shadow: none;
					border-top-left-radius: 20rpx;
					border-top-right-radius: 20rpx;">
						<view class="left">
							<image :src="$aliImage + 'offline-icon-all.png'" mode=""></image>
							<text>童书馆借阅订单</text>
						</view>
						<view class="center">
							<image :src="$aliImage + 'offline-cut-line.png'" mode="widthFix"></image>
						</view>
						<view class="right">
							<block 
							v-for="(item, index) in offlineOrderList" 
							:key="index">
								<view class="item" @tap="goOffline(item.url)">
									<image :src="$aliImage + item.imgUrl" mode="widthFix"></image>
									<text>{{ item.text }}</text>
									<!-- Badge -->
									<view class="badge" 
									v-if="item.number && item.number != 0">
										<text v-if="item.number < 100">
										{{ item.number }}
										</text>
										<text v-else>99+</text>
									</view>
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
						<image :src="$aliImage + 'online-icon-00.png'" mode=""></image>
						<text>邮寄借阅订单</text>
					</view>
					<view class="center">
						<image :src="$aliImage + 'offline-cut-line.png'" mode="widthFix"></image>
					</view>
					<view class="online-right">
						<scroll-view scroll-x>
							<block 
							v-for="(item, index) in onlineOrderList" 
							:key="index">
								<view class="item" @tap="goOnline(item.url)">
									<image :src="$aliImage + item.imgUrl" mode=""></image>
									<view>{{ item.text }}</view>
								</view>
							</block>
						</scroll-view>
						
					</view>
					<image
					:src="$aliImage + 'offline-icon-right.png'"
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
				<image :src="$aliImage + 'my-bottom-banner.png'" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'
import etMyReadBookData from '../../components/etMyReadBookData.vue'
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
// 老师端入口
// import Entry from '@/components/teacher-components/entry.vue'
const toUrlFunction = require('@/common/toUrlFunction');
const checkLogin = require('@/common/checkLogin');
const bookListData = require('@/common/carDataOption');
const packagejson = require('@/package.json');

export default {
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	components: {
		etMyBox,
		etMyReadBookData,
		uniNoticeBar,
		// Entry
	},
	data() {
		return {
			memberIcon: '', //会员卡类别标示图
			isLogin: false, //区别用户是否登录
			free: 0,//免费次数
			member_status: 0, //区分会员
			formatMemberDueDate: '',//会员到期日
			id: '',
			$aliImage: this.$aliImage,//静态图片域名
			noticeText: '',
			failLen: 0, //逾期单数
			card_no: uni.getStorageSync("userInfo").card_no,//卡号
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
						'title'	: '钱包',
						'toUrl'	: '/pages/library/virtual?from=mine',
						// 'toUrl'	: '/pages/my/myDeposit',
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
						'imgSrc' : this.$aliImage + 'my_rule.png',
						'title'	: '规则',
						'toUrl' : '/pages/my/myRule',
						// 'count'	: '2'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_5.png',
						'title'	: '完善信息',
						'toUrl'	: '/pages/library/tied-card'
						// 'toUrl'	: '/pages/my/myInfoList'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_6.png',
						'title'	: '会员',
						'toUrl'	: '/pages/member/member'
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
					imgUrl: 'offline-icon-01.png',
					text: '待取书',
					url: '/pages/library/take-books?status=0',
					number: 0
				},
				{
					imgUrl: 'offline-icon-02.png',
					text: '待还书',
					url: '/pages/library/return-books?status=0',
					number: 0
				},
				{
					imgUrl: 'offline-icon-03.png',
					text: '已归还',
					url: '/pages/library/return-books?status=1',
					number: 0
				},
				{
					imgUrl: 'offline-icon-04.png',
					text: '已失效',
					url: '/pages/library/take-books?status=1',
					number: 0
				},
			],
			onlineOrderList: [
				{
					imgUrl: 'online-icon-01.png',
					text: '待支付',
					url: '/pages/cart/orderList?status_text=待支付'
				},
				{
					imgUrl: 'online-icon-02.png',
					text: '待发货',
					url: '/pages/cart/orderList?status_text=待发货'
				},
				{
					imgUrl: 'online-icon-03.png',
					text: '待收货',
					url: '/pages/cart/orderList?status_text=待收货'
				},
				{
					imgUrl: 'online-icon-04.png',
					text: '待归还',
					url: '/pages/cart/orderList?status_text=待还书'
				},
				{
					imgUrl: 'online-icon-05.png',
					text: '待取件',
					url: '/pages/cart/orderList?status_text=待取件'
				},
				{
					imgUrl: 'online-icon-06.png',
					text: '待评价',
					url: '/pages/cart/orderList?status_text=待评价'
				},
				{
					imgUrl: 'online-icon-07.png',
					text: '退款',
					url: '/pages/cart/orderList?status_text=退款'
				},
				{
					imgUrl: 'online-icon-08.png',
					text: '逾期',
					url: '/pages/cart/orderList?status_text=逾期'
				},
			],
			
		}
	},
	onLoad() {
		//更新tab
		// let bookCount = bookListData.cartBookCount();
	},
	onShow() {
		// 实时更新会员信息和订单数目
		this.getUserInfo()
	},
	methods: {
		
		// 获取个人信息
		getUserInfo() {
			let tmpUserInfo = uni.getStorageSync("userInfo")
			let mobile = tmpUserInfo.mobile
			if(!tmpUserInfo || JSON.stringify("tmpUserInfo") == '{}' || !mobile || mobile.replace(/\s*/g, '') == '') {
				
				uni.showToast({
					title: '请先登录',
					icon: 'none',
					duration: 1500
				})
				return
			}
			// 标识用户是否登录
			this.isLogin = true
			this.$api.offlineUserDockerInfo({ mobile: mobile })
			.then(res => {
				let data = res.data
				this.id = data.id
				this.member_status = data.member_status
				this.free = Number(data.free_bind) + Number(data.free_month)
				this.memberIcon = data.memberIcon
				if(data.formatMemberDueDate && 
				data.formatMemberDueDate.replace(/\s*/g, '') != '') {
					this.formatMemberDueDate = data.formatMemberDueDate.split(' ')[0].replace(/-/g, '.')
				}
				// 获取线下各订单数量
				this.getOfflineOrderCount(data.id)
				this.$api.getOrderCountWithCustomID({  custom_id: data.id }).then(sres=>{
					sres.data.map((item,index) => {
						this.myOrderInfo.allMenu.map((sitem,sindex) => {
							if(item.status == sitem.status){
								this.myOrderInfo.allMenu[sindex].count = item.order_total;
							}
						});
					});
					this.updateOrderInfo = true
				});
				
				this.$api.getHistoryOrderCount({custom_id: data.id}).then(sres=>{
					this.myReadInfo.allMenu.map((item,index)=>{
						if(item.title === '累计已读'){
							this.myReadInfo.allMenu[index].count = sres.data.readCount;
						}else if(item.title === '在读'){
							this.myReadInfo.allMenu[index].count = sres.data.currentReading;
						}
						
					})
				});
			})
		},
		
		// 获取线下各订单数量
		getOfflineOrderCount(id) {
			this.$api.offlineUserOrderCount({
				custom_id: id
			})
			.then(res => {
				if(res.data.status == 'ok') {
					let data = res.data.rows
					// 待取书订单数
					this.offlineOrderList[0].number = data.waitGetBookCout
					// 待还订单数(待还书+逾期数量)
					this.offlineOrderList[1].number = Number(data.waitReturnBookCout) + Number(data.overTimeBookCout)
					// 已归还订单数
					this.offlineOrderList[2].number = data.isReturnBookCout
					// 已失效订单数
					this.offlineOrderList[3].number = data.failBookCout
					// 逾期订单数
					this.failLen = data.overTimeBookCout;
					this.noticeText = `您有${this.failLen}笔订单已逾期，请移步至待还书页面及时处理`
				}

			})
		},
		
		// 跳转到会员页面
		goMember() {
			let tmpUserInfo = uni.getStorageSync("userInfo")
			let mobile = tmpUserInfo.mobile
			if(!tmpUserInfo || JSON.stringify("tmpUserInfo") == '{}' || !mobile || mobile.replace(/\s*/g, '') == '') {
				uni.showModal({
					title: '请先登录',
					success: res => {
						if(res.confirm) {
							uni.removeStorageSync("userInfo")
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					}
				})
				return
			}
			uni.navigateTo({
				url: '/pages/member/member'
			})
		},
		
		// 查看会员记录
		checkRecord() {
			uni.navigateTo({
				url: '/pages/member/member-record'
			})
		},
		
		// 重新登录
		clearSessionAction() {
			uni.showActionSheet({
			    itemList: [ '重新登录', '版本号:' + packagejson.version ],
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
		
		// 线下订单页跳转
		goOffline(url) {
			let userInfo = uni.getStorageSync("userInfo")
			if(userInfo.name === 'guest' || userInfo.mobile == '' || !userInfo.name || !userInfo.mobile) {
				uni.showModal({
					title: '请先登录',
					content: '是否前往登录页',
					success: res => {
						if(res.confirm) {
							uni.removeStorageSync("userInfo")
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					}
				})
				return
			}
			
			uni.navigateTo({
				url
			})
		},
		// 线上订单页跳转
		goOnline(url) {
			let userInfo = uni.getStorageInfoSync("userInfo")
			if(userInfo.name === 'guest' || userInfo.mobile == '') {
				uni.showModal({
					title: '请先登录',
					content: '是否前往登录页',
					success: res => {
						if(res.confirm) {
							uni.removeStorageSync("userInfo")
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					}
				})
				return
			}
			if(url === '/pages/cart/orderList?status_text=待还书') {
				uni.navigateTo({
					url
				})
			}
			else {
				uni.showToast({
					title: '邮寄借阅系统升级中，暂不对外开放',
					icon: 'none',
					duration: 1500
				})
			}
			// console.log(url)
			// uni.navigateTo({
			// 	url
			// })
		},
		// 查看线上全部订单
		goOnlineAll() {
			uni.showToast({
				title: '邮寄借阅系统升级中，暂不对外开放',
				icon: 'none',
				duration: 1500
			})
			return
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
	position: relative;
}
.offline-box .offline-order .right .item image {
	width: 60rpx;
	height: 60rpx;
}
.offline-box .offline-order .right .item .badge {
	position: absolute;
	right: 16rpx;
	top: 8rpx;
	background: rgb(244,53,48);
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32rpx;
	height: 32rpx;
	border-radius: 50%;
	font-size: 18rpx;
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
	display: flex;
	align-items: center;
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
/* 个人信息 */
.top-position {
	height: 472upx;
	width: 100%;
	padding: relative;
	background: rgb(235, 248, 255);
}
.top-position .bg {
	height: 472rpx;
	display: block;
	width: 100%;
}
.top-position .card-number {
	position: absolute;
	font-size: 24rpx;
	color: #fff;
	left: 336rpx;
	top: 104rpx;
}
.content-position {
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: rgb(235, 248, 255);
}
.top-position .context {
	box-sizing: border-box;
	padding: 0 70rpx 0 75rpx;
	width: 100%;
	position: absolute;
	left: 50%;
	top: 188rpx;
	transform: translateX(-50%);
	z-index: 12;
}
.userInfo-position {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	margin: 0 auto;
}
.user-left-position {
	flex: 1;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	box-sizing: border-box;
}
.user-right-position image {
	width: 80rpx;
	height: 80rpx;
	flex-shrink: 0;
	border-radius: 50%;
	margin-right: 12rpx;
}
.userInfo-content {
	display: flex;
	flex-direction: column;
	color: #fff;
}
.userInfo-name {
	display: flex;
	align-items: center;
}
.userInfo-name text {
	font-size: 30rpx;
	margin-bottom: 4rpx;
}
.userInfo-name image {
	width: 90rpx; 
	height: 28rpx;
}
.user-right {
	box-sizing: border-box;
	flex-shrink: 0;
}
.user-right image {
	width: 167rpx;
	height: 54rpx;
}
.borrow-count {
	color: #fff;
	font-size: 20rpx;
	margin-top: 60rpx;
	display: flex;
	align-items: center;
	text-align: right;
	justify-content: space-between;
}
.borrow-count .right {
	display: flex;
	align-items: center;
}
.borrow-count .right image {
	width: 12rpx;
	height: 12rpx;
	margin-left: 8rpx;
}
.my-box-position {
	width: 94%;
}
</style>
