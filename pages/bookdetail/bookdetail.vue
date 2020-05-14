<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="swiper-position" style="position: relative;">
			<swiper class="carousel" indicator-dots="ture" indicator-color="rgba(230,230,230,.3)"  indicator-active-color="rgba(230,230,230,1)" circular autoplay @change="swiperChange">
				<swiper-item v-for="(item, i) in carouselList" :key="i" class="carousel-item">
					<image src="../../static/bookdetail/book.png" />
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
					<et-tag v-for="(item,index) in tagData" :key="index" :backgroundColor="item.backgroundColor" fontColor="#FFFFFF" :title="item.text" class="detail-tag-content"></et-tag>
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
			<image class="out-img" src="../../static/bookdetail/process.png"></image>
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
			<image src="../../static/bookdetail/detail.png"></image>
		</view>
		
		<view class="white-space"></view>
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
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			detailTitle: '做个机器人是我',
			writer: '（日）吉竹伸介',
			publisher: '甘肃少年儿童出版社',
			remark: 'flex隶属于广州键鸿体育用品有限公司，法定代表人：王灿城，注册资金：50万元，地址：广州市白云区鹤龙街尖彭路华联工业区13、15号B203，经营范围：商品零售贸易（许可审批类商品除外）;体育器材装备安装服务;室内体育场、娱乐设施工程',
			tagData: [
				{
					'text': "3-6岁",
					'backgroundColor': "#FDD240"
				},
				{
					'text': "3-6岁",
					'backgroundColor': "#FDD240"
				},
				{
					'text': "3-6岁",
					'backgroundColor': "#FDD240"
				}
			],
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
	onLoad() {
		this.getSwiperData();
	},
	methods: {
		getSwiperData() {
			this.$api.getSwiperData({link_usage: 'app_swiper'}).then(res => {
			   this.carouselList = res.data
			})
		},
		swiperChange(e) {
			const index = e.detail.current;
		},
	}
}
</script>

<style>
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
	padding: 0 28upx;
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
</style>
