<template>
	<view class="content" >
		<view class="time-position">
			<view>
				<text>借阅时间</text>
			</view>
			
			<view>
				<text style="color:#6A6A6A;font-size: 20upx;">{{dataTime}}</text>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<view class="warn-position">
			<view class="white-space"></view>
			<text style="font-size: 18upx; color: #FE998E;">可借{{outTime}}天,请按时归还</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="last-position">
			<view class="pay-type-position">
				<text>支付方式</text>
			</view>
			
			<view class="money-position">
				<text>积分</text>
				<view class="money-style">
					<image src="../static/cart/load.png" class="money-img"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		dataTime: String,
		outTime: String
	},
	methods: {
	
	}
}
</script>

<style>
.content {
	width: 100%;
	display: flex;
	align-items: center;
	border: 1upx solid #71BBEC;
	box-shadow: 1upx 1upx 1upx 1upx rgba(179,179,179,0.5);
	background-color: #FFFFFF;
	font-size: 25upx;
	font-weight: bold;
	padding-top: 40upx;
	padding-bottom: 40upx;
}
.time-position,.warn-position,.last-position,.money-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.pay-type-position {
	width: 70%;
}
.money-position {
	width: 30%;
}

.money-img {
	width: 70upx;
	height: 30upx;
}
</style>
