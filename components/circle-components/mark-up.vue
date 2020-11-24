<template>
	<view class="card-box">
		<view class="card" v-if="topicMark && topicMark.length > 0">
			<view class="title" v-if="title">
				<view class="left">
					<image :src="$aliImage + 'read-line.png'" mode="" class="line"></image>
					<text>热门打卡</text>
				</view>
				<view class="right" @tap="reload">
					<text>换一批</text>
					<image :src="$aliImage + 'read-reload.png'" mode=""></image>
				</view>
			</view>
			<!-- style="max-height: 1000rpx;" -->
			<scroll-view class="list"  scroll-y @scrolltolower="loadingMore" >
				<view class="item" v-for="(item, index) in topicMark" :key="index"  @tap="handleClick('comment', item)" >
					<view class="user">
						<view class="show">
							<image :src="item.customInfo.avatar" mode=""></image>
						</view>
						<view class="context">
							<view class="preson-info">
								<view class="left">
									<text>{{ item.childInfo.name }}</text>
									<text v-if="item.customInfo.custom_type === '0'">老师</text>
									<text v-else-if="item.customInfo.custom_type === '1'">小朋友</text>
									<text v-else>园长</text>
									<!-- 显示总的活力值 -->
									<view class="vitality">
										<image :src="$aliImage + 'read-vitality.png'" mode="" style="margin-right: 8rpx;"></image>
										<text>{{ item.customInfo.vitality }}</text>
									</view>
									
									<view class="read-count">
										<text>已读{{ item.readCount }}本</text>
									</view>
								</view>
								<view class="right" @tap.stop="handleComment(item)" v-if="parent !== 'comment'">
									<image :src="$aliImage + 'read-ellipsis.png'" mode=""></image>
								</view>
							</view>
							<view class="grade-info">
								<text style="margin-right: 8rpx;">{{ item.schoolInfo.name }}</text>
								<text v-if="JSON.stringify(item.gradeInfo) !== '{}'">{{item.gradeInfo.name + item.childInfo.class + '班'}}</text>
							</view>
						</view>
						
					</view>
					<!-- 活力详情页 -->
					<view class="content" v-if="parent === 'topic-detail'">
						<text style="color: #2AAEC4;margin-right: 10rpx;" v-if="topic_type === 'pk'">#阅读pk#</text>
						<text style="color: #2AAEC4;margin-right: 10rpx;" v-else-if="topic_type === 'chat'">#轻松畅聊#</text>
						<text style="color: #2AAEC4;margin-right: 10rpx;" v-else>#活力打卡#</text>
						<text>{{ item.content }}</text>
					</view>
					<!-- 首页 -->
					<view class="content" v-else>
						<text style="color: #2AAEC4;margin-right: 10rpx;" v-if="item.type === 'pk'">#阅读pk#</text>
						<text style="color: #2AAEC4;margin-right: 10rpx;" v-else-if="item.type === 'chat'">#轻松畅聊#</text>
						<text style="color: #2AAEC4;margin-right: 10rpx;" v-else>#活力打卡#</text>
						<text>{{ item.content }}</text>
					</view>
					
					<view class="photo" v-if="item.imgInfo && item.imgInfo.length > 0">
						<image v-for="(list,listIndex) in item.imgInfo" :key="listIndex" :src="list.url" @tap.stop="preview(listIndex, item.imgInfo)" mode="aspectFit"></image>
					</view>
					<view class="comment">
						<text class="time">{{ item.create_time }}</text>
						<view class="detail">
							<view class="comment-item"  @tap.stop="handleClick('like', item, index)" >
									<image :src="$aliImage + 'read-like.png'" v-if="item.likeStatus === 0"></image>
									<image :src="$aliImage + 'read-like-active.png'" v-else></image>
									<text v-if="item.likeStatus === 0">点赞</text>
									<text v-else style="color: #2AAEC4;">已赞</text>
							</view>
							<view class="comment-item"  @tap.stop="handleClick('comment', item)" v-if="item.show_comment === '1'">
									<image :src="$aliImage + 'read-comment.png'"></image>
									<text>评论</text>
							</view>
							<view class="comment-item"  @tap.stop="handleClick('share', item)" >
									<button class="share" open-type="share" :data-topic_id="item.topic_id" :data-mark_id="item.id" data-type="comment" :data-content="item.content"></button>
									<image :src="$aliImage + 'read-share.png'"></image>
									<text>分享</text>
							</view>
						</view>
					</view>
					<!-- 未审核/违规打卡显示标志 -->
					<view class="show_status" v-if="item.show_status === '2' || item.show_status === '3'">
						<image v-if="item.show_status === '2'" :src="$aliImage + 'status-icon-01.png'" mode="widthFix"></image>
						<image v-else :src="$aliImage + 'status-icon-02.png'" mode="widthFix"></image>
					</view>
				</view>
				
			</scroll-view>
			<view style="line-height: 60px;" v-if="parent === 'topic-detail'">
				<uni-load-more :status="loadStatus" :content-text="loadText" />
			</view>
		</view>
		<view v-else class="none">暂无打卡记录</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		props: {
			// 区别从哪个页面引用该组件
			parent: {
				type: String,
				default: 'topic-detail'
			},
			// 控制是否显示标题(缓一缓按钮)
			title: {
				type: Boolean,
				default: true
			},
			// 控制是否开启下拉加载更多功能
			loadMore: {
				type: Boolean,
				default: false
			},
			show_comment: String, //控制是否显示评论选项
			// 打卡数据
			topicMark: {
				type: Array,
				default: []
			},
			topic_type: String, //话题类型
			// 加载更多文案提示
			loadStatus: {
				type: String,
				default: 'more'
			}
		},
		components: {
			uniLoadMore
		},
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				commentList: [
					{
						imgUrl: 'read-like.png',
						title: '点赞'
					},
					{
						imgUrl: 'read-comment.png',
						title: '评论'
					},
					{
						imgUrl: 'read-share.png',
						title: '分享'
					}
				],
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				pageSize: '10',
				currentPage: 1,
				totalPage: 0, //总条数
			}
		},
		watch: {
			show_comment(newVal) {
				this.show_comment = newVal
			},
			topicMark(newVal) {
				this.topicMark = newVal
				
			},
			topic_type(newVal) {
				this.topic_type = newVal
			},
			loadMore(newVal) {
				this.loadMore = newVal
			},
			loadStatus(newVal) {
				this.loadStatus = newVal
			}
		},
		methods: {
			// 点赞、评论、分享打卡
			handleClick(type, item, index) {
				item.index = index
				switch(type) {
					case 'like':
					this.$emit('like', item)
					break
					case 'comment':
					if(this.parent !== 'comment') {
						this.$emit('comment', item)
					}else {
						this.$emit('review')
					}
					
					break
					case 'share':
					// this.$emit('share', item)
					console.log('分享')
					break
					default:
					return
				}
			},
			// 点击缩略点
			handleComment(item) {
				this.$emit('handleComment', item)
			},
			// 刷新数据
			reload() {
				this.$emit('reload')
			},
			// 上拉加载更多
			loadingMore() {
				if(this.loadMore && this.parent === 'topic-detail') {
					this.$emit('loadingMore')
				}
			},
			// 预览图片
			preview(index, url) {
				console.log(index)
				this.$emit('preview')
				let urls = url.map(item => {
					return item.url
				})
				console.log(urls)
				uni.previewImage({
					urls: urls,
					current: String(index),
					success: () => {
							
					}
				})
			},
			
			
		}
		
	}
</script>
<style>
	::-webkit-scrollbar {
		display: none;  
		width: 0 !important;  
		height: 0 !important;  
		-webkit-appearance: none;  
		background: transparent;  
	}
</style>
<style scoped>
	.card-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-top: 24rpx;
	}
	.card {
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16); 
	}
	.title {
		height: 72rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(112,112,112,.2);
	}
	.title .left {
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}
	.title .left .line {
		width: 10rpx;
		height: 33rpx;
		margin-right: 10rpx;
	}
	.title .right {
		font-size: 24rpx;
		color: #2AAEC4;
		display: flex;
		align-items: center;
	}
	.title .right image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 20rpx;
	}
	.list {
		box-sizing: border-box;
	}
	.list .item {
		box-sizing: border-box;
		padding: 48rpx 0;
		border-bottom: 1px solid rgba(112,112,112,.2);
		position: relative;
	}
	
	
	
	.list .item:last-child {
		border-bottom: 0;
	}
	.item .user {
		display: flex;
		align-items: center;
	}
	.user .show {
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		margin-right: 10rpx;
	}
	.user .show image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.item .context {
		flex: 1;
	}
	.item .read-count {
		font-size: 22rpx;
		padding-left: 20rpx;
		color: #A0A0A0;
	}
	.item .context .preson-info {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.item .context .preson-info .left {
		font-size: 30rpx;
		font-weight: 700;
		display: flex;
		flex: 1;
		align-items: center;
	}
	.item .context .preson-info .right {
		
		flex-shrink: 0;
		box-sizing: border-box;
		padding: 0 14rpx;
	}
	.item .context .preson-info .left .vitality {
		width: 86rpx;
		height: 32rpx;
		background: #ebf8ff;
		border-radius: 16rpx;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10rpx;
		font-weight: normal;
	}
	.item .context .preson-info .left image {
		width: 16rpx;
		height: 27rpx;
	}
	.item .context .preson-info .right image {
		width: 30rpx;
		height: 30rpx;
	}
	.item .context .grade-info {
		color: #2AAEC4;
		font-size: 22rpx;
		margin-top: 4rpx;
	}
	.item .content {
		font-size: 24rpx;
		margin-top: 40rpx;
		/* margin-bottom: 20rpx; */
	}
	.item .photo {
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	.item .photo image {
		width: 200rpx;
		height: 200rpx;
		margin-top: 20rpx;
		margin-right: 20rpx;
		display: block;
	}
	.item .photo image:nth-child(3n) {
		margin-right: 0;
	}
	.item .comment {
		display: flex;
		justify-content: space-between;
		font-size: 22rpx;
		color: #808080;
		margin-top: 20rpx;
	}
	.item .comment .detail {
		display: flex;
		align-items: center;
	}
	.item .comment .detail .comment-item {
		display: flex;
		align-items: center;
		margin-right: 20rpx;
		position: relative;
	}
	.item .comment .detail .comment-item:last-child {
		margin-right: 0;
	}
	.item .comment .detail .comment-item image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 4rpx;
	}
	
	.item .show_status {
		position: absolute;
		width: 140rpx;
		right: 70rpx;
		top: 30rpx;
		
	}
	.item .show_status image {
		width: 100%;
		height: 100%;
		opacity: 0.7;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		color: #808080;
		text-align: center;
	}
	.share {
		position: absolute;
		left: 0;
		top: 0;
		font-size: 24rpx;
		background: transparent;
		color: #fff;
		height: 60rpx;
		width: 80rpx;
		border: 0;
	}
	.share:after {
		border: 0;
	}
</style>
