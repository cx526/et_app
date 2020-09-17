<template>
	<view>
		<view class="form">
			<view class="item">
				<text class="label">学校</text>
				<picker class="picker-input" mode="selector" @change="bindSchoolChange" :value="schoolIndex" :range="schoolArray" range-key="name" :disabled="isDisabled">
				<input type="text"
				placeholder="请选择学生所在学校"
				placeholder-style="font-size: 30rpx; color: #999"
				disabled 
				:value="schoolName" />
				</picker>
			</view>
			<view class="item">
				<text class="label">年级</text>
				<picker class="picker-input" 
				mode="selector" 
				@change="bindradeChange" 
				:value="gradeIndex" 
				:range="gradeArray" 
				range-key="name"
				style="position: relative;"
				:disabled="isDisabled">
				<input type="text"
				placeholder="请选择学生所在年级"
				placeholder-style="font-size: 30rpx; color: #999"
				disabled 
				:value="gradeName"
				style="box-sizing: border-box;padding-right: 60rpx;"/>
				<image
				:src="$aliImage + 'teacher-icon-02.png'" 
				mode="widthFix"
				style="width: 40rpx;height: 40rpx;margin-left: 20rpx;position: absolute;top: 52%;right: 0;transform: translateY(-50%);z-index: 4;"
				@tap.stop="gradeScan">
				</image>
				</picker>
			</view>
			<view class="item">
				
				<text class="label">班级</text>
				<picker class="picker-input" @change="bindClassChange" :value="classIndex" :range="classArray" :disabled="isDisabled">
				<input type="text"
				placeholder="请选择学生所在班级"
				placeholder-style="font-size: 30rpx; color: #999"
				:value="className+'班'"
				disabled
				 />
				 </picker>
				 <!-- <image
				 :src="$aliImage + 'teacher-icon-02.png'" 
				 mode="widthFix"
				 style="width: 40rpx;height: 40rpx;margin-left: 20rpx;"
				 @tap="scan">
				 </image> -->
			</view>
			<view class="item">
				<text class="label">借书卡号</text>
					<input type="text" placeholder="请扫码绑定童书卡"
					placeholder-style="font-size: 30rpx; color: #999"
					 @input="getCardNumber" 
					:disabled="isDisabled" v-model="card_no"
					/>
				<image 
				:src="$aliImage + 'teacher-icon-02.png'" 
				mode="widthFix"
				style="width: 40rpx;height: 40rpx;margin-left: 20rpx;"
				@tap="scan">
				</image>
			</view>
			
			<view class="item">
				<text class="label">学生姓名</text>
				<input type="text" placeholder="请填写学生姓名" 
				placeholder-style="font-size: 30rpx; color: #999" 
				@input="getName" :disabled="isDisabled" :value="name"/>
			</view>
			<view class="item">
				<text class="label">学生生日</text>
				<picker mode="date" :disabled="isDisabled"
				 @change="bindDateChange" style="flex: 1;text-align: right;">
						<view 
						style="font-size: 30rpx; color: #999"
						>{{ birthDay }}</view>
				</picker>
			</view>
			<view class="item">
				<text class="label">学生性别</text>
				<picker mode="selector" @change="bindSexChange" 
				style="flex: 1;text-align: right;"
				:range="sexArray" :value="sexIndex"
				:disabled="isDisabled">
						<view 
						style="font-size: 30rpx; color: #999"
						>{{ sexArray[sexIndex] }}</view>
				</picker>
			</view>
			<view class="item">
				<text class="label">家长姓名</text>
				<input type="text" placeholder="请填写家长姓名" 
				placeholder-style="font-size: 30rpx; color: #999" 
				@input="getParentName" :disabled="isDisabled" :value="parent_name"/>
			</view>
			<view class="item">
				<text class="label">用户名</text>
				<input type="text" disabled
				value="已授权"
				
				 />
			</view>
			<view class="item">
				<text class="label">联系方式</text>
				<input type="text" disabled
				value="已授权"
				
				 />
			</view>
		</view>
		<!-- @tap="applyForMod" -->
		<view class="btn" 
		v-if="teacherInfo && JSON.stringify(teacherInfo) != '{}'">
			<view @tap="applyForMod" v-if="change_class_status == 0">
				<text>申请修改</text>
			</view>
			<view @tap="saveInfo" v-if="change_class_status == 1">
				<text>保存</text>
			</view>
			<view @tap="applying" v-if="change_class_status == 2">
				<text>审批中</text>
			</view>
		</view>
		<view v-else class="btn">
			<view @tap="saveInfo">
				<text>保存</text>
			</view>
		</view>
		<view class="btn" v-if="from == 'home'" >
			<view @tap="noBind" style="background: #ccc;">
				<text>暂不绑定</text>
			</view>
		</view>
		<!-- 选择老师弹窗 -->
		
		<uni-popup ref="teacherChoose" :maskClick="false">
			<view class="popUp" :style="{width: popUpWidth}">
				<view class="title">
					<text>请选择老师</text>
				</view>
				<radio-group @change="radioChange">
					<label
					v-for="(item, index) in teacherList" 
					:key="item.value">
							<view style="margin-right: 12rpx;">
									<radio :value="item.id" 
									style="transform: scale(0.6);"
									color="#00B7CC"/>
							</view>
							<view>{{item.teacherInfo.true_name}}</view>
					</label>
				
				</radio-group>
				<view class="btn">
					<view @tap="chooseTeacher">
						<text>确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		data() {
			return {
				popUpWidth: '',
				isDisabled: true,
				from: '',
				$aliImage: this.$aliImage,//静态图片域名
				birthDay: '请选择学生生日',
				prefix: '',
				userInfo: {},
				card_no: '',//卡号
				schoolArray: [],//学校列表
				gradeArray: [], //年级列表
				classArray: [], //班级列表
				schoolIndex: '',
				schoolId: '',
				gradeIndex: '',
				gradeId: '',
				classIndex: '',
				class: '',//所在班级
				name: '',//学生姓名
				parent_name: '',//家长姓名
				custom_id: '', //学生id
				sexArray: ['男','女'],//学生性别
				sexIndex: 0,
				gender: 1,
				change_class_status: '',//审核状态
				teacherInfo: {},//老师信息
				teacher_id: '',//老师id
				teacherList: [],//老师列表
				schoolName: '',//所属学校名称
				gradeName: '',//所属年级
				className: '',//所属班级
			}
		},
		components: {
			uniPopup
		},
		onLoad(option) {
			this.from = option.from ? option.from : ''
			console.log(this.from)
			this.getId()
			// this.dataInit()
			uni.getSystemInfo({
				success: res => {
					this.popUpWidth  = res.windowWidth * 0.8 + 'px'
				}
			})
		},
		
		methods: {
			// 手动填写卡号
			getCardNumber(event) {
				let value = event.detail.value.replace(/\s*/g, '')
				let prefix = value.substring(0,2)
				let number = ''
				if(value.length > 2) {
					number = value.substring(2).replace(/[^\d]/g, '')
				}
				setTimeout(() => {
					this.card_no = prefix + value.substring(2).replace(/[^\d]/g, '')
				},50)
				
				console.log(this.card_no)
			},
			// 班级扫描
			gradeScan() {	
				if(!this.isDisabled) {
					uni.scanCode({
						success: res => {
							console.log(res)
							let classQrcode = res.result
							this.$api.teacherQrCode({
								classQrcode
							}).then(res => {
								console.log(res)
								if(res.data.status == 'ok') {
									let info = res.data.rows;
									console.log(info)
									// 重置学校/年级/班级id,名称
									this.className = info.classInfo
									this.schoolName = info.schoolInfo.name
									this.gradeName = info.gradeInfo.name
									this.schoolId = info.schoolInfo.id
									this.gradeId = info.gradeInfo.id
									console.log(this.schoolId,this.gradeId)
								}
							})
						}
					})
				}else {
					uni.showToast({
						title: '请先提交修改申请',
						icon: 'none',
						duration: 2000
					})
					return
				}
				
			},
			// 选择老师
			radioChange(event) {
				console.log(event)
				this.teacher_id = event.detail.value;
				console.log(this.teacher_id)
			},
			// 确定老师
			chooseTeacher() {
				if(this.teacher_id == '') {
					uni.showToast({
						title: '请选择老师',
						icon: 'none'
					})
					return
				}
				this.bindTeacher()
				
			},
			// 获取学生资料
			getId() {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({
					filterItems: { mobile }
				}).then(res => {
					console.log(res)
					// 初始信息
					this.schoolName = res.data[0].schoolInfo ? 
					res.data[0].schoolInfo.name : '' //学校名称
					
					this.schoolId = res.data[0].schoolInfo ? 
					res.data[0].schoolInfo.id : '' //学校id
					
					this.gradeName = res.data[0].gradeInfo ? 
					res.data[0].gradeInfo.name : ''  //年级
					
					this.gradeId = res.data[0].gradeInfo ? 
					res.data[0].gradeInfo.id : '' //年级id
					
					this.className = res.data[0].childInfo ? 
					res.data[0].childInfo.class : '' //班级
					
					this.card_no = res.data[0].card_no ? 
					res.data[0].card_no : '' //卡号
					
					this.name = res.data[0].childInfo ?
					res.data[0].childInfo.name : '' //学生姓名
		
					this.birthDay = res.data[0].childInfo ? 
					res.data[0].childInfo.birth_day : '' //学生生日
					
					this.parent_name = res.data[0].childInfo ? 
					res.data[0].childInfo.parent_name : '' //家长姓名
					
					this.sexIndex = JSON.stringify(res.data[0].childInfo) != "{}" ? res.data[0].childInfo.gender - 1 : 0 //学生性别
					
					this.custom_id = res.data[0].id; //学生id
					
					this.change_class_status = res.data[0].change_class_status 
					
					this.teacherInfo = res.data[0].teacherInfo //教师信息
					
					// 确认信息是否给修改(有绑定老师需要申请，没有随意)
					if(this.change_class_status == 1) {
						console.log('teacherInfo')
						this.isDisabled = false
					}else if(JSON.stringify(res.data[0].teacherInfo) == "{}"){
						this.isDisabled = false
					}else {
						this.isDisabled = true
					}
					// 初始化学校列表
					this.dataInit()
				})
			},
			// 获取班级学校信息
			dataInit() {
				this.$api.getSchoolInfo().then(res => {
					console.log(res.data)
					this.schoolArray = res.data //学校列表
					if(this.schoolId && this.schoolId != '') {
						if(this.schoolArray && this.schoolArray.length > 0) {
							this.schoolArray.map((item,index) => {
								if(item.id == this.schoolId) {
									this.schoolIndex = index
									// 初始化年级列表，防止没点学校直接点年级出现空白
									this.gradeArray = this.schoolArray[index].classInfo
								}
							})
						}
					}
					
					// 初始化默认数据
					console.log(this.schoolId, this.gradeId,this.className)
				})
				for (let i=1; i < 51; i++) {
					this.classArray.push(String(i))
				}
			},
			// 选择学校
			bindSchoolChange(event) {
				this.schoolIndex = event.detail.value
				this.schoolId = this.schoolArray[this.schoolIndex].id;
				this.schoolName = this.schoolArray[this.schoolIndex].name
				// 初始化班级
				this.gradeArray = this.schoolArray[this.schoolIndex].classInfo
				// 每次更改初始化班级索引
				this.gradeIndex = ''
				this.gradeName = ''
			},
			// 选择年级
			bindradeChange(event) {
				if(!this.gradeArray || this.gradeArray.length == 0) {
					uni.showToast({
						title: '请先选择学校',
						icon: 'none',
						duration: 1000
					})
					return
				}
				this.gradeIndex = event.detail.value
				this.gradeId = this.schoolArray[this.schoolIndex].classInfo[this.gradeIndex].id;
				this.gradeName = this.gradeArray[this.gradeIndex].name
				console.log(this.gradeId)
			},
			// 选择班级
			bindClassChange(event) {
				this.classIndex = event.detail.value
				this.class = this.classArray[event.detail.value];
				this.className = this.classArray[this.classIndex]
				console.log(this.class)
			},
			// 生日选择
			bindDateChange(event) {
				this.birthDay = event.target.value
				console.log(this.birthDay)
			},
			// 性别选择
			bindSexChange(event) {
				this.sexIndex = event.detail.value
				this.gender = +event.detail.value + 1
				console.log(this.gender)
			},
			// 学生姓名
			getName(event) {
				this.name = event.detail.value;
				
				console.log(this.name)
			},
			// 家长姓名
			getParentName(event) {
				this.parent_name = event.detail.value;
				console.log(this.parent_name)
			},
			// 监听input框的变化
			cardNumber(event) {
				let value = event.detail.value;
				this.prefix = value
			},
			// 申请修改
			applyForMod() {
				uni.showModal({
					title: '是否申请转班?',
					content: '转班后当前所在班级信息将清空',
					success: res => {
						if(res.confirm) {
							this.$api.applyChangeGrade({
								custom_id: this.custom_id
							}).then(res => {
								if(res.data.status == 'ok') {
									this.change_class_status = 2
								}
								console.log(res)
							})
						}
					}
				})
			},
			// 保存卡号和docker_mac到本地
			getCheckUserInfo() {
				let userInfoStorage = uni.getStorageSync("userInfo")
				let mobile = userInfoStorage.mobile;
				this.$api.offlineUserDockerInfo({mobile}).then(res => {
					let data = res.data
					userInfoStorage.card_no = data.card_no ? data.card_no : ''
					userInfoStorage.docker_mac = data.docker_mac ? data.docker_mac : ''
					uni.setStorageSync('userInfo', userInfoStorage)
				})
			},
			// 保存修改信息
			saveInfo() {
				// 检测卡号
				if(this.checkCard(this.card_no)) {
					let param = {
						custom_id:  this.custom_id,
						parent_name: this.parent_name,
						outer_code:  this.card_no,
						name: this.name,
						gender: this.gender,  //1:男  2：女 
						birth_day: this.birthDay,
						school_id: this.schoolId,
						grade_id: this.gradeId,
						class: this.className
					}
					
					if(this.card_no.replace(/\s*/g,"") == '' || this.name.replace(/\s*/g,"") == '' || this.parent_name.replace(/\s*/g,"") == '' || this.birthDay == '请选择学生生日' || !this.gradeName || !this.schoolName) {
						uni.showToast({
							title: '请补全信息再提交',
							icon: 'none'
						})
						return
					}
					uni.showLoading({
						title: '提交资料中',
						mask: true
					})
					this.$api.addStudentInfo(param).then(res => {
						uni.hideLoading()
						console.log(res)
						
						if(res.data.status == 'ok') {
							
							// 查询老师信息
							this.checkTeacherInfo()
							// 重置本地卡号和docker_mac
							this.getCheckUserInfo()
						}else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}else {
					uni.showToast({
						title: '卡号异常，请重新输入',
						icon: 'none'
					})
				}
				
				
				
				
				
			},
			// 审核中
			applying() {
				uni.showToast({ icon : 'none', title: '您的申请审批中' })
			},
			// 调起微信扫一扫
			scan() {
				if(!this.isDisabled) {
					uni.scanCode({
						success: res => {
							console.log(res)
							if(this.checkCard(res.result)) {
								this.userInfo.card_no = res.result;
								this.card_no = res.result
							}else {
								uni.showToast({ icon : 'none', title: '卡号异常!' })
							}
						}
					})
				}else {
					uni.showToast({
						title: '请先提交修改申请',
						icon: 'none',
						duration: 2000
					})
					return
				}
				
			},
			// 查询老师
			checkTeacherInfo() {
				uni.showLoading({
					title: '数据加载中',
					icon: 'none'
				})
				let param = {
					filterItems:{
					  school_id: String(this.schoolId),
					  grade_id: String(this.gradeId),
					  class: String(this.className)
					}
				}
				this.$api.checkTeacherInfo(param).then(res => {
					uni.hideLoading()
					this.teacherList = res.data.rows;
					console.log(this.teacherList)
					if(this.teacherList && this.teacherList.length > 0) {
						// 显示选择老师弹窗
						this.$refs.teacherChoose.open()
					}else {
						uni.showToast({
							title: "绑卡成功!",
							duration: 2000,
							success: () => {
								uni.reLaunch({
									url: '/pages/library/library'
								})
							}
						})
					}
				})
			},
			// 绑定老师
			bindTeacher() {
				uni.showLoading({
					title: '提交中',
					mask: true
				})
				this.$api.bindTeacher({
					custom_id:  this.custom_id,
					teacher_id: this.teacher_id
				}).then(res => {
					uni.hideLoading()
					console.log(res)
					if(res.data.status == 'ok') {
						this.$refs.teacherChoose.close()
						setTimeout(() => {
							uni.showToast({
								title: '绑定教师成功',
								success: () => {
									uni.reLaunch({
										url: '/pages/library/library'
									})
								}
							})
						},500)
					}else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						})
						this.$refs.teacherChoose.close()
					}
				})
			},
			// 暂不绑定
			noBind() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			// 检查录入卡后是否符合规范
			checkCard(val) {
				let prefix = val.substring(0, 2)
				if (prefix === 'ET') {
					if (val.length === 15 || val.length === 11) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			// 区别学生/老师卡
			checkCardType(val) {
				let prefix = val.substring(0, 2)
				let cardType = val.substring(2, 3)
				if (prefix === 'ET') {
					if (cardType === '0') {
						// 老师卡
						return 'TEACHER_CARD'
					} else if (cardType === '1') {
						// 学生卡
						return 'STUDENT_CARD'
					}
				}
			},
		}
	}
</script>

<style>
	page {
		background: #ebf8ff;
		box-sizing: border-box;
		padding: 24rpx;
	}
	.form {
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		box-sizing: border-box;
		padding: 0 24rpx;
		border-radius: 24rpx;
	}
	.form .item {
		line-height: 120rpx;
		box-sizing: border-box;
		border-bottom: 1rpx dashed #b3b3b3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
	}
	.form .item:last-child {
		border-bottom: 0;
	}
	.form .item .label {
		box-sizing: border-box;
		width: 136rpx;
		margin-left: 12rpx;
	}
	.form .item input {
		flex: 1;
		text-align: right;
		color: #999;
	}
	.form .item image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	
	.btn {
		box-sizing: border-box;
		padding: 0 20%;
		margin-top: 60rpx;
	}
	.btn view {
		background-image: linear-gradient(to right, #9BE6E7, #7BCFEC);
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
	}
	/* 弹窗 */
	.popUp {
		box-sizing: border-box;
		/* width: 80%;
		margin-left: 10%; */
		padding: 0 0 36rpx 0;
		/* height: 400rpx; */
		background: #fff;
		display: flex;
		border-radius: 30rpx;
		flex-direction: column;
	}
	.popUp radio-group {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding: 0 24rpx;
	}
	.popUp .title {
		text-align: center;
		font-weight: bold;
		line-height: 70rpx;
		box-sizing: border-box;
		padding: 32rpx 0;
		color: #00B7CC;
	}
	.popUp radio-group label {
		width: 30%;
		/* text-align: center; */
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 12rpx;
	}
	.popUp radio-group view {
		font-size: 28rpx;
	}
</style>
