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
				const albumsResult = await this.XMclient.get(XMdeveloper_albumsURL + `&page=${this.albumsPage}`)
				if(albumsResult.code === 0) {
					console.log(albumsResult)
				}
				
				// 获取开发者听单
				const columnResult = await this.XMclient.get(XMdeveloper_columnsURL + `&page=${this.columnPage}`)
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
			}
		}
	}
</script>

<style>

</style>
