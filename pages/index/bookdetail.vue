<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="swiper-position" style="position: relative;">
			<swiper class="carousel" indicator-dots="ture" indicator-color="rgba(230,230,230,.3)"  indicator-active-color="rgba(230,230,230,1)" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, i) in bookInfo.forGoodsPic" :key="i" class="carousel-item">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
			<view class="white-space"></view>
		</view>
		
		<view class="grey-space"></view>
		
		<view class="detail-content-father-position">
			<view class="detail-content-position">
				<view class="detail-title-position">
					<text>{{bookInfo.title}}</text>
					<view class="book-count-style">
						<text style="font-size: 30upx;">剩余: {{bookInfo.stockCount.totalOnlineUse}} 本</text>
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
				
				<!-- <view class="detail-grade-position">
					<text>4.8分</text>
					<image src="" mode=""></image>
				</view> -->
				
				<!-- <view class="detail-people-position">
					<et-peoplelist :imgInfo="imgInfo"></et-peoplelist>
				</view> -->
			</view>	
		</view>
		
		<view class="grey-space"></view>
		
		<!-- <view class="out-position">
			<view class="out-content" style="position-bottom:20upx;">
				<text class="title-content-process">借阅流程</text>
				<text class="link-content"  @tap='toProgressUrl'>详情 ></text>
			</view>
		</view> -->
		
		<!-- <view class="process-position">
			<image class="out-img" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_bookdetail_progress_borrow.png" style="width: 750upx;" mode="widthFix"></image>
		</view> -->
	
		
		<!-- <view class="white-space"></view> -->
		
		<!-- <view class="out-position">
			<view class="out-content" style="position-bottom:20upx;">
				<text class="title-content-process">归还流程</text>
			</view>
		</view> -->
		
		<!-- <view class="process-position">
			<image class="out-img" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_bookdetail_progress_return.png" style="width: 750upx;" mode="widthFix"></image>
		</view> -->
			
		
		<!-- <view class="white-space"></view> -->
		
		<!-- 编辑推荐 start -->
		<block v-if="bookInfo.recomment && bookInfo.recomment !== '' && bookInfo.recomment !== 'null' && bookInfo.recomment !== '<p>null</p>' && bookInfo.recomment !== '<p>undefined</p>'" >
			<view class="out-position" >
				<view class="out-content" style="position-bottom:15upx;">
					<text class="title-content-process">书书推荐</text>
				</view>
			</view>
			<view class="remark-position">
				<rich-text :nodes="bookInfo.recomment"></rich-text>
			</view>
		</block>
		<view class="white-space" v-if="bookInfo.recomment && bookInfo.recomment !== '' && bookInfo.recomment !== 'null' && bookInfo.recomment !== '<p>null</p>' && bookInfo.recomment !== '<p>undefined</p>'"></view>
		<view class="grey-space" v-if="bookInfo.recomment && bookInfo.recomment !== '' && bookInfo.recomment !== 'null' && bookInfo.recomment !== '<p>null</p>' && bookInfo.recomment !== '<p>undefined</p>'"></view>
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
		<!-- 商品详情图 -->
		<view class="process-position" v-if="detailArr && detailArr.length > 0" style="text-align: center;">
			<block v-for="(item, index) in detailArr" :key="index">
				<image :src="item" mode="widthFix" style="width: 100%; margin-bottom: 10rpx;"></image>
			</block>
			
		</view>
		
		<view class="white-space"></view>
		
		<view class="bottom-position">
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
			<view class="bottom-button-position cart-book-count-father">
				<view class="bottom-button" @tap="goCar">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_cart.png" class="bottom-image"></image>
					<text style="font-size: 20upx;color: #2AAEC4;">书篮</text>
				</view>
				<!-- 跳转书篮按钮加上书篮书本数 -->
				<view class="cart-book-count-style" v-if="allBooks != 0">
					<text>{{allBooks}}</text>
				</view>
			</view>
			<view v-if="bookInfo.stockCount.totalOnlineUse !== 0" class="bottom-button-input" @tap="insertToCart">
				<text style="font-size: 30upx">加入书篮</text>
			</view>
			<view v-else class="bottom-button-input"  style="background-color:#ccc; color: #fff;" @tap="insertToCart">
				<text style="font-size: 30upx">加入书篮</text>
			</view>
		</view>
	</view>
</template>

<script>
import etPeoplelist from '../../components/etPeoplelist.vue'
import etTag from '../../components/etTag.vue'

const insertBook = require('@/common/carDataOption');
const toUrlFunction = require('@/common/toUrlFunction');
const bookListData = require('@/common/carDataOption');

export default {
	components: {
		etPeoplelist,
		etTag
	},
	data() {
		return {
			userInfo: uni.getStorageSync('userInfo'),
			$aliImage: this.$aliImage, //静态图片路径
			allBooks: '',
			bookInfo:{},
			bookID:	0,
			swiperCurrent: 0,
			swiperLength: 0,
			cartBookCount:"",
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
			detailArr: []
		}
	},
	onLoad(option) {
		this.bookID = JSON.parse(decodeURIComponent(option.bookID));
		this.getBookData();
	},
	// 每次进来重新计算书篮书籍总数
	onShow() {
		this.allBooks = insertBook.countBookLength()
		console.log(this.allBooks)
	},
	methods: {
		// 跳转书篮
		goCar() {
			// 暂时关闭
			uni.showToast({
				title: '邮寄借阅系统升级中，暂不对外开放！',
				icon: 'none',
				duration:2000
			})
			return
			uni.reLaunch({
				url: '/pages/cart/cart?flag=true'
			})
		},
		toProgressUrl(){
			toUrlFunction.toUrl('/pages/guide/borrowExplain');
		},
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
							title: '加入收藏成功！该书籍将在下次换书时，优先放入您孩子学校的童书馆。',
							duration: 3000,
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
		toCartUrl(url){
			toUrlFunction.toUrl(url);
		},
		getBookData() {
			uni.showLoading();
			this.$api.getGoodsInfo({ 'NoPageing': '1', 'filterItems': {'id': this.bookID} })
			.then(res => {
				uni.hideLoading();
			   this.bookInfo = res.data.rows[0];
				 // 书籍详情图片
				 if(this.bookInfo.detailArr && this.bookInfo.detailArr.length > 0) {
					 this.bookInfo.detailArr.map(item => {
						 this.detailArr.push(item.url)
					 })
				 }
				 console.log(this.detailArr)
			   this.cartBookCount = insertBook.cartBookCount();
			   
			})
		},
		swiperChange(e) {
			const index = e.detail.current;
		},
		insertToCart() { 
			// 暂时关闭
			uni.showToast({
				title: '邮寄借阅系统升级中，暂不对外开放！',
				icon: 'none',
				duration:2000
			})
			return
			if(this.bookInfo.stock.usageCount === 0){
				uni.showToast({
					title:"书本暂时借完，请选择其他书本",
					duration:2000,
					icon:"none"
				})
				return;
			}
			
			// 处理数据
			let cartList = this.bookInfo;
			cartList.select = false;
			cartList.count = 1;
			// 加入书篮操作
			insertBook.insertToCart(cartList);
			// 重新计算书篮书籍数量
			this.allBooks =  insertBook.countBookLength()
			this.cartBookCount = insertBook.cartBookCount();
			try {
			    let carListArr = uni.getStorageSync('carListInfo');
			    console.log(carListArr);
			} catch (e) {
			    console.log(carListArr);
			}
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
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
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
