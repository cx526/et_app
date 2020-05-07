<template>
	<view>
		<!-- 顶栏搜索框 -->
		<view class="search-box" @tap="toSearch">
			<!-- icon 需要用设计图片-->
			<!-- <icon class="search-icon" type="search"/> -->
			<input class="search-input" type="text" value="书名/作者/关键字" disabled />
		</view>
		
		<view class="white-space"></view>

		<!-- 轮播图 -->
		<view style="position: relative;">
			<swiper class="carousel" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 按钮组合栏 -->
		<view class="btn-group">
			<et-button v-for="(item,i) in carouselList" :key="i" :title="item.title" :img="item.src" @clickHandle="btnGroupClick"></et-button>
		</view>
		
		<!-- banner -->
		<view class="banner"></view>
	</view>
</template>

<script>
import etButton from '../../components/etButton.vue'

export default {
	components: {
		etButton
	},
	data() {
		return {
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [
				{ title: "111", src: "http://t9.baidu.com/it/u=3363001160,1163944807&fm=79&app=86&f=JPEG?w=1280&h=830"},
				{ title: "222", src: "http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG?w=1280&h=853"},
				{ title: "333", src: "http://t8.baidu.com/it/u=2247852322,986532796&fm=79&app=86&f=JPEG?w=1280&h=853"},
				{ title: "444", src: "http://img3.imgtn.bdimg.com/it/u=1258249301,613690822&fm=26&gp=0.jpg"},
				{ title: "555", src: "http://i-7.vcimg.com/crop/9538c790b6cae4ffd33fb5383b3ca4d897723%28600x%29/thumb.jpg"},
			]
		}
	},
	onLoad() {
		this.swiperLength = this.carouselList.length;
	},
	methods: {
		btnGroupClick(item) {
			console.log(item)
		},
		toSearch() {
			uni.showToast({
				title: 'toSearch'
			})
		},
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
		},
	}	
}
</script>

<style scoped>
.search-box {
	position: relative;
	padding: 0 30upx;
}

.search-icon {
	position: absolute;
	top: 12upx;
	left: 50upx;
	font-size: 30upx;
}

.search-input {
	height: 56upx;
	line-height: 56upx;
	text-align: center;
	font-size: 28upx;
	border-radius: 40upx;
	background: #FFFFFF;
	border: 2upx solid #ccc;
	color: #ccc;
}
.carousel {
	width: 100%;
	height: 350upx;
}
.carousel .carousel-item {
	width: 93%!important;
	height: 100%;
	padding: 0 28upx;
	overflow: hidden;
}
.carousel-item image {
	width: 100%;
	height: 100%;
	border-radius: 10upx;
}

.swiper-dots {
	display: flex;
	position: absolute;
	right: 60upx;
	bottom: 15upx;
	width: 72upx;
	height: 36upx;
	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
	background-size: 100% 100%;

}
.num {
	width: 36upx;
	height: 36upx;
	border-radius: 100upx;
	font-size: 24upx;
	color: #fff;
	text-align: center;
	line-height: 36upx;
}

.sign {
	position: absolute;
	top: 0;
	left: 50%;
	line-height: 36upx;
	font-size: 12upx;
	color: #fff;
	transform: translateX(-50%);
}
.btn-group {
	display: flex;
	align-items: center;
	justify-content: space-around;
}
.banner {
	height: 160upx;
	background-color: #ccc;
}
</style>
