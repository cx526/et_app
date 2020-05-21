<template>
	<view class="content" >
		<view class="top-position border-bottom-style" v-if="orderList.orderNo">
			<text style="font-weight: 550;">订单号： {{orderList.orderNo}}</text>
			<text style="color: #2BAEC4;">{{orderList.status}}</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="book-position">
			<view class="book-content" v-for="(item,index) in orderList.bookList" v-if="index <= unfoldCount-1" :key="index">
				<et-order-one :order="item"></et-order-one>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<view class="book-unfold-position" @click="changeDataList">
			<view class="book-unfold">
				<text v-if="unfoldStatus === 0">共{{orderList.bookList.length}}本 ▼</text>
				<text v-else-if="unfoldStatus === 1">收起 ▲</text>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<view class="price-position border-bottom-style" v-if="orderList.price">
			<text>总价 {{orderList.price}} 元</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="bottom-button-position" v-if="orderList.orderNo">
			<view class="botton-position botton-cancle-position">
				<text>取消订单</text>
			</view>
			
			<view class="white-space-width"></view>
			
			<view class="botton-position" v-if="orderList.status === '待支付'">
				<text>支付</text>
			</view>
			
			<view class="white-space-width"></view>
			
			<view class="botton-position" v-if="orderList.status === '待发货'">
				<text>提醒发货</text>
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
</style>
