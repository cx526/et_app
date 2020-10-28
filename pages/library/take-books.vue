<template>
	<view>
		<uni-nav-bar left-icon="back" title="待取书单" status-bar :shadow="false" @clickLeft="clickLeft" fixed></uni-nav-bar>
		<!-- 
			由于放在弹窗组件内生成不了二维码(具体原因未知);只能放到外边生成二维码保存路径到src上，点击订单凭证弹窗改变val的值重新生成二维码赋值给当前取书订单凭证二维码 
		 -->
		<view style="opacity: 0;position: absolute;left: 0;top: 0;z-index: -1;" v-if="isGenerate">
			<tki-qrcode cid="qrcode" ref="qrcode" :val="val" :size="200" onval="true" :loadMake="true" :usingComponents="true" @result="qrR" />
		</view>
		<view v-if="isLogin">
			<!-- tab切换 -->
			<view class="tab-box">
				<block v-for="(item, index) in tabList.list" :key="index">
					<view class="item" :class="tabList.currentIndex == index ? ' active' : ''" @tap="changTab(index)">{{ item.title }}</view>
				</block>
			</view>

			<!-- 待归还书单 -->
			<block v-if="tabList.currentIndex == 0">
				<view v-if="orderList && orderList.length > 0">
					<view class="order-list" v-for="(item, index) in orderList" :key="index">
						<view class="item">
							<view class="topic">
								<view style="font-weight: bold;">订单号：{{ item.order_no }}</view>
								<view class="status" 
								v-if="item.order_type == 0 && item.msg">
									<text>
										请于{{ item.msg }}之前取书，超时未取书订单自动失效
									</text>
								</view>
								<view class="status" v-else><text>已失效</text></view>
							</view>
							<view class="book-list" v-if="item.dockerInfo && item.dockerInfo.length > 0">
								<block v-for="(list, listIndex) in item.dockerInfo" :key="listIndex">
									<view class="book-item">
										<view class="show"><image :src="list.forGoodsPic[0].url"></image></view>

										<view class="title">
											<view>{{ list.title }}</view>
											<view style="margin-top: 10rpx; color: #68C1D4;" v-if="list.room_id != 9999">
											{{ list.room_id }}号柜门</view>
											<view style="margin-top: 10rpx;font-size: 26rpx; color: #868686;" v-else >
												<text>此书已下架，请放于回收箱中</text>
											</view>
										</view>
										
										<view class="number">
											<text style="margin-bottom: 20rpx;">{{ list.price }}贝</text>
											<tetx>x1</tetx>
										</view>
									</view>
								</block>
							</view>
							<view class="order-info">
								<view class="left">
									<view class="text">
										<text>创建时间：{{ item.hanlde_create_time }}</text>
									</view>
									<!-- 积分/会员支付 -->
									<view class="text spcial" v-if="item.pay_type != 'shell'">
										<view v-if="item.pay_type == 'coin'">
											<text>积分：-50</text>
											<text style="color: #f00;">
												（优惠{{ item.dockerInfo[0].price }}贝）
											</text>
										</view>
										<view style="font-weight: bold; color: #000;">
											<text>实付：0</text>
										</view>
									</view>
									<!-- 五车贝支付 -->
									<view class="text spcial" v-else>
										<view style="font-weight: bold; color: #000;">
											<text>实付：{{ item.price }}</text>
										</view>
									</view>
								</view>
								<view class="btn">
									<view style="flex: 1;"></view>
									<view class="btn-box">
										<view
											class="borrow"
											@tap="cancelOrder(item)"
											style="margin-right: 12rpx; 
										background: transparent; color: #000;"
										>
											<text>取消</text>
										</view>
										<view class="borrow" @tap="open(item)"><text>取书码</text></view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<uni-load-more :status="loadStatus" :content-text="loadText" v-if="isLoadingMore" />
				</view>

				<!-- 显示暂无订单组件 -->
				<view v-else><offline-none-order></offline-none-order></view>
			</block>
			<!-- 已归还书单 -->
			<block v-else>
				<view v-if="failOrderList && failOrderList.length > 0">
					<view class="order-list" v-for="(item, index) in failOrderList" :key="index">
						<view class="item">
							<view class="topic" style="display: flex; justify-content: space-between">
								<view style="font-weight: bold;">
									订单号：{{ item.order_no }}
								</view>
								<view class="status" style="text-align: right;">
									<text style="color: #868686;">已失效</text>
								</view>
							</view>
							<view class="book-list">
								<block v-for="(list, listIndex) in item.dockerInfo" :key="listIndex">
									<view class="book-item">
										<view class="show"><image :src="list.forGoodsPic[0].url"></image></view>

										<view class="title">{{ list.title }}</view>
										<view class="number">
											<text style="margin-bottom: 20rpx;">{{ list.price }}贝</text>
											<tetx>x1</tetx>
										</view>
									</view>
								</block>
							</view>
							<view class="order-info">
								<view class="left">
									<view class="text">
										<text>创建时间：{{ item.hanlde_create_time }}</text>
									</view>
									<!-- 积分支付 -->
									<view class="text spcial" v-if="item.pay_type != 'shell'">
										<view v-if="item.pay_type == 'coin'">
											<text>积分：-50</text>
											<text style="color: #f00;">
												（优惠{{ item.dockerInfo[0].price }}贝）
											</text>
										</view>
										<view style="font-weight: bold; color: #000;">
											<text>实付：0</text>
										</view>
									</view>
									<!-- 五车贝支付 -->
									<view class="text spcial" v-else>
										<view style="font-weight: bold; color: #000;">
											<text>实付：{{ item.price }}</text>
										</view>
									</view>
								</view>
								<!-- <view class="btn">
									<view style="flex: 1;"></view>
									<view class="btn-box">
										<view class="del">
											<text>删除</text>
										</view>
									</view>
										
								</view> -->
							</view>
						</view>
					</view>
					<uni-load-more :status="loadStatus" :content-text="loadText" v-if="isLoadingMore" />
				</view>

				<!-- 显示暂无订单组件 -->
				<view v-else><offline-none-order></offline-none-order></view>
			</block>
			<!-- 订单凭证弹窗 -->
			<uni-popup ref="orderPopUp">
				<view class="order-box" :style="{ width: popUpWidth }">
					<view class="title">
						<text class="line" style="margin-right: 16rpx;"></text>
						<text class="circle" style="margin-right: 20rpx;"></text>
						<text>取书二维码</text>
						<text class="circle" style="margin-left: 20rpx;"></text>
						<text class="line" style="margin-left: 16rpx;"></text>
					</view>
					<view class="notice">
						<view>请将此二维码放至扫码区</view>
						<view>获取个人书单信息</view>
					</view>
					<view class="code"><image :src="src" mode="widthFix" v-if="val"></image></view>
					<view class="title">
						<text class="line" style="margin-right: 16rpx;"></text>
						<text class="circle" style="margin-right: 20rpx;"></text>
						<text>取书验证码</text>
						<text class="circle" style="margin-left: 20rpx;"></text>
						<text class="line" style="margin-left: 16rpx;"></text>
					</view>
					<view class="notice">
						<view>请输入以下验证码，点击确认</view>
						<view>获取个人书单信息</view>
					</view>
					<view class="code-number">
						<text>{{ code }}</text>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>

import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
import offlineNoneOrder from '@/components/offline-components/offline-none-order.vue'
import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
export default {
	data() {
		return {
			requestTime: null,
			code: '', //取书码
			val: '', //订单二维码内容
			src: '',//二维码生成路径
			isGenerate: false, //判断是否要生成二维码
			loadStatus: 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '暂无更多数据'
			},
			isLogin: false,//是否登录
			isLoadingMore: true, //是否开启上拉加载更多
			popUpWidth: 0,
			pageSize: 20, // 返回待取书单条数
			currentPage: 1, // 待取书单当前页码
			orderListPage: 0, //待取书单总数
			userInfo: '',
			orderList: [],//待取书书单
			failOrderList: [], //失效书单
			faliPageSize: 4, // 返回失效书单条数
			failCurrentPage: 1, // 失效书单当前页码
			failOrderListPage: 0, //失效书单总数
			current_timestamp: 0,
			// timer: null, //倒计时定时器
			from: '',
			tabList: {
				currentIndex: 0,
				list: [
					{
						title: '待取书单'
					},
					{
						title: '失效书单',
					}
				]
			},
		}
	},
	components: {
		uniPopup,
		uniLoadMore,
		offlineNoneOrder,
		uniNavBar,
		tkiQrcode
	},
	onLoad(option) {
		// 判断是从下单成功后跳转过来还是直接从我的页面跳转过来
		this.from = option.from ? option.from : ''
		if(option !== '{}') {
			this.tabList.currentIndex = option.status ? option.status : 0;
		}
		// 设置弹窗高度
		uni.getSystemInfo({
			success: res => {
				this.popUpWidth = res.windowWidth * 0.7 + 'px'
			}
		})
	},
	onShow() {
		this.orderList = []
		this.failOrderList = []
		// 获取当前的时间戳
		this.current_timestamp = new Date().getTime();
		this.getLogin();
		// 获取用户信息
		this.getUserInfo()
	},
	onUnload() {
		// clearInterval(this.timer)
		clearInterval(this.requestTime) //清除订单刷新状态
	},
	// 上拉加载更多
	onReachBottom() {
		// 待取书单上拉加载更多(页面在点开取书码时实时刷新更新当前订单,做不到上				拉加载更多)
		// if(this.orderListPage > this.orderList.length && this.tabList.currentIndex == 0) {
		// 	// 每次上拉加载之前需要清除下定时器防止重复开启造成错乱
		// 	clearInterval(this.timer);
		// 	// 重置加载组件的加载状态
		// 	this.loadStatus = 'loading';
		// 	this.currentPage = this.currentPage + 1;
		// 	this.getUserOrderList()
		// }
		// 失效书单上拉加载更多
		if(this.failOrderListPage > this.failOrderList.length &&
		this.tabList.currentIndex == 1){
			// 重置加载组件的加载状态
			this.loadStatus = 'loading';
			this.failCurrentPage = this.failCurrentPage + 1;
			this.getFailOrderList()
		}
	},
	methods: {
		// 检测登录状态
		getLogin() {
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo.name === 'guest' || !userInfo) {
				uni.showModal({
					title: '您还未登录！',
					content: '是否前往登录页面?',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}else {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}
				})
			}else {
				this.isLogin = true
			}
		},
		// 获取待取书书单
		getUserOrderList() {
			uni.showLoading({
				title: '数据加载中',
				mask: true
			})
			// 如果不是合作用户不发送请求
			this.userInfo.dockerInfo && this.$api.offlineUserOrderList({
				docker_mac: this.userInfo.dockerInfo.docker_mac,
				filterItems:{
					custom_id: this.userInfo.id,
					order_type: "0" //待取书单类型
				}
			})
			.then(res => {
				uni.hideLoading()
				// 储存订单总数
				this.orderListPage = res.data.totalPage
				// 判断是否要生成二维码
				if(res.data.rows && res.data.rows.length > 0) {
					this.isGenerate = true
				}
				res.data.rows && res.data.rows.map(item => {
					// 价格保留两个小数
					item.price = (+item.price).toFixed(2)
					// 格式化订单创建时间
					item.hanlde_create_time = this.handleTime(item.create_time)

					// 如果订单状态为0开启计时器
					if(item.order_type == 0) {
						// 订单失效时间formatPreGetBookTime

						item.formatPreGetBookTime = item.formatPreGetBookTime.replace(/-/g, '/');
						item.fail_timestamp = (new Date(item.formatPreGetBookTime)).getTime() ;
						item.msg = this.timestampToTime(item.fail_timestamp)
						// item.difference = item.fail_timestamp - this.current_timestamp
					}
				})

				// 开启定时器
				// this.timer = setInterval(() => {
				// 	this.orderList && this.orderList.map(list => {
				// 		// 开启计时器
				// 		if(list.order_type == 0) {
				// 			list.fail_timestamp = (+list.fail_timestamp) - 1000;
				// 			list.msg =  this.countDown(list.fail_timestamp);
				// 		}

				// 	})
				// }, 1000)
				this.orderList = [...this.orderList, ...res.data.rows];
				// 判断是否改变加载组件状态
				if(res.data.totalPage <= this.orderList.length) {
					this.loadStatus = "noMore"
				}
			})
		},
		// 获取失效书单
		getFailOrderList() {
			// 如果不是合作用户不发送请求
			this.userInfo.dockerInfo && this.$api.offlineUserOrderList({
				pageSize: this.faliPageSize,
				currentPage: this.failCurrentPage,
				docker_mac: this.userInfo.dockerInfo.docker_mac,
				filterItems:{
					custom_id: this.userInfo.id,
					order_type: 3 //失效书单类型
				}
			}).then(res => {

				// 储存订单总数
				this.failOrderListPage = res.data.totalPage

				// 格式化时间
				res.data.rows && res.data.rows.map(item => {
					// 价格保留两个小数
					item.price = (+item.price).toFixed(2)
					item.hanlde_create_time = this.handleTime(item.create_time)
				})
				this.failOrderList = [...this.failOrderList, ...res.data.rows]
				// 判断是否改变加载组件状态
				if(res.data.totalPage <= this.failOrderList.length) {
					this.loadStatus = "noMore"
				}
			})
		},
		// 格式化时间
		timestampToTime(timestamp) {
			let date = new Date(timestamp);
			let Y = date.getFullYear() + '年'
			let M = (date.getMonth()+1 < 10 ? 
			'0'+(date.getMonth()+1) : date.getMonth()+1) + '月'
			let D = (date.getDate() < 10 ? 
			'0'+date.getDate() : date.getDate()) + '日'
			let h = (date.getHours() < 10 ? 
			'0'+date.getHours() : date.getHours()) + '时'
			let m = (date.getMinutes() < 10 ? 
			'0'+date.getMinutes() : date.getMinutes()) + '分'
			// let s = (date.getSeconds() < 10 ? 
			// '0'+date.getSeconds() : date.getSeconds())
			let strDate = Y+M+D+h+m
			return strDate;
			},

		// 倒计时
		countDown(time) {
			let msg = '';
			if (time > 0) {
				// let hours = parseInt(time / (1000 * 60 * 60 )) >= 10 ?	parseInt(time / (1000 * 60 * 60 )) : '0' + parseInt(time / (1000 * 60 * 60 ))
				// let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) >= 10 ?
				// parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
				// :
				// '0' + parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
				// let seconds = parseInt((time % (1000 * 60)) / 1000) >= 10 ?
				// parseInt((time % (1000 * 60)) / 1000)
				// :
				// '0' + parseInt((time % (1000 * 60)) / 1000);
				// msg = (`${hours}:${minutes}:${seconds}`)
				msg = this.timestampToTime(time)
				return msg

			}else {
				msg = '已失效';
				return msg
			}
		},
		// 获取个人账户信息
		getUserInfo() {
			let mobile = uni.getStorageSync("userInfo").mobile;
			this.$api.getCustom({ filterItems: { mobile } }).then(res => {
				this.userInfo = res.data[0];
				// 获取待取书书单
				this.getUserOrderList()
				// 获取失效书单
				this.getFailOrderList()
			})
		},
		// 格式化时间
		handleTime(time) {
			let currentTime = new Date(time)
			let year = currentTime.getFullYear()
			let month =  this.complement(currentTime.getMonth() + 1)
			let day = this.complement(currentTime.getDate())
			let hour = this.complement(currentTime.getHours())
			let minute = this.complement(currentTime.getMinutes())
			let second = this.complement(currentTime.getSeconds())
			let create_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`

			return create_time
		},
		// 补零
		complement(value) {
			if(value >= 10) {
				return value
			}else {
				return '0' + value
			}
		},
		// tab切换
		changTab(index) {
			clearInterval(this.requestTime) //清除订单刷新状态
			// clearInterval(this.timer)
			this.tabList.currentIndex = index;
			if(index == 0) {
				this.orderList = ''
				this.failCurrentPage = 1
				this.getUserOrderList()
				if(this.orderList.length < this.orderListPage) {
					this.loadStatus = 'loading'
					this.isLoadingMore = true
				}else {
					this.loadStatus = 'noMore'
				}
			}else if(index == 1) {
				this.failOrderList = ''
				this.currentPage = 1
				this.getFailOrderList()
				if(this.failOrderList.length < this.failOrderListPage) {
					this.loadStatus = 'loading'
					this.isLoadingMore = true
				}else {
					this.loadStatus = 'noMore'
				}
			}
		},
		// 打开订单凭证弹窗
		open(item) {
			clearInterval(this.requestTime) //清除订单刷新状态
			this.code = item.get_book_code //还书码
			this.val = item.get_book_qrcode // 还书二维码内容;
			this.$refs.orderPopUp.open();
			this.requestTime = setInterval(() => {
				if(this.tabList.currentIndex == 0) {
					console.log('开启了定时器')
					this.$api.offlineUserOrderList({
						// pageSize: this.pageSize,
						// currentPage: this.currentPage,
						docker_mac: this.userInfo.dockerInfo.docker_mac,
						filterItems:{
							custom_id: this.userInfo.id,
							order_type: "0" //待取书单类型
						}
					})
					.then(res => {
						console.log(res.data.rows)
						if(res.data.rows.length != this.orderList.length) {
							console.log('enter')
							// 重置当前的时间戳
							this.current_timestamp = new Date().getTime();
							// 重置页面数据
							this.orderList = []
							// 清除倒计时计时器
							// clearInterval(this.timer);
							this.getUserOrderList()
						}
					})
				}
			}, 2000)

		},
		// 取消订单
		cancelOrder(item) {
			console.log(item)
			uni.showModal({
				title: '是否确认取消此订单?',
				success: res => {
					if(res.confirm) {
						let order_id = item.order_id
						let params = {
							id: order_id
						}
						this.$api.cancelOfflineOrder(params).then(res => {
							console.log(res)
							if(res.data.status == 'ok') {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1500
								})
								// 重置订单页面
								this.orderList = []
								// clearInterval(this.timer) //重置定时器
								this.getUserOrderList()
							}else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none',
									duration: 1500
								})
							}
						})
					}
				}
			})

		},
		// 点击自定义导航栏左侧按钮事件
		clickLeft() {
			// 从下单成功跳转过来
			if(this.from == 'placeOrder') {
				uni.reLaunch({
					// url: '../cart/cart?flag=true'
					url: '../cart/cart'
				})
			}else {
				uni.navigateBack({
					delta: 1
				})
			}
		},
		// 二维码生成的路径,改变二维码的内容(val值会重新出发此方法)
		qrR(res) {
			this.src = res
		},
	}
}
</script>

<style>
/* tab切换 */
.tab-box {
	box-sizing: border-box;
	display: flex;
	line-height: 80rpx;
	color: #333;
	font-size: 28rpx;
	background: #ebf8ff;
}
.tab-box view {
	flex: 1;
	text-align: center;
	border-bottom: 6px solid #bdebf5;
}
.tab-box view.active {
	border-color: #30aac3;
	color: #3fb0c8;
}
/* 订单 */
page {
	background: #f9f9f9;
	box-sizing: border-box;
	padding-bottom: 30rpx;
}
.order-list {
	box-sizing: border-box;
	box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
	border-radius: 28rpx;
	margin-top: 20rpx;
	padding: 0 30rpx;
}

.order-list .item {
	box-sizing: border-box;
	background: #fff;
	padding: 20rpx;
	border-radius: 20rpx;
}
.order-list .topic {
	/* display: flex; */
	padding: 0 24rpx;
	border-bottom: 1px solid #eaeaea;
	/* justify-content: space-between; */
	font-size: 26rpx;
	align-items: center;
	line-height: 60rpx;
}
.order-list .topic .status {
	color: #68c1d4;
	/* text-align: right; */
}
.order-list .topic .status.active {
	color: #f00;
}
.order-list .book-list {
	box-sizing: border-box;
	padding: 20rpx;
	border-bottom: 1px solid #eeeeef;
}
.order-list .book-item {
	box-sizing: border-box;
	display: flex;
	margin-bottom: 20rpx;
}
.order-list .book-item:last-child {
	margin-bottom: 0;
}
.order-list .book-item .show {
	box-sizing: border-box;
	border: 1px solid #ebebeb;
	margin-right: 20rpx;
}
.order-list .book-item image {
	width: 120rpx;
	height: 120rpx;
	flex-shrink: 0;
}
.order-list .book-item .title {
	font-size: 28rpx;
	flex: 1;
	font-weight: bold;
	box-sizing: border-box;
	margin-top: 28rpx;
}
.order-list .book-item .number {
	flex-shrink: 0;

	font-size: 26rpx;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	margin-top: 28rpx;
	color: #868686;
	text-align: right;
}
.order-list .order-info {
	box-sizing: border-box;
	padding: 0 20rpx;
	margin-top: 20rpx;
}
.order-list .order-info .left {
	font-size: 24rpx;
	color: #333;
}
.order-list .order-info .left .text {
	line-height: 36rpx;
}
.order-list .order-info .left .spcial {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	margin-top: 24rpx;
}
.order-list .btn {
	display: flex;
	padding: 20rpx 0;
	box-sizing: border-box;
}
.order-list .btn .btn-box {
	display: flex;
}
.order-list .btn .del,
.order-list .btn .borrow {
	box-sizing: border-box;
	padding: 0 30rpx;
	border: 1px solid #eeeeef;
	border-radius: 40rpx;
	font-size: 26rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #039eb9;
	height: 60rpx;
}
.order-list .btn .del {
	background: #fff;
	margin-right: 12rpx;
	color: #666;
}
.order-list .btn .borrow {
	background-image: linear-gradient(180deg, #40aed1, #69d9e4);
	color: #fff;
}
/* 订单凭证弹窗 */
.order-box {
	box-sizing: border-box;
	background: #fff;
	border-radius: 16rpx;
	padding: 60rpx 40rpx;
	position: relative;
}
.order-box .title {
	text-align: center;
	font-weight: bold;
	font-size: 36rpx;
	display: flex;
	color: #3cafc7;
	align-items: center;
	justify-content: center;
	margin-bottom: 30rpx;
}
.order-box .title .line {
	width: 74rpx;
	background: #cae6f2;
	height: 1px;
}
.order-box .title .circle {
	width: 16rpx;
	height: 16rpx;
	background: #cae6f2;
	transfrom: rotate(45deg);
}
.order-box .notice {
	text-align: center;
	box-sizing: border-box;
	font-size: 32rpx;
}
.order-box .code {
	text-align: center;
	box-sizing: border-box;
	padding: 28rpx 0;
}
.order-box .code image {
	width: 200rpx;
	height: 200rpx;
}
.order-box .code-number {
	font-size: 50rpx;
	font-weight: bold;
	text-align: center;
	margin-top: 14rpx;
	color: #30aac3;
}
</style>
