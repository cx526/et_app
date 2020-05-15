<template>
	<view class="content">
		<view class="img-position">
			<image class="img-content" :src="imgSrc"></image>
		</view>
		
		<view class="title-position">
			<text class="title-content">{{bookName}}</text>
		</view>
		
		<view class="tag-position">
			<view class="tag-content" v-for="(item,index) in tagData" :key="index">
				<et-tag :title="item.title" :backgroundColor="item.backgroundColor" fontColor="#FFFFFF" ></et-tag>
			</view>
		</view>
		
		<view class="remark-position">
			<text class="remark-content">{{remark}}</text>
		</view>
		
		<view class="like-position">
			<image class="like-img" src="../static/kindlist/zan.png"></image>
			<text>{{people}} 人推荐</text>
		</view>
		
		<view class="out-position">
			<view class="out-img-position">
				<image class="out-img" src="../static/kindlist/clock.png"></image>
				<text>已借: {{bookCount}}</text>
			</view>
			
			<view class="car-position">
				<image class="car-img" src="../static/kindlist/car.png"></image>
			</view>
		</view>
		
		<view class="white-space"></view>
	</view>
</template>

<script>
// 安卓在组件里面加载其他组件会有问题
import etTag from './etTag.vue'

export default {
	components: {
		// etTag
	},
	props: {
		imgSrc: String,
		bookName: String,
		tagData: Array,
		remark: String,
		people: String,
		bookCount: String
	},
	methods: {
		btnClick() {
			this.$emit('clickHandle')
		}
	}
}
</script>

<style>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	/* align-items: center; */
}
.img-content {
	width: 100%;
	height: 300upx;
}
.title-content {
	font-size: 35upx;
	font-weight: bold;
}
.tag-position {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}
.tag-content {
	margin-right: 3upx;
}
.remark-position {
	color: #CCCCCC;
	font-size: 25upx;
	line-height: 1;
}
.remark-content {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
.like-img {
	width: 40upx;
	height: 40upx;
}
.like-position {
	font-size: 30upx;
	color: #666666;
}
.out-position {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: 30upx;
	color: #666666;
}
.out-img {
	width: 40upx;
	height: 40upx;
}
.car-img {
	width: 40upx;
	height: 40upx;
}
</style>
