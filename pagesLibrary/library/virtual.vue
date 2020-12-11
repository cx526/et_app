<template>
	<view>
		<!-- 自定义标题 -->
		<uni-nav-bar left-icon="back" title="我的钱包" status-bar :shadow="false" @clickLeft="clickLeft"></uni-nav-bar>
		<!-- banner -->
		<view class="pay-box">
			<image :src="$aliImage + 'library-money-01.png'" mode="widthFix" class="banner"></image>
			<view class="context">
				<!-- 押金 -->
				<view class="item" v-if="deposit == 0">
					<view class="topic">
						<image :src="$aliImage + 'library-money-icon02.png'" mode="" class="icon"></image>
						<text style="font-weight: 700;margin-right: 19rpx;">押金</text>
						<!-- 有押金显示退还 -->
						<view class="btn" @tap="goDeposit" v-if="deposit > 0">
							<text>{{ refundInfoText }}</text>
						</view>
						<!-- 无押金显示充值 -->
						<view class="btn" v-if="deposit == 0" @tap="goDepositPay">
							<text>立即充值</text>
						</view>
					</view>
					<view class="number">
						<text>{{ deposit }}</text>
					</view>


				</view>
				<!-- 五车贝 -->
				<view class="item" v-else>
					<view class="topic">
						<image :src="$aliImage + 'library-money-icon01.png'" mode="" class="icon"></image>
						<text style="font-weight: 700;margin-right: 19rpx;">五车贝</text>
						<view class="btn" @tap="goPay">
							<text>立即充值</text>
						</view>
					</view>
					<view class="number">
						<text>{{ shell }}</text>
					</view>
				</view>
				<!-- 五车贝 -->
				<!-- <view class="item">
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
				</view> -->


			</view>

		</view>
		<!-- 通知条 -->
		<view class="message-box">
			<view class="message">
				<image :src="$aliImage+'read-inform.png'" mode="widthFix"></image>
				<view style="flex: 1" v-if="deposit != 0" @tap="goDeposit">
					<view v-if="refundInfoText === '退还押金'">
						<text>您已充值{{ deposit }}元押金，书籍归还后可</text>
						<text style="text-decoration: underline;color: #039EB9;font-weight: 700;">申请提现</text>
					</view>
					<text v-else>您的退还押金申请正在审核中</text>
				</view>
				<view style="flex: 1;" v-else @tap="goDepositPay">
					<text>借阅需充值29元押金，书籍归还后可申请提现</text>
				</view>
			</view>
		</view>
		<!-- 充值记录 -->
		<view class="pay-record">
			<!-- <view class="title">
				<text class="line" style="margin-right: 16rpx;"></text>
				<text class="circle" style="margin-right: 20rpx;"></text>
				<text style="margin: 0 40rpx;">五车贝记录</text>
				<text class="circle" style="margin-left: 20rpx;"></text>
				<text class="line" style="margin-left: 16rpx;"></text>
			</view> -->
			<view class="context">
				<view class="record-title">
					<view>
						<view class="line"></view>
						<text>五车贝记录</text>
					</view>
				</view>
				<block v-if="payRecordList && payRecordList.length > 0">
					<view class="main" v-for="(item, index) in payRecordList" :key="index">
						<!--
						 充值显示判断:
						 1.event时候recharge，shell不为0，dep为0是充值五车贝 
						 2.event为rechargeDeposit shell为0，dep不为0是充值押金 
						 3.event为buyOfflineBook shell小于0为书柜借阅
						 4.event为rechargeShellDeposit 
						 shell与dep不为0是充值五车贝与押金(目前没有充值五车贝跟押金									一起，这种情况不做判断) 
						 5.event为returnDeposit，dep小于0为退还押金 
						 6.event为getBookFail shell大于0为逾期未取书
						 7.event为give为赠送
						 8.event为giveReading为阅读圈赠送
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
						<view class="item" v-else-if="item.event == 'rechargeDeposit' && item.shell == 0 && item.deposit != 0">
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
						<!-- 阅读圈赠送 -->
						<view class="item" v-else-if="item.event == 'giveReading'">
							<view class="topic">
								<text>悦读圈赠送</text>
								<text style="color: #039EB9;">
									{{ item.shell }}</text>
							</view>
							<view class="time">
								<text style="margin-right: 12rpx;">
									创建时间：{{ item.handle_create_time }}</text>
							</view>
						</view>
						<!-- 书柜借阅 -->
						<view class="item" v-else-if="item.event == 'buyOfflineBook' && item.shell < 0">
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
						<view class="item" v-else-if="item.event == 'getBookFail' && item.shell > 0">
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
						<!-- 赠送 -->
						<view class="item" v-else-if="item.event == 'give' ">
							<view class="topic">
								<text>系统赠送</text>
								<text style="color: #039EB9;">
									+{{ item.shell }}</text>
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
		<uni-load-more :status="loadStatus" :content-text="loadText" />
		<!-- 非会员用户退押金时显示弹窗 -->
		<uni-popup ref="popup">
			<view class="confirm-context" :style="{width: popUpWidth}">
				<image :src="$aliImage+'deposit-popup.png'" class="cover"></image>
				<view class="context">
					<view class="title">退还押金后，将不能继续借书</view>
					<view class="title">会员可免押金借阅</view>
					<view class="member" @tap="goMember">点击了解更多会员详情</view>
					<view class="btn">
						<view class="cancel" @tap="close">取消</view>
						<view class="confirm" @tap="sureRefundDeposit">退押金</view>
					</view>
				</view>
				
				
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const wxPay = require('@/common/wxPay')
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
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
				refundInfoText: "退还押金", //储存押金状态
				from: "", //区别页面从哪里跳转过来
				price: 29,
				member_status: '', //是否是会员 1表示是会员
				popUpWidth: 0
			}
		},
		components: {
			uniNavBar,
			uniLoadMore,
			uniPopup
		},
		onLoad(options) {
			this.from = options.from
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.popUpWidth = res.windowWidth * 0.7 + 'px'
				}
			})
		},
		onShow() {
			console.log('onShow')
			this.currentPage = 1
			this.payRecordList = []
			this.getUserInfo()
			
		},
		onReachBottom() {
			if (this.isLoadingMore) {
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
				this.$api.getCustom({
						filterItems: {
							mobile
						}
					})
					.then(res => {
						uni.hideLoading()
						this.userInfo = res.data[0]
						console.log(this.userInfo)
						// 是否是会员
						this.member_status = this.userInfo.member_status
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
					filterItems: {
						custom_id: this.id
					}
				}).then(res => {
					uni.hideLoading()
					// 格式化时间
					res.data.rows && res.data.rows.map(item => {
						item.handle_create_time = this.handleTime(item.create_date)
						// 保存两位小数
						item.shell = (Number(item.shell)).toFixed(2)
					})
					if (this.payRecordList.length == 0) {
						this.payRecordList = res.data.rows
					} else {
						this.payRecordList = [...this.payRecordList, ...res.data.rows]
					}

					// 是否开启下拉加载更多
					if (res.data.rows.length < this.pageSize) {
						this.isLoadingMore = false;
						this.loadStatus = 'noMore'
					}
				})
			},
			// 目前退还押金状态
			getRefundInfo() {
				this.$api.checkOfflineOrder({
						custom_id: this.userInfo.id
					})
					.then(res => {
						if (res.data.rows.refundInfo &&
							res.data.rows.refundInfo.length != 0) {
							this.refundInfoText = "审批中"
						}
					})
			},
			// 格式化时间
			handleTime(time) {
				let currentTime = new Date(time)
				let year = currentTime.getFullYear()
				let month = this.complement(currentTime.getMonth() + 1)
				let day = this.complement(currentTime.getDate())
				let hour = this.complement(currentTime.getHours())
				let minute = this.complement(currentTime.getMinutes())
				let second = this.complement(currentTime.getSeconds())
				let create_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`

				return create_time
			},
			// 补零
			complement(value) {
				if (value >= 10) {
					return value
				} else {
					return '0' + value
				}
			},
			// 跳转充值页面
			goPay() {
				uni.navigateTo({
					url: '/pagesLibrary/library/pay'
				})
			},
			// 点击退还押金
			goDeposit() {
				uni.showLoading({
					title: '申请退押金中',
					mask: true
				})
				// 如果是会员直接跳过显示
				if (this.member_status === '1') {
					// 查看是否有申请过退押金操作
					this.$api.checkOfflineOrder({
						custom_id: this.userInfo.id
					}).then(res => {
						let result = res.data.rows
						uni.hideLoading()
						if (result.refundInfo && result.refundInfo.length > 0) {
							uni.showToast({
								title: '押金退还审批中，请耐心等待',
								icon: 'none',
								duration: 2000
							})
							this.refundInfoText = "审批中"
							return
						} else {
							// 执行申请退押金操作
							this.sureRefundDeposit()
						}
					})
				} else {
					// 判断用户有无存在订单,没有才给退(0不给退,1给退)
					this.$api.checkOfflineOrder({
							custom_id: this.userInfo.id
						})
						.then(res => {
							let data = res.data.rows
							if (res.data.status == 'ok') {
								uni.hideLoading()
								// 存在订单，不给退押金
								if (data.canRefundStatus == 0) {
									// 存在订单
									if (data.offlineOrder.length != 0 ||
										data.onlineOrder.length != 0) {
										uni.showToast({
											title: '当前账户还有未完成订单,请先完成订单！',
											icon: 'none',
											duration: 2000
										})
										this.refundInfoText = "退还押金"
									}
									// 不存在订单但存在退押金审批状态
									else if (data.refundInfo && data.refundInfo.length != 0) {
										uni.showToast({
											title: '押金退还审批中，请耐心等待',
											icon: 'none',
											duration: 2000
										})
										this.refundInfoText = "审批中"
									}
								} else {
									// 可以退换押金
									// 非会员用户退押金做弹窗提示
									this.$refs.popup.open()
								}
							} else {
								uni.hideLoading()
								uni.showToast({
									title: '发生未知错误,请稍后再试！',
									icon: 'none',
									duration: 2000
								})
							}
						})
				}

			},
			// 确认退还押金
			sureRefundDeposit() {
				let param = {
					custom_id: this.userInfo.id,
					deposit: this.deposit
				}
				this.$api.postRefund(param).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1500
					})
					this.refundInfoText = "审批中"
					this.$refs.popup.close()
				})
			},
			// 查看会员页
			goMember() {
				uni.navigateTo({
					url: '/pages/member/member-list'
				})
			},
			// 关闭弹窗
			close() {
				this.$refs.popup.close()
			},
			// 返回借阅页面
			clickLeft() {
				// 从我的页面押金进入
				if (this.from == "mine") {
					uni.navigateBack({
						delta: 1
					})
				}
				// 从押金不足弹窗进入
				else {
					uni.reLaunch({
						// url: '/pages/cart/cart?flag=true'
						url: '/pages/cart/cart'
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
				let order_no = '' //订单号
				await this.$api.offlinePayMent({
						userInfo: userInfo,
						shell: 0, //五车贝
						deposit: this.price, //押金
						totalMoney: this.price, // 充值金额
						event: "rechargeDeposit"
					})
					.then(res => {
						resData = res.data.finalRes.xml
						order_no = res.data.order_no;
						if (resData.return_code[0] === 'SUCCESS') {
							// 获取微信签名
							let {
								paySign,
								time,
								APPID,
								nonceStr
							} = wxPay.wxReSign(resData.prepay_id[0]);
							// 调起微信支付
							wxPay.wxPay(time, nonceStr, resData.prepay_id[0], paySign,
								res => {
									console.log(res)
									if (res.errMsg === "requestPayment:ok") {
										this.$api.offlineUpdatePayMent({
											userInfo: userInfo, //个人信息
											event: "rechargeDeposit", //充值类型
											order_no: order_no, //订单号
											shell: 0, //充值五车贝
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
														// this.currentPage = 1;
														// this.payRecordList = [];
														// this.getUserInfo()
													}
												})
											})
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
		top: 50%;
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
		font-size: 32rpx;
	}

	.pay-box .context .icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 8rpx;
	}

	.pay-box .context .number {
		box-sizing: border-box;
		font-weight: bold;
		font-size: 60rpx;
	}

	.pay-box .context .btn {
		background: rgba(255, 255, 255, .4);
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 4rpx 16rpx;
		border-radius: 30rpx;
		text-shadow: 0 0 10rpx #2AAEC4;
		display: inline-block;
		width: 140rpx;
		text-align: center;
	}

	/* 通知条 */
	.message-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin: 25rpx 0;
	}

	.message {
		box-sizing: border-box;
		line-height: 60rpx;
		display: flex;
		align-items: center;
		padding: 0 40rpx;
		background: #FFFBE6;
		font-size: 22rpx;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0, 0, 0, 0.16);
	}

	.message image {
		width: 48rpx;
		flex-shrink: 0;
		margin-right: 14rpx;
	}

	/* 充值记录 */
	.pay-record {
		box-sizing: border-box;
		padding: 0 25rpx 36rpx 25rpx;
	}

	.pay-record .record-title {
		box-sizing: border-box;
		line-height: 78rpx;
		padding: 0 22rpx;
	}

	.pay-record .record-title view {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		border-bottom: 1px dashed #ADADAD;
	}

	.pay-record .record-title .line {
		width: 10rpx;
		height: 30rpx;
		background-image: linear-gradient(to bottom, #7BCFEC, #9BE6E7);
		border-radius: 16rpx;
		margin-right: 12rpx;
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
	/* 弹窗 */
	.confirm-context {
		box-sizing: border-box;
		border-radius: 16rpx;
		font-size: 30rpx;
		background: #fff;
		position: relative;
	}

	.confirm-context .cover {
		width: 240rpx;
		height: 244rpx;
		position: absolute;
		left: 50%;
		top: -120rpx;
		transform: translateX(-50%);
	}
	.confirm-context .context {
		padding-top: 120rpx;
		padding-bottom: 28rpx;
	}
	.confirm-context .title {
		box-sizing: border-box;
		text-align: center;
		font-weight: 700;
	}
	.confirm-context .member {
		box-sizing: border-box;
		text-align: center;
		color: #2AAEC4;
		margin: 15rpx 0 46rpx 0;
	}
	.confirm-context .btn {
		box-sizing: border-box;
		padding: 0 25rpx;
		display: flex;
		
	}
	.confirm-context .btn view {
		line-height: 60rpx;
		flex: 1;
		flex-shrink: 0;
		box-sizing: border-box;
		border-radius: 30rpx;
		font-size: 28rpx;
		font-weight: 700;
		text-align: center;
	}
	.confirm-context .btn .cancel {
		margin-right: 4rpx;
		background: #F9F9F9;
		color: #B3B3B3;
	}
	.confirm-context .btn .confirm {
		margin-left: 4rpx;
		background-image: linear-gradient(to right,#38B2D1, #68DDE6);
		color: #fff;
	}
</style>
