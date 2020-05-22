<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="swiper-position" style="position: relative;">
			<swiper class="carousel" indicator-dots="ture" indicator-color="rgba(230,230,230,.3)"  indicator-active-color="rgba(230,230,230,1)" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item">
					<image :src="item.url" />
				</swiper-item>
			</swiper>
			<view class="white-space"></view>
		</view>
		
		<view class="grey-space"></view>
		
		<view class="detail-content-father-position">
			<view class="detail-content-position">
				<view class="detail-title-position">
					<text>{{detailTitle}}</text>
				</view>
				
				<view class="detail-tag-position">
					<et-tag v-for="(item,index) in tagData" :key="index" :backgroundColor="item.backgroundColor" :fontColor="item.fontColor" :title="item.text" class="detail-tag-content"></et-tag>
				</view>
				
				<view class="detail-writer-position">
					<text style="font-weight: bold;">作者:</text>
					<text>{{writer}}</text>
				</view>
				
				<view class="detail-publisher-position">
					<text style="font-weight: bold;">出版社:</text>
					<text>{{publisher}}</text>
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
				<text class="link-content">详情 ></text>
			</view>
		</view>
		
		<view class="process-position">
			<image class="out-img" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_process.png"></image>
		</view>
	
		
		<view class="white-space"></view>
		
		<view class="out-position">
			<view class="out-content" style="position-bottom:20upx;">
				<text class="title-content-process">商品简介</text>
			</view>
		</view>
		
		<view class="remark-position">
			<text>{{remark}}</text>
		</view>
		
		<view class="white-space"></view>
		
		<view class="process-position">
			<image :src="detailImg" mode="widthFix"></image>
		</view>
		
		<view class="white-space"></view>
		
		<view class="bottom-position">
			<view class="bottom-button">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_zan.png" class="bottom-image"></image>
				<text>推荐</text>
			</view>
			<view class="bottom-button">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_xin.png" class="bottom-image"></image>
				<text>收藏</text>
			</view>
			<view class="bottom-button">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_packge.png" class="bottom-image"></image>
				<text>书篮</text>
			</view>
			<view class="bottom-button-input" @tap="insertToCart">
				<text>加入书篮</text>
			</view>
		</view>
	</view>
</template>

<script>
import etPeoplelist from '../../components/etPeoplelist.vue'
import etTag from '../../components/etTag.vue'

export default {
	components: {
		etPeoplelist,
		etTag
	},
	data() {
		return {
			bookID:	0,
			coin:0,
			cover:"",
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			detailTitle: '',
			writer: '',
			publisher: '',
			remark: '',
			tagData: [],
			detailImg: '',
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
		getBookData() {
			uni.showLoading();
			this.$api.getGoodsInfo({ 'NoPageing': '1', 'filterItems': {'id': this.bookID} }).then(res => {
			   this.transformBookData(res.data.rows[0]);
			   uni.showToast();
			})
		},
		swiperChange(e) {
			const index = e.detail.current;
		},
		// 转换接口数据为视图数据
		transformBookData(data){
			carouselList: [],
			this.detailTitle = data.title;
			this.writer = data.author;
			this.publisher = data.publisher;
			this.remark = data.summary;
			this.cover = data.cover;
			this.coin = data.coin;
			let tagArr = [];
			if (data.tagInfo && data.tagInfo.length >0) {
				data.tagInfo.forEach((item) => {
					let tagObj = {};
					tagObj.text = item.tag_name;
					tagObj.backgroundColor = item.bg_color;
					tagObj.fontColor = item.text_color;
					this.tagData.push(tagObj);
				});
			}
			this.carouselList = data.forGoodsPic;
			this.detailImg = data.detail;
		},
		insertToCart() { 
			// 获取书蓝列表
			let carListArr = [];
			uni.getStorage({
				key: 'carListInfo',
				success: (res) => {
					console.log(res);
					carListArr = res.data;
				},
				fail: (err) => {
					console.log(err);
				}
			});
			console.log(carListArr);
			
			// 处理数据
			let cartList = {
				'bookID': this.bookID,
				'title': this.detailTitle,
				'coin': this.coin,
				'cover': this.cover,
				'select': true,
				'count':1
			};
			carListArr.push(cartList);
			console.log(carListArr);
			
			// 数据插入
			uni.setStorageSync('carListInfo', carListArr);
			console.log(carListArr);
			
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
	padding-bottom: 10upx;
}
.detail-tag-content {
	width: 150upx;
	margin-left: 5upx;
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
	height: 180upx;
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
}
.bottom-button {
	padding: 20upx;
	border: 1upx solid #999999;
}
.bottom-button-input {
	padding-left: 75upx;
	padding-right: 75upx;
	border: 1upx solid #999999;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #008000;
	color: #FFFFFF;
	font-weight: bold;
}
.bottom-image {
	width: 50upx;
	height: 50upx;
}
</style>
