<template>
	<view>
		<text>XMradio</text>
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
				
				// 获取开发者焦点图
				const bannersResult = await this.XMclient.get(XMdeveloper_bannersURL)
				if(bannersResult.code === 0) {
					console.log(bannersResult)
				}
				
				// 获取开发者分类列表
				const categoriesResult = await this.XMclient.get(XMdeveloper_categoriesURL)
				if(categoriesResult.code === 0) {
					console.log(categoriesResult)
				}

				// 获取专辑详情信息
				let paramAlbumDetail = {
					album_id: 2811252,
					page: 1,
				}
				const albumsDetailResult = await this.XMclient.get(XMalbums_browseURL, paramAlbumDetail)
				if(albumsDetailResult.code === 0) {
					console.log(albumsDetailResult)
				}				
				
			}
		}
	}
</script>

<style>

</style>
