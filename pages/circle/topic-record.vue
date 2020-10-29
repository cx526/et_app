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
				<scroll-view scroll-y style="max-height: 874rpx;" @scrolltolower="loadMore">
					<swiper :style="{'height' : swiperHeight}" circle @change="swiperChange" :current="currentIndex">
						<swiper-item class="proceedTopic">
							<block v-if="proceedTopic && proceedTopic.length > 0">
								<view class="item" v-for="(item, index) in proceedTopic" :key="index" >
									<view class="show">
										<image :src="$aliImage + 'read-demo.png'"></image>
									</view>
									<view class="context">
										<view class="title">
											<text>21天养成阅读习惯</text>
											<!-- 根据话题类型展示对应的图片 -->
											<image :src="$aliImage + 'read-topic-03.png'" mode="widthFix"></image>
										</view>
										<view class="detail">
											<text>通过五车书小程序完成21天阅读打卡任务通过五车书小程序完成21天阅读打卡任务</text>
										</view>
										<!-- 只有活力打卡类型的话题才显示活力值 -->
										<view class="vigour">
											<image :src="$aliImage + 'read-target.png'" mode="widthFix"></image>
											<text>目标活力值：20</text>
											<view style="width: 120rpx; margin-left: 12rpx;">
												<cmd-progress :percent="30" :show-info="false" stroke-color="#B6EC56"></cmd-progress>
											</view>
										</view>
										<view class="time">
											<text>话题周期：2020.10.20-2020.11.25</text>
										</view>
									</view>
								</view>
							</block>
							<view v-else class="none">
								<text>暂无更多数据</text>
							</view>
						</swiper-item>
						<!-- 已结束才能查看获奖名单 -->
						<swiper-item class="terminateTopic">
							<block v-if="terminateTopic && terminateTopic.length > 0">
								<view class="item"  v-for="(item, index) in terminateTopic" :key="index">
									<view class="show">
										<image :src="$aliImage + 'read-demo.png'"></image>
										<!-- 结束封面 -->
										<image :src="$aliImage + 'read-over.png'" style="position: absolute;left: 0;top: 0;"></image>
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
											<view class="award" @tap="checkAwardList">
												<text>查看获奖名单</text>
												<image :src="$aliImage + 'read-icon-right.png'" mode=""></image>
											</view>
										</view>
									</view>
								</view>
							</block>
							
							<view class="none" v-else>
								<text>暂无更多数据</text>
							</view>
						</swiper-item>
						
					</swiper>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import cmdProgress from "@/components/cmd-progress/cmd-progress.vue"
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				//模拟话题数据
				proceedTopic: [1,2,3,4,5],
				terminateTopic: [1,2,3],
				navList: [
					{title: '进行中'},
					{title: '已结束'}
				],
				swiperHeight: 0, //定义swiper1的高度
				currentIndex: 0, 
				itemHeight: 0
			}
		},
		components: {
			cmdProgress
		},
		created() {
		
		},
		mounted() {
			// 首次进来swiper高度默认取决与全部话题数据累加高度
			this.getEleRect('.proceedTopic .item')
		},
		methods: {
			// 获取元素节点
			getEleRect(ele) {
				const query = uni.createSelectorQuery().in(this);
				setTimeout(() => {
					query.selectAll(ele).boundingClientRect(data => {
						console.log(data)
						let eleHeight = 0
						if(data && data.length > 0) {
							data.map(item => {
								eleHeight = item.height + eleHeight
							})
							this.swiperHeight = eleHeight + 'px'
							console.log(this.swiperHeight)
						}else {
							this.swiperHeight = 80 + 'rpx'
						}
					}).exec();
				}, 200)
			},
			// 话题加载更多
			loadMore() {
				let test = [1,3,4]
				console.log('loadMore')
				setTimeout(() => {
					switch(this.currentIndex) {
						case 0:
						this.proceedTopic = [...this.proceedTopic, ...test]
						this.getEleRect('.proceedTopic .item')
						break
						case 1:
						this.terminateTopic = [...this.terminateTopic, ...test]
						this.getEleRect('.terminateTopic .item')
						break
						default: 
						return
					}
				}, 1000)
			},
			// 监听swiper改变
			swiperChange(event) {
				this.currentIndex = event.detail.current
				// 获取数据跟充值swiper高度
				switch(event.detail.current) {
					case 0:
					this.getEleRect('.proceedTopic .item')
					break
					case 1:
					this.getEleRect('.terminateTopic .item')
					break
					default: 
					return
				}
			},
			// 改变话题分类
			changeType(index) {
				this.currentIndex = index
				// 获取数据跟充值swiper高度
			},
			// 查看获奖名单
			checkAwardList() {
				uni.navigateTo({
					url: '/pages/circle/award-list'
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
	page {
		background: #EBF8FF;
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
		position: relative;
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
	.topic .list .item .vigour {
		box-sizing: border-box;
		display: flex;
		font-size: 22rpx;
		color: #2AAEC4;
		align-items: center;
		margin-top: 22rpx;
	}
	.topic .list .item .vigour image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}
	.topic .list .item .time {
		margin-top: 22rpx;
		font-size: 20rpx;
		color: #808080;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.topic .list .item .time .award {
		display: flex;
		align-items: center;
		font-size: 20rpx;
		color: #2AAEC4;
	}
	.topic .list .item .time .award image {
		width: 20rpx;
		height: 20rpx;
		
	}
	#list .none {
		box-sizing: border-box;
		line-height: 80rpx;
		font-size: 30rpx;
		text-align: center;
	}
</style>
