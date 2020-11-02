<template>
	<view>
		<view style="margin-bottom: 25rpx;">
			<!-- 话题简介 -->
			<topicOutline @checkMoreDetail="checkMoreDetail" @addRemark="addRemark" />
			
		</view>
		<markUp :title="false" @comment="comment"  @handleComment="handleComment" />
		<!-- 话题内容详细弹窗 -->
		<uni-popup ref="contextDetail" >
			<view :style="{'width': propUpWidth}" class="popUp">通过五车书小程序完成21天阅读打卡任务…通过五车书小程序完成21天阅读打卡任务…通过五车书小程序完成21天阅读打卡任务…</view>
		</uni-popup>
	</view>
	
</template>

<script>
	import markUp from '@/components/circle-components/mark-up.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import topicOutline from '@/components/circle-components/topic-outline.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				propUpWidth: 0
			}
		},
		components: {
			markUp,
			uniPopup,
			topicOutline
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					console.log(res)
					this.propUpWidth = res.windowWidth * 0.8 + 'px'
					console.log(this.propUpWidth)
				}
			})
		},
		methods: {
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
			addRemark(title) {
				console.log(title)
				uni.navigateTo({
					url: '/pages/circle/add-remark?from=topicDetail&title='+title
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
