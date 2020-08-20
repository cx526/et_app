<template>
	<view 
	:style="{ height: showModel ? windowHeight : '' }" 
	:class="showModel ? 'overflow' : ''"
	v-show="isLogin">
		<!-- 头部 -->
		<view class="header-box">
			<view class="user">
				<image :src="$aliImage + 'user-default.png'"
				v-if="!userInfo.avatar"></image>
				<image 
				:src="userInfo.avatar"
				style="border-radius: 50%;"></image>
			</view>
			<view class="info">
				<view class="item">
					<image :src="$aliImage + 'userinfo-icon-01.png'"></image>
					<text>{{ coin }}</text>
				</view>
				<view class="item">
					<image :src="$aliImage + 'userinfo-icon-02.png'"></image>
					<text>{{ shell }}</text>
				</view>
				<view class="item">
					<image :src="$aliImage + 'icon-03.png'"></image>
					<text>{{ free }}</text>
				</view>
			</view>
		</view>
		<!-- banner -->
		<view class="banner-box" id="banner">
			<image :src="$aliImage + 'library-banner.png'" style="height: 300rpx;"></image>
			<view class="name" v-if="userInfo.schoolInfo.name">
				<uni-notice-bar 
				scrollable="true" 
				single="true" 
				:text="userInfo.schoolInfo.name + '欢迎您！'" 
				color="#fff" 
				backgroundColor="rgba(255,255,255,.3)" 
				:single="true">
				</uni-notice-bar>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="search-box" id="search">
			<view class="search">
				<image :src="$aliImage + 'search.png'" class="icon-search"></image>
				<input type="text" disabled placeholder="请输入书名/作者/关键词..." placeholder-style="font-size: 30rpx;color: #C5C5C5" @tap="goSearch" />
				<view class="right" @tap="open">
					<image :src="$aliImage + 'classify.png'"></image>
					<text>分类</text>
				</view>
			</view>
		</view>
		<!-- 分类 -->
		<view class="type-box">
			<!-- 列表 -->
			<view class="list" id="list">
				<template v-if="productList && productList.length > 0">
					<view class="item" v-for="(item, index) in productList" :key="index" @tap="goDetail(item.id)">
						<image :src="item.forGoodsPic[0].url" mode="" class="show"></image>
						<!-- 无库存显示totalDockerUse -->
						<view class="none-stock" 
						v-if="item.stockCount.totalDockerUse === 0">
							<view class="none-notice">
								<text>暂时</text>
								<text>借完</text>
							</view>
						</view>
						<view class="title">
							<text>{{ item.title }}</text>
						</view>
						<view class="price"><text>借书币：{{ item.price }}</text></view>
						<view class="label">
							<text v-for="(label, labelIndex) in item.tagInfo" :key="labelIndex" v-if="labelIndex < 2">{{ label.tag_name }}</text>
						</view>
						<view class="recommend">
							<view class="left">
								<image :src="$aliImage + 'index_zan.png'" mode=""></image>
								<text>{{ item.peopleCount }}人推荐</text>
							</view>
							<view class="right" v-if="item.stockCount.totalDockerUse" @tap.stop="push(item)"><text>加入书篮</text></view>
							<view class="right" v-if="item.stockCount.totalDockerUse == 0" style="background: #ccc;" @tap.stop="notice"><text>加入书篮</text></view>
						</view>
					</view>
				</template>
				<!-- 分类弹窗 -->
				<popup v-model="showModel" position="bottom">
					<view :style="{ height: height, position: absolute, left: 0, bottom: 0 }" class="popUp">
						<view class="search-box active">
							<view class="search active">
								<image :src="$aliImage + 'search.png'" class="icon-search"></image>
								<input type="text" disabled placeholder="请输入书名/作者/关键词..." placeholder-style="font-size: 30rpx;color: #C5C5C5" @tap="goSearch" />
								<view class="right" @tap="getAllProductList" style="top: -1px;">
									<image :src="$aliImage + 'classify.png'"></image>
									<text>全部</text>
								</view>
							</view>
						</view>
						<view class="popup-box">
							<view class="popup-item" >
								<!-- <view class="topic">{{ item.name }}</view> -->
								<view class="popup-list">
									<view class="subset" 
									v-for="(item, index) in typeList" :key="index"
									:class="item.isSelect ? 'active' : ''"
									@tap="changeType(item.id, index)">
										{{ item.tag_name }}
									</view>
								</view>
							</view>
						</view>
					</view>
				</popup>
			</view>
		</view>
		<!-- 书篮 -->
		<view class="library-box" v-if="len" @tap="goCart">
			<image :src="$aliImage + 'bookdetail_cart.png'" mode=""></image>
			<text>{{ len }}</text>
		</view>
		<!-- 加载组件 -->
		<view style="background: #EBF7FF;"><uni-load-more :status="loadStatus" :content-text="loadText" /></view>

		<!-- 权限弹窗 -->
		<uni-popup ref="powerPopUp" :maskClick="false">
			<view class="power-box" :style="{ width: popUpWidth }">
				<image :src="$aliImage + 'power-banner.png'" mode="widthFix"></image>
				<view class="context">
					<view class="title"><text>暂未绑定幼儿园信息！</text></view>
					<view class="notice"><text>请先填写幼儿园信息</text></view>
					<view class="btn">
						<view @tap="goIndex">取消</view>
						<view @tap="goCard">去填写</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
import Popup from '@/components/lvv-popup/lvv-popup.vue';
export default {
	data() {
		return {
			$aliImage: this.$aliImage, //静态图片路径
			isLogin: false, //登录限制
			showModel: false, //控制分类弹窗的显示/隐藏
			height: 0, //定义分类弹窗的高度
			productList: [],
			len: 0,
			loadStatus: 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '暂无更多数据'
			},
			popUpWidth: 0,
			typeList: [],
			currentPage: 1, // 请求接口的当前页码
			pageSize: 20, //接口每次返回几条数据
			isType: true, //区别是全部上拉加载更多还是单个分类上拉加载更多
			id: '', //请求分类的id
			windowHeight: 0,
			userInfo: '',//存储用户个人账户信息
			shell: 0,//五车贝
			coin: 0,//积分
			free: 0,//免费借阅次数
			docker_mac: '',
			isSearch: false,
		};
	},
	components: {
		uniPopup,
		uniLoadMore,
		uniNoticeBar,
		Popup
	},
	async onLoad(option) {
		
		// 从搜索页跳转过来
		if (option.isSearch) {
			this.isSearch = option.isSearch
			// 获取用户个人账户信息
			this.getUserInfo()
			this.productList = JSON.parse(option.productList);
			this.loadStatus = 'noMore';
			
		} else {
			// 获取用户个人账户信息
			this.getUserInfo();
		}
		
		// 读取书篮书籍的本数
		this.len = uni.getStorageSync('offlineCartList').length;
		uni.getSystemInfo({
			success: res => {
				this.popUpWidth = res.windowWidth * 0.8 + 'px';
				this.windowHeight = res.windowHeight + 'px';
			}
		});
	},
	onShow() {
		// 检测是否有登录
		this.getLogin()
		// 获取用户个人账户信息
		this.getUserInfo();
		this.len = uni.getStorageSync('offlineCartList').length;
		
	},
	onReady() {
		// 设置分类弹窗的高度
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#banner')
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
		// 分类加载更多
		if (this.loadStatus !== 'noMore' && !this.isType) {
			this.currentPage = this.currentPage + 1;
			this.getMoreList(this.id);
		} else {
			this.currentPage = this.currentPage + 1;
			if (this.loadStatus !== 'noMore') {
				this.$api.offlineGetBooksList({
					filterItems: {
						docker_mac: this.userInfo.dockerInfo.docker_mac
					},
					
					pageSize: this.pageSize,
					currentPage: this.currentPage
				}).then(res => {
					this.productList = [...this.productList, ...res.data.rows];
					if (res.data.rows.length < this.pageSize) {
						this.loadStatus = 'noMore';
					}
				});
			}
		}
	},
	methods: {
		// 检测用户的登录状态
		getLogin() {
			let userInfo = uni.getStorageSync('userInfo');
			if (userInfo.name === 'guest' || !userInfo) {
				uni.showModal({
					title: '您还未登录！',
					content: '是否前往登录页面?',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}else {
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}
					}
				})
			}else {
				this.isLogin = true
			}
		},
		// 获取用户个人账户信息
		getUserInfo() {
			// 有授权登录过才去请求个人信息
			if(this.isLogin) {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({ 
					filterItems: { mobile }
					}).then(res => {
					this.userInfo = res.data[0];
					console.log(this.userInfo)
					console.log(this.userInfo.schoolInfo.name)
					// 如果幼儿园不存在提示填写幼儿园信息弹窗
					if(!this.userInfo.schoolInfo.name) {
						// 显示绑卡弹窗
						this.$refs.powerPopUp.open()
					}else {
						// 如果绑定的幼儿园没有书柜
						if(!this.userInfo.dockerInfo) {
							this.isLogin = false
							uni.showToast({
								title: '此幼儿园暂时不是合作用户',
								icon: 'none',
								duration:1500,
								success: res => {
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/index/index'
										})
									}, 2000)
									
								}
							})
							return
						}
						this.docker_mac = this.userInfo.dockerInfo.docker_mac 
						this.coin = this.userInfo.coin ? this.userInfo.coin : '';//积分
						this.shell = (+this.userInfo.shell).toFixed(2) ? (+this.userInfo.shell).toFixed(2) : ''; //五车贝
						// 计算用户的免费次数
						this.getUserFreeCount()
						// 获取书籍分类
						this.getBooksType();
						// 获取所在幼儿园书柜的所有书籍(如果从搜索页跳转过来不调用)
						!this.isSearch && this.getBooksList();
					}
					
					
				})
			}

		},
		// 计算用户的免费次数
		getUserFreeCount() {
			// 防止传过来的是字符串
			this.free = (+this.userInfo.free_bind )+ (+this.userInfo.free_month)
		},
		// 获取当前所属幼儿园书柜书籍列表
		getBooksList() {
			this.productList = [];
			this.loadStatus = 'loading';
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			this.$api.offlineGetBooksList({
				filterItems: {
					docker_mac: this.userInfo.dockerInfo.docker_mac,
				},
				pageSize: this.pageSize,
				currentPage: this.currentPage
			})
			.then(res => {
				uni.hideLoading();
				this.productList = res.data.rows;
				if (res.data.rows.length < this.pageSize || res.data.rows.length == 0) {
					this.loadStatus = 'noMore';
				}
			})
			.catch(err => {
				uni.hideLoading()
			})
		},
		// 获取书籍分类
		getBooksType() {
			this.$api.offlineBookType({
				docker_mac: this.docker_mac
			}).then(res => {
				res.data.rows.map(item => {
					item.isSelect = false;
				});
				this.typeList = res.data.rows;
			});
		},
		// 获取全部书籍
		getAllProductList() {
			this.getBooksList();
			this.isType = true;
			this.showModel = false;
			// this.$refs.typepopup.close();
		},
		// 改变分类
		changeType(id, index) {
			// 改变分类时重置需要请求的参数
			this.id = id;
			this.currentPage = 1;
			// 重置区分全部还是单个分类
			this.isType = false;
			this.loadStatus = 'loading';
			// 动态添加样式；
			this.typeList.map(item => {
				item.isSelect = false;
			})
			this.typeList[index].isSelect = true
			// 手动关闭弹窗
			this.showModel = false;
			// 发起请求
			uni.showLoading({
				title: '数据加载中',
				mask: true
			});
			
			// 请求分类商品的参数
			let param = {
				pageSize: this.pageSize,
				currentPage: this.currentPage,
				filterItems: {
					tags: this.id,
					docker_mac: this.docker_mac
				}
			};
			
			this.$api.offlineOrderCheckStock(param).then(res => {
				uni.hideLoading();
				this.productList = [];
				this.productList = res.data.rows;
				// 返回数据小于20时默认不启动上拉加载更多
				if (this.productList.length < this.pageSize) {
					this.loadStatus = 'noMore';
				}	
			});
		},
		// 分类上拉加载更多数据
		getMoreList(id) {
			// 请求参数
			let param = {
				pageSize: this.pageSize,
				currentPage: this.currentPage,
				filterItems: {
					tags: id,
					docker_mac: this.docker_mac
				}
			};
			this.$api.offlineOrderCheckStock(param).then(res => {
				this.productList = [...this.productList, ...res.data.rows];
				if (res.data.rows < this.pageSize) {
					this.loadStatus = 'noMore';
				}
			});
		},
		// 打开分类弹窗
		open() {
			this.showModel = true;
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
		// 跳转到搜索页
		goSearch() {
			uni.navigateTo({
				url: './offline-search'
			});
		},
		// 提示书籍已借完
		notice() {
			uni.showToast({
				title: '此类书籍已借完，请选择其他书籍',
				icon: 'none',
				duration: 2000
			});
		},
		// 跳转至商品详情页
		goDetail(id) {
			uni.navigateTo({
				url: './offline-bookdetail?bookID=' + id
			});
		},
		// 点击权限弹窗取消按钮(返回首页)
		goIndex() {
			uni.switchTab({
				url: '../index/index'
			});
		},
		// 跳转到绑卡页面
		goCard() {
			uni.navigateTo({
				url: '/pages/my/myInfoList'
			})
		},
	}
};
</script>
<style>
page {
	background: #ebf7ff;
}
</style>
<style scoped>
.overflow {
	overflow: hidden;
}
/* header */
.header-box {
	height: 120rpx;
	background-image: linear-gradient(180deg, #6bd3ee, #a6f3f8);
	display: flex;
	align-items: center;
	box-sizing: border-box;
	padding-left: 40rpx;
	padding-right: 40rpx;
	justify-content: space-between;
}
.header-box .user {
	width: 80rpx;
	height: 80rpx;
	box-sizing: border-box;
	margin-right: 112rpx;
}
.header-box .user image {
	width: 100%;
	height: 100%;
	display: block;
}
.header-box .info {
	display: flex;
	align-items: center;
}
.header-box .info .item {
	background: rgba(255, 255, 255, 0.3);
	width: 140rpx;
	line-height: 54rpx;
	display: flex;
	align-items: center;
	border-radius: 40rpx;
	justify-content: center;
	position: relative;
	box-sizing: border-box;
	margin-right: 28rpx;

}
.header-box .info .item:last-child {
	margin-right: 0;
	width: 90rpx;
}
.header-box .info .item image {
	width: 64rpx;
	height: 64rpx;
	position: absolute;
	left: -20rpx;
	top: -8rpx;
}
.header-box .info .item text {
	font-size: 26rpx;
	color: #fff;

	margin-left: 22rpx;
	text-shadow: 0 0 8rpx #2aaec4;
}
/* banner */
.banner-box {
	box-sizing: border-box;
	padding: 40rpx 40rpx 0 40rpx;
	background: #ebf7ff;
	position: relative;
}
.banner-box image {
	width: 100%;
	display: block;
}
.banner-box .name {
	position: absolute;
	left: 90rpx;
	bottom: 24rpx;
	color: #fff;
	width: 260rpx;
}
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
	background-image: linear-gradient(180deg, #7BCFEC , #9BE6E7);
	font-size: 30rpx;
	align-items: center;
	border-bottom-right-radius: 40rpx;
	border-top-right-radius: 40rpx;
	box-sizing: border-box;
	padding-left: 18rpx;
	color: #fff;
}
.search-box .right image {
	width: 40rpx;
	height: 40rpx;
	margin-right: 12rpx;
}

/* type */
.type-box {
	box-sizing: border-box;
	padding: 0 20rpx;
	background: #ebf7ff;
}

/* list */
.type-box .list {
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	justify-content: space-between;
	padding: 0 10rpx 20rpx 10rpx;
	position: relative;
	top: -20rpx;
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
	background: #fff;
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
.popUp {
	background: #fff;
	overflow: scroll;
	position: absolute;
	left: 0;
	border: 0;
	width: 100%;
}
.popup-box {
	box-sizing: border-box;
	background: #fff;
	box-sizing: border-box;
	padding: 24rpx 30rpx;
	font-size: 28rpx;
	color: #333;
}
.popup-box .popup-item {
	box-sizing: border-box;
}
.popup-box .popup-item .topic {
	color: #30aac3;
	font-size: 30rpx;
	margin-bottom: 24rpx;
}
.popup-box .popup-item .popup-list {
	display: flex;
	flex-wrap: wrap;
}
.popup-box .popup-item .popup-list .subset {
	width: 22%;
	margin-right: 4%;
	box-sizing: border-box;
	color: #8b8b8b;
	font-size: 28rpx;
	background: #f9f9f9;
	text-align: center;
	margin-bottom: 24rpx;
	border-radius: 28rpx;
	line-height: 50rpx;
}
.popup-box .popup-item .popup-list .subset:nth-child(4n) {
	margin-right: 0;
}
.popup-box .popup-item .popup-list .subset.active {
	color: #fff;
	background: #00b4c9;
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
	color: #12a4bd;
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
	margin-right: 12rpx;
	background: #f9f9f9;
	border: 1px solid #eeeeef;
	color: #adadad;
}
.power-box .btn view:nth-child(2) {
	margin-left: 12rpx;
	background-image: linear-gradient(180deg, #40aed1, #69d9e4);
	color: #fff;
}
</style>
