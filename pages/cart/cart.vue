<template>
	<view class="content-position" :style="'height: ' + listData.length < 3 ? '100vh;' : ''">
		<view class="backgroundStyle">
			<view class="content">
				<view class="white-space"></view>
				<!-- 头部内容 -->
				<view class="top-position">
					<view class="top-content-left">
						<image class="top-content-left-img" src="../../static/cart/money.png"></image>
						<view style="width: 20upx;"></view>
						<text>我的借阅币：{{money}}</text>
					</view>
					
					<view class="top-content-right">
						<image class="top-content-right-img-one" src="../../static/cart/getMoney.png"></image>
						<image class="top-content-right-img-two" src="../../static/cart/sign.png"></image>
					</view>
				</view>
				
				<!-- 列表数据 -->
				<view class="cat-detail-position">
					<view class="cat-detail" v-for="(item,index) in listData">
						<et-cart-detail :key="index" :imgSrc="item.cover" :title="item.title" :status="item.status" :coin="item.coin" :count="item.count"></et-cart-detail>
						<view class="white-space"></view>
					</view>
				</view>
				
				<view class="white-space" style="height: 120upx;"></view>
				
				<!-- 底部栏目 -->
				<view class="bottom-position">
					<view class="bottom-content">
						<view class="bottom-check">
							<checkbox value="cb" checked="true" />
							<text>全选</text>
						</view>
						
						<view class="bottom-text">
							<text>合计：</text>
							<text style="color: #DB3E49;">{{moneyCount}}</text>
							<text>借阅币</text>
						</view>
						
						<view class="bottom-tag">
							<et-tag backgroundColor="#808080" title="删除" fontColor="#FFFFFF" class="tag-style"></et-tag>
							<et-tag backgroundColor="#2AA145" title="借阅" fontColor="#FFFFFF" class="tag-style"></et-tag>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import etCartDetail from '../../components/etCartDetail.vue'
import etTag from '../../components/etTag.vue'

export default {
	components: {
		etCartDetail,
		etTag
	},
	data() {
		return {
			money:"30",
			moneyCount:"199",
			listData: [
				{
					imgSrc: "../static/cart/oldMan.png",
					title: "巴巴和圣诞老人",
					status: "可借阅",
					corn: "30",
					count: "9",
				},
				{
					imgSrc: "../static/cart/oldMan.png",
					title: "巴巴和圣诞老人",
					status: "可借阅",
					corn: "30",
					count: "9",
				},
				{
					imgSrc: "../static/cart/oldMan.png",
					title: "巴巴和圣诞老人",
					status: "可借阅",
					corn: "30",
					count: "9",
				},
				{
					imgSrc: "../static/cart/oldMan.png",
					title: "巴巴和圣诞老人",
					status: "可借阅",
					corn: "30",
					count: "9",
				},
				{
					imgSrc: "../static/cart/oldMan.png",
					title: "巴巴和圣诞老人",
					status: "可借阅",
					corn: "30",
					count: "9",
				}
			]
		}
	},
	onLoad() {
		// 获取书篮列表数据
		try {
		    this.listData = uni.getStorageSync('carListInfo');
		} catch (e) {
		    console.log(e);
		}
	},
	methods: {
		
	}
}
</script>

<style>
.content-position {
	background-color: #EBF8FF;
	z-index: 1;
}
.backgroundStyle {
	background-image: url(../../static/cart/color.png);
	background-size: 100% 250upx;
	background-repeat:no-repeat;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-position {
	width: 90%;
	padding:20upx 0;
	margin-bottom: 20upx;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	background-color: #EBF8FF;
	border-radius: 10upx;
}
.top-content-left {
	display: flex;
	flex-direction: row;
}
.top-content-left text {
	font-size: 30upx;
}
.top-content-left-img {
	width: 40upx;
	height: 40upx;
}
.top-content-left {
	display: flex;
	flex-direction: row;
}
.top-content-right-img-one {
	width: 150upx;
	height: 40upx;
}
.top-content-right-img-two {
	width: 40upx;
	height: 40upx;
}
.cat-detail-position {
	width: 90%;
}
.cat-detail {

}
.bottom-position {
	z-index: 3;
	width: 100%;
	background-color: #FFFFFF;
	padding: 30upx;
	position: fixed;
	bottom: 0;
}
.bottom-content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	background-color: #FFFFFF;
}
.bottom-check,.bottom-text {
	font-size: 25upx;
	font-weight: bold;
}
.bottom-tag {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.tag-style {
	width: 80upx;
	height: 45upx;
	margin-right: 20upx;
}
</style>
