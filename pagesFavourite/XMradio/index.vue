<template>
	<view>
		<!--
			<text>XMradio</text>
			<button @tap="play">play</button>
			<button @tap="pause">pause</button>
			<button @tap="stop">stop</button>
		-->
		<!-- swiper
		<view style="position: relative;">
			<swiper class="carousel" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item" @tap="toTargetUrl(item)">
					<image :src="item.banner_cover_url" />
				</swiper-item>
			</swiper>
			<view class="swiper-dots">
				<text class="num">{{ swiperCurrent + 1 }}</text>
				<text class="sign">/</text>
				<text class="num">{{ swiperLength }}</text>
			</view>
		</view>
		-->


		<!-- 背景 -->
		<view class="bg"></view>
		<view style="margin-top: -150rpx;">
			
		
			<!-- 推荐专辑start -->
			<view class="like-album"  from="album">
				<view class="album">
					<nav-title title="推荐专辑" :isShow="recommendAlbumsPage > 3 ? true : false" @checkMore="checkMore" from="recommendAlbum"></nav-title>
					<album-list :collectAlbumList="recommendAlbumsList" @goAlbumDetail="goAlbumDetail" ></album-list>
				</view>
			</view>
			<!-- 推荐专辑end -->
			<!-- 推荐声音start -->
			<view class="like-album">
				<view class="album">
					<nav-title title="推荐音频" :isShow="recommendBrowsePage > 3 ? true : false" from="recommendBrowse" @checkMore="checkMore"></nav-title>
					<browse-list :collectBrowseList="recommendBrowseList" @goPlay="goPlay" from="recommendBrowse"></browse-list>
				</view>
			</view>
			<!-- 推荐声音end -->
			<!-- 我喜爱的专辑start -->
			<view class="like-album" from="album">
				<view class="album">
					<nav-title title="我喜爱的专辑" :isShow="collectAlbumPage > 3 ? true : false" @checkMore="checkMore" from="collectAlbums"></nav-title>
					<album-list :collectAlbumList="collectAlbumList" @goAlbumDetail="goAlbumDetail" ></album-list>
				</view>
			</view>
			<!-- 我喜爱的专辑end -->
			<!-- 我喜爱的音频start -->
			<view class="like-album">
				<view class="album">
					<nav-title title="我喜爱的音频" :isShow="collectBrowsePage > 3 ? true : false" from="browse" @checkMore="checkMore"></nav-title>
					<browse-list :collectBrowseList="collectBrowseList" @goPlay="goPlay" from="browse"></browse-list>
				</view>
			</view>
			<!-- 我喜爱的音频end -->
		</view>
		<!-- 专辑列表区域start -->
		<view class="album">
			<view class="list">
				<!-- 专辑分类 -->
				<view class="album-nav">
					<scroll-view scroll-x scroll-with-animation :scroll-left="scroll">
						<block v-for="(item, index) in kindList" :key="index">
							<view @tap="changeNav(index)" :class="index === currentIndex ? 'active' : ''">
								<text :class="index === currentIndex ? 'border-color' : ''">{{ item.name }}</text>
							</view>
						</block>
					</scroll-view>
				</view>
				<!-- 专辑内容 -->
				<view class="album-content">
					<swiper :style="{'height': swiperHeight}" :current="swiperCurrent" @change="swiperChange">
						<swiper-item v-for="(item, index) in kindList" :key="index">
							<view class="content-item" v-for="(content, contentIndex) in albumsList" :key="content" @tap="goAlbumDetail(content)">
								<view class="cover">
									<image :src="content.cover_url_middle" ></image>
									<view class="play-count">
										<image :src="$aliImage + 'xmly-icon-play.png'"></image>
										<text>{{ content.play_count | formatPlayCount }}</text>
									</view>
								</view>
								<view class="title">
									<image :src="$aliImage + 'xmly-icon-01.png'"></image>
									<view class="title-text">{{content.album_title}}</view>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 专辑列表区域end -->


	</view>
</template>

<script>
	import {
		initXMLY
	} from './XM.js'
	import {
		XMdeveloper_albumsURL,
		XMdeveloper_columnsURL,
		// XMdeveloper_bannersURL,
		XMdeveloper_categoriesURL,
		XMalbums_browseURL,
		XMbatch_albumsURL,
		MXbatch_browseURL
	} from './XM.js'
	import navTitle from '../components/nav-title.vue'
	import albumList from '../components/album-list.vue'
	import browseList from '../components/browse-list.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
				XMclient: null,
				XMplayer: null,
				albumsPage: 1,
				columnPage: 1,
				kindList: [], // 分类栏目数据
				album_id: '', //分类id
				albumsList: [], // 分类栏目对应内容数据
				allAlbumsList: [] , //总收藏内容数据
				windowWidth: 0, //设备屏幕宽度
				dataList: [1,2,3,4,5,6,7],
				scroll: 0, // scroll-view滑动的距离
				currentIndex: 0, // 当前所在分类的索引
				swiperCurrent: 0, // 当前swiper所在的滑块
				itemHeight: 0,
				swiperHeight: 0,
				collectAlbums: '', // 储存收藏专辑id
				collectAlbumList: [], // 储存收藏专辑数据
				collectAlbumPage: 0, // 收藏专辑数
				collectBrowse: '', // 储存声音专辑id
				collectBrowsePage: 0, // 收藏声音数
				collectBrowseList: [], // 储存收藏声音数据
				recommendAlbums: '', // 储存推荐专辑id
				recommendAlbumsList: [], // 储存推荐专辑数据
				recommendAlbumsPage: 0, // 推荐专辑数
				recommendBrowse: '', // 储存推荐声音id
				recommendBrowsePage: 0, // 储存推荐声音数
				recommendBrowseList: [], // 储存推荐声音数据
			}
		},
		components: {
			navTitle,
			albumList,
			browseList
		},
		onLoad() {
			this.init()
			this.getSystemInfo()
		},
		filters: {
			formatPlayCount(play_count) {
				let len = String(play_count).length
				if(len >= 5 && len < 9) {
					return play_count = (play_count / 10000).toFixed(2) + '万'
				}
				else if(len >= 9) {
					return play_count = (play_count / 100000000).toFixed(2) + '亿'
				}
			}
		},
		methods: {
			async init() {
				const {
					xmly,
					player
				} = await initXMLY()
				this.XMclient = xmly
				this.XMplayer = player
				// 获取专辑分类
				this.kindList = await this.getKinds()
				// 获取收藏专辑
				this.albumsList = await this.getAlbumsList(this.albumsPage)
				// 设置swiper高度
				this.getSwiperHeight('.content-item')
				// 获取推荐专辑
				this.selXmlyRecomment('albums')
				// 获取推荐声音
				this.selXmlyRecomment('browse')
				// 批量获取收藏专辑信息
				this.selXmlyCollect()
				// 批量获取收藏声音信息
				this.selXmlyCollectBrowse()
				// 获取轮播图
				// this.carouselList = await this.getBanners()
				// this.swiperLength = this.carouselList.length;
			},
			async getKinds() {
				// 获取开发者分类列表
				const categoriesResult = await this.XMclient.get(XMdeveloper_categoriesURL)
					.then(res => {
						if (res.code === 0) {
							return res.data.operation_categories
						}
					})
				let finalCategor = []
				categoriesResult.map(item => {
					// 筛选开发者分类栏目
					if (item.source === 2) {
						finalCategor.push(item)
					}
				})
				this.album_id = finalCategor[0].id
				return finalCategor
			},
			async getAlbumsList(page) {
				// 获取开发者收藏专辑
				let paramAlbums = {
					page: page
				}
				const albumsResult = await this.XMclient.get(XMdeveloper_albumsURL, paramAlbums)
					.then(res => {
						if (res.code === 0) {
							this.allAlbumsList = res.data.albums //总专辑数
							let result = res.data.albums
							
							let arr = []
							// 筛选对应栏目下的专辑
							result.map(item => {
								if(item.operation_category.id === this.album_id) {
									arr.push(item)
								}
							})
							return arr
						}
						return []
					})
				return albumsResult
			},
			// 获取用户设备信息
			getSystemInfo() {
				uni.getSystemInfo({
					success: res => {
						this.windowWidth = res.windowWidth
					}
				})
			},
			// 点击分类
			changeNav(currentIndex) {
				// 获取当前点击元素的索引
				const index = currentIndex
				this.currentIndex = index
				this.swiperCurrent = index
				// 获取scroll-view中每个item的宽度
				const itemWidth = this.windowWidth * 0.23
				// 需要滚动的临界值(根据自个的需求)
				let scroll = itemWidth * index - itemWidth * 2;
				// 滚动的最大距离
				let maxScroll = (this.kindList.length) * itemWidth
				if (scroll < 0) {
					scroll = 0
				} else if (scroll > maxScroll) {
					scroll = maxScroll
				}
				this.scroll = scroll
			},
			// 动态设置swiper高度
			getSwiperHeight(ele) {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select(ele).boundingClientRect(data => {
						this.itemHeight = data.height
						this.swiperHeight = Math.ceil(this.albumsList.length / 3) * this.itemHeight + 30 + 'px'
					}).exec();
				}, 200)
				
			},
			// 监听swiper的改变
			swiperChange(event) {
				let index = event.detail.current
				this.currentIndex = index
				this.album_id = this.kindList[index].id
				this.changeNav(index)
				let arr = []
				// 筛选对应栏目下的专辑
				this.allAlbumsList.map(item => {
					if(item.operation_category.id === this.album_id) {
						arr.push(item)
					}
				})
				this.albumsList = arr
				this.swiperHeight = Math.ceil(this.albumsList.length / 3) * this.itemHeight + 48 + 'px'
			},
			// 跳转专辑详情页
			goAlbumDetail(content) {
				let id = content.id // 专辑id
				let tag = content.dimension_tags // 专辑标签
				let cover_url_middle = content.cover_url_middle // 专辑封面
				let play_count = content.play_count // 专辑播放次数
				let album_intro = content.album_intro // 专辑简介
				let album_title = content.album_title // 专辑名称
				let tagList = []
				if(tag && tag.length > 0) {
					tag.map(item => {
						tagList.push(item.name)
					})
				}
				let params = {
					id: id,
					tagList: tagList,
					cover_url_middle: cover_url_middle,
					play_count: play_count,
					album_intro: album_intro,
					album_title: album_title
				}
				uni.setStorageSync('album_detail', JSON.stringify(params))
				uni.navigateTo({
					url: '/pagesFavourite/XMradio/albumDetail'
				})
			},
			// 查看推荐
			selXmlyRecomment(type) {
				let params = {
					pageSize: '3',
					currentPage: '1',
					filterItems: {
						type: type
					}
				}
				this.$api.selXmlyRecomment(params).then(res => {
					console.log(res)
					if(type === 'albums') {
						this.recommendAlbumsPage = res.data.totalPage
						let result = res.data.rows
						let arr = []
						if(result && result.length > 0) {
							result.map(item => {
								arr.push(String(item.target_id))
							})
						}
						this.recommendAlbums = arr.join(',')
						console.log(this.recommendAlbums)
						if(arr && arr.length > 0) {
							this.getXmlyCollect('recommendAlbums')
						}
					}else {
						this.recommendBrowsePage = res.data.totalPage
						let result = res.data.rows
						let arr = []
						if(result && result.length > 0) {
							result.map(item => {
								arr.push(String(item.target_id))
							})
						}
						this.recommendBrowse = arr.join(',')
						if(arr && arr.length > 0) {
							this.getXmlyCollectBrowse('recommendBrowse')
						}
					}
				})
			},
			// 查看我收藏的专辑
			selXmlyCollect() {	
				let params = {
					pageSize:"3",
					currentPage:"1",
					filterItems: {
						type: 'albums',
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selXmlyCollect(params).then(res => {
					let result = res.data.rows
					this.collectAlbumPage = res.data.totalPage
					let arr = []
					if(result && result.length > 0) {
						result.map(item => {
							arr.push(item.target_id)
						})
					}
					this.collectAlbums = arr.join(',')
					if(arr && arr.length > 0) {
						this.getXmlyCollect('collectAlbums')
					}
					
				})
			},
			// 批量获取收藏专辑信息
			getXmlyCollect(type) {
				let params = {
					ids: ''
				}
				if(type === 'collectAlbums') {
					params.ids = this.collectAlbums
				}else {
					params.ids = this.recommendAlbums
				}
				this.XMclient.get(XMbatch_albumsURL, params).then(res => {
					if(res.code === 0) {
						if(type === 'collectAlbums') {
							this.collectAlbumList = res.data
						}else {
							this.recommendAlbumsList = res.data
							console.log(this.recommendAlbumsList)
						}
					}
				})
			},
			// 查看我收藏的声音
			selXmlyCollectBrowse() {
				let params = {
					pageSize:"3",
					currentPage:"1",
					filterItems: {
						type: 'browse',
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selXmlyCollect(params).then(res => {
					let result = res.data.rows
					this.collectBrowsePage = res.totalPage
					this.collectBrowsePage = res.data.totalPage
					let arr = []
					if(result && result.length > 0) {
						result.map(item => {
							arr.push(item.target_id)
						})
					}
					this.collectBrowse = arr.join(',')
					console.log(this.collectBrowse)
					this.getXmlyCollectBrowse('collectBrowse')
					
				})
			},
			// 批量获取收藏声音信息
			getXmlyCollectBrowse(type) {
				let params = {
					ids: ''
				}
				if(type === 'collectBrowse') {
					params.ids = this.collectBrowse
				}else {
					params.ids = this.recommendBrowse
				}
				this.XMclient.get(MXbatch_browseURL, params).then(res => {
					if(res.code === 0) {
						if(type === 'collectBrowse') {
							this.collectBrowseList = res.data.tracks
						}else {
							this.recommendBrowseList = res.data.tracks
						}
					}
				})
			},
			// 查看更多页面
			checkMore(payload) {
				let url = ''
				if(payload.from === 'browse' || payload.from === 'recommendBrowse') {
					url = '/pagesFavourite/XMradio/browse-more?from='+payload.from
				}else {
					url = '/pagesFavourite/XMradio/album-more?from='+payload.from
				}
				uni.navigateTo({
					url: url
				})
			},
			// 跳转播放界面
			goPlay(payload) {
				console.log(payload)
				let browse_info = payload.item
				let params = {
					album_id: browse_info.id,
					duration: browse_info.duration,
					title: browse_info.track_title,
					cover_url_middle: browse_info.cover_url_middle,
					album_title: browse_info.subordinated_album.album_title,
					id: browse_info.subordinated_album.id,
					playIndex: payload.playIndex
				}
				console.log(params)
				uni.setStorageSync('browse_detail', JSON.stringify(params))
				uni.navigateTo({
					url: '/pagesFavourite/XMradio/player?from='+payload.from
				})
			},










		
			// async getAlbumsDetail(album_id, page) {
			// 	// 获取专辑详情信息
			// 	let paramAlbumDetail = {
			// 		album_id: album_id,
			// 		page: page,
			// 	}
			// 	const albumsDetailResult = await this.XMclient.get(XMalbums_browseURL, paramAlbumDetail)
			// 	if (albumsDetailResult.code === 0) {
			// 		// console.log(albumsDetailResult)
			// 		return albumsDetailResult
			// 	}
			// 	return null
			// },
			// async goAlbumDetail(id) {
			// 	await this.getAlbumsDetail(id, 1)
			// },
			// async getBanners() {
			// 	// 获取开发者焦点图
			// 	const bannersResult = await this.XMclient.get(XMdeveloper_bannersURL)
			// 		.then(res => {
			// 			if(res.code === 0) {
			// 				return res.data.banners
			// 			}
			// 			return []
			// 		})
			// 	return bannersResult
			// },
			// 监听轮播图发生改变
			// swiperChange(e) {
			// 	const index = e.detail.current;
			// 	this.swiperCurrent = index;
			// },
			// 点击swiper
			// toTargetUrl(item) {
			// 	let target = item.target
			// 	console.log(target)
			// },
		}
	}
</script>
<style>
	page {
		background: #EBF8FF;
		padding-bottom: 24rpx;
	}
</style>
<style scoped>
	/* 背景 */
	.bg {
		width: 100%;
		height: 320rpx;
		background-image: linear-gradient(to bottom, #7BCFEC, #9BE6E7);
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
	}
	/* 我喜爱的专辑start */
	.like-album {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-bottom: 24rpx;
		
		
	}
	.like-album .album {
		box-sizing: border-box;
		background: #fff;
		padding: 0 30rpx;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16)
	}
	
	/* 我喜爱的专辑end */
	/* 专辑列表start */
	.album {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	.album .list {
		box-sizing: border-box;
		background: #fff;
		padding: 0 42rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0, 0, 0, 0.16);
		border-radius: 30rpx;
	}
	.album .album-nav {
		box-sizing: border-box;
		padding: 0 8rpx;
		font-size: 28rpx;
		line-height: 80rpx;
	}
	.album .album-nav scroll-view {
		box-sizing: border-box;
		width: 100%;
		white-space: nowrap;
	}
	.album .album-nav scroll-view view {
		box-sizing: border-box;
		display: inline-block;
		width: 23%;
		text-align: center;
	}
	.album .album-nav scroll-view text {
		border-bottom: 10rpx solid #F9F9F9;
		padding-bottom: 8rpx;
	}
	.album .album-nav scroll-view .active {
		font-weight: 700;
		color: #2AAEC4;
	}
	.album .album-nav .border-color {
		border-bottom: 10rpx solid #BCEDF5;
	}
	.album .album-content swiper {
		box-sizing: border-box;
		padding: 24rpx 0;
	}
	.album .album-content swiper-item {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}
	.album .album-content .content-item {
		width: 180rpx;
		box-sizing: border-box;
		margin-right: 38rpx;
		margin-bottom: 26rpx;
		display: inline-block;
	}
	.album .album-content .content-item:nth-child(3n) {
		margin-right: 0;
	}
	.album .album-content swiper-item .cover {
		box-sizing: border-box;
		position: relative;
	}
	.album .album-content .play-count {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 18rpx;
		color: #fff;
		background: rgba(128,128,128,0.64);
		display: flex;
		align-items: center;
		padding: 4rpx 12rpx;
		border-bottom-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}
	
	.album .album-content swiper-item .cover image {
		width: 180rpx;
		height: 180rpx;
		display: block;
	}
	.album .album-content swiper-item .play-count image {
		width: 16rpx;
		height: 16rpx;
		flex-shrink: 0;
		margin-right: 8rpx;
	}
	.album .album-content swiper-item .title {
		font-size: 24rpx;
		margin-top: 12rpx;
		position: relative;
		box-sizing: border-box;
		text-indent: 40rpx;
		overflow: hidden;
		/* display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden; */
	/* 	overflow : hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical; */
	}
	.album .album-content swiper-item .title .title-text {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.album .album-content swiper-item .title image {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	/* 专辑列表end */




	/* .carousel {
	width: 100%;
	height: 450upx;
}
.carousel .carousel-item {
	height: 100%;
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
} */
</style>
