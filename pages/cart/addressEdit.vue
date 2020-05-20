<template>
	<view class="content">
		<view class="defalut-position">
			<view class="address-list-position">
				<text class="address-list-content">收货人</text>
				<input type="text" placeholder="请填写收货人姓名" />
				<image src="../../static/cart/addpeople.png" style="width: 50upx;height: 50upx;"></image>
			</view>
			
			<view class="address-list-position">
				<text class="address-list-content">手机号码</text>
				<input type="text" placeholder="请填写收货人手机号码" />
				<view style="width: 50upx;height: 50upx;"></view>
			</view>
			
			<view class="address-list-position">
				<text class="address-list-content">所在地区</text>
				<input type="text" placeholder="省市县/乡镇等" />
				<image src="../../static/cart/position.png" style="width: 40upx;height: 50upx;"></image>
			</view>
			
			<view class="address-list-position">
				<text class="address-list-content">详细地址</text>
				<input type="text" placeholder="街道/楼牌号等" />
				<view style="width: 50upx;height: 50upx;"></view>
			</view>
			
			<view class="address-list-position" style="border: 0;">
				<text class="address-list-content">设置为默认地址</text>
				<switch color="#00B7CC" style="transform:scale(0.6)" checked />
			</view>
			
			<view class="address-list-position" style="border: 0;">
				<text class="address-list-content" style="width: 100%; font-weight: 800; font-size: 20upx; color: #4F4F4F;">提醒：每次下单会默认推荐使用该地址</text>
			</view>
		</view>
		
		<view class="white-space" style="height: 100upx;"></view>
		
		<view class="botton-position">
			<view class="botton-content">
				<text>保存并使用</text>
			</view>
		</view>
	</view>
</template>

<script>
import etAddress from '../../components/etAddress.vue'

const handlePhone = require('@/common/handlePhone');

export default {
	components: {
		etAddress
	},
    data() {
        return {
			defalutAddress : {
				'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301',
				'defalut' : '1'
			},
			addressListData  : [
				{
					'name':'麦家杰',
					'phone':'13690394900',
					'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
				},
				{
					'name':'麦家杰',
					'phone':'13690394900',
					'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
				},
				{
					'name':'麦家杰',
					'phone':'13690394900',
					'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
				}
			]
        }
    },
    onLoad() {
		// 转换电话号码为加密号码
        this.defalutAddress.phone = handlePhone.phoneSecret(this.defalutAddress.phone);
		this.addressListData.forEach(obj=>{
			obj.phone = handlePhone.phoneSecret(obj.phone);
		});
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.defalut-position {
	width: 95%;
	border-radius: 20upx;
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.4);
	border: 1upx solid rgba(179,179,179,0.4);
	padding: 40upx 0;
	background-color: #FFFFFF;
}
.address-list-position {
	width: 95%;
	border-bottom: 1upx solid rgba(179,179,179,0.6);
	padding: 20upx 0;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 30upx;
}
.address-list-content {
	width: 30%;
	font-weight: bold;
	font-size: 28upx;
}
.botton-position {
	background-color: #00B7CC;
	font-size: 30upx;
	border-radius: 40upx;
	color: #FFFFFF;
	font-weight: 600;
	padding: 20upx 100upx;
}
</style>
