<template>
	<view v-if="isLogin">
		<view style="margin-bottom: 25rpx;">
			<!-- 话题简介 -->
			<topicOutline @checkMoreDetail="checkMoreDetail" @addRemark="addRemark" :custom_type="custom_type" :dataList="topicDetail" :vitality="vitality" :vitalityList="vitalityList" />
			
		</view>
		<!-- 只有阅读PK话题且身份不是园长才显示，显示统计类型根据该话题的公开范围进行对应的前端显示。 -->
		<!-- <view style="box-sizing: border-box;padding: 0 25rpx;" v-if="topicDetail.type === 'pk' && custom_type !== '2' && this.show_range !== 'all' ">
			<readChart :axis="axis" />
		</view> -->
		
		<markUp :title="false" @comment="comment"  @handleComment="handleComment" :loadMore="loadMore" :show_comment="topicDetail.show_comment" :topicMark="topicMark" :topic_type="topicDetail.type" :loadStatus="loadStatus" @loadingMore="loadingMore" @like="like" />
		<!-- 话题内容详细弹窗 -->
		<uni-popup ref="contextDetail" >
			<view :style="{'width': propUpWidth}" class="popUp">{{ topicDetail.description }}</view>
		</uni-popup>
	</view>
	
</template>

<script>
	import markUp from '@/components/circle-components/mark-up.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import topicOutline from '@/components/circle-components/topic-outline.vue'
	import readChart from '@/components/circle-components/read-chart.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				propUpWidth: 0,
				custom_type: '', //学生身份不显示新建打卡按钮
				id: '', //话题id
				topicDetail: null, //话题详情
				vitality: 0, //活力值
				totalPage: 0, //打卡总条数
				currentPage: 1,
				pageSize: '5',
				topicMark: [], // 话题打卡数据
				loadMore: true,
				loadStatus: 'more',
				vitalityList: [], //话题活力之星数据
				school_id: '', //学校id
				grade_id: '' , // 话题可见年级id
				class_id: '', // 华泰可见班级id
				rowList: [], // 横坐标
				dataList: [], //纵坐标
				teacher_id: '', //学生归属老师id
				show_range: '' , //区分话题可见范围
				axis: {},
				isLogin: false, //是否登录
				private: 0, //违规/待审核打卡数
			}
		},
		components: {
			markUp,
			uniPopup,
			topicOutline,
			readChart
		},
		onLoad(options) {
			console.log(options)
			this.custom_type = options.custom_type
			this.id = options.id //话题id
			// 查看话题活力之星(前三)
			this.selReadingTopicTopCustom(this.id)
			// 设置内容弹窗宽度
			uni.getSystemInfo({
				success: res => {
					this.propUpWidth = res.windowWidth * 0.8 + 'px'
				}
			})
		},
		onShow() {
			// 检测登录
			this.checkLogin()
			this.currentPage = 1
			this.topicMark = []
			// 查看话题详细
			this.selTopicDetail(this.id)
			// 查看话题的打卡记录
			// this.selReadingMark(this.id, 'del')
			this.selUserReadingMark(this.id)
		},
		onShareAppMessage(res) {
			console.log(res)
			let params = res.target.dataset
			let topic_id = params.topic_id
			let mark_id = params.mark_id
			let custom_id = this.userInfo.id
			let type = params.type
			let title = ''
			let path = ''
			if(type === 'comment') {
				title = '五车书打卡分享',
				path = '/pages/circle/comment?topic_id='+topic_id+'&mark_id='+mark_id+'&custom_id='+custom_id
			}else {
				title = '五车书话题分享'
			}
			return {
				title: title,
				path: path
			}
		},
		methods: {
			// 检测登录状态
			checkLogin() {
				let userInfo = uni.getStorageSync('userInfo')
				if(!userInfo.name || userInfo.name === 'guest' || !userInfo.mobile || userInfo.mobile == '') {
					this.isLogin = false
					uni.showModal({
						title: '请先登录！',
						content: '是否前往登录页面?',
						success: res => {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/guide/auth'
								})
							}else {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}
						
					})
				}else if(!userInfo.card_no || userInfo.card_no === '') {
					this.isLogin = false
					uni.showModal({
						title: '暂未绑卡！',
						content:'是否前往绑卡页面',
						success: res => {
							if(res.confirm) {
								uni.navigateTo({
									url: '/pages/library/tied-card'
								})
							}else {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}
						}
						
					})
				}else {
					this.isLogin = true
				}
			},
			// 查看当前用户在此话题的活力值
			selReadingVitalityDetail() {
				let custom_id = this.userInfo.id
				let topic_id = this.id
				let params = {
					filterItems: {
						custom_id: String(custom_id) ,
						topic_id: String(topic_id)
					}
				}
				this.$api.selReadingVitalityDetail(params).then(res => {
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							this.vitality = Number(this.vitality) + Number(item.vitality)
						})
						
					}
				})
			},
			// 查看话题
			selTopicDetail(id) {
				let params = {
					filterItems: {
						id: id
					}
				}
				this.$api.selReadingTopic(params).then(res => {
					let result = res.data.rows[0]
					result.start_time = this.formatTime(result.start_time, 'YY:MM:DD')
					result.end_time = this.formatTime(result.end_time, 'YY:MM:DD')
					this.topicDetail = result
					this.school_id = this.topicDetail.school_id
					this.grade_id = this.topicDetail.grade_id
					this.class_id = this.topicDetail.class
					this.show_range = this.topicDetail.show_range
					this.selReadingVitalityDetail()
					// 只有非园长身份且是pk话题且不是admin发布才去展示阅读统计图表
					if(this.custom_type !== '2' && this.topicDetail.type === 'pk' && this.show_range !== 'all') {
						if(this.show_range === 'school') {
							// 园内阅读pk
							this.getReadingStat('school')
						}else if(this.show_range === 'grade'){
							// 年级阅读pk
							this.getReadingStat('grade')
						}else {
							// 班级阅读pk
							if(this.custom_type === '0') {
								// 老师身份
								this.teacher_id = String(this.userInfo.id)
								this.checkStudentRead()
							}else {
								// 学生身份需要先获取所在班级老师id
								this.selTeacherStudent()
							}
						}
					}
					
				})
			},
			// 查看个人违规/未审核打卡记录
			selUserReadingMark(topic_id, loadMore) {
				let custom_id = this.userInfo.id
				let userParams = {
					filterItems: {
						custom_id: String(custom_id),
						topic_id: topic_id,
						like_custom_id: String(custom_id),
						selUnNormal: "1"
					}
				}
				this.$api.selReadingMark(userParams).then(res => {
					this.private = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.create_time = this.formatTime(item.create_time, 'YY:MM:DD: hh:mm:ss')
							item.customInfo.vitality = parseInt(item.customInfo.vitality)
						})
					}
					this.topicMark = [...this.topicMark, ...result]
					console.log(this.topicMark)
					if(loadMore === 'loadMore') {
						this.selReadingMark(this.id)
					}else {
						this.selReadingMark(this.id, 'del')
					}
				})
			},
			// 查看话题的打卡记录
			selReadingMark(topic_id, type = '') {
				let custom_id = this.userInfo.id
				
				let params = {
					currentPage: String(this.currentPage),
					pageSize: this.pageSize,
					filterItems: {
						topic_id: topic_id,
						like_custom_id: String(custom_id),
						show_status: '1'
					}
				}
				console.log(params)
				this.$api.selReadingMark(params).then(res => {
					
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.create_time = this.formatTime(item.create_time, 'YY:MM:DD: hh:mm:ss')
							item.customInfo.vitality = parseInt(item.customInfo.vitality)
						})
					}
					if(type === 'del') {
						
						this.topicMark = [...this.topicMark, ...result]
					}else {
						this.topicMark = []
						this.topicMark = [...this.topicMark, ...result]
					}
					// 判断是否开启上拉加载更多
					if(this.topicMark.length - this.private < this.totalPage) {
						this.loadMore = true
						this.loadStatus = 'more'
					}else {
						this.loadStatus = 'noMore'
						this.loadMore = false
					}
					
				})
			},
			// 获取校园，年级阅读数据
			getReadingStat(type) {
				let params = {
					filterItems: {
						school_id: String(this.school_id)
					}
				}
				if(type === 'grade') {
					params.filterItems.grade_id = String(this.grade_id)
				}
				this.$api.getTeacherInfo(params).then(res => {
					let result = res.data.rows
						if(result && result.length > 0) {
							let rowList = [] //班级(横坐标)
							let orderBookCount = [] //借阅本书
							for(let i = 0; i < result.length; i++) {
								// 组合拼接班级
								if(result[i].gradeInfo.name && result[i].teacherInfo.class) {
									let gradeInfo = result[i].gradeInfo.name + result[i].teacherInfo.class + '班'
									rowList.push(gradeInfo)
									orderBookCount.push(result[i].offlineOrderCount.offlineOrderBookCount ? result[i].offlineOrderCount.offlineOrderBookCount : 0)
								}
							}
							this.rowList = rowList
							this.dataList = orderBookCount.sort((n1,n2) => {return n2 - n1})
							this.axis.rowList = this.rowList
							this.axis.dataList = this.dataList
							if(type === 'school') {
								uni.setNavigationBarTitle({
									title: '本园阅读统计'
								})
							}else {
								uni.setNavigationBarTitle({
									title: '年级阅读统计'
								})
							}				
						}
				})
			},
			// 获取所在班级教师的id
			selTeacherStudent() {
				let params = {
					filterItems: {
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selTeacherStudent(params).then(res => {
					let result = res.data.rows
					if(!result || result.length === 0) {
						this.isShow = false
					}else {
						this.teacher_id = result[0].customInfo.teacherInfo.teacher_id
						// 获取班级学生阅读统计
						this.checkStudentRead()
					}
				})
			},
			// 获取班级学生阅读统计
			checkStudentRead() {
				let params = {
					"filterItems":{
						teacher_id: this.teacher_id,
						allTotal:"1",
					}
				}
				this.$api.checkStudentRead(params).then(res => {
					let result = res.data
					
					if(result && result.length > 0) {
						let rowList = []
						let dataList = []
						result.map(item => {
							rowList.push(item.child_name)
							dataList.push(item.reading_total)
						})
					
						this.rowList = rowList
						this.dataList = dataList.sort((n1,n2) => n2 - n1)
						this.axis.rowList = this.rowList
						this.axis.dataList = this.dataList
					}
				})
			},
			// 查看话题活力之星(前三)
			selReadingTopicTopCustom(topic_id) {
				let params = {
					filterItems: {
						topic_id: topic_id
					}
				}
				this.$api.selReadingTopicTopCustom(params).then(res => {
					let result = res.data.rows
					let arr = []
					if(result && result.length > 0) {
						arr = result.sort(this.compare('totalVitality'))
					}
					this.vitalityList = arr
				})
			},
			// 排序
			compare(property) {
				return (a, b) => {
					let value1 = a[property];
					let value2 = b[property];
					return value2 - value1;
				};
			},
			// 打卡加载更多
			loadingMore() {
				this.loadStatus = 'loading'
				this.currentPage = this.currentPage + 1
				this.selReadingMark(this.id, 'del')
			},
			// 格式化时间
			formatTime(time, type) {
				let date = new Date(time)
				let year = date.getFullYear()
				let month = this.complete(date.getMonth() + 1)
				let day = this.complete(date.getDate())
				let hour = this.complete(date.getHours())
				let minute = this.complete(date.getMinutes())
				let second = this.complete(date.getSeconds())
				if(type === 'YY:MM:DD') {
					return year +'~'+ month + '~' + day
				}else {
					return year +'~'+ month + '~' + day +' '+ hour +':'+ minute +':'+ second
				}
				
			},
			// 补零操作
			complete(number) {
				let num =	number > 9 ? number : '0' + number
				return num
			},
			// 查看话题内容详细
			checkMoreDetail() {
				this.$refs.contextDetail.open()
			},
			// 查看打卡评论
			comment(item) {
				console.log(item)
				let params = {
					topic_id: item.topic_id,
					mark_id: item.id,
					custom_id: this.userInfo.id
				}
				uni.navigateTo({
					url: '/pages/circle/comment?topic_id='+params.topic_id+'&mark_id='+params.mark_id+'&custom_id='+params.custom_id
				})
			},
			// 点赞/取消赞
			like(item) {
				let custom_id = String(this.userInfo.id)
				let topic_id = String(item.topic_id)
				let mark_id = String(item.id)
				this.addOrDelReadingLike(custom_id, topic_id, mark_id, item.index)
			},
			addOrDelReadingLike(custom_id, topic_id, mark_id, index) {
				let params = {
					custom_id: custom_id,
					topic_id: topic_id,
					mark_id: mark_id,
				}
				this.$api.addOrDelReadingLike(params).then(res => {
					if(res.data.status === 'ok') {
						let title = ''
						if(this.topicMark[index].likeStatus == 1) {
							this.topicMark[index].likeStatus = 0
							title = '取消点赞'
						}else {
							this.topicMark[index].likeStatus = 1
							title = '点赞成功'
						}
						uni.showToast({
							title: title,
							icon: 'none',
							duration: 1000
						})
						
					}
					
				})
			},
			// 举报/删除打卡
			handleComment(item) {
				console.log(item)
				let user_id = this.userInfo.id //用户id
				let remark_id = item.id //打卡id
				let custom_id = item.custom_id //发布打卡者id
				let topic_id = item.topic_id //话题id
				let itemList = []
				if(user_id == custom_id) {
					itemList = ['举报','删除']
				}else {
					itemList = ['举报']
				}
				uni.showActionSheet({
					itemList:itemList,
					success: res => {
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report?mark_id='+remark_id+'&type=mark&topic_id='+topic_id
							})
						}else if(res.tapIndex === 1) {
							uni.showModal({
								title: '是否确认删除此打卡?',
								success: res => {
									if(res.confirm) {
										let count = 0
										// 有图片执行删除图片操作
										if(item.imgInfo && item.imgInfo.length > 0) {
											for(let i = 0; i < item.imgInfo.length; i++) {
												let data = item.imgInfo[i]
												let params = {
													url: data.url,
													name: data.file_name
												}
												this.$api.delUploadPic(params).then(res =>{
													count = count + 1
													if(count == item.imgInfo.length) {
														// 刷新数据
														this.delReadingMark(remark_id)
													}
												})
											}
										}else {
											this.delReadingMark(remark_id)
										}
										
									}
								}
							})
						}else {
							return
						}
					}
				})
			},
			// 删除打卡
			delReadingMark(remark_id) {
				let params = {
					id: remark_id
				}
				this.$api.delReadingMark(params).then(res => {
					if(res.data.status === 'ok') {
						uni.showToast({
							title: '删除成功',
							icon: 'none',
							success: () => {
								this.topicMark = []
								this.currentPage = 1
								this.selUserReadingMark(this.id)
							}
						})
					}
				})
			},
			// 跳转打卡页面
			addRemark(title, topic_id,show_comment) {
				uni.navigateTo({
					url: '/pages/circle/add-remark?from=topicDetail&title='+title+'&topic_id='+topic_id+'&show_comment='+ show_comment
				})
			},
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding-bottom: 30rpx;
	}
</style>
<style scoped>


	.popUp {
		box-sizing: border-box;
		padding: 24rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		background: #fff;
	}
</style>
