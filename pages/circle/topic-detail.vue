<template>
	<view>
		<view style="margin-bottom: 25rpx;">
			<!-- 话题简介 -->
			<topicOutline @checkMoreDetail="checkMoreDetail" @addRemark="addRemark" :custom_type="custom_type" :dataList="topicDetail" />
			
		</view>
		<!-- 只有阅读PK话题才显示，显示统计类型根据该话题的公开范围进行对应的前端显示。 -->
		<view style="box-sizing: border-box;padding: 0 25rpx;" v-if="false">
			<readChart />
		</view>
		
		<markUp :title="false" @comment="comment"  @handleComment="handleComment" :loadMore="true" :show_comment="topicDetail.show_comment" />
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
				custom_type: '',
				id: '', //话题id
				topicDetail: null
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
			this.id = options.id
			// 查看话题详细
			this.selTopicDetail(this.id)
			// 设置内容弹窗宽度
			uni.getSystemInfo({
				success: res => {
					this.propUpWidth = res.windowWidth * 0.8 + 'px'
				}
			})
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
					console.log(res)
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
					result.start_time = this.formatTime(result.start_time)
					result.end_time = this.formatTime(result.end_time)
					this.topicDetail = result
					console.log(this.topicDetail)
					// 只有活力打卡类型才去调用检测活力值
					if(this.topicDetail.type === 'vitality') {
						this.selReadingVitalityDetail()
					}
				})
			},
			// 格式化时间
			formatTime(time) {
				let date = new Date(time)
				let year = date.getFullYear()
				let month = this.complete(date.getMonth() + 1)
				let day = this.complete(date.getDate())
				return year +'-'+ month + '-' + day
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
			comment() {
				uni.navigateTo({
					url: '/pages/circle/comment'
				})
			},
			// 举报/删除打卡
			handleComment() {
				uni.showActionSheet({
					itemList:['举报','删除'],
					success: res => {
						console.log(res)
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report'
							})
						}else if(res.tapIndex === 1) {
							console.log('删除')
						}else {
							return
						}
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
