<template>
	<view>
		<view v-if="from === 'index'">
			<view class="user">
				<view class="left">
					<view class="avatar">
						<image :src="userInfo.avatar" mode="widthFix" class="user-avatar"></image>
					</view>
					<view class="info">
						<view class="name" v-if="userRankingList.childName">{{ userRankingList.childName }}</view>
						<view v-else>
							<text v-if="custom_type === '0'">老师</text>
							<text v-else-if="custom_type === '1'">小朋友</text>
							<text v-else>园长</text>
						</view>
						<view class="vigour">
							<image :src="$aliImage+ 'read-vitality.png'" mode=""></image>
							<text>活力值：{{ userRankingList.vitality ? userRankingList.vitality : 0 }}</text>
						</view>
					</view>
				</view>
				<view class="right">
					<image :src="$aliImage + 'read-medal-bg.png'" mode="widthFix"></image>
					<text class="number" v-if="JSON.stringify(userRankingList) !== '{}'">{{ userRankingList.sort }}</text>
					<text class="number" v-else>{{ rankingList.length }}</text>
				</view>
			</view>
			<view class="list">
				<!-- style="max-height: 1032rpx;" -->
				<scroll-view scroll-y >
					<view class="item" v-for="(item, index) in rankingList" :key="index">
						<view class="left">
							<view class="rank">
								<text>{{ index+1 > 9 ? index+1 : '0' + (index+1) }}</text>
							</view>
							<image :src="item.avatar"></image>
							<text class="name" v-if="item.childName">{{ item.childName }}</text>
							<text v-else class="name">小朋友</text>
						</view>
						<view class="right">
							<image :src="$aliImage + 'read-medal-No'+(index+1)+'.png'" mode="widthFix" class="medal"
							v-if="(index+1) <= 3"></image>
							<view class="vigour">
								<image :src="$aliImage + 'read-vitality.png'" mode="widthFix"></image>
								<text>活力值：{{ parseInt(item.vitality) }}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 从话题详情活力之星进入 -->
		<view v-else>
			<view class="user">
				<view class="left">
					<view class="avatar">
						<image :src="userRankingList.customInfo.avatar" mode="widthFix" class="user-avatar"></image>
					</view>
					<view class="info">
						<view class="name" v-if="userRankingList.customInfo.childName">{{ userRankingList.customInfo.childName }}</view>
						<view v-else>
							<text v-if="custom_type === '0'">老师</text>
							<text v-else-if="custom_type === '1'">小朋友</text>
							<text v-else>园长</text>
						</view>
						<view class="vigour">
							<image :src="$aliImage+ 'read-vitality.png'" mode=""></image>
							<text>活力值：{{ userRankingList.totalVitality ? userRankingList.totalVitality : 0 }}</text>
						</view>
					</view>
				</view>
				<view class="right">
					<image :src="$aliImage + 'read-medal-bg.png'" mode="widthFix"></image>
					<text class="number" v-if="userRankingList.sort === 0">{{ rankingList.length + 1 }}</text>
					<text class="number" v-else>{{ userRankingList.sort }}</text>
				</view>
			</view>
			<view class="list">
				<!-- style="max-height: 1032rpx;" -->
				<scroll-view scroll-y >
					<view class="item" v-for="(item, index) in rankingList" :key="index">
						<view class="left">
							<view class="rank">
								<text>{{ index+1 > 9 ? index+1 : '0' + (index+1) }}</text>
							</view>
							<image :src="item.customInfo.avatar"></image>
							<text class="name" v-if="item.customInfo.childName">{{ item.customInfo.childName }}</text>
							<text v-else class="name">小朋友</text>
						</view>
						<view class="right">
							<image :src="$aliImage + 'read-medal-No'+(index+1)+'.png'" mode="widthFix" class="medal"
							v-if="(index+1) <= 3"></image>
							<view class="vigour">
								<image :src="$aliImage + 'read-vitality.png'" mode="widthFix"></image>
								<text>活力值：{{ parseInt(item.totalVitality) }}</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				school_id: '',
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				rankingList: [], //渲染到页面的数据(前端做分页)
				rows: [], //总数据
				userRankingList:null,
				formatCreateTime: '', //统计时间
				custom_type: '',
				from: '', //区分从哪里进入该页面
				totalPage: 0, //总条数
				currentPage: 1,
				pageSize: 10,
				topic_id: '', //话题id
			}
		},
		onLoad(options) {
			
			this.from = options.from
			this.custom_type = options.custom_type
			console.log(options)
			// 从首页进来
			if(this.from === 'index') {
				this.school_id = options.school_id
				this.selReadingVitalityMine()
			}else {
				this.topic_id = options.topic_id
				this.selReadingTopicTopCustom()
			}
			
		},
		onReachBottom() {
			// 前端做数据分页展示
			if(this.from === 'index') {
				if(this.totalPage > this.rankingList.length) {
					this.currentPage = this.currentPage + 1
					let rows = this.rows
					let arr = []
					arr = rows.slice(this.rankingList.length, this.currentPage * this.pageSize)
					this.rankingList = [...this.rankingList, ...arr]
				}
			}else {
				if(this.rankingList.length < this.totalPage) {
					this.currentPage = this.currentPage + 1
					this.selReadingTopicTopCustom()
				}
			}
			
		},
		methods: {
			// 查看本校活力排行榜
			selReadingVitalityMine() {
				let custom_id = this.userInfo.id
				let params = {
					filterItems: {
						school_id: this.school_id,
						my_custom_id: String(custom_id)
					}
				}
				this.$api.selSchoolReadingVitalityCount(params).then(res => {
					this.totalPage = res.data.rows.length
					// 个人
					let result = res.data.mySort
					result.vitality = parseInt(result.vitality)
					this.userRankingList = result
					// 全部
					let rows = res.data.rows
					this.rows = res.data.rows
					// 返回的总数据大于10条前端做分页展示
					if(rows && rows.length > 10) {
						let arr = []
						if(this.rankingList.length == 0) {
							arr = rows.slice(0, this.currentPage * this.pageSize)
							this.rankingList = arr
						}else {
							arr = rows.slice(this.rankingList.length, this.currentPage * this.pageSize)
							this.rankingList = [...this.rankingList, ...arr]
						}
						
					}else {
						this.rankingList = rows
					}
				})
			},
			// 查看某话题下的活力排行榜
			selReadingTopicTopCustom() {
				let params = {
					currentPage: String(this.currentPage),
					pageSize: String(this.pageSize),
					filterItems: {
						topic_id: this.topic_id,
						my_custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selReadingTopicTopCustom(params).then(res => {
					let result = res.data.rows
					console.log(result)
					this.totalPage = res.data.totalPage //总条数
					console.log(this.totalPage)
					this.userRankingList = res.data.mySort
					this.rankingList = [...this.rankingList, ...result]
						// 全部信息处理
						// result.map(item => {
						// 	rows.push(item)
						// })
						// this.rows = rows
						// // 返回的总数据大于10条前端做分页展示
						// if(rows && rows.length > 10) {
						// 	let arr = []
						// 	if(this.rankingList.length == 0) {
						// 		arr = rows.slice(0, this.currentPage * this.pageSize)
						// 		this.rankingList = arr
						// 	}else {
						// 		arr = rows.slice(this.rankingList.length, this.currentPage * this.pageSize)
						// 		this.rankingList = [...this.rankingList, ...arr]
						// 	}
							
						// }else {
						// 	this.rankingList = rows
						// }
					// }
				})
			},
			// 排序
			compare(property) {
				return (a, b) => {
					let value1 = a[property];
					let value2 = b[property];
					return value2 - value1;
				};
			},

		}
	}
</script>
<style>
	page {
		background: #EBF8FF;
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
	.user {
		box-sizing: border-box;
		height: 320rpx;
		background-image: linear-gradient(to bottom, #7BCFEC, #9BE6E7);
		border-radius: 0px 0px 30rpx 30rpx;
		padding: 0 56rpx;
		display: flex;
	}
	.user .left {
		flex: 1;
		box-sizing: border-box;
		display: flex;
		padding-top: 70rpx;
		/* align-items: center; */
	}
	.user .right {
		width: 185rpx;
		height: 227rpx;
		box-sizing: border-box;
		flex-shrink: 0;
		position: relative;
	}
	.user .left .avatar {
		width: 105rpx;
		height: 105rpx;
		position: relative;
		background: #fff;
		border-radius: 50%;
		margin-right: 28rpx;
		box-sizing: border-box;
	}
	.user .left .avatar .user-avatar {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 8;
		border-radius: 50%;
	}
	.user .left .info {
		box-sizing: border-box;
	}
	.user .left .name {
		font-size: 30rpx;
		color: #fff;
	}
	.user .left .vigour {
		height: 36rpx;
		width: 180rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 18rpx;
		font-size: 24rpx;
		margin-top: 9rpx;
	}
	.user .left .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.user .left .time {
		color: #fff;
		font-size: 24rpx;
		margin-top: 4rpx
	}
	.user .right image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.user .right .number {
		font-size: 60rpx;
		color: #2AAEC4;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-24%);

		position: absolute;
	}
	
	.list {
		box-sizing: border-box;
		padding: 0 25rpx;
		position: relative;
		top: -73rpx;
	}
	.list scroll-view {
		box-sizing: border-box;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 6rpx 0px rgba(0,0,0,0.16); 
		padding: 0 30rpx;
	}
	.list .item {
		box-sizing: border-box;
		
		border-bottom: 1px dashed  #b3b3b3;
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .left {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.list .item .left .rank {
		width: 46rpx;
		height: 83rpx;
		background: linear-gradient(180deg,#7bcfec, #9be6e7);
		border-radius: 10rpx 0px 0px 10rpx;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list .item .left image {
		width: 100rpx;
		height: 100rpx;
		margin: 0 20rpx;
		border-radius: 50%;
	}
	.list .item .left .name {
		font-size: 28rpx;
		font-weight: 700;
	}
	.list .item .right {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.list .item .right .medal {
		width: 40rpx;
		height: 50rpx;
		margin-right: 18rpx;
	}
	.list .item .right .vigour {
		width: 180rpx;
		height: 36rpx;
		background: #ffffff;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
	.list .item .right .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
</style>
