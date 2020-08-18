<template>
	<view>
		<!-- banner -->
		<view class="banner">
			<view class="context">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/user-default.png" mode=""></image>
				<view class="text">
					王老师
				</view>
			</view>
		</view>
		<!-- form -->
		<view class="form">
			<view class="list">
				<view class="item">
					<view class="label">
						卡号
					</view>
					<input type="text" value="ET01234567" disabled />
				</view>
				<view class="item">
					<view class="label">
						手机号
					</view>
					<input type="text" value="13488888888" disabled />
				</view>
				<view class="item">
					<view class="label">
						年级
					</view>
					<input type="text" value="中班" disabled />
				</view>
				<view class="item">
					<view class="label">
						班级
					</view>
					<input type="text" value="2班" disabled />
				</view>
				<view class="item">
					<view class="label">
						班级人数
					</view>
					<input type="text" value="20人" 
					class="uni-input" cursor-spacing="40" />
				</view>
				<view class="item spcial">
					<view class="label">
						班级码
					</view>
				</view>
				<view class="qrCode" @tap="save">
					<tki-qrcode
					cid="qrcode" 
					ref="qrcode" 
					val="ET0123456"
					:size="300" 
					onval="true" 
					:loadMake="true" 
					:usingComponents="true" 
					@result="qrR" 
					 />
				</view>
			</view>
		</view>
		<!-- btn -->
		<view class="btn">
			<view>保存</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				src: '',//二维码图片路径
			}
		},
		components: {
			tkiQrcode
		},
		methods: {
			// 保存图片
			save() {
				uni.authorize({
					scope: "scope.writePhotosAlbum",
					success: () => {
						uni.showModal({
							title: '是否确认保存图片?',
							success: res => {
								if(res.confirm) {
									uni.saveImageToPhotosAlbum({
										filePath: this.src,
										success: () => {
											uni.showToast({
												title: '图片保存成功',
												duration: 2000
											})
										}
									})
								}else {
									uni.showToast({
										title: '图片保存失败',
										icon: 'none',
										duration: 2000
									})
								}
							}
						})
					}
				})
			},
			// 生成二维码图片
			qrR(res) {
				console.log(res);
				this.src = res
			},
		}
	}
</script>
<style>
	page {
		background: #ebf8ff;
	}
</style>
<style scoped>
	/* banner */
	.banner {
		background-image: linear-gradient(to right, #9BE6E7, #7BCFEC);
		height: 300rpx;
		border-bottom-left-radius: 24rpx;
		border-bottom-right-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.banner .context {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.banner image {
		width: 110rpx;
		height: 110rpx;
	}
	.banner .text {
		color: #fff;
		font-size: 36rpx;
		margin-top: 16rpx;
		font-weight: bold;
	}
	/* form */
	.form {
		box-sizing: border-box;
		padding: 0 32rpx;
		position: relative;
		top: -36rpx;
	}
	.form .list {
		box-sizing: border-box;
		background: #fff;
		padding: 0 26rpx;
		box-shadow: 0 0 12rpx #f0f0f0;
		border-radius: 20rpx;
	}
	.form .list .item {
		box-sizing: border-box;
		border-bottom: 1px dashed #b3b3b3;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		line-height: 100rpx;
		font-size: 32rpx;
	}
	.form .list .item.spcial {
		border-bottom: none;
	}
	.form .list .item input {
		height: 100rpx;
		font-size: 1;
		text-align: right;
		color: #b7b7b7;
	}
	.form .list .qrCode {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		padding: 20rpx 0 40rpx 0;
	}
	/* btn */
	.btn {
		box-sizing: border-box;
		padding: 0 25%;
	}
	.btn view {
		background-image: linear-gradient(to right, #9BE6E7, #7BCFEC);
		color: #fff;
		line-height: 80rpx;
		font-weight: bold;
		font-size: 34rpx;
		display: flex;
		justify-content: center;
		border-radius: 60rpx;
	}
</style>
