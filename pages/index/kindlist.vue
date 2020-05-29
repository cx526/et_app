<template>
	<view class="content">
		<view class="tabs-content">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="15"
					:scale="1.3" sliderColor="#faff72" type="float" ref="tabs0" aniType="extend">
			</cl-tabs>
		</view>
		
		
		<view class="list-content-father-position">
			<view class="list-content-father-position" v-if="listData.length > 0">
				<view class="list-content-position">					
					<et-imgbox  v-for="(item,i) in listData" :key="i" :bookInfo="item.goods_info"></et-imgbox>
				</view>
				<view class="white-space"></view>
				<uni-load-more :status="loadStatus" :content-text="loadText" />
			</view>
			<view class="empty-style" v-else>
				<text>列表空空如也</text>
			</view>
		</view>
		
	</view>
</template>

<script>
import clTabs from '../../components/cl-tabs/cl-tabs.vue'
import etKindlist from '../../components/etKindlist.vue'
import etImgbox from '../../components/etImgbox.vue'

export default {
	components: {
		clTabs,
		etKindlist,
		etImgbox
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
				contentnomore: '没有更多'
			},
		}
	},
	onLoad(option) {
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
			this.listData = JSON.parse(decodeURIComponent(option.bookList));
			console.log(this.listData);
			this.loadStatus = 'noMore';
		}else{
			uni.showLoading();
			let param = {
		        pageSize:this.pageSize,
				currentPage: this.currentPage,
		        filterItems: {
		           kind: this.tabBarID,
		           tagCount: 2
		         }
	       	};
			this.$api.getGoodsInfo(param).then(res => {
			   let objArr = [];
			   res.data.rows.map((item,index)=>{
				   objArr[index] = {};
				   objArr[index].goods_info = item
			   });
			   this.listData = objArr;
			   this.currentPage++;
			   uni.hideLoading();
			})
		}
		// 初始化商品列表
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
	           tagCount: 2
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
		           tagCount: 2
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
		}
	}
}
</script>

<style>
.content {
	display: flex;
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
.list-content-position{
	width: 96%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content:space-between;
}
.list-content {
	width: 45%;
	margin-right: 4%;
}
</style>
