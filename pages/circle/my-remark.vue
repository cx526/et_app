<template>
	<view>
		<userInfo parent="my-remark" @chooseItem="chooseItem" :custom_type="custom_type" :user_data="data" />
		<markUp :title="false" @comment="comment"  @handleComment="handleComment" :loadMore="loadMore" :topicMark="topicMark" :loadStatus="loadStatus" @loadingMore="loadingMore" @like="like" @preview="preview" />
		<!-- <view class="list" v-if="dataList && dataList.length > 0">
			<view class="scroll">
				<scroll-view scroll-y style="max-height: 1000rpx;" @scrolltolower="loadingMore">
					<view class="item" v-for="(item, index) in dataList" :key="index" @tap="checkTopicDetail(item.id)">
						<view class="time">
							<text>{{ item.topic_start_day }}</text>
							<text>{{ item.topic_start_month }}月</text>
						</view>
						<image :src="item.imgInfo[0].url"  v-if="item.imgInfo && item.imgInfo.length > 0"></image>
						<image :src="$aliImage + 'read-demo.png'" mode="widthFix" v-else></image>
						<view class="context">
							<view class="type" v-if="item.type === 'vitality'">#活力打卡</view>
							<view class="type" v-else-if="item.type === 'chat'">#轻松畅聊</view>
							<view class="type" v-else>#阅读pk</view>
							<view class="content">{{ item.description }}</view>
						</view>
					</view>
				</scroll-view>
				<uni-load-more :status="loadStatus" :content-text="loadText" />
			</view>
			
			
		</view> -->
		<!-- <view v-else class="none">暂无更多数据</view> -->
	</view>
</template>

<script>
	import userInfo from '@/components/circle-components/user-info.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import markUp from '@/components/circle-components/mark-up.vue'
	export default {
		data() {
			return {
				topicMark: [], // 话题打卡数据
				update: true, //控制是否重新加载数据
				loadMore: true,
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				custom_type: '',
				pageSize: '10',
				currentPage: 1,
				data: null,
				dataList: [],
				totalPage: 0,
				loadStatus: 'more',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
			}
		},
		components: {
			userInfo,
			uniLoadMore,
			markUp
		},
		onLoad(options) {
			this.custom_type = options.custom_type
			// 获取个人信息
			this.getUserInfo()
			// 获取个人打卡jilu
			this.selReadingMark()
		},
		onReachBottom() {
			this.loadingMore()
		},
		methods: {
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
				})
			},
			// 获取个人打卡记录
			selReadingMark() {
				let params = {
					pageSize: this.pageSize,
					currentPage: String(this.currentPage),
					filterItems: {
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selReadingMark(params).then(res => {
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.create_time = this.formatTime(item.create_time, 'YY:MM:DD: hh:mm:ss')
							item.customInfo.vitality = parseInt(item.customInfo.vitality)
						})
					}
					this.topicMark = [...this.topicMark, ...result]
					if(this.topicMark.length >= this.totalPage) {
						this.loadStatus = 'noMore'
					}else {
						this.loadStatus = 'more'
					}
				})
			},
			// 跳转打卡页面
			chooseItem() {
				let school_id = this.data.schoolInfo.id
				uni.navigateTo({
					url: '/pages/circle/add-remark?from=index&school_id='+school_id
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
			// 打卡加载更多
			loadingMore() {
				if(this.topicMark.length < this.totalPage) {
					this.loadStatus = 'loading'
					this.currentPage = this.currentPage + 1
					this.selReadingMark()
				}
		
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
			// 监听子组件预览图片事件
			preview() {
				console.log('preview')
				this.update = false
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
								this.selReadingMark()
							}
						})
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		padding-bottom: 60rpx;
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
	.list {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	.list .scroll {
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16);
		 box-sizing: border-box;
		 padding: 0 30rpx;
	}
	.list .item {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		padding: 25rpx 0;
		border-bottom: 1px dashed #B3B3B3;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .time {
		flex-shrink: 0;
	}
	.list .item .time text:nth-child(1) {
		font-size: 40rpx;
		font-weight: 700;
	}
	.list .item .time text:nth-child(2) {
		font-size: 18rpx;
	}
	.list .item image {
		width: 150rpx;
		height: 150rpx;
		margin-left: 13rpx;
		margin-right: 18rpx;
		flex-shrink: 0;
	}
	.list .item .context {
		font-size: 22rpx;
		flex: 1;
		overflow: hidden;
	}
	.list .item .context .type {
		color: #2AAEC4;
		margin-bottom: 4rpx;
	}
	.list .item .context .content {
		overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		color: #808080;
		font-size: 30rpx;
		text-align: center;
	}
</style>
