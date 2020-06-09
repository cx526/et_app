<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_month.png" style="width: 100%;" mode="widthFix"></image>
		<view class="to-picture-button" @tap="toPictureeUrl"></view>
		<view class="to-gift-button" @tap="toGiftUrl"></view>
		<view class="to-sign-button" @tap="toSignUrl"></view>
		<view class="painting-button" @tap="paintingUrl"></view>
		<view class="work-button" @tap="workUrl"></view>
	</view>
</template>

<script>
const toUrlFunction = require('@/common/toUrlFunction');
const bookListData = require('@/common/carDataOption');

export default {
    data() {
        return {
			
        }
    },
	onShow() {
		//更新tab
		let bookCount = bookListData.cartBookCount();
	},
    onLoad() {
        //更新tab
        let bookCount = bookListData.cartBookCount();
    },
    methods: {
		toPictureeUrl() {
			uni.navigateTo({
				url:'/pages/promote/pictureToHomeDetail'
			})
		},
		toGiftUrl() {			
			toUrlFunction.toUrl('/pages/promote/promoteMonthGift');
			// uni.showToast({
			// 	title:'活动即将开放',
			// 	icon:"none",
			// 	duration:2000
			// })
		},
		toSignUrl() {
			uni.navigateTo({
				url:'/pages/index/sign'
			})
		},
		paintingUrl() {
			uni.navigateTo({
				url:'/pages/promote/picturePainting'
			})
		},
		workUrl() {
			uni.navigateTo({
				url:'/pages/promote/pictureWork'
			})
		},
		// 页面分享
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
		    return {
		      title: '读好书 · 赢积分 · 换好礼',
		      path: '/pages/index/index',
			  imageUrl:'http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1590482277709.png'
		    }
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #CAE6CE;
	position: relative;
}
.to-picture-button {
	width: 400UPX;
	height: 100upx;
	position: absolute;
	bottom: 1915upx;
	right: 40upx;
	/* background-color: #FFFFFF; */
}
.to-gift-button {
	width: 400UPX;
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
