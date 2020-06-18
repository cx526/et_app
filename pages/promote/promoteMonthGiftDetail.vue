<template>
	<view class="content">
		<view class="content-style">
			<view class="detail-position white-border">
				<et-gift-detail-title :showData="showData" type='giftDetail'></et-gift-detail-title>
			</view>
			
			<view class="detail-position white-border" style="padding: 30upx 10upx;">
				<view class="detail-content">
					<view class="detail-content-title">
						<text>兑换日期：</text>
						<text class="detail-content-text">{{showData.dateTime}}</text>
					</view>
					<view class="detail-content-title">
						<text>有效期至：</text>
						<text class="detail-content-text">{{showData.outDateTime}}</text>
					</view>
					<view class="detail-content-title">
						<text>所需积分：</text>
						<text class="detail-content-text">{{showData.point}}积分</text>
					</view>
					<view class="detail-content-title" v-if="showData.rule === 'A' || showData.rule === 'B'">
						<text>温馨提示：</text>
						<text class="detail-content-text">实物礼品凭兑换码，于所属幼儿园领取</text>
					</view>
					<view class="detail-content-title" v-if="showData.rule === 'C'" >
						<text>附加兑换：</text>
						<text class="detail-content-text">加{{showData.comboPoint}}积分，再获A类礼品一份</text>
						<switch :checked="showData.combo_switch" @change='switchChange' color='#2AAEC4' style="transform:scale(0.5);" />
					</view>
					<view class="detail-content-title" v-if="showData.combo_switch">
						<text>选择礼物：</text>
						<view class="uni-list-cell-db detail-content-text">
							<picker @change="comboGiftChange" :value="giftDataIndex" :range="giftData">
								<view class="picker-view-style">
									<view class="uni-input">{{giftData[giftDataIndex]}}</view>
								</view>
							</picker>
						</view>
					</view>
				</view>
				
				<view class="score-content-position">
					<view class="detail-content-title score-content-style" style="padding: 0 20upx;">
						<text>实付积分：</text>
						<text style='color:#44B8CB'>{{showData.finalPoint}}积分</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom-content-position">
			<view class="bottom-content-style">
				<text>合计:</text>
				<text style="color: #36B3C7;">{{showData.finalPoint}}</text>
				<text>积分</text>
			</view>
			
			<view class="bottom-button-position">
				<view class="button-style2" style="padding: 10upx 40upx; font-size: 25upx;" @tap='exchangeGift'>
					<text>确认兑换</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import etGiftDetailTitle from '../../components/etGiftDetailTitle.vue'

const toUrlFunction = require('@/common/toUrlFunction');
const formatDate = require('@/common/formatDate');

export default {
	components: {
		etGiftDetailTitle
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    data() {
        return {
			userInfoAll:{},
			showData :{},
			giftData:[],
			giftDataIndex:0
        }
    },
    onLoad(option) {
		this.getCustomerInfo();
        this.getData(option.id);
    },
    methods: {
		getCustomerInfo(){
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.userInfoAll = res.data[0];
			});
		},
		toScoreUrl(){
			toUrlFunction.toUrl('/pages/promote/pictureMonth');
		},
		getData(id){
			this.$api.getGift({filterItems : {id : id}}).then(res=>{
				this.showData = res.data.rows[0];
				this.showData.dateTime = formatDate.getDateDuration(new Date(),0);
				this.showData.outDateTime = formatDate.getDateDuration(new Date(),90);
				this.showData.finalPoint = this.showData.point ;
				//设置combo不选中，默认不选combo
				this.showData.combo_switch = false;
				//初始化comboID
				this.showData.finalComboID = '';
				
				//如果存在礼品组合的话加上礼品组合
				this.giftData = [];
				if(this.showData.comboInfo){
					//设置选中comboid
					this.showData.finalComboID = this.showData.comboInfo[0].id;
					//设置comboPoint
					this.showData.comboPoint = this.showData.comboInfo[0].combo_point;
					//设置combo项
					this.showData.comboInfo.map((item,index)=>{
						this.giftData.push(item.name);
					});
				}
			});
		},
		switchChange(){
			this.showData.combo_switch = !this.showData.combo_switch;
			if(this.showData.combo_switch === true){
				this.giftDataIndex = 0;
				this.showData.finalPoint  = parseInt(this.showData.point) + parseInt(this.showData.comboInfo[0].combo_point);
			}else{
				this.showData.finalPoint  = this.showData.point;
			}
			console.log(this.showData.finalPoint);
			//强制刷新视图
			this.$forceUpdate();
		},
		comboGiftChange(e){
			let indexStr = e.detail.value;
			this.giftDataIndex = indexStr;
			//设置选中comboid
			this.showData.finalComboID = this.showData.comboInfo[indexStr].id;
			//设置comboPoint
			this.showData.comboPoint = this.showData.comboInfo[indexStr].combo_point;
			//设置最终积分
			this.showData.finalPoint  = parseInt(this.showData.point) + parseInt(this.showData.comboInfo[indexStr].combo_point);
			
		},
		exchangeGift(){
			// console.log(this.userInfoAll);
			// console.log(this.showData);
			let param = {
				custom_id:this.userInfoAll.id,
				mobile:this.userInfoAll.mobile,
				gift_id:this.showData.id,
				gift_combo_id:this.showData.finalComboID,
				gift_rule:this.showData.rule,
				total_point:this.showData.finalPoint
			};
			this.$api.addGiftExchange(param).then(res=>{
				if(res.data.status === 'OK'){
					uni.redirectTo({
						url:'/pages/promote/promoteMonthGiftSuccess'
					})
				}else{
					uni.showToast({
						duration:3000,
						title:res.data.msg,
						icon:"none"
					})
				}
			})
			
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(235,248,255,1);
	background-repeat: no-repeat;
	background-size:100% 100%; 
	background-attachment:fixed;
}
.content-style{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.detail-position {
	margin-top: 30upx;
	width: 90%;
	padding: 20upx;
}
.detail-content{
	border-bottom: 1px solid #F0F0F0;
	padding: 0 20upx;
	padding-bottom: 10upx;
}
.detail-content-title {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	font-size: 25upx;
	font-weight: bold;
	margin-top: 30upx;
}
.detail-content-text{
	color: #7F7F7F;
	font-size: 23upx;
	margin-left: 50upx;
}
.score-content-style{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.bottom-content-position{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	font-size: 25upx;
	font-weight: bold;
	
	position: fixed;
	bottom: 0;
	padding: 20upx 0;
	
	background-color: #FFFFFF;
}
.bottom-content-style{
	color: #858585;
}
.picker-view-style{
	width: 450upx;
}
</style>
