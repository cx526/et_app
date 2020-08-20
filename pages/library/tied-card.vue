<template>
	<view>
		<view class="form">
			<view class="item">
				<text class="label">学校</text>
				<input type="text" disabled 
				value="林头幼儿园" />
			</view>
			<view class="item">
				<text class="label">班级</text>
				<input type="text"
				placeholder="请填写幼儿所在班级"
				placeholder-style="font-size: 30rpx; color: #999"
				 />
			</view>
			<view class="item">
				<text class="label">借书卡号</text>
					<input type="text" placeholder="请扫码绑定童书卡"
					placeholder-style="font-size: 30rpx; color: #999"
					:value="prefix"
					@input="cardNumber"/>
				<image 
				:src="$aliImage + 'teacher-icon-02.png'" 
				mode="widthFix"
				style="width: 40rpx;height: 40rpx;margin-left: 20rpx;"
				@tap="scan">
				</image>
			</view>
			
			<view class="item">
				<text class="label">幼儿姓名</text>
				<input type="text" placeholder="请填写幼儿姓名" 
				placeholder-style="font-size: 30rpx; color: #999" />
			</view>
			<view class="item">
				<text class="label">幼儿生日</text>
				<picker mode="date" @change="bindDateChange" style="flex: 1;text-align: right;">
						<view 
						style="font-size: 30rpx; color: #999"
						>{{ birthDay }}</view>
				</picker>
			</view>
			<view class="item">
				<text class="label">家长姓名</text>
				<input type="text" placeholder="请填写家长姓名" 
				placeholder-style="font-size: 30rpx; color: #999" />
			</view>
			<view class="item">
				<text class="label">用户名</text>
				<input type="text" disabled
				value="已授权"
				
				 />
			</view>
			<view class="item">
				<text class="label">联系方式</text>
				<input type="text" disabled
				value="已授权"
				
				 />
			</view>
		</view>
		<view class="btn">
			<view>
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,//静态图片域名
				birthDay: '请选择幼儿生日',
				prefix: ''
			}
		},
		methods: {
			// 生日选择
			bindDateChange(event) {;
				this.birthDay = event.target.value
			},
			// 监听input框的变化
			cardNumber(event) {
				let value = event.detail.value;
				this.prefix = value
			},
			// 调起微信扫一扫
			scan() {
				uni.scanCode({
					success: res => {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style>
	page {
		background: #ebf8ff;
		box-sizing: border-box;
		padding: 24rpx;
	}
	.form {
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		box-sizing: border-box;
		padding: 0 24rpx;
		border-radius: 24rpx;
	}
	.form .item {
		line-height: 120rpx;
		box-sizing: border-box;
		border-bottom: 1rpx dashed #b3b3b3;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
	}
	.form .item:last-child {
		border-bottom: 0;
	}
	.form .item .label {
		box-sizing: border-box;
		width: 136rpx;
		margin-left: 12rpx;
	}
	.form .item input {
		flex: 1;
		text-align: right;
		color: #999;
	}
	.form .item image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	
	.btn {
		box-sizing: border-box;
		padding: 0 20%;
		margin-top: 60rpx;
	}
	.btn view {
		background-image: linear-gradient(to right, #9BE6E7, #7BCFEC);
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
	}
</style>
