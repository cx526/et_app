<template>
	<view>
		<image v-for="(item, index) in memberType" :key="item.id" :src="item.banner_url" mode="widthFix" @tap="memberDetail(index)"></image>
	</view>
</template>

<script>
	export default {
		props: {
			memberType: Array
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
		width: 100%;
		display: block;
		margin-top: 40rpx;
	}
</style>
