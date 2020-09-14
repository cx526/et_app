<template>
	<view>
		<uni-nav-bar
		left-icon="back"  
		title="我的钱包" 
		status-bar
		:shadow="false"
		@clickLeft="clickLeft"></uni-nav-bar>
		<view class="pay-box">
			<image :src="$aliImage + 'library-money.png'" mode="widthFix" class="banner"></image>
			<view class="context">
				<view class="item">
					<view class="topic">
						<image :src="$aliImage + 'library-money-icon01.png'" mode="" class="icon"></image>
						<text>五车贝</text>
					</view>
					<view class="number">
						<text>{{ shell }}</text>
					</view>
					<view class="btn" @tap="goPay">
						<text>立即充值</text>
					</view>
				</view>
				
				<view class="item">
					<view class="topic">
						<image :src="$aliImage + 'library-money-icon02.png'" mode="" class="icon"></image>
						<text>押金</text>
					</view>
					<view class="number">
						<text>{{ deposit }}</text>
					</view>
					<!-- 有押金显示退还 -->
					<view class="btn" @tap="goDeposit" v-if="deposit > 0"
					style="background: #f00;">
						<text>{{ refundInfo.status_text }}</text>
					</view>
					<!-- 无押金显示充值 -->
					<view class="btn" v-if="deposit == 0" @tap="goDepositPay">
						<text>立即充值</text>
					</view>
				</view>
			</view>
			
		</view>
		<view class="pay-record">
			<view class="title">
				<text class="line" style="margin-right: 16rpx;"></text>
				<text class="circle" style="margin-right: 20rpx;"></text>
				<text style="margin: 0 40rpx;">五车贝记录</text>
				<text class="circle" style="margin-left: 20rpx;"></text>
				<text class="line" style="margin-left: 16rpx;"></text>
			</view>
			<view class="context">
				<block v-for="(item, index) in payRecordList" :key="index">
					<view class="main">
						<!--
						 充值显示判断:
						 1.event时候recharge，shell不为0，dep为0是充值五车贝 
						 2.event为rechargeDeposit shell为0，dep不为0是充值押金 
						 3.event为buyOfflineBook shell小于0为书柜借阅
						 4.event为rechargeShellDeposit 
						 shell与dep不为0是充值五车贝与押金(目前没有充值五车贝跟押金									一起，这种情况不做判断) 
						 5.event为returnDeposit，dep小于0为退还押金 
						 6.event为getBookFail shell大于0为逾期未取书
						 -->
						 <!-- 充值五车贝 -->
						<view class="item" v-if="item.event == 'recharge' && item.shell != 0 && item.deposit == 0">
							<view class="topic">
									 <text>充值五车贝</text>
									 <text style="color: #039EB9;">
										 +{{ item.shell }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
						<!-- 充值押金 -->
						<view class="item" v-else-if="item.event == 'rechargeDeposit' && item.shell == 0 && item.deposit != 0" >
							<view class="topic">
								<text>充值押金</text>
								<text style="color: #039EB9;">
								+{{ item.totalMoney }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
						<!-- 书柜借阅 -->
						<view class="item" 
						v-else-if="item.event == 'buyOfflineBook' && item.shell < 0">
							<view class="topic">
									<text>书柜借阅</text>
									<text>{{ item.shell }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
						
						<!-- 书柜退还 -->
						<view class="item"
						v-else-if="item.event == 'getBookFail' && item.shell > 0">
							<view class="topic">
									<text>退还五车贝</text>
									<text style="color: #039EB9;">+{{ item.shell }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
						
						
						<!-- 退还押金 -->
						<view class="item" v-else-if="item.event == 'returnDeposit' && item.deposit < 0">
							<view class="topic">
								<text>退还押金</text>
								<text style="color: #039EB9;">
								{{ item.deposit }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
						
						<!-- 其他 -->
						<view class="item" v-else>
							<view class="topic">
								<text>其他</text>
								<text style="color: #039EB9;">
								{{ item.totalMoney }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
					</view>
				</block>
				
			</view>
			
		</view>
		<uni-load-more
		:status="loadStatus" 
		:content-text="loadText" />
	</view>
</template>

<script>
	const wxPay = require('@/common/wxPay')
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: '',
				shell: 0.00,
				deposit: 0.00,
				id: '',
				payRecordList: [],
				pageSize: 10,
				currentPage: 1,
				loadStatus: 'more',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				isLoadingMore: true,
				refundInfo: "",//储存押金状态
				from: "",//区别页面从哪里跳转过来
				price: 29
			}
		},
		components: {
			uniNavBar,
			uniLoadMore
		},
		onLoad(options) {
			console.log(options);
			this.from = options.from
		},
		onShow() {
			this.getUserInfo()
			this.payRecordList = []
		},
		onReachBottom() {
			if(this.isLoadingMore) {
				this.currentPage = this.currentPage + 1;
				this.getPayRecord()
			}
		},
		methods: {
			// 获取用户账户信息
			getUserInfo() {
				uni.showLoading({
					title: '数据加载中',
					icon: 'none'
				})
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({ filterItems: { mobile } })
				.then(res => {
					uni.hideLoading()
					this.userInfo = res.data[0];
					//储存用户的五车贝;
					this.shell = (+this.userInfo.shell).toFixed(2) ? 
					(+this.userInfo.shell).toFixed(2) : 0.00
					//储存用户的押金
					this.deposit = (+this.userInfo.deposit).toFixed(2) ? 
					(+this.userInfo.deposit).toFixed(2) : 0.00
					this.id = this.userInfo.id
					// 目前退还押金状态
					this.getRefundInfo()
					// 获取充值记录
					this.getPayRecord()
				})
			},
			// 获取充值记录
			getPayRecord() {
				uni.showLoading({
					title: '数据加载中',
					mask: true
				})
				this.$api.offlinePayRecord({
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          filterItems:{
            custom_id: this.id
          }
				}).then(res => {
					uni.hideLoading()
					// 格式化时间
					res.data.rows && res.data.rows.map(item => {
						item.handle_create_time = this.handleTime(item.create_date)
						// 保存两位小数
						item.shell = (Number(item.shell)).toFixed(2)
					})
					if(this.payRecordList.length == 0) {
						this.payRecordList = res.data.rows
					}else {
						this.payRecordList=[...this.payRecordList,...res.data.rows]
					}
					
					// 是否开启下拉加载更多
					if(res.data.rows.length < this.pageSize) {
						this.isLoadingMore = false;
						this.loadStatus = 'noMore'
					}
				})
			},
			// 目前退还押金状态
			getRefundInfo() {
				let param = { custom_id: this.userInfo.id }
				this.$api.getRefund(param).then(res => {
					console.log(res.data)
					this.refundInfo = res.data
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
			// 跳转充值页面
			goPay() {
				uni.navigateTo({
					url: './pay'
				})
			},
			// 点击退还押金
			goDeposit() {
				// 1 待退还 2 审批中 3已完成
				if (this.refundInfo.status === 1) {
					let param = { custom_id: this.userInfo.id, deposit: this.userInfo.deposit }
					this.$api.postRefund(param).then(res => {
						this.refundInfo = {
							canRefund: 1,
							status: 2,
							// status_text: '审批中',
							// msg: '退还押金审批中，请您耐心等候！'
						}
						this.getRefundInfo()
						uni.showToast({ title: res.data.msg })
					})
				} else {
					uni.showToast({ title: this.refundInfo.msg, icon: 'none' })
				}
			},
			// 返回借阅页面
			clickLeft() {
				// 从我的页面押金进入
				if(this.from == "mine") {
					uni.navigateBack({
						delta: 1
					})
				}
				// 从押金不足弹窗进入
				else {
					uni.reLaunch({
						url: '/pages/cart/cart?flag=true'
					})
				}
				
			},
			// 充值押金
			async goDepositPay() {
				uni.showLoading({
					title: '订单提交中',
					mask: true
				})
				let id = this.userInfo.id
				let userInfo = uni.getStorageSync("userInfo")
				userInfo.id = id
				let resData = ''
				let order_no = ''//订单号
				await this.$api.offlinePayMent({
					userInfo: userInfo,
					shell: 0 , //五车贝
					deposit: this.price, //押金
					totalMoney: this.price, // 充值金额
					event: "rechargeDeposit"
				})
				.then(res => {
					resData = res.data.finalRes.xml
					order_no = res.data.order_no;
					if(resData.return_code[0] === 'SUCCESS') {
						// 获取微信签名
						let { paySign, time, APPID, nonceStr } = wxPay.wxReSign(resData.prepay_id[0]);
						// 调起微信支付
						wxPay.wxPay(time, nonceStr, resData.prepay_id[0], paySign,
							res => {
								if(res.errMsg === "requestPayment:ok") {
									this.$api.offlineUpdatePayMent({
										userInfo: userInfo,//个人信息
										event: "rechargeDeposit",//充值类型
										order_no: order_no,//订单号
										shell: 0, //充值五车贝
										deposit: this.price, //押金
										totalMoney: this.price, // 充值金额
									}).then(res => {
										uni.hideLoading()
										setTimeout(() => {
											uni.showToast({
												title: '充值成功',
												duration: 2000,
												success: () => {
													// 重置当前充值记录信息
													this.currentPage = 1;
													this.payRecordList = [];
													this.getUserInfo()
												}
											})
										})
										// 跳转到我的钱包页
										// uni.redirectTo({
										// 	url: './virtual'
										// })
									})
								}
							},
							err => {
								uni.hideLoading();
								uni.showToast({
									title: '支付失败',
									icon: 'none',
									duration: 2000
								})
								console.log(err)
							}
						)
					}
				})
				
				
				
				
				
				
			},
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
	}
	.pay-box {
		box-sizing: border-box;
		padding-top: 36rpx;
		position: relative;
	}
	.pay-box .banner {
		width: 100%;
	}
	.pay-box .context {
		box-sizing: border-box;
		position: absolute;
		left: 70rpx;
		top: 156rpx;
		color: #fff;
		display: flex;
	}
	.pay-box .context .item {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.pay-box .context .item:nth-child(1) {
		margin-right: 56rpx;
	}
	.pay-box .context .topic {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.pay-box .context .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 8rpx;
	}
	.pay-box .context .number {
		box-sizing: border-box;
/* 		padding: 8rpx 0; */
		font-weight: bold;
		font-size: 42rpx;
		margin-bottom: 16rpx;
		margin-top: 12rpx;

	}
	.pay-box .context .btn {
		background: rgba(255,255,255,.4);
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 4rpx 16rpx;
		border-radius: 30rpx;
		text-shadow: 0 0 10rpx #2AAEC4;
		display: inline-block;
		width: 140rpx;
		text-align: center;
	}
	/* 充值记录 */
	.pay-record {
		box-sizing: border-box;
		padding: 36rpx 32rpx;
	}
	.pay-record .title {
		text-align: center;
		font-size: 30rpx;
		margin-bottom: 16rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
		font-weight: bold;
	}
	.pay-record .title .line {
		width: 74rpx;
		background: #CAE6F2;
		height: 1px;
	}
	.pay-record .title .circle {
		width: 16rpx;
		height: 16rpx;
		background: #CAE6F2;
		transform: rotate(45deg);
	}
	.pay-record .context {
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		padding-bottom: 30rpx;
		border-radius: 20rpx;
	}
	.pay-record .context .main {
		box-sizing: border-box;
		padding: 0 22rpx 0 22rpx;
	}
	.pay-record .context .item {
		box-sizing: border-box;
		border-bottom: 1px dashed #ADADAD;
		padding-top: 30rpx;
	}
	.pay-record .context .main:last-child .item {
		box-sizing: border-box;
		border-bottom: none;
	}
	.pay-record .context .main:last-child .time {
		margin-bottom: 0;
	}
	.pay-record .context .topic {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		font-size: 30rpx;
		box-sizing: border-box;
		padding: 0 10rpx;
	}
	.pay-record .context .time {
		font-size: 24rpx;
		color: #ADADAD;
		box-sizing: border-box;
		padding: 0 10rpx;
		margin-bottom: 22rpx;
	}
</style>
