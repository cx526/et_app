<template>
	<view class="content">
		<view class="search-position">
			<et-search :content="content" :placeholderString="placeholderString"></et-search>
		</view>
		
		<view class="white-space"></view>
		
		<view class="search-list-position">
			<et-search-list :search="history"></et-search-list>
		</view>
		
		<view class="white-space"></view>
		
		<view class="search-list-position">
			<et-search-list :search="hot"></et-search-list>
		</view>
	</view>
</template>

<script>
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
        
    },
    methods: {
		buttonClick() {

		},
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
