<template>
	<view class="content" v-if="isLogin">
		<!-- 轮播图 -->
		<view class="swiper-position" style="position: relative;">
			<swiper class="carousel" indicator-dots="ture" indicator-color="rgba(230,230,230,.3)"  indicator-active-color="rgba(230,230,230,1)" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, i) in bookInfo.forGoodsPic" :key="i" class="carousel-item">
					<image :src="item.url" @tap="preview(item.url)" />
				</swiper-item>
			</swiper>
			<view class="white-space"></view>
		</view>
		
		<view class="grey-space"></view>
		
		<view class="detail-content-father-position">
			<view class="detail-content-position">
				<view class="detail-title-position">
					<text>{{bookInfo.title}}</text>
					<!-- 判断docker_mac、card_no是否存在 -->
					<view class="book-count-style" 
					v-if="docker_mac && userInfo.card_no">
						<text style="font-size: 30upx;">
							剩余: {{bookInfo.stockCount.totalDockerUse}} 本</text>
					</view>
					<view class="book-count-style"  @tap="bindCard"
					v-if="!userInfo.card_no ">
						<text style="font-size: 30upx;">请先绑定童书卡</text>
					</view>
					<view class="book-count-style" v-if="userInfo.card_no && !docker_mac">
						<text style="font-size: 30upx;">绑定学校暂无书柜</text>
					</view>
				</view>
				
				<view class="detail-tag-position">
					<et-tag v-for="(item,index) in bookInfo.tagInfo" :key="index" :backgroundColor="item.bg_color" :fontColor="item.text_color" :title="item.tag_name" class="detail-tag-content"></et-tag>
				</view>
				
				<view class="detail-writer-position">
					<text style="font-weight: bold;">作者：</text>
					<text>{{bookInfo.author}}</text>
				</view>
				
				<view class="white-space" style="height: 15upx;"></view>
				
				<view class="detail-publisher-position">
					<text style="font-weight: bold;">出版社：</text>
					<text>{{bookInfo.publisher}}</text>
				</view>
			</view>	
		</view>
		<view class="grey-space"></view>
		
		<!-- 编辑推荐 start -->
		<view class="out-position" v-if="bookInfo.recomment && bookInfo.recomment !== ''">
			<view class="out-content" style="position-bottom:15upx;">
				<text class="title-content-process">书书推荐</text>
			</view>
		</view>
		<view class="remark-position">
			<rich-text :nodes="bookInfo.recomment"></rich-text>
		</view>
		<view class="white-space" v-if="bookInfo.recomment && bookInfo.recomment !== ''"></view>
		<view class="grey-space" v-if="bookInfo.recomment && bookInfo.recomment !== ''"></view>
		<!-- 编辑推荐 end -->		
		
		<view class="out-position">
			<view class="out-content" style="position-bottom:15upx;">
				<text class="title-content-process">绘本简介</text>
			</view>
		</view>
		
		<view class="remark-position">
			<text style="line-height: 10upx;">{{bookInfo.summary}}</text>
		</view>
		
		<view class="white-space"></view>
		<!-- 商品详情图片 -->
		<view class="process-position" v-if="detailArr && detailArr.length > 0" 
		style="text-align: center;">
			<block v-for="(item, index) in detailArr" :key="index">
				<image :src="item" mode="widthFix" style="width: 100%; margin-bottom: 10rpx;" @tap="preview(item)"></image>
			</block>
			
		</view>
		
		<view class="white-space"></view>
		
		<view class="bottom-position">
			<!-- 收藏 -->
			<view class="bottom-button-position">
				<view class="bottom-button" @tap="collection" v-if="bookInfo.collectStatus === '1'">
					<image :src="$aliImage + 'bookdetail_add.png'" class="bottom-image'"></image>
					<text style="font-size: 20upx;color: #2AAEC4;">收藏</text>
				</view>
				<view class="bottom-button" @tap="collection" v-else>
					<image :src="$aliImage + 'bookdetai_none_add.png'" class="bottom-image'"></image>
					<text style="font-size: 20upx;color: rgb(184,184,184);">收藏</text>
				</view>
			</view>
			<!-- 书篮 -->
			<view 
			class="bottom-button-position cart-book-count-father" 
			@tap="goCart">
				<view class="bottom-button">
					<image :src="$aliImage + 'bookdetail_cart.png'" class="bottom-image"></image>
					<text 
					style="font-size: 20upx;color: #2AAEC4;"
					>书篮</text>
				</view>
				<!-- 书篮本书指示点 -->
				<view class="cart-book-count-style" v-if="len != 0">
					<text>{{ len }}</text>
				</view>
			</view>
			<view v-if="bookInfo.stockCount.totalDockerUse !== 0" class="bottom-button-input" @tap="push">
				<text style="font-size: 30upx">加入书篮</text>
			</view>
			<view v-else class="bottom-button-input"  style="background-color:#ccc; color: #fff;" @tap="push">
				<text style="font-size: 30upx">加入书篮</text>
			</view>
		</view>
	</view>
</template>

<script>
const bookListData = require('@/common/carDataOption.js')
import etTag from '@/components/etTag.vue'
export default {
	components: {
		etTag
	},
	onShareAppMessage(res) {
		if(res.from === 'menu') {
			return {
				title: this.bookInfo.title,
				path: '/pagesLibrary/library/offline-bookdetail?bookID='+this.bookID
			}
		}
	},
	data() {
		return {
			docker_mac: '',
			$aliImage: this.$aliImage, //静态图片路径
			len: '',
			bookInfo:{},
			bookID:	0,
			swiperCurrent: 0,
			swiperLength: 0,
			cartBookCount:"",
			userInfo: '',
			imgInfo: [
				{
					'imgUrl' : "../static/bookdetail/people.png"
				},
				{
					'imgUrl' : "../static/bookdetail/people.png"
				},
				{
					'imgUrl' : "../static/bookdetail/people.png"
				},
				{
					'imgUrl' : "../static/bookdetail/people.png"
				},
				{
					'imgUrl' : "../static/bookdetail/people.png"
				},
				{
					'imgUrl' : "../static/bookdetail/people.png"
				}
			],
			detailArr: [] , //商品详情图片
			isLogin: false, //是否登录
		}
	},
	onLoad(option) {
		this.bookID = option.bookID;
		this.getUserInfo()
	},
	onShow() {
		// 检查登录
		this.checkLogin()
		// 获取书籍列表的数目
		this.len = bookListData.countBookLength();
	},
	methods: {
		// 检查登录
		checkLogin() {
			let userInfo = uni.getStorageSync('userInfo')
			if(!userInfo.name || userInfo.name === 'guest' || !userInfo.mobile || userInfo.mobile == '') {
				this.isLogin = false
				uni.showModal({
					title: '请先登录！',
					content: '是否前往登录页面?',
					success: res => {
						if(res.confirm) {
							uni.navigateTo({
								url: '/pages/guide/auth'
							})
						}else {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
					
				})
			}else if(!userInfo.card_no || userInfo.card_no === '') {
				this.isLogin = false
				uni.showModal({
					title: '暂未绑卡！',
					content:'是否前往绑卡页面',
					success: res => {
						if(res.confirm) {
							uni.navigateTo({
								url: '/pagesLibrary/library/tied-card'
							})
						}else {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}
					}
					
				})
			}else {
				this.isLogin = true
			}
		},
		// 获取个人信息
		getUserInfo() {
			let mobile = uni.getStorageSync("userInfo").mobile;
			this.$api.getCustom({ 
				filterItems: { mobile }
				}).then(res => {
				this.userInfo = res.data[0];
				console.log(this.userInfo)
				if(JSON.stringify(this.userInfo.dockerInfo)  == '{}' && this.userInfo.dockerInfo) {
					this.docker_mac = this.userInfo.dockerInfo.docker_mac ? this.userInfo.dockerInfo.docker_mac : ''
				}else if(JSON.stringify(this.userInfo.dockerInfo)  != '{}' && this.userInfo.dockerInfo) {
					this.docker_mac = this.userInfo.dockerInfo.docker_mac 
				}
				// 获取书籍详情
				this.getBookData(this.docker_mac);
			})
		},
		// 跳转到绑卡页面
		bindCard() {
			uni.redirectTo({
				url: '/pagesLibrary/library/tied-card'
			})
		},
		// 收藏功能
		collection(){
			// uni.showToast({
			// 	title: '收藏功能暂未开放，敬请期待！',
			// 	duration: 2000,
			// 	icon: 'none'
			// });
			let params = {
				custom_id: String(this.userInfo.id),
				goods_id: String(this.bookInfo.id)
			}
			this.$api.addOrDelGoodsCollect(params).then(res => {
				if(res.data.status === 'ok') {
					this.bookInfo.collectStatus == '1' ? this.bookInfo.collectStatus = '0' : this.bookInfo.collectStatus = '1'
					if(this.bookInfo.collectStatus === '1') {
						uni.showToast({
							title: '收藏成功',
							duration: 1500,
							icon: 'none'
						})
					}else {
						uni.showToast({
							title: '取消收藏成功',
							duration: 1500,
							icon: 'none'
						})
					}
				}
			})
		},
		// 获取书籍详情
		getBookData(docker_mac) {
			uni.showLoading();
			this.$api.getGoodsInfo({ 
				NoPageing: '1', 
				filterItems: {'id': this.bookID, my_custom_id: String(this.userInfo.id)} ,
				docker_mac: docker_mac
				
			}).then(res => {
				uni.hideLoading();
			   this.bookInfo = res.data.rows[0];
				 console.log(this.bookInfo)
				 // 处理商品详情图片
				 if(this.bookInfo.detailArr && this.bookInfo.detailArr.length > 0) {
					 this.bookInfo.detailArr.map(item => {
						 this.detailArr.push(item.url)
					 })
				 }  
			})
		},
		swiperChange(e) {
			const index = e.detail.current;
		},
		// 加入书篮
		push() {
			// 获取当前添加书籍的数据
			let add = this.bookInfo;
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
								url: '/pagesLibrary/library/tied-card'
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
			// 如果没有库存return
			else if(add.stockCount.totalDockerUse === 0) {
				uni.showToast({
					title: '书本暂时借完，请选择其他书本',
					duration: 2000,
					icon: 'none'
				})
			}else {
				// 书籍有库存
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
								// 同步数据
								arrList.unshift(add);
								
								uni.setStorageSync('offlineCartList', arrList);
								this.len = bookListData.countBookLength();
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
							// 同步数据
							arrList.push(add);
							
							uni.setStorageSync('offlineCartList', arrList);
							this.len =  bookListData.countBookLength();
						}
					});
				}
			}
			
		},
		// 跳转到书篮tabbar页面
		goCart() {
			uni.reLaunch({
				url: '/pages/cart/cart?'
			});
		},
		// 预览图片
		preview(url) {
			uni.previewImage({
				urls: [url]
			})
		}
	}
}
</script>
<style>
	page {
		box-sizing: border-box;
		padding-bottom: 120rpx;
	}
</style>
<style scoped>
.grey-space {
	background-color: #E6E6E6;
	height: 20upx;
	width: 100%;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.swiper-position{
	width: 70%;
}
.carousel {
	width: 100%;
	height: 600upx;
}
.carousel .carousel-item {
	width: 100%;
	height: 100%;
	/* padding: 0 28upx; */
	overflow: hidden;
}
.carousel-item image {
	width: 100%;
	height: 100%;
}
.detail-content-father-position {
	width: 90%;
	padding-top: 60upx;
	padding-bottom: 60upx;
	display: flex;
	align-items: center;
}
.detail-content-position{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.detail-title-position {
	font-size: 35upx;
	font-weight: bold;
	/* padding-bottom: 10upx; */
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
}
.book-count-style {
	background-color: rgba(204,204,204,.8);
	font-size: 20upx;
	border-radius: 20upx;
	color: #FFFFFF;
	padding: 2upx 30upx;
	margin-left: 20upx;
}
.detail-tag-position {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 18upx 0;
}
.detail-tag-content {
	width: 150upx;
	margin-top: 15upx;
	margin-right: 13upx;
}
.detail-writer-position,.detail-publisher-position {
	color: #B4B4B4;
	font-size: 25upx;
	
}
.out-position {
	width: 90%;
	padding-top: 60upx;
	padding-bottom: 40upx;
}
.out-content {
	border-bottom: 2upx solid #E8E8E8;
	padding-bottom: 30upx;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}
.title-content-process {
	font-size: 35upx;
	font-weight: bold;
}
.link-content {
	color: #B4B4B4;
	font-size: 25upx;
}
.process-position {
	width: 100%;
	height: auto;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	padding: 0 5%;
}
.out-img {
	/* height: 180upx; */
	width: 100%;
}
.remark-position {
	width: 90%;
	color: #6A6A6A;
	font-size: 25upx;
	line-height: 50upx;
}
.bottom-position {
	width:100%;
	display: flex;
	justify-content: space-between;
	position: fixed;
	bottom: 0;
	background-color: #FFFFFF;
	border-top: 1upx solid #E6E6E6;
}
.bottom-button-position {
	padding: 20upx 80upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.bottom-button {
	/* padding: 20upx; */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.bottom-button-input {
	padding-left: 75upx;
	padding-right: 75upx;
	border: 1upx solid #999999;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #2AAEC4;
	color: #FFFFFF;
	font-weight: bold;
}
.bottom-image {
	width: 50upx;
	height: 50upx;
}
.cart-book-count-father {
	position: relative;
}
.cart-book-count-style {
	position:absolute;
	bottom:60upx;
	left: 130upx;
	width: 50upx;
	height: 50upx;
	border-radius: 50%;
	background-color: #C41A16;
	color: #FFFFFF;
	font-size: 20upx;
	font-weight: bold;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

</style>
