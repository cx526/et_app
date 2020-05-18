<template>
	<view class="content">
		<view class="tabs-content">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="15"
					:scale="1.3" sliderColor="#faff72" type="float" ref="tabs0" aniType="extend">
			</cl-tabs>
			
			<view class="list-content-position">
				<et-kindlist @click="toDetail" v-for="(item,index) in listData" :key="index" class="list-content" :imgSrc="item.imgSrc" :bookName="item.bookName" :tagData="item.tagData" :remark="item.remark" :people="item.people" :bookCount="item.bookCount"></et-kindlist>
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
			tabBars:['最新','新闻','图片','视频','推荐','收藏','关注'],
			tabCurrentIndex:0,
			sysWidth:0,
			source:'touch',
			fristTouch:false,
			listData:[
				{
					'imgSrc': '../static/kindlist/book.png',
					'bookName': '平民窟的世界乐团（精）',
					'tagData': [
						{
							'title':'3-6岁',
							'backgroundColor':'#F76630'
						},
						{
							'title':'百科全书',
							'backgroundColor':'#1AA034'
						},
						,
						{
							'title':'儿童纪实',
							'backgroundColor':'#28AFEA'
						},
						{
							'title':'百科全书',
							'backgroundColor':'#1AA034'
						},
						,
						{
							'title':'儿童纪实',
							'backgroundColor':'#28AFEA'
						}
					],
					'remark': '中新经纬客户端5月14日电(张猛)日前，国家信息中心发布2020年“万亿俱乐部城市”房地产市场走势研判，2019年17个GDP万亿城市房地产投资依存度随之出炉，郑州最高，北京最低.',
					'people' : '311',
					'bookCount': '20'
				},
				{
					'imgSrc': '../static/kindlist/book.png',
					'bookName': '平民窟的世界乐团（精）',
					'tagData': [
						{
							'title':'3-6岁',
							'backgroundColor':'#F76630'
						},
						{
							'title':'百科全书',
							'backgroundColor':'#1AA034'
						},
						,
						{
							'title':'儿童纪实',
							'backgroundColor':'#28AFEA'
						},
						{
							'title':'百科全书',
							'backgroundColor':'#1AA034'
						},
						,
						{
							'title':'儿童纪实',
							'backgroundColor':'#28AFEA'
						}
					],
					'remark': '中新经纬客户端5月14日电(张猛)日前，国家信息中心发布2020年“万亿俱乐部城市”房地产市场走势研判，2019年17个GDP万亿城市房地产投资依存度随之出炉，郑州最高，北京最低.',
					'people' : '311',
					'bookCount': '20'
				},
				{
					'imgSrc': '../static/kindlist/book.png',
					'bookName': '平民窟的世界乐团（精）',
					'tagData': [
						{
							'title':'3-6岁',
							'backgroundColor':'#F76630'
						},
						{
							'title':'百科全书',
							'backgroundColor':'#1AA034'
						},
						,
						{
							'title':'儿童纪实',
							'backgroundColor':'#28AFEA'
						},
						{
							'title':'百科全书',
							'backgroundColor':'#1AA034'
						},
						,
						{
							'title':'儿童纪实',
							'backgroundColor':'#28AFEA'
						}
					],
					'remark': '中新经纬客户端5月14日电(张猛)日前，国家信息中心发布2020年“万亿俱乐部城市”房地产市场走势研判，2019年17个GDP万亿城市房地产投资依存度随之出炉，郑州最高，北京最低.',
					'people' : '311',
					'bookCount': '20'
				}				
			]
		}
	},
	onLoad() {
		
	},
	methods: {
		tabChange(e){
			
			this.tabCurrentIndex = e
			
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
