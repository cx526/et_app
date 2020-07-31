<template>
	<view>
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
		<!-- 取书订单 -->
		<block v-if="tabList.currentIndex == 0">
			<view class="order-list">
				<view class="item">
					<view class="topic">
						<view>订单号：23123123123342</view>
						<view class="status">
							<view>
								<text>剩余：</text>
								<text style="color: rgb(0,128,0)">15:00</text>
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
							<button type="default" @tap="open">订单凭证</button>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 已失效订单 -->
		<block v-else>
			<view class="order-list">
				<view class="item">
					<view class="topic">
						<view>订单号：23123123123342</view>
						<view class="status">
							<view>
								<text style="color: #999;">已失效</text>
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
							<button type="default">删除</button>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 订单凭证弹窗 -->
		<uni-popup ref="orderPopUp">
			<view class="order-box"  :style="{ width: popUpWidth }">
				<image src="../../static/index/close.png" class="close"></image>
				<view class="title"><text>订单凭证</text></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				popUpWidth: 0,
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
			uniPopup
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.popUpWidth = res.windowWidth * 0.8 + 'px'
				}
			})
		},
		methods: {
			// tab切换
			changTab(index) {
				this.tabList.currentIndex = index
			},
			// 打开订单凭证弹窗
			open() {
				this.$refs.orderPopUp.open()
			},
		}
	}
	
</script>

<style>
	page {
		background: rgb(245,245,245);
	}
	.tab-box {
		box-sizing: border-box;
		display: flex;
		font-size: 28rpx;
		background: #fff;
	}
	.tab-box .item {
		line-height: 80rpx;
		color: #333;
		flex: 1;
		text-align: center;
	}
	.tab-box .item.active {
		border-bottom: 6rpx;
		background: #00f;
		color: #fff;
	}
	/* 订单 */
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
	/* 订单凭证弹窗 */
	.order-box {
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
		height: 400rpx;
		position: relative;
	}
	.order-box .close {
		position: absolute;
		left: 50%;
		bottom: -80rpx;
		width: 80rpx;
		height: 80rpx;
		transform: translateX(-50%);
	}
</style>
