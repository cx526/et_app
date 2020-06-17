<template>
	<view class="content">
		<view class="tabs-content">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="30"
					 sliderColor="#FFFFFF" type="fill" selectColor="#2AAEC4" textColor="#FFFFFF" ref="tabs0" aniType="extend">
			</cl-tabs>
		</view>
		
		<view class="data-list" >
			<view v-for="(item,index) in listData" class="data-list">
				<view class="gift-detail white-border">
					<et-gift-detail-title :showData="item"></et-gift-detail-title>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import clTabs from '../../components/cl-tabs/cl-tabs.vue'
import etGiftDetailTitle from '../../components/etGiftDetailTitle.vue'

export default {
	components: {
		clTabs,
		etGiftDetailTitle
	},
    data() {
        return {
			tabBars:['可兑换','已兑换','已失效'],
			tabBarID:0,  //初始化标签数据库ID
			tabCurrentIndex:-1,
			listData : [
				{
					id : 1,
					name : 'test',
					type : 'A',
					status : '1',
					point : '3000',
					exchange_time : '1',
					combo : '12,32',
					img : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
					img_url : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
					remark : '测试室'
				},
				{
					id : 1,
					name : 'test',
					type : 'A',
					status : '1',
					point : '3000',
					exchange_time : '1',
					combo : '12,32',
					img : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
					img_url : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/popOver.png',
					remark : '测试室'
				}
			]
        }
    },
    onLoad() {
        this.tabCurrentIndex = 0;
    },
    methods: {
		toScoreUrl(){
			toUrlFunction.toUrl('/pages/promote/pictureMonth');
		},
		tabChange(e){
			this.tabCurrentIndex = e;		// 更新标签序号
			const status_text = this.tabBars[this.tabCurrentIndex];
			// this.getData(status_text);
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(235,248,255,1);
	min-height: 100vh;
}
.data-list{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.gift-detail{
	width: 90%;
	padding: 10upx;
	margin-top: 20upx;
}
</style>
