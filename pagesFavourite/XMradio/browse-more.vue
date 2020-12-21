<template>
	<view>
		<view class="like-album">
			<view class="album">
				<browse-list :collectBrowseList="collectBrowseList" @goPlay="goPlay"></browse-list>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		initXMLY
	} from './XM.js'
	import {
		MXbatch_browseURL
	} from './XM.js'
	import browseList from '../components/browse-list.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				XMclient: '',
				XMplayer: '',
				collectBrowseList: [],
				collectBrowsePage: 0,
				pageSize: '10',
				currentPage: 1
			}
		},
		components: {
			browseList
		},
		onLoad() {
			this.init()
		},
		onReachBottom() {
			if(this.collectBrowsePage > this.collectBrowseList.length) {
				this.currentPage = this.currentPage + 1
				this.selXmlyCollectBrowse()
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
				// 批量获取收藏声音信息
				this.selXmlyCollectBrowse()
			},
			// 查看我收藏的声音
			selXmlyCollectBrowse() {
				let params = {
					pageSize: this.pageSize,
					currentPage: String(this.currentPage),
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
					this.getXmlyCollectBrowse()
				})
			},
			// 批量获取收藏声音详情
			getXmlyCollectBrowse() {
				let params = {
					ids: this.collectBrowse
				}
				this.XMclient.get(MXbatch_browseURL, params).then(res => {
					if(res.code === 0) {
						this.collectBrowseList = [...res.data.tracks, ...this.collectBrowseList]
						console.log(this.collectBrowseList)
					}
				})
			},
			// 跳转播放界面
			goPlay(payload) {
				let browse_info = payload.item
				console.log(browse_info)
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
					url: '/pagesFavourite/XMradio/player?from=browse'
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
