<template>
	<view>
		<!-- 专辑详情start -->
		<view class="description">
			<view class="left">
				<image :src="cover_url_middle" class="cover"></image>
				<image :src="$aliImage + 'xmly-play-bg.png'" class="bg"></image>
			</view>
			<view class="right">
				<view class="title">宝宝巴士·睡前故事 | 4-7岁儿童</view>
				<block v-if="tagList && tagList.length > 0">
					<view class="tag" >
						<view v-for="(item, index) in tagList" :key="index" v-if="index <= 2">{{ item }}</view>
					</view>
				</block>
				<view class="play">
					<image :src="$aliImage + 'xmly-icon-01.png'" mode=""></image>
					<text>{{ play_count | formatPlayCount }}</text>
				</view>
			</view>
		</view>
		<!-- 专辑详情end -->
		<!-- 简介/节目start -->
		<view class="list">
			<view class="nav">
				<view v-for="(item, index) in navList" :key="index" class="item" @tap="changeTab(index)" :class="index === currentIndex ? ' active' : ''">
					<text >{{ item.title }}</text>
					<view class="line" :class="index === currentIndex ? ' active' : ''"></view>
				</view>
			</view>
			<view class="options">
				<view class="item">
					<image :src="$aliImage + 'xmly-play.png'"></image>
					<text>全部播放</text>
				</view>
				<view class="right">
					<view class="item">
						<image :src="$aliImage + 'xmly-sort.png'"></image>
						<text>排序</text>
					</view>
					<view class="item">
						<image :src="$aliImage + 'xmly-play.png'"></image>
						<text>选集</text>
					</view>
				</view>
				
				
			</view>
			<view class="context">
				<swiper :style="{ 'height': swiperHeight }" :current="currentIndex" @change="swiperChange">
					<swiper-item>
						<view class="introduction">{{ album_intro }}</view>
					</swiper-item>
					<swiper-item>
						<block v-for="(item, index) in dataList" :key="index">
							<view class="item" @tap="play(item)">
								<view class="detail">
									<view class="sort">{{ index + 1 }}</view>
									<view class="title">{{ item.track_title }}</view>
									<view class="icon" >
										<image :src="$aliImage + 'xmly-play.png'" v-if="item.play_status === 'play'"></image>
										<image :src="$aliImage + 'xmly-pause.png'" v-else></image>
									</view>
								</view>
								<view class="time">
									<view class="listen">
										<image :src="$aliImage + 'xmly-listen.png'"></image>
										<text>{{ item.play_count | formatPlayCount }}</text>
									</view>
									<view class="listen">
										<image :src="$aliImage + 'xmly-clock.png'"></image>
										<text>{{ item.created_at | formatDate }}</text>
									</view>
								</view>
							</view>
						</block>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 简介/节目end -->
	</view>
</template>

<script>
	import { initXMLY } from './XM.js'
	import { XMalbums_browseURL } from './XM.js'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				album_id: '', // 专辑id
				tagList: [], // 专辑标签
				cover_url_middle: '', // 封面
				play_count: '', // 播放次数
				album_intro: '', // 专辑简介
				dataList: [],
				swiperHeight: 0,
				XMclient: '',
				XMplayer: '',
				currentIndex: 0,
				page: 1,
				totalPage: 0, // 返回数据总的页数
				navList: [
					{title: '简介'}, 
					{title: '节目'},
				]
			}
		},
		async onLoad(options) {
			let album_detail = JSON.parse(uni.getStorageSync('album_detail'))
			this.album_id = Number(album_detail.id)
			this.tagList = album_detail.tagList
			this.cover_url_middle = album_detail.cover_url_middle
			this.play_count = album_detail.play_count
			this.album_intro = album_detail.album_intro
			await this.init()
			await this.getAlbumsDetail(this.album_id, this.page)
		},
		filters: {
			formatPlayCount(play_count) {
				let len = String(play_count).length
				if(len >= 5 && len < 9) {
					return play_count = (play_count / 10000).toFixed(2) + '万'
				}
				else if(len >= 9) {
					return play_count = (play_count / 100000000).toFixed(2) + '亿'
				}
			},
			formatDate(created_at) {
				let date = new Date(created_at)
				let year = date.getFullYear()
				let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
				let day = date.getDate() > 9 ? date.getDate() : '0' + (date.getDate())
				return year + '-' + month + '-' + day
			}
		},
		onReachBottom() {
			if(this.page < this.totalPage) {
				this.page = this.page + 1
				this.getAlbumsDetail(this.album_id, this.page)
			}
		},
		methods: {
			// 初始化
			async init() {
				const { xmly, player } = await initXMLY()
				this.XMclient = xmly
				this.XMplayer = player
				console.log(this.XMplayer)
			},
			async getAlbumsDetail(album_id, page) {
				// 获取专辑详情信息
				let paramAlbumDetail = {
					album_id: album_id,
					page: page,
				}
				await this.XMclient.get(XMalbums_browseURL, paramAlbumDetail).then(res => {
					if(res.code === 0) {
						let result = res.data.tracks
						this.totalPage = res.data.total_page
						result.map(item => {
							item.play_status = 'play'
						})
						this.dataList = [...this.dataList, ...result]
						console.log(this.dataList)
						this.getSwiperHeight('.context .item')
					}
				})	
			},
			// 动态设置swiper高度
			getSwiperHeight(ele) {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.selectAll(ele).boundingClientRect(data => {
						let height = 0
						data.map(item => {
							height += item.height
						})
						this.swiperHeight = height + 'px'
					}).exec();
				}, 200)
				
			},
			// 点击tab
			changeTab(index) {
				this.currentIndex = index
			},
			// 监听swiper改变
			swiperChange(event) {
				let index = event.detail.current
				this.currentIndex = index
			},
			// 播放
			play(item) {
				let id = item.id
				let duration = item.duration
				let title = item.track_title
				// let play_status = item.play_status
				// this.XMplayer.play(id)
				// this.XMplayer.setPlaylist([id])
				// this.XMplayer.play()
				uni.navigateTo({
					url: '/pagesFavourite/XMradio/player?id='+id+'&duration='+duration+'&title='+title
				})
				
			}
		},
	}
</script>

<style>
	page {
		box-sizing: border-box;
		background: #EBF8FF;
		padding: 25rpx;
	}
</style>
<style scoped>
	/* 专辑详情start */
	.description {
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.16); 
		padding: 40rpx;
		display: flex;
		align-items: center;
		
	}
	.description .left {
		flex-shrink: 0;
		position: relative;
		width: 226rpx;
		height: 200rpx;
		position: relative;
		margin-right: 40rpx;
	}
	.description .left .cover {
		width: 200rpx;
		height: 200rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 8;
	}
	.description .left .bg {
		position: absolute;
		width: 160rpx;
		height: 160rpx;
		right: 0;
		top: 20rpx;
		z-index: 4;
	}
	.description .right {
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
	}
	.description .right .title {
		font-size: 24rpx;
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.description .right .tag {
		box-sizing: border-box;
		display: flex;
		font-size: 20rpx;
		color: #AA6428;
		margin-top: 14rpx;
	}
	.description .right .tag view {
		background: #FFFBE6;
		box-sizing: border-box;
		padding: 2rpx 8rpx;
		border-radius: 16rpx;
		margin-right: 6rpx;
	}
	.description .right .tag view:last-child {
		margin-right: 0;
	}
	.description .right .play {
		display: flex;
		margin-top: 70rpx;
		align-items: center;
		font-size: 22rpx;
		color: #808080;
	}
	.description .right .play image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}
	/* 专辑详情end */
	/* 简介/节目start */
	.list {
		box-sizing: border-box;
		padding: 30rpx;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.16); 
		margin-top: 24rpx;
	}
	.list .nav {
		display: flex;
		line-height: 70rpx;
		font-size: 28rpx;
	}
	.list .nav .item {
		flex: 1;
		box-sizing: border-box;
		text-align: center;
		position: relative;
	}
	.list .nav .item .line {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 10rpx;
		background: #F9F9F9;
		border-radius: 6rpx;
	}
	.list .nav .item.active {
		color: #2AAEC4;
		font-weight: 700;
	}
	.list .nav .item .line.active {
		background: #BCEDF5;
	}
	.list .options {
		box-sizing: border-box;
		line-height: 70rpx;
		display: flex;
		padding-left: 25rpx;
		justify-content: space-between;
		border-bottom: 2rpx dashed #b3b3b3;
		color: #808080;
		font-size: 22rpx;
	}
	.list .options .item {
		display: flex;
		align-items: center;
	}
	.list .options .item image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 6rpx;
	}
	.list .options .right {
		display: flex;
		align-items: center;
		flex: 1;
		justify-content: flex-end;
	}
	.list .options .right .item {
		display: flex;
		align-items: center;
		margin-right: 24rpx;
	}
	.list .options .right .item:last-child {
		margin-right: 0;
	}
	.list .options .right image {
		width: 30rpx;
		height: 30rpx;
	}
	.list .context {
		box-sizing: border-box;
	}
	.list .context .item {
		box-sizing: border-box;
		padding: 20rpx 10rpx 20rpx 25rpx;
		border-bottom: 2rpx dashed #b3b3b3;
	}
	.list .context .item:last-child {
		border-bottom: 0;
	}
	.list .context .introduction {
		box-sizing: border-box;
		padding: 25rpx;
		font-size: 22rpx;
		line-height: 40rpx;
	}
	.list .context .item .detail {
		display: flex;
		align-items: center;
	}
	.list .context .item .sort {
		color: #B3B3B3;
		font-size: 24rpx;
		flex-shrink: 0;
		margin-right: 30rpx;
	}
	.list .context .item .title {
		width: 400rpx;
		font-size: 24rpx;
	}
	.list .context .item .icon {
		margin-left: 120rpx;
	}
	.list .context .item .icon image {
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.list .context .item .time {
		display: flex;
		align-items: center;
	}
	.list .context .item .time .listen {
		display: flex;
		font-size: 20rpx;
		color: #808080;
		box-sizing: border-box;
		margin-right: 45rpx;
		padding-left: 40rpx;
		margin-top: 4rpx;
		align-items: center;
	}
	.list .context .item .time image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	/* 简介/节目end */
</style>
