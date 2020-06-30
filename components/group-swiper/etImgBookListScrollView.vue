<template>
	<view class="content">
		<view class="top-content">
			<text style="font-weight: bold;">{{showData.formatDate}}</text>
			<view class="top-right-content">
				<text>阅读X{{showData.count}}</text>
				<image style="width: 36upx; margin-left: 20upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myReadList_book_group.png" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 滑动的书本 -->
		<view style="width: 100%; margin-top: 20upx;">
			<swiper class="carousel" circular>
				<swiper-item v-for="(item,index) in showData.goodsInfoSplit" :key="index" >
					<et-img-book-list :showData="item"></et-img-book-list>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import etImgBookList from './etImgBookList.vue';

export default {
	components: {
		etImgBookList
	},
	props: {
		showData: Object
	},
	data() {
		return {
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		}
	},
	methods: {
		showInfo(res) {
			console.log(res);
		},
		scroll(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	/* padding: 0upx 20upx; */
}
.top-content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 30upx;
	
	padding: 20upx 0;
	border-bottom: 2upx solid #C2C2C2;
}
.top-right-content {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.carousel {
	width: 100%;
	height: 220upx;
}
.carousel .carousel-item {
	/* width: 98%!important; */
	height: 100%;
	/* padding: 0 28upx; */
	overflow: hidden;
}
</style>
