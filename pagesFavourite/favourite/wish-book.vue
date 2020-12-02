<template>
	<view>
		<view class="list">
			<view class="item">
				<text class="label">书本名称</text>
				<input placeholder="请输入书名" placeholder-style="font-size: 28rpx" />
			</view>
			<view class="item">
				<text class="label">书本作者</text>
				<input placeholder="请输入书本作者" placeholder-style="font-size: 28rpx" />
			</view>
			<view class="item">
				<text class="label">书本出版社</text>
				<input placeholder="请输入书本出版本" placeholder-style="font-size: 28rpx" />
			</view>
			<view class="item">
				<text class="label">书本ISBN</text>
				<input placeholder="请输入书本ISBN" placeholder-style="font-size: 28rpx" />
			</view>
			<view class="item">
				<text class="label">书本简介</text>
				<input placeholder="请输入书本简介" placeholder-style="font-size: 28rpx" />
			</view>
			<view class="item spcial" style="border-bottom: none">
				<text class="label">书本封面</text>
				<view class="show">
					<!-- 图片展示 -->
					<block  v-if="tempFilePaths && tempFilePaths.length > 0">
						<view class="photo" v-for="(item, index) in tempFilePaths" :key="tempFilePaths">
							<image :src="item" mode="aspectFit" @tap="preview(index)"></image>
							<icon type="clear" size="12" style="position: absolute;right: 0;top: 0;" @tap="del(index)"></icon>
						</view>
					</block>
					
					<!-- 添加图片 -->
					<image :src="$aliImage + 'read-add.png'" mode="aspectFit" v-if="tempFilePaths.length < 2" style="width: 120rpx;height: 120rpx;" @tap="select_more"></image>
				</view>
				
			</view>
			<block v-for="(item, index) in tempFilePathsMore" :key="item" >
				<canvas :canvas-id="'attendCanvasId'+index" class='myCanvas' :style="{ width: item.canvasWidth + 'px', height: item.canvasHeight + 'px' }" ></canvas>
			</block>
		</view>
		<view style="margin-top: 40rpx;">
			<Btn title="提交" />
		</view>
	</view>
	
</template>

<script>
	import Btn from '@/pagesFavourite/components/btn.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				tempFilePaths: [],
				tempFilePathsMore: [],
				imgShow: []
			}
		},
		components: {
			Btn
		},
		methods: {
			// 选择图片
			select_more() {
				if(this.imgShow.length >= 2) {
					uni.showToast({
						title: '最多上传6张图片',
						icon: 'none',
						duration: 1500
					})
					return
				}
				uni.chooseImage({
					count: 2,
					sizeType: ['compressed'],
					success: res => {
						let tempFilePaths = res.tempFilePaths;
						this.tempFilePaths = [...this.tempFilePaths, ...tempFilePaths]
						for (let i = 0; i < tempFilePaths.length; i++) {
							this.tempFilePathsMore[i] = {};
							this.tempFilePathsMore[i].path = '';
							this.tempFilePathsMore[i].canvasWidth = 0;
							this.tempFilePathsMore[i].canvasHeight = 0;
						}
						this.getCanvasMore(tempFilePaths);
					}
				});
			},
			// 缩放操作
			getCanvasMore(tempFiles) {
				var that = this;
				if (tempFiles && tempFiles.length > 0) {
					for (let i = 0; i < tempFiles.length; i++) {
						uni.getImageInfo({
							src: tempFiles[i],
							success(res) {
								var maxWidth = 600; // 最大长度
								var maxHeight = 600; // 最大高度
								var bili = res.width / res.height; // 获取图片长高比例
								if (res.width > maxWidth || res.height > maxHeight) {
									if (res.width >= res.height) {
										// 长图或正方形
										that.canvasWidth = maxWidth;
										that.canvasHeight = Math.floor(maxWidth / bili)
									} else {
										// 高图
										that.canvasHeight = maxHeight;
										that.canvasWidth = Math.floor(maxHeight * bili)
									}
									// 定义每个画布canvas的宽高和输出图片的宽高
									that.tempFilePathsMore[i].canvasWidth = that.canvasWidth
									that.tempFilePathsMore[i].canvasHeight = that.canvasHeight
									// 绘图
									that.ctx = wx.createCanvasContext(`attendCanvasId${i}`);
									that.ctx.drawImage(res.path, 0, 0, Number(that.canvasWidth), Number(that.canvasHeight))
									that.ctx.draw(false, function() {
										setTimeout(() => {
											uni.canvasToTempFilePath({
												canvasId: `attendCanvasId${i}`,
												success(res) {
													// that.compressMore(res.tempFilePath, i); // 缩放成功后压缩
													let arr = []
													arr.push(res.tempFilePath)
													that.imgShow = [...that.imgShow, ...arr]
												},
												fail(res) {
													uni.showToast({ title: 'canvas缩放失败', icon: 'none' });
												}
											});
										}, 200);
									});
								} else {
									// 直接掉起压缩方法
									that.canvasWidth = res.width;
									that.canvasHeight = res.height;
									// 定义每个画布canvas的宽高和输出图片的宽高
									that.tempFilePathsMore[i].canvasWidth = that.canvasWidth
									that.tempFilePathsMore[i].canvasHeight = that.canvasHeight
									let arr = []
									arr.push(res.path)
									that.imgShow = [...that.imgShow, ...arr]
								}
							}
						});
					}
				}
			},
			// 删除图片
			del(index) {
				this.tempFilePaths.splice(index, 1)
				this.imgShow.splice(index, 1)
			},
			// 预览图片
			preview(index) {
				console.log(index)
				uni.previewImage({
					urls: this.tempFilePaths,
					current: index
				})
			},
		}
	}
</script>

<style>
	page {
		box-sizing: border-box;
		padding: 25rpx;
		background: #EBF8FF;
	}
</style>
<style scoped>
	.list {
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16); 
		padding: 0 30rpx;
	}
	.list .item {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		padding: 0 8rpx;
		border-bottom: 1rpx dashed #b3b3b3;
		height: 95rpx;
		align-items: center;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .label {
		font-weight: 700;
		font-size: 28rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	.list .item input {
		text-align: right;
		font-size: 28rpx;
	}
	.list .item.spcial {
		min-height: 95rpx;
		height: auto;
		padding: 20rpx 0 80rpx 0;
	}
	.list .item .show {
		display: flex;
	}
	.list .item .show .photo {
		margin-right: 10rpx;
		position: relative;
	}
	.list .item .show .photo:last-child {
		margin-right: 0;
	}
	.list .item .show image {
		width: 120rpx;
		height: 120rpx;
	}
	.list .myCanvas {
		position: absolute;
		left: -10000px;
		top: -10000px;
	}
</style>
