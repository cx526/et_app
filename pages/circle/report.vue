<template>
	<view>
		<view class="report">
			<view class="item">
				<text class="label">举报原因</text>
				<view style="display: flex;align-items: center;">
					<picker :range="reason" range-key="title" @change="changeReason">
						<text>{{ reason[reasonIndex].title }}</text>
					</picker>
					<image :src="$aliImage + 'read-icon-gray-right.png'"></image>
				</view>
				
			</view>
			<textarea  placeholder="请输入要举报的原因..." style="context" placeholder-style="color: #808080; font-size: 28rpx" @input="getContext" />
		</view>
		<view class="btn" >
			<text>立即举报</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				access_token: '',
				reasonIndex: 0,
				context: '',
				// 1 内容不雅 2 政治不正确 3 反党反社会 4 负能量 5 其他
				reason: [
					{
						title: '内容不雅',
						value: 1
					},
					{
						title: '政治不正确',
						value: 2
					},
					{
						title: '反党反社会',
						value: 3
					},
					{
						title: '负能量',
						value: 4
					},
					{
						title: '其他',
						value: 5
					}
				],
			}
		},
		methods: {
			// 改变举报原因
			changeReason(event) {
				let index = event.detail.value
				this.reasonIndex = index
			},
			// 获取举报原因
			getContext(event) {
				this.context = event.detail.value.replace(/\s*/g, '')
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
							uni.setStorageSync('access_token', arr)
						}
					})
				}else {
					// access_token还在有效期内
					let data = uni.getStorageSync('access_token')
					this.access_token = data[0]
				}
			},
			// 检测文本内容
			checkText(text) {
				uni.request({
					url: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token='+this.access_token,
					method: 'POST',
					data: {
						content: text
					},
					success: res => {
						if(res.data.errcode === 87014) {
							uni.showToast({
								title: '您输入的内容带有敏感词，请重新输入',
								icon: 'none',
								duration: 1500,
								success: () => {
									this.context = ''
								}
							})
						}
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
