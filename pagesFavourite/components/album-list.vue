<template>
	<view class="album-content">
		<block v-if="collectAlbumList && collectAlbumList.length > 0">
			<view class="content-item" @tap="goAlbumDetail(item)" v-for="(item, index) in collectAlbumList" :key="index">
				<view class="cover">
					<image :src="item.cover_url_small" ></image>
					<view class="play-count">
						<image :src="$aliImage + 'xmly-icon-play.png'"></image>
						<text>{{ item.play_count | formatPlayCount }}</text>
					</view>
				</view>
				<view class="title">
					<image :src="$aliImage + 'xmly-icon-01.png'"></image>
					<view class="title-text">{{ item.album_title }}</view>
				</view>
			</view>
		</block>
		<view class="none" v-else>
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			collectAlbumList: Array,
			
		},
		data() {
			return {
				$aliImage: this.$aliImage,
			}
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
			}
		},
		methods: {
			goAlbumDetail(item) {
				this.$emit('goAlbumDetail', item)
			}
		}
	}
</script>

<style scoped>
	.album-content {
		box-sizing: border-box;
		display: flex;
		justify-content: flex-start;
		padding: 24rpx 12rpx;
		flex-wrap: wrap;
	}
	.album-content .content-item {
		width: 180rpx;
		box-sizing: border-box;
		margin-right: 38rpx;
		margin-bottom: 26rpx;
		display: inline-block;
	} 
	.album-content .content-item:nth-child(3n) {
		margin-right: 0;
	}
	.album-content .content-item .cover {
		position: relative;
		box-sizing: border-box;
		width: 180rpx;
		height: 180rpx;
	}
	.album-content .content-item .cover image {
		width: 180rpx;
		height: 180rpx;
		display: block;
	}
	.album-content .content-item .play-count {
		position: absolute;
		left: 0;
		bottom: 0;
		font-size: 18rpx;
		color: #fff;
		background: rgba(128,128,128,0.64);
		display: flex;
		align-items: center;
		padding: 4rpx 12rpx;
		border-bottom-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}
	.album-content .content-item .play-count image {
		width: 16rpx;
		height: 16rpx;
		flex-shrink: 0;
		margin-right: 8rpx;
	}
	.album-content .content-item .title {
		font-size: 24rpx;
		margin-top: 12rpx;
		position: relative;
		box-sizing: border-box;
		text-indent: 40rpx;
		overflow: hidden;
	}
	.album-content .content-item .title image {
		width: 30rpx;
		height: 30rpx;
		position: absolute;
		left: 0;
		top: 0;
	}
	.album-content .content-item .title .title-text {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.none {
		box-sizing: border-box;
		text-align: center;
		padding: 30rpx;
		font-size: 30rpx;
		color: #B3B3B3;
		flex: 1;
	}
</style>
