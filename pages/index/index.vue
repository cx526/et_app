<template>
	<view class="index">
		<!-- 头部内容 -->
		<view class="top-content">
			<!-- 顶栏搜索框 -->
			<view class="search-box" @tap="toSearch">
				<icon class="search-icon" type="search"/>
				<input class="search-input" type="text" placeholder="请输入书籍名..." disabled />
			</view>
			
			<view class="white-space"></view>
			
			<!-- 轮播图 -->
			<view style="position: relative;">
				<swiper class="carousel" circular autoplay @change="swiperChange">
					<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item">
						<image :src="item.img" />
					</swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{swiperCurrent+1}}</text>
					<text class="sign">/</text>
					<text class="num">{{swiperLength}}</text>
				</view>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 按钮组合栏 -->
		<view class="btn-group">
			<et-button v-for="(item,i) in groupList" :key="i" :title="item.name" :img="item.img" @clickHandle="btnGroupClick"></et-button>
		</view>
		
		<view class="white-space"></view>
		
		<!-- banner -->
		<view class="banner">
			<image src="../../static/index/giftbanner@2x.png" class="banner-img" mode=""></image>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 热门推荐 -->
		<view class="hot-recom">
			<!-- 导航条 -->
			<et-titlenavigation  title="热门推荐" img="../static/index/start@2x.png" toUrl="baidu.com" @clickHandle="btnGroupClick"></et-titlenavigation>
			
			<view class="hotcomcontent">
				<et-hotcomcontent  v-for="(item,i) in hotBookList" :key="i" :title="item.name" :img="item.img" :bookCount="item.bookCount" @clickHandle="btnGroupClick"></et-hotcomcontent>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 新书推荐 -->
		<view class="new-recom">
			<!-- 导航条 -->
			<et-titlenavigation  title="新书推荐" img="../static/index/start@2x.png" toUrl="baidu.com" @clickHandle="btnGroupClick"></et-titlenavigation>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 书籍分类 -->
		<view class="book-cat">
			<et-bookcat v-for="(item,i) in bookCat" :key="i" :title="item.name" :img="item.img" @clickHandle="btnGroupClick"></et-bookcat>
		</view>
		
		<view class="white-space"></view>
		
		<!-- banner -->
		<view class="banner">
			<image src="../../static/index/readbanner@3x.png" class="read-img" mode=""></image>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 猜你喜欢 -->
		<view class="guess-like">
			<!-- 导航条 -->
			<et-titlenavigation  title="猜你喜欢" img="../static/index/start@2x.png" toUrl="baidu.com" @clickHandle="btnGroupClick"></et-titlenavigation>
			
			<!-- 内容 -->
			<!-- <et-button v-for="(item,i) in carouselList" :key="i" :title="item.name" :img="item.img" @clickHandle="btnGroupClick"></et-button> -->
		</view>
				
	</view>
</template>

<script>
import etButton from '../../components/etButton.vue'
import etHotcomcontent from '../../components/etHotcomcontent.vue'
import etTitlenavigation from '../../components/etTitlenavigation.vue'
import etBookcat from '../../components/etBookcat.vue'

export default {
	components: {
		etButton,
		etHotcomcontent,
		etTitlenavigation,
		etBookcat
	},
	data() {
		return {
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			groupList: [
				{
					'name' : '绘本',
					'img'  : '../static/index/groupicon@2x.png'
				},
				{
					'name' : '获币',
					'img'  : '../static/index/groupicon@2x.png'
				},
				{
					'name' : '打卡',
					'img'  : '../static/index/groupicon@2x.png'
				},
				{
					'name' : '会员',
					'img'  : '../static/index/groupicon@2x.png'
				},
				{
					'name' : '分类',
					'img'  : '../static/index/groupicon@2x.png'
				}
			],
			hotBookList: [
				{
					'name' : '巴巴故事看看卡卡卡卡阿卡卡卡卡',
					'img'  : '../static/index/hotbook.jpg',
					'bookCount' : 10
				},
				{
					'name' : '巴巴旅行',
					'img'  : '../static/index/hotbook.jpg',
					'bookCount' : 100
				},
				{
					'name' : '巴巴朋友',
					'img'  : '../static/index/hotbook.jpg',
					'bookCount' : 3
				},
				{
					'name' : '巴巴国王',
					'img'  : '../static/index/hotbook.jpg',
					'bookCount' : 80
				},
				{
					'name' : '巴巴孩子们',
					'img'  : '../static/index/hotbook.jpg',
					'bookCount' : 30
				},
				{
					'name' : '巴巴公主',
					'img'  : '../static/index/hotbook.jpg',
					'bookCount' : 44
				}
			],
			bookCat: [
				{
					'name' : '科普百科',
					'img'  : '../static/index/bookCat@3x.png'
				},
				{
					'name' : '幼儿教育',
					'img'  : '../static/index/bookCat@3x.png'
				},
				{
					'name' : '能力培训',
					'img'  : '../static/index/bookCat@3x.png'
				},
				{
					'name' : '自我认知',
					'img'  : '../static/index/bookCat@3x.png'
				},
				{
					'name' : '有教无类',
					'img'  : '../static/index/bookCat@3x.png'
				},
				{
					'name' : '古籍古典',
					'img'  : '../static/index/bookCat@3x.png'
				},
				{
					'name' : '流行音乐',
					'img'  : '../static/index/bookCat@3x.png'
				},
			],
			
		}
	},
	onLoad() {
		this.getSwiperData()
	},
	methods: {
		getSwiperData() {
			this.$api.getSwiperData({link_usage: 'app_swiper'}).then(res => {
			   this.carouselList = res.data
			   this.swiperLength = this.carouselList.length;
			})
		},
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
.index {
	background-color: rgba(249,249,249,0.5);
}
/* 头部内容	 */
.top-content {
	display: flex;
	flex-direction: column;
	background-image:url(../../static/index/topBackground@2x.png);
	background-size:cover;
}
.search-box {
	padding: 8upx 30upx;
	width:85%;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	margin-top: 20px;
	background-color: #FFFFFF;
	border-radius: 50upx;
}

.search-icon {

}

.search-input {
	margin-left: 10upx;
	font-size: 34upx;
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
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.banner {
	width: 100%;
}
.banner-img {
	width: 100%;
	height: 200upx;
}

/* 热门推荐 */
.hot-recom {
	width: 100%;
}
.hotcomcontent {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content:space-around;
}

/* 书籍分类 */
.book-cat {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: scroll;
}

/* 阅读圈 */
.read-img {
	width: 100%;
}

/* 猜你喜欢 */

</style>
