<template>
	<view class="offline-box" :style="{ 'min-height': minHeight }">
		<view class="notice-box">
			<text>我的五车贝：</text>
			<text style="margin-right: 16rpx;">{{ shell }}</text>
			<text>剩余免费书本：</text>
			<text>{{ free }}</text>
		</view>
		<view style="font-size: 30rpx;background: #fff;text-align: center;line-height: 40rpx;"><text>1个订单只能用1本免费借阅额度哦</text></view>
		<!-- 没有书籍时显示 -->
		<view class="none-books" v-if="booksNumber == 0" @tap="chooseBooks">
			<view class="none">
				<image src="../../static/cart/add.png" mode=""></image>
				<text>请先添加书本</text>
			</view>
		</view>
		<!-- 书篮存在 -->
		<view class="books-box" v-else>
			<scroll-view scroll-y :style="'height:' + scrollHeight">
				<view class="item" v-for="(item, index) in bookList" :key="index">
					<view class="goods-info">
						<view class="left"><checkbox :checked="item.isSelect" style="transform: scale(0.7);" :disabled="item.stockCount.totalDockerUse === 0" @tap="selechBook(item)" /></view>
						<view class="main">
							<!-- 库存为零时显示 -->
							<view class="none-stock" 
							v-if="item.stockCount.totalDockerUse == 0">
								<view class="none-notice">
									<text>暂时</text>
									<text>借完</text>
								</view>
							</view>
							<view class="show"><image :src="item.forGoodsPic[0].url" mode=""></image></view>
							<view class="topic">
								<text class="title">{{ item.title }}</text>
								<text class="condition" v-if="item.stockCount.totalDockerUse != 0">可借阅</text>
								<text style="font-size: 28rpx; color: #f00;" v-else>已借完</text>
								<view class="price-box">
									<view class="price">
										<text>五车贝：{{ item.price }}</text>
									</view>
									<text>x1</text>
								</view>
							</view>
						</view>
						<view class="right">
							<image :src="$aliImage + 'rubbish.png'" mode="" @tap="delBook(item.id)"></image>
							</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部 -->
		<view class="bottom-box">
			<view style="display: flex;align-items: center;">
				<view class="left">
					<checkbox value="cb" :checked="offlineAllSelect" style="transform: scale(0.7);" @tap="selectAllBooks" />
					<text>全选</text>
				</view>
				<view class="center">
					<!-- 选中书籍显示 -->
					<view v-if="len">
						<text>合共：</text>
						<text style="color: #039EB9;">{{ len }}</text>
						<text style="margin-right: 10rpx;">本</text>
						<text>五车贝：</text>
						<text style="color: #039EB9;">{{ price }}</text>
					</view>
					<!-- 没选中时显示 -->
					<view v-else><text>合计：0本</text></view>
					<view v-if="len">
						<text style="color: #999;font-size: 22rpx;">
							押金：29
						</text>
						<text v-if="deposit > 0 && !userInfo.member_status">
						(已充值)
						</text>
						<text v-else-if="userInfo.member_status == 1"
						style="color: #999;">
						(会员免押)
						</text>
					</view>
				</view>
			</view>

			<view class="right">
				<view class="del" @tap="delBooksList"><text>删除</text></view>
				<view class="borrow" @tap="borrow"><text>借阅</text></view>
			</view>
		</view>
		<!-- 借书币不足显示弹窗 -->
		<uni-popup ref="popup" :maskClick="false">
			<view class="balance-box" :style="{ width: popUpWidth }">
				<view class="title"><text>五车贝不足！</text></view>
				<view class="notice">
					<view>
						<text>本次需要五车贝：</text>
						<text style="color: #12A4BD;">{{ price }}</text>
					</view>

					<view>
						<text>您的五车贝：</text>
						<text style="color: #12A4BD;">{{ shell }}</text>
					</view>
				</view>
				<view class="show"><image :src="$aliImage + 'popup-banner.png'" mode="widthFix"></image></view>
				<view class="btn">
					<view @tap="cancel('popup')">取消</view>
					<view @tap="goPay">去充值</view>
				</view>
			</view>
		</uni-popup>
		<!-- 押金不足显示弹窗 -->
		<uni-popup ref="depositPopUp" :maskClick="false">
			<view class="balance-box" :style="{ width: popUpWidth }">
				<view class="title"><text>押金不足！</text></view>
				<view class="notice">
					<view>
						<text>线下借阅需要押金：</text>
						<text style="color: #12A4BD;">29元</text>
					</view>

					<view>
						<text>您的押金：</text>
						<text style="color: #12A4BD;">{{ deposit }}</text>
					</view>
				</view>
				<view class="show"><image :src="$aliImage + 'popup-banner.png'" mode="widthFix"></image></view>
				<view class="btn">
					<view @tap="cancel('depositPopUp')">取消</view>
					<view @tap="goPay">去充值</view>
				</view>
			</view>
		</uni-popup>
		<!-- 确认支付弹窗 -->
		<uni-popup ref="payPopUp" :maskClick="false">
			<view class="balance-box" :style="{ width: popUpWidth }">
				<view class="title"><text>订单确认</text></view>
				<view class="notice">
					<view>
						<text>本次需要支付五车贝：</text>
						<text style="color: #12A4BD;">{{ price }}</text>
					</view>

					<view>
						<text>您的借阅书籍数量：</text>
						<text style="color: #12A4BD;">{{ len }}</text>
					</view>
				</view>
				<view class="show"><image mode="widthFix" style="width: 300rpx; height: 375rpx;" :src="$aliImage + 'library-pop-banner.png'"></image></view>
				<view class="btn">
					<view @tap="cancel('payPopUp')">取消</view>
					<view @tap="surePay">确认支付</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
const bookListData = require('@/common/carDataOption.js');
import uniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
	components: {
		uniPopup
	},
	props: {
		count: Number,
		scrollHeight: String,
		offlineBooksList: Array,
		minHeight: String,
		popUpWidth: String
	},

	data() {
		return {
			goods_id: '', // 储存下单书籍的id,格式1,2,3
			$aliImage: this.$aliImage, //静态图片域名
			offlineAllSelect: false, //全选/反选
			bookList: [], //储存书篮书籍
			booksNumber: 0, // 书篮书籍数目(用于判断书篮是否存在)
			price: 0, // 选中书籍需支付的借书币
			len: 0, // 选中书籍的本书
			chooseBookList: [], //储存选中书籍
			integrate: 0, // 用户当前积分(接口拿)
			free: 0, //免费借阅次数(接口拿),
			shell: 0, //用户当前的五车贝(接口拿)
			deposit: 0, // 用户当前的押金(接口拿)
			userInfo: '', //储存用户账号个人信息
			isLogin: true, //检测登录状态
			docker_mac: '', //更新库存参数
			isStock: true // 判断是否有商品存在没库存情况
		};
	},
	created() {
		this.booksNumber = this.count; //判断书篮是否存在
		this.bookList = uni.getStorageSync('offlineCartList');
		// 获取用户的个人账号信息
		this.getUserInfo();
	},
	methods: {
		// 计算用户当前免费的借阅次数
		getUserFreeCount() {
			// 防止传过来的是字符串
			this.free = +this.userInfo.free_bind + +this.userInfo.free_month;
		},
		// 获取用户的个人信息
		getUserInfo() {
			let tmpUserInfo = uni.getStorageSync('userInfo');
			let mobile = tmpUserInfo.mobile
			if(!tmpUserInfo || JSON.stringify(tmpUserInfo) == '{}' || !mobile || mobile.replace(/\s*/g, '') == '') {
				uni.showToast({
					title: '请先登录',
					icon: 'none',
					duration: 1500
				})
				return
			}
			this.$api.offlineUserDockerInfo({ mobile })
				.then(res => {
					this.userInfo = res.data;
					// 如果不是合作幼儿园
					if (!this.userInfo.dockerInfo) {
						uni.showToast({
							title: '所属幼儿园暂时不是合作学校',
							icon: 'none',
							duration: 2000,
							success: res => {
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}, 2000);
							}
						});
						return;
					}
					//储存用户积分;
					this.integrate = Number(this.userInfo.coin);
					//储存用户的五车贝;
					this.shell = (+this.userInfo.shell).toFixed(2);
					//储存用户的押金
					this.deposit = (+this.userInfo.deposit).toFixed(2);
					this.docker_mac = this.userInfo.dockerInfo.docker_mac;
					// 计算用户的免费借阅次数
					this.getUserFreeCount();
					this.upDateStock();
				})
				.catch(err => {
					uni.hideLoading();
				});
		},
		// 更新库存
		upDateStock() {
			// 获取线下书篮书籍
			let bookList = uni.getStorageSync('offlineCartList');
			// 如果线下书篮为空，默认不发请求
			if (bookList.length == 0) {
				return;
			}
			// 储存书篮所有书籍的id
			let goods_id = [];
			let idString = '';
			bookList &&
				bookList.map(item => {
					goods_id.push(item.id);
				});
			// 组合商品参数id去请求
			for (let i = 0; i < goods_id.length; i++) {
				idString = idString + "'" + goods_id[i] + "'" + ',';
			}
			idString = idString.substring(0, idString.lastIndexOf(','));
			this.$api
				.offlineOrderCheckStock({
					filterItems: {
						idString,
						docker_mac: this.docker_mac
					}
				})
				.then(res => {
					uni.hideLoading();
					if (res.data.rows.length == 0) {
						this.isStock = false;
						// 如果选中但没库存更改选中状态
						bookList &&
							bookList.map(item => {
								if (item.stockCount.totalDockerUse == 0 && item.isSelect) {
									item.isSelect = false;
								}
							});
						// 更新缓存
						uni.setStorageSync('offlineCartList', bookList);
						this.bookList = uni.getStorageSync('offlineCartList');
						// 若有选中计算价格
						this.coungPrice();
						return;
					} else {
						// 实时更新本地书籍的缓存
						res.data.rows.map((item, index) => {
							bookList &&
								bookList.map((list, listIndex) => {
									if (item.id === list.id) {
										bookList[listIndex].stockCount.totalDockerUse = item.stockCount.totalDockerUse;
									}
									// 选中书籍存在无库存情况
									if (!bookList[listIndex].stockCount.totalDockerUse && bookList[listIndex].isSelect) {
										this.isStock = false;
									}
									// 如果选中但没库存更改选中状态
									if (bookList[listIndex].stockCount.totalDockerUse == 0 && bookList[listIndex].isSelect) {
										bookList[listIndex].isSelect = false;
									}
								});
						});
						// 更新缓存
						uni.setStorageSync('offlineCartList', bookList);
						this.bookList = uni.getStorageSync('offlineCartList');
						// 若有选中计算价格
						this.coungPrice();
					}
				});
		},
		// 选取书籍
		chooseBooks() {
			uni.switchTab({
				url: '../library/library'
			});
		},
		// 计算借书币
		coungPrice() {
			let flag = true;
			this.price = 0;
			let chooseBookList = [];
			// 获取用户选中的书籍列表
			if (this.bookList.length != 0) {
				chooseBookList = this.bookList.filter(item => {
					return item.isSelect === true;
				});
			}
			// 选中书籍本数
			this.len = chooseBookList.length;
			if (chooseBookList.length == 0) {
				flag = false; //全选不选中
			} else {
				chooseBookList.map(item => {
					if (this.free === 0 || this.integrate / 50 < 1 || this.len >= 2) {
						this.price = (+this.price + +item.price).toFixed(2);
					} else {
						this.price = 0;
					}
				});
				// 每次点击复选框都要做一下判断此时全选是否选中
				if (chooseBookList.length != this.bookList.length) {
					flag = false;
				}
				// 赋值全选按钮的checkbox值
				this.offlineAllSelect = flag;
				// 同步缓存数据
				uni.setStorageSync('offlineCartList', this.bookList);
			}
		},
		// 选择书本(点击复选框)
		selechBook(item) {
			// 判断全选复选框是否选中
			let flag = true;
			item.isSelect = !item.isSelect;
			this.bookList &&
				this.bookList.map(list => {
					if (!list.isSelect) {
						flag = false;
					}
				});
			this.offlineAllSelect = flag;
			// 实时计算借书币
			this.coungPrice();
		},
		// 全选/全不选
		selectAllBooks() {
			this.offlineAllSelect = !this.offlineAllSelect;
			this.bookList &&
				this.bookList.map(item => {
					// 如果库存数为0,依然不给选
					if (item.stockCount.totalDockerUse) {
						item.isSelect = this.offlineAllSelect;
					} else {
						item.isSelect = this.offlineAllSelect;
					}
				});
			this.coungPrice();
		},
		// 删除书籍(单独)
		delBook(id) {
			let dataList = this.bookList;
			uni.showModal({
				title: '是否确认移除此书籍?',
				success: res => {
					if (res.confirm) {
						dataList &&
							dataList.map((item, index) => {
								if (item.id === id) {
									dataList.splice(index, 1);
								}
							});
						this.bookList = dataList;
						// 更新缓存
						uni.setStorageSync('offlineCartList', this.bookList);
						// 更新tab书篮书籍数
						bookListData.countBookLength();
						// 提示父组件刷新当前书籍数目
						this.$emit('countChange');
						this.booksNumber = uni.getStorageSync('offlineCartList').length;
						this.bookList = uni.getStorageSync('offlineCartList');
						// 重新计算借书币
						this.coungPrice();
						// 如果当前没有书籍，全选复选框默认为false
						if (this.booksNumber === 0) {
							this.offlineAllSelect = false;
						}
					}
				}
			});
		},
		// 点击删除键
		delBooksList() {
			let flag = false;
			let dataList = this.bookList;
			// 判断是否选中书籍
			this.bookList &&
				this.bookList.map((item, index) => {
					if (item.isSelect) {
						flag = true;
					}
				});

			if (!flag) {
				uni.showToast({
					title: '请选择要移除的书籍',
					duration: 1000,
					icon: 'none'
				});
			} else {
				uni.showModal({
					title: '是否确认要移除此书籍?',
					success: res => {
						if (res.confirm) {
							if (dataList.length != 0) {
								for (let i = 0; i < dataList.length; i++) {
									if (dataList[i].isSelect) {
										dataList.splice(i, 1);
										i--;
									}
								}
							}

							this.bookList = dataList;
							// 更新缓存
							uni.setStorageSync('offlineCartList', this.bookList);
							// 更新tab书篮书籍数
							bookListData.countBookLength();
							// 提示父组件刷新当前书籍数目
							this.$emit('countChange');
							this.booksNumber = uni.getStorageSync('offlineCartList').length;
							this.bookList = uni.getStorageSync('offlineCartList');
							// 重新计算借书币
							this.coungPrice();
							// 如果当前没有书籍，全选复选框默认为false
							if (this.booksNumber === 0) {
								this.offlineAllSelect = false;
							}
						}
					}
				});
			}
		},
		// 价格排序
		compare(property) {
			return (a, b) => {
				var value1 = a[property];
				var value2 = b[property];
				return value1 - value2;
			};
		},
		// 下单成功后需要删除书篮下单过得书籍
		handlePlaceBooks() {
			let cacheBooksList = uni.getStorageSync('offlineCartList');
			let chooseBooksList = this.chooseBookList;
			for (let i = 0; i < cacheBooksList.length; i++) {
				for (let j = 0; j < chooseBooksList.length; j++) {
					if (cacheBooksList[i].id == chooseBooksList[j].id) {
						cacheBooksList.splice(i, 1);
					}
				}
			}
			uni.setStorageSync('offlineCartList', cacheBooksList);
			// 通知父组件更改本地书籍数量
			this.$emit('countChange');
		},
		// 检测登录状态
		getLogin() {
			let userInfo = uni.getStorageSync('userInfo');
			if (!userInfo || !userInfo.name || userInfo.name === 'guest') {
				uni.showModal({
					title: '您还未登录！',
					content: '是否前往登录页面?',
					success: res => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo');
							uni.reLaunch({ url: '../guide/guide' });
						} else {
							this.isLogin = false;
						}
					}
				});
			}
		},
		// 借阅
		borrow() {
			// 检测是否有登录
			this.getLogin();
			if (this.isLogin) {
				// 获取用户选中的书籍列表
				this.chooseBookList = this.bookList && this.bookList.filter(item => {
						return item.isSelect === true;
					});
				// 更新所选商品本地缓存的库存数据
				let goodsIDs = [];
				this.chooseBookList &&
					this.chooseBookList.forEach(item => {
						goodsIDs.push(item.id);
					});
				// 价格升序
				// let result = this.chooseBookList && this.chooseBookList.sort(this.compare('price'));
				// 实际免费借阅次数
				// let reality = Math.floor(this.integrate / 50); //(积分/50)
				// 实际所需支付借书币
				let amount = 0;
				// 选中书籍的本书
				let len = this.chooseBookList.length;
				// 用户没有选中书籍
				if (this.chooseBookList.length === 0) {
					uni.showToast({
						title: '请先选择需要借阅的书籍',
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				// 每单借阅小于10本
				else if (this.chooseBookList.length > 10) {
					uni.showToast({
						title: '每单借阅总数不能超过10本',
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				// 所选书籍中存在没有库存的情况
				else if (!this.isStock) {
					uni.showToast({
						title: '所选书籍存在库存不足的情况，请重新选择',
						icon: 'none',
						duration: 2000
					});
					return;
				}

				else {
					let offlinePlaceBook = this.chooseBookList
					uni.setStorageSync("offlinePlaceBook", offlinePlaceBook)
					uni.navigateTo({
						// url: '/pages/library/offline-order?chooseBookList='+JSON.stringify(this.chooseBookList)
						url: '/pages/library/offline-order'
					})
				}

				//1.用户没有免费借阅次数或者积分小于50或者借阅数量大于等于2本时(直接计算所选书籍累加的五车贝)
				// else if (this.free === 0 || this.integrate < 50 || len >= 2) {
				// 	this.chooseBookList.map(item => {
				// 		amount = (Number(amount) + Number(item.price)).toFixed(2);
				// 	});
				// 	this.price = amount;
				// 	// 当前用户五车贝不足够或押金小于29时显示弹窗
				// 	if (Number(this.shell) < Number(this.price) || Number(this.deposit) < 29) {
				// 		if (Number(this.shell) < Number(this.price)) {
				// 			// 显示借书币不足弹窗
				// 			this.$refs.popup.open();
				// 		} else if (Number(this.deposit) < 29) {
				// 			// 显示押金不足弹窗··
				// 			this.$refs.depositPopUp.open();
				// 		}
				// 	} else {
				// 		// 下单书籍的id
				// 		this.goods_id = goodsIDs.join(',');
				// 		// 订单确认弹窗
				// 		this.$refs.payPopUp.open();
				// 	}
				// }
				//2.用户有免费借阅次数且所选书籍小于2且积分/50大于等于1(免费)
				// else if (this.free && len < 2 && this.integrate >= 50) {
				// 	if (Number(this.deposit) < 29) {
				// 		// 显示押金不足弹窗··
				// 		this.$refs.depositPopUp.open();
				// 	} else {
				// 		// 下单书籍的id
				// 		this.goods_id = goodsIDs.join(',');
				// 		this.price = 0;
				// 		// 订单确认弹窗
				// 		this.$refs.payPopUp.open();
				// 	}
				// }
			}
		},
		// 订单确认
		surePay() {
			let type = '';
			if (this.price == 0) {
				// 免费次数借阅
				type = 'coin';
			} else if (this.price > 0) {
				// 五车贝借阅
				type = 'shell';
			}
			this.placeOrder(this.goods_id, type);
		},
		// 下单
		placeOrder(goods_id, type) {
			uni.showLoading({
				title: '订单提交中',
				mask: true
			});
			this.$api
				.offlinePlaceOrder({
					goods_id,
					type,
					customer_id: this.userInfo.id
				})
				.then(res => {
					uni.hideLoading();
					// 下单成功
					if (res.data.status == 'ok') {
						uni.hideLoading();
						// 剔除书篮已下单过得书籍
						this.handlePlaceBooks();
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 1000
						});
						// 跳转到取书页
						uni.redirectTo({
							url: '/pages/library/take-books?status=0&from=placeOrder'
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
		},
		// 点击弹窗取消
		cancel(type) {
			switch (type) {
				case 'popup':
					this.$refs.popup.close();
					break;
				case 'depositPopUp':
					this.$refs.depositPopUp.close();
					break;
				case 'payPopUp':
					this.$refs.payPopUp.close();
				default:
					return;
			}
		},
		// 跳转借书币页面
		goPay() {
			uni.redirectTo({
				url: '../../pages/library/virtual'
			});
		}
	}
};
</script>

<style scoped>
/* 线下部分 */
.offline-box {
	height: 100%;
	background-color: rgba(249, 249, 249, 1);
	width: 100%;
	position: relative;
	box-sizing: border-box;
}
.offline-box .notice-box {
	box-sizing: border-box;
	text-align: center;
	font-size: 30rpx;
	background: #fff;
	color: #333;
	line-height: 60rpx;
	margin-top: 20rpx;
}
.offline-box .notice-box text:nth-child(2) {
	color: rgb(0, 128, 0);
	margin-right: 12rpx;
}
.offline-box .notice-box text:nth-child(4) {
	color: #f00;
}
.offline-box .none-books {
	text-align: center;
	position: absolute;
	left: 50%;
	top: 45%;
	transform: translate(-50%, -50%);
}
.offline-box .none-books .none {
	display: flex;
	flex-direction: column;
	color: #9fb2bf;
	font-size: 24rpx;
}
.offline-box .none-books .none image {
	width: 200rpx;
	height: 200rpx;
	margin-bottom: 10rpx;
}
/* 书篮存在 */
.offline-box scroll-view {
	box-sizing: border-box;
	padding: 0 20rpx;
	margin-bottom: 20rpx;
}
.offline-box .item {
	background: #fff;
	box-shadow: 0rpx 0rpx 12rpx #ddd;
	border-radius: 16rpx;
	margin-top: 24rpx;
	padding: 20rpx 20rpx 20rpx 12rpx;
	width: 98%;
	margin-left: 1%;
	box-sizing: border-box;
	position: relative;
}
.offline-box scroll-view .goods-info {
	box-sizing: border-box;
	display: flex;
	overflow: hidden;
}
.offline-box scroll-view .left {
	display: flex;
	justify-content: center;
	align-items: center;
}
.offline-box scroll-view .main {
	font-size: 30rpx;
	display: flex;
	box-sizing: border-box;
	flex: 1;
	position: relative;
	overflow: hidden;
}
.offline-box .main .none-stock {
	width: 180rpx;
	height: 180rpx;
	background: rgba(157, 160, 174, 0.6);
	position: absolute;
	left: 0;
	top: 0;
	z-index: 12;
	display: flex;
	justify-content: center;
	align-items: center;
}
.offline-box .main .none-notice {
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
.offline-box scroll-view .main .show {
	box-sizing: border-box;
	border: 1px solid #eeeeef;
	padding: 12rpx;
	margin-right: 16rpx;
}
.offline-box scroll-view .main image {
	width: 180rpx;
	height: 180rpx;
}
.offline-box scroll-view .main .title {
	margin-top: 12rpx;
	box-sizing: border-box;
	padding-right: 30rpx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.offline-box scroll-view .main .condition {
	margin-top: 12rpx;
	color: #999;
	font-size: 26rpx;
}
.offline-box scroll-view .main .topic {
	flex: 1;
	text-align: left;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: normal;
}
.offline-box scroll-view .title {
	font-weight: bold;
}
.offline-box scroll-view .right {
	position: absolute;
	right: 20rpx;
	top: 32rpx;
}
.offline-box scroll-view .right image {
	width: 30rpx;
	height: 30rpx;
}
.offline-box .item .price-box {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	margin-top: 60rpx;
}

.offline-box .item .price {
	flex: 1;
}
.offline-box .item .price-box text {
	color: #039eb9;
	font-size: 28rpx;
}
.offline-box .item .price-box image {
	width: 30rpx;
	height: 30rpx;
	flex-shrink: 0;
}
/* 底部 */
.bottom-box {
	position: fixed;
	width: 100%;
	background: #fff;
	z-index: 20;
	box-sizing: border-box;
	padding: 30rpx 20rpx;
	display: flex;
	font-size: 26rpx;
	left: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
}
.bottom-box .left {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	margin-right: 40rpx;
}
.bottom-box .center {
	box-sizing: border-box;
	font-size: 22rpx;
	/* margin-right: 80rpx; */
}
.bottom-box .right {
	display: flex;
}
.bottom-box .right view {
	box-sizing: border-box;
	padding: 0 30rpx;
	border: 1px solid #eeeeef;
	border-radius: 40rpx;
	font-size: 26rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #039eb9;
	height: 60rpx;
}
.bottom-box .right .del {
	background: #fff;
	margin-right: 12rpx;
	color: #666;
}
.bottom-box .right .borrow {
	background-image: linear-gradient(180deg, #40aed1, #69d9e4);
	color: #fff;
}
/* 借书币不够时显示弹窗 */
.balance-box {
	box-sizing: border-box;
	background: #fff;
	margin: 0 auto;
	padding-top: 36rpx;
	border-radius: 12rpx;
	padding-bottom: 36rpx;
}
.balance-box .title {
	font-weight: 700;
	font-size: 32rpx;
	text-align: center;
	margin-bottom: 36rpx;
	color: #12a4bd;
}
.balance-box .notice {
	font-size: 26rpx;
	box-sizing: border-box;
	padding: 0 60rpx;
	text-align: left;
}
.balance-box .notice view {
	box-sizing: border-box;
	margin-bottom: 12rpx;
	text-align: center;
}
.balance-box .show {
	text-align: center;
	box-sizing: border-box;
	padding: 24rpx 0;
}
.balance-box .show image {
	width: 200rpx;
}
.balance-box .btn {
	display: flex;
	box-sizing: border-box;
	padding: 0 24rpx;
}
.balance-box .btn view {
	flex: 1;
	font-size: 28rpx;
	line-height: 70rpx;
	background: #fff;
	border-radius: 40rpx;
	box-sizing: border-box;
	text-align: center;
}
.balance-box .btn view:nth-child(1) {
	margin-right: 12rpx;
	background: #f9f9f9;
	border: 1px solid #eeeeef;
	color: #adadad;
}
.balance-box .btn view:nth-child(2) {
	margin-left: 12rpx;
	background-image: linear-gradient(180deg, #40aed1, #69d9e4);
	color: #fff;
}
/* 线上部分 */
.content {
	width: 100%;
	display: flex;
}
</style>
