<template>
	<view>
		<offline-book :bookList="bookList" :len="len" 
		@upDateTab="upDateTab"></offline-book>
	</view>
</template>

<script>
	import offlineBook from '@/components/offline-components/offline-book.vue'
	const bookListData = require('@/common/carDataOption.js')
	export default {
		data() {
			return {
				name: '',
				bookList: [],
				len: ''
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
			// 动态设置NavigationBarTitle
			 uni.setNavigationBarTitle({
			   title: this.name 
			})
			
		},
		onShow() {
			// 获取tab书籍数量
			this.len = bookListData.countBookLength()
		},
		methods: {
			// 更新书篮书籍总数
			upDateTab() {
				this.len = bookListData.countBookLength()
			}
		}
	}
</script>

<style>
 page {
	 box-sizing: border-box;
	 padding: 24rpx 0;
	 background: #ebf7ff;
 }
</style>
