<template>
	<view class="content">
		<view style="width: 100%; position: relative;">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myReadList_book_top_group.png" style="width: 100%;" mode="widthFix"></image>
			
			<!-- 文字部分内容 -->
			<view style="font-size: 30upx; font-weight: 500; position: absolute; left: 120upx; top: 200upx;">
				<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
					<text>累计借阅</text>
					<text style="color: #2AAEC4;"> 21 </text>
					<text>本</text>
				</view>
			</view>
		</view>
		
		<view style="width: 88%; padding-bottom: 80upx;">
			<view class='white-border' style="margin-top: 20upx; padding: 0upx 20upx;" v-for="(item,index) in showData">
				<et-img-book-list-scroll-view :showData="item"></et-img-book-list-scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import etImgBookListScrollView from '../../components/group-swiper/etImgBookListScrollView.vue';

const checkLogin = require('@/common/checkLogin');

export default {
	components: {
		etImgBookListScrollView
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    data() {
        return {
			showData:[],
			userInfoAll: {}
        }
    },
    onLoad() {
        this.getCustomerInfo();
		// this.initData();
    },
    methods: {
		async getCustomerInfo(){
			//没登录不显示积分
			let guestStatus = checkLogin.checkLogin(true);
			if(guestStatus){
				return;
			}
			this.userInfoAll = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
			this.initData();
			this.$forceUpdate();
		},
		initData() {
			this.$api.getHistoryOrder({custom_id:this.userInfoAll.id}).then(res=>{
				this.showData = res.data;
				console.log(this.showData);
			})
		},
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #9EE0F0;
	min-height: 100VH;
}
</style>
