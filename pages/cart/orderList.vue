<template>
	<view class="content">
		<view class="top-search">
			<!-- <view class="search-box" @tap="toSearch">
				<icon class="search-icon" type="search"/>
				<input class="search-input" type="text" placeholder="请输入订单号" disabled />
			</view> -->
		</view>
		
		<view class="tabs-position">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="30"
						 sliderColor="#FFFFFF" type="fill" selectColor="#2AAEC4" textColor="#FFFFFF" ref="tabs0" aniType="extend">
			</cl-tabs>
		</view>
		
		<view class="order-list-position" v-if="orderList.length > 0">
			<view class="white-border" style="margin: 20upx 0;" v-for="(item,index) in orderList" :key="index">
				<et-order-list :orderList="item" @reloadPages = "reloadPages"></et-order-list>
			</view>
			<uni-load-more :status="loadStatus" :content-text="loadText" />
		</view>
		<view class="order-list-position-null" v-if='listStatus === 0'>
			<text>列表空空如也</text>
		</view>
	</view>
</template>

<script>
import etOrderList from '../../components/etOrderList.vue'

export default {
	components: {
		etOrderList
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	data() {
		return {
			tabBars:['全部','待支付','待发货','待收货','待还书','待取件','待评价','逾期','退款'],	//订单tab
			tabBarID:0,  //初始化标签数据库ID
			tabCurrentIndex:-1,
			money:"30",
			customerInfo:{},
			defalutAddress : {
				// 'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
			},
			listStatus:1,	//列表状态0：没数据，1：加载中，其他：有数据
			orderList : [],
			pageSize: 3,
			currentPage: 1,
			loadStatus : 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '已经到底了'
			},
			
		}
	},
	onLoad(option) {
		this.tabCurrentIndex = 0; //初始化标签序号
		
		if(option.status_text){
			this.statusTextInit(option.status_text);
		}else{
			this.dataInit();
		}
	},
	onReachBottom : function(){
		const status_text = this.tabBars[this.tabCurrentIndex];
		this.getData(status_text);
	},
	methods: {
		btnClick() {
			console.log(this.defalutAddress);
		},
		tabChange(e){
			this.tabCurrentIndex = e;		// 更新标签序号
			const status_text = this.tabBars[this.tabCurrentIndex];
			//切换标签清理数据
			this.orderList = [];
			this.listStatus = 0;
			this.currentPage = 1;
			this.getData(status_text);
		},
		dataInit(){
			this.getData('');
			 
		},
		statusTextInit(type){
			this.tabBars.map((item,index)=>{
				if(item === type){
					this.tabCurrentIndex = index;
				}
			});
			this.getData(type);
		},
		getData(type){
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.customerInfo = res.data[0];
				let filterItems = {
					custom_id:this.customerInfo.id
				};
				if(type !== '全部'){
					let status = this.selectTypeCode(type);
					filterItems.status = status;
				}
				uni.showLoading()
				let param = {
			        pageSize:this.pageSize,
					currentPage: this.currentPage,
			        filterItems: filterItems
		       	};
				this.$api.getOrder(param).then(res=>{
					uni.hideLoading()
					
					if(res.data.rows.length === 0){
						this.loadStatus = 'noMore';  //没有数据时显示‘没有更多’
						return;
					}
					
					
					res.data.rows.map((item,index) =>{
						this.orderList.push(item);
					});
					this.currentPage++;
					this.loadStatus = 'more';
					// this.orderList = res.data.rows;
					
					if(res.data.rows.length < this.pageSize){
						this.loadStatus = 'noMore';  //没有数据时显示‘没有更多’
					}
					
					//更新显示状态
					this.listStatus = this.orderList.length;
					// uni.hideLoading()
					
				}) 
				console.log(this.orderList);
			});
		},
		reloadPages(){
			const status_text = this.tabBars[this.tabCurrentIndex];
			this.statusTextInit(status_text);
		},
		selectTypeCode(type){
			switch(type){
				case '待支付':
					return '1';
					break;
				case '待发货':
					return '2';
					break;
				case '待收货':
					return '3';
					break;
				case '待还书':
					return '4';
					break;
				case '待取件':
					return '5';
					break;
				case '待评价':
					return '6';
					break;
				case '逾期':
					return '7';
					break;
				case '退款':
					return '8';
					break;
				case '取消支付':
					return '9';
					break;
				default:
					return false;
			}
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-search {
	width:98%;
}
.search-box {
	padding: 10upx;
	width:98%;
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	margin-top: 20upx;
	background-color: #F5F5F5;
	border-radius: 50upx;
}

.search-icon {

}

.search-input {
	margin-left: 10upx;
	font-size: 34upx;
}
.top-position {
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-radius: 20upx;
	height: 230upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.member-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #FFFBE6;
	padding: 10upx 0;
}
.address-position {
	width: 90%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.add-address-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.order-list-position {
	width: 90%;
}
.order-list-position-null{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 300upx;
	font-size: 40upx;
	color: #6A6A6A;
}
.pay-position {
	width: 90%;
}
</style>
