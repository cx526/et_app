<template>
	<view>
		<offline-book :bookList="bookList"></offline-book>
	</view>
</template>

<script>
	import offlineBook from '@/components/offline-components/offline-book.vue'
	export default {
		data() {
			return {
				name: '',
				bookList: []
			}
		},
		components: {
			offlineBook
		},
		onLoad(option) {
			this.name = option.name ? option.name : '学习绘本'
			this.bookList = uni.getStorageSync("offlineRecommenBook")
			console.log(this.name)
			console.log(this.bookList)
			 wx.setNavigationBarTitle({
			      title: this.name 
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
