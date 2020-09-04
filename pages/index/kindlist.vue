<template>
	<view class="content">
		<view class="content-position">
			<!-- 顶部导航栏 -->
			<view class="tabs-content">
				<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="30"
						 sliderColor="#FFFFFF" type="fill" selectColor="#2AAEC4" textColor="#FFFFFF" ref="tabs0" aniType="extend">
				</cl-tabs>
			</view>
			
			<!-- 数据列表 -->
			<view class="list-content-father-position">
				<view class="list-content-father-position" v-if="listData.length > 0">
					<!-- 搜索，热门推荐页面不做库存为0限制 -->
					<view class="list-content-position" v-if="isHidden === 0">
						<view  v-for="(item,i) in listData" :key="i">
							<et-imgbox :bookInfo="item.goods_info" @insertBookToCart="insertBookToCart" :lineType="item.lineType"></et-imgbox>
						</view>						
					</view>
					
					<!-- 非搜索，热门推荐页面要做库存为0限制 -->
					<view class="list-content-position" v-if="isHidden === 1">
						<view  v-for="(item,i) in listData" :key="i" v-if="item.goods_info.stock.usageCount !== 0">
							<et-imgbox :bookInfo="item.goods_info" @insertBookToCart="insertBookToCart"></et-imgbox>
						</view>						
					</view>
					
					<view class="white-space"></view>
					<uni-load-more :status="loadStatus" :content-text="loadText" />
				</view>
				<view class="empty-style" v-if='listStatus === 0'>
					<text>列表空空如也</text>
				</view>
			</view>
		</view>
		
		<!-- 书篮浮窗 -->
		<view class="book-cart-position" @tap="openBookCartList">
			<view class="book-cart-content-position">
				<view class="book-cart-style">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookdetail_cart.png" class="book-cart-img-style"></image>
				</view>
				<view class="book-cart-count-style" v-if="cartBookCount != 0">
					<text>{{cartBookCount}}</text>
				</view>
			</view>
		</view>
		
		<!-- 书篮弹窗 -->
		<uni-popup ref="popup" type="bottom" @change="popupChange">
<!-- 			<scroll-view scroll-y="true" style="height: 1000upx;" > -->
			<view style="background: #FFFFFF; height: 800rpx;">
				<!-- <view v-for="i in 10" :key="i" style="background: #007AFF; height: 100px;">{{i}}</view> -->
				<et-book-cart-list v-if="popupShow" :optionData="{optionType:'kindlist'}" @toKineUrl='toKineUrl'></et-book-cart-list>
			</view>
			<!-- </scroll-view> -->
		</uni-popup>
		
	</view>
</template>

<script>
import clTabs from '../../components/cl-tabs/cl-tabs.vue'
import etKindlist from '../../components/etKindlist.vue'
import etImgbox from '../../components/etImgbox.vue'
import etBookCartList from '../../components/etBookCartList.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'

const insertBook = require('@/common/carDataOption');

export default {
	components: {
		clTabs,
		etKindlist,
		etImgbox,
		etBookCartList,
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	},
	data() {
		return {
			pageSize: 20,
			currentPage: 1,
			tabBarsObj:[],	//分类页面传来的分类对象
			tabBars:[],  //标签显示
			tabBarID:0,  //初始化标签数据库ID
			tabCurrentIndex:-1,
			sysWidth:0,
			source:'touch',
			fristTouch:false,
			listData:[],
			noPull:'',		//如果为1不允许上拉更新数据
			loadStatus : 'loading',
			loadText: {
				contentdown: '上拉加载更多',
				contentrefresh: '加载中',
				contentnomore: '已经到底了'
			},
			cartBookCount:0,
			popupShow:false,
			listStatus:1,	//列表状态0：没数据，1：加载中，其他：有数据
			isHidden:1,	//是否隐藏没库存数据，0不隐藏，1隐藏  默认隐藏，如果是搜索页面与热门推荐则不隐藏
			docker_mac: '',
		}
	},
	onLoad(option) {	
		this.docker_mac = uni.getStorageSync("userInfo").docker_mac ? uni.getStorageSync("userInfo").docker_mac : ''
		//初始化书篮书本数量
		this.cartBookCount = insertBook.cartBookCount();
		
		//初始化是否允许上拉更新数据,有些页面复用不能更新数据
		if(option.noPull){
			this.noPull = parseInt(option.noPull);
		}
		
		// 初始化tabBars
		this.tabBarsObj = JSON.parse(decodeURIComponent(option.tabBars));
		this.tabBars = [];
		this.tabBarsObj.forEach((obj) => {
			this.tabBars.push(obj.name);
		});
		this.tabCurrentIndex = option.selectID; //初始化标签序号
		this.tabBarID = this.tabBarsObj[option.selectID].id;	//初始化标签数据库ID
		// 初始化tabBars
		
		// 初始化商品列表
		if(option.bookList){
			let listDataArr = JSON.parse(decodeURIComponent(option.bookList));
			// console.log(listDataArr);
			let objStatus = 0;    //兼容goods_info状态
			let objArr = [];
			listDataArr.map((item,index)=>{
				if(item.goods_info){
					objStatus = 1;
					return;
				}
				let objArr = [];
				listDataArr.map((item,index)=>{
					objArr[index] = {};
					objArr[index].goods_info = item
				});
				this.listData = objArr;
			})
			if(objStatus === 1){
				this.listData = listDataArr;
			}
			
			//更新显示状态
			this.listStatus = this.listData.length;
			
			// let objArr = [];
			// listDataArr.map((item,index)=>{
			// 	objArr[index] = {};
			// 	objArr[index].goods_info = item
			// });
			// this.listData = objArr;
			this.loadStatus = 'noMore';
		}else{
			uni.showLoading();
			
			let param = {
        pageSize:this.pageSize,
				currentPage: this.currentPage,
        filterItems: {
           kind: this.tabBarID,
           tagCount: 2,
					 state: 1,
					 docker_mac: this.docker_mac
         }
       };
			this.$api.getGoodsInfo(param).then(res => {
			   let objArr = [];
			   res.data.rows.map((item,index)=>{
				   objArr[index] = {};
				   objArr[index].goods_info = item
			   });
			   this.listData = objArr;
			   //更新显示状态
			   this.listStatus = this.listData.length;
			   this.currentPage++;
			   uni.hideLoading();
			})
		}
		console.log(this.listData);
		// 初始化商品列表
		
		//如果是搜索页面与热门推荐则不隐藏0库存数据
		if(option.pagesType === 'search' || option.pagesType === 'hotList'){
			this.isHidden = 0
			console.log('uuuiii');
		}
	},
	// 上拉加载更多,onReachBottom上拉触底函数
	onReachBottom : function(){
		// 如果nopull为不允许上拉更新
		if(this.noPull === 1){
			this.loadStatus = 'noMore';  //没有数据时显示‘没有更多’
			return;
		}
		let param = {
	        pageSize:this.pageSize,
			currentPage: this.currentPage,
	        filterItems: {
	           kind: this.tabBarID,
	           tagCount: 2,
						 docker_mac: this.docker_mac
	         }
       	};
		this.$api.getGoodsInfo(param).then(res => {
			if(res.data.rows.length === 0) {
				this.loadStatus = 'noMore';  //没有数据时显示‘没有更多’
				return;
			}
			let objArr = [];
			res.data.rows.map((item,index)=>{
			    objArr[index] = {};
				objArr[index].goods_info = item;
				this.listData.push(objArr[index]);
			});
			this.currentPage++;
			this.loadStatus = 'more';
		})
	},
	methods: {
		tabChange(e){
			this.tabBarID = this.tabBarsObj[e].id;	// 更新id用于获取列表数据
			this.tabCurrentIndex = e;		// 更新标签序号
			this.currentPage=1;				//初始化分页页码，拿到第一页
			
			// 变更商品列表
			uni.showLoading();
			let param = {
				pageSize:this.pageSize,
				currentPage: this.currentPage,
		        filterItems: {
		           kind: this.tabBarID,
		           tagCount: 2,
							 state: 1,
							 docker_mac: this.docker_mac
		         }
	       	};
			this.$api.getGoodsInfo(param).then(res => {
			   let objArr = [];
			   res.data.rows.map((item,index)=>{
					objArr[index] = {};
					objArr[index].goods_info = item
					// this.listData.push(objArr);
			   });
			   this.listData =  objArr;
			   // this.listData.push(objArr);
			   this.currentPage++;
			   uni.hideLoading();
			})
		},
		toDetail(id){
			uni.navigateTo({url: 'bookdetail?bookID=' + JSON.stringify(id)})
		},
		insertBookToCart(){
			this.cartBookCount = insertBook.cartBookCount();
		},
		openBookCartList(){
			this.$refs.popup.open();
		},
		toKineUrl(){
			this.$refs.popup.close();
		},
		popupChange(e){
			console.log(e);
			this.popupShow = e.show;
			this.cartBookCount = insertBook.cartBookCount();
		}
		
	}
}
</script>

<style scoped>
.content {
	display: flex;
	width: 100%;
}
.content-position {
	display: flex;
	width: 100%;
}
.tabs-content {
	z-index: 99;
	background-color: #FFFFFF;
}
.tabs {
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
}
.list-content-father-position {
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content:center;
	padding-top: 50upx;
}
.list-content-father-position {
	width: 100%;
}
/* .list-content-position{
	width: 96%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content:space-between;
} */
.list-content-position{
	width: 100%;
	/* margin: 0 auto; */
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content:space-between;
	box-sizing: border-box;
	padding: 0 30rpx;
}
.list-content {
	width: 45%;
	margin-right: 4%;
}
.book-cart-position {
	position: fixed;
	right: 0;
	bottom: 400upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.book-cart-content-position {
	width: 90upx;
	height: 90upx;
	border-radius: 50%;
	padding: 10upx;
	background-color: rgba(196,198,206,.7);
	position: relative;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.book-cart-img-style {
	width: 70upx;
	height: 70upx;
}
.book-cart-count-style {
	position: absolute;
	left: 60upx;
	top: 10upx;
	width: 40upx;
	height: 40upx;
	border-radius: 50%;
	color: #FFFFFF;
	font-size: 20upx;
	background-color: #FA5151;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
