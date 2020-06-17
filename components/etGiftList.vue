<template>
	<view class="content">
		<view class="content-style white-border" >
			<view v-for="(item,index) in listData.rows" class="cell">
				<et-gift-detail :showData='item'></et-gift-detail>
			</view>	
			
			<view class="bottom-banner-position">
				<view class="bottom-banner-content">
					<text>{{listData.summary}}</text>
				</view>
			</view>
					
			<view class="tag-sort-position">
				<view class="tag-sort-style" style="background-color: #00B4C9;">
					<text style="color: #FFFFFF;">{{listData.type}}类</text>
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
		listData:Object
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
}
.tag-sort-style{
	padding: 10upx 30upx;
	border-top-left-radius: 40upx;
	border-bottom-left-radius: 40upx;
}
.tag-sort-position{
	position: absolute;
	right: 0;
	top:40upx;
}
.cell + .cell {
	margin: 10upx 0; 
	width: 95%; 
	border-top: 1px dashed #A0A0A0;
}
.bottom-banner-position{
	width: 90%;
}
.bottom-banner-content {
	border-radius: 30upx;
	background-color: #E6E6E6;
	color: #9A9A9A;
	font-size: 25upx;
	padding: 20upx 60upx;
}
</style>
