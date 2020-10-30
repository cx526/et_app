<template>
	<view>
		<view class="list">
			<!-- 话题类型 -->
			<view class="item">
				<text class="label">话题类型</text>
				<picker :range="topicType" range-key="title" @change="changeTopicType">
					<text>{{ topicType[topicTypeIndex].title }}</text>
				</picker>
			</view>
			<!-- 话题标题 -->
			<view class="item">
				<text class="label">话题标题</text>
				<input type="text" placeholder="请输入话题标题" @input="getTopicTitle" />
			</view>
			<!-- 活力值(只有活力打卡才存在) -->
			<view class="item" v-if="topicTypeIndex === 0">
				<text class="label">目标活力值</text>
				<input type="number" placeholder="请输入话题的目标值" @input="getTopicVigour" />
			</view>
			<!-- 开始时间 -->
			<view class="item">
				<text class="label">开始时间</text>
				<picker mode="date" @change="getStartTime">
					<input placeholder="请选择话题开始时间" :value="startTime" />
				</picker>
			</view>
			<!-- 结束时间 -->
			<view class="item">
				<text class="label">结束时间</text>
				<picker mode="date" @change="getEndTime">
					<input placeholder="请选择话题结束时间" :value="endTime" />
				</picker>
			</view>
			<!-- 话题简介 -->
			<view class="item spcial">
				<text class="label">简介</text>
				<textarea placeholder="请输入话题简介" auto-height @input="getTopicContext"></textarea>
			</view>
			<!-- 话题奖励 -->
			<view class="item" v-if="topicScopeIndex !== 3">
				<text class="label">奖励</text>
				<input placeholder="请输入话题奖励" @input="getTopicReward" />
			</view>
			<!-- 话题公开范围 -->
			<!-- 园长可选"所有公开" "本园公开" ，老师可选"所有公开" "本园公开" "本班公开"。 -->
			<view class="item">
				<text class="label">话题范围</text>
				<picker :range="topicScope" range-key="title" @change="changeTopicScope">
					<text>{{ topicScope[topicScopeIndex].title }}</text>
				</picker>
			</view>
			<!-- 话题封面 -->
			<view class="item cover">
				<text class="label">话题封面</text>
				
				<view class="show" style="position: relative;">
					<image :src="$aliImage + 'read-add.png'" mode="widthFix" v-if="!coverImgUrl" @tap="select_img"></image>
					<image :src="coverImgUrl" v-if="coverImgUrl" style="width: 120rpx;" mode="widthFix"></image>
					<icon type="clear" size="12" style="position: absolute;right: 0;top: 0;" v-if="coverImgUrl" @tap="del"></icon>
				</view>
				
			</view>
		</view>
		<view class="btn" @tap="publish">
			<text>发表话题</text>
		</view>
		<!-- canvas绘图压缩 -->
		<canvas canvas-id='attendCanvasId' :style="{'width': canvasWidth + 'px', 'height' : canvasHeight + 'px'}" class="canvas"></canvas>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage, 
				userInfo: uni.getStorageSync('userInfo'),
				topicTypeIndex: 0, //话题类型
				topicType: [
					{
						title: '活力打卡',
						value: 1
					},
					{
						title:'阅读PK',
						value: 2
					},
					{
						title: '轻松畅聊',
						value:3
					}
				],
				title: '', //话题标题
				topicVigour: '', //话题活力目标
				startTime: '',//话题开始时间
				endTime: '', //话题结束时间
				topicContext: '', //话题内容
				topicReward: '', //话题奖励
				topicScope: [
					{
						title: '所有公开',
						value: 1
					},
					{
						title: '本园公开',
						value: 2
					}
				],
				topicScopeIndex: 0, //话题范围
				data: null ,//个人信息
				coverImgUrl: '', //话题封面
				tempFilePaths: '',
				canvasWidth: 0, // canvas长度
				canvasHeight: 0, //canvas高度
				ctx: null, //定义画布
			}
		},
		onLoad() {
			// 获取用户个人信息
			this.getUserInfo(this.userInfo)
		},
		methods: {
			// 获取用户个人信息
			getUserInfo(userInfo) {
				if(!userInfo || JSON.stringify(userInfo) === '' || !userInfo.mobile || userInfo.mobile === ''){
					uni.redirectTo({
						url: '/pages/guide/auth'
					})
				}else {
					let params = {
						mobile: userInfo.mobile
					}
					this.$api.offlineUserDockerInfo(params).then(res => {
						this.data = res.data
						this.getTopicScope(this.data.custom_type)
						console.log(this.data)
					})
				}
			},
			// 改变话题类型
			changeTopicType(event) {
				let index = Number(event.detail.value)
				this.topicTypeIndex = index
			},
			// 获取话题标题
			getTopicTitle(event) {
				// 去空
				this.title = event.detail.value.replace(/\s*/g, '')
				console.log(this.title)
			},
			// 获取话题活力目标值
			getTopicVigour(event) {
				this.topicVigour = event.detail.value
				console.log(this.topicVigour)
			},
			// 获取话题开始时间
			getStartTime(event) {
				this.startTime = event.detail.value
				console.log(this.startTime)
			},
			// 获取话题结束时间
			getEndTime(event) {
				this.endTime = event.detail.value
				console.log(this.endTime)
			},
			// 获取话题内容
			getTopicContext(event) {
				this.topicContext = event.detail.value
				console.log(this.topicContext)
			},
			// 获取话题奖励
			getTopicReward(event) {
				this.topicReward = event.detail.value
				console.log(this.topicReward)
			},
			// 改变话题可见范围
			changeTopicScope(event) {
				let index = Number(event.detail.value)
				this.topicScopeIndex = index
			},
			// 根据身份获取话题可见范围
			getTopicScope(custom_type) {
				let params = [
					{title: '本园公开', value: 1},
					{title: '本校公开', value: 2},
					{title: '本班公开', value: 3},
				]
				if(custom_type === '0') {
					this.topicScope = params
				}else {
					return
				}
			},
			// 选择图片
			select_img() {
				var that = this;
				uni.chooseImage({
					count: 1,
					success(res) {
						if (res.tempFiles.length > 0) {
							that.getCanvasImg(res.tempFiles); // 通过canvas进行缩放
						}else {
							uni.showToast({
								title: '请先选择要上传的图片',
								icon: 'none'
							})
						}
					}
				});
			},
			// 压缩图片
			getCanvasImg(tempFiles) {
				var that = this;
				// 获取图片信息来设置canvas的长高
				uni.getImageInfo({
					src: tempFiles[0].path,
					success(res) {
						var maxWidth = 400; // 最大长度
						var maxHeight = 400; // 最大高度
						var ratio = res.width / res.height; // 获取图片长高比例
						if (res.width > maxWidth || res.height > maxHeight) {
							if (res.width >= res.height) {
								// 长图或正方形
								that.canvasWidth = maxWidth;
								that.canvasHeight = Number(maxWidth / ratio).toFixed(0);
							} else {
								// 高图
								that.canvasHeight = maxHeight;
								that.canvasWidth = Number(maxHeight * ratio).toFixed(0);
							}						
							that.ctx = wx.createCanvasContext('attendCanvasId');
							that.ctx.drawImage(res.path, 0, 0, Number(that.canvasWidth), Number(that.canvasHeight));
							that.ctx.draw(false, function() {
								setTimeout(() => {
									uni.canvasToTempFilePath({
										canvasId: 'attendCanvasId',
										success(res) {
											that.compressImg(res.tempFilePath); // 缩放成功后压缩
										},
										fail(res) {
											uni.showToast({ title: 'canvas缩放失败', icon: 'none' });
										}
									});
								}, 200);
							});
						} else {
							// 图片最长边未超过1440，无需进行缩放，直接掉起压缩方法
							that.canvasWidth = res.width;
							that.canvasHeight = res.height;
							that.compressImg(res.path);
						}
					}
				});
			},
			compressImg(path) {
				var that = this;
				uni.compressImage({
					src: path,
					quality: 30, // 压缩质量
					success(e) {
						// that.tempFilePaths = e.tempFilePath;
						that.coverImgUrl = e.tempFilePath
						console.log(that.coverImgUrl);
					},
					fail() {
						uni.showToast({ title: '压缩失败', icon: 'none' });
					}
				});
			},
			// 删除图片
			del() {
				this.coverImgUrl = ''
			},
			// 发布话题
			publish() {
				console.log('发布话题')
			},
			
			
			
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		padding: 25rpx 25rpx 0 25rpx;
		box-sizing: border-box;
	}
</style>
<style scoped>
	.list {
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16); 
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.list .item {
		height: 100rpx;
		box-sizing: border-box;
		border-bottom: 1px dashed #b3b3b3;
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
	.list .item.spcial {
		min-height: 80rpx; 
		height: auto;
		padding: 28rpx 0;
		align-items: stretch;
	}
	.list .item.cover {
		padding: 28rpx 0;
		height: auto;
	}
	.list .item.cover image {
		width: 120rpx;
		height: 120rpx;
	}
	.canvas {
		position: absolute;
		left: -2000px;
		top: -2000px;
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
