<template>
	<view class="btn-content">
		
		<view @tap="toBookDetail()">
			<view class="img-content">
				<image :src=img class="img"></image>
			</view>
			
			<view class="font-content">
				<view class="title">
					<text>{{title}}</text>
				</view>			
				<view class="tag-style">
					<!-- 只显示两个标签 -->
					<!-- <text class="tag-content"  v-for="(item,i) in tag" v-if="i < 2" :key="i">{{item}}</text> -->
					<view class="tag-content" v-for="(item,index) in tag" v-if="item && index < 2" :key="index">
						<et-tag :title="item.title" :backgroundColor="item.backgroundColor" :fontColor="item.fontColor" ></et-tag>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content-buttom-position">
			<et-add-book-to-cart :peopleCount="peopleCount" :bookInfo="bookInfo"></et-add-book-to-cart>
		</view>
	</view>
</template>

<script>
import etAddBookToCart from './etAddBookToCart.vue'
import etTag from './etTag.vue'

export default {
	components: {
		etAddBookToCart,
		etTag
	},
	props: {
		title: String,
		bookCount: String,
		peopleCount: String,
		img: String,
		tag: Array,
		bookInfo: Object
	},
	methods: {
		// toBookDetail() {
		// 	this.$emit('toBookDetail')
		// },
		toBookDetail() {
			uni.navigateTo({ url: 'bookdetail?bookID=' + encodeURIComponent(JSON.stringify(this.$props.bookInfo.bookID)) })
		},
		insertToCart() {
			console.log('123');
		}
	}
}
</script>

<style>
.btn-content {
	width: 300upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20upx 24upx;
	border-radius: 8px;
	box-shadow: 4upx 4upx 4upx 4upx rgba(179,179,179,0.4);
	margin-top: 30upx;
	background-color: #FFFFFF;
}
.img-content {
	position: relative;
	width: 260upx;
	height: 280upx;
	background-color: #FFFFFF;
}
.img {
	height: 280upx;
	width: 260upx;
	border: 1upx solid rgba(179,179,179,0.1);
}
.font-content {
	width:260upx;
	padding-top: 10upx;
}
.title {
	width:260upx;
	padding-top: 8upx;
	font-size: 30upx;
	color: rgb(94,94,94);
	
	/* 显示一行，省略号 */
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	word-break: break-all;
}
.tag-style {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
	padding-top: 10upx;
}
.tag-content {

}
.content-buttom-position {
	padding: 20upx 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
