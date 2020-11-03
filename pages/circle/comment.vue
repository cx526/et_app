<template>
	<view>
		<markUp :title="false" />
		<!-- 评论列表 -->
		<view class="comment">
			<scroll-view class="list" scroll-y style="max-height: 515rpx;">
				<view class="title">
					<view class="left">
						<image :src="$aliImage + 'read-line.png'" mode="widthFix"></image>
						<text>评论</text>
					</view>
					<view class="right">
						<text>共8条</text>
					</view>
				</view>
				<view class="item" v-for="n in 5" :key="n" @tap="handleComment">
					<view class="left">
						<image :src="userInfo.avatar" mode="widthFix"></image>
					</view>
					<view class="right">
						<view class="context">
							<text class="name">小A小朋友：</text>
							<text class="content">这本书非常值得借阅这本书非常值得借阅这本书非常值得借阅</text>
						</view>
						<view class="grade-info">
							<text>大良幸福幼儿园  大班3班</text>
							<text>2020-10-20  08:54</text>
						</view>
					</view>
				</view>
				<view style="line-height: 60px;">
					<uni-load-more :status="loadStatus" :content-text="loadText" />
				</view>
			</scroll-view>
		</view>
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
			markUp,
			uniLoadMore
		},
		onLoad() {
			// 获取access_token
			this.getAccessToken()
		},
		methods: {
			// 举报/删除打卡
			handleComment() {
				uni.showActionSheet({
					itemList:['举报','删除'],
					success: res => {
						console.log(res)
						// 举报
						if(res.tapIndex === 0) {
							uni.navigateTo({
								url: '/pages/circle/report'
							})
						}else if(res.tapIndex === 1) {
							console.log('删除')
						}else {
							return
						}
					}
				})
			},
			// 获取评论框输入的内容
			getComment(event) {
				this.context = event.detail.value
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
							console.log(arr)
							uni.setStorageSync('access_token', arr)
						}
					})
				}else {
					// access_token还在有效期内
					let data = uni.getStorageSync('access_token')
					this.access_token = data[0]
					console.log(this.access_token)
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
						console.log(res)
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
</style>
