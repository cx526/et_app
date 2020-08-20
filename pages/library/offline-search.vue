<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box" id="search">
			<view class="search">
				<image :src="$aliImage + 'search.png'" class="icon-search"></image>
				<input 
				type="text" 
				placeholder="请输入书名/作者/关键词..." 
				placeholder-style="font-size: 30rpx;color: #C5C5C5"
				 :value="seachText"
				 @input="inputSearch"/>
				<view class="right" @tap="confirmSearch">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<!-- 历史搜索 -->
		<view class="history-search" 
		v-if="historySearch && historySearch.length > 0">
			<view class="topic">
				<text>历史搜索</text>
				<image :src="$aliImage + 'cart_rubbish.png'" mode="" @tap="del"></image>
			</view>
			<view class="list">
				<view class="item"
				v-for="(item,index) in historySearch"
				:key="index"
				@tap="goSearch(item)">
					<text>{{ item }}</text>
				</view>
			</view>
		</view>
		<!-- 热门搜索 -->
		<!-- <view class="history-search"
		v-if="hotSearch && hotSearch.length > 0">
			<view class="topic">
				<text>热门搜索</text>
			</view>
			<view class="list">
				<view class="item"
				v-for="(item, index) in hotSearch"
				:key="index"
				@tap="goSearch(item.goods_info.title)">
					<text>{{ item.goods_info.title }}</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage, //本地静态图片路径
				seachText: '',
				historySearch: [],//历史搜索
				productList: [], //搜索结果
				hotSearch: [], //热门搜索
				docker_mac: ''
			}
		},
		onLoad() {
			// 获取用户账户信息
			this.getUserInfo()
		},
		onShow() {
			this.historySearch = uni.getStorageSync("offlineHistorySearch");
			// 获取热门搜索
			this.getHotSearch()
		},
		methods: {
			// 获取个人账户信息
			getUserInfo() {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({
					filterItems: { mobile }
				}).then(res => {
					this.docker_mac = res.data[0].dockerInfo.docker_mac;
				})
			},
			// 监听input搜索框事件
			inputSearch(event) {
				this.seachText = event.detail.value;
			},
			// 确认搜索
			confirmSearch() {
				if(this.seachText === '') {
					uni.showToast({
						title: '请输入您要搜索的书籍',
						icon: 'none',
						duration: 2000
					})
					return
				}
				// 储存搜索到本地
				let arr = uni.getStorageSync("offlineHistorySearch") ? 
				uni.getStorageSync("offlineHistorySearch") : [];
				let flag = true
				// 提出重复
				for(let i = 0; i < arr.length; i++) {
					if(arr[i] === this.seachText) {
						flag = false
					}
				}
				if(flag) {
					arr.unshift(this.seachText);
					uni.setStorageSync("offlineHistorySearch", arr);
				}
				let param = {
					filterItems: {
						search: this.seachText,
						docker_mac: this.docker_mac
					}
				}
				// 网络请求
				this.$api.getGoodsInfo(param).then(res => {
					this.productList = res.data.rows
					uni.reLaunch({
						url: './library?isSearch=true&productList='+JSON.stringify(this.productList)
					})
				})
				// { filterItems: { search: AAA }}
			
			},
			// 点击搜索选项
			goSearch(item) {
				this.seachText = item;
				// 储存搜索到本地
				let arr = uni.getStorageSync("offlineHistorySearch") ? 
				uni.getStorageSync("offlineHistorySearch") : [];
				let flag = true
				// 提出重复
				for(let i = 0; i < arr.length; i++) {
					if(arr[i] === this.seachText) {
						flag = false
					}
				}
				if(flag) {
					arr.unshift(this.seachText);
					uni.setStorageSync("offlineHistorySearch", arr);
				}
				let param = {
					filterItems: {
						search: this.seachText,
						docker_mac: this.docker_mac					
					}
				}
				// 网络请求
				this.$api.getGoodsInfo(param).then(res => {
					this.productList = res.data.rows
					uni.reLaunch({
						url: './library?isSearch=true&productList='+JSON.stringify(this.productList)
					})
				})		
			},
			// 删除历史搜索记录
			del() {
				uni.showModal({
					title: '是否确认清空历史搜索记录?',
					success: res => {
						if(res.confirm) {
							uni.clearStorageSync("offlineHistorySearch");
							// 同步页面数据
							this.historySearch = uni.getStorageInfoSync("offlineHistorySearch")
						}else {}
					}
				})
			},
			// 获取热门搜索记录
			getHotSearch() {
				this.$api.getRecommend().then(res => {
					this.hotSearch = res.data
				})
			}
			
		}
	}
</script>

<style>
	/* search */
	.search-box {
		box-sizing: border-box;
		padding: 30rpx 40rpx;
		background: #ebf7ff;
	}
	.search-box.active {
		background: #fff;
	}
	.search-box .search {
		height: 80rpx;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		border-radius: 40rpx;
	}
	.search-box .search.active {
		border: 1px solid #ebf7ff;
	}
	.search-box .icon-search {
		width: 40rpx;
		height: 40rpx;
		flex-shrink: 0;
		margin-right: 12rpx;
	}
	.search-box .right {
		position: absolute;
		right: 0;
		top: 0;
		height: 80rpx;
		width: 150rpx;
		display: flex;
		background-image: linear-gradient(180deg, #40aed1, #69d9e4);
		font-size: 30rpx;
		align-items: center;
		border-bottom-right-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-sizing: border-box;
		color: #fff;
		justify-content: center;
	}
	.search-box .right image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	/* 历史搜索 */
	.history-search {
		box-sizing: border-box;
		padding: 0 30rpx;
	}
	.history-search .topic {
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.history-search .topic image {
		width: 30rpx;
		height: 30rpx;
	}
	.history-search .list {
		box-sizing: border-box;
		padding: 0 10rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.history-search .list .item {
		box-sizing: border-box;
		color: #939696;
		background-color: #EBF8FF;
		border-radius: 24rpx;
		margin-right: 16rpx;
		font-size: 26rpx;
		padding: 4rpx 12rpx;
		margin-bottom: 16rpx;

	}
</style>
