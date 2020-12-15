<template>
	<view>
		<!-- <playingAnimate/> -->
		<view class="player-main" :style="'height: ' + sysHeight + 'px;'">
			<view class="player-animate-bg" :style="'background-image: url(' + $aliImage + bgAnimateImg + ')'"></view>
			<!-- https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/player/background1.png -->
		</view>
	</view>
</template>

<script>
	// import playingAnimate from "./playingAnimate"
	// const sysHeight = uni.getSystemInfoSync().screenHeight
	// const naviHeight = uni.getSystemInfoSync().navigationBarHeight
	const winHeight = uni.getSystemInfoSync().windowHeight
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				sysHeight: winHeight,
				bgAnimate: 'player/background',
				bgAnimateImg: '',
				bgAnimateImgArray: [],
				bgAnimateIndex: 1
			}
		},
		components: {
			// playingAnimate
		},
		onLoad() {
			this.initBg()
			this.prePlayBg()
		},
		methods: {
			initBg() {
				this.bgAnimateImgArray = []
				for (let i = 1; i < 13; i++) {
					let img = this.bgAnimate + i.toString() + '.png'
					this.bgAnimateImgArray.push(img)
				}
			},
			prePlayBg() {
				if (this.bgAnimateIndex < this.bgAnimateImgArray.length) {
					this.playaBg()
				}
			},
			playaBg() {
				let animate = setInterval(() => {
					this.bgAnimateImg = this.bgAnimateImgArray[this.bgAnimateIndex]
					this.bgAnimateIndex = this.bgAnimateIndex + 1
				}, 200);
			}
		}
	}
</script>

<style scoped>
	.player-main {
		background: #EBF8FF;
		padding-top: 16rpx;
	}
	.player-animate-bg {
		height: 100%;
		background-position: center;
		background-size: contain;
		background-origin: border-box;
		background-repeat: no-repeat;
	}
</style>