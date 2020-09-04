<template>
	<view class="btn-content" :style="{'width': width}">
		<view @tap="toBookDetail()" 
		style="width: 100%;display: flex;flex-direction: column;align-items: center;">
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
					<text>{{ bookInfo.title }}</text>
				</view>
				<view class="tag-style">
					<!-- 只显示两个标签 -->
					<!-- <text class="tag-content"  v-for="(item,i) in tag" v-if="i < 2" :key="i">{{item}}</text> -->
					<view class="tag-content" v-for="(item, index) in bookInfo.tagInfo" v-if="item && index < 2" :key="index">
						<et-tag :title="item.tag_name" :backgroundColor="item.bg_color" :fontColor="item.text_color"></et-tag>
					</view>
				</view>
			</view>
		</view>
		<!-- 推荐 -->
		<view class="content-buttom-position" :style="{'width' : width}">
			<et-add-book-to-cart :peopleCount="bookInfo.peopleCount" :bookInfo="bookInfo" @insertBookToCart="insertBookToCart"></et-add-book-to-cart>
		</view>
		<!-- 区分书籍标识 -->
		<image v-if="bookInfo.lineType == 1 || lineType == 1"
		:src="$aliImage + 'book-logo-01.png'" mode="widthFix"
		style="width: 78rpx;position: absolute;left: 24rpx;top: -8rpx;"></image>
		<image v-if="bookInfo.lineType == 2 || lineType == 2"
		:src="$aliImage + 'book-logo-02.png'" mode="widthFix"
		style="width: 78rpx;position: absolute;left: 24rpx;top: -8rpx;"></image>
		<image v-if="bookInfo.lineType == 3 || lineType == 3"
		:src="$aliImage + 'book-logo-03.png'" mode="widthFix"
		style="width: 78rpx;position: absolute;left: 24rpx;top: -8rpx;"></image>
	</view>
</template>

<script>
import etAddBookToCart from './etAddBookToCart.vue';
import etTag from './etTag.vue';

export default {
	data() {
		return {
			width: 0,
			$aliImage: this.$aliImage,
		}
	},
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
		bookInfo: Object,
		// 从热门搜索更多传递过来书籍编辑
		lineType: {
			type: String,
			default: ""
		}
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.width = (res.windowWidth - 42)/2 + 'px'
			}
		})
	},
	methods: {
		toBookDetail() {
			uni.navigateTo({ url: 'bookdetail?bookID=' + encodeURIComponent(JSON.stringify(this.$props.bookInfo.id)) });
		},
		insertBookToCart() {
			this.$emit('insertBookToCart');
		}
	}
};
</script>

<style scoped>
.btn-content {
	/* width: 265upx; */
	/* width: 150px; */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 24rpx 24rpx 20rpx 24rpx;
	border-radius: 8px;
	box-shadow: 0upx 0upx 20upx rgba(179, 179, 179, 0.3);
	margin-top: 20upx;
	background-color: #ffffff;
	box-sizing: border-box;
	position: relative;
}
.img-content {
	position: relative;
	width: 260upx;
	height: 280upx;
	background-color: #ffffff;
}
.book-count-style {
	background-color: rgba(157, 160, 174, 0.6);
	color: #ffffff;
	border-top-right-radius: 20upx;
	border-bottom-right-radius: 20upx;
	padding-left: 8upx;
	font-size: 30upx;
	width: 90upx;
	position: absolute;
	bottom: 10upx;
}
.book-zero-count-style {
	background-color: rgba(157, 160, 174, 0.6);
	width: 260upx;
	height: 280upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 10upx;
}
.book-zero-content-style {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(110, 116, 125, 0.8);
	color: #ffffff;
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	font-size: 30upx;
	padding: 30upx;
}
.img {
	height: 280upx;
	width: 260upx;
	border: 1upx solid rgba(179, 179, 179, 0.1);
}
.font-content {
	/* width: 260upx; */
	width: 100%;
	padding-top: 10upx;
}
.title {
	width: 260upx;
	padding-top: 8upx;
	font-size: 30upx;
	color: rgb(94, 94, 94);

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
	box-sizing: border-box;
	/* padding: 20upx 0; */
	padding: 20rpx 0 20rpx 24rpx;
	width: 100%;
/* 	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between; */
}
</style>
