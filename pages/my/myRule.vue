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
		<view class="notice">
			<view class="item">
				<text>标记</text>
				<image :src="$aliImage + 'book-logo-02.png'" mode="widthFix"></image>
				<text>的书本仅可童书馆借阅，在学校智能书柜取书/还书</text>
			</view>
			<view class="item">
				<text>标记</text>
				<image :src="$aliImage + 'book-logo-01.png'" mode="widthFix"></image>
				<text>的书本仅可邮寄借阅，通过快递取书/还书</text>
			</view >
			<view class="item">
				<text>标记</text>
				<image :src="$aliImage + 'book-logo-03.png'" mode="widthFix"></image>
				<text>的书本可童书馆借阅或邮寄借阅</text>
			</view>
		</view>
		<view class="bg">
			<swiper :current=currentIndex @change="swiperChange" :style="{'height': swiperHeight}">
				<swiper-item >
						<image @load="onlineLoad"
						:src="$aliImage + 'rule-online.png'" 
						mode="widthFix"></image>
						<image :src="$aliImage + 'service-code.png'"
						mode="widthFix" class="code" @tap="save"></image>
				</swiper-item>
				<swiper-item>
						<image @load="offflineLoad"
						:src="$aliImage + 'rule-offline-02.png'" 
						mode="widthFix"></image>
						<image :src="$aliImage + 'service-code.png'"
						mode="widthFix" class="code" @tap="save"></image>
				</swiper-item>
				
			</swiper>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperHeight: 0,
				onlineHeight: 0,
				offflineHeight: 0,
				$aliImage: this.$aliImage,
				currentIndex: 1,
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
		onReady() {
			this.currentIndex == 0 ? this.swiperHeight = this.onlineHeight : this.swiperHeight = this.offflineHeight
		},
		methods: {
			
			// tab切换
			changeTab(index) {
				this.currentIndex = index;
				this.currentIndex == 0 ? this.swiperHeight = this.onlineHeight : this.swiperHeight = this.offflineHeight
			},
			// 获取图片高度
			onlineLoad(event) {
				console.log(event)
				this.onlineHeight = event.detail.height + 'rpx'
			},
			offflineLoad(event) {
				this.offflineHeight = event.detail.height + 'rpx'
				this.swiperHeight = this.offflineHeight
			},
			swiperChange(event) {
				this.currentIndex = event.detail.current
				this.currentIndex == 0 ? this.swiperHeight = this.onlineHeight : this.swiperHeight = this.offflineHeight
			},
			// 保存二维码图片
			save() {
				uni.authorize({
					scope: "scope.writePhotosAlbum",
					success: () => {
						uni.showModal({
							title: '是否确认保存图片?',
							success: res => {
								if(res.confirm) {
									console.log(this.$aliImage + 'service-code.png',)
									uni.downloadFile({
										url: this.$aliImage + 'service-code.png',
										success: res => {
											console.log(res.tempFilePath)
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
	.notice {
		box-sizing: border-box;
		padding: 0 10rpx;
	}
	.notice .item {
		/* display: flex; */
	/* 	flex-wrap: wrap;
		align-items: center; */
		font-size: 26rpx;
		line-height: 60rpx;
		text-align: center;
	}
	.notice .item image {
		width: 60rpx;
		margin: 0 10rpx;
		position: relative;
		top: 6rpx;
	}
</style>
