<template>
	<view class="content">
		<view class="tabs-content">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="15"
					:scale="1.3" sliderColor="#faff72" type="float" ref="tabs0" aniType="extend">
			</cl-tabs>
		</view>
		
		<view class="list-content-father-position">
			<view class="list-content-position" v-if="listData.length > 0">
				<et-kindlist style="width: 45%;" @click="toDetail" v-for="(item,index) in listData" :key="index" class="list-content" :imgSrc="item.imgSrc" :bookName="item.bookName" :tagData="item.tagData" :remark="item.remark" :people="item.people" :bookCount="item.bookCount"></et-kindlist>
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

export default {
	components: {
		clTabs,
		etKindlist
	},
	data() {
		return {
			tabBarsObj:[],	//分类页面传来的分类对象
			tabBars:[],  //标签显示
			tabBarID:0,  //初始化标签数据库ID
			tabCurrentIndex:1,
			sysWidth:0,
			source:'touch',
			fristTouch:false,
			listData:[]
		}
	},
	onLoad(option) {
		// 初始化tabBars
		this.tabBarsObj = JSON.parse(decodeURIComponent(option.tabBars));
		this.tabBars = [];
		this.tabBarsObj.forEach((obj) => {
			this.tabBars.push(obj.name);
		});
		this.tabBarID = this.tabBarsObj[0].id;	//初始化标签数据库ID
		this.tabCurrentIndex = 0; //初始化标签序号
		// 初始化tabBars
		
		// 初始化商品列表
		uni.showLoading();
		let param = {};
		param.id = this.tabBarID;
		this.$api.getGoodsList(param).then(res => {
		   this.listData = this.transformListData(res.data);
		   uni.showToast();
		})
		// 初始化商品列表
	},
	methods: {
		tabChange(e){
			this.tabBarID = this.tabBarsObj[e].id;	// 更新id用于获取列表数据
			this.tabCurrentIndex = e;		// 更新标签序号
			
			// 变更商品列表
			uni.showLoading();
			let param = {};
			param.id = this.tabBarID;
			this.$api.getGoodsList(param).then(res => {
			   this.listData = this.transformListData(res.data);
			   uni.showToast();
			})
		},
		// 转换接口数据为视图数据
		transformListData(data){
			let resultArr = [];
			data.forEach((item) => {
				console.log(item);
				let resultObj = {};
				resultObj.imgSrc = item.goodsResult.cover;
				resultObj.bookName = item.goodsResult.title;
				resultObj.people = '311';
				resultObj.bookCount = '30';
				if(item.listTagInfo && item.listTagInfo.length > 0) {
					let tagArr = [];
					item.listTagInfo.forEach((obj) => {
						let tagObj = {};
						tagObj.title = obj.tag_name;
						tagObj.backgroundColor = obj.bg_color;
						tagObj.fontColor = obj.text_color;
						tagArr.push(tagObj);
					});
					resultObj.tagData = tagArr;
				}
				resultArr.push(resultObj);
			});
			return resultArr;
		},
		toDetail(){
			console.log('123');
			uni.navigateTo({url: 'bookdetail'})
		}
	}
}
</script>

<style>
.content {
	display: flex;
}
.tabs {
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
}
.list-content-father-position {
	padding-top: 120upx;
	width: 100%;
	
}
.list-content-position{
	width: 94%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content:flex-start;
}
.list-content {
	width: 45%;
	margin-right: 4%;
}
</style>
