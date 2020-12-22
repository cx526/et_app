<template>
	<view>
		<view class="like-album">
			<view class="album">
				<album-list :collectAlbumList="collectAlbumList" @goAlbumDetail="goAlbumDetail"></album-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		initXMLY
	} from './XM.js'
	import {
		XMbatch_albumsURL
	} from './XM.js'
	import albumList from '../components/album-list.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				collectAlbumList: [],
				XMclient: '',
				XMplayer: '',
				collectAlbums: '',
				collectAlbumList: [],
				recommendAlbums: '',
				recommendAlbumList: [],
				pageSize: '12',
				currentPage: 1,
				totalPage: 0,
				from: '', // 标记从哪个页面进入
			}
		},
		components: {
			albumList
		},
		onLoad(options) {
			console.log(options)
			this.from = options.from
			this.init()
		},
		onReachBottom() {
			if(this.totalPage > this.collectAlbumList.length) {
				this.currentPage = this.currentPage + 1
				if(this.from === 'collectAlbums') {
					// 批量获取收藏专辑信息
					this.selXmlyCollect()
				}else {
					// 获取推荐专辑
					this.selXmlyRecomment()
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
				if(this.from === 'collectAlbums') {
					// 批量获取收藏专辑信息
					this.selXmlyCollect()
				}else {
					// 获取推荐专辑
					this.selXmlyRecomment()
				}
				
	
			},
			// 查看我收藏的专辑
			selXmlyCollect() {
				let params = {
					pageSize: this.totalPage,
					currentPage: String(this.currentPage),
					filterItems: {
						type: 'albums',
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selXmlyCollect(params).then(res => {
					let result = res.data.rows
					this.totalPage = res.data.totalPage
					let arr = []
					if(result && result.length > 0) {
						result.map(item => {
							arr.push(item.target_id)
						})
					}
					this.collectAlbums = arr.join(',')
					this.getXmlyCollect()
				})
			},
			// 获取推荐专辑
			selXmlyRecomment() {
				let params = {
					pageSize: this.pageSize,
					currentPage: String(this.currentPage),
					filterItems: {
						type: 'albums'
					}
				}
				this.$api.selXmlyRecomment(params).then(res => {
					console.log(res)
						this.totalPage = res.data.totalPage
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
							this.getXmlyCollect()
						}
				})
			},
			// 批量获取收藏专辑信息
			getXmlyCollect() {
				let params = {
					ids: ''
				}
				if(this.from === 'collectAlbums') {
					params.ids = this.collectAlbums
				}else {
					params.ids = this.recommendAlbums
				}
				
				this.XMclient.get(XMbatch_albumsURL, params).then(res => {
					console.log(res)
					if(res.code === 0) {
						this.collectAlbumList = [...this.collectAlbumList, ...res.data]
					}
				})
			},
			// 跳转专辑详情
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
			
			
		}
	}
</script>
<style>
	page {
		background: #EBF8FF;
		padding: 24rpx 0;
	}
</style>
<style scoped>
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
</style>
