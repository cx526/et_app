<template>
	<view>
		<!--
			<text>XMradio</text>
			<button @tap="play">play</button>
			<button @tap="pause">pause</button>
			<button @tap="stop">stop</button>
		-->
		<!--
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
		
		<view>
			<view v-for="(item, i) in albumsList" :key="i" style="height: 200upx; background: #00B7CC; color: #fff; margin-top: 30upx;" @tap="goAlbumDetail(item.id)">
				<image :src="item.cover_url_middle" style="height: 180upx; width: 180upx;"/>
				<text>{{item.album_title}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { initXMLY } from './XM.js'
	import { 
		XMdeveloper_albumsURL,
		XMdeveloper_columnsURL,
		// XMdeveloper_bannersURL,
		XMdeveloper_categoriesURL,
		XMalbums_browseURL,
	} from './XM.js'
	
	export default {
		data() {
			return {
				XMclient: null,
				XMplayer: null,
				albumsPage: 1,
				columnPage: 1,
				albumsList: [],
				kindList: [],
				// swiperCurrent: 0,
				// swiperLength: 0,
				// carouselList: []
			}
		},
		components: {

		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				const {xmly, player} = await initXMLY()
				this.XMclient = xmly
				this.XMplayer = player
				// 获取专辑分类
				this.kindList = await this.getKinds()
				console.log(this.kindList)
				// 获取收藏专辑
				this.albumsList = await this.getAlbumsList(this.albumsPage)
				console.log(this.albumsList)
				console.log('ok')
				// 获取轮播图
				// this.carouselList = await this.getBanners()
				// this.swiperLength = this.carouselList.length;
			},
			async getKinds() {
				// 获取开发者分类列表
				const categoriesResult = await this.XMclient.get(XMdeveloper_categoriesURL)
					.then(res => {
						if(res.code === 0) {
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
				return finalCategor
			},
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
			async getAlbumsList(page) {
				// 获取开发者收藏专辑
				let paramAlbums = {
					page: page
				}
				const albumsResult = await this.XMclient.get(XMdeveloper_albumsURL, paramAlbums)
					.then(res => {
						if (res.code === 0) {
							return res.data.albums
						}
						return []
					})
				return albumsResult
			},
			async getAlbumsDetail(album_id, page) {
				// 获取专辑详情信息
				let paramAlbumDetail = {
					album_id: album_id,
					page: page,
				}
				const albumsDetailResult = await this.XMclient.get(XMalbums_browseURL, paramAlbumDetail)
				if (albumsDetailResult.code === 0) {
					// console.log(albumsDetailResult)
					return albumsDetailResult
				}
				return null
			},
			play() {
				console.log('play')
				this.XMplayer.setPlaylist([28780230])
				this.XMplayer.playByIndex(0)
			},
			pause() {
				console.log('pause')
				this.XMplayer.pause()
			},
			stop() {
				console.log('stop')
				this.XMplayer.stop()
			},
			async goAlbumDetail(id) {
				await this.getAlbumsDetail(id, 1)
			},
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

<style scoped>
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
</style>
