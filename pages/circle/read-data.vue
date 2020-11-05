<template>
	<view>
		<view class="topic">
			<view class="left">
				<image :src="$aliImage + 'offline-icon-01.png'" mode="widthFix"></image>
				<text>阅读总量</text>
			</view>
			<view class="right">
				<text>300</text>
			</view>
		</view>
		<dataChart />
	</view>
</template>

<script>
	import dataChart from '@/components/circle-components/data-chart.vue'
	export default {
		data() {
			return {
				currentIndex: '',
				$aliImage: this.$aliImage,
			}
		},
		components: {
			dataChart
		},
		onLoad(options) {
			this.currentIndex = options.index
			console.log(this.currentIndex)
			// 设置navTitle
			this.setNavTitle(this.currentIndex)
		},
		methods: {
			// 设置navTitle
			setNavTitle(index) {
				switch(index) {
					case '0':
					uni.setNavigationBarTitle({
						title: '本园阅读统计'
					})
					break
					case '1':
					uni.setNavigationBarTitle({
						title: '年级阅读统计'
					})
					break
					case '2':
					uni.setNavigationBarTitle({
						title: '本班阅读统计'
					})
					break
					default:
					uni.setNavigationBarTitle({
						title: '阅读统计'
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding: 25rpx;
	}
</style>
<style scoped>
	.topic {
		box-sizing: border-box;
		display: flex;
		height: 120rpx;
		justify-content: space-between;
		align-items: center;
		border-radius: 30rpx;
		background: #fff;
		padding: 0 40rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16); 
		margin-bottom: 36rpx;
	}
	.topic .left {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #808080;
	}
	.topic .left image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 12rpx;
	}
	.topic .right {
		font-size: 45rpx;
		color: #808080;
	}
</style>
