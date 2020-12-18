<template>
	<view>
		<!-- 背景图 -->
		<image :src="$aliImage + 'player/background1.png'" mode="widthFix" class="bg"></image>
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
				<text>{{ album_title }}</text>
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
						<text :class="item.id == album_id ? 'active' : ''" class="title">{{ item.track_title }}</text>
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
	import { XMalbums_browseURL } from './XM.js'
	import Popup from '@/components/lvv-popup/lvv-popup.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
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
			console.log(options)
			this.album_id = options.id // 当前播放音频id
			this.duration = options.duration // 当前播放音频总时长
			this.title = options.title // 当前播放音频标题
			this.playIndex = options.playIndex
			let album_detail = JSON.parse(uni.getStorageSync('album_detail'))
			this.cover_url_middle = album_detail.cover_url_middle // 当前音频所在专辑封面
			this.album_title = album_detail.album_title // 当前音频所在专辑的标题
			this.id = Number(album_detail.id) // 当前音频所在专辑id
			await this.init() // 初始化插件
			// 当前音频所在接口的页码
			this.page = Math.ceil(options.playIndex / 20) > 0 ? Math.ceil(options.playIndex / 20):1 
			this.currentPlayIndex = this.playIndex % 20 // 当前音频所在索引
			await this.getAlbumsDetail(this.id, this.page)
			this.getEleRect('.plan')
			this.timeUpdate() // 监听播放进度事件
			this.listenChangeSound() // 监听音频改变事件
			this.listenEnd() // 监听音频结束事件
			this.XMplayer.setPlayMode('order') // 默认顺序播放
			// this.initBg()
			// this.prePlayBg()
		},
		onUnload() {
			console.log('onUnload')
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
			// 初始化插件
			async init() {
				const { xmly, player } = await initXMLY()
				this.XMclient = xmly
				this.XMplayer = player
				// 设置播放列表
				// this.XMplayer.setPlaylist([360729033,361819437])
			},
			//  播放
			play() {
				let id = this.album_id
				let status = this.XMplayer.getPlayState()
				console.log(this.duration)
				console.log(parseInt(this.currentDuration))
				console.log(status)
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
					// console.log(sound)
					// console.log(this.percent)
				})
			},
			// 获取元素高度
			getEleRect(ele) {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select(ele).boundingClientRect(data => {
					  console.log(data)
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
					console.log(this.XMplayer.getCurrentIndex())
					let index = this.XMplayer.getCurrentIndex()
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
					console.log('ready')
					if(this.currentPlayIndex == 0) { return }
					this.album_id = this.playList[this.currentPlayIndex - 1]
					this.title = this.videoList[this.currentPlayIndex - 1].track_title
					this.duration = this.videoList[this.currentPlayIndex - 1].duration
					this.currentPlayIndex = this.currentPlayIndex - 1
					return
				}
				this.XMplayer.prev()
				let index = this.XMplayer.getCurrentIndex()
				console.log(index)
				this.album_id = this.playList[index]
				this.title = this.videoList[index].track_title
				this.duration = this.videoList[index].duration
				this.isShow = false
				this.scrollLeft = 0
			},
			// 切换下一首
			playNext() {
				let status = this.XMplayer.getPlayState()
				if(status === 'ready') {
					if(this.currentPlayIndex == this.videoList.length - 1) { return }
					this.album_id = this.playList[this.currentPlayIndex + 1]
					this.title = this.videoList[this.currentPlayIndex + 1].track_title
					this.duration = this.videoList[this.currentPlayIndex + 1].duration
					this.currentPlayIndex = this.currentPlayIndex + 1
					return
				}
				this.XMplayer.next()
				let index = this.XMplayer.getCurrentIndex()
				this.album_id = this.playList[index]
				this.title = this.videoList[index].track_title
				this.duration = this.videoList[index].duration
				this.isShow = false
				this.scrollLeft = 0
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
				console.log(event)
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
					console.log(distance)
					let second = parseInt(distance / this.planOffsetWidth * this.duration)
					console.log(second)
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
				if(this.page <= this.totalPage) {
					this.page = this.page + 1
					this.getAlbumsDetail(this.id, this.page)
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
				this.showModel = false
				this.isShow = false
				this.scrollLeft = 0
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
			
			// initBg() {
			// 	this.bgAnimateImgArray = []
			// 	for (let i = 1; i < 13; i++) {
			// 		let img = this.bgAnimate + i.toString() + '.png'
			// 		this.bgAnimateImgArray.push(img)
			// 	}
			// },
			// prePlayBg() {
			// 	if (this.bgAnimateIndex < this.bgAnimateImgArray.length) {
			// 		this.playaBg()
			// 	}
			// },
			// playaBg() {
			// 	let animate = setInterval(() => {
			// 		this.bgAnimateImg = this.bgAnimateImgArray[this.bgAnimateIndex]
			// 		this.bgAnimateIndex = this.bgAnimateIndex + 1
			// 	}, 200);
			// }
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
	.bg {
		position: relative;
		width: 100%;
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
	.active {
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