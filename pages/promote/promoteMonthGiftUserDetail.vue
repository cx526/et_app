<template>
	<view class="content">
		<view class="tabs-content">
			<cl-tabs class="tabs" :tab-bars="tabBars" :tab-index="tabCurrentIndex" @tabChange="tabChange" :sliderMargin="30"
					 sliderColor="#FFFFFF" type="fill" selectColor="#2AAEC4" textColor="#FFFFFF" ref="tabs0" aniType="extend">
			</cl-tabs>
		</view>
		
		<view v-if="showDataStatus">
			<view class="data-list" v-if="listData.length>0">
				<view v-for="(item,index) in listData" :key='index' class="data-list">
					<view class="gift-detail white-border">
						<et-gift-detail-title :showData="item" type='userDetail' :tabIndex='parseInt(this.tabCurrentIndex) + 1'></et-gift-detail-title>
					</view>
				</view>
				<view class="white-space" style="height: 50upx;"></view>
			</view>
			<view class="data-list" style="padding-top:300upx;"  v-if="listData.length <= 0">
				<text style='color:#9E9E9E;font-size: 45upx;'>列表空空如也</text>
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
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    data() {
        return {
			tabBars:['可兑换','已失效','已兑换'],
			tabBarID:0,  //初始化标签数据库ID
			tabCurrentIndex:-1,
			listData : [],
			showDataStatus:false
        }
    },
    onLoad() {
        this.tabCurrentIndex = 0;
		this.getData();
    },
    methods: {
		toScoreUrl(){
			toUrlFunction.toUrl('/pages/promote/pictureMonth');
		},
		tabChange(e){
			this.tabCurrentIndex = e;		// 更新标签序号
			const status_text = this.tabBars[this.tabCurrentIndex];
			// this.getData(status_text);
			//修改状态码
			let statusStr = parseInt(this.tabCurrentIndex) + 1;
			this.showDataStatus = false;
			this.$api.getGiftExchange({filterItems:{mobile:this.userInfo.mobile, status:statusStr}}).then(res=>{
				this.listData = this.changeDataType(res.data.rows);
				this.showDataStatus = true;
			});
		},
		getData(){
			this.showDataStatus = false;
			this.$api.getGiftExchange({filterItems:{mobile:this.userInfo.mobile, status:'1'}}).then(res=>{
				this.listData = this.changeDataType(res.data.rows);
				this.showDataStatus = true;
				console.log(this.listData);
			});
		},
		//转换数据结构
		changeDataType(data){
			let arr = [];
			data.map((item,index)=>{
				let obj = {};
				obj = item.giftInfo;
				obj.exchange = {
					create_date:item.create_date,
					expire_date:item.expire_date,
					formatCreateDate:item.formatCreateDate,
					formatExpireDate:item.formatExpireDate,
					exchange_code:item.exchange_code,
					gift_combo_id:item.gift_combo_id,
					gift_id:item.gift_id,
					gift_rule:item.gift_rule,
					status:item.status,
					total_point:item.total_point
				};
				arr.push(obj);
			})
			return arr;
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
