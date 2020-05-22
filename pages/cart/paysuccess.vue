<template>
	<view class="content">
		<view class="top-position">
			<view class="top-img-one-position">
				<image class="top-img-one" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_people.png"></image>
			</view>
			
			<view class="top-img-tow-position">
				<image class="top-img-two" src="../../static/cart/right.png"></image>
			</view>
		</view>
		
		<view class="white-space" style="height: 60upx;"></view>
		
		<view class="middle-position">
			<text  style="font-size: 35upx;">支付成功</text>
			<view class="white-space" style="height: 20upx;"></view>
			<text style="font-size: 25upx;text-align: center;">您已成功借阅，请在约定时间内还书本哦感谢您的支持</text>
		</view>
		
		<view class="white-space" style="height: 40upx;"></view>
		
		<view class="last-position">
			<view class="last-img-one-position">
				<image class="last-img-one" src="../../static/cart/submit.png"></image>
			</view>
			
			<view class="last-img-tow-position">
				<image class="last-img-two" src="../../static/cart/return.png"></image>
			</view>
		</view>
	</view>
</template>

<script>

export default {
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		buttomClick() {
			console.log('123');
		},
	}
}
</script>

<style scoped>
.content {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #EBF8FF;
}
.top-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}
.top-img-tow-position {
	position: absolute;
	top: 430upx;
}
.top-img-one {
	width: 500upx;
	height: 500upx;
}
.top-img-two{
	width: 120upx;
	height: 120upx;
}
.middle-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 50%;
}
.last-img-one {
	width: 350upx;
	height: 100upx;
}
.last-img-two {
	width: 350upx;
	height: 100upx;
}
</style>
