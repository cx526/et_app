<template>
	<view class="content" >
		
		<view class="time-position">
			<text class="font-one-style">借阅时间</text>
			<view class="time-content">
				<text class="font-two-style">2020.04.05 16:05</text>
				<text class="font-two-style" style="color: #FE695A;">可借30天，请按时归还哦</text>
			</view>
		</view>
		
		<view class="time-position time-return-position">
			<text class="font-one-style">预计归还时间</text>
			<view class="time-content">
				<text class="font-two-style">2020.04.05 16:05</text>
			</view>
		</view>
		
		<view class="time-position pay-style-position" style="border: 0;">
			<text class="font-one-style">支付方式</text>
			<view class="radio-content">
				<label class="font-one-style"><radio style="transform: scale(0.7)" color="#2AAEC4"  value="r1" :checked="payStyleString==='memberCheck'"  @tap="payStyle('memberCheck')"/>会员支付</label>
				<view class="white-space-width"></view>
				<label class="font-one-style"><radio style="transform: scale(0.7)" color="#2AAEC4" value="r2" :checked="payStyleString==='wechatCheck'"  @tap="payStyle('wechatCheck')"/>微信支付</label>
			</view>
		</view>
		
		<view class='pay-info-position'>
			<et-order-menberpay :order='menberOrder' v-if="payStyleString==='memberCheck'"></et-order-menberpay>
			<et-order-wechatpay :order='wechatOrder' v-else-if="payStyleString==='wechatCheck'"></et-order-wechatpay>
		</view>
	</view>
</template>

<script>
import etOrderMenberpay from './etOrderMenberpay.vue'
import etOrderWechatpay from './etOrderWechatpay.vue'

export default {
	components: {
		etOrderMenberpay,
		etOrderWechatpay
	},
	props: {
		title: String,
		backgroundColor: String,
		fontColor: String
	},
	data() {
		return {
			// 支付方式
			payStyleString : 'memberCheck',
			menberOrder : {
				count: '2',
				countAfter: '1',
			},
			wechatOrder : {
				price: '30',
				preferentialType: '首次优惠',
				discountPrice: '18',
				deposit: '100',
				payIntegral: '1000',
				integral: '5000'
			}
		}
	},
	methods: {
		payStyle(option) {
			this.payStyleString = option;
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.font-one-style {
	font-size: 25upx;
	font-weight: bold;
}
.font-two-style {
	font-size: 25upx;
	color: #808080;
}
.time-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 25upx 0;
	border-bottom: 1upx solid #E4E4E4;
}
.time-content {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
}
.redio-style {
	color: #2AAEC4;
}
.radio-content {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
	font-size: 25upx;
}
.pay-info-position {
	width: 90%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-end;
}
</style>
