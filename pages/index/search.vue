<template>
	<view class="content">
		<view class="search-position">
			<et-search :content="content" :placeholderString="placeholderString" @searchData="searchData"  @inputChangeAction="inputChangeAction"></et-search>
		</view>
		
		<view class="white-space"></view>
		
		<view class="search-list-position" v-if="history.contentList.length > 0">
			<et-search-list :search="history" @deleteData="deleteData" @selectContent="selectContent"></et-search-list>
		</view>
		
		<view class="white-space"></view>
		
		<view class="search-list-position">
			<et-search-list :search="hot" @selectContent="selectContent"></et-search-list>
		</view>
	</view>
</template>

<script>
const hestoryList= require('@/common/dataOption');

import etSearch from '../../components/etSearch.vue'
import etSearchList from '../../components/etSearchList.vue'

export default {
	components: {
		etSearch,
		etSearchList
	},
    data() {
        return {
			content:'',
			placeholderString:'请输入书名/作者/关键词...',
			history: {
				title : '历史搜索',
				img : '../static/index/close.png',
				contentList : [
					'十万个为什么',
					'毛毛虫',
					'机器人是我',
					'巴巴国王',
					'十万个为什么',
					'毛毛虫',
					'机器人是我',
					'巴巴国王',
					'十万个为什么',
					'毛毛虫',
					'机器人是我',
					'巴巴国王'
				]
			},
			hot: {
				title : '热门搜索',
				contentList : [
					'十万个为什么',
					'毛毛虫',
					'机器人是我',
					'巴巴国王',
					'十万个为什么',
					'毛毛虫',
					'机器人是我',
					'巴巴国王',
					'十万个为什么',
					'毛毛虫',
					'机器人是我',
					'巴巴国王'
				]
			}
        }
    },
    onLoad() {
		this.history.contentList = hestoryList.getListData('hestoryList');
    },
    methods: {
		buttonClick() {
			
		},
		searchData() {
			hestoryList.insertData('hestoryList',this.content);
			this.history.contentList = hestoryList.getListData('hestoryList');
			
			let param = {
		        filterItems: {
		           search: this.content
		         }
	       	};
			this.$api.getGoodsInfo(param).then(res => {
			   uni.showLoading();
			   let listData = this.transformListData(res.data.rows);
			   let tabBars = [{'name':'搜索结果'}];
			   uni.navigateTo({ url: './kindlist?noPull=1&selectID=0&tabBars=' + encodeURIComponent(JSON.stringify(tabBars)) + '&bookList=' + encodeURIComponent(JSON.stringify(listData))});
			   uni.hideLoading();
			})
		},
		inputChangeAction(e) {
			this.content = e.target.value
		},
		selectContent(e) {
			this.content = e;
			this.searchData();
		},
		deleteData() {
			hestoryList.deleteALL('hestoryList');
			this.history.contentList = hestoryList.getListData('hestoryList');
		},// 转换接口数据为视图数据
		transformListData(data){
			let resultArr = [];
			data.forEach((item) => {
				let resultObj = {};
				resultObj.bookID = item.id;
				if (item.forGoodsPic && item.forGoodsPic.length > 0) {
					resultObj.imgSrc = item.forGoodsPic[0].url;
				}else{
					resultObj.imgSrc = item.pic; 
				}
				resultObj.name = item.title;
				resultObj.people = '311';
				resultObj.bookCount = '30';
				if(item.tagInfo && item.tagInfo.length > 0) {
					let tagArr = [];
					item.tagInfo.forEach((obj) => {
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
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.search-position {
	width: 94%;
}
.search-list-position {
	width: 94%;
}
</style>
