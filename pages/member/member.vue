<template>
	<view>
		<view class="bg"></view>
		<swiper>
			<swiper-item>
				<view class="item">
					<view class="show">
						<image :src="$aliImage + 'member-icon-04.png'" 
						mode="widthFix"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background: #f9f9f9;
	}
</style>
<style scoped>
	.bg {
		background: #2B2E4D;
		height: 402rpx;
	}
	swiper {
		box-sizing: border-box;
		padding: 0 65rpx;
	}
	swiper-item {
		box-sizing: border-box;
		position: relative;
	}
	swiper .show {
		box-sizing: border-box;
		padding: 0 12rpx;
	}
	swiper .show image {
		width: 100%;
		height: 318rpx;
	}
</style>
