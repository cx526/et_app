<template>
	<view v-if="isLogin">
		<!--
			由于放在弹窗组件内生成不了二维码(具体原因未知);只能放到外边生成二维码保存路径到src上，点击订单凭证弹窗改变val的值重新生成二维码赋值给当前取书订单凭证二维码 
		 -->
		<view 
		v-if="isGenerate"
		style="opacity: 0;position: absolute;left: 0;top: 0;z-index: -1;">
			<tki-qrcode
			cid="qrcode" 
			ref="qrcode" 
			:val="val" 
			:size="200" 
			onval="true" 
			:loadMake="true" 
			:usingComponents="true" 
			@result="qrR" 
			 />
		</view>
		<!-- tab切换 -->
		<view class="tab-box">
			<block 
			v-for="( item, index ) in tabList.list"
			:key="index"
			>
				<view class="item" 
				:class=" tabList.currentIndex == index ? ' active' : '' "
				@tap="changTab(index)">
				{{ item.title }}
				</view>
			</block>
		</view>
		<!-- 待归还书单 -->
		<block v-if="tabList.currentIndex == 0">
			<view v-if="waitOrderList && waitOrderList.length > 0">
				<view class="order-list"
				v-for="(item, index) in waitOrderList"
				:key="index">
					<view class="item">
						<view class="topic">
							<view style="font-weight: bold;">订单号：{{ item.order_no }}</view>
							<!-- 取书时间+5天-当前时间 > 0 ? 未逾期 ： 逾期 -->
							<view v-if="item.msg">
								<view
								class="status"
								:class="item.msg && item.msg.indexOf('待归还') !== -1 ? '': 'colorActive'"
								>
										<text>{{ item.msg }}</text>
								</view>
							</view>
							
						</view>
						<view class="book-list">
							<block 
							v-for="(list, listIndex) in item.dockerInfo" 
							:key="listIndex">
								<view class="book-item">
									<view class="show">
										<image :src="list.pic"></image>
									</view>
									
									<view class="title">
										{{ list.title }}
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
									<text>创建时间：{{ item.handle_create_time }}</text>
								</view>
								<!-- 积分支付 -->
								<view class="text spcial" 
								v-if="item.pay_type != 'shell'">
									<view>
										<text>积分：-50</text>
										<text style="color: #f00;">（优惠{{ item.dockerInfo[0].price }}贝）</text>
									</view>
									<view style="font-weight: bold; color: #000;">
										<text>实付：0</text>
									</view>
								</view>
								<!-- 五车贝支付 -->
								<view class="text spcial"
								v-else>
									<view style="font-weight: bold; color: #000;">
										<text>实付：{{item.price}}</text>
									</view>
								</view>
							</view>
							<view class="btn">
								<view style="flex: 1;"></view>
								<view class="btn-box">
									<view class="borrow" @tap="open(item)">
										<text>还书码</text>
									</view>
								</view>
									
							</view>
						</view>
					</view>
				</view>
				<!-- 加载更多组件 -->
				<uni-load-more
				:status="loadStatus" 
				:content-text="loadText" 
				v-if="isLoadingMore" />
			</view>
			<!-- 不存在显示无订单组件 -->
			<view v-else >
				<offline-none-order></offline-none-order>
			</view>
			
		</block>
		<!-- 已归还书单 -->
		<block v-else>
			<view v-if="returnOrderList && returnOrderList.length > 0">
				<view class="order-list"
				v-for="(item, index) in returnOrderList"
				:key="index">
					<view class="item">
						<view class="topic">
							<view style="font-weight: bold;">订单号：{{ item.order_no }}</view>
							<view>
								<view class="status">
										<text>已归还</text>
								</view>
							</view>
							
						</view>
						<view class="book-list">
							<block 
							v-for="(list, listIndex) in item.dockerInfo" 
							:key="listIndex">
								<view class="book-item">
									<view class="show">
										<image :src="list.pic"></image>
									</view>
									
									<view class="title">
										{{ list.title }}
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
									<text>创建时间：{{ item.handle_create_time }}</text>
								</view>
								<!-- 积分支付 -->
								<view class="text spcial"
								v-if="item.pay_type != 'shell'">
									<view>
										<text>积分：-50</text>
										<text style="color: #f00;">（优惠{{ item.dockerInfo[0].price }}贝）</text>
									</view>
									<view style="font-weight: bold; color: #000;">
										<text>实付：0</text>
									</view>
								</view>
								<!-- 五车贝支付 -->
								<view class="text spcial"
								v-else>
									<view style="font-weight: bold; color: #000;">
										<text>实付：{{item.price}}</text>
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
				<!-- 加载更多组件 -->
				<uni-load-more
				:status="loadStatus" 
				:content-text="loadText" 
				v-if="isLoadingMore" />
			</view>
			<view v-else>
				<offline-none-order></offline-none-order>
			</view>
		</block>

		<!-- 订单凭证弹窗 -->
		<uni-popup ref="orderPopUp">
			<view class="order-box"  :style="{ width: popUpWidth }">
				
				<view class="title">
					<text class="line" style="margin-right: 16rpx;"></text>
					<text class="circle" style="margin-right: 20rpx;"></text>
					<text>还书二维码</text>
					<text class="circle" style="margin-left: 20rpx;"></text>
					<text class="line" style="margin-left: 16rpx;"></text>
				</view>
				<view class="notice">
					<view>请将此二维码放至扫码区</view>
					<view>获取个人书单信息</view>
				</view>
				<view class="code">
					<image :src="src" mode="widthFix" v-if="val"></image>
				</view>
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
				<view class="code-number" >
					<text>{{ code }}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import offlineNoneOrder from '@/components/offline-components/offline-none-order.vue'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				requestTime: null,
				code: '',//还书码
				val: '', //订单二维码内容
				src: '',//二维码生成路径
				isGenerate: false, //判断是否要生成二维码
				isLogin: false, //判断用户是否登录
				isLoadingMore: true, //判断加载组件是否显示
				userInfo: '',//储存用户账号信息
				popUpWidth: 0,
				tabList: {
					currentIndex: 0,
					list: [
						{
							title: '待归还书单'
						},
						{
							title: '已归还书单',
						}
					]
				},
				loadStatus: 'loading',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				waitOrderList: [],//待还书单列表
				waitOrderTotalPage: 0,//待还书单总数
				waitOrderPageSize: 20,//待还书单返回条数(每页)
				waitOrderPage: 1,//待还书单当前页码
				returnOrderList: [],//已归还书单列表
				returnOrderTotalPage: 0,//已归还书单总数
				returnOrderPageSize: 4, //已归还书单返回条数(每页)
				returnOrderPage: 1,//已归还书单当前页码
				current_time_stamp: '', //储存每次进入页面当前时间戳
			}
		},
		components: {
			uniPopup,
			uniLoadMore,
			offlineNoneOrder,
			tkiQrcode
		},
		onLoad(option) {
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
			this.getLogin();
			// 获取用户信息
			this.getUserInfo();
			// 获取进入当前页面的时间戳
			this.current_time_stamp = new Date().getTime();
		},
		onReachBottom() {
			// 待还书单上拉加载
			// if(this.waitOrderTotalPage > this.waitOrderList.length && this.tabList.currentIndex == 0) {
			// 	this.loadStatus = "loading"
			// 	this.waitOrderPage = this.waitOrderPage + 1;
			// 	this.getWaitOrderList()
			// }
			if(this.returnOrderTotalPage > this.returnOrderList.length && this.tabList.currentIndex == 1) {
				this.loadStatus = "loading"
				this.returnOrderPage = this.returnOrderPage + 1;
				this.getReturnOrderList()
			}
		},
		onUnload() {
			clearInterval(this.requestTime) //清除订单刷新状态
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
			// 获取用户账号信息
			getUserInfo() {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({ filterItems: { mobile } }).then(res => {
					this.userInfo = res.data[0];
					// 获取待归还书书单
					this.getWaitOrderList()
					// 获取已归还书单
					this.getReturnOrderList()
				})
			},
			// 获取待归还书书单
			getWaitOrderList() {
				uni.showLoading({
					title: '数据加载中',
					mask: true
				})
				// 如果不是合作用户不发送请求
				this.userInfo.dockerInfo && this.$api.offlineUserOrderList({
					docker_mac: this.userInfo.dockerInfo.docker_mac,
					filterItems:{
						custom_id: this.userInfo.id,
						order_type: 4 //待归还书单类型
					}
				})
				.then(res => {
					uni.hideLoading()
					// 储存订单总数
					this.waitOrderTotalPage = res.data.totalPage
					// 判断是否要生成二维码
					if(res.data.rows && res.data.rows.length > 0) {
						this.isGenerate = true
					}
					res.data.rows && res.data.rows.map(item => {
						// 保留两位小数
						item.price = (+item.price).toFixed(2)
						// 格式化订单创建时间
						item.handle_create_time = this.handleTime(item.create_time)
						// 计算借书时间是否逾期
						item.formatPreReturnBookTime = item.formatPreReturnBookTime.replace(/-/g, '/');
						item.handle_get_book = new Date(item.formatPreReturnBookTime).getTime();
						let difference = item.handle_get_book - this.current_time_stamp;
						// 时间戳转为天计算
						let day = Math.ceil(Math.abs(difference / (24 * 3600 * 1000))) 
						if(difference >= 0) {
							item.msg = `待归还${day}天`
							// item.color = true
						}else {
							item.msg = `已逾期${day}天`
							// item.color = false
						}
					})
					this.waitOrderList = [...this.waitOrderList, ...res.data.rows]
					// 判断是否改变加载组件状态
					if(this.waitOrderTotalPage <= this.waitOrderList.length) {
						this.loadStatus = "noMore"
					}
				})
			},
			// 获取已归还书单
			getReturnOrderList() {
				// 如果不是合作用户不发送请求
				this.userInfo.dockerInfo && this.$api.offlineUserOrderList({
					pageSize: this.returnOrderPageSize,
					currentPage: this.returnOrderPage,
					docker_mac: this.userInfo.dockerInfo.docker_mac,
					filterItems:{
						custom_id: this.userInfo.id,
						order_type: 1 //已完成书单类型
					}
				}).then(res => {
					// 储存订单总数
					this.returnOrderTotalPage = res.data.totalPage
					
					res.data.rows && res.data.rows.map(item => {
						// 保留两位小数
						item.price = (+item.price).toFixed(2)
						// 格式化订单创建时间
						item.handle_create_time = this.handleTime(item.create_time)
						// 计算借书时间是否逾期(取书时间+5天-现在时间做判断)
						// item.handle_get_book = new Date(item.create_time).getTime() + (24 * 3600 * 1000 * 5);
						// let difference = item.handle_get_book - this.current_time_stamp;
						// 时间戳转为天计算
						// let day = Math.ceil(Math.abs(difference / (24 * 3600 * 1000))) 
						// if(difference >= 0) {
						// 	item.msg = '已归还'
						// }else {
						// 	item.msg = `已逾期${day}天`
						// }
					})
					this.returnOrderList = [...this.returnOrderList, ...res.data.rows]
					// 判断是否改变加载组件状态
					if(this.returnOrderTotalPage <= this.returnOrderList.length) {
						this.loadStatus = "noMore"
					}
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
				this.tabList.currentIndex = index
				if(index == 0) {
					this.waitOrderList = ''
					this.returnOrderPage = 1
					this.getWaitOrderList()
					if(this.waitOrderList.length < 
					this.waitOrderTotalPage){
						// 重置加载组件的加载状态
						this.loadStatus = 'loading';
						// 重置上拉加载的状态
						this.isLoadingMore = true
					}else {
						this.loadStatus = 'noMore';
					}
				}else if(index == 1) {
					this.returnOrderList = ''
					this.waitOrderPage = 1
					this.getReturnOrderList()
					if(this.returnOrderList.length < 
					this.returnOrderTotalPage){
						// 重置加载组件的加载状态
						this.loadStatus = 'loading';
						// 重置上拉加载的状态
						this.isLoadingMore = true
					}else {
						this.loadStatus = 'noMore';
					}
				}
				// // 重置加载组件的加载状态
				// this.loadStatus = 'loading';
				// // 重置上拉加载的状态
				// this.isLoadingMore = true
			},
			// 打开订单凭证弹窗
			open(item) {
				this.code = item.get_book_code //还书码
				this.val = item.get_book_qrcode // 还书二维码内容
				this.$refs.orderPopUp.open()
				this.requestTime = setInterval(() => {
					if(this.tabList.currentIndex == 0) {
						console.log('开启了定时器')
						this.userInfo.dockerInfo 
						&& this.$api.offlineUserOrderList({
							// pageSize: this.waitOrderPageSize,
							// currentPage: this.waitOrderPage,
							docker_mac: this.userInfo.dockerInfo.docker_mac,
							filterItems:{
								custom_id: this.userInfo.id,
								order_type: 4 //待归还书单类型
							}
						})
						.then(res => {
							if(res.data.rows.length != this.waitOrderList.length) {
								console.log('entry')
								// 重置当前页面时间戳
								this.current_time_stamp = new Date().getTime();
								// 重置数据
								this.waitOrderList = [];
								this.getWaitOrderList()
								 // this.userInfo.dockerInfo && this.$api.offlineUserOrderList({
								 // 	pageSize: this.waitOrderPageSize,
								 // 	currentPage: this.waitOrderPage,
								 // 	docker_mac: this.userInfo.dockerInfo.docker_mac,
								 // 	filterItems:{
								 // 		custom_id: this.userInfo.id,
								 // 		order_type: 4 //待归还书单类型
								 // 	}
								 // }).then(res => {
									//  this.waitOrderList = res.data.rows
								 // })
							}
						})
					}
				
				}, 2000)
				
			},
			
			// 关闭订单凭证弹窗
			close() {
				this.$refs.orderPopUp.close()
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
		background: #EBF8FF;
	}
	.tab-box view {
		flex: 1;
		text-align: center;
		border-bottom: 6px solid #BDEBF5;
		
	}
	.tab-box view.active {
		border-color: #30AAC3;
		color: #3FB0C8;
	}
	/* 订单 */
	page {
		background: #F9F9F9;
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
		display: flex;
		padding: 0 24rpx;
		border-bottom: 1px solid #EAEAEA;
		justify-content: space-between;
		font-size: 28rpx;
		align-items: center;
		line-height: 60rpx;
		
	}
	.order-list .topic .status {
		color: #68C1D4;
		text-align: right;
	}
	.order-list .topic .status.active {
		color: #f00;
	}
	.order-list .book-list {
		box-sizing: border-box;
		padding: 20rpx;
		border-bottom: 1px solid #EEEEEF;
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
		border: 1px solid #EBEBEB;
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
		margin-left: 80rpx;
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
	.order-list .btn .borrow{
		box-sizing: border-box;
		padding: 0 30rpx;
		border: 1px solid #EEEEEF;
		border-radius: 40rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #039EB9;
		height: 60rpx;
		
	}
	.order-list .btn .del {
		background: #fff;
		margin-right: 12rpx;
		color: #666;
	}
	.order-list .btn .borrow {
		background-image: linear-gradient(180deg, #40AED1, #69D9E4);
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
		margin-bottom: 16rpx;
		display: flex;
		color: #3CAFC7;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	.order-box .title .line {
		width: 74rpx;
		background: #CAE6F2;
		height: 1px;
	}
	.order-box .title .circle {
		width: 16rpx;
		height: 16rpx;
		background: #CAE6F2;
		transform: rotate(45deg);
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
		color: #30AAC3;
	}
	.colorActive {
		color: #f00 !important;
	}
</style>
