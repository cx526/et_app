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
				<input type="number" placeholder="请输入话题的目标值" @input="getTopicVigour" :value="target_vitality" />
			</view>
			<!-- 开始时间 -->
			<view class="item">
				<text class="label">开始时间</text>
				<picker mode="date" @change="getStartTime">
					<input placeholder="请选择话题开始时间" :value="start_time" />
				</picker>
			</view>
			<!-- 结束时间 -->
			<view class="item">
				<text class="label">结束时间</text>
				<picker mode="date" @change="getEndTime">
					<input placeholder="请选择话题结束时间" :value="end_time" />
				</picker>
			</view>
			<!-- 话题简介 -->
			<view class="item spcial">
				<text class="label">简介</text>
				<textarea placeholder="请输入话题简介" auto-height @input="getTopicContext" @blur="blurContext":value="topicContext"></textarea>
			</view>
			<!-- 话题奖励 -->
			<view class="item" v-if="topicTypeIndex !== 2">
				<text class="label">奖励</text>
				<input placeholder="请输入话题奖励" @input="getTopicReward" @blur="blurReward" :value="topicReward" />
			</view>
			<!-- 是否开启评论 -->
			<view class="item">
				<text class="label">开启评论</text>
				<view class="type">
					<picker :range="comment"  @change="changeTopicPower" range-key="title">
						<text>{{ comment[commentIndex].title }}</text>
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
						<picker :range="gradeList" @change="changeGrade" range-key="name">
							<input placeholder="请选择年级" :value="gradeList[gradeIndex].name" disabled  />
						</picker>
						<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
					</view>	
				</view>
				<!-- 班级 -->
				<view class="item" v-if="data.custom_type === '2' && topicScopeIndex !== 0 || data.custom_type === '0'">
					<text class="label">班级</text>
					<view class="type">
						<picker :range="classList" @change="changeClass">
							<input placeholder="请选择班级" :value="classList[classIndex]" disabled />
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
						<picker :range="gradeList" @change="changeGrade" :range-key="name">
							<input placeholder="请选择年级" :value="gradeList[gradeIndex].name" disabled />
						</picker>
						<image :src="$aliImage + 'read-icon-gray-right.png'" mode="widthFix"></image>
					</view>	
				</view>
				<!-- 班级 -->
				<view class="item" v-if="topicScopeIndex == '2' || topicScopeIndex == '3'">
					<text class="label">班级</text>
					<view class="type">
						<picker :range="classList" @change="changeClass">
							<input placeholder="请选择班级" :value="classList[classIndex]" disabled />
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
				custom_id: '', //个人di
				topicTypeIndex: 0, //话题类型
				topicType: [
					{
						title: '活力打卡',
						type: 'vitality'
					},
					{
						title:'阅读PK',
						type: 'pk'
					},
					{
						title: '轻松畅聊',
						type: 'chat'
					}
				],
				type: 'vitality', //话题类型(默认活力打卡)
				title: '', //话题标题
				target_vitality: '', //话题活力目标
				day_mark_count: '1', //每天最多可打卡几次(按话题类型区分)
				start_time: '',//话题开始时间
				end_time: '', //话题结束时间
				description: '', //话题简介
				reward_gift: '', //话题奖励
				topicScope: [
					{
						title: '本园公开',
						value: 'school'
					},
					{
						title: '本级公开',
						value: 'grade'
					},
					{
						title: '本班公开',
						value: 'class'
					},
				],
				topicScopeIndex: 0, //话题范围
				show_range: '',//话题可见范围
				school_id: '', //学校id
				gradeList: [], //年级
				gradeIndex: '',
				grade_id: '', // 年级id
				classList: [], //班级
				classIndex: '',
				class_id: '' , //班级id
				data: null ,//个人信息
				coverImgUrl: '', //话题封面
				tempFilePaths: '',
				//是否开启话题评论
				comment: [
					{ title: '是', value: '1' },
					{ title: '否', value: '0' }
				], 
				show_comment: '1',//默认显示
				commentIndex: 0,
				canvasWidth: 0, // canvas长度
				canvasHeight: 0, //canvas高度
				ctx: null, //定义画布
				access_token: '',
				targetId: '', //新建话题id
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
						this.custom_id = this.data.id
						this.school_id = String(this.data.school_id)
						// 根据身份初始化话题可见选择范围
						this.getTopicScope(this.data.custom_type)
						// 初始化年级
						this.dataInit()
					})
				}
			},
			// 获取学校、年级
			dataInit() {
				let school_id = this.school_id
				this.$api.getSchoolInfo().then(res => {
					let result = res.data
					let currentSchool = []
					if(result && result.length > 0) {
						currentSchool = result.filter(item => {
							return item.id == school_id
						})
					}
					// 初始化所在学校年级
					this.gradeList = currentSchool[0].classInfo
					console.log(this.gradeList)
					for (let i = 1; i < 51; i++) {
						this.classList.push(String(i));
					}
				})
			},
			// 改变话题类型
			changeTopicType(event) {
				let index = Number(event.detail.value)
				this.topicTypeIndex = index
				this.type = this.topicType[index].type
				console.log(this.type)
				// 设置每种话题每天最多可以打卡几次
				switch(this.type) {
					case 'vitality':
					this.day_mark_count = '1'
					this.target_vitality = ''
					break
					case 'pk':
					this.day_mark_count = '2'
					this.target_vitality = '0'
					break
					case 'chat':
					this.day_mark_count = '20'
					this.target_vitality = '0'
					this.reward_gift = ''
					break
					default:
					this.day_mark_count = '1'
					this.target_vitality = ''
					return
				}
				console.log(this.day_mark_count)
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
				let value = event.detail.value.replace(/\s*/g, '')
				this.target_vitality = value
				console.log(this.target_vitality)
			},
			// 获取话题开始时间
			getStartTime(event) {
				this.start_time = event.detail.value
				console.log(this.start_time)
			},
			// 获取话题结束时间
			getEndTime(event) {
				this.end_time = event.detail.value
				console.log(this.end_time)
			},
			// 获取话题内容
			getTopicContext(event) {
				this.description = event.detail.value.replace(/\s*/g, '')
			},
			// 表单失去焦点事件
			blurContext() {
				this.checkText('context',this.description)
				console.log(this.description)
			},
			// 获取话题奖励
			getTopicReward(event) {
				this.reward_gift = event.detail.value.replace(/\s*/g, '')
				
			},
			// 监听表单失去焦点事件
			blurReward() {
				this.checkText('reward', this.reward_gift)
				console.log(this.reward_gift)
			},
			// 改变话题可见范围
			changeTopicScope(event) {
				let index = Number(event.detail.value)
				this.topicScopeIndex = index
				this.show_range = this.topicScope[index].value
				this.gradeIndex = ''
				this.classIndex = ''
				this.grade_id = ''
				this.class_id = ''
				console.log(this.show_range)
	
			},
			// 选择年级
			changeGrade(event) {
				let index = event.detail.value
				this.gradeIndex = index
				this.grade_id = String(this.gradeList[index].id)
				console.log(this.grade_id)
			},
			// 选择班级
			changeClass(event) {
				let index = event.detail.value
				this.classIndex = index
				this.class_id = String(this.classList[index])
				console.log(this.class_id)
			},
			// 是否开启评论
			changeTopicPower(event) {
				let index = event.detail.value
				this.commentIndex = index
				this.show_comment = this.comment[index].value
				console.log(this.show_comment)
			},
			// 根据身份获取话题可见范围
			getTopicScope(custom_type) {
				
				// 教师身份可选的话题公开范围
				let params = [
					{title: '本级公开', value: 'grade'},
					{title: '本班公开', value: 'class'},
				]
				// admin身份可选的话题公开范围
				if(this.userInfo.openId === 'oUume4hcYaqvcF6OEwPcIsNivTIw') {
					this.topicScope = [
						{title: '所有公开',value: 'all'},
						{title: '本园公开',value: 'school'},
						{title: '本级公开',value: 'grade'},
						{title: '本班公开',value: 'class'}
					]
					this.show_range = this.topicScope[this.topicScopeIndex].value
				}else if(custom_type === '0') {
					this.topicScope = params
					this.show_range = this.topicScope[this.topicScopeIndex].value
				}else {
					this.show_range = this.topicScope[this.topicScopeIndex].value
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
							console.log(res.tempFilePaths[0])
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
											that.coverImgUrl = res.tempFilePath
											console.log(that.coverImgUrl)
										},
										fail(res) {
											uni.showToast({ title: 'canvas缩放失败', icon: 'none' });
										}
									});
								}, 200);
							});
						} else {
							// 未超出最大尺度，不用压缩
							that.canvasWidth = res.width;
							that.canvasHeight = res.height;
						}
					}
				});
			},
			
			// 删除图片
			del() {
				this.coverImgUrl = ''
			},
			// 发布话题
			publish() {
				// userInfo.openId !== 'oUume4hcYaqvcF6OEwPcIsNivTIw'
				// 必填项(测试默认封面可有可无，上线需要 this.coverImgUrl)
				if(this.custom_id == '' || this.title == '' || this.description == '' || this.target_vitality == '' || this.start_time == '' || this.end_time == '') {
					uni.showToast({
						title: '请填全必要信息',
						icon: 'none',
						duration: 1500
					})
					return
				}
				// 如果话题可见范围为本年级/本班级时，需要选择年级及所在班级信息
				if(this.show_range == 'grade' || this.show_range == 'class') {
					if(this.grade_id == '' || this.class_id == '') {
						uni.showToast({
							title: '请选全年级班级信息',
							icon: 'none',
							duration: 1500
						})
						return
					}
				}
				let params = {
					custom_id: String(this.custom_id), //用户id
					type: String(this.type), //话题类型
					title: String(this.title), //话题标题
					description: String(this.description), //话题简介
					reward_shell: '0',
					reward_free: '0',
					reward_coin: '0',
					reward_gift: String(this.reward_gift), //奖励
					reward_vitality: '1', //打卡奖励活力值,
					target_vitality: String(this.target_vitality), //目标活力值
					start_time: String(this.start_time), //开始时间
					end_time: String(this.end_time), //结束时间
					day_mark_count: this.day_mark_count, //每天最多可打卡几次(按话题类型区分)
					status: '0',
					show_status: '0',
					show_comment: String(this.show_comment), //是否显示评论(1显示0不显示)
					show_range: String(this.show_range) , //话题可见范围
					school_id: this.school_id, //学校id
					grade_id: this.grade_id,//年级id
					class: this.class_id ,//班级
				}
				console.log(params)
				// 新建话题
				this.addReadingTopic(params)
			},
			// 新建话题
			addReadingTopic(params) {
				this.$api.addReadingTopic(params).then(res => {
					if(res.data.status === 'ok') {
						this.targetId = res.data.rows.insertId //新建话题id
						uni.switchTab({
							url: '/pages/circle/reading-circles'
						})
						if(this.coverImgUrl != '') {
							// 上传图片
							this.upLoadFile(this.coverImgUrl)
						}
					}
				})
			},
			// 上传话题封面
			upLoadFile(coverImgUrl) {
				uni.uploadFile({
					url:'https://www.52diyike.com/api/api/upload/uploadPicToAliyun',
					filePath: coverImgUrl,
					name: 'file',
					success: res => {
						let result = JSON.parse(res.data)
						console.log(result)
						let params = {
							targetId: String(this.targetId),
							usage: "reading_topic",
							res: result
						}
						console.log(params)
						this.addUploadPic(params)
					}
				})
			},
			// 上传图片到阿里云后的回调
			addUploadPic(params) {
				this.$api.addUploadPic(params).then(res => {
					uni.showToast({
						title: '新建话题成功',
						icon: 'none',
						success:() => {
							uni.switchTab({
								url: '/pages/circle/reading-circles'
							})
						}
					})
				})
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
				return
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
										this.description = ''
										break
										case 'reward':
										this.reward_gift = ''
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
