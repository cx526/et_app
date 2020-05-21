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
		</view>
		
	</view>
</template>

<script>
import etMember from '../../components/etMember.vue'
import etAddress from '../../components/etAddress.vue'
import etOrderList from '../../components/etOrderList.vue'

export default {
	components: {
		etMember,
		etAddress,
		etOrderList
	},
	data() {
		return {
			money:"30",
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
		}
	},
	onLoad() {

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
</style>
