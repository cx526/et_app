<template>
	<view>
		<!-- 订单 -->
		<view class="order-list">
			<view class="item">
				<view class="topic">
					<view style="font-weight: bold;">订单号：23123123123342</view>
					<view class="status">
							<text style="margin-right: 16rpx;">待支付</text>
							<text>15：00</text>
					</view>
				</view>
				<view class="book-list">
					<block v-for="n in 4" :key="n">
						<view class="book-item">
							<view class="show">
								<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
							</view>
							
							<view class="title">
								不要告状，除非是大事
							</view>
							<view class="number">
								<text style="margin-bottom: 20rpx;">39.99贝</text>
								<tetx>x1</tetx>
							</view>
						</view>
					</block>
				</view>
				<view class="order-info">
					<view class="left">
						<view class="text">
							<text>创建时间：2020-07-19 16：00</text>
						</view>
						<view class="text spcial">
							<view>
								<text>积分：-100</text>
								<text style="color: #f00;">（优惠10贝）</text>
							</view>
							<view style="font-weight: bold; color: #000;">
								<text>实付：20</text>
							</view>
						</view>
						
						
						
					</view>
					<view class="btn">
						<view style="flex: 1;"></view>
						<view class="btn-box">
							<view class="del">
								<text>删除</text>
							</view>
							<view class="borrow">
								<text>借阅</text>
							</view>
						</view>
							
					</view>
				</view>
			</view>
		</view>
		<!-- 过期未支付订单 -->
		<view class="order-list">
			<view class="item">
				<view class="topic">
					<view style="font-weight: bold;">订单号：23123123123342</view>
					<view class="status active">
							<text>订单已取消</text>
					</view>
				</view>
				<view class="book-list">
					<block v-for="n in 4" :key="n">
						<view class="book-item">
							<view class="show">
								<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
							</view>
							
							<view class="title">
								不要告状，除非是大事
							</view>
							<view class="number">
								<text style="margin-bottom: 20rpx;">39.99贝</text>
								<tetx>x1</tetx>
							</view>
						</view>
					</block>
				</view>
				<view class="order-info">
					<view class="left">
						<view class="text">
							<text>创建时间：2020-07-19 16：00</text>
						</view>
						<view class="text spcial">
							<view>
								<text>积分：-100</text>
								<text style="color: #f00;">（优惠10贝）</text>
							</view>
							<view style="font-weight: bold; color: #000;">
								<text>实付：20</text>
							</view>
						</view>
						
						
						
					</view>
					<view class="btn">
						<view style="flex: 1;"></view>
						<view class="btn-box">
							<view class="del">
								<text>删除</text>
							</view>
						</view>
							
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
		background: #F9F9F9;
		box-sizing: border-box;
		padding: 10rpx 30rpx 30rpx 30rpx;
	}
	.order-list {
		box-sizing: border-box;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		border-radius: 16rpx;
		margin-top: 20rpx;
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
		color: #868686;
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
	
</style>
