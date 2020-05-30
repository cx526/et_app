<template>
	<view class="content" >
		<view class="left-position">
			<image src= "https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_zan.png" style="width: 30upx; height: 30upx;" ></image>	
			<text>{{peopleCount}}人推荐</text>
		</view>
		
		<view class="right-position" @tap="insertToCart">
			<view class="right-content">
				<text>加入书篮</text>
			</view>
		</view>
	</view>
</template>

<script>
const insertBook = require('@/common/carDataOption');

export default {
	props: {
		peopleCount: String,
		bookInfo:Object
	},
	methods: {
		insertToCart() {
			uni.showLoading();
			// 处理数据
			// let cartList = {
			// 	'bookID': this.$props.bookInfo.id,
			// 	'title': this.$props.bookInfo.title,
			// 	'coin': this.$props.bookInfo.coin,
			// 	'cover': this.$props.bookInfo.forGoodsPic[0].url,
			// 	'select': true,
			// 	'count':1
			// };
			
			let cartList = this.$props.bookInfo;
			cartList.select = true;
			cartList.count = 1;
			insertBook.insertToCart(cartList);
			try {
			    let carListArr = uni.getStorageSync('carListInfo');
			    console.log(carListArr);
			} catch (e) {
			    console.log(carListArr);
			}
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	width: 300upx;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	padding-left: 20upx;
}
.left-position {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-content: center;
	color: #BABABA;
	font-size: 25upx;
}
.right-position {
	padding-left: 10upx;
}
.right-content {
	font-size: 25upx;
	font-weight: bold;
	color: #FFFFFF;
	background-color: #2AAEC4;
	border-top-left-radius: 20upx;
	border-bottom-left-radius: 20upx;
	padding:5upx 10upx;
}
</style>
