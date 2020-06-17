<template>
	<view class="content-position" >
		<view class="left-position">
			<image :src="showData.img_url" style="width: 180upx; height: 180upx;"></image>
			
			<view class="detail-position">
				<view class="title-posiition">
					<text>{{showData.name}}</text>
					<text style="font-size: 30upx;">x 1</text>
				</view>
				
				<view class="detail_content_position"  v-if="showData.remark === 'aaa'">
					<text>兑换规则：会员卡咔咔咔咔咔咔</text>
					<text>兑换码：****</text>
				</view>
			</view>
			
			<view class="status-img-position" v-if="showData.remark === 'aaa'">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month_gift_success.png" style="width: 120upx;" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		showData: Object
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
</style>
