<template>
	<view>
		<view class="form">
			<view class="item">
				<text class="label">学校</text>
				<input type="text" disabled 
				value="林头幼儿园" />
			</view>
			<view class="item">
				<text class="label">年级</text>
				<input type="text" disabled
				value="中班"
				
				 />
			</view>
			<view class="item">
				<text class="label">班级</text>
				<input type="text"
				placeholder="请填写班级"
				placeholder-style="font-size: 30rpx; color: #999"
				 />
			</view>
			
			<view class="item">
				<text class="label">老师姓名</text>
				<input type="text" placeholder="请填写老师姓名" 
				placeholder-style="font-size: 30rpx; color: #999" />
			</view>
			
			<view class="item">
				<text class="label">班级人数</text>
				<input type="number" placeholder="请填写班级人数" 
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
			<view @tap="createGrade">
				<text>创建班级</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				
			}
		},
		methods: {
			// 创建班级(在my页面判断是显示普通用户身份资料还是老师端资料)
			createGrade() {
				uni.switchTab({
					url: '/pages/my/my'
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
		background-image: linear-gradient(to right, #66dbe5, #3ab4d2);
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50rpx;
	}
</style>
