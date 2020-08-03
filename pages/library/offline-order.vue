<template>
	<view>
		<uni-nav-bar 
		left-icon="back"  
		title="订单详情" 
		status-bar
		@clickLeft="clickLeft"></uni-nav-bar>
		<view style="box-sizing: border-box;padding:24rpx 24rpx 110rpx 24rpx;">
			<!-- 自提人信息 -->
			<view class="user-info">
				<view>
					<text class="label">提取方式：</text>
					<text>自提</text>
				</view>
				<view>
					<text class="label">学校：</text>
					<text>林头幼儿园</text>
				</view>
				<view>
					<text class="label">用户：</text>
					<text>小A</text>
				</view>
				<view>
					<text class="label">电话：</text>
					<text>134****1922</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-info">
				<view class="topic">
					<view class="line"></view>
					<text>书单</text>
				</view>
				<view class="list">
					<block v-for="n in 5" :key="n">
						<view class="item">
							<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
							<view class="title">不要告状，除非是大事</view>
							<view class="price">
								<view>x1</view>
								<view>39.99</view>
							</view>
						</view>
					</block>
					
				</view>
			</view>
			<!-- 借阅时间 -->
			<view class="borrow-time">
				<view class="label">借阅时间</view>
				<view class="time">2020-07-19 16：00：00</view>
			</view>
			<!-- 预计归还时间 -->
			<view class="borrow-time">
				<view class="label">预计归还时间</view>
				<view class="time back">
					<text>2020-07-19 16：00：00</text>
					<text style="color: #f00;">借阅时间：5天</text>
				</view>
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
								<text>{{ item.title }}</text>
							</view>
						</radio-group>
						<!-- 没有免费借阅次数默认选中借阅币支付 -->
						<!-- <view v-else>
							<radio 
							value="1" 
							style="transform: scale(0.6);" 
							checked color="#00B7CC"></radio>
							<text>借阅币</text>
						</view> -->
					</view>
					<!-- 选择借书币时显示 -->
					<block v-if="way == 1">
						<view class="item">
							<view>我的借阅币：</view>
							<view style="color: rgb(0,128,0);font-weight: bold;">100</view>
						</view>
						<view class="item">
							<view>支付借阅币：</view>
							<view>100</view>
						</view>
						<view class="item">
							<view>押金(可退)：</view>
							<view>60元</view>
						</view>
						<view class="item">
							<switch checked color="#00B7CC" style="transform: scale(0.6);"></switch>
							<view>积分：-100</view>
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
							<view style="color: rgb(0,128,0);font-weight: bold;">100</view>
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
			<!-- 底部 -->
			<view class="bottom-box">
				<view class="left">
					<view>
						<text style="margin-right: 12rpx;">借书币：54.00</text>
						<text style="color: #f00;">优惠24.00</text>
					</view>
					<view>
						<text style="color: #999;">押金：60元(可退)</text>
					</view>
				</view>
				<view class="right">
					<button type="default" @tap="borrow">确认借阅</button>
				</view>
			</view>
			<!-- 确认支付弹窗 -->
			<uni-popup ref="popup">
				<view class="balance-box" :style="{ width: popUpWidth }">
					<view class="title"><text>订单确认</text></view>
					<view class="notice">
						<view>
							<text>本次需要借书币：</text>
							<text style="color: #f00;font-weight: blod;">79.90</text>
						</view>
						<view>
							<text>您的借阅书籍量：</text>
							<text style="color: #f00;font-weight: blod;">5</text>
						</view>
					</view>
					<view class="btn">
						<button @tap="cancel">取消</button>
						<button @tap="payment">确认支付</button>
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
			// 确认支付
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
		/* padding: 24rpx; */
		box-sizing: border-box;
	}
	/* 自提人信息 */
	.user-info {
		box-sizing: border-box;
		padding: 24rpx 20rpx;
		border: 1px dashed #333;
		background: #fff;
		font-size: 28rpx;
		border-radius: 12rpx;
	}
	.user-info view {
		box-sizing: border-box;
		margin-bottom: 16rpx;
		color: #333;
	}
	.user-info view:last-child {
		margin-bottom: 0;
	}
	.user-info .label {
		font-weight: bold;
		color: #000;
	}
	/* 订单 */
	.order-info {
		box-sizing: border-box;
		background: #fff;
		padding: 24rpx 20rpx;
		border-radius: 12rpx;
		font-size: 28rpx;
		margin-top: 24rpx;
	}
	.order-info .topic {
		box-sizing: border-box;
		display: flex;
		line-height: 60rpx;
	}
	.order-info .line {
		background: rgb(0,128,0);
		height: 60rpx;
		width: 8rpx;
		margin-right: 40rpx;
	}
	.order-info .topic text {
		color: rgb(0,128,0);
	}
	.order-info .list {
		box-sizing: border-box;
		padding-top: 20rpx;
	}
	.order-info .list .item {
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		margin-bottom: 24rpx;
		border-radius: 8rpx;
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
	.order-info .list .item .title {
		font-size: 26rpx;
		flex: 1;
	}
	.order-info .list .item .price {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		font-size: 26rpx;
		margin-left: 20rpx;
		text-align: right;
	}
	/* 借阅时间 */
	.borrow-time {
		box-sizing: border-box;
		display: flex;
		padding: 20rpx;
		background: #fff;
		border-radius: 8rpx;
		margin-top: 20rpx;
		justify-content: space-between;
	}
	.borrow-time .label {
		font-size: 28rpx;
		font-weight: bold;
	}
	.borrow-time .time {
		font-size: 26rpx;
		color: #333;
		text-align: right;
	}
	.borrow-time .time.back {
		display: flex;
		flex-direction: column;
	}
	/* 支付方式 */
	.way-info {
		box-sizing: border-box;
		padding: 0 20rpx;
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
		/* display: flex; */
		align-items: center;
		/* justify-content: space-between; */
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
	}
	.bottom-box .left {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	.bottom-box .right button {
		font-size: 30rpx;
		background: rgb(0,128,0);
		color: #fff;
	}
	/* 确认支付弹窗 */
	.balance-box {
		box-sizing: border-box;
	
		background: #fff;
		margin: 0 auto;
		padding-top: 36rpx;
		border-radius: 12rpx;
	}
	.balance-box .title {
		font-size: blod;
		font-size: 32rpx;
		text-align: center;
		margin-bottom: 36rpx;
	}
	.balance-box .notice {
		font-size: 26rpx;
		text-align: center;
	
		box-sizing: border-box;
		padding: 0 60rpx;
		text-align: left;
	}
	.balance-box .notice view {
		box-sizing: border-box;
		margin-bottom: 24rpx;
	}
	.balance-box .btn {
		display: flex;
	}
	.balance-box .btn button {
		flex: 1;
		font-size: 28rpx;
		line-height: 100rpx;
		background: #fff;
		border: 1px solid #EEEEEF;
	}
	
	.balance-box .btn button::after {
		border: 0;
		border-radius: 0;
	}
</style>
