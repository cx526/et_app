<template>
	<view class="content">
		<view class="bottom-content">
			<view class='titile-position'>
				<image :src="dataObj.event_img" style="width: 100upx;" mode="widthFix"></image>
				<view class="content-title-position">
					<text style="font-weight: bold; font-size: 30upx;">{{dataObj.event_name}}</text>
					<text style="color:#808080; font-size: 25upx;">{{dataObj.formatDate}}</text>
				</view>
			</view>
			<view>
				<text style="font-weight: bold; font-size: 35upx;" v-if="dataObj.coin > 0">{{dataObj.coin}}</text>
				<text style="font-weight: bold; font-size: 35upx;color:#2AAEC4" v-else>{{dataObj.coin}}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		dataObj:Object
	},
	onLoad(){
		console.log(this.myMenuInfo);
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	methods: {
		
	}
}
</script>

<style scoped>
/* .content {
	width: 100%;
	background-color: #FFFFFF;
	border-radius: 20upx;
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.4);
	border: 1upx solid rgba(179,179,179,0.4);
} */
.bottom-content {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
	padding-right: 20upx;
}
.titile-position {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.content-title-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	
	margin-left: 15upx;
}
</style>
