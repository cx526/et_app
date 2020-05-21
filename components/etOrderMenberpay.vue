<template>
	<view class="content" >
		<text>免费借阅次数： {{order.count}}次</text>
		<text>支付后次数： {{order.countAfter}}次</text>
	</view>
</template>

<script>
export default {
	props: {
		order : Object
	},
	methods: {
	
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-end;
	font-size: 25upx;
	color: #808080;
}
</style>
