<template>
	<view class="content-position" >
		<view class="left-position">
			<image :src="order.forGoodsPic[0].url" style="width: 120upx; height: 140upx;"></image>
			<text>{{order.title}}</text>
		</view>
		<view class="count-position">
			<text>X 1</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		order: Object
	},
	methods: {
	
	}
}
</script>

<style scoped>
.content-position {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.left-position {
	/* width: 90%; */
	display: flex;
	flex-direction: row;
	justify-items: center;
	align-items: center;
	font-size: 25upx;
	font-weight: 600;
}
.count-position {
	font-size: 20upx;
	font-weight: 600;
	color: #808080;
}
</style>
