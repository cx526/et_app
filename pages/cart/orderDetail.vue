<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="member-position">
				<view class="member-content"> 
					<et-member title="会员获得更多权益"></et-member>
				</view>
			</view>
			
			<view class="white-space"></view>
			
			<view class="white-border address-position">
				<et-address :address='defalutAddress' @tap='btnClick' v-if="defalutAddress.name"></et-address>
				<view v-else class="add-address-position">
					<image src="../../static/cart/add.png" style="width: 120upx; height: 120upx;"></image>
					<text style="color:#9FB2BF; font-size: 25upx;">请添加收货地址</text>
				</view>
			</view>
			
			<view class="white-space"></view>
			
			<view class="order-list-position white-border">
				<et-order-list :orderList="orderList"></et-order-list>
			</view>
			
			<view class="white-space"></view>
			
			<view class="pay-position white-border">
				<et-order-pay :paydata="orderList"></et-order-pay>
			</view>
			
			<view class="white-space" style="height: 150upx;"></view>
			
			
			<!-- 底部栏目 -->
			<view class="bottom-position">
				<view class="bottom-content">
					<view class="bottom-text">
						<text>共计：</text>
						<text style="color: #DB3E49;">{{bookCount}}</text>
						<text>本</text>
					</view>
					
					<view class="bottom-text">
						<text>支付金额：</text>
						<text style="color: #DB3E49;">{{moneyCount}}</text>
						<text>元</text>
					</view>
					
					<view class="bottom-tag">
						<et-tag backgroundColor="#2AAEC4" title="确认借书" fontColor="#FFFFFF" class="tag-style" @tap="buySelect"></et-tag>
					</view>
				</view>
			</view>
			
			<view class="white-space"></view>
		</view>
		
	</view>
</template>

<script>
import etMember from '../../components/etMember.vue'
import etAddress from '../../components/etAddress.vue'
import etOrderList from '../../components/etOrderList.vue'
import etOrderPay from '../../components/etOrderPay.vue'
import etTag from '../../components/etTag.vue'

export default {
	components: {
		etMember,
		etAddress,
		etOrderList,
		etOrderPay,
		etTag
	},
	data() {
		return {
			bookCount:"10",
			moneyCount:"30",
			defalutAddress : {
				// 'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
			},
			orderList : {
				// orderNo:'DD202005170000001',
				// status:'待支付',
				// price:'30',
				bookList: [
					{
						title : '爸爸到底有什么用?',
						imgSrc : '../static/cart/test.png',
						count : '99'
					},
					{
						title : '爸爸到底有什么用?',
						imgSrc : '../static/cart/test.png',
						count : '1'
					},
					{
						title : '爸爸到底有什么用?',
						imgSrc : '../static/cart/test.png',
						count : '1'
					},
					{
						title : '爸爸到底有什么用?',
						imgSrc : '../static/cart/test.png',
						count : '1'
					}
				]
			}
		}
	},
	onLoad(option) {
		this.bookCount = JSON.parse(decodeURIComponent(option.bookCount));
		this.moneyCount = JSON.parse(decodeURIComponent(option.moneyCount));
		this.orderList.bookList = JSON.parse(decodeURIComponent(option.orderList));
	},
	methods: {
		btnClick() {
			console.log(this.defalutAddress);
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
.bottom-position {
	z-index: 3;
	width: 100%;
	background-color: #FFFFFF;
	padding: 30upx;
	position: fixed;
	bottom: 0;
	font-size: 25upx;
	color: #9A9A9A;
}
.bottom-content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	background-color: #FFFFFF;
}
.bottom-tag {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.tag-style {
	width: 150upx;
	height: 45upx;
	margin-right: 20upx;
}
</style>
