<template>
	<view class="content-position" >
		<view class="left-position">
			<image :src="showData.img_url" style="width: 180upx; height: 180upx;"></image>
			
			<view class="detail-position">
				<view class="title-posiition">
					<text>{{showData.name}}</text>
					<text style="font-size: 30upx;">x 1</text>
				</view>
				
				<view class="detail_content_position" v-if="type === 'userDetail'">
					<view class='detail-content-style' v-if="tabIndex === 1">
						<text class='detail-content-text-style' v-if="showData.rule === 'C'">兑换规则：会员卡办理时自动使用</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'C'">有效期至：{{showData.exchange.formatExpireDate}}</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'A' || showData.rule === 'B'">兑换规则：凭兑换码于所属幼儿园兑换。</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'A' || showData.rule === 'B'">兑换码：{{showData.exchange.exchange_code}}</text>
					</view>
					
					<view class='detail-content-style' v-if="tabIndex === 2">
						<text class='detail-content-text-style' v-if="showData.rule === 'C'">现金券逾期还没使用</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'C'">有效期至：{{showData.exchange.formatExpireDate}}</text>
					</view>
					
					<view class='detail-content-style' v-if="tabIndex === 3">
						<text class='detail-content-text-style' v-if="showData.rule === 'C'">领取日期：{{showData.exchange.formatCreateDate}}</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'C'">有效期至：{{showData.exchange.formatExpireDate}}</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'A' || showData.rule === 'B'">已到所属幼儿园领取成功</text>
						<text class='detail-content-text-style' v-if="showData.rule === 'A' || showData.rule === 'B'">兑换码：{{showData.exchange.exchange_code}}</text>
					</view>
				</view>
			</view>
			
			<view class="status-img-position" v-if="type === 'userDetail'">
				<view v-if="tabIndex === 3">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift_success.png" style="width: 120upx;" mode="widthFix"></image>
				</view>
				
				<view v-if="tabIndex === 2">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift_error.png" style="width: 120upx;" mode="widthFix"></image>
				</view>
				
				<view v-if="tabIndex === 1" style="width: 120upx;"></view>
				
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		type:String,
		showData: Object,
		tabIndex:Number
	},
	methods: {
	
	}
}
</script>

<style scoped>
.content-position {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.left-position {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;
	font-size: 30upx;
	font-weight: bold;
}
.detail-position{
	width: 70%;
	margin-left: 20upx;
}
.title-posiition {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.detail_content_position{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	
	font-size: 25upx;
	color:#969696;
}
.status-img-position{
	margin-left: 20upx;
}
.detail-content-style{
	font-size: 20upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}
.detail-content-text-style{
	margin-top: 5upx;
}
</style>
