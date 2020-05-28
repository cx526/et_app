<template>
	<view class="content">
		<view class="top-search">
			<!-- <view class="search-box" @tap="toSearch">
				<icon class="search-icon" type="search"/>
				<input class="search-input" type="text" placeholder="请输入订单号" disabled />
			</view> -->
		</view>
		
		<view class="tabs-position">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="15"
					:scale="1.3" sliderColor="#faff72" type="float" ref="tabs0" aniType="extend">
			</cl-tabs>
		</view>
		
		<view class="order-list-position">
			<view class="white-border" style="margin: 20upx 0;" v-for="(item,index) in orderList" :key="index">
				<et-order-list :orderList="item"></et-order-list>
			</view>
		</view>
	</view>
</template>

<script>
import etOrderList from '../../components/etOrderList.vue'

export default {
	components: {
		etOrderList
	},
	data() {
		return {
			tabBars:['全部','待支付','待发货','待收货','阅读中','待归还'],	//订单tab
			tabBarID:0,  //初始化标签数据库ID
			tabCurrentIndex:-1,
			money:"30",
			defalutAddress : {
				// 'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
			},
			orderList : [
				{
					orderNo:'DD202005170000001',
					status:'待发货',
					price:'30',
					bookList: [
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '99'
						},
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '1'
						},
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '1'
						},
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '1'
						}
					]
				},
				{
					orderNo:'DD202005170000001',
					status:'待支付',
					price:'30',
					bookList: [
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '99'
						},
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '1'
						},
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '1'
						},
						{
							title : '爸爸到底有什么用?',
							image : '../static/cart/test.png',
							count : '1'
						}
					]
				}
			]
			
		}
	},
	onLoad() {
		this.tabCurrentIndex = 0; //初始化标签序号
	},
	methods: {
		btnClick() {
			console.log(this.defalutAddress);
		},
		tabChange(e){
			this.tabCurrentIndex = e;		// 更新标签序号
			
			// 变更商品列表
			
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-search {
	width:98%;
}
.search-box {
	padding: 10upx;
	width:98%;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	margin-top: 20upx;
	background-color: #F5F5F5;
	border-radius: 50upx;
}

.search-icon {

}

.search-input {
	margin-left: 10upx;
	font-size: 34upx;
}
.top-position {
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-radius: 20upx;
	height: 230upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.member-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #FFFBE6;
	padding: 10upx 0;
}
.address-position {
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.add-address-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.order-list-position {
	width: 90%;
}
.pay-position {
	width: 90%;
}
</style>
