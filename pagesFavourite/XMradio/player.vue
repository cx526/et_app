<template>
	<view>
		<!-- 背景图 -->
		<!-- <image :src="$aliImage + 'player/background1.png'" mode="widthFix" class="bg"></image> -->
		<view class="bg" style="width: 700rpx;">
			<image :src="$aliImage+'player-bg.png'" mode="widthFix" :style="{'left': bgScrollLeft + 'rpx'}" @load="imgLoad"></image>
		</view>
		<!-- 专辑详情start -->
		<view class="album-detail">
			<image :src="cover_url_middle" class="cover"></image>
			<view class="title">
				<!-- {{ title }} -->
				<uni-notice-bar
				scrollable="true" 
				single="true" 
				:text="title"
				backgroundColor="transparent" 
				color="#000" 
				:single="true">
				</uni-notice-bar>
			</view>
			<view class="explain">
				<text class="subTitle">{{ album_title }}</text>
				<text class="collect" @tap="collect" :class="isCollect ? ' active' : '' ">收藏</text>
			</view>
		</view>
		<!-- 专辑详情end -->
		<!-- 自定义播放器start -->
		<view class="player-box">
			<view class="play">
				<image :src="$aliImage + 'xmly-back.png'" mode="widthFix" style="margin-right: 18rpx;" @tap="back"></image>
				<view class="plan" @tap="forwardPercent">
					<!-- 已经走的进度 -->
					<view class="percent" :style="{'width': percent + 'rpx'}"></view>
					<image :src="$aliImage + 'xmly-play-precent.png'" :style="{'left' : scrollLeft + 'rpx'}" @touchstart.stop="dragStart" @touchend.stop="drapEnd" @touchmove.stop="dragMove"></image>
				</view>
				<image :src="$aliImage + 'xmly-forward.png'" mode="widthFix" style="margin-left: 18rpx;" @tap="forward"></image>
				<view class="time">
					<text>{{ currentDuration | formatTime }}</text>
					<text>{{ duration | formatTime }}</text>
				</view>
			</view>
		</view>
		<!-- 自定义播放器end -->
		<!-- 播放选项start -->
		<view class="play-options">
			<view class="options">
				<view class="between" @tap="changePlayMode">
					<block v-if="playMode == 1">
						<image :src="$aliImage + 'xmly-play-way-01.png'" mode=""></image>
						<text>顺序播放</text>
					</block>
					<block v-else>
						<image :src="$aliImage + 'xmly-play-way-02.png'" mode=""></image>
						<text>单曲循环</text>
					</block>
				</view>
				<image :src="$aliImage + 'xmly-play-next.png'" mode="" class="next" style="transform: rotateY(180deg);" @tap="playPrev()"></image>
				<view class="center" @tap="play">
					<image :src="$aliImage + 'xmly-play-btn.png'" mode="widthFix" v-if="isShow"></image>
					<image :src="$aliImage + 'xmly-pause-btn.png'" mode="widthFix" v-else></image>
				</view>
				<image :src="$aliImage + 'xmly-play-next.png'" mode="" class="next" @tap="playNext()"></image>
				<view class="between">
					<image :src="$aliImage + 'xmly-play-list.png'" mode="" @tap="open"></image>
					<text>播放列表</text>
				</view>
			</view>
		</view>
		<!-- 播放选项end -->
		<!-- 播放列表弹窗start -->
		<popup v-model="showModel" position="bottom">
			<scroll-view class="pop-box" :scroll-y="true" :style="{'max-height': sysHeight * 0.5 + 'px'}" @scrolltolower="loadMore" :scroll-top="100">
				<block v-for="(item, index) in videoList" :key="index">
					<view class="item" @tap="changeVideo(item, index)">
						<text class="sort">{{ index + 1 }}</text>
						<text :class="item.id == album_id ? 'lineActive' : ''" class="title">{{ item.track_title }}</text>
						<text class="duration">{{ item.duration | formatTime }}</text>
					</view>
				</block>
			</scroll-view>
		</popup>
		<!-- 播放列表弹窗end -->
		
		
		<!-- <view class="player-main" :style="'height: ' + sysHeight + 'px;'">
			<view class="player-animate-bg" :style="'background-image: url(' + $aliImage + bgAnimateImg + ')'"></view>
		</view> -->
	</view>
</template>

<script>
	const winHeight = uni.getSystemInfoSync().windowHeight
	import { initXMLY } from './XM.js'
	import { XMalbums_browseURL, MXbatch_browseURL } from './XM.js'
	import Popup from '@/components/lvv-popup/lvv-popup.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				$aliImage: this.$aliImage,
				cover_url_middle: '', // 专辑封面
				percent: 0, 
				id: '', // 当前音频所在专辑id
				album_id: '', // 播放音频id
				duration: 0, //	播放音频总时长
				currentDuration: 0, // 当前播放音频进度
				title: '', // 当前播放音频名称
				album_title: '', // 当前音频所在专辑的名称
				XMclient: '',
				XMplayer: '', 
				isShow: true,
				scrollLeft: -10,
				planOffsetWidth: 0,
				planOffsetLeft: 0,
				touchStartX: 0,
				touchMoveX: 0,
				touchEndX: 0,
				showModel: false, // 控制弹窗是否显示
				sysHeight: winHeight,
				page: 1, // 请求页码
				videoList: [], // 音频列表
				playIndex: 0,
				totalPage: 0 , // 总页码
				playList: [], // 播放列表
				currentPlayIndex: '', // 当前正在播放音屏的索引
				playMode: 1, // 播放模式 1 顺序播放 2 单曲循环
				isCollect: false, // 是否有收藏
				from: '', // 标识从哪里进入播放页
				collectBrowse: '', // 储存收藏声音id
				imgWidth: 0,
				bgScrollLeft: 0
				// bgAnimate: 'player/background',
				// bgAnimateImg: '',
				// bgAnimateImgArray: [],
				// bgAnimateIndex: 1
			}
		},
		components: {
			Popup,
			uniNoticeBar
		},
		async onLoad(options) {
			this.from = options.from
			console.log(this.from)
			this.getWinRect()
			this.selXmlyCollect()
			await this.init() // 初始化插件
			this.getEleRect('.plan')
			this.timeUpdate() // 监听播放进度事件
			this.listenChangeSound() // 监听音频改变事件
			this.listenEnd() // 监听音频结束事件
			this.XMplayer.setPlayMode('order') // 默认顺序播放
			// 从我喜爱声音进入
			if(options.from === 'browse' || options.from === 'recommendBrowse') {
				let browse_detail = JSON.parse(uni.getStorageSync('browse_detail'))
				this.album_id = browse_detail.album_id
				this.duration = browse_detail.duration
				this.title = browse_detail.title
				this.cover_url_middle = browse_detail.cover_url_middle
				this.album_title = browse_detail.album_title
				this.id = Number(browse_detail.id)
				this.page = Math.ceil(browse_detail.playIndex / 10) > 0 ? Math.ceil(browse_detail.playIndex / 10):1
				this.currentPlayIndex = this.playIndex % 10 // 当前音频所在索引
				if(options.from === 'browse') {
					this.selXmlyCollectBrowse()
				}else {
					this.selXmlyRecomment()
				}
				
			}else {
				this.album_id = options.id // 当前播放音频id
				this.duration = options.duration // 当前播放音频总时长
				this.title = options.title // 当前播放音频标题
				this.playIndex = options.playIndex
				let album_detail = JSON.parse(uni.getStorageSync('album_detail'))
				this.cover_url_middle = album_detail.cover_browse_url_middle // 当前音频所在专辑封面
				this.album_title = album_detail.album_title // 当前音频所在专辑的标题
				this.id = Number(album_detail.id) // 当前音频所在专辑id
				// 当前音频所在接口的页码
				this.page = Math.ceil(options.playIndex / 20) > 0 ? Math.ceil(options.playIndex / 20):1 
				this.currentPlayIndex = this.playIndex % 20 // 当前音频所在索引
				// 获取播放列表
				await this.getAlbumsDetail(this.id, this.page)
			}
			

		},
		onUnload() {
			this.XMplayer.pause()
			this.XMplayer.off('timeupdate').off('end').off('change.sound') // 移除监听事件
		},
		filters: {
			formatTime(time) {
				if(time == 0) { return '00:00' }
				let minutes = parseInt(time / 60) > 9 ? parseInt(time / 60) : '0' + (parseInt(time / 60))
				let second = parseInt(time % 60) > 9 ? parseInt(time % 60) : '0' + (parseInt(time % 60))
				return minutes +':'+ second
			}
		},
		methods: {
			imgLoad(event) {
				let maxWidth = event.detail.width
				let distance = maxWidth / 12
				let step = 1
				setInterval(() => {
					if(Math.abs(distance * step) < maxWidth) {
						this.bgScrollLeft = -(distance * step)
						step = step + 1
					}else {
						step = 1
					}
				}, 800)
			},
			// 获取屏幕宽度
			getWinRect() {
				uni.getSystemInfo({
					success: res => {
						this.imgWidth = res.windowWidth - 25
					}
				})
			},
			// 初始化插件
			async init() {
				const { xmly, player } = await initXMLY()
				this.XMclient = xmly
				this.XMplayer = player
			},
			//  播放
			play() {
				let id = this.album_id
				let status = this.XMplayer.getPlayState()
				if(status === 'ready') {
					this.XMplayer.play(id)
					this.isShow = false
				}else if(status === 'playing') {
					if(this.duration - parseInt(this.currentDuration) < 5) {
						this.XMplayer.play()
						this.scrollLeft = 0
						this.isShow = false
						return
					}
					this.XMplayer.pause()
					this.isShow = true
				}else {
					// 继续上次暂停地方播放
					this.XMplayer.play()
					this.isShow = false
				}
				// this.timeUpdate()
			},
			// 监听播放事件
			timeUpdate() {
				this.XMplayer.on('timeupdate', (position, sound) => {
					this.percent = sound / this.duration * 500
					if(this.scrollLeft >= 490) {
						this.scrollLeft = 490
					}else {
						this.scrollLeft = sound / this.duration * 500 - 10
					}	
					this.currentDuration = sound
				})
			},
			// 获取元素高度
			getEleRect(ele) {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select(ele).boundingClientRect(data => {
						this.planOffsetWidth = data.width
						this.planOffsetLeft = data.left
					}).exec();
				}, 200)
				
			},
			// 监听播放结束事件
			listenEnd() {
				this.XMplayer.on('end', sound => {
					this.isShow = false
					this.scrollLeft = 0
					this.percent = -10
				})
			},
			// 监听音频改变事件
			listenChangeSound() {
				this.XMplayer.on('change.sound', (sound) => {
					let index = this.XMplayer.getCurrentIndex()
					console.log(index)
					this.album_id = this.playList[index]
					this.title = this.videoList[index].track_title
					this.duration = this.videoList[index].duration
					this.isShow = false
					this.scrollLeft = 0
				})
			},
			// 切换上一首
			playPrev() {
				let status = this.XMplayer.getPlayState()
				if(status === 'ready') {
					if(this.currentPlayIndex == 0) { return }
					this.album_id = this.playList[this.currentPlayIndex - 1]
					this.title = this.videoList[this.currentPlayIndex - 1].track_title
					this.duration = this.videoList[this.currentPlayIndex - 1].duration
					this.cover_url_middle = this.videoList[this.currentPlayIndex - 1].cover_url_middle
					if(this.from === 'browse') {
						this.album_title = this.videoList[this.currentPlayIndex - 1].subordinated_album.album_title
						
					}
					this.currentPlayIndex = this.currentPlayIndex - 1
					
					return
				}
				this.XMplayer.prev()
				let index = this.XMplayer.getCurrentIndex()
				// 当前播放的是第一首
				if(index == 0) { index = this.videoList.length }
				this.album_id = this.playList[index-1]
				this.title = this.videoList[index-1].track_title
				this.duration = this.videoList[index-1].duration
				this.cover_url_middle = this.videoList[index-1].cover_url_middle
				this.isShow = false
				this.scrollLeft = 0
				if(this.from === 'browse' || this.from === 'recommendBrowse') {
					this.album_title = this.videoList[index-1].subordinated_album.album_title
					
				}
			},
			// 切换下一首
			playNext() {
				let status = this.XMplayer.getPlayState()
				if(status === 'ready') {
					if(this.currentPlayIndex == this.videoList.length - 1) { return }
					this.album_id = this.playList[this.currentPlayIndex + 1]
					this.title = this.videoList[this.currentPlayIndex + 1].track_title
					this.duration = this.videoList[this.currentPlayIndex + 1].duration
					this.cover_url_middle = this.videoList[this.currentPlayIndex + 1].cover_url_middle
					if(this.from === 'browse' || this.from === 'recommendBrowse') {
						this.album_title = this.videoList[this.currentPlayIndex + 1].subordinated_album.album_title
						
					}
					this.currentPlayIndex = this.currentPlayIndex + 1
					return
				}
				this.XMplayer.next()
				let index = this.XMplayer.getCurrentIndex()
				// 当前播放的是最后一首
				if(index + 1 == this.videoList.length) { index = -1 }
				this.album_id = this.playList[index+1]
				this.title = this.videoList[index+1].track_title
				this.duration = this.videoList[index+1].duration
				this.cover_url_middle = this.videoList[index+1].cover_url_middle
				console.log(index+1)
				console.log(this.cover_url_middle)
				this.isShow = false
				this.scrollLeft = 0
				if(this.from === 'browse' || this.from === 'recommendBrowse') {
					this.album_title = this.videoList[index+1].subordinated_album.album_title
					
				}
			},
			// 快进 15s
			forward() {
				let second = this.currentDuration + 15
				if(second >= this.duration) { return }
				this.XMplayer.seek(second)
			},
			// 后退 15s
			back() {
				let second = this.currentDuration - 15
				if(second < 0) { return }
				this.XMplayer.seek(second)
			},
			// 快进
			forwardPercent(event) {
				let x = event.detail.x // 前进的距离
				let percent = x - this.planOffsetLeft // 进度条
				let second = parseInt(percent / this.planOffsetWidth * this.duration)
				// this.percent = second / this.duration * 500
				// this.currentDuration = second
				this.XMplayer.seek(second)
			},
			// 拖拽开始
			dragStart(event) {
				this.touchStartX = event.touches[0].clientX
			},
			// 拖拽过程
			dragMove(event) {
				this.touchMoveX = event.touches[0].clientX	
			},
			// 拖拽结束
			drapEnd(event) {
				let percent = parseInt((this.currentDuration / this.duration) * this.planOffsetWidth) // 原先走过的秒数
				let x = Math.abs(this.touchMoveX - this.touchStartX) // 拖拽的距离
				let distance = 0 // 实际距离
					if(this.touchMoveX - this.touchStartX < 0) {
						distance = percent - x
					}else {
						distance = percent + x
					}
					let second = parseInt(distance / this.planOffsetWidth * this.duration)
					this.XMplayer.seek(second)
			},
			// 获取当前专辑播放声音
			getAlbumsDetail(album_id, page) {
				// 获取专辑详情信息
				let paramAlbumDetail = {
					album_id: album_id,
					page: page
				}
				this.XMclient.get(XMalbums_browseURL, paramAlbumDetail).then(res => {
					if(res.code === 0) {
						let result = res.data.tracks
						this.totalPage = res.data.total_page
						this.videoList = [...this.videoList, ...result]
						this.setPlayList(result)
					}
				})	
			},
			// 加载更多
			loadMore() {
				if(this.from === 'browse' || this.from === 'recommendBrowse') {
					let realityCount = this.totalPage - (this.page - 1) * 10
					if((this.videoList.length) < realityCount) {
						this.page = this.page + 1
						if(this.from === 'browse') {
							this.selXmlyCollectBrowse()
						}else {
							this.selXmlyRecomment()
						}
						
					}
				}else {
					if(this.page <= this.totalPage) {
						this.page = this.page + 1
						this.getAlbumsDetail(this.id, this.page)
					}
				}
				
			},
			// 设置播放列表id
			setPlayList(arr) {
				arr.map(item => {
					this.playList.push(Number(item.id))
				})
				this.XMplayer.setPlaylist(this.playList) // 设置播放列表
			},
			// 打开播放列表
			open() {
				this.showModel = true
			},
			// 切换音屏
			changeVideo(item, index) {
				let id = item.id
				this.album_id = id
				this.duration = item.duration
				this.title = item.track_title
				this.cover_url_middle = item.cover_url_middle
				this.showModel = false
				this.isShow = false
				this.scrollLeft = 0
				if(this.from === 'browse' || this.from === 'recommendBrowse') {
					this.album_title = item.subordinated_album.album_title
					
				}
				// this.XMplayer.play(id)
				this.XMplayer.playByIndex(index)
			},
			// 切换播放模式
			changePlayMode() {
				this.playMode == 1 ? this.playMode = 2 : this.playMode = 1
				if(this.playMode == 1) {
					this.XMplayer.setPlayMode('order')
				}else {
					this.XMplayer.setPlayMode('loop')
				}
			},
			// 收藏声音
			collect() {
				let params = {
					type: 'browse',
					target_id: String(this.album_id),
					custom_id: String(this.userInfo.id)
				}
				this.$api.addOrDelXmlyCollect(params).then(res => {
					if(res.data.status === 'ok') {
						let title = ''
						if(this.isCollect) {
							title = '取消收藏成功'
						}else {
							title = '收藏成功'
						}
						uni.showToast({
							title: title,
							icon: 'none',
							duration: 1500,
							success: () =>{
								// 更新收藏状态
								this.selXmlyCollect()
							}
						})
					}
					
				})
			},
			// 查看声音是否被收藏
			selXmlyCollect() {
				let params = {
					filterItems: {
						type: 'browse',
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selXmlyCollect(params).then(res => {
					let result = res.data.rows
					let arr = []
					if(result && result.length > 0) {
						result.map(item => {
							arr.push(Number(item.target_id))
						})
					}
					if(arr.includes(Number(this.album_id))) {
						this.isCollect = true
					}else {
						this.isCollect = false
					}
				})
			},
			// 查看我收藏的声音
			selXmlyCollectBrowse() {
				let params = {
					pageSize: '10',
					currentPage: String(this.page),
					filterItems: {
						type: 'browse',
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selXmlyCollect(params).then(res => {
					this.totalPage = res.data.totalPage
					let result = res.data.rows
					this.collectBrowsePage = res.data.totalPage
					let arr = []
					if(result && result.length > 0) {
						result.map(item => {
							arr.push(item.target_id)
						})
					}
					this.collectBrowse = arr.join(',')
					this.getXmlyCollectBrowse()
				})
			},
			// 查看推荐声音
			selXmlyRecomment() {
				let params = {
					pageSize: '10',
					currentPage: String(this.page),
					filterItems: {
						type: 'browse'
					}
				}
				this.$api.selXmlyRecomment(params).then(res => {
					console.log(res)
						this.collectBrowsePage = res.data.totalPage
						let result = res.data.rows
						let arr = []
						if(result && result.length > 0) {
							result.map(item => {
								arr.push(String(item.target_id))
							})
						}
						this.collectBrowse = arr.join(',')
						if(arr && arr.length > 0) {
							this.getXmlyCollectBrowse()
						}
				})
			},
			// 批量获取收藏声音详情
			getXmlyCollectBrowse() {
				let params = {
					ids: this.collectBrowse
				}
				this.XMclient.get(MXbatch_browseURL, params).then(res => {
					if(res.code === 0) {
						let result = res.data.tracks
						this.videoList = [...this.videoList, ...result]
						this.setPlayList(result)
					}
				})
			},
			
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		padding: 30rpx 25rpx 0 25rpx;
		background: #EBF8FF;
	}
</style>
<style scoped>

	/* 背景图 */
	/* .bg {
		position: relative;
		width: 100%;
	} */
	.bg {
		position: absolute;
		left: 25rpx;
		top: 30rpx;
		height: 1177rpx;
		overflow: hidden;
	}
	.bg image {
		width: 8400rpx;
		position: relative;
	}
	/* 专辑详情start */
	.album-detail {
		position: absolute;
		width: 450rpx;
		left: 50%;
		top: 140rpx;
		transform: translateX(-50%);
	}
	.album-detail .cover {
		width: 450rpx;
		height: 450rpx;
		display: block;
	}
	.album-detail .title {
		font-weight: 700;
		font-size: 28rpx;
		text-align: center;
		margin-top: 36rpx;
		margin-bottom: 18rpx;
	}
	.album-detail .explain {
		font-size: 24rpx;
		color: #B3B3B3;
		text-align: center;
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.album-detail .explain .subTitle {
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		justify-content: flex-start;
	}
	.album-detail .explain .collect {
		flex-shrink: 0;
		margin-left: 4rpx;
		width: 80rpx;
		height: 42rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		font-weight: 700;
		color: #fff;
		border-radius: 30rpx;
		background: #DCDCDC;
	}
	.album-detail .explain .collect.active {
		background: #84D5EA;
	}
	/* 专辑详情end */
	/* 自定义播放器start */
	.player-box {
		box-sizing: border-box;
		position: absolute;
		top: 840rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		padding: 0 70rpx;
	}
	.player-box .play {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.player-box .play image {
		flex-shrink: 0;
		width: 38rpx;
		height: 36rpx;
	}
	.player-box .play .plan {
		box-sizing: border-box;
		width: 500rpx;
		height: 14rpx;
		border-radius: 7rpx;
		position: relative;
		background: #e6e6e6;
	}
	.player-box .play .plan image {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 40rpx;
		height: 40rpx;
		z-index: 8;
	}
	.player-box .play .time {
		position: absolute;
		width: 500rpx;
		box-sizing: border-box;
		padding: 0 12rpx;
		font-size: 20rpx;
		color: #B3B3B3;
		display: flex;
		justify-content: space-between;
		bottom: -36rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.player-box .play .percent {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background: #86e2f2;
		border-radius: 7rpx;
	}
	/* 自定义播放器end */
	/* 播放选项start */
	.play-options {
		box-sizing: border-box;
		padding: 0 108rpx;
		position: absolute;
		top: 940rpx;
		left: 0;
		width: 100%;
	}
	.play-options .options {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.play-options .options .center {
		box-sizing: border-box;
	}
	.play-options .options .next {
		width: 46rpx;
		height: 42rpx;
		display: block;
	}
	.play-options .options .center image {
		width: 120rpx;
		height: 120rpx;
		display: block;
	}
	.play-options .options .between {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 18rpx;
		color: #B3B3B3;
	}
	.play-options .options .between image {
		width: 60rpx;
		height: 60rpx;
		display: block;
		margin-bottom: 6rpx;
	}
	/* 播放选项end */
	/* 播放列表弹窗start */
	.pop-box {
		box-sizing: border-box;
		width: 100%;
		background: #fff;
		font-size: 28rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 0 24rpx;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}
	.pop-box .item {
		box-sizing: border-box;
		line-height: 80rpx;
		border-bottom: 2rpx solid rgba(180,180,180,0.2);
		
		padding: 0 12rpx;
		display: flex;
		
	}
	.pop-box .item .sort {
		margin-right: 30rpx;
		flex-shrink: 0;
	}
	.pop-box .item .duration {
		margin-left: 30rpx;
		flex-shrink: 0;
		font-size: 22rpx;
		color: #ccc;
	}
	.pop-box .item .title {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.lineActive {
		color: #2AAEC4 !important;
	}
	/* 播放列表弹窗end */
	
	
/* 	.player-main {
		background: #EBF8FF;
		padding-top: 16rpx;
	}
	.player-animate-bg {
		height: 100%;
		background-position: center;
		background-size: contain;
		background-origin: border-box;
		background-repeat: no-repeat;
	} */
</style>