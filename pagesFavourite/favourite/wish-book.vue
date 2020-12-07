<template>
	<view>
		<view class="list">
			<view class="item">
				<text class="label">书本名称</text>
				<input placeholder="请输入书名" placeholder-style="font-size: 28rpx" @input="getTitle" />
			</view>
			<view class="item">
				<text class="label">书本作者</text>
				<input placeholder="请输入书本作者" placeholder-style="font-size: 28rpx" @input="getAuthor" />
			</view>
			<view class="item">
				<text class="label">书本出版社</text>
				<input placeholder="请输入书本出版本" placeholder-style="font-size: 28rpx" @input="getPublisher" />
			</view>
			<view class="item">
				<text class="label">书本ISBN</text>
				<input placeholder="请输入书本ISBN" placeholder-style="font-size: 28rpx" @input="getISB" />
			</view>
			<view class="item">
				<text class="label">书本简介</text>
				<input placeholder="请输入书本简介" placeholder-style="font-size: 28rpx" @input="getSummary" />
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
			<Btn title="提交" @handleClick="handleClick" />
		</view>
	</view>
	
</template>

<script>
	import Btn from '@/pagesFavourite/components/btn.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
				tempFilePaths: [],
				tempFilePathsMore: [],
				imgShow: [], //书籍封面(压缩后)
				title: '', // 书籍名称
				author: '', // 书籍作者
				publisher: '', // 书籍出版社
				isbn13: '', //isb编码
				summary: '', //书籍简介
				count: 0,
				insertId: '', //新建心愿书籍成功后返回的id
				ctx: null
			}
		},
		components: {
			Btn
		},
		methods: {
			// 获取书籍名称
			getTitle(event) {
				let value = event.detail.value.replace(/\s*/g, '')
				this.title = value
			},
			// 获取书籍作者
			getAuthor(event) {
				let value = event.detail.value.replace(/\s*/g, '')
				this.author = value
			},
			// 获取书籍出版社
			getPublisher(event) {
				let value = event.detail.value.replace(/\s*/g, '')
				this.publisher = value
			},
			// 获取书籍简介
			getSummary(event) {
				let value = event.detail.value.replace(/\s*/g, '')
				this.summary = value
			},
			// 获取书籍的ISBN编码
			getISB(event) {
				let value = event.detail.value.replace(/\s*/g, '')
				this.isbn13 = value
			},
			
			
			// 提交
			handleClick() {
				if(this.title === '') {
					uni.showToast({
						title: '请填写心愿书籍名称',
						icon: 'none',
						duration: 1500
					})
					return
				}else if(!this.imgShow || this.imgShow.length === 0) {
					uni.showToast({
						title: '请上传心愿书籍封面图',
						icon: 'none',
						duration: 1500
					})
					return
				}
				let params = {
					title: this.title,
					author: this.author,
					publisher: this.publisher,
					isbn13: this.isbn13,
					summary: this.summary,
					custom_id: String(this.userInfo.id),
				}
				this.$api.addGoodsWish(params).then(res => {
					if(res.data.status === 'ok') {
						this.insertId = res.data.insertId
						uni.setStorageSync('selGoodsWish', true)
						if(this.imgShow && this.imgShow.length > 0) {
							this.upLoadFile()
						}else {
							uni.showToast({
								title: '创建成功',
								icon: 'none',
								duration: 1500,
								success: () => {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}
							})
						}
					}else {
						uni.showToast({
							title: '创建失败,请稍后再试',
							icon: 'none',
							duration: 1500,
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
					}
				})
			},
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
				uni.previewImage({
					urls: this.tempFilePaths,
					current: index
				})
			},
			// 上传图片到阿里云
			upLoadFile() {
				uni.showLoading({
					title: '上传图片中',
					mask: true
				})
				for(let i = 0; i < this.imgShow.length; i++) {
					uni.uploadFile({
						url:'https://www.52diyike.com/api/api/upload/uploadPicToAliyun',
						filePath: this.imgShow[i],
						name: 'file',
						success: res => {
							if(this.count == this.imgShow.length) {
								uni.hideLoading()
							}
							let result = JSON.parse(res.data)
							let params = {
								targetId: String(this.insertId),
								usage: "goods_wish",
								res: result
							}
							this.addUploadPic(params, this.imgShow.length)
						}
					})
				}
			},
			// 回调
			addUploadPic(params, len) {
				
				this.$api.addUploadPic(params).then(res => {
					this.count = this.count+1
					if(len == this.count) {
						uni.showToast({
							title: '打卡成功',
							icon: 'none',
							duration: 1500,
							success: () => {
								uni.navigateBack({
									delta: 1
								})
							}
						})
					}
					// uni.showToast({
					// 	title: '打卡成功',
					// 	icon: 'none',
					// 	duration: 1500,
					// 	success:() => {
					// 		// 全部上传完毕才返回上一页
					// 		if(len == this.count) {
					// 			setTimeout(() => {
					// 				uni.navigateBack({
					// 					delta: 1
					// 				})
					// 			}, 1500)
					// 		}
							
					// 	}
					// })
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
