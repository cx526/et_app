<template>
	<view class="content">
		<view style="width: 100%;">
			<et-book-cart-list :optionData="{optionType:'cart'}"></et-book-cart-list>
		</view>
	</view>
</template>

<script>
import etBookCartList from '../../components/etBookCartList.vue'

export default {
	components: {
		etBookCartList
	},
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
}
</style>
