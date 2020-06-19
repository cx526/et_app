<template>
	<view class="content">
		<view class="white-border content-style" >
			<view v-for="(item,index) in listData.rows" :key='index' class="cell">
				<et-gift-detail :showData='item' :userInfo='userInfo'></et-gift-detail>
			</view>	
			
			<view class="bottom-banner-position" v-if="listData.summary.length > 0">
				<view class="bottom-banner-content">
					<text>{{listData.summary}}</text>
				</view>
			</view>
					
			<!-- <view class="tag-sort-position">
				<view class="tag-sort-style" :style="{backgroundColor: listData.color}">
					<text style="color: #FFFFFF;">{{listData.rule}}类</text>
				</view>
			</view> -->
			
			<view class="tag-sort-position">
				<view style="height: 100%;width: 100%; position: relative;">
					<text style="color: #FFFFFF;position: absolute;top:0;left: 20upx;font-size: 45upx;">{{listData.rule}}</text>
					<view class="triangle-topleft" :style="'border-top: 60px solid ' + listData.color +';'"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import etGiftDetail from './etGiftDetail.vue'	

export default {
	components: {
		etGiftDetail
	},
	props: {
		listData:Object,
		userInfo:Object
	},
	methods: {
	
	}
}
</script>

<style scoped>
.content {
	border-radius: 20upx;
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	text-align: center;
	width: 100%;
}
.content-style{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 20upx 0;
	position: relative;
	overflow: hidden;
}
.tag-sort-style{
	padding: 10upx 30upx;
	border-top-left-radius: 40upx;
	border-bottom-left-radius: 40upx;
}
.triangle-topleft{
	width: 0;
	height: 0;
	border-top: 60px solid red;
	border-right: 60px solid transparent;
}
.tag-sort-position{
	position: absolute;
	left: 0;
	top:0;
}
.cell + .cell {
	margin: 10upx 0; 
	/* width: 95%; */
	border-top: 1px dashed #A0A0A0;
}
.bottom-banner-position{
	width: 90%;
}
.bottom-banner-content {
	border-radius: 30upx;
	background-color: #E6E6E6;
	color: #9A9A9A;
	font-size: 20upx;
	padding: 10upx 20upx;
	text-align: center;
}
</style>
