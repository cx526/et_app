<template>
	<view class="content" >
		<view class="check-position">
			<checkbox value="cb" checked="true" />
		</view>
		
		<view class="img-position">
			<image :src="imgSrc" class="img-content"></image>
		</view>
		
		<view class="content-position">
			<view class="title-position">
				<text>{{title}}</text>
			</view>
			
			<view class="white-space" style="height: 20upx"></view>
			
			<view class="status-position">
				<text>{{status}}</text>
			</view>	
			
			<view class="white-space" style="height: 90upx"></view>
			
			<view class="corn-position">
				<text>借阅币：{{corn}}</text>
			</view>
		</view>
		
		<view class="last-position">
			<view class="rubbish-position">
				<image class="rubbish-img" src="../static/cart/rubbish.png"></image>
			</view>
			
			<view class="count-position">
				<text>X {{count}}</text>
			</view>	
		</view>
	</view>
</template>

<script>
export default {
	props: {
		imgSrc: String,
		title: String,
		status: String,
		corn: String,
		count: String
		
	},
	methods: {
	
	}
}
</script>

<style>
.content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-items: space-around;
	align-items: center;
	text-align: center;
	border-radius: 50upx;
	border: 1upx solid rgba(179,179,179,0.3);
	box-shadow: 1upx 1upx 1upx 1upx rgba(179,179,179,0.5);
	background-color: #FFFFFF;
}
.check-position {
	background-color: #FFFFFF;
}
.img-content {
	width: 250upx;
	height: 250upx;
}
.content-position {
	display: flex;
	flex-direction: column;
	justify-items: space-between;
	align-items: flex-start;
	height: 250upx;
	padding-top: 50upx;
	background-color: #FFFFFF;
}
.title-position {
	font-size: 30upx;
	font-weight: bold;
}
.status-position {
	font-size: 20upx;
	color: #6A6A6A;
}
.corn-position {
	font-size: 24upx;
	color: #549EAB;
	font-weight: bold;
}
.rubbish-img {
	width: 30upx;
	height: 30upx;
}
.count-position {
	background-color: #E6E6E6;
	color:  #6A6A6A;
	border-radius: 20upx;
	padding: 10upx;
	font-size: 20upx;
}
.last-position {
	height: 250upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-top: 30upx;
	padding-left: 30upx;
	padding-bottom: 30upx;
	background-color: #FFFFFF;
}
</style>
