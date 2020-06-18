<template>
	<view class='content'>
		<view class="content-position">
			<view class="left-content">
				<image :src="showData.img_url" style="width: 300upx; height: 300upx;"></image>
			</view>
			<view class="right-content">
				<view class="title-style margin-style" v-if="showData.name.length > 0">
					<text>{{showData.name}}</text>
				</view>
				<view class="score-style margin-style" style="font-size: 25upx; font-weight: bold;" v-if="showData.point.length > 0">
					<text>兑换积分:{{showData.point}}</text>
				</view>
				<view class="time-style margin-style" style="font-size: 25upx; font-weight: bold;" v-if="showData.exchange_time.length > 0">
					<text>兑换次数:{{showData.exchange_time}}</text>
				</view>
				<view class="remark-style margin-style" style="font-size: 25upx; color: #2CAFC4;" v-if="showData.remark.length > 0">
					<text>	{{showData.remark}}</text>
				</view>
				<view>
					<view class="button-positon" @tap='exchangeOpt'>
						<text>我要兑换</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const toUrlFunction = require('@/common/toUrlFunction');
	
export default {
	props: {
		showData:Object,
		userInfo:Object
	},
	methods: {
		exchangeOpt(){
			if(!this.$props.userInfo.id){
				uni.showModal({
					title: '请先登录',
					confirmText: '登录',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}
					}
				})
				return;
			}
			toUrlFunction.toUrl('/pages/promote/promoteMonthGiftDetail?id='+this.showData.id);
			// console.log(this.showData.id);
			
		}
	}
}
</script>

<style scoped>
.content{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.content-position{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 10upx;
}
.right-content{
	width: 300upx;
	height: 300upx;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;
	margin-left: 10upx;
}
.title-style{
	color: #2CAFC4;
	padding: 8upx;
	border-top: 1px solid #2CAFC4;
	border-bottom: 1px solid #2CAFC4;
	font-size: 40upx;
	font-weight: bold;
}
.button-positon{
	padding: 8upx 50upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-weight: bold;
	color: #FFFFFF;
	background-color: #2AAEC4;
	border-radius: 40upx;
	font-size: 25upx;
}
.margin-style{
	margin-bottom: 18upx;
}
</style>
