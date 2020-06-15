<template>
	<view class="content" >
		
		<view class="time-position pay-style-position" style="border: 0;">
			<text class="font-one-style">支付方式</text>
			<view class="radio-content">
				<!-- 先把会员支付屏蔽，后续再开放 -->
				<!-- <label class="font-one-style"><radio style="transform: scale(0.7)" color="#2AAEC4"  value="r1" :checked="payStyleString==='memberCheck'"  @tap="payStyle('memberCheck')"/>会员支付</label> -->
				<!-- <view class="white-space-width"></view> -->
				<!-- 先把会员支付屏蔽，后续再开放 -->
				<label class="font-one-style"><radio style="transform: scale(0.7)" color="#2AAEC4" value="r2" :checked="payStyleString==='wechatCheck'"  @tap="payStyle('wechatCheck')"/>微信支付</label>
			</view>
		</view>
		<view class='pay-info-position'>
			<et-order-menberpay :order='menberOrder' v-if="payStyleString==='memberCheck'"></et-order-menberpay>
			<et-order-wechatpay :order='orderPayInfo' v-else-if="payStyleString==='wechatCheck'"></et-order-wechatpay>
		</view>
		
		<view class="time-position">
			<text class="font-one-style">借阅时间</text>
			<view class="time-content">
				<text class="font-two-style">{{orderPayInfo.createTime}}</text>
				<text class="font-two-style" style="color: #FE695A;">可借15天，请按时归还哦</text>
			</view>
		</view>
		
		<view class="time-position time-return-position">
			<text class="font-one-style">预计归还时间</text>
			<view class="time-content">
				<text class="font-two-style">{{orderPayInfo.returnTime}}</text>
			</view>
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
		fontColor: String,
		orderPayInfo:{}
	},
	data() {
		return {
			// 支付方式
			payStyleString : 'wechatCheck',
			menberOrder : {
				count: '2',
				countAfter: '1',
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
	border-bottom: 1upx solid #E4E4E4;
}
.time-return-position {
	border-bottom: 0;
}
</style>
