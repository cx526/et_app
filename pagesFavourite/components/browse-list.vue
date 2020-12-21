<template>
	<view class="list">
		<block  v-if="collectBrowseList && collectBrowseList.length > 0">
			<view class="item" @tap="goPlay(item, index)" v-for="(item, index) in  collectBrowseList" :key="index">
				<view class="show">
					<image :src="item.cover_url_small" mode=""></image>
				</view>
				<view class="main">
					<view class="title">
						<text>{{ item.track_title }}</text>
						<image :src="$aliImage + 'xmly-play.png'" mode=""></image>
					</view>
					<view class="info">
						<view>
							<image :src="$aliImage + 'xmly-listen.png'" mode=""></image>
							<text>{{ item.play_count | formatPlayCount }}</text>
						</view>
						<view>
							<image :src="$aliImage + 'xmly-clock.png'" mode=""></image>
							<text>{{ item.created_at | formatDate }}</text>
						</view>
					</view>
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
			collectBrowseList: Array
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
			},
			formatDate(created_at) {
				let date = new Date(created_at)
				let year = date.getFullYear()
				let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
				let day = date.getDate() > 9 ? date.getDate() : '0' + (date.getDate())
				return year + '-' + month + '-' + day
			}
		},
		methods: {
			goPlay(item, index) {
				this.$emit('goPlay', {item: item, playIndex: index})
			}
		}
	}
</script>

<style scoped>
	.list {
		box-sizing: border-box;
	}
	.list .item {
		box-sizing: border-box;
		padding: 16rpx 0;
		display: flex;
		align-items: center;
		border-bottom: 2rpx dashed #B3B3B3;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .show {
		flex-shrink: 0;
		margin-right: 30rpx;
		width: 120rpx;
		height: 120rpx;
	}
	.list .item .show image {
		width: 100%;
		height: 100%;
		display: block;
	}
	.list .item .main {
		box-sizing: border-box;
		flex: 1;
		
	}
	.list .item .main .title {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		margin-bottom: 4rpx;
		justify-content: space-between;
	}
	.list .item .main .title image {
		flex-shrink: 0;
		margin-left: 40rpx;
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.list .item .main .info {
		display: flex;
		align-items: center;
		color: #808080;
		font-size: 20rpx;
	}
	.list .item .main .info view {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-right: 45rpx;
	}
	.list .item .main .info view image {
		width: 26rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.none {
		box-sizing: border-box;
		text-align: center;
		padding: 30rpx;
		font-size: 30rpx;
		color: #B3B3B3;
	}
</style>
