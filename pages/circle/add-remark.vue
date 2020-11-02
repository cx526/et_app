<template>
	<view>
		<view class="list">
			<!-- 话题标题 -->
			<view class="item">
				<text class="label">话题</text>
				<!-- 从首页进入显示 -->
				<view class="type" v-if="comeFrom === 'index'">
					<picker :range="topicList" range-key="title" @change="changeTopic">
						<text>{{ topicList[topicListIndex].title }}</text>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'"></image>
				</view>
				<!-- 从话题详情页进入显示 -->
				<text v-if="comeFrom === 'topicDetail'">{{ title }}</text>
			</view>
			<view class="context"><textarea value="" placeholder="请输入这一刻的想法…" placeholder-style="color: #808080;font-size:28rpx" /></view>
			<!-- 图片上传 -->
			<view class="picture">
				<!-- 图片展示 -->
				<block v-if="imgShow && imgShow.length > 0">
					<view class="upload" v-for="(item, index) in imgShow" :key="index">
						<image :src="item" class="show" @tap="preview(index)"></image>
						<icon type="clear" size="12" style="position: absolute;right: 0;top: 0;"></icon>
					</view>
				</block>
				<view class="add" v-if="imgShow.length < 6" @tap="select_more">
					<view class="row-line"></view>
					<view class="column-line"></view>
				</view>
			</view>
			<!-- 画布 -->
			<block v-for="(item, index) in tempFilePathsMore" :key="item" >
				<canvas :canvas-id="'attendCanvasId'+index" class='myCanvas' :style="{ width: item.canvasWidth + 'px', height: item.canvasHeight + 'px' }" ></canvas>
			</block>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			$aliImage: this.$aliImage,
			topicList: [{ title: '21天养成阅读习惯', id: 1 }, { title: '入校活动', id: 2 }],
			topicListIndex: 0,
			comeFrom: '', //判断是从首页进入还是从话题详情页进入
			title: '',
			// https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/read-demo.png
			//储存用户上传的图片
			tempFilePathsMore: [],
			imgShow: [],
			canvasWidth: 0, // canvas长度
			canvasHeight: 0, //canvas高度
			ctx: null, //定义画布
		};
	},
	onLoad(options) {
		this.comeFrom = options.from;
		this.title = options.title;
		console.log(options);
	},
	methods: {
		// 选择话题
		changeTopic(event) {
			let index = event.detail.value;
			this.topicListIndex = index;
		},
		// 选择图片
		select_more() {
			// 如果超过6张不给return出去
			if(this.imgShow.length >= 6) {
				uni.showToast({
					title: '最多上传6张图片',
					icon: 'none',
					duration: 1500
				})
				return
			}
			uni.chooseImage({
				count: 6,
				sizeType: ['compressed'],
				success: res => {
					console.log(res)
					let tempFilePaths = res.tempFilePaths;
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
												that.compressMore(res.tempFilePath, i); // 缩放成功后压缩
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
								that.compressMore(res.path, i);
							}
						}
					});
				}
			}
		},
		// 压缩图片
		compressMore(path, index) {
			var that = this;
			uni.compressImage({
				src: path,
				quality: 90, // 压缩质量
				success(res) {
					that.tempFilePathsMore[index].path = res.tempFilePath
					console.log('最终输出压缩后图片路径：'+ res.tempFilePath)
					uni.hideLoading();
					// 展示经过canvas压缩后的图片
					let arr = []
					arr.push(res.tempFilePath)
					that.imgShow = [...that.imgShow, res.tempFilePath]
					console.log(that.imgShow)
				},
				fail() {
					uni.showToast({ title: '压缩失败', icon: 'none' });
				}
			});
		},
		// 预览图片
		preview(index) {
			console.log(index)
			console.log(this.imgShow[index])
			uni.previewImage({
				urls: this.imgShow,
				current: index
				
			})
		},
		
	}
};
</script>

<style>
page {
	background: #ebf8ff;
	padding: 25rpx;
	box-sizing: border-box;
}
</style>
<style scoped>
.list {
	background: #ffffff;
	border-radius: 30rpx;
	box-shadow: 0px 2rpx 5rpx 0px rgba(0, 0, 0, 0.16);
	box-sizing: border-box;
	padding: 0 30rpx 30rpx 60rpx;
}
.list .item {
	height: 100rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: right;
}
.list .item:last-child {
	border-bottom: 0;
}
.list .item .label {
	font-weight: 700;
	flex-shrink: 0;
	margin-right: 160rpx;
}
.list .item .type {
	display: flex;
	align-items: center;
}
.list .item .type image {
	width: 20rpx;
	height: 20rpx;
	margin-left: 4rpx;
}
.list .context {
	width: 100%;
	height: 334rpx;
	box-sizing: border-box;
	border-bottom: 1rpx solid #b3b3b3;
	border-top: 1px solid #b3b3b3;
	box-sizing: border-box;
	padding: 24rpx 0;
}
.list .context textarea {
	width: 100%;
	height: 100%;
}
.list .picture {
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
}
.list .picture .upload {
	width: 180rpx;
	height: 180rpx;
	margin-right: 30rpx;
	margin-top: 20rpx;
	position: relative;
	box-sizing: border-box;
}
.list .picture .upload:nth-child(3n) {
	margin-right: 0;
}
.list .picture .upload .show {
	width: 180rpx;
	height: 180rpx;
	display: block;
}
.list .picture .add {
	position: relative;
	width: 180rpx;
	height: 180rpx;
	background: #f2f2f2;
	margin-top: 20rpx;
}
.list .picture .add .row-line,
.list .picture .add .column-line {
	background: #ccc;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.list .picture .add .row-line {
	width: 60rpx;
	height: 6rpx;
}
.list .picture .add .column-line {
	width: 6rpx;
	height: 60rpx;
}
.list .myCanvas {
	position: absolute;
	left: -10000px;
	top: -10000px;
}
</style>
