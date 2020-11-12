<template>
	<view class="typesetting-box">
		<view class="typesetting" @tap="handleClick">
			<view class="item" v-for="(item, index) in rankingList" :key="index">
				<view class="top">
					<image :src="item.avatar" mode="widthFix" class="header"></image>
					<image :src="$aliImage + 'read-No'+(index+1)+'.png'" mode="widthFix" class="ranking"></image>
				</view>
				<view class="center">
					<text v-if="item.childName">{{ item.childName }}小朋友</text>
					<text v-else>小爱同学</text>
				</view>
				<view class="bottom">
					<image :src="$aliImage + 'read-vitality.png'" mode="widthFix"></image>
					<text>活力值：{{ item.vitality }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			rankingList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo')
			}
		},
		watch: {
			rankingList(newVal) {
				this.rankingList = newVal
			}
		},
		methods: {
			handleClick() {
				this.$emit('checkVigourDetail')
			}
		}
	}
</script>

<style scoped>
	.typesetting-box {
		box-sizing: border-box;
		padding: 40rpx 25rpx 0 40rpx;
	}
	.typesetting {
		box-sizing: border-box;
		display: flex;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 6rpx 0px rgba(0,0,0,0.16); 
		justify-content: space-around;
		position: relative;
		height: 190rpx;
		padding: 0 2%;
	}
	.typesetting .item {
		/* flex: 1; */
		width: 32%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: -70rpx;
	}
	.item .header {
		width: 100rpx;
		height: 100rpx;
		display: block;
		border-radius: 50%;
		margin-left: 10rpx;
		position: relative;
	}
	.item .ranking {
		width: 120rpx;
		height: 40rpx;
		display: block;
		position: relative;
		top: -20rpx;
		z-index: 8;
	}
	.item .center {
		font-size: 28rpx;
		font-weight: 700;
		margin-top: -8rpx;
	}
	.item .bottom {
		width: 184rpx;
		display: flex;
		align-items: center;
		height: 38rpx;
		box-sizing: border-box;
		padding: 0 16rpx;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		text-align: center;
		font-size: 24rpx;
		margin-top: 12rpx;
	}
	.item .bottom image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
</style>
