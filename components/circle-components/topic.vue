<template>
	<view class="topic-box">
		<view class="topic">
			<view class="nav">
				<view v-for="(item, index) in navList" :key="index"
				:class="currentIndex == index ? 'active' : ''"
				@tap="changeType(index)">
					<text>{{ item.title }}</text>
					<view class="line" :class="currentIndex == index ? 'lineActive' : ''"></view>
				</view>
			</view>
			<view class="list" id="list">
				<!-- 812rpx -->
				<scroll-view scroll-y style="max-height: 812rpx;" @scrolltolower="loadMore">
					<swiper :style="{'height' : swiperHeight}" circle @change="swiperChange" :current="currentIndex">
						<swiper-item>
							<view class="item" v-for="(item, index) in allTopic" :key="index" @tap="handleClick" :class="index+1 === allTopic.length ? 'no-border' : ''">
								<view class="show">
									<image :src="$aliImage + 'read-demo.png'"></image>
								</view>
								<view class="context">
									<view class="title">
										<text>21天养成阅读习惯</text>
										<!-- 根据话题类型展示对应的图片 -->
										<image :src="$aliImage + 'read-topic-01.png'" mode=""></image>
									</view>
									<view class="detail">
										<text>通过五车书小程序完成21天阅读打卡任务通过五车书小程序完成21天阅读打卡任务</text>
									</view>
									<view class="time">
										<text>话题周期：2020.10.20-2020.11.25</text>
									</view>
								</view>
							</view>
							
						</swiper-item>
						<swiper-item>
							<view class="item" v-for="(item, index) in schoolTopic" :key="index"  @tap="handleClick" :class="index + 1 === 'schoolTopic.length' ? 'no-border' : ''">
								<view class="show">
									<image :src="$aliImage + 'read-demo.png'"></image>
								</view>
								<view class="context">
									<view class="title">
										<text>21天养成阅读习惯</text>
										<image :src="$aliImage + 'read-topic-01.png'" mode=""></image>
									</view>
									<view class="detail">
										<text>通过五车书小程序完成21天阅读打卡任务</text>
									</view>
									<view class="time">
										<text>话题周期：2020.10.20-2020.11.25</text>
									</view>
								</view>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="item" v-for="(item, index) in gradeTopic" :key="index"  @tap="handleClick" :class="index + 1 === 'gradeTopic.length' ? 'no-border' : ''">
								<view class="show">
									<image :src="$aliImage + 'read-demo.png'"></image>
								</view>
								<view class="context">
									<view class="title">
										<text>21天养成阅读习惯</text>
										<image :src="$aliImage + 'read-topic-01.png'" mode=""></image>
									</view>
									<view class="detail">
										<text>通过五车书小程序完成21天阅读打卡任务</text>
									</view>
									<view class="time">
										<text>话题周期：2020.10.20-2020.11.25</text>
									</view>
								</view>
							</view>
						</swiper-item>
						
					</swiper>
					<view style="line-height: 60px;">
						<uni-load-more :status="loadStatus" :content-text="loadText" />
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				//模拟话题数据
				allTopic: [],
				schoolTopic: [1,2,3],
				gradeTopic: [1,2],
				navList: [
					{title: '全部话题'},
					{title: '园内话题'},
					{title: '班内话题'}
				],
				swiperHeight: 0, //定义swiper1的高度
				currentIndex: 0, 
				itemHeight: 0,
				pageSize: '10',
				currentPage: 1,
				totalPage: 0, //总条数
				loadStatus: 'noMore',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				
			}
		},
		components: {
			uniLoadMore
		},
		mounted() {
			// 首次进来swiper高度默认取决与全部话题数据累加高度
			// this.getEleRect()
			setTimeout(() => {
				this.allTopic = [1,2,3,4]
				this.getEleRect()
			},2000)
		},
		methods: {
			// 获取元素节点
			getEleRect() {
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.selectAll('.item').boundingClientRect(data => {
						if(data && data.length > 0) {
							this.itemHeight = data[0].height
							this.swiperHeight = this.itemHeight * this.allTopic.length + 'px'
							console.log(this.swiperHeight)
						}else {
							this.swiperHeight = 60 + 'px'
						}
						
					}).exec();
				}, 200)
			},
			// 话题加载更多
			loadMore() {
				let test = [1,3,4]
				
			},
			// 监听swiper改变
			swiperChange(event) {
				this.currentIndex = event.detail.current
				// 刷新数据跟重置swiper高度
				switch(event.detail.current) {
					case 0:
					this.swiperHeight = this.itemHeight * this.allTopic.length + 'px'
					break
					case 1:
					this.swiperHeight = this.itemHeight * this.schoolTopic.length + 'px'
					break
					case 2:
					this.swiperHeight = this.itemHeight * this.gradeTopic.length + 'px'
					break
					default: 
					return
				}
			},
			// 改变话题分类
			changeType(index) {
				this.currentIndex = index
				// 刷新数据跟重置swiper高度
			},
			handleClick() {
				this.$emit('checkTopicDetail')
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
	.topic-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-top: 20rpx;
		
	}
	.topic {
		box-sizing: border-box;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16); 
	}
	.topic .nav {
		box-sizing: border-box;
		padding: 25rpx 60rpx 24rpx 60rpx;
		font-size: 28rpx;
		display: flex;
	}
	.topic .nav view {
		flex: 1;
		text-align: center;
		position: relative;
	}
	.topic .nav .line {
		width: 120rpx;
		height: 10rpx;
		background: #f9f9f9;
		border-radius: 5rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 8rpx;
	}
	.topic .nav .active {
		font-weight: bold;
		color: #2AAEC4;
	}
	.topic .nav .line.lineActive {
		background: #2AAEC4;
	}
	/* swiper */
	.topic .list {
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.topic .list .item {
		box-sizing: border-box;
		padding: 24rpx 0;
		border-bottom: 1px dashed #B3B3B3;
		display: flex;
		align-items: center;
	}
	.topic .list .item:last-child {
		border-bottom: 0;
	}
	.topic .list .item .show {
		width: 150rpx;
		height: 150rpx;
		flex-shrink: 0;
		margin-right: 20rpx;
	}
	.topic .list .item .show image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.topic .list .item .context {
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
	}
	.topic .list .item .title {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		font-weight: 700;
	}
	.topic .list .item .title image {
		width: 120rpx;
		height: 38rpx;
	}
	.topic .list .item .detail {
		margin-top: 10rpx;
		font-size: 22rpx;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.topic .list .item .time {
		margin-top: 22rpx;
		font-size: 20rpx;
		color: #808080;
	}
	.no-border {
		border-bottom: none !important;
	}
</style>
