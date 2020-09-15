<template>
	<view class="content" >
		<view class="check-position">
			<checkbox value="cb" :checked="select" @click="changeSelect" style="transform:scale(0.7)"/>
		</view>
		<view class="img-position">
			<image :src="imgSrc" class="img-content"></image>
			<view class="book-zero-count-style"  v-if="!usageCount">
				<view class="book-zero-content-style">
					<text>暂时</text>
					<text>借完</text>
				</view>
			</view>
		</view>
		<view class="content-position">
			<view class="title-position">
				<text>{{title}}</text>
			</view>
			<view class="white-space" style="height: 20upx"></view>
			<view class="white-space" style="height: 90upx"></view>
			<view class="coin-position title-position">
				<text>X 1</text>
			</view>
		</view>
		<view class="last-position">
			<view class="rubbish-position" @click="deleteData">
				<image class="rubbish-img" src="../static/cart/rubbish.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
const bookListData = require('@/common/carDataOption');

export default {
	props: {
		imgSrc: String,
		title: String,
		status: String,
		coin: String,
		count: String,
		select: Boolean,
		bookID: String,
		usageCount: Number
	},
	methods: {
		changeSelect(){
			// 变更状态
			bookListData.changSelectType(this.bookID);
			console.log(this.$props.usageCount);
			this.$emit('changSelectType');
		},
		deleteData(){
			bookListData.deleteToCart(this.bookID);
			// 更新书篮书籍数量
			bookListData.countBookLength()
			this.$emit('deleteData');
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-items: space-around;
	align-items: center;
	text-align: center;
	border-radius: 15upx;
	/* border: 1upx solid rgba(179,179,179,0.3); */
	box-shadow: 0upx 0upx 12upx #ddd;
	background-color: #FFFFFF;
	overflow: hidden;
	padding: 0upx 30upx;
	box-sizing: border-box;
	height: 250upx;
}
.check-position {
	background-color: #FFFFFF;
}
.img-content {
	width: 230upx;
	height: 230upx;
}
.content-position {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	/* height: 250upx; */
	/* padding-top: 50upx; */
	background-color: #FFFFFF;
	height: 190upx;
}
.title-position {
	width: 250upx;
	font-size: 30upx;
	font-weight: bold;
	text-align: left;
}
.status-position {
	font-size: 20upx;
	color: #6A6A6A;
}
.coin-position {
	font-size: 24upx;
	color: #549EAB;
	font-weight: bold;
	text-align: left;
}
.rubbish-img {
	width: 35upx;
	height: 35upx;
}
.count-position {
	background-color: #E6E6E6;
	color:  #6A6A6A;
	border-radius: 20upx;
	padding: 10upx;
	font-size: 20upx;
}
.last-position {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding-top: 30upx;
	padding-left: 30upx;
	padding-bottom: 30upx;
	background-color: #FFFFFF;
	margin-left: 30rpx;
	height: 72%;
}
.img-position {
	position: relative;
}
.book-zero-count-style {
	background-color: rgba(157,160,174,.6);
	width: 220upx;
	height: 220upx;
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
</style>
