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
				<!-- 812rpx style="max-height: 812rpx" -->
				<scroll-view scroll-y  @scrolltolower="loadMore">
					<swiper :style="{'height' : swiperHeight}" circle @change="swiperChange" :current="currentIndex">
						<!-- 全站话题 -->
						<swiper-item>
							<view class="item" v-for="(item, index) in allTopic" :key="index"  @tap="handleClick(item.id)">
								<view class="show">
									<image :src="item.imgInfo[0].url" v-if="item.imgInfo && item.imgInfo.length > 0"></image>
									<image :src="$aliImage + 'read-demo.png'" v-else></image>
								</view>
								<view class="context">
									<view class="title">
										<text>{{ item.title }}</text>
										<image :src="$aliImage + 'read-topic-01.png'"  v-if="item.type === 'pk'"></image>
										<image :src="$aliImage + 'read-topic-02.png'"  v-else-if="item.type === 'chat'"></image>
										<image :src="$aliImage + 'read-topic-03.png'" v-else></image>
									</view>
									<view class="detail">
										<text>{{ item.description }}</text>
									</view>
									<view class="time">
										<text style="margin-right: 6rpx;">话题周期：{{ item.start_time }}~{{ item.end_time }}</text>
										<text v-if="item.show_status === '2'">审核中</text>
										<text v-if="item.show_status === '3'">违规</text>
									</view>
								</view>
								<!-- 显示审核/违规标志 -->
								<!-- <view class="status" v-if="item.show_status === '2' || item.show_status === '3'">
									<image :src="$aliImage + 'status-icon-01.png'" mode="widthFix" v-if="item.show_status === '2'"></image>
									<image :src="$aliImage + 'status-icon-02.png'" mode="widthFix" v-else></image>
								</view> -->
							</view>
							
						</swiper-item>
						<!-- 园内话题 -->
						<swiper-item>
							<view class="item" v-for="(item, index) in schoolTopic" :key="index"  @tap="handleClick(item.id)">
								<view class="show">
									<image :src="item.imgInfo[0].url" v-if="item.imgInfo && item.imgInfo.length > 0"></image>
									<image :src="$aliImage + 'read-demo.png'" v-else></image>
								</view>
								<view class="context">
									<view class="title">
										<text>{{ item.title }}</text>
										<image :src="$aliImage + 'read-topic-01.png'"  v-if="item.type === 'pk'"></image>
										<image :src="$aliImage + 'read-topic-02.png'"  v-else-if="item.type === 'chat'"></image>
										<image :src="$aliImage + 'read-topic-03.png'" v-else></image>
									</view>
									<view class="detail">
										<text>{{ item.description }}</text>
									</view>
									<view class="time">
										<text>话题周期：{{ item.start_time }}~{{ item.end_time }}</text>
									</view>
								</view>
							</view>
						</swiper-item>
						<!-- 年级话题 -->
						<swiper-item>
							<view class="item" v-for="(item, index) in gradeTopic" :key="index"  @tap="handleClick(item.id)">
								<view class="show">
									<image :src="item.imgInfo[0].url" v-if="item.imgInfo && item.imgInfo.length > 0"></image>
									<image :src="$aliImage + 'read-demo.png'" v-else></image>
								</view>
								<view class="context">
									<view class="title">
										<text>{{ item.title }}</text>
										<image :src="$aliImage + 'read-topic-01.png'"  v-if="item.type === 'pk'"></image>
										<image :src="$aliImage + 'read-topic-02.png'"  v-else-if="item.type === 'chat'"></image>
										<image :src="$aliImage + 'read-topic-03.png'" v-else></image>
									</view>
									<view class="detail">
										<text>{{ item.description }}</text>
									</view>
									<view class="time">
										<text>话题周期：{{ item.start_time }}~{{ item.end_time }}</text>
									</view>
								</view>
							</view>
						</swiper-item>
						<!-- 班内话题 -->
						<swiper-item>
							<view class="item" v-for="(item, index) in classTopic" :key="index"  @tap="handleClick(item.id)">
								<view class="show">
									<image :src="item.imgInfo[0].url" v-if="item.imgInfo && item.imgInfo.length > 0"></image>
									<image :src="$aliImage + 'read-demo.png'" v-else></image>
								</view>
								<view class="context">
									<view class="title">
										<text>{{ item.title }}</text>
										<image :src="$aliImage + 'read-topic-01.png'"  v-if="item.type === 'pk'"></image>
										<image :src="$aliImage + 'read-topic-02.png'"  v-else-if="item.type === 'chat'"></image>
										<image :src="$aliImage + 'read-topic-03.png'" v-else></image>
									</view>
									<view class="detail">
										<text>{{ item.description }}</text>
									</view>
									<view class="time">
										<text>话题周期：{{ item.start_time }}~{{ item.end_time }}</text>
									</view>
								</view>
							</view>
						</swiper-item>
						
					</swiper>
					<view>
						<view class="add" @tap="addTopic" v-if="custom_type !== '1'">
							<image :src="$aliImage + 'read-add-icon.png'" mode="widthFix"></image>
							<text>新建话题</text>
						</view>
						<!-- <uni-load-more :status="loadStatus" :content-text="loadText" /> -->
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	export default {
		props: {
			schoolId: String,
			gradeId: String,
			classId: String,
			custom_type: String
		},
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
				//模拟话题数据
				allTopic: [], //全站话题
				schoolTopic: [], // 园内话题
				gradeTopic: [], // 年级话题
				classTopic: [], // 班内话题
				navList: [
					{title: '热门'},
					{title: '校园圈'},
					{title: '年级圈'},
					{title: '班级圈'}
				],
				swiperHeight: '0px', //定义swiper1的高度
				currentIndex: 0, 
				itemHeight: 0,
				pageSize: '4',
				currentPage: 1,
				totalPage: 0, //总条数
				loadStatus: 'noMore',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				school_id: '', //学校id
				isLoadMore: false, //判断是否开启上拉加载更多
				private: 0, //违规/待审核话题数
			}
		},
		
		components: {
			uniLoadMore
		},
		watch:{
			schoolId(newVal) {
				this.school_id = newVal
				// 获取话题列表(默认获取全站话题)
				// this.selReadingTopic('all')
				this.selAllReadingTopic()
			},
			gradeId(newVal) {
				this.grade_id = newVal
			},
			classId(newVal) {
				this.class_id = newVal
			},
			custom_type(newVal) {
				console.log(newVal)
				this.custom_type = newVal
			}
		},

		methods: {
			update() {
				this.selAllReadingTopic()
			},
			// 获取元素节点
			getEleRect(topicArr) {
				if(this.itemHeight == '') {
					const query = uni.createSelectorQuery().in(this);
					setTimeout(() => {
						query.selectAll('.item').boundingClientRect(data => {
							if(data && data.length > 0) {
								this.itemHeight = data[0].height
								this.swiperHeight = this.itemHeight * topicArr.length + 'px'
								
							}else {
								this.swiperHeight = 0 + 'px'
							}
							
						}).exec();
					}, 200)
				}else {
					this.swiperHeight = this.itemHeight * topicArr.length + 'px'
				}
			},
			// 获取违规/未审核话题(自己)
			selAllReadingTopic() {
				let custom_id = String(this.userInfo.id)
				let userParams = {
					filterItems: {
						custom_id: custom_id,
						"selUnNormal": "1"
					}
				}
				console.log(userParams)
				this.$api.selReadingTopic(userParams).then(res => {
					this.private = res.data.totalPage
					let result = res.data.rows
					if(result && result.length > 0) {
						result.map(item => {
							item.start_time = this.formatTime(item.start_time)
							item.end_time = this.formatTime(item.end_time)
						})
					}
					this.allTopic = result
					// 获取话题列表(默认获取全站话题)
					this.selReadingTopic('all')
				})
			},
			// 获取话题列表
			selReadingTopic(show_range) {
				let school_id = ''
				if(show_range === 'all') {
					school_id = ''
				}else {
					school_id = this.school_id
				}
				let params = {
					// currentPage: String(this.currentPage),
					// pageSize: this.pageSize,
					filterItems: {
						show_range: show_range,
						school_id: school_id,
						show_status: '1',
						status: '1'
					}
				}
				// 全站话题
				if(show_range === 'all') {
					let userInfo = uni.getStorageSync('userInfo')
					let custom_id = String(userInfo.id)
					params.filterItems.my_custom_id = custom_id
					params.filterItems.show_range = ''
				}
				// 年级话题
				if(show_range === 'grade') {
					// 园长身份没有年级班级id传空
					params.filterItems.grade_id = this.grade_id ? this.grade_id : '',
					params.filterItems.class = ''
				}
				// 班内话题
				if(show_range === 'class') {
					params.filterItems.grade_id = this.grade_id ? this.grade_id : '',
					params.filterItems.class = this.class_id ? this.class_id : ''
				}
				this.$api.selReadingTopic(params).then(res => {
					let result = res.data.rows
					this.totalPage = res.data.totalPage
					// 格式化开始结束时间
					if(result && result.length > 0) {
						result.map(item => {
							item.start_time = this.formatTime(item.start_time)
							item.end_time = this.formatTime(item.end_time)
						})
					}
					switch(show_range) {
						case 'all':
						this.allTopic = [...this.allTopic, ...result]
						this.getEleRect(this.allTopic)
						
						// 判断是否开启上拉加载更多
						this.openLoadMore(this.allTopic.length - this.private)
						console.log(this.swiperHeight)
						break
						case 'school': 
						this.schoolTopic = [...this.schoolTopic, ...result]
						this.getEleRect(this.schoolTopic)
						// 判断是否开启上拉加载更多
						this.openLoadMore(this.schoolTopic.length)
						console.log(this.swiperHeight)
						break
						case 'grade':
						this.gradeTopic = [...this.gradeTopic, ...result]
						this.getEleRect(this.gradeTopic)
						// 判断是否开启上拉加载更多
						this.openLoadMore(this.gradeTopic.length)
						console.log(this.swiperHeight)
						break
						case 'class':
						this.classTopic = [...this.classTopic, ...result]
						this.getEleRect(this.classTopic)
						// 判断是否开启上拉加载更多
						this.openLoadMore(this.classTopic.length)
						console.log(this.swiperHeight)
						break
						default:
						this.allTopic = [...this.allTopic, ...result]
						break
					}
				})
			},
			// 格式化时间
			formatTime(time) {
				let date = new Date(time)
				let year = date.getFullYear()
				let month = this.complete(date.getMonth() + 1)
				let day = this.complete(date.getDate())
				return year +'-'+ month + '-' + day
			},
			// 补零操作
			complete(number) {
				let num =	number > 9 ? number : '0' + number
				return num
			},
			// 判断是否开启上拉加载更多
			openLoadMore(topicArr) {
				if(this.totalPage <= topicArr) {
					this.isLoadMore = false
					this.loadStatus = 'noMore'
				}else {
					this.isLoadMore = true
					this.loadStatus = 'more'
				}
			},
			// 话题加载更多
			loadMore() {
				if(this.isLoadMore) {
					this.currentPage = this.currentPage + 1
					this.loadStatus = 'loading'
					switch(this.currentIndex) {
						case 0:
						this.selReadingTopic('all')
						break
						case 1:
						this.selReadingTopic('school')
						break
						case 2:
						this.selReadingTopic('grade')
						break
						case 3:
						this.selReadingTopic('class')
						default:
						return
					}
				}
				
			},
			// 监听swiper改变
			swiperChange(event) {
				this.currentIndex = event.detail.current
				this.$emit('swiperChange', this.currentIndex)
				// 刷新数据跟重置swiper高度
				switch(event.detail.current) {
					case 0:
					this.allTopic = []
					this.currentPage = 1
				
					this.selAllReadingTopic()
					break
					case 1:
					this.currentPage = 1
					this.schoolTopic = []
					this.selReadingTopic('school')
					break
					case 2:
					this.currentPage = 1
					this.gradeTopic = []
					this.selReadingTopic('grade')
					break
					case 3:
					this.currentPage = 1
					this.classTopic = []
					this.selReadingTopic('class')
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
			// 跳转新建话题页面
			addTopic() {
				uni.navigateTo({
					url: '/pagesCircle/circle/add-topic'
				})
			},
			// 跳转详情
			handleClick(id) {
				this.$emit('checkTopicDetail', id)
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
		position: relative;
	}
/* 	.topic .list .item .status {
		position: absolute;
		right: 32rpx;
		top: 20rpx;
	}
	.topic .list .item .status image {
		width: 120rpx;
	} */
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
		flex-shrink: 0;
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
	.add {
		display: flex;
		align-items: center;
		color: #2AAEC4;
		justify-content: center;
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 16rpx 0;
	}
	.add image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}
</style>
