<template>
	<view class="content">
		<image :src="img" class="img"></image>
		<input class="input-content" type="text" :value="inputData" :placeholder="remark" placeholder-class="input-content-pla" @focus="inputFocus"/>
	</view>
</template>

<script>
export default {
	props: {
		img: String,
		inputData: String,
		remark: String
	},
	methods: {
		inputFocus() {
			this.$emit('inputFocusAction')
		}
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content:flex-start;
	padding: 12upx 24upx;
	border: 1upx solid rgba(233,233,233,1);
	border-radius: 40upx;
	box-shadow: 1upx 1upx 1upx 1upx rgba(179,179,179,0.4);
}
.img {
	height: 50upx;
	width: 50upx;
}
.input-content,.input-content-pla {
	font-size: 28upx;
	color: rgba(185,185,185,0.8)
}
.input-content {
	margin-left: 20upx;
}
</style>
