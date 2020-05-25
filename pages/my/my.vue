<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="userInfo-position">
				<view class="user-left-position">
					<view class="userInfo-content">
						<text style="color: #FFFFFF;font-size: 30upx;">{{userInfo.name}}</text>
						<view class="white-space-width"></view>
						<!-- <image src="../../static/my/diamond.png" style="width: 40upx; height: 40upx;"></image> -->
					</view>
					
					<view style="height: 10upx;"></view>
					
					<!-- 
					<view class="userInfo-member">
						<view class="userInfo-member-border">
							<text>会员截止日期：{{userInfo.overTime}}</text>
						</view>
					</view> 
					-->
				</view>
				
				<view class="user-right-position">
					<image :src="userInfo.avatar" style="border-radius: 50%; width: 120upx; height: 120upx;"></image>
				</view>
			</view>
			
			<view class="vip-button-position">
				<image style="width: 640upx; height: 145upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/vip_button.png"></image>
			</view>
			
			<view class="white-space"></view>
			
			<view class="vip-button-position">
				<image style="width: 660upx; height: 200upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/vip_banner.png"></image>
			</view>
			
			<view class="white-space"></view>
			
			<view class="my-box-position">
				<etMyBox :myMenuInfo="myOrderInfo"></etMyBox>
			</view>
			
			<view class="white-space"></view>
			
			<view class="my-box-position">
				<etMyBox :myMenuInfo="myAppInfo"></etMyBox>
			</view>
			
			<view class="white-space"></view>
		</view>
	</view>
</template>

<script>
import etMyBox from '../../components/etMyBox.vue'

export default {
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	components: {
		etMyBox
	},
	data() {
		return {
			test: '123456',
			// userInfo: {
			// 	'name':'开发者',
			// 	'overTime':'20120-05-19',
			// 	'babyName':'开发者baby',
			// 	'school':'林头幼儿园',
			// 	'class':'一年一班'
			// },
			myOrderInfo: {
				'menuTitle' : '我的订单',
				'moreMenu' : '更多 >',
				'allMenu': [
					{
						'imgSrc' : this.$aliImage + 'my1_1.png',
						'title'	: '待支付',
						'toUrl'	: '/pages/index/bookdetail?bookID=900',
						'count'	: '99+'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_2.png',
						'title'	: '待发货',
						'toUrl'	: 'bookdetail?bookID=901'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_3.png',
						'title'	: '待收货',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_4.png',
						'title'	: '阅读中',
						'count'	: '2'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_5.png',
						'title'	: '待还书',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_6.png',
						'title'	: '待评价',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_7.png',
						'title'	: '退款',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my1_8.png',
						'title'	: '逾期',
						'toUrl'	: 'bookdetail?bookID=900'
					}
				]
			},
			myAppInfo: {
				'menuTitle' : '我的应用',
				'allMenu': [
					{
						'imgSrc' : this.$aliImage + 'my2_1.png',
						'title'	: '押金',
						'toUrl'	: 'bookdetail?bookID=900',
						'buttomContent' : '$ 200'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_2.png',
						'title'	: '积分',
						'toUrl'	: 'bookdetail?bookID=900',
						'buttomContent' : '2000'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_3.png',
						'title'	: '签到',
						'toUrl'	: 'bookdetail?bookID=900',
						'buttomContent' : '0/1'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_4.png',
						'title'	: '活动',
						'count'	: '2'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_5.png',
						'title'	: '完善信息',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_6.png',
						'title'	: '会员',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_7.png',
						'title'	: '反馈',
						'toUrl'	: 'bookdetail?bookID=900'
					},
					{
						'imgSrc' : this.$aliImage + 'my2_8.png',
						'title'	: '收获地址',
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
	background-color: #FFFFFF;
	position: relative;
}
.top-position {
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-bottom-right-radius: 30upx;
	border-bottom-left-radius: 30upx;
	height: 350upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.userInfo-position {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 40upx 0;
}
.user-left-position {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.userInfo-content {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.userInfo-member-border {
	background-color: #2AAEC4;
	border-radius: 30upx;
	color: #FFFFFF;
	font-size: 20UPX;
	padding: 10upx 20upx;
}
.vip-button-position {
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.my-box-position {
	width: 90%;
}
</style>
