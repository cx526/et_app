<template>
	<view class="content">
		<view class="cat-detail-position">
			<et-cart-detail :imgSrc="imgSrc" :title="title" :status="status" :corn="corn" :count="count"></et-cart-detail>
		</view>
	</view>
</template>

<script>
import etCartDetail from '../../components/etCartDetail.vue'

export default {
	components: {
		etCartDetail
	},
	data() {
		return {
			imgSrc: "../static/cart/oldMan.png",
			title: "巴巴和圣诞老人",
			status: "可借阅",
			corn: "30",
			count: "9"
		}
	},
	onLoad() {
		
	},
	methods: {
		
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.cat-detail-position {
	width: 90%;
}
</style>
