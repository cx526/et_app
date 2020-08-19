<template>
	<view>
		<view class="form">
			<view class="list">
				<view class="item spcial">
					<view class="left">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-boy.png" mode="widthFix"></image>
					</view>
					<view class="right">
						<input type="text" value="小A" disabled />
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text>家长姓名</text>
					</view>
					<view class="right">
						<input type="text" value="小A" disabled />
					</view>
				</view>
				<view class="item contact">
					<view class="left">
						<text>联系方式</text>
					</view>
					<view class="right">
						<input type="text" value="13488888888" disabled />
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-05.png" mode="widthFix"
						@tap="call"></image>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<text>学号</text>
					</view>
					<view class="right">
						<input type="text" value="01" disabled />
					</view>
				</view>
				<view class="item" style="border-bottom: none;">
					<view class="left">
						<text>备注</text>
					</view>
					<view class="right">
						<input type="text" 
						placeholder="请输入备注信息"
						 placeholder-style="font-size: 30rpx;color: #808080"/>
					</view>
				</view>
				<view class="del">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_rubbish.png" mode="widthFix" 
					@tap="del"></image>
				</view>
			</view>
		</view>
		<view class="btn">
			<view>保存</view>
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
			// 拨打电话
			call() {
				uni.makePhoneCall({
				    phoneNumber: '13488888888' //仅为示例
				});
			},
			// 删除
			del() {
				uni.showModal({
					title: '确实删除此小朋友信息?',
					success: res => {
						if(res.confirm) {
							
						}else {
							
						}
					}
				})
			},
		}
	}
</script>
<style>
	page {
		background: #eaf7fe;
	}
</style>
<style scoped>
	.form {
		box-sizing: border-box;
		padding: 34rpx;
	}
	.form .list {
		background: #fff;
		box-sizing: border-box;
		box-shadow: 0 0 20rpx #ddd;
		border-radius: 20rpx;
		padding: 0 26rpx;
	}
	.form .item {
		box-sizing: border-box;
		border-bottom: 1px dashed #b3b3b3;
		box-sizing: border-box;
		padding: 0 12rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90rpx;
	}
	.form .item.spcial {
		height: 190rpx;
	}
	.form .left {
		flex: 1;
		box-sizing: border-box;
		font-weight: bold;
		font-size: 30rpx;
	}
	.form .left image {
		width: 110rpx;
		height: 110rpx;
	}
	.form .right {
		flex-shrink: 0;
		box-sizing: border-box;
	}
	.form .contact .right {
		display: flex;
		align-items: center;
	}
	.form .contact .right image {
		width: 36rpx;
		flex-shrink: 0;
		margin-left: 10rpx;
	}
	.form .right input {
		text-align: right;
		color: #808080;
		font-size: 30rpx;
		height: 90rpx;
	}
	.form .spcial .right input {
		color: #000;
	}
	.form .del {
		box-sizing: border-box;
		padding: 200rpx 12rpx 40rpx 12rpx;
		text-align: right;
	}
	.form .del image {
		width: 36rpx;
	}
	/* btn */
	.btn {
		box-sizing: border-box;
		padding: 0 25%;
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
		font-weight: bold;
	}
</style>
