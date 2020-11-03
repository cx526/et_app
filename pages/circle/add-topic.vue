<template>
	<view>
		<view class="list">
			<!-- 话题类型 -->
			<view class="item">
				<text class="label">话题类型</text>
				<view class="type">
					<picker :range="topicType" range-key="title" @change="changeTopicType">
						<text>{{ topicType[topicTypeIndex].title }}</text>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'"></image>
				</view>
				
			</view>
			
			<!-- 话题标题 -->
			<view class="item">
				<text class="label">话题标题</text>
				<input type="text" placeholder="请输入话题标题" @input="getTopicTitle" @blur="blurTitle" :value="title" />
			</view>
			<!-- 活力值(只有活力打卡才存在) -->
			<view class="item" v-if="topicTypeIndex === 0">
				<text class="label">目标活力值</text>
				<input type="number" placeholder="请输入话题的目标值" @input="getTopicVigour" :value="topicVigour" />
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
				<textarea placeholder="请输入话题简介" auto-height @input="getTopicContext" @blur="blurContext":value="topicContext"></textarea>
			</view>
			<!-- 话题奖励 -->
			<view class="item" v-if="topicScopeIndex !== 3">
				<text class="label">奖励</text>
				<input placeholder="请输入话题奖励" @input="getTopicReward" @blur="blurReward" :value="topicReward" />
			</view>
			<!-- 是否开启评论 -->
			<view class="item">
				<text class="label">开启评论</text>
				<view class="type">
					<picker :range="comment"  @change="changeTopicPower">
						<text>{{ comment[commentIndex] }}</text>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
				</view>
				
			</view>
			<!-- 话题公开范围 -->
			<!-- 园长可选 "本园公开","本班公开","本级公开"，老师可选"本级公开""本班公开"。 -->
			<view class="item">
				<text class="label">话题范围</text>
				<view class="type">
					<picker :range="topicScope" range-key="title" @change="changeTopicScope">
						<text>{{ topicScope[topicScopeIndex].title }}</text>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
				</view>	
			</view>
			<!-- 老师/园长身份 -->
			<block v-if="userInfo.openId !== 'oUume4hcYaqvcF6OEwPcIsNivTIw'">
				<!-- 年级 -->
				<view class="item" v-if="data.custom_type === '2' && topicScopeIndex !== 0 || data.custom_type === '0'">
					<text class="label">年级</text>
					<view class="type">
						<picker :range="gradeList" @change="changeGrade">
							<input placeholder="请选择年级" :value="gradeList[gradeListIndex]" disabled />
						</picker>
						<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
					</view>	
				</view>
				<!-- 班级 -->
				<view class="item" v-if="data.custom_type === '2' && topicScopeIndex !== 0 || data.custom_type === '0'">
					<text class="label">班级</text>
					<view class="type">
						<picker :range="classList" @change="changeClass">
							<input placeholder="请选择班级" :value="classList[classListIndex]" disabled />
						</picker>
						<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
					</view>	
				</view>
			</block>
			<!-- admin身份 -->
			<block v-else>
				<!-- 年级 -->
				<view class="item" v-if="topicScopeIndex == '2' || topicScopeIndex == '3'">
					<text class="label">年级</text>
					<view class="type">
						<picker :range="gradeList" @change="changeGrade">
							<input placeholder="请选择年级" :value="gradeList[gradeListIndex]" disabled />
						</picker>
						<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
					</view>	
				</view>
				<!-- 班级 -->
				<view class="item" v-if="topicScopeIndex == '2' || topicScopeIndex == '3'">
					<text class="label">班级</text>
					<view class="type">
						<picker :range="classList" @change="changeClass">
							<input placeholder="请选择班级" :value="classList[classListIndex]" disabled />
						</picker>
						<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
					</view>	
				</view>
			</block>
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
						title: '本园公开',
						value: 1
					},
					{
						title: '本级公开',
						value: 2
					},
					{
						title: '本班公开',
						value: 3
					},
				],
				topicScopeIndex: 0, //话题范围
				gradeList: ['小小班','中班','大班'],
				gradeIndex: '',
				classList: ['1','2','3','4'],
				classIndex: '',
				data: null ,//个人信息
				coverImgUrl: '', //话题封面
				tempFilePaths: '',
				comment: ['是', '否'], //是否开启话题评论
				commentIndex: 0,
				canvasWidth: 0, // canvas长度
				canvasHeight: 0, //canvas高度
				ctx: null, //定义画布
				access_token: '',
			}
		},
		onLoad() {
			// 获取用户个人信息
			this.getUserInfo(this.userInfo)
			// 获取access_token
			this.getAccessToken()
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
			},
			// 监听表单失去焦点事件
			blurTitle() {
				this.checkText('title',this.title)
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
			},
			// 表单失去焦点事件
			blurContext() {
				this.checkText('context',this.topicContext)
				console.log(this.topicContext)
			},
			// 获取话题奖励
			getTopicReward(event) {
				this.topicReward = event.detail.value
				
			},
			// 监听表单失去焦点事件
			blurReward() {
				this.checkText('reward', this.topicReward)
				console.log(this.topicReward)
			},
			// 改变话题可见范围
			changeTopicScope(event) {
				let index = Number(event.detail.value)
				this.topicScopeIndex = index
			},
			// 选择年级
			changeGrade(event) {
				let index = event.detail.value
				this.gradeIndex = index
			},
			// 选择班级
			changeClass(event) {
				let index = event.detail.value
				this.classIndex = index
			},
			// 是否开启评论
			changeTopicPower(event) {
				let index = event.detail.value
				this.commentIndex = index
			},
			// 根据身份获取话题可见范围
			getTopicScope(custom_type) {
				
				// 教师身份可选的话题公开范围
				let params = [
					{title: '本级公开', value: 1},
					{title: '本班公开', value: 2},
				]
				// admin身份可选的话题公开范围
				if(this.userInfo.openId === 'oUume4hcYaqvcF6OEwPcIsNivTIw') {
					console.log('entry')
					this.topicScope = [
						{title: '所有公开',value: 1},
						{title: '本园公开',value: 2},
						{title: '本级公开',value: 3},
						{title: '本班公开',value: 4}
					]
					
				}else if(custom_type === '0') {
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
			// 缩放操作
			getCanvasImg(tempFiles) {
				var that = this;
				// 获取图片信息来设置canvas的长高
				uni.getImageInfo({
					src: tempFiles[0].path,
					success(res) {
						var maxWidth = 600; // 最大长度
						var maxHeight = 600; // 最大高度
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
			// 压缩图片
			compressImg(path) {
				let that = this;
				uni.compressImage({
					src: path,
					quality: 70, // 压缩质量
					success(e) {
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
							console.log(arr)
							uni.setStorageSync('access_token', arr)
						}
					})
				}else {
					// access_token还在有效期内
					let data = uni.getStorageSync('access_token')
					this.access_token = data[0]
					console.log(this.access_token)
				}
			},
			// 检测文本内容
			checkText(ele,text) {
				uni.request({
					url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+this.access_token,
					method: 'POST',
					data: {
						content: text
					},
					success: res => {
						console.log(res)
						if(res.data.errcode === 87014) {
							uni.showToast({
								title: '您输入的内容带有敏感词，请重新输入',
								icon: 'none',
								duration: 1500,
								success: () => {
									switch(ele) {
										case 'title':
										this.title = ''
										break
										case 'context':
										this.topicContext = ''
										break
										case 'reward':
										this.topicReward = ''
										break
										default:
										return
									}
								}
							})
						}
					}
				})
			},
			
			
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		padding: 25rpx;
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
	.list .item .type {
		display: flex;
		align-items: center;
	}
	.list .item .type image {
		width: 20rpx;
		height: 20rpx;
		margin-left: 4rpx;
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
		margin-top: 80rpx;
	}
</style>
