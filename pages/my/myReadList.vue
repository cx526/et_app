<template>
	<view class="content">
		<view style="width: 100%; position: relative;">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/myReadList_book_top_group.png" style="width: 100%;" mode="widthFix"></image>
			
			<!-- 文字部分内容 -->
			<view style="font-size: 30upx; font-weight: 500; position: absolute; left: 120upx; top: 200upx;">
				<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;">
					<text>累计借阅</text>
					<text style="color: #2AAEC4;"> {{readData.readCount}} </text>
					<text>本</text>
				</view>
			</view>
		</view>
		
		<view style="width: 88%; padding-bottom: 80upx;">
			<view class='white-border' style="margin-top: 20upx; padding: 0upx 20upx;" v-for="(item,index) in showData">
				<et-img-book-list-scroll-view :showData="item"></et-img-book-list-scroll-view>
			</view>
			
			<uni-load-more :status="loadStatus" :content-text="loadText" />
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
			readData:{},
			showData:[],
			userInfoAll: {},
			pageSize:3,
			currentPage:1,
			noPull:'',		//如果为1不允许上拉更新数据
			loadStatus : 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '已经到底了...'
			}
        }
    },
	// 上拉加载更多,onReachBottom上拉触底函数
	onReachBottom : function(){
		this.getListData();
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
				//游客 发出提示
				uni.showModal({
					title: '请先登录',
					confirmText: '登录',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}else if (res.cancel) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}
					}
				});
				return;
			}
			this.userInfoAll = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
			this.initData();
			this.$forceUpdate();
		},
		initData() {
			this.$api.getHistoryOrder({custom_id:this.userInfoAll.id,pageSize:this.pageSize,currentPage:this.currentPage}).then(res=>{
				this.showData = res.data;
				this.currentPage++;
				this.loadStatus = 'more';
			})
			this.getReadCount();
		},
		getReadCount(){
			this.$api.getHistoryOrderCount({custom_id:this.userInfoAll.id}).then(res=>{
				this.readData = res.data;
			})
		},
		getListData(){
			this.loadStatus = 'loading';
			this.$api.getHistoryOrder({custom_id:this.userInfoAll.id,currentPage:this.currentPage,pageSize:this.pageSize}).then(res=>{
				if(res.data.length === 0){
					this.loadStatus = 'nomore';
					return;
				}
				res.data.map((item,index)=>{
					this.showData.push(item);
				})
				this.loadStatus = 'more';
				this.currentPage++;
			});
		}
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
