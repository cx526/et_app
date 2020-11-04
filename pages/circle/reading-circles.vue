<template>
	<view v-if="isLogin">
		<!-- 个人信息 -->
		<userInfo @checkTopicRecord="checkTopicRecord" @checkMyRemark="checkMyRemark" @chooseItem="chooseItem" :custom_type = "data.custom_type" />
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
				userInfo: uni.getStorageSync('userInfo'),
				isLogin: false,
				data: null
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
		onLoad() {
			// 检测登录状态
			this.checkLogin()
			// 获取个人信息
			this.getUserInfo()
		},
		methods: {
			// 检测登录状态
			checkLogin() {
				let userInfo = this.userInfo
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
					mobile: this.userInfo.mobile
				}
				this.$api.offlineUserDockerInfo(params).then(res => {
					this.data = res.data
					console.log(this.data)
				})
			},
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
					url: '/pages/circle/topic-detail?custom_type='+this.data.custom_type
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
					url: '/pages/circle/my-remark?custom_type='+this.data.custom_type
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
