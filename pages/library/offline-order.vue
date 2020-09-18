<template>
	<view>
		<view class="order-box">
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
						<text>x1</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order-detail">
			<view class="detail">
				<view class="item">
					<text class="label">提取方式</text>
					<text class="way">书柜自提</text>
				</view>
				<view class="item">
					<text class="label">学校</text>
					<text class="way">林头幼儿园</text>
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
					<text>支付方式</text>
					<view class="payWay">
						<radio-group @change="choosePayWay">
							<view class="radio-item"
							v-if="integrate >= 50 && free > 0 && 
							chooseBookList.length == 1">
								<radio color="#2AAEC4" value="coin"></radio>
								<text>免费借阅</text>
							</view>
							<view class="radio-item">
								<radio color="#2AAEC4" value="shell"></radio>
								<text>五车贝</text>
							</view>
							<!-- <view class="radio-item">
								<radio color="#2AAEC4" value="member"></radio>
								<text>会员</text>
							</view> -->
						</radio-group>
					</view>
				</view>
				
				<view class="notice">
					<!-- 选择积分借阅显示 -->
					<view>
						<view>我的五车贝：{{ shell }}</view>
						<block v-if="type == 'coin'">
							<view>我的积分：{{ integrate }}</view>
							<view>免费次数：{{ free }}</view>
							<view>积分：-50</view>
						</block>
					</view>
					<!-- 选择五车贝借阅显示 -->
					<!-- <view v-else-if="type == 'shell'">
						<view>我的五车贝：{{ shell }}</view>
					</view> -->
					<!-- 选择会员借阅显示 -->
					<!-- <view v-else-if="type == 'member'">
						<view>我的五车贝：{{ shell }}</view>
					</view> -->
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
				<view style="font-size: 22rpx; color: #808080;">
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
				goods_id: '', //储存书籍id(1,2,3)
			}
		},
		onLoad(option) {
			this.chooseBookList = JSON.parse(option.chooseBookList)
			this.len = this.chooseBookList.length
			console.log(this.chooseBookList)
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
					console.log(data)
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
					// 用户id
					this.id = data.id
					console.log(this.id,this.shell,this.deposit,this.integrate,this.free)
				})
			},
			
			// 选择支付方式
			choosePayWay(event) {
				console.log(event)
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
				}
			},
			
			// 立即借阅
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
					// 积分借阅
					case "coin":
					if(this.deposit < 29) {
						// 押金不足弹窗显示
						this.$refs.depositPopUp.open()
					}else {
						this.price = 0
						// 执行下单
						this.placeOrder(this.goods_id, 'coin')
					}
					break
					case "shell":
					this.chooseBookList.map(item => {
						this.price = (+this.price + (+item.price)).toFixed(2)
					})
					if(this.deposit < 29) {
						// 押金不足弹窗显示
						this.$refs.depositPopUp.open()
					}else if(this.shell < this.price) {
						// 五车贝不足弹窗显示
						this.$refs.popup.open()
					}else {
						this.placeOrder(this.goods_id, 'shell')
					}
					break
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
					uni.hideLoading()
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
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			
			// 下单成功后剔除书篮书籍
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
</style>
<style scoped>
	/* 订单书籍 */
	.order-box {
		box-sizing: border-box;
		padding: 34rpx 24rpx 0  24rpx;
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
	.order-detail .pay .payWay radio {
		transform: scale(0.6);
	}
	.order-detail .notice {
		font-size: 24rpx;
		text-align: right;
	}
	.order-detail .notice view {
		line-height: 50rpx;
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
