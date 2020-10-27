<template>
	<view class="stat-box">
		<view class="stat">
			<view class="item" v-for="item in dataList" :key="index">
				<image :src="$aliImage + item.path" mode="widthFix" class="bg"></image>
				<view class="data">
					<view>
						<image :src="$aliImage + 'read-info.png'" mode="widthFix" class="info"></image>
						<text style="font-size: 36rpx;font-weight: 700;">120</text>
						<text style="font-size: 20rpx;color: rgba(255,255,255,.6);"> /300人</text>
					</view>
					<view style="font-size: 24rpx;color: rgba(255,255,255,.6);">{{ item.title }}</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				dataList: [
					{
						path: 'read-school.png',
						title: '本园阅读累计'
					},
					{
						path: 'read-grade.png',
						title: '年级阅读累计'
					},
					{
						path: 'read-class.png',
						title: '班级阅读累计'
					}
				]
			}
		}
	}
</script>

<style scoped>
	.stat-box {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	.stat {
		box-sizing: border-box;
		display: flex;
	}
	.stat .item {
		box-sizing: border-box;
		width: 216rpx;
		height: 260rpx;
		position: relative;
		margin-right: 26rpx;
	}
	.stat .item .bg {
		display: block;
		width: 100%;
		height: 100%;
	}
	.stat .item:last-child {
		margin-right: 0;
	}
	.stat .item .data {
		position: absolute;
		width: 100%;
		box-sizing: border-box;
		padding: 0 24rpx;
		top: 24rpx;
		z-index: 8;
		color: #fff;
	}
	.stat .item .data .info {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}
</style>
