<template>
	<view>
		<!-- 个人信息 -->
		<userInfo @checkTopicRecord="checkTopicRecord" @checkMyRemark="checkMyRemark" @chooseItem="chooseItem" />
		<!-- 活力排版 -->
		<typesetting @checkVigourDetail="checkVigourDetail" />
		<!-- 通告栏 -->
		<message />
		<!-- 阅读统计 -->
		<stat />
		<!-- 话题 -->
		<topic @checkTopicDetail="checkTopicDetail" />
		<!-- 热门打卡 -->
		<markUp @comment="comment" @handleComment="handleComment" :loadMore="true" />
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
		methods: {
			// 查看话题记录
			checkTopicRecord() {
				uni.navigateTo({
					url: '/pages/circle/topic-record'
				})
			},
			// 查看活力榜
			checkVigourDetail() {
				uni.navigateTo({
					url: '/pages/circle/vigour'
				})
			},
			// 查看话题详情
			checkTopicDetail() {
				uni.navigateTo({
					url: '/pages/circle/topic-detail'
				})
			},
			// 查看打卡评论
			comment() {
				uni.navigateTo({
					url: '/pages/circle/comment'
				})
			},
			// 查看我的打卡记录
			checkMyRemark() {
				uni.navigateTo({
					url: '/pages/circle/my-remark'
				})
			},
			chooseItem() {
				uni.showActionSheet({
					itemList:['发布话题','我要打卡'],
					success: res => {
						console.log(res)
						if(res.tapIndex === 0) {
							// 跳转发布话题页面
							uni.navigateTo({
								url: '/pages/circle/add-topic'
							})
						}else if(res.tapIndex === 1) {
							// 跳转打卡页面
							uni.navigateTo({
								url: '/pages/circle/add-remark?from=index'
							})
						}else {
							return
						}
					}
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

</style>
