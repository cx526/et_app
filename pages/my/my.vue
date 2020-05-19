<template>
	<view class="content">
		<view class="userInfo-position">
			<view class="userInfo-img-position userInfo-img">
				<image src="../../static/cart/right.png" style="width: 160upx; height: 160upx;" mode=""></image>
			</view>
			
			<view class="userInfo-content-position">
				<view class="userInfo-content userInfo-name">
					<text>用户：</text>
					<text>{{userInfo.name}}</text>
				</view>
				<view class="userInfo-content userInfo-card">
					<image src="../../static/my/month.png" style="width: 80upx; height: 50upx;"></image>
					<text>截止：{{userInfo.overTime}}</text>
				</view>
				<view class="userInfo-content userInfo-baby">
					<text>宝贝：</text>
					<text>{{userInfo.babyName}}</text>
				</view>
				<view class="userInfo-content userInfo-school">
					<text>学校：</text>
					<text>{{userInfo.school}}</text>
				</view>
				<view class="userInfo-content userInfo-class">
					<text>班级：</text>
					<text>{{userInfo.class}}</text>
				</view>
			</view>	
		</view>
		
		<view class="white-space"></view>
		
		<view class="my-order-position">
			<etMyBox :myMenuInfo="myMenuInfo"></etMyBox>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'

export default {
	components: {
		etMyBox
	},
	data() {
		return {
			test: '123456',
			userInfo: {
				'name':'开发者',
				'overTime':'20120-05-19',
				'babyName':'开发者baby',
				'school':'林头幼儿园',
				'class':'一年一班'
			},
			myMenuInfo: {
				'menuTitle' : '我的订单',
				'moreMenu' : '所有订单',
				'allMenu': [
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : '../../static/cart/right.png',
						'title'	: '待支付',
						'toUrl'	: 'bookdetail?bookID=900'
					}
				]
			}
		}
	},
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.userInfo-position {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #008000;
	color: #FFFFFF;
	font-weight: bold;
	font-size: 25upx;
	padding-top: 20upx;
	padding-bottom: 20upx;
}
.userInfo-content-position {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
.userInfo-content {
	padding-top: 10upx;
}
.userInfo-card {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.my-order-position {
	width: 100%;
}
</style>
