<template>
	<view>
		<userInfo parent="my-remark" @chooseItem="chooseItem" :custom_type="custom_type" :user_data="data" />
		<view class="list" v-if="dataList && dataList.length > 0">
			<view class="scroll">
				<scroll-view scroll-y style="max-height: 1000rpx;" @scrolltolower="loadingMore">
					<view class="item" v-for="(item, index) in dataList" :key="index" @tap="checkTopicDetail(item.id)">
						<view class="time">
							<text>{{ item.topic_start_day }}</text>
							<text>{{ item.topic_start_month }}月</text>
						</view>
						<image :src="item.imgInfo[0].url" mode="widthFix" v-if="item.imgInfo && item.imgInfo.length > 0"></image>
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
			
			
		</view>
		<view v-else class="none">暂无更多数据</view>
	</view>
</template>

<script>
	import userInfo from '@/components/circle-components/user-info.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				custom_type: '',
				pageSize: '10',
				currentPage: 1,
				data: null,
				dataList: [],
				totalPage: 0,
				loadStatus: 'noMore',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
			}
		},
		components: {
			userInfo,
			uniLoadMore
		},
		onLoad(options) {
			this.custom_type = options.custom_type
			// 获取个人信息
			this.getUserInfo()
			// 获取个人打卡记录
			this.selReadingTopic()
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
			selReadingTopic() {
				let custom_id = this.userInfo.id
				let params = {
					pageSize: this.pageSize,
					currentPage: String(this.currentPage),
					filterItems: {
						custom_id: String(custom_id)
					},
				}
				this.$api.selReadingTopic(params).then(res => {
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							let date = item.formatStartTime.split('-')
							item.topic_start_month = date[1]
							item.topic_start_day = date[2]
						})
					}
					this.dataList = [...this.dataList, ...result]
					if(this.dataList.length < this.totalPage) {
						this.loadStatus = 'more'
					}else {
						this.loadStatus = 'noMore'
					}
				})
			},
			// 上拉加载更多
			loadingMore() {
				if(this.dataList.length < this.totalPage) {
					this.currentPage = this.currentPage + 1
					this.loadStatus = 'loading'
					this.selReadingTopic()
				}
			},
			// 查看话题详情
			checkTopicDetail(id) {
				uni.navigateTo({
					url: '/pages/circle/topic-detail?custom_type='+this.data.custom_type+'&id='+id
				})
			},
			// 跳转新建话题
			chooseItem() {
				uni.navigateTo({
					url: '/pages/circle/add-topic'
				})
			}
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
