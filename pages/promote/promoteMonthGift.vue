<template>
	<view class="content">
		<!-- <image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-kan" @tap="toGiftUrl"></view>
		<view class="content-button" @tap="toScoreUrl"></view> -->
		<view class="white-space" style="height: 50upx;"></view>
		<view class="top-img-position">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift_banner.png" mode="widthFix"></image>
		</view>
		
		<view class="white-space" style="height: 20upx;"></view>
		<view class="top-text-position">
			<text style="font-weight: bold; font-size: 25upx;">礼品兑换时间：6月23日至7月5日</text>
		</view>
		
		<view class="white-space" style="height: 40upx;"></view>
		<view class="point-position">
			<view class="point-style">
				<view class="point-left-content">
					<text style="font-weight: bold; font-size: 25upx;">我的积分：5000</text>
					<text style="font-size: 20upx; color: #848484;">礼品兑换后请到“我的礼品”查看兑换码</text>
				</view>
				<view class="point-right-content">
					<view class="point-button">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_check_gift.png" mode="widthFix" style="width: 237upx;"></image>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 礼品列表 -->
		<view class="list-position">
			<view v-for="(item,index) in listData" style="width: 100%;">
				<et-gift-list :listData='item' style="width: 100%;"></et-gift-list>
			</view>
		</view>
		
		<view class="white-space" style="height: 30upx;"></view>
		<view class="button-content">
			<view class="button-style2" @tap='toScoreUrl'>
				<text style="font-weight: bold;">我要积分</text>
			</view>
		</view>
		
		<view class="white-space" style="height: 60upx;"></view>
	</view>
</template>

<script>
import etGiftList from '../../components/etGiftList.vue'

const toUrlFunction = require('@/common/toUrlFunction');

export default {
	components: {
		etGiftList
	},
    data() {
        return {
			listData : [
				{ 
					type : 'A', 
					color : '#B793EA',
					summary : 'A类礼品二选一，每位注册用户兑换一次',
					rows : [
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
						}
					] 
				},
				{
					type : 'B', 
					color : '#B793EA',
					summary : 'A类礼品二选一，每位注册用户兑换一次',
					rows : [
						{
							id : 1,
							name : 'test',
							type : 'B',
							status : '1',
							point : '3000',
							exchange_time : '1',
							combo : '12,32',
							img : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
							img_url : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
							remark : '测试室'
						}
					]
				},
				{
					type : 'C', 
					color : '#B793EA',
					summary : 'A类礼品二选一，每位注册用户兑换一次',
					rows : [
						{
							id : 1,
							name : 'test',
							type : 'C',
							status : '1',
							point : '3000',
							exchange_time : '1',
							combo : '12,32',
							img : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
							img_url : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
							remark : '测试室'
						},
						{
							id : 1,
							name : 'test',
							type : 'C',
							status : '1',
							point : '3000',
							exchange_time : '1',
							combo : '12,32',
							img : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
							img_url : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
							remark : '测试室'
						}
					]
				}
			]
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
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(235,248,255,1);
}
.top-img-position{
	width: 96%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.point-style{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 701upx;
	height:155upx;
	background-image: url('https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift_point_border.png');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	
}
.point-left-content{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
}
.point-right-content{
	margin-left: 30upx;
}
.list-position{
	width: 90%;
}
</style>
