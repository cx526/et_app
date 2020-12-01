<template>
	<view>
		<view class="box">
			<view class="title">
				<view class="subTitle active">
					<text>喜欢</text>
					<text class="line"></text>
				</view>
				<view class="subTitle">
					<text>心愿</text>
				</view>
			</view>
			<view class="list">
				<swiper>
					<swiper-item>
						<view class="item">
							<image :src="$aliImage + 'book-demo.png'" mode="widthFix" class="cover"></image>
							<view class="context">
								<view class="book-title">
									<text>爸爸到底有什么用?</text>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
			}
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding: 40rpx 25rpx;
	}
</style>
<style scoped>
	.box {
		width: 100%;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 3rpx 6rpx 0px rgba(0,0,0,0.16); 
	}
	.box .title {
		line-height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		
	}
	.box .title .subTitle {
		flex: 1;
		text-align: center;
		position: relative;
	}
	.box .title .subTitle.active {
		color: #2aaec4;
		font-weight: 700;
	}
	.box .title .line {
		position: absolute;
		width: 98rpx;
		height: 12rpx;
		background: #2aaec4;
		border-radius: 6px;
		left: 50%;
		bottom: 19%;
		transform: translate(-50%,-50%);
	}
	.box .list {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	.box .list .item {
		box-sizing: border-box;
		padding: 13rpx 0;
		border-bottom: 1rpx dashed #B3B3B3;
		display: flex;
		align-items: center;
	}
	.box .list .cover {
		flex-shrink: 0;
		width: 200rpx;
		height: 200rpx;
		margin-right: 6rpx;
	}
	.box .list .context {
		flex: 1;
		box-sizing: border-box;
	}
	.box .list .context .book-title {
		font-size: 28rpx;
		font-weight: 700;
	}
</style>
