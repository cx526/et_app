<template>
	<view>
		<!-- 话题简介 -->
		<topicOutline parent="award-list" :dataList="topicDetail" :vitality="vitality" @checkMoreDetail="checkMoreDetail" />
		<view class="comment" v-if="rewardList && rewardList.length > 0">
		<view class="list">
			<scroll-view  scroll-y style="max-height: 515rpx;" scrolltolower='loadMore'>
				<view class="title">
					<view class="left">
						<image :src="$aliImage + 'read-line.png'" mode="widthFix"></image>
						<text>获奖名单</text>
					</view>
					
				</view>
				<view class="item" v-for="(item, index) in rewardList" :key="index">
					<view class="left">
						<image :src="item.avatar" mode="widthFix"></image>
					</view>
					<view class="right">
						<view class="context">
							<text class="name">{{ item.childName }}小朋友：</text>
						</view>
						<view class="grade-info">
							<text style="margin-right: 10rpx;">{{ item.schoolName }}</text>
							<text v-if="item.gradeName && item.class">{{ item.gradeName + item.class + '班' }}</text>
						</view>
					</view>
					<view class="vigour">
						<image :src="$aliImage + 'read-vitality.png'" mode=""></image>
						<text>活力值：{{ item.vitality }}</text>
					</view>
				</view>
			</scroll-view>
			<uni-load-more :status="loadStatus" :content-text="loadText" />
		</view>
			
		</view>
		<view v-else class="none">暂无获奖名单</view>
		<!-- 话题内容详细弹窗 -->
		<uni-popup ref="contextDetail" >
			<view :style="{'width': propUpWidth}" class="popUp">{{ topicDetail.description }}</view>
		</uni-popup>
	</view>
</template>

<script>
	import topicOutline from '@/components/circle-components/topic-outline.vue'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
				topic_id: '', //话题id
				topicDetail: null, //话题详情
				vitality: '',//活力值
				pageSize: '10',
				currentPage: 1,
				rewardList: [],
				pageSize: '10',
				currentPage: 1,
				totalPage: 0,
				loadStatus: 'noMore',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				propUpWidth: 0
			}
		},
		components: {
			topicOutline,
			uniLoadMore,
			uniPopup
		},
		onLoad(options) {
			console.log(options)
			this.topic_id = options.topic_id
			// 查看话题详细
			this.selTopicDetail(this.topic_id)
			// 查看获奖名单
			this.selReadingReward()
			// 设置内容弹窗宽度
			uni.getSystemInfo({
				success: res => {
					this.propUpWidth = res.windowWidth * 0.8 + 'px'
				}
			})
		},
		methods: {
			// 查看话题详细
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
			// 查看当前用户在此话题的活力值
			selReadingVitalityDetail() {
				let custom_id = this.userInfo.id
				let topic_id = this.topic_id
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
			// 获取奖励名单
			selReadingReward() {
				let params = {
					pageSize: this.pageSize,
					currentPage: String(this.currentPage),
					filterItems: {
						topic_id: this.topic_id
					}
				}
				this.$api.selReadingReward(params).then(res => {
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.vitality = parseInt(item.vitality)
						})
					}
					this.rewardList = [...this.rewardList, ...result]
					if(this.rewardList.length >= this.totalPage) {
						this.loadStatus = 'noMore'
					}else {
						this.loadStatus = 'more'
					}
				})
			},
			// 上拉加载更多
			loadMore() {
				if(this.rewardList.length < this.totalPage) {
					this.loadStatus = 'loading'
					this.currentPage = this.currentPage + 1
					this.selReadingReward()
				}
			},
			// 查看话题内容详细
			checkMoreDetail() {
				this.$refs.contextDetail.open()
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
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding: 0 25rpx 0 25rpx;
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
		
		font-size: 20rpx;
		color: #B3B3B3;
		margin-top: 6rpx;
	}
	.list .item .vigour {
		width: 180rpx;
		height: 36rpx;
		background: #ffffff;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		font-size: 24rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list .item .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		text-align: center;
		color: #808080;
		font-size: 30rpx;
	}
	.popUp {
		box-sizing: border-box;
		padding: 24rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		background: #fff;
	}
</style>
