<template>
	<view>
		<view class="tab-box">
			<view 
			v-for="(item, index) in tabList" 
			:key="index"
			@click="changeTab(index)"
			:class="currentIndex == index ? 'active' : ''">
				<text>{{ item.title }}</text>
			</view>
		</view>
		<view class="bg">
			<image v-if="currentIndex == 0"
			:src="$aliImage + 'rule-online.png'" 
			mode="widthFix"></image>
			<image v-if="currentIndex == 1"
			:src="$aliImage + 'rule-offline.png'" 
			mode="widthFix"></image>
			<image :src="$aliImage + 'service-code.png'" 
			mode="widthFix" class="code" @tap="save"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				currentIndex: 0,
				tabList: [
					{
						title: '邮寄借阅规则'
					},
					{
						title: '童书馆借阅规则'
					}
				],
			}
		},
		methods: {
			// tab切换
			changeTab(index) {
				this.currentIndex = index;
			},
			// 保存二维码图片
			save() {
				uni.authorize({
					scope: "scope.writePhotosAlbum",
					success: () => {
						uni.showModal({
							title: '是否确认保存图片?',
							success: res => {
								console.log(res)
								if(res.confirm) {
									uni.downloadFile({
										url: this.$aliImage + 'service-code.png',
										success: res => {
											console.log(res)
											if(res.statusCode == 200) {
												uni.saveImageToPhotosAlbum({
													filePath: res.tempFilePath,
													success: () => {
														uni.showToast({
															title: '图片保存成功',
															duration: 2000
														})
													}
												})
											}else {
												uni.showToast({
													title: '图片保存失败',
													icon: 'none',
													duration: 2000
												})
											}
										}
									})
									
								}else {
									uni.showToast({
										title: '图片保存失败',
										icon: 'none',
										duration: 2000
									})
								}
							}
						})
					}
				})
			},
		}
	}
</script>

<style scoped>
	/* tab切换 */
	.tab-box {
		box-sizing: border-box;
		display: flex;
		line-height: 80rpx;
		color: #333;
		font-size: 28rpx;
		background: #EBF8FF;
	}
	.tab-box view {
		flex: 1;
		text-align: center;
		border-bottom: 6px solid #BDEBF5;
		
	}
	.tab-box view.active {
		border-color: #30AAC3;
		color: #3FB0C8;
	}
	.bg {
		box-sizing: border-box;
		position: relative;
	}
	.bg image {
		width: 100%;
		display: block;
	}
	.bg .code {
		width: 250rpx;
		height: 250rpx;
		position: absolute;
		bottom: 260rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
