<template>
	<view class="content">
		<view class="detail-content" v-for="(item,index) in showData" :key='index'>
			<et-img-book :dataArr='item' @tap="showInfo(item)"></et-img-book>
		</view>
	</view>
</template>

<script>
import etImgBook from './etImgBook.vue';

export default {
	components: {
		etImgBook
	},
	props: {
		showData: Array
	},
	methods: {
		showInfo(res) {
			console.log(res);
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}
</style>
