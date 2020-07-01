<template>
	<view class="content" >
		<view class="top-position border-bottom-style" v-if="orderList.order_no">
			<text style="font-weight: 550;">订单号： {{orderList.order_no}}</text>
			<text style="color: #2BAEC4;">{{orderList.status_text}}</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="book-position">
			<view class="book-content" v-for="(item,index) in orderList.goodsInfo" v-if="index <= unfoldCount-1" :key="index">
				<et-order-one :order="item"></et-order-one>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<view class="book-unfold-position" @click="changeDataList">
			<view class="book-unfold">
				<text v-if="unfoldStatus === 0">共{{orderList.goodsInfo.length}}本 ▼</text>
				<text v-else-if="unfoldStatus === 1">收起 ▲</text>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<view class="price-position border-bottom-style" v-if="orderList.final_price">
			<text>总价 {{orderList.final_price}} 元</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="bottom-button-position" v-if="orderList.order_no">
			<view class="botton-position botton-cancle-position" v-if="orderList.status_text === '待支付'" @tap="cancleOrder">
				<text>取消订单</text>
			</view>
			
			<view class="white-space-width"></view>
			
			<view class="botton-position" v-if="orderList.status_text === '待支付'" @tap="toOrderDetail">
				<text>支付</text>
			</view>
			
			<!-- <view class="white-space-width"></view>
			
			<view class="botton-position" v-if="orderList.status === '待发货'">
				<text>提醒发货</text>
			</view> -->
			
			<view class="white-space-width"></view>
			
			<view class="botton-position" v-if="orderList.status_text === '待收货'" @tap="customConfirmOrder">
				<text>确认收货</text>
			</view>
			
			<view class="white-space-width"></view>
			
			<view class="botton-position" v-if="orderList.status_text === '阅读中'" @tap="customCloseOrder">
				<text>还书</text>
			</view>
			
		</view>
		
		<view class="button-text-position">
			<!-- 待收货 -->
			<view>
				<view class="botton-text-style" v-if="orderList.status === '2' && orderList.ioInfo.express_no != ''">
					<text style="color: #2BAEC4; font-size: 25upx;">物流单号：{{orderList.ioInfo.express_no}}</text>
				</view>
				<view class="botton-text-style" v-else-if="orderList.status === '2'">
					<text style="color: #2BAEC4; font-size: 25upx;">物流单号：暂无</text>
				</view>
			</view>
			
			<!-- 待还书 -->
			<view class="botton-text-style" v-if="orderList.status === '4'">
				<text style="color: #2BAEC4; font-size: 25upx;">点击还书后,稍后将有客服联系您预约取件</text>
			</view>
			
			<!-- 待取件 -->
			<view>
				<view class="botton-text-style" v-if="orderList.status === '5' && orderList.ioInfo.express_no_back != ''">
					<text style="color: #2BAEC4; font-size: 25upx;">物流单号：{{orderList.ioInfo.express_no_back}}</text>
				</view>
				<view class="botton-text-style" v-else-if="orderList.status === '5'">
					<text style="color: #2BAEC4; font-size: 25upx;">您的归还信息已收到,稍后将有客服联系您预约取件</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
import etOrderOne from './etOrderOne.vue'

export default {
	components: {
		etOrderOne
	},
	props: {
		orderList: Object
	},
	data() {
		return {
			// 展开数据数量
			unfoldCount: 2,
			// 展开数据状态 0不展开 1展开
			unfoldStatus: 0
			
		}
	},
	methods: {
		changeDataList() {
			if(this.unfoldStatus === 0){
				this.unfoldStatus = 1;
				this.unfoldCount = 99;
			}else if(this.unfoldStatus === 1){
				this.unfoldStatus = 0;
				this.unfoldCount = 2;
			}
		},
		toOrderDetail(){
			//插入订单缓存
			let orderObject = {
				bookCount: this.$props.orderList.goodsInfo.length,
				moneyCount: this.$props.orderList.final_price,
				goodsInfo: this.$props.orderList.goodsInfo
			};
			if (this.$props.orderList.addressInfo) {
				//加上默认地址即可
				orderObject.defalutAddress = this.$props.orderList.addressInfo;
			}
			uni.setStorageSync('orderInfo', orderObject);
			uni.navigateTo({
				url:'/pages/cart/orderDetail'
			})
		},
		cancleOrder(){
			uni.showLoading();
			this.$api.cancelOrder({ order_no : this.$props.orderList.order_no}).then(res=>{
				uni.showToast({
					duration:1500,
					title:"订单已取消",
					icon:"none"
				})
			});
			this.$emit('reloadPages');
		},
		customConfirmOrder(){
			uni.showLoading();
			this.$api.customConfirmOrder({ order_no : this.$props.orderList.order_no}).then(res=>{
				uni.showToast({
					duration:1500,
					title:"已确认收货",
					icon:"none"
				})
			});
			this.$emit('reloadPages');
		},
		customCloseOrder(){
			uni.showLoading();
			this.$api.customCloseOrder({ order_no : this.$props.orderList.order_no , type : "online" ,  custom_id : this.$props.orderList.custom_id }).then(res=>{
				uni.showToast({
					duration:1500,
					title:"已还书",
					icon:"none"
				})
			});
			this.$emit('reloadPages');
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 25upx;
}
.top-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.border-bottom-style {
	padding-bottom: 20upx;
	border-bottom: 1upx solid #E6E6E6;
}
.book-position {
	width: 90%;
}
.book-unfold-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.book-unfold {
	width: 90%;
	background-color: #E6E6E6;
	color: #989898;
	padding: 15upx 0;
	border-radius: 30upx;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.price-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	color: #2BAEC4;
	font-size: 25upx;
	font-weight: bold;
}
.bottom-button-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}
.botton-position {
	height: 50upx;
	width: 200upx;
	border-radius: 30upx;
	background-color: #2AAEC4;
	color:#FFFFFF;
	font-size: 25upx;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
}
.botton-cancle-position {
	background-color: #FFFFFF;
	color:#B4B4B4;
	border: 1upx solid #B4B4B4;
}
.button-text-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-top: 20upx;
}
.botton-text-style {
	/* width: 90%; */
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;
}
</style>
