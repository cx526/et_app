<template>
	<view class="content">
		<view class="content-style">
			<view class="detail-position white-border">
				<et-gift-detail-title :showData="showData"></et-gift-detail-title>
			</view>
			
			<view class="detail-position white-border" style="padding: 30upx 10upx;">
				<view class="detail-content">
					<view class="detail-content-title">
						<text>兑换日期：</text>
						<text class="detail-content-text">2020-08-31 24:00:00</text>
					</view>
					<view class="detail-content-title">
						<text>有效期至：</text>
						<text class="detail-content-text">2020-08-31 24:00:00</text>
					</view>
					<view class="detail-content-title">
						<text>所需积分：</text>
						<text class="detail-content-text">1000积分</text>
					</view>
					<view class="detail-content-title">
						<text>温馨提示：</text>
						<text class="detail-content-text">于所属幼儿园领取</text>
					</view>
					<view class="detail-content-title">
						<text>附加兑换：</text>
						<text class="detail-content-text">加2000积分，再获A类礼品一份</text>
						<switch checked="false" color='#2AAEC4' style="transform:scale(0.5);" />
					</view>
					<view class="detail-content-title">
						<text>选择礼物：</text>
						<view class="uni-list-cell-db detail-content-text">
							<picker @change="bindPickerChange" :value="giftDataIndex" :range="giftData">
								<view class="uni-input">{{giftData[giftDataIndex]}}</view>
							</picker>
						</view>
					</view>
				</view>
				
				<view class="score-content-position">
					<view class="detail-content-title score-content-style">
						<text>实付积分：</text>
						<text style='color:#44B8CB'>3000积分</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom-content-position">
			<view class="bottom-content-style">
				<text>合计:</text>
				<text style="color: #36B3C7;">3000</text>
				<text>积分</text>
			</view>
			
			<view class="bottom-button-position">
				<view class="button-style2" style="padding: 10upx 40upx; font-size: 25upx;">
					<text>确认兑换</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import etGiftDetailTitle from '../../components/etGiftDetailTitle.vue'

const toUrlFunction = require('@/common/toUrlFunction');

export default {
	components: {
		etGiftDetailTitle
	},
    data() {
        return {
			showData :
			{
				id : 1,
				name : 'test',
				type : 'A',
				status : '1',
				point : '3000',
				exchange_time : '1',
				combo : '12,32',
				img : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
				img_url : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
				remark : '测试室'
			},
			giftData:['布袋','塑料管'],
			giftDataIndex:0
        }
    },
    onLoad() {
        
    },
    methods: {
		toScoreUrl(){
			toUrlFunction.toUrl('/pages/promote/pictureMonth');
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(235,248,255,1);
	background-repeat: no-repeat;
	background-size:100% 100%; 
	background-attachment:fixed;
}
.content-style{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.detail-position {
	margin-top: 30upx;
	width: 90%;
	padding: 20upx;
}
.detail-content{
	border-bottom: 1px solid #F0F0F0;
	padding-bottom: 10upx;
}
.detail-content-title {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size: 25upx;
	font-weight: bold;
	margin-top: 30upx;
}
.detail-content-text{
	color: #7F7F7F;
	font-size: 23upx;
	margin-left: 50upx;
}
.score-content-style{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.bottom-content-position{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: 25upx;
	font-weight: bold;
	
	position: fixed;
	bottom: 0;
	padding: 20upx 0;
	
	background-color: #FFFFFF;
}
.bottom-content-style{
	color: #858585;
}
</style>
