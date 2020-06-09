<template>
	<view class="index">
		<view style="display: none;" class="sign-button" @tap="toSign">
			<text>签到</text>
		</view>
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
					<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item" @tap="toTargetUrl(item.target)">
						<image :src="item.img"  />
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
			<et-button v-for="(item,i) in groupList" :key="i" :title="item.name" :img="item.img" @tap="toButtonUrl(item.toUrl)"></et-button>
		</view>
		
		<view class="white-space"></view>
		
		<!-- banner -->
		<view class="banner" @tap="oneBannerUrl">
			<image :src="oneBanner" class="banner-img" mode="widthFix"></image>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 热门推荐 -->
		<view class="hot-recom">
			<!-- 导航条 -->
			<et-titlenavigation  title="热门推荐" img="../static/index/start.png" toUrl="baidu.com" @toMoreData="toHotListData"></et-titlenavigation>
			
			<view class="hotcomcontent">
				<et-hotcomcontent  v-for="(item,i) in hotBookList" v-if="i <= 5" :key="i"  :dataArr="item.goods_info" @tap="toBookDetail(item.goods_info.id)"></et-hotcomcontent>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 新书推荐 -->
		<view class="new-recom">
			<!-- 导航条 -->
			<et-titlenavigation  title="新书推荐" img="../static/index/start.png" toUrl="baidu.com"  @toMoreData="toKineList"></et-titlenavigation>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 书籍分类 -->
		<view class="book-cat">
			<et-bookcat v-for="(item,i) in bookCat" :key="i" :title="item.name" :img="item.img" @clickBookCat="clickBookCat(item.name)"></et-bookcat>
		</view>
		
		<view class="white-space"></view>
		
		<!-- banner -->
		<view class="banner">
			<image :src="secondBanner" class="read-img" mode="widthFix"></image>
		</view>
		
		<view class="white-space"></view>
		
		<!-- 猜你喜欢 -->
		<view class="guess-like">
			<!-- 导航条 -->
			<et-titlenavigation  title="猜你喜欢" img="../static/index/start.png"  @clickHandle="btnGroupClick"></et-titlenavigation>
			
			<!-- 内容 -->
			<view class="guess-content">
				<et-imgbox  v-for="(item,i) in guessBookList" :key="i"  :bookInfo="item" @insertBookToCart='insertBookToCart'></et-imgbox>
			</view>
		</view>
		<uni-load-more :status="loadStatus" :content-text="loadText" />
		<view class="white-space"></view>
		
		<uni-popup ref="popup">
			<view @tap="goPromote">
				<image style="width: 480upx; height: 800upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import etButton from '../../components/etButton.vue'
import etHotcomcontent from '../../components/etHotcomcontent.vue'
import etTitlenavigation from '../../components/etTitlenavigation.vue'
import etBookcat from '../../components/etBookcat.vue'
import etImgbox from '../../components/etImgbox.vue'
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

const toUrlFunction = require('@/common/toUrlFunction');
const bookListData = require('@/common/carDataOption');

export default {
	components: {
		uniLoadMore,
		etButton,
		etHotcomcontent,
		etTitlenavigation,
		etBookcat,
		etImgbox,
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	data() {
		return {
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			oneBanner: "https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_pricture_gift.png",
			secondBanner: "https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_banner_tow.png",
			loadStatus : 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '已经到底了'
			},
			toHotBookList: [],
			groupList: [
				{
					'name' : '选书',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/05.png',
					'toUrl' : './kind',
				},
				{
					'name' : '绘本',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/01.png',
					'toUrl' : '/pages/promote/promotePictureBook',
					// 'toUrl' : '/pages/index/bookdetail?bookID=900'
				},
				{
					'name' : '积分',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/02.png',
					'toUrl' : '/pages/my/myIntegral',
				},
				{
					'name' : '签到',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/03.png',
					'toUrl' : './sign',
				},
				{
					'name' : '会员',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/04.png',
					'toUrl' : '/pages/my/myMember',
				}
			],
			hotBookList: [],
			bookCat: [   
				{
					'name' : '中国原创',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new5.png'
				},
				{
					'name' : '获奖绘本',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new1.png'
				},
				{
					'name' : '情感治愈',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new4.png'
				},
				{
					'name' : '科普百科',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new2.png'
				},
				{
					'name' : '能力习惯',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new3.png'
				},
				{
					'name' : '自我认知',
					'img'  : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new6.png'
				}
			],
			guessBookList: []
			
		}
	},
	onShow() {
		//更新tab
		let bookCount = bookListData.cartBookCount();
	},
	onLoad() {
		this.checkAuth()
		this.getSwiperData()
		this.getHotBook('init')
		this.getGuessBook('init')	
		//更新tab
		let bookCount = bookListData.cartBookCount();
		this.showAD()
	},
	// 上拉加载更多,onReachBottom上拉触底函数
	onReachBottom : function(){
		this.status = 'more';
		this.getGuessBook('push')
	},
	methods: {
		insertBookToCart(){
			//更新tab
			let bookCount = bookListData.cartBookCount();
		},
		goPromote() {
			uni.switchTab({
				url: '/pages/promote/pictureMonth'
			})
			this.$refs.popup.close()
			uni.setStorageSync('et_popOver', true)
		},
		showAD() {
			let popOver = uni.getStorageSync('et_popOver')
			if (!popOver) {
				this.$refs.popup.open()
			}
		},
		clickBookCat(name){
			this.$api.getKindsWithThreeKind({ kind_name : name }).then(res=>{
				// console.log(res);
				let tabBars = res.data;
				let selectID = 0;
				tabBars.map((item,index)=>{
					if(item.name === name){
						selectID = index;
					}
				});
				//传递三级分类去商品列表
				uni.navigateTo({url: 'kindlist?selectID='+ JSON.stringify(selectID) +'&tabBars='+ JSON.stringify(tabBars)});
			});
		},
		oneBannerUrl(){
			uni.navigateTo({
				url:'/pages/promote/pictureToHome'
			})
		},
		checkAuth() {
			uni.getStorage({
				key: 'userInfo',
				success: (res) => {
					console.log(res.data)
				},
				fail: (err) => {
					uni.reLaunch({url: '../guide/guide'})
					console.log(err)
				}
			})
		},
		getSwiperData() {
			this.$api.getSwiperData({link_usage: 'app_swiper'}).then(res => {
			   this.carouselList = res.data
			   this.swiperLength = this.carouselList.length;
			})
		},
		toTargetUrl(url){
			toUrlFunction.toUrl(url);
		},
		toBookDetail(bookID) {
			uni.navigateTo({ url: 'bookdetail?bookID=' + JSON.stringify(bookID) })
		},
		toSearch() {
			uni.navigateTo({ url: 'search'})
		},
		toButtonUrl(toUrl){
			console.log(toUrl);
			uni.navigateTo({url: toUrl});
			if (toUrl === './kind'){
				uni.switchTab({
					url:toUrl
				})
			}
		},
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
		},
		getHotBook(type){
			this.$api.getRecommend().then(res => {
			   this.hotBookList = res.data;
			   console.log(this.hotBookList);
			})
		},
		getGuessBook(type){
			if (this.guessBookList.length >= 30) {
				this.loadStatus = 'noMore';  //没有数据时显示‘没有更多’
				return;
			}
			this.$api.getGuess().then(res => {
				console.log(res);
				// this.guessBookList.push(res.data);
				res.data.map(item=>{
					this.guessBookList.push(item);
				});
			})
		},
		toSign() {
			uni.navigateTo({url: "./sign"});
		},
		toHotListData() {
			console.log(this.toHotBookList);
			let tabBars = [{'name':'热门推荐'}];
			uni.navigateTo({ url: './kindlist?noPull=1&selectID=0&tabBars=' + encodeURIComponent(JSON.stringify(tabBars)) + '&bookList=' + encodeURIComponent(JSON.stringify(this.hotBookList))});
		},
		toKineList(){
			let kindObject = {
				secondValue : '主题分类'
			};
			console.log(kindObject);
			uni.navigateTo({ url: './kind?kindObject=' + encodeURIComponent(JSON.stringify(kindObject)) });
		}
	}	
}
</script>

<style scoped>
.index {
	position: relative;
	background-color: rgba(249, 249, 249, 0.5);
}
/* 头部内容	 */
.top-content {
	display: flex;
	flex-direction: column;
	background-image:url(../../static/index/topBackground.png);
	background-size:100% 500upx;
	background-repeat: no-repeat;
}
.search-box {
	padding: 8upx 30upx;
	width:85%;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	margin-top: 20upx;
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
	height: 420upx;
}
.carousel .carousel-item {
	/* width: 98%!important; */
	height: 100%;
	/* padding: 0 28upx; */
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
	right: 80upx;
	bottom: 45upx;
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
	justify-content: space-around;
	padding: 0 14upx;
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
.guess-content{
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content:space-around;
}
.sign-button {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 60%;
	right: 0upx;
	z-index: 999;
	width: 120upx;
	height: 120upx;
	border-radius: 60upx;
	background: #ccc;
}
</style>
