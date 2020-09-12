<template>
	<view>
		<view class="type-box">
			<!-- 列表 -->
			<view class="list" id="list">
				<template v-if="bookList && bookList.length > 0">
					<view 
					class="item" 
					v-for="(item, index) in bookList" 
					:key="index" 
					@tap="goDetail(item.id)" 
					v-if="item.show_status == 1 && item.stockCount.totalDockerUse != 0"
					>
						<view >
							<image :src="item.forGoodsPic[0].url" 
							mode="widthFix" class="show"></image>
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
							<view class="price"><text>五车贝：{{ item.price }}</text></view>
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
							<!-- 书籍标签 -->
							<image :src="$aliImage + 'book-logo-01.png'" 
							mode="widthFix" v-if="item.lineType == 1"
							style="position: absolute;width: 78rpx;left: 30rpx;top: -8rpx;"></image>
							<image :src="$aliImage + 'book-logo-02.png'"
							mode="widthFix" v-if="item.lineType == 2"
							style="position: absolute;width: 78rpx;left: 30rpx;top: -8rpx;"></image>
							<image :src="$aliImage + 'book-logo-03.png'"
							mode="widthFix" v-if="item.lineType == 3"
							style="position: absolute;width: 78rpx;left: 30rpx;top: -8rpx;"></image>
						</view>
					</view>
				</template>
				
			</view>
		</view>
		<!-- 书篮v-if="len" -->
		<view class="library-box"  @tap="goCart" v-if="len">
			<image :src="$aliImage + 'bookdetail_cart.png'" mode=""></image>
			<text>{{ len }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			bookList: {
				type: Array
			}
		},
		data() {
			return {
				$aliImage: this.$aliImage, //静态图片路径
				len: '', //书篮书籍数
			}
		},
		created() {
			this.len = uni.getStorageSync('offlineCartList').length;
			console.log(this.len)
		},
		methods: {
			// 加入书篮
			push(add) {
				// 判断当前用户是否有绑卡
				let userInfo = uni.getStorageSync("userInfo")
				// 未登录提示登录
				if(!userInfo.name || userInfo.name == 'guest') {
					uni.showModal({
						title: "请先登录！",
						content: "是否前往登录页面?",
						success: res => {
							if(res.confirm) {
								uni.reLaunch({
									url: '/pages/guide/auth'
								})
							}
						}
					})
					return
				}
				// 无卡号提示绑卡
				else if(!userInfo.card_no || 
				userInfo.card_no.replace(/\s*/g, "") == '') {
					uni.showModal({
						title: "您还未绑卡！",
						content:"是否前往绑卡页面?",
						success: res => {
							if(res.confirm) {
								uni.redirectTo({
									url: '/pages/library/tied-card'
								})
							}else {
								uni.showToast({
									title: '加入书篮失败',
									icon: 'none',
									duration: 2000
								})
							}
						}
					})
					return
				}
				// 所在学校没有书柜提示
				else if(!userInfo.docker_mac || userInfo.docker_mac.replace(/\s*/g, '') == '') {
					uni.showToast({
						title: '您绑定的学校暂无书柜',
						icon: 'none',
						duration: 2000
					})
					return
				}
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
			
			// 提示书籍已经借完
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
					url: '/pages/library/offline-bookdetail?bookID=' + id
				});
			},
			// 跳转到书篮tabbar页面
			goCart() {
				uni.reLaunch({
					url: '../cart/cart?flag=true'
				});
			},
		}
	}
</script>

<style>
	/* type */
	.type-box {
		box-sizing: border-box;
		padding: 0 20rpx;
		
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
</style>
