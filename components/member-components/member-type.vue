<template>
	<view>
		<view v-if="parent === 'banner'">
			<image v-for="(item, index) in memberType" :key="item.id" :src="item.banner_url" mode="widthFix" @tap="memberDetail(index)"></image>
			<view class="context" v-if="isShow">
				<text>敬请期待...</text>
			</view>
		</view>
		<view v-else>
			<image v-for="(item, index) in memberType" :key="item.id" :src="item.listimg_url" mode="widthFix" @tap="memberDetail(index)"></image>
			<view class="context" v-if="isShow">
				<text>敬请期待...</text>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			memberType: Array,
			isShow: {
				type: Boolean,
				default: true
			},
			parent: {
				type: String,
				default: 'banner'
			}
		},
		methods: {
			memberDetail(index) {
				this.$emit('memberDetail', index)
			}
		}
	}
</script>

<style scoped>
	image {
		width: 650rpx;
		height: 180rpx;
		display: block;
		margin-top: 20rpx;
	}
	.context {
		text-align: center;
		font-size: 24rpx;
		margin-top: 30rpx;
	}
</style>
