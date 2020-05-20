<template>
	<view class="content">
		<view class="left-position">
			<image src="../static/cart/blueRight.png" style="width: 40upx;height: 40upx;"></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: String,
		img: String
	},
	methods: {
		btnClick() {
			this.$emit('clickHandle')
		}
	}
}
</script>

<style>
.content {
	
}
</style>
