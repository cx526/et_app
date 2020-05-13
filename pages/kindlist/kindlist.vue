<template>
	<view class="content">
		<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="15" 
				:scale="1.3" sliderColor="#faff72" type="float" ref="tabs0" aniType="extend">
		</cl-tabs>
	</view>
</template>

<script>
import clTabs from '../../components/cl-tabs/cl-tabs.vue'

export default {
	components: {
		clTabs
	},
	data() {
		return {
			tabBars:['最新','新闻','图片','视频','推荐','收藏','关注'],
			tabCurrentIndex:-1,
			sysWidth:0,
			source:'touch',
			fristTouch:false
		}
	},
	onLoad() {
		
	},
	methods: {
		tabChange(e){
			
			this.tabCurrentIndex = e
			
		},
	}
}
</script>

<style>
.content {
	display: flex;
}
</style>
