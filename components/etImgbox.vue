<template>
	<view class="btn-content">
		
		<view @tap="toBookDetail()">
			<view class="img-content">
				<image :src="bookInfo.forGoodsPic[0].url" class="img"></image>
				<!-- <view class="book-count-style" v-if="bookInfo.stock.usageCount > 0">
					<text>{{bookInfo.stock.usageCount}}本</text>
				</view> -->
				<view class="book-zero-count-style" v-if="bookInfo.stock.usageCount === 0">
					<view class="book-zero-content-style">
						<text>暂时</text>
						<text>借完</text>
					</view>
				</view>
			</view>
			
			<view class="font-content">
				<view class="title">
					<text>{{bookInfo.title}}</text>
				</view>			
				<view class="tag-style">
					<!-- 只显示两个标签 -->
					<!-- <text class="tag-content"  v-for="(item,i) in tag" v-if="i < 2" :key="i">{{item}}</text> -->
					<view class="tag-content" v-for="(item,index) in bookInfo.tagInfo" v-if="item && index < 2" :key="index">
						<et-tag :title="item.tag_name" :backgroundColor="item.bg_color" :fontColor="item.text_color" ></et-tag>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content-buttom-position">
			<et-add-book-to-cart :peopleCount="bookInfo.peopleCount" :bookInfo="bookInfo" @insertBookToCart='insertBookToCart'></et-add-book-to-cart>
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
		toBookDetail() {
			uni.navigateTo({ url: 'bookdetail?bookID=' + encodeURIComponent(JSON.stringify(this.$props.bookInfo.id)) })
		},
		insertBookToCart(){
			this.$emit('insertBookToCart');
		}
	}
}
</script>

<style scoped>
.btn-content {
	width: 265upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20upx 24upx;
	border-radius: 8px;
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.2);
	margin-top: 22upx;
	background-color: #FFFFFF;
}
.img-content {
	position: relative;
	width: 260upx;
	height: 280upx;
	background-color: #FFFFFF;
}
.book-count-style {
	background-color: rgba(157,160,174,.6);
	color: #FFFFFF;
	border-top-right-radius: 20upx;
	border-bottom-right-radius: 20upx;
	padding-left: 8upx;
	font-size: 30upx;
	width: 90upx;
	position: absolute;
	bottom:10upx;
}
.book-zero-count-style {
	background-color: rgba(157,160,174,.6);
	width: 260upx;
	height: 280upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom:10upx;
}
.book-zero-content-style {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(110,116,125,.8);
	color: #FFFFFF;
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	font-size: 30upx;
	padding: 30upx;
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
.tag-content + .tag-content {
	padding-left: 16upx;
}
.content-buttom-position {
	padding: 20upx 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
</style>
