<template>
	<view>
		<!-- 订单 -->
		<view class="order-list">
			<view class="item">
				<view class="topic">
					<view>订单号：23123123123342</view>
					<view class="status">
						<view style="color: rgb(0,128,0);">待支付</view>
						<view>
							<text>剩余：</text>
							<text style="color: rgb(0,128,0)">{{ msg }}</text>
						</view>
					</view>
				</view>
				<view class="book-list">
					<block v-for="n in 4" :key="n">
						<view class="book-item">
							<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
							<view class="title">
								不要告状，除非是大事
							</view>
							<view class="number">
								x1
							</view>
						</view>
					</block>
				</view>
				<view class="order-info">
					<view class="left">
						<view class="text">
							<text>创建时间：2020-07-19 16：00：00</text>
						</view>
						<view class="text">
							<text>借阅币：30</text>
						</view>
						<view class="text">
							<text>实付：20</text>
						</view>
						<view class="text">
							<text style="color: #f00;">优惠10借书币</text>
						</view>
						<view class="text">
							<text>积分：-100</text>
						</view>
					</view>
					<view class="right">
						<button type="default" style="margin-right: 24rpx;">支付</button>
						<button type="default">取消</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 过期未支付订单 -->
		<view class="order-list">
			<view class="item">
				<view class="topic">
					<view>订单号：23123123123342</view>
					<view class="status">
						<text style="color: #999;">取消支付</text>
					</view>
				</view>
				<view class="book-list">
					<block v-for="n in 2" :key="n">
						<view class="book-item">
							<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
							<view class="title">
								不要告状，除非是大事
							</view>
							<view class="number">
								x1
							</view>
						</view>
					</block>
				</view>
				<view class="order-info">
					<view class="left">
						<view class="text">
							<text>创建时间：2020-07-19 16：00：00</text>
						</view>
						<view class="text">
							<text>借阅币：30</text>
						</view>
						<view class="text">
							<text>实付：20</text>
						</view>
						<view class="text">
							<text style="color: #f00;">优惠10借书币</text>
						</view>
						<view class="text">
							<text>积分：-100</text>
						</view>
					</view>
					<view class="right">
						<button type="default">删除</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxtime: 80,
				minutes: 0,
				seconds: 0,
				msg: '',
				timer: null
			}
		},
		onShow() {
			// this.timer = setInterval(() => {
			// 	this.countDown()
			// }, 1000)
		},
		onUnload() {
			// clearInterval(this.timer)
		},
		methods:{
			countDown() {
				// maxtime = 当前时间 - 订单创建时间 >= 0开启定时器
				if (this.maxtime >= 0) {
					this.maxtime -- ;
					this.minutes = Math.floor(this.maxtime / 60) >= 10 ?
					Math.floor(this.maxtime / 60)
					:
					'0' + (Math.floor(this.maxtime / 60))
					this.seconds = Math.floor(this.maxtime % 60) >= 10 ? 
					Math.floor(this.maxtime % 60) 
					: 
					'0' + (Math.floor(this.maxtime % 60))
					this.msg = this.minutes + "：" + this.seconds;
					
					console.log(this.msg)
				}else {
					clearInterval(this.timer)
				}
			}
		},
		
		
	}
</script>

<style>
	page {
		background: rgb(245,245,245);
		box-sizing: border-box;
		padding: 0 20rpx 20rpx 20rpx;
	}
	.order-list {
		box-sizing: border-box;
		
		margin-top: 20rpx;
	}
	.order-list .item {
		box-sizing: border-box;
		background: #fff;
		padding: 20rpx 0;
		border-radius: 20rpx;
	}
	.order-list .topic {
		display: flex;
		padding: 0 24rpx;
		border-bottom: 1px solid #EEEEEF;
		justify-content: space-between;
		font-size: 28rpx;
		align-items: center;
		padding-bottom: 10rpx;
	}
	.order-list .topic .status {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		text-align: right;
	}
	.order-list .book-list {
		box-sizing: border-box;
		padding: 0 20rpx;
		border-bottom: 1px solid #EEEEEF;
	}
	.order-list .book-item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.order-list .book-item:last-child {
		margin-bottom: 0;
	}
	.order-list .book-item image {
		width: 160rpx;
		height: 140rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	.order-list .book-item .title {
		font-size: 28rpx;
		flex: 1;
	}
	.order-list .book-item .number {
		flex-shrink: 0;
		margin-left: 80rpx;
		font-size: 26rpx;
	}
	.order-list .order-info {
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
	}
	.order-list .order-info .left {
		font-size: 24rpx;
		color: #333;
	}
	.order-list .order-info .left .text {
		line-height: 36rpx;
	}
	.order-list .order-info .right {
		display: flex;
	}
	.order-list .order-info .right button {
		font-size: 26rpx;
	}
</style>
