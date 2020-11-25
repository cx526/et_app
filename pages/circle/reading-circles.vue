<template>
	<view v-if="isLogin">
		<!-- 个人信息 -->
		<userInfo @checkTopicRecord="checkTopicRecord" @checkMyRemark="checkMyRemark" @chooseItem="chooseItem" :user_data="data" />
		<!-- 活力排版 -->
		<typesetting @checkVigourDetail="checkVigourDetail" v-if="rankingList && rankingList.length > 0" :rankingList="rankingList" />
		<!-- 通告栏 -->
		<message v-if="rewardList && rewardList.length > 0" :rewardList="rewardList" />
		<!-- 阅读统计 -->
		<stat @checkReadingDetail="checkReadingDetail" ref="stat" v-if="data.custom_type !== '2'" />
		<!-- 话题 -->
		<topic @checkTopicDetail="checkTopicDetail" :schoolId = "data.schoolInfo.id" :gradeId = "grade_id":classId="class_id" @swiperChange="swiperChange" ref="topic" :custom_type="data.custom_type" />
		<!-- 热门打卡 -->
		<markUp @comment="comment" @handleComment="handleComment" :loadMore="true" :topicMark="topicMark" parent="index" @reload="reload" @like="like" @share="share" v-if="currentIndex === 0" />
		<!-- 悬浮窗按钮 -->
		<view class="float" @tap="chooseItem">
			<image :src="$aliImage + 'read-icon-03.png'" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import userInfo from '@/components/circle-components/user-info.vue'
	import typesetting from '@/components/circle-components/typesetting.vue'
	import message from '@/components/circle-components/message.vue'
	import stat from '@/components/circle-components/stat.vue'
	import topic from '@/components/circle-components/topic.vue'
	import markUp from '@/components/circle-components/mark-up.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				isLogin: false,
				data: null,
				totalPage: 0,
				topicMark: [], //打卡数据
				rankingList: [], //前三排名数据
				rewardList: [], //奖励列表
				school_id: '',//学校id
				grade_id: '', //年级id
				class_id: '' ,//所在班级
				sharePath: '', //分享路径
				currentIndex: 0, //全站话题显示热门打卡，其他不显示
			}
		},
		components: {
			userInfo,
			typesetting,
			message,
			stat,
			topic,
			markUp
		},
		watch: {
			school_id(newVal) {
				// 获取热门打卡数据
				this.selReadingMark(this.school_id)
			}
		},
		onLoad(options) {
			
			// 查看奖励
			this.selReadingReward()
		},
		onShow() {
			// 是否更新热门话题数据
			let isReload = uni.getStorageSync('isReload')
			if(this.$refs.topic && isReload) {
				this.$refs.topic.update()
			}
			// 更新统计数据
			if(this.$refs.stat ) {
				this.$refs.stat.updateSort()
			}
			// 检测登录状态
			this.checkLogin()
			// 获取个人信息
			this.getUserInfo()
		},
		onShareAppMessage(res) {
				let params = res.target.dataset
				let topic_id = params.topic_id
				let mark_id = params.mark_id
				let custom_id = this.userInfo.id
				let content = params.content
				return {
					title: content,
					path: '/pages/circle/comment?topic_id='+topic_id+'&mark_id='+mark_id+'&custom_id='+custom_id
				}
		},
		onHide() {
			uni.setStorageSync('isReload', false)
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
			// 获取个人信息
			getUserInfo() {
				if(!this.userInfo.mobile || this.userInfo.mobile === '') { return }
				let params = {
					filterItems: {
						mobile: this.userInfo.mobile
					}
				}
				this.$api.getCustom(params).then(res => {
					res.data[0].vitality = parseInt(res.data[0].vitality)
					this.data = res.data[0]
					this.school_id = this.data.schoolInfo.id
					if(this.data.custom_type === '0' || this.data.custom_type === '1') {
						this.grade_id = this.data.gradeInfo.id
						this.class_id = this.data.childInfo.class
					}
					// 储存用户id到本地
					let userInfo = uni.getStorageSync('userInfo')
					userInfo.id = this.data.id
					uni.setStorageSync('userInfo', userInfo)
					// 获取周排名(前三)
					this.selReadingVitalityCount()
				})
			},
			// 获取热门打卡数据
			selReadingMark(school_id) {
				
				let userInfo = uni.getStorageSync('userInfo')
				let id = String(userInfo.id)
				let params = {
					filterItems: {
						school_id: school_id,
						show_count: '10',
						like_custom_id: String(id),
						show_status: '1',
						my_custom_id: id
					}
				}
				
				this.$api.selReadingMarkByHot(params).then(res => {
					console.log(res)
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.customInfo.vitality = parseInt(item.customInfo.vitality)
							item.create_time = this.formatTime(item.create_time)
						})
					}
					this.topicMark = result
				})
			},
			// 监听话题范围改变
			swiperChange(index) {
				this.currentIndex = index
			},
			// 换一换
			reload() {
				this.selReadingMark(this.school_id)
			},
			// 点赞/取消赞
			like(item) {
				let	userInfo = uni.getStorageSync('userInfo')
				let custom_id = String(userInfo.id)
				let topic_id = String(item.topic_id)
				let mark_id = String(item.id)
				this.addOrDelReadingLike(custom_id, topic_id, mark_id, item.index)
			},
			addOrDelReadingLike(custom_id, topic_id, mark_id, index) {
				console.log('addOrDelReadingLike')
				let params = {
					custom_id: custom_id,
					topic_id: topic_id,
					mark_id: mark_id,
				}
				console.log(params)
				this.$api.addOrDelReadingLike(params).then(res => {
					console.log(res)
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
			
			// 获取周排名(前三)
			selReadingVitalityCount() {
				let params = {
					filterItems: {
						school_id: this.school_id
					}
				}
				this.$api.selSchoolReadingVitalityCount(params).then(res => {
					let result = res.data.rows
					
					if(result && result.length > 0) {
						if(result.length > 3) {
							this.rankingList = result.filter((item, index) => {
								return index < 3
							})
						}else {
							this.rankingList = result
						}
						// result.map(item => {
						// 	item.vitality = parseInt(item.vitality)
						// })
					}
					
				})
			},
			// 查看奖励
			selReadingReward() {
				let params = {
					filterItems: {
						status: '1'
					}
				}
				this.$api.selReadingReward(params).then(res => {
					let result = res.data.rows
					this.rewardList = res.data.rows
				})
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
					return year +'-'+ month + '-' + day
				}else {
					return year +'-'+ month + '-' + day +' '+ hour +':'+ minute +':'+ second
				}
				
			},
			// 补零操作
			complete(number) {
				let num =	number > 9 ? number : '0' + number
				return num
			},
			// 查看话题记录
			checkTopicRecord() {
				uni.navigateTo({
					url: '/pages/circle/topic-record?custom_type='+this.data.custom_type
				})
			},
			// 查看活力榜
			checkVigourDetail() {
				uni.navigateTo({
					url: '/pages/circle/vigour?school_id='+this.school_id+'&custom_type='+this.data.custom_type
				})
			},
			// 查看阅读数据
			checkReadingDetail(index) {
				let params = {
					school_id: this.school_id,
					grade_id: this.grade_id,
					class_id: this.class_id,
					index: index,
					custom_type: this.data.custom_type
				}
				uni.navigateTo({
					url: '/pages/circle/read-data?params='+JSON.stringify(params)
				})
			},
			
			// 查看话题详情
			checkTopicDetail(id) {
				
				uni.navigateTo({
					url: '/pages/circle/topic-detail?custom_type='+this.data.custom_type+'&id='+id
				})
			},
			// 查看打卡评论
			comment(item) {
				let userInfo = uni.getStorageSync('userInfo')
				let params = {
					topic_id: item.topic_id,
					mark_id: item.id,
					custom_id: userInfo.id
				}
				uni.navigateTo({
					// url: '/pages/circle/comment?params='+JSON.stringify(params)
					url: '/pages/circle/comment?topic_id='+params.topic_id+'&mark_id='+params.mark_id+'&custom_id='+params.custom_id
				})
			},
			// 查看我发布的话题
			checkMyRemark() {
				uni.navigateTo({
					url: '/pages/circle/my-remark?custom_type='+this.data.custom_type
				})
			},
			// 点击消息图标
			chooseItem() {
				let itemList = []
				if(this.data.custom_type === '1') {
					itemList = ['我要打卡']
				}else {
					itemList = ['发布话题','我要打卡']
				}
				uni.showActionSheet({
					itemList: itemList,
					success: res => {
						if(this.data.custom_type === '1') {
							// 跳转打卡页面
							uni.navigateTo({
								url: '/pages/circle/add-remark?from=index&school_id='+this.school_id
							})
						}else if(this.data.custom_type !== '1') {
							if(res.tapIndex === 0) {
								// 跳转发布话题页面
								uni.navigateTo({
									url: '/pages/circle/add-topic'
								})
							}else if(res.tapIndex === 1) {
								// 跳转打卡页面
								uni.navigateTo({
									url: '/pages/circle/add-remark?from=index&school_id='+this.school_id
								})
							}
						}
						else {
							return
						}
					}
				})
			},
			// 举报/删除打卡
			handleComment(item) {
				console.log(item)
				let mark_id = item.id //打卡id
				let topic_id = item.topic_id //话题id
				uni.showActionSheet({
					itemList: ['举报'],
					success: res => {
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report?mark_id='+mark_id+'&type=mark&topic_id='+ topic_id
							})
						}else {
							return
						}
					}
				})
			},
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		background: #EBF8FF;
		padding-bottom: 80rpx;
	}
</style>
<style scoped>
	/* 悬浮窗按钮 */
	.float {
		position: fixed;
		right: 0;
		bottom: 300rpx;
		width: 120rpx;
		height: 120rpx;
		z-index: 99;
	}
	.float image {
		width: 100%;
		height: 100%;
	}
</style>
