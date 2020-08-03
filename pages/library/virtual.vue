<template>
	<view>
		<button type="default" @tap="goPay">充值</button>
		<button type="default">记录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转充值页面
			goPay() {
				uni.navigateTo({
					url: './pay'
				})
			}
		}
	}
</script>

<style>

</style>
