	<template>
		<view>
			<!-- <button @click="remove">1111</button> -->
			<!-- 头部 -->
			<view class="header-box">
				<view class="topic">
					<text>林头幼儿园智慧童书馆欢迎您！</text>
				</view>
				<view class="user-info">
					<text>我的积分：10000</text>
					<text>我的借书币：300</text>
				</view>
			</view>
			<!-- 搜索框 -->
			<view class="search-box">
				<input type="text" 
				placeholder="书籍名称/作者姓名"
				placeholder-style="font-size: 12px; color: #999" />
				<view class="icon">
					<icon class="search-icon" type="search"/>
				</view>
			</view>
			<!-- 分类 -->
			<view class="type-box">
				<view class="topic">
					<view class="left">
						<view class="line"></view>
						<view class="text">
							<text>童书分类</text>
						</view>
					</view>
					<view class="right" id="critical">
						<text  v-if="isScroll" @click="open">展开</text>
						<text  v-else >收起</text>
						<image src="../../static/library/icon-down.png" mode="" v-if="isScroll"></image>
						<image src="../../static/library/icon-up.png" mode=""  v-else></image>
					</view>
				</view>
				<!-- 列表 -->
				<view class="list" id="list"  
				:style="{'height':!isScroll ? overflow.height:''}">
					<template v-if="productList && productList.length > 0">
						<view class="item" v-for="(item, index) in productList" :key="index">
							<image :src="item.forGoodsPic[0].url" mode="" class="show"></image>
							<!-- 无库存显示 -->
							<view class="none-stock" v-if="item.stock.usageCount === 0">
								<view class="none-notice">
									<text>暂时</text>
									<text>借完</text>
								</view>
							</view>
							<view class="title">
								<text>{{ item.title }}</text>
							</view>
							<view class="price">
								<text>借书币：30</text>
							</view>
							<view class="label">
								<text
								v-for="(label, labelIndex) in item.tagInfo"
								:key="labelIndex"
								v-if=" labelIndex < 2 ">{{ label.tag_name }}</text>
							</view>	
							<view class="recommend">
								<view class="left">
									<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_zan.png" mode=""></image>
									<text>{{ item.peopleCount }}人推荐</text>
								</view>
								<view class="right" 
								v-if="item.stock.usageCount"
								@tap="push(item)">
									<text>加入书篮</text>
								</view>
								<view class="right" v-if="item.stock.usageCount == 0" style="background: #ccc;">
									<text>加入书篮</text>
								</view>
							</view>
						</view>
					</template>
					<!-- 分类弹窗 -->
					<uni-popup 
					ref="popup" 
					type="bottom"
					@change="popupChange">
						<view :style="{ 'height' : height }" class="popup-box">
							<view 
							v-for="(item, index) in typeList"
							:key="index"
							class="popup-item"
							:class="currentIndex == index ? ' active' : ''"
							@tap="changeType(index)">
							{{ item.title }}</view>
						</view>
					</uni-popup>
				</view>
			</view>
			<!-- 书篮 -->
			
			<view class="library-box" 
			v-if="len"
			@tap="goCart">
				<image src="../../static/tab-cart-current.png" mode=""></image>
				<text>{{ len }}</text>
			</view>
			<!-- 加载组件 -->
			<uni-load-more :status="loadStatus" :content-text="loadText" />
		</view>
		
	</template>


<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				height: 0,
				productList: [],
				isScroll: true,
				len: 0,
				loadStatus : 'loading',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '已经到底了'
				},
				currentIndex: 0,
				typeList: [
					{
						title: '全部'
					},
					{
						title: '语言文学'
					},
					{
						title: '童话故事'
					},
					{
						title: '情感童书'
					},
					{
						title: '全部'
					},
					{
						title: '语言文学'
					},
					{
						title: '童话故事'
					},
					{
						title: '情感童书'
					}
				]
			}
			
		},
		components: {
			uniPopup,
			uniLoadMore
		},
		onLoad() {
			// 获取书籍列表
			this.getBooksList();
			this.len = uni.getStorageSync("offlineCartList").length;
		},
		onReady() {
			// 设置分类弹窗的高度
			const query = uni.createSelectorQuery().in(this);
			query.select('#critical').boundingClientRect(data => {
				console.log(data.top + data.height)
				uni.getSystemInfo({
					success: res => {
						this.height = res.windowHeight - (data.top + data.height) + 'px'
					}
				})
			}).exec();
		},
		onReachBottom() {
			if(this.productList.length >= 20) {
				this.loadStatus = 'noMore'
				return
			}
			this.$api.getGuess().then(res => {
				res.data.map(item=>{
					this.productList.push(item);
				});
			})
		},
		methods: {
			// 获取书籍列表
			getBooksList() {
				uni.showLoading({
					title: '数据家在中',
					mask: true
				});
				this.$api.getGuess().then(res => {
					uni.hideLoading()
					this.productList = res.data;
					console.log(this.productList)
				})
			},
			// 监听弹窗发生改变事件
			popupChange(e) {
				if(e.show) {
					this.isScroll = false;
				}else {
					this.isScroll = true
				}
			},
			// 打开分类弹窗
			open() {
				this.$refs.popup.open()
			},
			// 加入书篮
			push(add) {
				let arrList = uni.getStorageSync('offlineCartList') ? uni.getStorageSync('offlineCartList') : [];
				let arr = []
				if(arrList && arrList.length > 0) {
					arrList.map(obj => {
						arr.push(obj.id)
					})
					if(arr.indexOf(add.id) === -1) {
						uni.showToast({
							title: '加入书篮成功',
							duration:2000,
							icon: 'none',
							success:() => {
								arrList.unshift(add);
								this.len = arrList.length;
								uni.setStorageSync("offlineCartList",arrList)
							}
						})
					}else {
						uni.showToast({
							title: '相同图书请不要重复添加',
							duration: 2000,
							icon: 'none'
						})
					}
				}else {
					uni.showToast({
						title: '加入书篮成功',
						duration:2000,
						icon: 'none',
						success:() => {
							arrList.push(add);
							this.len = arrList.length;
							uni.setStorageSync("offlineCartList",arrList)
						}
					})
				}
			},
			// 跳转到书篮tabbar页面
			goCart() {
				uni.reLaunch({
					url: '../cart/cart?flag=true'
				})
			},
			// 改变分类
			changeType(index) {
				this.currentIndex = index;
			},
			
			
			
			
		},
	}
</script>

<style scoped>
	/* header */
	.header-box {
		box-sizing: border-box;
		padding: 32rpx 20rpx;
		color: #333;
		font-size: 30rpx;
	}
	.header-box .user-info {
		margin-top: 40rpx;
	}
	.header-box .user-info text {
		margin-right: 24rpx;
	}
	/* search */
	.search-box {
		box-sizing: border-box;
		height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}
	.search-box input {
		flex: 1;
		height: 80rpx;
		box-sizing: border-box;
		border: 1px solid #999;
		border-radius: 8rpx;
		padding-left: 18rpx;
		line-height: 80rpx;
	}

	.search-box .icon {
		display: flex;
		justify-content: center;
		border: 1px solid #999;
		border-radius: 8rpx;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		margin-left: 24rpx;
	}
	.search-box .search-icon {
		display: flex;
		align-items: center;
	}
	/* type */
	.type-box {
		box-sizing: border-box;
		padding: 20rpx;
	}
	.type-box .topic {
		box-sizing: border-box;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
	}
	.type-box .topic .left,
	.type-box .topic .right {
		display: flex;
		align-items: center;
	}
	.type-box .topic .line {
		width: 8rpx;
		height: 80rpx;
		background: rgb(0,128,0);
		margin-right: 30rpx;
	}
	.type-box .topic .text {
		color: rgb(0,128,0);
	}
	.type-box .topic .right text {
		color: #00B4C9;
	}
	.type-box .topic .right image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 12rpx;
	}
	/* list */
	.type-box .list {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		position: relative;
		overflow-y: hidden;
		justify-content: space-around;
		padding-bottom: 20rpx;
	}
	.type-box .list .item {
		text-align: center;
		box-sizing: border-box;
		width: 47%;
		margin-top: 20rpx;
		box-shadow: 0rpx 0rpx 20rpx rgba(179,179,179,0.3);
		border-radius: 8rpx;
		padding: 20rpx 24rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}
	.type-box .none-stock {
		position: absolute;
		z-index: 12;
		left: 50%;
		top: 20rpx;
		width: 280rpx;
		height: 260rpx;
		transform: translateX(-50%);
		background: rgba(157,160,174,.6);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.type-box .none-stock .none-notice {
		background-color: rgba(110,116,125,.8);
		color: #FFFFFF;
		width: 160rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		border-radius: 50%;
	}
	.type-box .list .item:nth-child(2n-1) {
		margin-right: 10rpx;
	}
	.type-box .list .item:nth-child(2n) {
		margin-left: 10rpx;
	}
	.type-box .list .show {
		width: 280rpx;
		height: 260rpx;
		display: block;
	}
	.type-box .list .title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30rpx;
		color: rgb(94,94,94);
		padding-top: 8rpx;
		text-align: left;
	}
	.type-box .list .price {
		font-size: 30rpx;
		color: rgb(94,94,94);
		padding-top: 8rpx;
		text-align: left;
	}
	.type-box .list .label {
		display: flex;
		font-size: 22rpx;
		box-sizing: border-box;
		padding-top: 8rpx;
	}
	.type-box .list .label text {
		background-color: #FFFBE6;
		color: #AA6428;
		margin-right: 10rpx;
		box-sizing: border-box;
		padding: 2rpx 4rpx;
		border-radius: 16rpx;
	}
	.type-box .list .recommend {
		display: flex;
		align-items: center;
		color: #BABABA;
		font-size: 25rpx;
		padding-top: 8rpx;
		justify-content: space-between;
		align-items: center;
	}
	.type-box .list .recommend image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}
	.type-box .list .recommend .right {
		font-size: 22rpx;
		font-weight: bold;
		color: #FFFFFF;
		background-color: #2AAEC4;
		border-top-left-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
		padding: 5rpx 10rpx;
		position: relative;
		left: 24rpx;
	}
	/* 禁止滚动 */
	.scroll-disabled {
		height: 100%;
		overflow-y: hidden !important;
	}
	/* 分类弹窗 */
	.popup-box {
		box-sizing: border-box;
		background: #fff;
		box-sizing: border-box;
		padding: 24rpx;
		font-size: 28rpx;
		color: #333;
	}
	.popup-box .popup-item {
		display: inline-block;
		width: 22%;
		box-sizing: border-box;
		line-height: 60rpx;
		margin-bottom: 32rpx;
		margin-right: 4%;
		text-align: center;
		box-shadow: 0rpx 0rpx 20rpx rgba(179,179,179,1);
		height: 60rpx;
		border-radius: 8rpx;
	}
	.popup-box .popup-item:nth-child(4n) {
		margin-right: 0;
	}
	.popup-box .popup-item.active {
		background: #00B7CC;
		color: #fff;
	}
	/* 书篮 */
	.library-box {
		box-sizing: border-box;
		position: fixed;
		border-radius: 50%;
		width: 120rpx;
		height: 120rpx;
		right: 0;
		bottom: 300rpx;
		background: #fff;
		z-index: 20;
		box-shadow: 0rpx 0rpx 20rpx rgba(179,179,179,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.library-box image {
		width: 80rpx;
		height: 80rpx;
	}
	.library-box text {
		position: absolute;
		left: 60%;
		top: 7%;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		color: #fff;
		font-size: 20rpx;
		background: rgb(250,81,81);
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
