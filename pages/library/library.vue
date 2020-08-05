<template>
	<view>
		<!-- 头部 -->
		<view class="header-box">
			<view class="user">
				<image src="../../static/library/user-default.png" mode=""></image>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="search-box">
			<input type="text" placeholder="书籍名称/作者姓名" placeholder-style="font-size: 12px; color: #999" @input="search" :value="searchText" />
			<view class="icon"><icon class="search-icon" type="search" @tap="confirmSearch" /></view>
		</view>
		<!-- 分类 -->
		<view class="type-box">
			<view class="topic">
				<view class="left">
					<view class="line"></view>
					<view class="text"><text>童书分类</text></view>
				</view>
				<view class="right" id="critical">
					<text v-if="isScroll" @click="open">展开</text>
					<text v-else>收起</text>
					<image src="../../static/library/icon-down.png" mode="" v-if="isScroll"></image>
					<image src="../../static/library/icon-up.png" mode="" v-else></image>
				</view>
			</view>
			<!-- 列表 -->
			<view class="list" id="list">
				<template v-if="productList && productList.length > 0">
					<view class="item" 
					v-for="(item, index) in productList" 
					:key="index"
					@tap="goDetail(item.id)">
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
						<view class="price"><text>借书币：30</text></view>
						<view class="label">
							<text v-for="(label, labelIndex) in item.tagInfo" :key="labelIndex" v-if="labelIndex < 2">{{ label.tag_name }}</text>
						</view>
						<view class="recommend">
							<view class="left">
								<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_zan.png" mode=""></image>
								<text>{{ item.peopleCount }}人推荐</text>
							</view>
							<view class="right" v-if="item.stock.usageCount" @tap.stop="push(item)"><text>加入书篮</text></view>
							<view class="right" 
							v-if="item.stock.usageCount == 0" 
							style="background: #ccc;"
							@tap.stop="notice">
								<text>加入书篮</text>
							</view>
						</view>
					</view>
				</template>
				<!-- 分类弹窗 -->
				<uni-popup ref="typepopup" type="bottom" @change="popupChange">
					<view :style="{ height: height }" class="popup-box">
						<view v-for="(item, index) in typeList" :key="index" class="popup-item" :class="currentIndex == index ? ' active' : ''" @tap="changeType(index)">{{ item.title }}</view>
					</view>
				</uni-popup>
			</view>
		</view>
		<!-- 书篮 -->
		<view class="library-box" v-if="len" @tap="goCart">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_cart.png" mode=""></image>
			<text>{{ len }}</text>
		</view>
		<!-- 加载组件 -->
		<uni-load-more :status="loadStatus" :content-text="loadText" />
		<!-- 权限弹窗 -->
		<uni-popup ref="powerPopUp" :maskClick="false">
			<view class="power-box" :style="{ 'width': popUpWidth }">
				<image src="../../static/library/power-banner.png" 
				mode="widthFix"></image>
				<view class="context">
					<view class="title">
						<text>请绑定童书卡</text>
					</view>
					<view class="notice">
						<text>幼儿园合作用户请先绑定童书卡</text>
					</view>
					<view class="btn">
						<view @tap="goIndex">取消</view>
						<view>去绑卡</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	data() {
		return {
			height: 0,
			productList: [],
			isScroll: true,
			len: 0,
			loadStatus: 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '已经到底了'
			},
			currentIndex: 0,
			popUpWidth: 0,
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
			],
			searchText: ''
		};
	},
	components: {
		uniPopup,
		uniLoadMore
	},
	onLoad() {
		// this.$refs.powerPopUp.open()
		// 获取书籍列表
		this.getBooksList();
		this.len = uni.getStorageSync('offlineCartList').length;
		uni.getSystemInfo({
			success: res => {
				this.popUpWidth = res.windowWidth * 0.8 + 'px'
			}
		})
	},
	onShow() {
		this.len = uni.getStorageSync('offlineCartList').length;
	},
	onReady() {
		// 设置分类弹窗的高度
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#critical')
			.boundingClientRect(data => {
				uni.getSystemInfo({
					success: res => {
						this.height = res.windowHeight - (data.top + data.height) + 'px';
					}
				});
			})
			.exec();
	},
	onReachBottom() {
		if(this.searchText == '') {
			if (this.productList.length >= 20) {
				this.loadStatus = 'noMore';
				return;
			}
			this.$api.getGuess().then(res => {
				res.data.map(item => {
					this.productList.push(item);
				});
			});
		}
	},
	methods: {
		// 获取书籍列表
		getBooksList() {
			uni.showLoading({
				title: '数据家在中',
				mask: true
			});
			this.$api.getGuess().then(res => {
				uni.hideLoading();
				this.productList = res.data;
			});
		},
		// 监听弹窗发生改变事件
		popupChange(e) {
			if (e.show) {
				this.isScroll = false;
			} else {
				this.isScroll = true;
			}
		},
		// 打开分类弹窗
		open() {
			this.$refs.typepopup.open();
		},
		// 加入书篮
		push(add) {
			let arrList = uni.getStorageSync('offlineCartList') ? uni.getStorageSync('offlineCartList') : [];
			let arr = [];
			if (arrList && arrList.length > 0) {
				arrList.map(obj => {
					arr.push(obj.id);
				});
				if (arr.indexOf(add.id) === -1) {
					uni.showToast({
						title: '加入书篮成功',
						duration: 2000,
						icon: 'none',
						success: () => {
							arrList.unshift(add);
							this.len = arrList.length;
							uni.setStorageSync('offlineCartList', arrList);
						}
					});
				} else {
					uni.showToast({
						title: '相同图书请不要重复添加',
						duration: 2000,
						icon: 'none'
					});
				}
			} else {
				uni.showToast({
					title: '加入书篮成功',
					duration: 2000,
					icon: 'none',
					success: () => {
						arrList.push(add);
						this.len = arrList.length;
						uni.setStorageSync('offlineCartList', arrList);
					}
				});
			}
		},
		// 跳转到书篮tabbar页面
		goCart() {
			uni.reLaunch({
				url: '../cart/cart?flag=true'
			});
		},
		// 改变分类
		changeType(index) {
			this.currentIndex = index;
			// 关闭分类弹窗
			this.$refs.typepopup.close();
		},
		// 监听搜索框改变
		search(event) {
			this.searchText = event.detail.value;
		},
		// 确认搜索
		confirmSearch() {
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			let param = {
				filterItems: {
					search: this.searchText
				}
			};
			this.$api.getGoodsInfo(param).then(res => {
				uni.hideLoading();
				this.productList = res.data.rows;
				// this.searchText = '';
				this.loadStatus = 'noMore';
			});
		},
		// 提示书籍已借完
		notice() {
			uni.showToast({
				title: '此类书籍已借完，请选择其他书籍',
				icon: 'none',
				duration:2000
			})
		},
		// 跳转至商品详情页
		goDetail(id) {
			uni.navigateTo({
				url: './offline-bookdetail?bookID='+id
			})
		},
		// 点击权限弹窗取消那妞
		goIndex() {
			uni.switchTab({
				url: '../index/index'
			})
		}
	}
};
</script>

<style scoped>
/* header */
.header-box {
	height: 120rpx;
	background-image: linear-gradient(180deg, #6BD3EE, #A6F3F8);
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding-left: 40rpx;
	justify-content: space-between;
}
.header-box .user {
	width: 80rpx;
	height: 80rpx;
}
.header-box .user image {
	width: 100%;
	height: 100%;
	display: block;
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
	background: rgb(0, 128, 0);
	margin-right: 30rpx;
}
.type-box .topic .text {
	color: rgb(0, 128, 0);
}
.type-box .topic .right text {
	color: #00b4c9;
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
	justify-content: space-between;
	padding: 0 10rpx 20rpx 10rpx;
}
.type-box .list .item {
	text-align: center;
	box-sizing: border-box;
	width: 48.5%;
	margin-top: 20rpx;
	box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
	border-radius: 8rpx;
	padding: 20rpx 30rpx;
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
	background: rgba(157, 160, 174, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
}
.type-box .none-stock .none-notice {
	background-color: rgba(110, 116, 125, 0.8);
	color: #ffffff;
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
	color: rgb(94, 94, 94);
	padding-top: 8rpx;
	text-align: left;
}
.type-box .list .price {
	font-size: 30rpx;
	color: rgb(94, 94, 94);
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
	background-color: #fffbe6;
	color: #aa6428;
	margin-right: 10rpx;
	box-sizing: border-box;
	padding: 5rpx 10rpx;
	border-radius: 20rpx;
}
.type-box .list .recommend {
	display: flex;
	align-items: center;
	color: #bababa;
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
	color: #ffffff;
	background-color: #2aaec4;
	border-top-left-radius: 20rpx;
	border-bottom-left-radius: 20rpx;
	padding: 5rpx 14rpx;
	position: relative;
	left: 30rpx;
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
	box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 1);
	height: 60rpx;
	border-radius: 8rpx;
}
.popup-box .popup-item:nth-child(4n) {
	margin-right: 0;
}
.popup-box .popup-item.active {
	background: #00b7cc;
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
	box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 1);
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
	background: rgb(250, 81, 81);
	display: flex;
	justify-content: center;
	align-items: center;
}
/* 权限弹窗 */
.power-box {
	box-sizing: border-box;
	position: relative;
}
.power-box image {
	width: 100%;
}
.power-box .context {
	position: absolute;
	left: 0;
	top: 360rpx;
	width: 100%;
}
.power-box .context .title {
	font-weight: 700;
	font-size: 32rpx;
	text-align: center;
	margin-bottom: 24rpx;
	color: #12A4BD;
}
.power-box .context .notice {
	font-size: 28rpx;
	text-align: center;
	color: #333;
}
.power-box .btn {
	display: flex;
	box-sizing: border-box;
	padding: 0 36rpx;
	box-sizing: border-box;
	margin-top: 80rpx;

}
.power-box .btn view {
	flex: 1;
	font-size: 28rpx;
	line-height: 70rpx;
	background: #fff;
	border-radius: 40rpx;
	box-sizing: border-box;
	text-align: center;
}
.power-box .btn view:nth-child(1) {
	margin-right: 12rpx;;
	background: #F9F9F9;
	border: 1px solid #EEEEEF;
	color: #ADADAD;
}
.power-box .btn view:nth-child(2) {
	margin-left: 12rpx;
	background-image: linear-gradient(180deg, #40AED1, #69D9E4);
	color: #fff;
}
</style>
