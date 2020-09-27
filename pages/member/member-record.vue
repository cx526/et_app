<template>
	<view>
		<!-- 顶部 -->
		<view class="card-box">
			
			<view class="context">
				<image :src="useMemberCard[0].memberImgUrl" mode="widthFix"></image>
				<view class="main">
					<text class="use">使用中</text>
					<view class="time">
						<text>到期日期：{{ useMemberCard[0].formatUseTime }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 会员记录 -->
		<view class="title-box">
			<view style="position: relative;">
				<image :src="$aliImage + 'member-icon-07.png'" mode="widthFix"></image>
				<text class="text">会员记录</text>
			</view>
		</view>
		<!-- 记录列表 -->
		<view class="list-box">
			<view class="list">
				<scroll-view scroll-y style="max-height: 544rpx;" 
				@scrolltolower="loadMore">
					<block v-for="(item, index) in recordList" :key="index">
						<view class="item">
							<view class="left">
								<text class="title">{{item.memberName}}</text>
								<text class="time" v-if="item.status == '0'">
									预计生效日期：{{ item.formatUseTime }}
								</text>
								<text class="time" v-else-if="item.status == '1'">
									到期日期：{{ item.formatUseTime }}
								</text>
								<text class="time active" v-else>
									失效日期：{{ item.formatDueTime }}
								</text>
							</view>
							<view class="right">
								<text v-if="item.status == '0'">未生效</text>
								<text v-else-if="item.status == '1'">使用中</text>
								<text v-else-if="item.status == '2'">已过期</text>
							</view>
						</view>
					</block>
					
				</scroll-view>
				<uni-load-more :status="loadStatus" :content-text="loadText" />
			</view>
			
		</view>
		<!-- notice -->
		<view class="notice-box">
			<view class="notice">
				<view class="title">
					<text>温馨提示：</text>
				</view>
				<view>
					1、同时仅能有一张会员卡生效
				</view>
				<view>
					2、如购买多张不同类型会员卡，当前会员卡到期失效后，新购会员卡自动生效
					</view>
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
				loadStatus: 'loading',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				currentPage: 1,
				pageSize: 10,
				userInfo: uni.getStorageSync("userInfo"),
				totalPage: 0, //总条数
				recordList: [], //记录列表数据
				isLoadMore: true, //是否开启上拉加载更多
				useMemberCard: null ,// 正在使用的会员卡信息
			}
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			this.checkMemberRecord()
		},
		methods: {
			// 查看会员记录
			checkMemberRecord() {
				if(!this.userInfo || JSON.stringify(this.userInfo) == '{}' || !this.userInfo.mobile || this.userInfo.mobile.replace(/\s*/g, '') == '') {
					uni.showToast({
						title: '请先登录',
						icon: 'none',
						success: () => {
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					})
					return
				}
				let mobile = this.userInfo.mobile
				let params = {
					currentPage: String(this.currentPage),
					pageSize: String(this.pageSize),
					filterItems: {
						mobile: mobile
					}
				}
				this.$api.checkMemberRecord(params)
				.then(res => {
					let result = res.data
					this.totalPage = result.totalPage //总条数
					let filterList = result.rows
					// 剔除正在使用的会员卡
					// let filterList =  result.rows && result.rows.filter(item => {
					// 	return item.status != '1'
					// })
					// 保存正在使用会员卡的数据
					this.useMemberCard = result.rows && result.rows.filter(item => {
						return item.status == "1"
					})
					console.log(this.useMemberCard)
					this.recordList = [...this.recordList, ...filterList]
					console.log(this.recordList)
					// 判断是否执行上拉加载更多
					if(this.recordList.length >= this.totalPage) {
						console.log('entry')
						this.loadStatus = 'noMore'
						this.isLoadMore = false
					}
				})
			},
			// 加载更多记录
			loadMore() {
				console.log('loadMore')
				if(this.loadStatus != 'noMore' && this.isLoadMore) {
					this.currentPage = this.currentPage + 1
					this.checkMemberRecord()
				}else {
					console.log('没有更多数据了')
				}
			},
			
		}
	}
</script>
<style>
	page {
		background: #F9F9F9;
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
	/* 顶部 */
	.card-box {
		box-sizing: border-box;
		height: 310rpx;
		background: #2B2E4D;
		position: relative;
	}
	.card-box .context {
		position: absolute;
		width: 100%;
		left: 0;
		top: 46rpx;
		box-sizing: border-box;
		padding: 0 75rpx;
		z-index: 8;
	}
	.card-box .context image {
		width: 100%;
	}
	.card-box .context .main {
		position: absolute;
		bottom: 40rpx;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding-left: 112rpx;
		padding-right: 124rpx;
		font-size: 22rpx;
		display: flex;
		justify-content: space-between;
		color: #fff;
	}
	.card-box .context .main .use {
		height: 30rpx;
		width: 100rpx;
		background: rgba(255,255,255,.3);
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* 会员记录 */
	.title-box {
		box-sizing: border-box;
		padding: 80rpx 0 28rpx 0;
		text-align: center;
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		font-weight: 700;
		position: relative;
	}
	.title-box image {
		width: 420rpx;
		height: 14rpx;
		display: block;
	}
	.title-box .text {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	/* 记录列表 */
	.list-box {
		box-sizing: border-box;
		padding: 0 34rpx;
	}
	.list-box .list {
		background: #fff;
		border-radius: 30rpx;
		box-sizing: border-box;
		padding: 0 22rpx;
		box-shadow: 0px 4rpx 6rpx 0px rgba(0,0,0,0.16)
	}
	.list-box .item {
		box-sizing: border-box;
		padding: 0 20rpx;
		border-bottom: 1px dashed #B3B3B3;
		height: 136rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list-box .item:last-child {
		border-bottom: none;
	}
	.list-box .item .left {
		display: flex;
		box-sizing: border-box;
		flex: 1;
		flex-direction: column;
	}
	.list-box .item .left .title {
		font-size: 28rpx;
		font-weight: 700;
		margin-bottom: 4rpx;
	}
	.list-box .item .left .time {
		font-size: 22rpx;
		color: #2AAEC4;
	}
	.list-box .item .left .time.active {
		color: #808080;
	}
	.list-box .item .right {
		width: 140rpx;
		height: 46rpx;
		display: flex;
		font-size: 26rpx;
		color: #2AAEC4;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		color: #B3B3B3;
		background: #F9F9F9;
		border-radius: 24rpx;
	}
	/* .notice */
	.notice-box {
		box-sizing: border-box;
		padding: 50rpx 74rpx 0 74rpx;
		font-size: 22rpx;
		color: #808080;
	}
	.notice view {
		line-height: 40rpx;
	}
</style>
