<template>
	<view>
		<view class="list">
			<!-- 话题标题 -->
			<view class="item">
				<text class="label">话题</text>
				<!-- 从首页进入显示 -->
				<view class="type" v-if="comeFrom === 'index'">
					<picker :range="topicList" range-key="title" @change="changeTopic">
						<input :value="topicList[topicListIndex].title" disabled placeholder="请选择您要打卡的话题"></input>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'"></image>
				</view>
				<!-- 从话题详情页进入显示 -->
				<text v-if="comeFrom === 'topicDetail'">{{ title }}</text>
			</view>
			<view class="context"><textarea value="" placeholder="请输入这一刻的想法…" placeholder-style="color: #808080;font-size:28rpx" @input="getContext" @blur="blurContext" :value="context"/></view>
			<!-- 图片上传 -->
			<view class="picture">
				<!-- 图片展示 -->
				<block v-if="tempFilePaths && tempFilePaths.length > 0">
					<view class="upload" v-for="(item, index) in tempFilePaths" :key="index">
						<image :src="item" class="show" @tap="preview(index)"></image>
						<icon type="clear" size="12" style="position: absolute;right: 0;top: 0;" @tap="del(index)"></icon>
					</view>
				</block>
				<view class="add" v-if="tempFilePaths.length < 6" @tap="select_more">
					<view class="row-line"></view>
					<view class="column-line"></view>
				</view>
			</view>
			<!-- 画布 -->
			<block v-for="(item, index) in tempFilePathsMore" :key="item" >
				<canvas :canvas-id="'attendCanvasId'+index" class='myCanvas' :style="{ width: item.canvasWidth + 'px', height: item.canvasHeight + 'px' }" ></canvas>
			</block>
		</view>
		<view class="btn" @tap="submit">
			<text>发表打卡</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			$aliImage: this.$aliImage,
			topicList: [],
			topicListIndex: '',
			comeFrom: '', //判断是从首页进入还是从话题详情页进入
			title: '',
			//储存用户上传的图片
			tempFilePathsMore: [],
			tempFilePaths: [], //储存未经过压缩图片的路径
			imgShow: [], //储存经过压缩后图片的路径
			canvasWidth: 0, // canvas长度
			canvasHeight: 0, //canvas高度
			ctx: null, //定义画布
			access_token: '',
			context: '',
			topic_id: '', //话题id
			show_comment: '', //是否开启评论
			insertId: '', //打卡id
			school_id: '', //学校id
			count: 0
		};
	},
	onLoad(options) {
		this.comeFrom = options.from
		if(options.from === 'topicDetail') {
			console.log('topicDetail')
			this.title = options.title
			this.topic_id = options.topic_id
			this.show_comment = options.show_comment
		}else {
			this.school_id = options.school_id
			console.log('index')
			// 获取本园话题
			this.selReadingTopic()
			// 获取全站话题
			this.selReadingAllTopic()
		}
		
		console.log(options)
		// 获取access_token
		this.getAccessToken()
	},
	methods: {
		// 获取本园话题
		selReadingTopic() {
			let params = {
				filterItems: {
					school_id: this.school_id
				}
			}
			this.$api.selReadingTopic(params).then(res => {
				this.topicList = [...this.topicList, ...res.data.rows]
			})
		},
		// 获取全站话题
		selReadingAllTopic() {
			let params = {
				filterItems: {
					show_range: 'all',
					school_id: ''
				}
			}
			this.$api.selReadingTopic(params).then(res => {
				this.topicList = [...this.topicList, ...res.data.rows]
			})
		},
		// 选择话题
		changeTopic(event) {
			
			let index = event.detail.value;
			this.topicListIndex = index;
			console.log(this.topicList[index])
			this.topic_id = String(this.topicList[index].id)
			this.show_comment = this.topicList[index].show_comment
		},
		// 获取文本输入内容
		getContext(event) {
			this.context = event.detail.value.replace(/\s*/g, '')
		},
		// 监听表单失去焦点事件
		blurContext() {
			this.checkText(this.context)
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
												console.log(that.imgShow)
											},
											fail(res) {
												uni.showToast({ title: 'canvas缩放失败', icon: 'none' });
											}
										});
									}, 200);
								});
							} else {
								console.log('else')
								// 直接掉起压缩方法
								that.canvasWidth = res.width;
								that.canvasHeight = res.height;
								// 定义每个画布canvas的宽高和输出图片的宽高
								that.tempFilePathsMore[i].canvasWidth = that.canvasWidth
								that.tempFilePathsMore[i].canvasHeight = that.canvasHeight
								let arr = []
								arr.push(res.path)
								that.imgShow = [...that.imgShow, ...arr]
								console.log(that.imgShow)
							}
						}
					});
				}
			}
		},
		// 压缩图片
		// compressMore(path, index) {
		// 	var that = this;
		// 	uni.compressImage({
		// 		src: path,
		// 		quality: 90, // 压缩质量
		// 		success(res) {
		// 			that.tempFilePathsMore[index].path = res.tempFilePath
		// 			console.log('最终输出压缩后图片路径：'+ res.tempFilePath)
		// 			uni.hideLoading();
		// 			// 展示经过canvas压缩后的图片
		// 			let arr = []
		// 			arr.push(res.tempFilePath)
		// 			that.imgShow = [...that.imgShow, res.tempFilePath]
		// 			console.log(that.imgShow)
		// 		},
		// 		fail() {
		// 			uni.showToast({ title: '压缩失败', icon: 'none' });
		// 		}
		// 	});
		// },
		// 预览图片
		preview(index) {
			uni.previewImage({
				urls: this.tempFilePaths,
				current: index
			})
		},
		
		// 删除图片
		del(index) {
			this.tempFilePaths.splice(index, 1)
			this.imgShow.splice(index, 1)
		},
		// 获取access_token
		getAccessToken() {
			let data = uni.getStorageSync('access_token')
			// access_token过期重新请求一次
			if(data[0] === '' || !data[0] || new Date().getTime() >= data[1]) {
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4d51a694ef6697ff&secret=fb869bba0e93006943752050004f3c83',
					method: 'GET',
					success: res => {
						let arr = []
						arr[0] = res.data.access_token
						arr[1] = new Date().getTime() + (7200 * 1000)
						uni.setStorageSync('access_token', arr)
					}
				})
			}else {
				// access_token还在有效期内
				let data = uni.getStorageSync('access_token')
				this.access_token = data[0]
			}
		},
		// 检测文本内容
		checkText(text) {
			uni.request({
				url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+this.access_token,
				method: 'POST',
				data: {
					content: text
				},
				success: res => {
					if(res.data.errcode === 87014) {
						uni.showToast({
							title: '您输入的内容带有敏感词，请重新输入',
							icon: 'none',
							duration: 1500,
							success: () => {
								this.context = ''
							}
						})
					}
				}
			})
		},
		// 上传图片
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
						console.log(result)
						let params = {
							targetId: String(this.insertId),
							usage: "reading_mark",
							res: result
						}
						this.addUploadPic(params, this.imgShow.length)
					}
				})
			}
		},
		// 上传图片到阿里云后的回调
		addUploadPic(params, len) {
			
			this.$api.addUploadPic(params).then(res => {
				this.count = this.count+1
				console.log(len)
				console.log(this.count)
				uni.showToast({
					title: '打卡成功',
					icon: 'none',
					duration: 1500,
					success:() => {
						// 全部上传完毕才返回上一页
						if(len == this.count) {
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
						}
						
					}
				})
			})
		},
		// 创建打卡
		addReadingMark() {
			if(this.context === '') {
				uni.showToast({
					title: '打卡内容不能为空',
					icon: 'none',
					duration: 2000
				})
				return
			}
			if(this.topic_id === '') {
				uni.showToast({
					title: '请选择您要打卡的话题',
					icon: 'none',
					duration: 2000
				})
				return
			}
			uni.showLoading({
				title: '提交打卡中',
				mask: true
			})
			let userInfo = uni.getStorageSync('userInfo')
			let custom_id = userInfo.id
			let params = {
				custom_id: custom_id,
				content: this.context,
				topic_id: this.topic_id,
				show_comment: this.show_comment,
				show_status: '2'
			}
			console.log(params)
			this.$api.addReadingMark(params).then(res => {
				uni.hideLoading()
				console.log(res)
				if(res.data.status === 'fail') {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 1500,
						success: () =>{
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							}, 1500)
							
						}
					})
					return
				}
				else {
					this.insertId = res.data.rows.insertId
					console.log(this.insertId)
					if(this.imgShow && this.imgShow.length > 0) {
						this.upLoadFile()
					}
					else {
						uni.showToast({
							title: '打卡成功',
							icon: 'none',
							duration: 1500,
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1500)
							}
						})
					}
				}
			})
			
		},
		// 发表打卡
		submit() {
			this.addReadingMark()
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
.btn {
		box-sizing: border-box;
		height: 90rpx;
		width: 416rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		background-image: linear-gradient(to right, #67DCE5, #3CB5D2);
		border-radius: 60rpx;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 36rpx;
	}
</style>
