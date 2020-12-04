<template>
	<view>
		<text>XMradio</text>
	</view>
</template>

<script>
	import { initXMLY } from './XM.js'
	import { XMcategoriesURL } from './XM.js'
	
	export default {
		data() {
			return {
				XMclient: null,
				XMplayer: null,
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
				
				// 获取分类列表
				const categoriesResult = await this.XMclient.get(XMcategoriesURL)
				if(categoriesResult.code === 0) {
					console.log(categoriesResult)
				}
			}
		}
	}
</script>

<style>

</style>
