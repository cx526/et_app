<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_01.png" style="width: 100%;" mode="widthFix"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_02.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1860)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_03.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1856)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_04.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1855)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_05.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1861)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_06.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1857)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_07.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1859)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_08.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1862)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_09.png" style="width: 100%;" mode="widthFix"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_10.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1852)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_11.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1858)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_12.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1851)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_13.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1854)"></image>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_summer_book_14.png" style="width: 100%;" mode="widthFix" @tap="toBookDetail(1853)"></image>
	</view>
</template>

<script>
const toUrlFunction = require('@/common/toUrlFunction');
const bookListData = require('@/common/carDataOption');

export default {
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo');
		}
	},
	methods: {
		toBookDetail(id) {
			uni.navigateTo({
				url: '/pages/index/bookdetail?bookID=' + id
			});
		}
	}
};
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #cae6ce;
	position: relative;
}
.to-picture-button {
	width: 400upx;
	height: 100upx;
	position: absolute;
	bottom: 1915upx;
	right: 40upx;
	/* background-color: #FFFFFF; */
}
.to-gift-button {
	width: 400upx;
	height: 100upx;
	position: absolute;
	bottom: 1600upx;
	right: 100upx;
	/* background-color: #FFFFFF; */
}
.to-sign-button {
	width: 100%;
	height: 300upx;
	position: absolute;
	bottom: 900upx;
	/* right: 100upx; */
	/* background-color: #FFFFFF; */
}
.painting-button {
	width: 100%;
	height: 300upx;
	position: absolute;
	bottom: 550upx;
	/* right: 250upx; */
	/* background-color: #FFFFFF; */
}
.work-button {
	width: 100%;
	height: 300upx;
	position: absolute;
	bottom: 230upx;
	/* right: 100upx; */
	/* background-color: #FFFFFF; */
}
</style>
