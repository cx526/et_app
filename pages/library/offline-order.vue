<template>
	<view style="box-sizing: border-box;padding-bottom: 120rpx;">
		<uni-nav-bar 
		left-icon="back"  
		title="订单详情" 
		status-bar
		@clickLeft="clickLeft"></uni-nav-bar>
		<view style="box-sizing: border-box;padding:24rpx 24rpx 110rpx 24rpx;">
			<!-- 订单 -->
			<view class="order-info">
				<view class="list">
					<block v-for="n in 5" :key="n">
						<view class="item">
							<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
							<view class="context">
								<view class="title">
									<text>不要告状，除非是大事</text>
									<text>x1</text>
								</view>
								<view class="price">
									<view>借阅币：39.99</view>
								</view>
							</view>
							
						</view>
					</block>
					
				</view>
			</view>
			<view class="main">
				<view class="borrow-time">
					<view class="label">提取方式</view>
					<view class="time">书柜自提</view>
				</view>
				<view class="borrow-time">
					<view class="label">学校</view>
					<view class="time">林头幼儿园</view>
				</view>		
				<view class="borrow-time">
					<view class="label">借阅时间</view>
					<view class="time back">
						<text>2020-07-19 16：00：00</text>
						<text style="color: #f00;">借阅期为5天，请按时归还哦</text>
					</view>
				</view>
				<view class="borrow-time">
					<view class="label">预计归还时间</view>
					<view class="time">2020-07-24 16：00：00</view>
				</view>
				<!-- 支付方式 -->
				<view class="way-info">
					<view class="left">
						支付方式
					</view>
					<view class="right">
						<!-- 当前用户有免费借阅次数时显示 -->
						<view class="item">
							<radio-group class="radio"
							@change="radioChange"
							>
								<view 
								v-for="(item, index) in wayList" 
								:key="index"
								>
									<radio 
									:value="item.value" 
									style="transform: scale(0.6);"
									color="#00B7CC"
									:checked="item.value == way"></radio>
									<text style="color: #000;font-weight: 700;">{{ item.title }}</text>
								</view>
							</radio-group>
							<!-- 没有免费借阅次数默认选中借阅币支付 -->
						</view>
						<!-- 选择借书币时显示 -->
						<block v-if="way == 1">
							<view class="item">
								<view>我的借阅币：</view>
								<view style="color: #72C5D7;font-weight: bold;">100</view>
							</view>
							<view class="item">
								<view>支付借阅币：</view>
								<view>100</view>
							</view>
							<view class="item">
								<view>押金(可退)：</view>
								<view>60元</view>
							</view>
							<view class="item" style="color: #999;">
								<view>借阅币：</view>
								<view>-20.00</view>
							</view>
						</block>
						<!-- 选择免费借阅时显示 -->
						<block v-if="way == 0">
							<view class="item">
								<view>我的借阅币：</view>
								<view style="color: #72C5D7;font-weight: bold;">100</view>
							</view>
							<view class="item">
								<view>支付借阅币：</view>
								<view>100</view>
							</view>
							<view class="item">
								<view>积分：-100</view>
							</view>
							<view class="item">
								<view>押金(可退)：</view>
								<view>60元</view>
							</view>
						</block>
					</view>	
				</view>
			</view>
			<!-- 底部 -->
			<view class="bottom-box">
				<view class="left">
					<view style="font-size: 28rpx;margin-right: 24rpx;">
						<text 
						style="color: #838383;font-weight: 700;">借阅币：</text>
						<text style="color: #30AAC3;">54.00</text>
					</view>
					<view style="font-size: 24rpx;color: #B7B7B7;">
						<text>押金：29元</text>
					</view>
				</view>
				<view class="right" @tap="borrow">
					<text>确认借阅</text>
				</view>
			</view>
			<!-- 确认支付弹窗 -->
			<uni-popup ref="popup">
				<view class="balance-box" :style="{ width: popUpWidth }">
					<view class="title"><text>订单确认</text></view>
					<view class="notice">
						<view>
							<text>本次需要借书币：</text>
							<text style="color: #12a4bd;font-weight: blod;">79.90</text>
						</view>
						<view>
							<text>您的借阅书籍量：</text>
							<text style="color: #12a4bd;font-weight: blod;">5</text>
						</view>
					</view>
					<view class="show">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/library-pop-banner.png" mode="widthFix"></image>
					</view>
					<view class="btn">
				
						<view @tap="cancel">取消</view>
						<view @tap="payment">确认支付</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				way: 1,
				wayList: [
					{
						value: 0,
						title: '免费借阅'
					},
					{
						value: 1,
						title: '借阅币'
					}
				],
				popUpWidth: 0,
			}
		},
		components: {
			uniPopup,
			uniNavBar
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.popUpWidth = res.windowWidth * 0.8 + 'px'
				}
			})
		},
		methods: {
			// 免费借阅/借书币切换
			radioChange(e) {
				console.log(e.detail.value);
				this.way = e.detail.value
			},
			// 点击自定义导航栏左侧按钮事件
			clickLeft() {
				uni.reLaunch({
					url: '../cart/cart?flag=true'
				})
			},
			// 确认借阅
			borrow() {
				this.$refs.popup.open()
			},
			// 取消订单
			cancel() {
				uni.navigateTo({
					url: './no-payment'
				})
		
			},
			// 确认支付(若无押金需要调起微信支付,若有需要扣除借书币)
			payment() {
				uni.navigateTo({
					url: './take-books'
				})
			}
		}
	}
</script>

<style >
	page {
		background: rgb(245,245,245);
		box-sizing: border-box;
	}
	/* 订单 */
	.order-info {
		box-sizing: border-box;
		background: #fff;
		border-radius: 12rpx;
		font-size: 28rpx;
		margin-top: 24rpx;
	}
	.order-info .list {
		box-sizing: border-box;
	}
	.order-info .list .item {
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		/* align-items: center; */
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		margin-bottom: 24rpx;
		border-radius: 20rpx;
	}
	.order-info .list .item:last-child {
		margin-bottom: 0;
	}
	.order-info .list .item image {
		width: 180rpx;
		height: 160rpx;
		flex-shrink: 0;
		margin-right: 16rpx;
	}
	.order-info .list .item .context {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.order-info .list .item .title {
		font-size: 30rpx;
		font-weight: bold;
		margin-top: 26rpx;
		flex: 1;
		display: flex;
		justify-content: space-between;
	}
	.order-info .list .item .price {
		font-size: 28rpx;
		margin-left: 20rpx;
		text-align: right;
		color: #72C5D7;
	}
	.main {
		background: #fff;
		box-sizing: border-box;
		padding: 20rpx;
		margin-top: 20rpx;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		border-radius: 20rpx;
	}
	/* 借阅时间 */
	.borrow-time {
		box-sizing: border-box;
		display: flex;
		padding: 24rpx 0;
		background: #fff;
		border-radius: 8rpx;
		justify-content: space-between;
		border-bottom: 1px solid #E8E8E8;
	}
	.borrow-time .label {
		font-size: 28rpx;
		font-weight: bold;
	}
	 .borrow-time .time {
		font-size: 26rpx;
		color: #333;
		text-align: right;
		color: #939393;
	}
	.borrow-time .time.back {
		display: flex;
		flex-direction: column;
	}
	/* 支付方式 */
	.way-info {
		box-sizing: border-box;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.way-info .left {
		font-size: 28rpx;
		font-weight: bold;
		flex-shrink: 0;
	}
	.way-info .right {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		color: #333;
		font-size: 26rpx;
	}
	.way-info .right .radio {
		display: flex;
		align-items: center;
		font-size: 26rpx;
	}
	.way-info .right .radio view:nth-child(1) {
		margin-right: 20rpx;
	}
	.way-info .right .item {
		box-sizing: border-box;
		align-items: center;
		margin-bottom: 16rpx;
		text-align: right;
	}
	.way-info .right .item:last-child {
		margin-bottom: 0;
	}
	.way-info .right .item view {
		display: inline-block;
	}
	/* 底部 */
	.bottom-box {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 28rpx;
		z-index: 20;
		font-size: 26rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		line-height: 80rpx;
	}
	.bottom-box .left {
		box-sizing: border-box;
		flex: 1;
		display: flex;
	}
	.bottom-box .right  {
		flex-shrink: 0;
		line-height: 60rpx;
		font-weight: blod;
		font-size: 28rpx;
		background-image: linear-gradient(180deg, #40AED1, #69D9E4);
		color: #fff;
		border-radius: 32rpx;
		box-sizing: border-box;
		padding: 4rpx 40rpx;
	}

	/* 确认支付弹窗 */
	.balance-box {
		box-sizing: border-box;
		background: #fff;
		margin: 0 auto;
		padding-top: 50rpx;
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
		width: 328rpx;
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
