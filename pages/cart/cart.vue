<template>
	<view class="content">
		<view style="width: 100%;">
			<et-book-cart-list v-if="bookCatShow" :optionData="{optionType:'cart'}"></et-book-cart-list>
		</view>
	</view>
</template>

<script>
import etBookCartList from '../../components/etBookCartList.vue'

export default {
	components: {
		etBookCartList
	},
	data() {
		return {
			bookCatShow:false,
		}
	},
	onShow(){
		this.bookCatShow = true;
	},
	onHide() {
		this.bookCatShow = false;
	},
	onLoad(){
		this.bookCatShow = true;
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
}
</style>
