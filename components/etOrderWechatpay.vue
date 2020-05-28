<template>
	<view class="content" >
		<view class="price-position">
			<text>原价：</text>
			<text style="text-decoration:line-through">{{order.orderMoney}}元</text>
		</view>
		
		<view class="discount-price-position position-style">
			<view class="preferentialType-position">
				<text style="color: #000204;">{{order.discountType}}</text>
			</view>
			<text style="font-weight: bold; color: #000204;"> 现金：</text>
			<text style="font-weight: bold; color: #2BAEC4;">{{order.afterDiscountMoney}}元</text>
		</view>
		
		<view class="deposit-position position-style">
			<text style="font-size: 20upx;">押金： {{order.deposit}}元 (可退)</text>
		</view>
		
		<view style="height: 10upx;"></view>
		
		<!-- 积分部分后续开放 -->
		<!-- <view class="payIntegral-position position-style">
			<view>
				<switch style="transform: scale(0.5)"  color="#2AAEC4" checked />
			</view>
			<text>-{{order.payIntegral}}积分</text>
		</view>
		
		<view class="position-style">
			<text >积分： {{order.integral}}元</text>
		</view> -->
		<!-- 积分部分后续开放 -->
	</view>
</template>

<script>
export default {
	props: {
		order : Object
	},
	methods: {
	
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	font-size: 25upx;
	color: #808080;
}
.position-style {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.discount-price-position {

}
.preferentialType-position {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #BCEDF5;
	border-radius: 30upx;
	padding: 0 2upx;
	font-size: 20upx;
}
</style>
