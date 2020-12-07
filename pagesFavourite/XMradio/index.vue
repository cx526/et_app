<template>
	<view>
		<text>XMradio</text>
		<button @tap="play">play</button>
		<button @tap="pause">pause</button>
		<button @tap="stop">stop</button>
		
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
		XMdeveloper_bannersURL,
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
				// 获取开发者收藏专辑
				let paramAlbums = {
					page: this.albumsPage
				}
				const albumsResult = await this.XMclient.get(XMdeveloper_albumsURL, paramAlbums)
				if(albumsResult.code === 0) {
					console.log(albumsResult)
				}
				
				// 获取开发者听单
				let paramCol = {
					page: this.columnPage
				}
				const columnResult = await this.XMclient.get(XMdeveloper_columnsURL, paramCol)
				if(columnResult.code === 0) {
					console.log(columnResult)
				}
				
				this.albumsList = await this.getAlbumsList(this.albumsPage)
				console.log(this.albumsList)

				
				this.kindList = await this.getKinds()
				console.log(this.kindList)
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
					if (item.source === 2) {
						finalCategor.push(item)
					}
				})
				return finalCategor
			},
			async getBanners() {
				// 获取开发者焦点图
				const bannersResult = await this.XMclient.get(XMdeveloper_bannersURL)
				if(bannersResult.code === 0) {
					// console.log(bannersResult)
					return bannersResult
				}
				return null
			},
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
			}
		}
	}
</script>

<style>

</style>
