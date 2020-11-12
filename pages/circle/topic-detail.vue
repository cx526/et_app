<template>
	<view>
		<view style="margin-bottom: 25rpx;">
			<!-- 话题简介 -->
			<topicOutline @checkMoreDetail="checkMoreDetail" @addRemark="addRemark" :custom_type="custom_type" :dataList="topicDetail" :vitality="vitality" :vitalityList="vitalityList" />
			
		</view>
		<!-- 只有阅读PK话题才显示，显示统计类型根据该话题的公开范围进行对应的前端显示。 -->
		<view style="box-sizing: border-box;padding: 0 25rpx;" v-if="false">
			<readChart />
		</view>
		
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
			}
		},
		components: {
			markUp,
			uniPopup,
			topicOutline,
			readChart
		},
		onLoad(options) {
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
			// this.topicMark = []
			this.currentPage = 1
			// 查看话题详细
			this.selTopicDetail(this.id)
			// 查看话题的打卡记录
			this.selReadingMark(this.id, 'del')
		},
		methods: {
			
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
					this.selReadingVitalityDetail()
				})
			},
			// 查看话题的打卡记录
			selReadingMark(topic_id, type = '') {
				let custom_id = this.userInfo.id
				uni.showLoading({
					title: '数据加载中',
					icon: 'none',
					duration: 1500
				})
				let params = {
					currentPage: String(this.currentPage),
					pageSize: this.pageSize,
					filterItems: {
						topic_id: topic_id,
						like_custom_id: String(custom_id)
					}
				}
				this.$api.selReadingMark(params).then(res => {
					uni.hideLoading()
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.create_time = this.formatTime(item.create_time, 'YY:MM:DD: hh:mm:ss')
							item.customInfo.vitality = parseInt(item.customInfo.vitality)
						})
					}
					if(type === 'del') {
						this.topicMark = result
					}else {
						this.topicMark = [...this.topicMark, ...result]
					}
					// 判断是否开启上拉加载更多
					if(this.topicMark.length < this.totalPage) {
						this.loadMore = true
						this.loadStatus = 'more'
						console.log(this.loadMore)
					}else {
						this.loadStatus = 'noMore'
						this.loadMore = false
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
				this.selReadingMark(this.id)
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
					url: '/pages/circle/comment?params='+JSON.stringify(params)
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
			// 举报/删除打卡
			handleComment(item) {
				console.log(item)
				let user_id = this.userInfo.id //用户id
				let remark_id = item.id //打卡id
				let custom_id = item.custom_id //发布打卡者id
				let itemList = []
				if(user_id == custom_id) {
					itemList = ['举报','删除']
				}else {
					itemList = ['举报']
				}
				uni.showActionSheet({
					itemList:itemList,
					success: res => {
						console.log(res)
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report'
							})
						}else if(res.tapIndex === 1) {
							uni.showModal({
								title: '是否确认删除此打卡?',
								success: res => {
									if(res.confirm) {
										this.delReadingMark(remark_id)
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
								this.selReadingMark(this.id, 'del')
							}
						})
					}
				})
			},
			// 跳转打卡页面
			addRemark(title, topic_id,show_comment) {
				console.log(title)
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
