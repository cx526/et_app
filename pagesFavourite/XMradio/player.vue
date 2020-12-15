<template>
	<view>
		<!-- 背景图 -->
		<image :src="$aliImage + 'player/background1.png'" mode="widthFix" class="bg"></image>
		<!-- 专辑详情start -->
		<view class="album-detail">
			<image :src="cover_url_middle" class="cover"></image>
			<view class="title">
				{{ title }}
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
					<view class="plan">
						<!-- 已经走的进度 -->
						<view class="percent" :style="{'width': percent + 'rpx'}"></view>
						
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
				<view class="center" @tap="play">
					<image :src="$aliImage + 'xmly-play-btn.png'" mode="widthFix" v-if="isShow"></image>
					<image :src="$aliImage + 'xmly-pause-btn.png'" mode="widthFix" v-else></image>
				</view>
			</view>
		</view>
		<!-- 播放选项end -->
		
		<!-- <view class="player-main" :style="'height: ' + sysHeight + 'px;'">
			<view class="player-animate-bg" :style="'background-image: url(' + $aliImage + bgAnimateImg + ')'"></view>
		</view> -->
	</view>
</template>

<script>
	// const winHeight = uni.getSystemInfoSync().windowHeight
	import { initXMLY } from './XM.js'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				cover_url_middle: '', // 专辑封面
				percent: 0, 
				album_id: '', // 播放音频id
				duration: 0, //	播放音频总时长
				currentDuration: 0, // 当前播放音频进度
				title: '', // 当前播放音频名称
				album_title: '', // 当前音频所在专辑的名称
				XMclient: '',
				XMplayer: '', 
				isShow: true
				// sysHeight: winHeight,
				// bgAnimate: 'player/background',
				// bgAnimateImg: '',
				// bgAnimateImgArray: [],
				// bgAnimateIndex: 1
			}
		},
		onLoad(options) {
			console.log(options)
			this.album_id = options.id
			this.duration = options.duration
			this.title = options.title
			let album_detail = JSON.parse(uni.getStorageSync('album_detail'))
			this.cover_url_middle = album_detail.cover_url_middle
			this.album_title = album_detail.album_title
			this.init()
			
			
			// this.initBg()
			// this.prePlayBg()
		},
		onHide() {
			console.log('onHide')
			this.XMplayer.off('timeupdate').off('end')
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
				
				console.log(status)
				if(status === 'ready') {
					this.XMplayer.play(id)
					this.isShow = false
				}else if(status === 'playing') {
					if(this.duration - parseInt(this.currentDuration) < 1) {
						this.XMplayer.play()
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
				this.timeUpdate()
			},
			// 监听播放事件
			timeUpdate() {
				this.XMplayer.on('timeupdate', (position, sound) => {
					this.percent = sound / this.duration * 500
					this.currentDuration = sound
					console.log(sound)
					console.log(this.percent)
					this.listenEnd()
					// this.XMplayer.on('change.sound', (sound) => {console.log('声音发生了改变')})
				})
			},
			// 监听播放结束事件
			listenEnd() {
				this.XMplayer.on('end', sound => {
					this.isShow = true
					console.log(this.XMplayer.getPlayState())
				})
			},
			// 快进
			forward() {
				let second = this.currentDuration + 15
				if(second >= this.duration) { return }
				this.XMplayer.seek(second)
			},
			// 后退
			back() {
				let second = this.currentDuration - 15
				if(second < 0) { return }
				this.XMplayer.seek(second)
			}
			
			
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
		justify-content: center;
	}
	.play-options .options .center {
		box-sizing: border-box;
	}
	.play-options .options .center image {
		width: 120rpx;
		height: 120rpx;
		display: block;
	}
	/* 播放选项end */
	
	
	
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