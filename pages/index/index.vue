<template>
	<view class="index">
		<!-- 提示添加到我的小程序 -->
		<view class="add-notice" v-if="record === 3 && isRecord">
			<view class="triangle"></view>
			<image :src="$aliImage + 'icon-notice.png'" mode="widthFix"></image>
			<text>添加小程序 发现好绘本</text>
		</view>
		<!-- 头部内容 -->
		<view class="top-content">
			<!-- 顶栏搜索框 -->
			<view class="search-box active">
				<view class="search active">
					<image :src="$aliImage + 'search.png'" class="icon-search"></image>
					<input type="text" disabled placeholder="请输入书籍名..." placeholder-style="font-size: 30rpx;color: #C5C5C5" @tap="toSearch" />
				</view>
			</view>

			<!-- <view class="white-space"></view> -->

			<!-- 轮播图 -->
			<view style="position: relative;">
				<swiper class="carousel" circular autoplay @change="swiperChange">
					<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item" @tap="toTargetUrl(item)"><image :src="item.img" /></swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{ swiperCurrent + 1 }}</text>
					<text class="sign">/</text>
					<text class="num">{{ swiperLength }}</text>
				</view>
			</view>
		</view>

		<!-- 按钮组合栏 -->
		<view class="btn-group"><et-button v-for="(item, i) in groupList" :key="i" :title="item.name" :img="item.img" @tap="toButtonUrl(item.toUrl)"></et-button></view>

		<!-- <view class="white-space" style="height: 10upx;"></view> -->

		<!-- banner -->
		<view class="banner" @tap="oneBannerUrl()" v-if="oneBannerList">
			<image :src="oneBannerList.url" class="banner-img" mode="widthFix"></image>
		</view>

		<view class="white-space" style="height: 20upx;"></view>

		<!-- 老师推荐 -->
		<view class="hot-recom">
			<!-- 导航条 -->
			<et-titlenavigation title="老师推荐" img="../static/index/start.png" toUrl="baidu.com" @toMoreData="toHotListData('teacher',hotBookList)"></et-titlenavigation>

			<view class="hotcomcontent">
				<et-hotcomcontent
					v-for="(item, index) in hotBookList"
					v-if="index <= 5"
					:key="index"
					:lineType="item.lineType"
					:dataArr="item"
					@tap="toBookDetail(item.id)"
				></et-hotcomcontent>
			</view>
		</view>
		<view class="white-space" style="height: 40upx;"></view>
		<!-- 书柜上新 -->
		<view class="hot-recom">
			<!-- 导航条 -->
			<et-titlenavigation title="书柜上新" img="../static/index/start.png" toUrl="baidu.com" @toMoreData="toHotListData('new',newBookList)"></et-titlenavigation>
		
			<view class="hotcomcontent">
				<et-hotcomcontent
					v-for="(item, index) in newBookList"
					v-if="index <= 5"
					:key="index"
					:lineType="item.lineType"
					:dataArr="item"
					@tap="toBookDetail(item.id)"
				></et-hotcomcontent>
			</view>
		</view>
		<view class="white-space" style="height: 40upx;"></view>

		<!-- 新书推荐 -->
		<view class="new-recom">
			<!-- 导航条 -->
			<et-titlenavigation title="新书推荐" img="../static/index/start.png" toUrl="baidu.com" @toMoreData="toKineList"></et-titlenavigation>
		</view>

		<!-- <view class="white-space" style="height: 6upx;"></view> -->

		<!-- 书籍分类 -->
		<view class="book-cat">
			<et-bookcat v-for="(item, i) in bookCat" :key="i" :title="item.name" :img="item.img" @clickBookCat="clickBookCat(item.name)"></et-bookcat>
		</view>

		<view class="white-space" style="height: 20upx;"></view>

		<!-- banner -->
		<view class="banner" @tap="twoBannerUrl" v-if="twoBannerList"><image :src="twoBannerList.url" class="read-img" mode="widthFix"></image></view>

		<view class="white-space" style="height: 10upx;"></view>

		<!-- 猜你喜欢 -->
		<view class="guess-like">
			<!-- 导航条 -->
			<et-titlenavigation title="猜你喜欢" img="../static/index/start.png" @clickHandle="btnGroupClick"></et-titlenavigation>

			<!-- 内容 -->
			<view class="guess-content">
				<et-imgbox v-for="(item, i) in guessBookList" :key="i" :bookInfo="item" @insertBookToCart="insertBookToCart" type="offline">
				</et-imgbox>
			</view>
			<uni-load-more :status="loadStatus" :content-text="loadText" />
			<view class="white-space"></view>

			<!-- 首页弹窗 -->
			<uni-popup ref="popup">
				<view style="display: flex; flex-direction: column; align-items: center;">
					<view @tap="goPromote"><image :style="'width: ' + popupData.name + 'rpx; height: ' + popupData.target + 'rpx;'" :src="popupData.img"></image></view>
					<view @tap="closePopup"><image style="width: 80upx; height: 80upx;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popuo_close.png"></image></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import etButton from '../../components/etButton.vue';
import etHotcomcontent from '../../components/etHotcomcontent.vue';
import etTitlenavigation from '../../components/etTitlenavigation.vue';
import etBookcat from '../../components/etBookcat.vue';
import etImgbox from '../../components/etImgbox.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';

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
			record: 0, //获取用户第几次进入小程序
			isRecord: true,
			$aliImage: this.$aliImage, //静态图片路径
			popupData: {},
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			newBookList: [], //书柜上新数据
			oneBanner: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_pricture_first3.png',
			secondBanner: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_pricture_two.png',
			loadStatus: 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '已经到底了'
			},
			toHotBookList: [],
			groupList: [
				{
					name: '童书馆',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index-button-01.png',
					toUrl: '/pages/library'	
				},
				{
					name: '选绘本',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index-button-02.png',
					toUrl: './kind'
				},
				{
					name: '小学堂',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_button_07.png',
					toUrl: '/pagesFavourite/XMradio/index'
				},
				
				{
					name: '签到',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_button_04.png',
					toUrl: './sign'
				},
				// {
				// 	name: '积分',
				// 	img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_button_03.png',
				// 	toUrl: '/pages/my/myIntegral'
				// },
				{
					name: '会员',
					// name: '音频',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_button_05.png',
					// toUrl: '/pagesFavourite/XMradio/index'
					toUrl: '/pages/member/member-list'
				},
			],
			hotBookList: [],
			bookCat: [
				{
					name: '中国原创',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new5.png'
				},
				{
					name: '获奖绘本',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new1.png'
				},
				{
					name: '情感治愈',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new4.png'
				},
				{
					name: '科普百科',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new2.png'
				},
				{
					name: '能力习惯',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new3.png'
				},
				{
					name: '自我认知',
					img: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_new6.png'
				}
			],
			guessBookList: [],
			docker_mac: '',
			oneBannerList: '',
			twoBannerList: '',
			currentPage: 1,
			isOpen: ''
		};
	},
	onLoad() {
		
		this.checkAuth();
		this.getSwiperData();
		this.getUserInfo();
		this.showAD();
		this.getBanner()
		this.checkXmlySwitch()
	},
	onShow() {
		this.record = uni.getStorageSync('record')
		if(this.record === 3) {
			setTimeout(() => {
				this.isRecord = false
			}, 3000)
		}
		// 每次进来重新计算书篮书籍总数(tab)
		bookListData.countBookLength()
	},
	
	// 上拉加载更多,onReachBottom上拉触底函数
	onReachBottom: function() {
		this.status = 'more';
		this.getGuessBook('push')
	},
	methods: {
		// 获取用户信息
		getUserInfo() {
			let userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {};
			let mobile = userInfo.mobile ? userInfo.mobile : '';
			this.$api.offlineUserDockerInfo({
					mobile: mobile
				})
				.then(res => {
					if(res.data.status === 'fail') {
						return
					}
					let result = res.data
					userInfo.card_no = result.card_no ? result.card_no : ''
					userInfo.docker_mac = result.docker_mac ? result.docker_mac : ''
					this.docker_mac = result.docker_mac ? result.docker_mac : ''
					userInfo.custom_type = result.custom_type
					userInfo.id = result.id
					userInfo.school_id = result.school_id
					uni.setStorageSync('userInfo', userInfo)
					// 获取老师推荐书籍
					this.getHotBook('init');
					// 获取书柜上新书籍
					this.getNewBook('init')
					// 获取猜你喜欢书籍
					this.getGuessBook('init');
				});
		},
		closePopup() {
			uni.setStorageSync('et_popOver', true);
			this.$refs.popup.close();
		},
		insertBookToCart() {
			//更新tab
			let bookCount = bookListData.cartBookCount();
		},
		goPromote() {
			toUrlFunction.toUrl(this.popupData.value);
			this.$refs.popup.close();
			uni.setStorageSync('et_popOver', true);
		},
		showAD() {
			let popOver = uni.getStorageSync('et_popOver');
			if (!popOver) {
				this.$api.getSwiperData({ link_usage: 'app_popup' }).then(res => {
					if (res.data.length > 0) {
						this.popupData = res.data[0];
						this.$refs.popup.open();
					}
				});
			}
		},
		clickBookCat(name) {
			this.$api.getKindsWithThreeKind({ kind_name: name }).then(res => {
				let tabBars = res.data;
				let selectID = 0;
				tabBars.map((item, index) => {
					if (item.name === name) {
						selectID = index;
					}
				});
				//传递三级分类去商品列表
				uni.navigateTo({ url: 'kindlist?selectID=' + JSON.stringify(selectID) + '&tabBars=' + JSON.stringify(tabBars) });
			});
		},
		// 获取轮播底下两张banner图
		getBanner() {
			let param = {
				filterItems :
				{
				target_usage : "app_index_first_banner"
				}
			}
			this.$api.skipBanner(param).then(res => {
				this.oneBannerList = res.data.rows[0]
			})
			let param2 = {
				filterItems :
				{
				target_usage : "app_index_second_banner"
				}
			}
			this.$api.skipBanner(param2).then(secondRes => {
				this.twoBannerList = secondRes.data.rows[0]
			})
		},
		// 第一张banner
		oneBannerUrl() {
			if(this.oneBannerList.remark.replace(/\s*/g, "") == '') {
				return
			}
			else if(this.oneBannerList.remark.indexOf('http') != -1) {
				uni.navigateTo({
					url: '/pages/index/article?from='+this.oneBannerList.target_usage
				})
			}
			else if(this.oneBannerList.remark.indexOf('/pages') != -1) {
				uni.navigateTo({
					url: this.oneBannerList.remark
				})
			}
		},
		// 第二张banner
		twoBannerUrl() {
			if(this.twoBannerList.remark.replace(/\s*/g, "") == '') {
				return
			}
			else if(this.twoBannerList.remark.indexOf('http') != -1) {
				uni.navigateTo({
					url: '/pages/index/article?from='+this.twoBannerList.target_usage
				})
			}
			else if(this.twoBannerList.remark.indexOf('/pages') != -1) {
				uni.navigateTo({
					url: this.twoBannerList.remark
				})
			}
		},
		// 检测是否授权
		checkAuth() {
			uni.getStorage({
				key: 'userInfo',
				success: res => {},
				fail: err => {
					uni.reLaunch({ url: '../guide/guide' });
				}
			});
		},
		// 获取轮播图
		getSwiperData() {
			this.$api.getSwiperData({ link_usage: 'app_swiper' }).then(res => {
				this.carouselList = res.data;
				this.swiperLength = this.carouselList.length;
			});
		},
		// 点击swiper
		toTargetUrl(item) {
			let target = item.target
			if(target.indexOf('http') == -1) {
				uni.navigateTo({
					url: item.target
				})
				
			}else {
				uni.navigateTo({
					url: '/pages/index/swiper-article?src='+encodeURIComponent(JSON.stringify(target))
				})
			}
		},
		// 跳转书籍详情页
		toBookDetail(bookID) {
			let userInfo = uni.getStorageSync("userInfo")
			if(!userInfo.name || userInfo.name == 'guest') {
				uni.showModal({
					title: '请先登录',
					content: '是否前往登录页面?',
					success: res => {
						if(res.confirm) {
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					}
				})
				return
			}
			uni.navigateTo({
				url: '/pagesLibrary/library/offline-bookdetail?bookID=' + bookID
			});
			// uni.navigateTo({ url: 'bookdetail?bookID=' + JSON.stringify(bookID) });
		},
		// 跳转搜索页
		toSearch() {
			uni.navigateTo({ url: 'search' });
		},
		// 跳转子页面
		toButtonUrl(toUrl) {
			console.log(toUrl)
			let userInfo = uni.getStorageSync("userInfo")
			if(userInfo.name === 'guest' || !userInfo.name 
			|| userInfo.mobiel == '' || !userInfo.name || !userInfo.mobile) {
				uni.showModal({
					title: '请先登录！',
					content: '是否前往登录页面?',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '/pages/guide/guide'})
						}
					}
				})
				return
			}
			else if(toUrl === '/pages/library') {
				uni.switchTab({
					url: toUrl
				})
				return
			}
			else if(toUrl === './kind') {
				uni.showToast({
					title: '敬请期待',
					icon: 'none',
					duration: 2000
				})
				return
			}
			else if(toUrl === '/pagesFavourite/XMradio/index' && this.isOpen == 0) {
				uni.showToast({
					title: '敬请期待',
					icon: 'none',
					duration: 2000
				})
				return
			}
			else if(toUrl === '/pagesFavourite/XMradio/index' && this.isOpen == 1) {
				uni.navigateTo({
					url: '/pagesFavourite/XMradio/index'
				})
			}
			else {
				uni.navigateTo({ url: toUrl });
			}
		},
		// 监听轮播图发生改变
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
		},
		// 获取老师推荐
		getHotBook(type) {
			let param = {
				filterItems: {
					docker_mac: this.docker_mac ? this.docker_mac : ''
				}
			};
			this.$api.getNewBook(param).then(res => {
				this.hotBookList = res.data;
			});
		},
		// 获取书柜上新书籍
		getNewBook(type) {
			let param = {
				filterItems: {
					docker_mac: this.docker_mac ? this.docker_mac : ''
				}
			};
			this.$api.getNewBook(param).then(res => {
				this.newBookList = res.data;
			});
		},
		// 更新老师推荐/书柜上新
		getUpdateRecommend() {
			// docker_mac为空默认不请求
			let userInfoStorage = uni.getStorageSync("userInfo");
			if(!userInfoStorage.docker_mac || userInfoStorage.docker_mac.replace(/\s*/g, '') == '') {
				return
			}else {
				// 获取老师推荐
				this.getHotBook()
				// 获取新书推荐
				this.getNewBook()
			}
		},
		// 获取猜你喜欢书籍
		getGuessBook(type) {
			let param = {
				filterItems: {
					docker_mac: this.docker_mac
				}
			};
			if (this.guessBookList.length >= 30) {
				this.loadStatus = 'noMore'; //没有数据时显示‘没有更多’
				return;
			}
			this.$api.getGuess(param).then(res => {
				
				if(res.data && res.data.length > 0) {
				res.data.map(item => {
					
				// 	// 如果线上书(stockCount.totalOnlineUse)
				// 	// if(item.stockCount.totalOnlineUse == 0 && item.lineType == 1) { return }
				// 	// // 如果线下书(stockCount.totalDockerUse)
				// 	// else if(item.stockCount.totalDockerUse == 0 && item.lineType == 2) { return }
				// 	// // 如果是线上/线下书(totalOnlineUse && totalDockerUse==0)
				// 	// else if(item.lineType == 3 && item.stockCount.totalOnlineUse && item.stockCount.totalDockerUse) { return }
				// 	// else if(item.stockCount.totalOnlineUse == 0) {
				// 	// 	return
				// 	// }
				// 	// else {
					// 如果线下书籍书库为零，默认不加入
					if(item.stockCount.totalDockerUse == 0 || item.show_status === '0') {
						return
					}
					this.guessBookList.push(item)
				// }
					
				});
				}else {
					this.loadStatus = 'noMore'
				}
			});
		},
		// 查看是否开启喜马拉雅入口
		checkXmlySwitch() {
			this.$api.xmlySwitch().then(res => {
				console.log(res)
				this.isOpen = res.data
			})
		},
		toSign() {
			uni.navigateTo({ url: './sign' });
		},
		// 老师推荐(更多)
		toHotListData(type, bookList) {
			let name = ''
			switch(type) {
				case 'teacher':
					name = "老师推荐"
					break
				case 'new':
					name = "书柜上新"
					break
			}
			// let tabBars = [{ name: name }];
			// noPull:是否允许上拉加载更多 selectID:当前选中tabBar索引 
			// tabBars:tabBar名称 booksList:数据 pagesType:是否对库存为零的书籍进行隐藏
			uni.setStorageSync("offlineRecommenBook", bookList)
			uni.navigateTo({
				url: '/pagesLibrary/library/offline-more?name='+name
				// url:
				// 	'./kindlist?pagesType=hotList&noPull=1&selectID=0&tabBars=' +
				// 	encodeURIComponent(JSON.stringify(tabBars)) +
				// 	'&bookList=' +
				// 	encodeURIComponent(JSON.stringify(bookList))
			});
		},

		toKineList() {
			let kindObject = {
				secondValue: '主题分类'
			};
			uni.navigateTo({ url: './kind?kindObject=' + encodeURIComponent(JSON.stringify(kindObject)) });
		},
		// 页面分享
		onShareAppMessage(res) {
			if (res.from === 'button') {
				// 来自页面内分享按钮
			}
			return {
				title: '汇聚天下最好的书，只为陪伴一群爱读书的孩子！',
				path: '/pages/index/index',
				imageUrl: 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_share.png'
			};
		}
	}
};
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
	background-image: url(../../static/index/topBackground.png);
	background-size: 100% 500upx;
	background-repeat: no-repeat;
}
/* search */
.search-box {
	box-sizing: border-box;
	padding: 0 25rpx;
	margin-top: 25upx;
}
.search-box .search {
	height: 80rpx;
	box-sizing: border-box;
	background: #fff;
	position: relative;
	display: flex;
	align-items: center;
	padding-left: 30rpx;
	border-radius: 40rpx;
}
.search-box .search.active {
	border: 1px solid #ebf7ff;
}
.search-box .icon-search {
	width: 40rpx;
	height: 40rpx;
	flex-shrink: 0;
	margin-right: 12rpx;
}
/* .search-box {
	padding: 8upx 20upx;
	width: 85%;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	margin-top: 20upx;
	background-color: #ffffff;
	border-radius: 50upx;
}

.search-icon {
}

.search-input {
	margin-left: 10upx;
	font-size: 34upx;
} */
.carousel {
	width: 100%;
	height: 450upx;
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
	padding: 10upx 14upx;
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
	justify-content: space-around;
	padding: 0 40rpx;
}

/* 书籍分类 */
.book-cat {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	overflow: scroll;
	box-sizing: border-box;
	padding: 0 16rpx;
}

/* 阅读圈 */
.read-img {
	width: 100%;
}

/* 猜你喜欢 */
.guess-content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	/* justify-content:space-around; */
	/* padding: 0 40upx; */
	padding: 0 30rpx;
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

/* 提示添加小程序 */
.add-notice {
	position: absolute;
	right: 20rpx;
	top: 20rpx;
	height: 60rpx;
	background: #2AAEC4;
	z-index: 100;
	font-size: 30rpx;
	color: #fff;
	box-sizing: border-box;
	padding: 0 10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8rpx;
}
.add-notice .triangle {
	position: absolute;
	left: 60%;
	top: -34rpx;
	width: 0;
	height: 0;
	border-left: 16rpx solid transparent;
	border-right: 16rpx solid transparent;
	border-top: 16rpx solid transparent;
	border-bottom: 24rpx solid #2AAEC4;
}
.add-notice image {
	width: 30rpx;
	margin-right: 6rpx;
}
</style>
