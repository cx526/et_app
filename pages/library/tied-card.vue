<template>
	<view>
		<view class="form">
			<view class="item">
				<text class="label">学校</text>
				<input type="text" placeholder="请填写所属幼儿园名称" 
				placeholder-style="font-size: 30rpx; color: #999" />
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" mode=""></image>
			</view>
			<view class="item">
				<text class="label">班级</text>
				<input type="text" placeholder="请填写幼儿所属班级" 
				placeholder-style="font-size: 30rpx; color: #999" />
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" mode=""></image>
			</view>
			<view class="item">
				<text class="label">借书卡号</text>
				<!-- <view style="flex: 1;display: flex;align-items: center;justify-content: right;"> -->
					<!-- <text style="color: #00B4C9;font-weight: bold;">+ET</text> -->
					<input type="number" placeholder="请填写借书卡号"
					placeholder-style="font-size: 30rpx; color: #999"
					:value="prefix"
					@input="cardNumber"/>
				<!-- </view> -->
				
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" mode=""></image>
			</view>
			<view class="item">
				<text class="label">幼儿姓名</text>
				<input type="text" placeholder="请填写幼儿姓名" 
				placeholder-style="font-size: 30rpx; color: #999" />
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" mode=""></image>
			</view>
			<view class="item">
				<text class="label">幼儿生日</text>
				<picker mode="date" @change="bindDateChange" style="flex: 1;text-align: right;">
						<view 
						style="font-size: 30rpx; color: #999"
						>{{ birthDay }}</view>
				</picker>
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" mode=""></image>
			</view>
			<view class="item">
				<text class="label">家长姓名</text>
				<input type="text" placeholder="请填写家长姓名" 
				placeholder-style="font-size: 30rpx; color: #999" />
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/offline-icon-right.png" mode=""></image>
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
				birthDay: '请选择幼儿生日',
				prefix: ''
			}
		},
		methods: {
			bindDateChange(event) {;
				this.birthDay = event.target.value
			},
			cardNumber(event) {
				let value = event.detail.value;
				if(this.prefix == '') {
					this.prefix = 'ET' + value;
				}else {
					this.prefix = value
				}
				
				console.log(this.prefix)
			}
		}
	}
</script>

<style>
	page {
		background: #F9F9F9;
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
		border-bottom: 1rpx solid #EEEEEF;
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
		/* margin-right: 24rpx; */
		margin-left: 12rpx;
	}
	.form .item input {
		flex: 1;
		text-align: right;
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
		background-image: linear-gradient(180deg, #40aed1, #69d9e4);
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
	}
</style>
