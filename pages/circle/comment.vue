<template>
	<view>
		<markUp :title="false" :topicMark="topicMark" parent="comment" @like="like" />
		<!-- 评论列表 -->
		<view class="comment" v-if="commentList && commentList.length > 0">
		<view class="list">
			<scroll-view scroll-y style="max-height: 515rpx;" @scrolltolower="loadingMore">
				<view class="title">
					<view class="left">
						<image :src="$aliImage + 'read-line.png'" mode="widthFix"></image>
						<text>评论</text>
					</view>
					<view class="right">
						<text>共{{ totalPage }}条</text>
					</view>
				</view>
				<!-- :class="(index + 1) == commentList.length ? ' border-none' : ''" -->
				<view class="item" v-for="(item, index) in commentList" :key="item.id" @tap="handleComment(item)" >
					<view class="left">
						<image :src="item.customInfo.avatar" mode="widthFix"></image>
					</view>
					<view class="right">
						<view class="context">
							<text class="name">{{item.childInfo.name}}小朋友：</text>
							<text class="content">{{ item.content }}</text>
						</view>
						<view class="grade-info">
							<view >
								<text style="margin-right: 10rpx;">{{ item.schoolInfo.name }}</text>
								<text v-if="JSON.stringify(item.gradeInfo) !== '{}'">{{ item.gradeInfo.name + item.childInfo.class + '班' }}</text>
							</view>
							<text>{{ item.create_time }}</text>
						</view>
					</view>
				</view>
				
			</scroll-view>
			<view style="line-height: 60px;">
				<uni-load-more :status="loadStatus" :content-text="loadText" />
			</view>
		</view>
			
			
		</view>
		<view class="none" v-else>暂无评论内容</view>
		<!-- 评论框 -->
		<view class="comment-input">
			<view class="input">
				<input type="text" placeholder="评论" placeholder-style="font-size: 26rpx" @input="getComment" :value="context"  />
				<button type="primary" @tap="submit">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	import markUp from '@/components/circle-components/mark-up.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				context:'',
				access_token: '',
				pageSize: '5',
				currentPage: 1,
				totalPage: 0, //总条数
				loadStatus: 'noMore',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				custom_id: '', //用户id
				topic_id: '', //话题id
				mark_id: '', //打卡id
				topicMark: [], //打卡详情
				commentList: [], //评论数据
				totalPage: 0,
			}
		},
		components: {
			markUp,
			uniLoadMore
		},
		onLoad(options) {
			let params = JSON.parse(options.params)
			this.custom_id = params.custom_id //用户id
			this.topic_id = params.topic_id //话题id
			this.mark_id = params.mark_id //打卡id
			// 查看打卡详情
			this.selReadingMark()
			// 查看打卡评论
			this.selReadingComment()
			// 获取access_token
			this.getAccessToken()
		},
		methods: {
			// 获取打卡详情
			selReadingMark() {
				let custom_id = this.userInfo.id
				let params = {
					pageSize: this.pageSize,
					currentPage: String(this.currentPage),
					filterItems: {
						id: this.mark_id,
						like_custom_id: String(custom_id)
					}
				}
				this.$api.selReadingMark(params).then(res => {
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.create_time = this.formatTime(item.create_time, 'YY:MM:DD: hh:mm:ss')
							item.customInfo.vitality = parseInt(item.customInfo.vitality)
						})
					}
					this.topicMark = result
				})
			},
			// 查看打卡评论
			selReadingComment(type) {
				let params = {
					currentPage: String(this.currentPage),
					pageSize: this.pageSize,
					filterItems: {
						mark_id: this.mark_id
					}
				}
				this.$api.selReadingComment(params).then(res => {
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.create_time = this.formatTime(item.create_time)
						})
					}
					if(type === 'reload') {
						this.commentList = result
					}else {
						this.commentList = [...this.commentList, ...result]
					}
					if(this.totalPage > this.commentList.length) {
						this.loadStatus = 'more'
					}else {
						this.loadStatus = 'noMore'
					}
				})
			},
			// 发表评论
			addReadingComment() {
				if(this.context === '') {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none',
						duration: 1500
					})
					return
				}
				let params = {
					custom_id: String(this.custom_id),
					content: this.context,
					topic_id: String(this.topic_id),
					mark_id: String(this.mark_id)
				}
				this.$api.addReadingComment(params).then(res => {
					if(res.data.status === 'ok') {
						uni.showToast({
							title: '评论成功',
							icon:'none',
							duration: 1500,
							success: () => {
								this.context = ''
								// 刷新评论内容
								this.currentPage = 1,
								this.selReadingComment('reload')
							}
						})
					}
				})
			},
			// 加载更多
			loadingMore() {
				
				if(this.totalPage > this.commentList.length) {
					this.loadStatus = 'loading'
					this.currentPage = this.currentPage + 1
					this.selReadingComment()
				}
			},
			// 点赞/取消赞
			like(item) {
				let custom_id = String(this.userInfo.id)
				let topic_id = String(item.topic_id)
				let mark_id = String(item.id)
				this.addOrDelReadingLike(custom_id, topic_id, mark_id)
			},
			addOrDelReadingLike(custom_id, topic_id, mark_id) {
				let params = {
					custom_id: custom_id,
					topic_id: topic_id,
					mark_id: mark_id,
				}
				this.$api.addOrDelReadingLike(params).then(res => {
					console.log(res)
					if(res.data.status === 'ok') {
						let title = ''
						if(this.topicMark[0].likeStatus == 1) {
							this.topicMark[0].likeStatus = 0
							title = '取消点赞'
						}else {
							this.topicMark[0].likeStatus = 1
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
			// 举报/删除评论
			handleComment(item) {
				let user_id = this.userInfo.id //用户id
				let custom_id = item.custom_id //评论者id
				let id = item.id //评论id
				let itemList = []
				if(user_id == custom_id) {
					itemList = ['举报','删除']
				}else {
					itemList = ['举报']
				}
				uni.showActionSheet({
					itemList: itemList,
					success: res => {
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report'
							})
						}else if(res.tapIndex === 1) {
							uni.showModal({
								title: '是否确认删除此评论?',
								success: res => {
									if(res.confirm) {
										// 执行删除评论操作
										this.delReadingComment(id)
									}
								}
							})
						}else {
							return
						}
					}
				})
			},
			// 删除评论
			delReadingComment(id) {
				let params = {
					id: id
				}
				this.$api.delReadingComment(params).then(res => {
					if(res.data.status === 'ok') {
						uni.showToast({
							title: '删除评论成功',
							icon: 'none',
							success: () => {
								// 执行重新刷新评论数据操作
								this.currentPage = 1
								this.selReadingComment('reload')
							}
						})
						
					}
				})
			},
			// 获取评论框输入的内容
			getComment(event) {
				this.context = event.detail.value.replace(/\s*/g, '')
			},
			// 提交评论
			submit() {
				this.checkText(this.context)
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
							uni.setStorageSync('access_token', arr)
						}
					})
				}else {
					// access_token还在有效期内
					let data = uni.getStorageSync('access_token')
					this.access_token = data[0]
				}
			},
			// 文本检测
			checkText(text) {
				uni.request({
					url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+this.access_token,
					method: 'POST',
					data: {
						content: text
					},
					success: res => {
						if(res.data.errcode === 87014) {
							uni.showToast({
								title: '您输入的内容带有敏感词，请重新输入',
								icon: 'none',
								duration: 1500,
								success: () => {
									this.context = ''
								}
							})
						}else {
							// 提交评论请求
							this.addReadingComment()
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
		box-sizing: border-box;
		padding-bottom: 80rpx;
	}
	::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
</style>
<style scoped>
	.comment {
		box-sizing: border-box;
		padding: 25rpx;
	}
	.list {
		box-sizing: border-box;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16);
		padding: 0 30rpx;
		background: #fff;
	}
	.title {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 70rpx;
		border-bottom: 1px dashed #b3b3b3;
	}
	.title .left {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.title .left image {
		width: 10rpx;
		height: 33rpx;
		margin-right: 12rpx;
	}
	.title .right {
		font-size: 24rpx;
		color: #2AAEC4;
	}
	.list .item {
		box-sizing: border-box;
		padding: 32rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 1px dashed #b3b3b3;
	}
	.list .item:last-child {
		border-bottom: 0
	}
	.list .item .left {
		box-sizing: border-box;
		width: 70rpx;
		height: 70rpx;
		margin-right: 28rpx;
		flex-shrink: 0;
	}
	.list .item .left image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 50%;
	}
	.list .item .right {
		box-sizing: border-box;
		flex: 1;
	}
	.list .item .right .context {
		font-size: 24rpx;
	}
	.list .item .right .context .name {
		font-weight: 700;
	}
	.list .item .right .grade-info {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
		color: #B3B3B3;
		margin-top: 6rpx;
	}
	
	.comment-input {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		padding: 12rpx;
		background: #F3F3F3;
	}
	.comment-input .input {
		width: 100%;
		height: 100%;
		display: flex;
	}
	.comment-input .input button {
		font-size: 26rpx;
		margin-left: 6rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.comment-input .input input {
		flex: 1;
		box-sizing: border-box;
		height: 100%;
		background: #FFFFFF;
		padding: 0 6rpx;
		border-radius: 4rpx;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		text-align: center;
		color: #808080;
		font-size: 30rpx;
	}
	.border-none {
		border-bottom: none !important;
	}
</style>
