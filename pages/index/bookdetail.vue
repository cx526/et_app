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
				</view>
				
				<view class="detail-tag-position">
					<et-tag v-for="(item,index) in bookInfo.tagInfo" :key="index" :backgroundColor="item.bg_color" :fontColor="item.text_color" :title="item.tag_name" class="detail-tag-content"></et-tag>
				</view>
				
				<view class="detail-writer-position">
					<text style="font-weight: bold;">作者:</text>
					<text>{{bookInfo.author}}</text>
				</view>
				
				<view class="detail-publisher-position">
					<text style="font-weight: bold;">出版社:</text>
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
		
		<view class="out-position">
			<view class="out-content" style="position-bottom:20upx;">
				<text class="title-content-process">借阅流程</text>
				<text class="link-content"  @tap='toProgressUrl'>详情></text>
			</view>
		</view>
		
		<view class="process-position">
			<image class="out-img" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_bookdetail_progress.png" mode="widthFix"></image>
		</view>
	
		
		<view class="white-space"></view>
		
		<view class="out-position">
			<view class="out-content" style="position-bottom:20upx;">
				<text class="title-content-process">商品简介</text>
			</view>
		</view>
		
		<view class="remark-position">
			<text>{{bookInfo.summary}}</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="process-position">
			<image :src="bookInfo.detail" mode="widthFix"></image>
		</view>
		
		<view class="white-space"></view>
		
		<view class="bottom-position">
			<view class="bottom-button-position">
				<view class="bottom-button" @tap="collection">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_add.png" class="bottom-image"></image>
					<text style="font-size: 20upx;color: #2AAEC4;">收藏</text>
				</view>
			</view>
			<view class="bottom-button-position">
				<view class="bottom-button" @tap="toCartUrl('/pages/cart/cart')">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_cart.png" class="bottom-image"></image>
					<text style="font-size: 20upx;color: #2AAEC4;">书篮</text>
				</view>
			</view>
			<view class="bottom-button-input" @tap="insertToCart">
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

export default {
	components: {
		etPeoplelist,
		etTag
	},
	data() {
		return {
			bookInfo:{},
			bookID:	0,
			swiperCurrent: 0,
			swiperLength: 0,
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
			]
		}
	},
	onLoad(option) {
		this.bookID = JSON.parse(decodeURIComponent(option.bookID));
		this.getBookData();
		
	},
	methods: {
		toProgressUrl(){
			toUrlFunction.toUrl('/pages/guide/borrowExplain');
		},
		collection(){
			uni.showToast({
				title: '收藏功能暂未开放，敬请期待！',
				duration: 2000,
				icon: 'none'
			});
		},
		toCartUrl(url){
			toUrlFunction.toUrl(url);
		},
		getBookData() {
			uni.showLoading();
			this.$api.getGoodsInfo({ 'NoPageing': '1', 'filterItems': {'id': this.bookID} }).then(res => {
			   console.log(res.data.rows[0]);
			   this.bookInfo = res.data.rows[0];
			   uni.hideLoading();
			})
		},
		swiperChange(e) {
			const index = e.detail.current;
		},
		insertToCart() { 			
			// 处理数据
			let cartList = this.bookInfo;
			cartList.select = true;
			cartList.count = 1;
			insertBook.insertToCart(cartList);
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
	padding-top: 100upx;
	padding-bottom: 100upx;
	display: flex;
	align-items: center;
}
.detail-content-position{
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}
.detail-title-position {
	font-size: 40upx;
	font-weight: bold;
	padding-bottom: 10upx;
}
.detail-tag-position {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding: 40upx 0;
}
.detail-tag-content {
	width: 150upx;
	margin-top: 15upx;
	margin-right: 20upx;
}
.detail-writer-position,.detail-publisher-position {
	color: #B4B4B4;
	font-size: 30upx;
}
.out-position {
	width: 90%;
	padding-top: 100upx;
	padding-bottom: 100upx;
}
.out-content {
	border-bottom: 2upx solid #E8E8E8;
	padding-bottom: 30upx;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
}
.title-content-process {
	font-size: 40upx;
	font-weight: bold;
}
.link-content {
	color: #B4B4B4;
	font-size: 30upx;
}
.process-position {
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: center;
}
.out-img {
	/* height: 180upx; */
	width: 100%;
}
.remark-position {
	width: 90%;
	color: #6A6A6A;
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
</style>
