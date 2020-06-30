<template>
	<view class="content">
		<!-- <et-img-book-list :showData="showData[5].goodsInfoSplit[0]"></et-img-book-list> -->
		<view style="width: 88%; padding-bottom: 80upx;">
			<view class='white-border' style="margin-top: 30upx; padding: 0upx 20upx;" v-for="(item,index) in showData">
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
}
</style>
