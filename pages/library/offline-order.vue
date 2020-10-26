<template>
	<view>
		<view class="order-box">
			<scroll-view scroll-y style="max-height: 600rpx;">
				<view v-for="(item,index) in chooseBookList"
					class="order" :key="index">
					<view class="left">
						<image :src="item.forGoodsPic[0].url" mode="widthFix">
						</image>
					</view>
					<view class="right">
						<view class="topic">
							<text style="font-weight: 700;">{{ item.title }}</text>
							<text style="color: #2AAEC4;">{{ item.price }}贝</text>
						</view>
						<view class="number">
							<image :src="$aliImage + 'rubbish.png'" mode="widthFix"
							 style="width: 24rpx;"
							@tap="delBook(item.id)">
							</image>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
		<view class="order-detail">
			<view class="detail">
				<view class="item">
					<text class="label">提取方式</text>
					<text class="way">书柜自提</text>
				</view>
				<view class="item">
					<text class="label">学校</text>
					<text class="way">{{ school_name }}</text>
				</view>
				<view class="spcial">
					<text class="label">借阅时间</text>
					<view class="way">
						<text style="color: #FE6555;margin-bottom: 6rpx;">
							借阅期为3天，节假日顺延</text>
						<text>取书之日开始计算</text>
					</view>
				</view>
				<!-- 支付方式 -->
				<view class="pay">
					<text style="font-weight: 700;font-size: 30rpx;">支付方式</text>
					<view class="payWay">
						<radio-group @change="choosePayWay" >
							<!-- 学生免费借阅才需要积分，教师和园长不需要 -->
							<view class="radio-item"
							v-if="free > 0 && chooseBookList.length == 1">
							<!-- 学生免费借阅需要积分 -->
							<template v-if="isTeacherFree && integrate >= 50 && data.custom_type === '1'">
								<radio color="#2AAEC4" value="coin" 
								:checked="type == 'coin'"></radio>
								<text 
								style="font-weight: 700;font-size: 30rpx;">
								免费借阅
								</text>
							</template>
							<!-- 教师/园长免费借阅不需要积分 -->
							<template v-if="isTeacherFree  && data.custom_type !== '1'">
								<radio color="#2AAEC4" value="coin" 
								:checked="type == 'coin'"></radio>
								<text 
								style="font-weight: 700;font-size: 30rpx;">
								免费借阅
								</text>
							</template>	
							</view>
							<view class="radio-item">
								<radio color="#2AAEC4" value="shell"
								:checked="type == 'shell'"></radio>
								<text
								style="font-weight: 700;font-size: 30rpx;">五车贝</text>
							</view>
							<view class="radio-item" 
							v-if="member_status && member_status == 1">
								<radio color="#2AAEC4" value="member"
								:checked="type == 'member'"></radio>
								<text style="font-weight: 700;font-size: 30rpx;">会员</text>
							</view>
						</radio-group>
					</view>
				</view>
				
				<view class="notice-way">
					<!-- 选择积分借阅显示 -->
					<view>
						<view>
							<text class="label">我的五车贝：</text>
							<text class="number">{{ shell }}</text>
						</view>
						<view>
							<text class="label">本次借阅实付：</text>
							<text class="number">{{ price }}</text>
						</view>
						<view v-if="type == 'coin'">
							<!-- 学生免费借阅才显示 -->
							<view v-if="data.custom_type === '1'">
								<text class="label">我的积分：</text>
								<text class="number">{{ integrate }}</text>
							</view>
							<view>
								<text class="label">免费次数：</text>
								<text class="number">{{ free }}</text>
							</view>
							<!-- 学生免费借阅才显示 -->
							<view v-if="data.custom_type === '1'">
								<text class="label">积分：</text>
								<text class="number">-50</text>
							</view>
						</view>
						<view v-else-if="type == 'member'">
							<view>
								<text class="label">最多同时借阅：</text>
								<text class="number">{{ readInfo.allCount }}本</text>
							</view>
							<view>
								<text class="label">当前已借阅：</text>
								<text class="number">{{ readInfo.orderCount }}本</text>
							</view>
							<view>
								<text class="label">剩余可借阅：</text>
								<text class="number">{{ readInfo.mayReadCount }}本</text>
							</view>
						</view>
					</view>
				</view>
				
				
				
			</view>
		</view>
		<!-- 底部 -->
		<view class="bottom">
			<view class="left">
				<view style="font-size: 28rpx;margin-right: 40rpx;">
					<text style="font-weight: 700;color: #808080;">五车贝：</text>
					<text style="color: #2AAEC4;">{{ price }}</text>
				</view>
				<view style="font-size: 22rpx; color: #808080;"
				v-if="!member_status && card_type != 'TEACHER_CARD'">
					<text>押金：29元（可退）</text>
				</view>
			</view>
			<view class="right" @tap="borrow">
				<text>立即借阅</text>
			</view>
		</view>
		<!-- 押金不足显示弹窗 -->
		<uni-popup ref="depositPopUp" :maskClick="false">
			<view class="balance-box" :style="{ width: popUpWidth }">
				<view class="title"><text>押金不足！</text></view>
				<view class="notice">
					<view >
						<text>线下借阅需要押金：</text>
						<text style="color: #12A4BD;">29元</text>
					</view>
					
					<view>
						<text>您的押金：</text>
						<text style="color: #12A4BD;">{{ deposit }}</text>
					</view>
				</view>
				<view class="show">
					<image :src="$aliImage + 'popup-banner.png'" mode="widthFix"></image>
				</view>
				<view class="btn">
					<view @tap="cancel('depositPopUp')">取消</view>
					<view @tap="goPay">去充值</view>
				</view>
			</view>
		</uni-popup>
		<!-- 借书币不足显示弹窗 -->
		<uni-popup ref="popup" :maskClick="false">
			<view class="balance-box" :style="{ width: popUpWidth }">
				<view class="title"><text>五车贝不足！</text></view>
				<view class="notice">
					<view>
						<text>本次需要五车贝：</text>
						<text style="color: #12A4BD;">{{ price }}</text>
					</view>
					
					<view>
						<text>您的五车贝：</text>
						<text style="color: #12A4BD;">{{ shell }}</text>
					</view>
				</view>
				<view class="show">
					<image :src="$aliImage + 'popup-banner.png'" mode="widthFix"></image>
				</view>
				<view class="btn">
					<view @tap="cancel('popup')">取消</view>
					<view @tap="goPay">去充值</view>
				</view>
			</view>
		</uni-popup>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				popUpWidth: 0, //弹窗宽度
				type: '',//支付方式
				chooseBookList: [], //储存书籍数据
				len: 0, //书籍本书
				price: 0,//借阅需要支付的总五车贝
				integrate: 0, //积分
				free: 0, //免费次数
				shell: 0, // 五车贝
				deposit: 0, //押金
				userInfo: '', //储存用户账号个人信息
				id: '', //用户id
				card_no: '', //用户卡号
				card_type: '', //用户卡号类型(学生/老师)
				school_name: '', //用户所在的学校
				goods_id: '', //储存书籍id(1,2,3)
				member_status: 0, //区分是否是会员
				readInfo: '', //会员用户借阅情况
				isTeacherFree: true ,//教师卡是否当天已使用过免费借阅
			}
		},
		onLoad(option) {
			this.chooseBookList = uni.getStorageSync("offlinePlaceBook")
			// this.chooseBookList = JSON.parse(option.chooseBookList)
			this.len = this.chooseBookList.length
			// 获取用户个人信息
			this.getUserInfo()
			// 获取屏幕高度
			uni.getSystemInfo({
				success: res => {
					this.popUpWidth = res.windowWidth * 0.8 + 'px'
				}
			})
		},
		onReady() {
			// this.$refs.popup.open()
		},
		methods: {
			// 获取用户个人信息
			 getUserInfo() {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.offlineUserDockerInfo({ mobile })
				.then(res => {
					let data = res.data
					// 用户个人信息
					this.userInfo = data
					// 积分
					this.integrate= Number(data.coin) ? Number(data.coin) : 0
					// 押金
					this.deposit= Number(data.deposit) ? Number(data.deposit) : 0
					//五车贝
					this.shell= Number(data.shell) ? Number(data.shell) : 0
					// 免费次数
					this.free = Number(data.free_bind) + Number(data.free_month)
					? Number(data.free_bind) + Number(data.free_month) : 0
					console.log(this.integrate, this.free)
					// 用户id
					this.id = data.id
					// 用户所在的学校
					this.school_name = data.school_name
					// 是否为会员
					this.member_status = data.member_status
					// 如果是会员才发起接口请求
					if(this.member_status == "1") {
						this.getUserMemberRead(this.id)
					}
					// 卡号
					this.card_no = data.card_no
					if(this.card_no && this.card_no.replace(/\s*/g, '') != '') {
						this.card_type = this.checkCardType(this.card_no)
					}
					// 如果是老师卡需要判断该老师/园长当天是否已免费借过一次(一本) 1学生 0老师
					if(data.custom_type == '0' || data.custom_type == '2') {
						this.checkTeacherTodayOfflineOrde(this.id)
					}
					// 选择默认支付方式
					this.chooseDefaultType()
				})
			},
			
			// 默认选择支付方式
			chooseDefaultType() {
				if(this.member_status == "1" && this.readInfo.mayReadCount > 0) {
					this.price = 0
					this.type = "member"
				}else {
					if(this.free > 0 && this.integrate >= 50 && this.chooseBookList.length == 1) {
						this.price = 0
						this.type = "coin"
					}else {
						// 默认选择五车贝时需要计算价格
						this.type = "shell"
						if(this.chooseBookList && this.chooseBookList.length > 0) {
							this.chooseBookList.map(item => {
							this.price = (Number(this.price) + Number(item.price)).toFixed(2)
							})
							
							console.log(this.price)
						}
					}
				}
			},
			
			// 选择支付方式
			choosePayWay(event) {
				this.type = event.detail.value
				switch(this.type) {
					// 积分借阅
					case 'coin':
						this.price = 0
						break
					// 五车贝借阅
					case 'shell':
						let amount = 0
						this.chooseBookList.map(item => {
							amount = (+amount + (+item.price)).toFixed(2)
						})
						this.price = amount
						break
					// 会员借阅
					case 'member':
						this.price = 0
						break
					default: 
						return
				}
			},
			
			// 获取会员用户可借阅本数与在读本数
			getUserMemberRead(id) {
				let params = {
					custom_id: String(id)
				}
				this.$api.getMemberRead(params)
				.then(res => {
					if(res.data.status === 'ok') {
						this.readInfo = res.data.rows
						// 选择默认支付方式
						this.chooseDefaultType()
					}else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1500
						})
					}
				})
			},
			
			// 检测老师当天是否使用过免费借阅次数
			checkTeacherTodayOfflineOrde(id) {
				let params = {
					teacher_id: String(id)
				}
				this.$api.checkTeacherTodayOfflineOrde(params)
				.then(res => {
					if(res.data.status == 'ok') {
						let freeBuyStatus = res.data.rows.freeBuyStatus
						// 可以免费借阅
						if(freeBuyStatus == '0') {
							this.isTeacherFree = true
						}else {
							this.isTeacherFree = false
						}
					}else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1500
						})
					}
				})
			},
			
			// 区分老师教师卡
			checkCardType(val) {
				let prefix = val.substring(0, 2)
				let cardType = val.substring(2, 3)
				if (prefix === 'ET') {
					if (cardType === '0') {
						// 老师卡
						return 'TEACHER_CARD'
					} else if (cardType === '1') {
						// 学生卡
						return 'STUDENT_CARD'
					}else if (cardType === '2') {
						// 园长卡
						return 'LEADER_CARD'
					}
				}else {
					return ''
				}
			},
			
			// 删除书籍
			delBook(id) {
				let dataList = this.chooseBookList;
				if(dataList.length == 1) {
					uni.showToast({
						title: '每次下单不能少于一本！',
						icon: 'none',
						duration: 2000
					})
					return
				}
				uni.showModal({
					title: '是否确认移除此书籍?',
					success: res => {
						if (res.confirm) {
							dataList && dataList.map((item, index) => {
								if (item.id === id) {
									dataList.splice(index, 1);
								}
								this.chooseBookList = dataList
								// 重新计算价格(只有五车贝时需要)
								if(this.type == 'shell') {
									this.price = 0
									this.chooseBookList.map(item => {
										this.price = (Number(this.price) + Number(item.price))
										.toFixed(2)
									})
								}
							});
						}
					}
				});
			},
			
			// 立即借阅(老师免押金，学生是会员免押金，不是需要会员)
			borrow() {
				// 没有选择支付类型
				if(this.type == '') {
					uni.showToast({
						title: '请选择借阅方式',
						icon: 'none',
						duration: 1000
					})
					return
				}
				// 储存书籍id
				let goodsIDs = [];
				this.chooseBookList && this.chooseBookList.forEach(item => {
					goodsIDs.push(item.id);
				});
				this.goods_id = goodsIDs.join(',')
				switch(this.type) {
					// 积分借阅(老师卡/园长卡积分借阅不需要押金)
					case "coin":
						if(this.deposit < 29 && this.card_type != 'TEACHER_CARD' && this.card_type != 'LEADER_CARD') {
							// 如果不是会员(学生)
							if(this.member_status != "1") {
								// 押金不足弹窗显示
								this.$refs.depositPopUp.open()
							}else {
								this.price = 0
								// 执行下单
								this.placeOrder(this.goods_id, 'coin')
							}
						}else {
							this.price = 0
							// 执行下单
							this.placeOrder(this.goods_id, 'coin')
						}
						break
					// 五车贝支付(老师/园长借阅不需要押金)
					case "shell":
						if(this.deposit < 29 && this.card_type != 'TEACHER_CARD' && this.card_type != 'LEADER_CARD') {
							if(this.member_status != "1") {
								// 押金不足弹窗显示
								this.$refs.depositPopUp.open()
							}else if(this.shell < Number(this.price)) {
								// 五车贝不足弹窗显示
								this.$refs.popup.open()
							}else {
								this.placeOrder(this.goods_id, 'shell')
							}
						}else if(this.shell < Number(this.price)) {
							// 五车贝不足弹窗显示
							this.$refs.popup.open()
						}else {
							this.placeOrder(this.goods_id, 'shell')
						}
						break
					// 会员支付
					case 'member':
						this.price = 0
						// 需要判断当前用户是否有用会员借超过5本
						let len = Number(this.chooseBookList.length)
						let mayReadCount = Number(this.readInfo.mayReadCount)
						if(len > mayReadCount) {
							if(mayReadCount > 0) {
								uni.showToast({
									title: '当前最多只能再借阅'+mayReadCount+'本',
									icon: 'none',
									duration: 2000
								})
							}else {
								uni.showToast({
									title: '当前可借阅为'+mayReadCount+'本,请归还后再进行借阅',
									icon: 'none',
									duration: 2000
								})
							}
							return
						}
						this.placeOrder(this.goods_id, 'member')
						break
					default: 
						return
				}
			},
			
			// 下单
			placeOrder(goods_id, type) {
				uni.showLoading({
					title: '订单提交中',
					mask: true
				})
				this.$api.offlinePlaceOrder({
					goods_id,
					type,
					customer_id: this.userInfo.id,
				}).then(res => {
					// 下单成功
					if(res.data.status == 'ok') {
						uni.hideLoading()
						// 剔除书篮已下单过得书籍
						this.handlePlaceBooks();
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						})
						// 跳转到取书页
						uni.redirectTo({
							url: '/pages/library/take-books?status=0&from=placeOrder'
						})
					}else {
						uni.hideLoading()
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			
			// 下单成功后剔除书篮中已下单过的书籍
			handlePlaceBooks() {
				let cacheBooksList = uni.getStorageSync("offlineCartList");
				let chooseBooksList = this.chooseBookList;
				for(let i = 0; i < cacheBooksList.length; i++) {
					for(let j = 0; j < chooseBooksList.length; j++) {
						if(cacheBooksList[i].id == chooseBooksList[j].id) {
							cacheBooksList.splice(i ,1);
						}
					}
				}
				uni.setStorageSync("offlineCartList", cacheBooksList);
			},
			
			// 点击取消弹窗
			cancel(type) {
				switch(type) {
					case 'popup':
					this.$refs.popup.close()
					break
					case 'depositPopUp':
					this.$refs.depositPopUp.close()
					break
					default: 
					return 
				}
			},
			
			// 跳转充值页面
			goPay() {
				uni.redirectTo({
					url: '/pages/library/virtual'
				})
			}
			
		}
	}
</script>

<style>
	page {
		background: #f9f9f9;
		box-sizing: border-box;
		padding-bottom: 100rpx;
	}
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
</style>
<style scoped>
	/* 订单书籍 */
	.order-box {
		box-sizing: border-box;
		padding: 34rpx 24rpx 0  24rpx;
		margin-bottom: 24rpx;
	}
	.order {
		box-sizing: border-box;
		background: #fff;
		padding: 10rpx 36rpx 10rpx 26rpx;
		display: flex;
		border-radius: 20rpx;
		box-shadow: 0px 0px 3rpx 0px rgba(0,0,0,0.1); 
		margin-bottom: 14rpx;
	}
	.order-box .left {
		flex-shrink: 0;
		box-sizing: border-box;
		margin-right: 20rpx;
	}
	.order-box .left image {
		width: 120rpx;
		height: 120rpx;
		display: block;
	}
	.order-box .right {
		flex: 1;
	}
	.order-box .right .topic {
		box-sizing: border-box;
		padding-top: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}
	.order-box .right .number {
		text-align: right;
		color: #808080;
		font-size: 28rpx;
		margin-top: 10rpx;
	}
	/* 订单详情 */
	.order-detail {
		box-sizing: border-box;
		padding: 0 24rpx ;
	}
	.order-detail .detail {
		box-sizing: border-box;
		background: #fff;
		padding: 10rpx 36rpx 10rpx 26rpx;
		border-radius: 20rpx;
		box-shadow: 0px 0px 3rpx 0px rgba(0,0,0,0.1); 
		margin-bottom: 14rpx;
	}
	.order-detail .item {
		display: flex;
		line-height: 80rpx;
		font-size: 24rpx;
		justify-content: space-between;
		border-bottom: 1px solid rgba(112,112,112,0.2);
	}
	.order-detail .item .label {
		font-weight: 700;
	}
	.order-detail .item .way {
		color: #808080;
	}
	.order-detail .spcial {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		height: 90rpx;
		border-bottom: 1px solid rgba(112,112,112,0.2);
		align-items: center;
	}
	.order-detail .spcial .label {
		font-weight: 700;
	}
	.order-detail .spcial .way {
		display: flex;
		flex-direction: column;
		text-align: right;
	}
	
	.order-detail .pay {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		height: 100rpx;
	}
	.order-detail .pay .label {
		font-weight: 700;
		flex-shrink: 0;
	}
	.order-detail .pay .payWay {
		box-sizing: border-box;
	}
	.order-detail .pay .payWay radio-group {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		text-align: right;
	}
	.order-detail .pay .radio-item {
		display: flex;
		align-items: center;
	}
	.order-detail .pay .payWay radio {
		transform: scale(0.75);
	}
	.order-detail .notice-way {
		font-size: 24rpx;
		text-align: right;
	}
	.order-detail .notice-way view {
		line-height: 50rpx;
	}
	.order-detail .notice-way .label {
		width: 200rpx;
		display: inline-block;
	}
	.order-detail .notice-way .number {
		min-width: 70rpx;
		display: inline-block;
		color: #2AAEC4;
		text-align: left;
	}
	.bottom {
		position: fixed;
		width: 100%;
		height: 100rpx;
		bottom: 0;
		left: 0;
		z-index: 9;
		background: #fff;
		box-sizing: border-box;
		padding: 0 36rpx 0 60rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.bottom .left {
		display: flex;
		align-items: center;
	}
	.bottom .right {
		height: 60rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #fff;
		width: 198rpx;
		background-image: linear-gradient(to right, #40aed1, #69d9e4);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* 借书币不够时显示弹窗 */
	.balance-box {
		box-sizing: border-box;
		background: #fff;
		margin: 0 auto;
		padding-top: 36rpx;
		border-radius: 12rpx;
		padding-bottom: 36rpx;
	}
	.balance-box .title {
		font-weight: 700;
		font-size: 32rpx;
		text-align: center;
		margin-bottom: 36rpx;
		color: #12a4bd;
	}
	.balance-box .notice {
		font-size: 26rpx;
		box-sizing: border-box;
		padding: 0 60rpx;
		text-align: left;
	}
	.balance-box .notice view {
		box-sizing: border-box;
		margin-bottom: 12rpx;
		text-align: center;
	}
	.balance-box .show {
		text-align: center;
		box-sizing: border-box;
		padding: 24rpx 0;
	}
	.balance-box .show image {
		width: 200rpx;
	}
	.balance-box .btn {
		display: flex;
		box-sizing: border-box;
		padding: 0 24rpx;
	}
	.balance-box .btn view {
		flex: 1;
		font-size: 28rpx;
		line-height: 70rpx;
		background: #fff;
		border-radius: 40rpx;
		box-sizing: border-box;
		text-align: center;
	}
	.balance-box .btn view:nth-child(1) {
		margin-right: 12rpx;
		background: #f9f9f9;
		border: 1px solid #eeeeef;
		color: #adadad;
	}
	.balance-box .btn view:nth-child(2) {
		margin-left: 12rpx;
		background-image: linear-gradient(180deg, #40aed1, #69d9e4);
		color: #fff;
	}
</style>
