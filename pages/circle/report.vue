<template>
	<view>
		<view class="report">
			<view class="item">
				<text class="label">举报原因</text>
				<view style="display: flex;align-items: center;">
					<picker :range="reason" range-key="title" @change="changeReason">
						<input :value=" reason[reasonIndex].title" placeholder="请选择举报类型" style="text-align: right;"></input>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'"></image>
				</view>
				
			</view>
			<textarea  placeholder="请输入要举报的原因..." style="context" placeholder-style="color: #808080; font-size: 28rpx" @input="getContext" />
		</view>
		<view class="btn" @tap="submit">
			<text>立即举报</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
				reasonIndex: '',
				context: '',
				// 1 内容不雅 2 政治不正确 3 反党反社会 4 负能量 5 其他
				reason: [
					{
						title: '内容不雅',
						value: '1'
					},
					{
						title: '政治不正确',
						value: '2'
					},
					{
						title: '反党反社会',
						value: '3'
					},
					{
						title: '负能量',
						value: '4'
					},
					{
						title: '其他',
						value: '5'
					}
				],
				mark_id: '', //被举报打卡id
				comment_id: '', //被举报评论id
				content_type: '', //举报类型
				type: '', //打卡举报/评论举报
				topic_id: '', //话题id
			}
		},
		onLoad(options) {
			console.log(options)
			this.type = options.type
			this.topic_id = options.topic_id
			if(this.type === 'mark') {
				this.mark_id = options.mark_id
			}else {
				this.comment_id = options.comment_id
			}
		},
		methods: {
			// 改变举报原因
			changeReason(event) {
				let index = event.detail.value
				this.reasonIndex = index
				this.content_type = this.reason[index].value
			},
			// 获取举报原因
			getContext(event) {
				this.context = event.detail.value.replace(/\s*/g, '')
			},
			// 提交举报
			submit() {
				/*****
				"custom_id": "61",
				"type": "topic", 
				"content": "举报内容",  
				"topic_id": "1",
				"mark_id": "2",
				"comment_id": "3",
				"content_type": "1" 举报类型(1 内容不雅 2 政治不正确 3 反党反社会 4 负能量 5 其他)
				******/ 
				if(this.content_type === '') {
					uni.showToast({
						title: '请选择要举报的类型',
						icon: 'none',
						duration: 1500
					})
					return
				}
				console.log(this.userInfo)
				let custom_id = this.userInfo.id
				let params = {
					type: this.type, 
					topic_id: this.topic_id,
					custom_id: String(custom_id),
					content: this.context,
					content_type: this.content_type,
					mark_id: this.mark_id,
					comment_id: this.comment_id
				}
				// if(this.type === 'remark') {
				// 	params.mark_id = this.mark_id
				// }else {
				// 	params.comment_id = this.comment_id
				// }
				console.log(params)
				this.$api.addReadingReport(params).then(res => {
					console.log(res)
					if(res.data.status === 'ok') {
						uni.showToast({
							title: '您的举报已经提交，请等待审核',
							icon: 'none',
							duration: 1500,
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
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
		box-sizing: border-box;
		padding: 25rpx;
		background: #EBF8FF;
	}
</style>
<style scoped>
	.report {
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16);
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.report .item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
	}
	.report .item .label {
		font-weight: 700;
	}
	.report .item image {
		width: 21rpx;
		height: 21rpx;
		margin-left: 4rpx;
	}
	.btn {
		box-sizing: border-box;
		height: 90rpx;
		width: 416rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		background-image: linear-gradient(to right, #67DCE5, #3CB5D2);
		border-radius: 60rpx;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 36rpx;
	}
	.context {
		width: 100%;
		height: 300rpx;
	}
</style>
