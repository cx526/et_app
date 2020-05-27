<template>
	<view class="content">
		<view class="top-position white-border">
			<view class="top-content">
				<text>头像</text>
				<image :src="userInfo.avatar" style="height: 100upx; width: 100upx; border-radius: 50%;"></image>
			</view>
			<view class="top-content">
				<text>昵称</text>
				<text style="color: #8E8E8E; font-weight: 400;">{{userInfo.name}}</text>
			</view>
			<view class="top-content" style="border: 0upx;">
				<text>性别</text>
				<text style="color: #8E8E8E; font-weight: 400;">{{userInfo.genderShow}}</text>
			</view>
		</view>
		
		<view class="baby-position white-border">
			<view class="baby-content">
				<et-baby-info :babyInfo="babyInfo"></et-baby-info>
			</view>
		</view>
	</view>
</template>

<script>
import etBabyInfo from '../../components/etBabyInfo.vue'
import regionData from '../../common/regionData.js'

export default {
	components: {
		etBabyInfo
	},
	onLoad() {
		// 获取用户信息
		this.getCustomerInfo();
	},
	data() {
		return {
			userInfo:{},
			babyInfo:{},
		}
	},
	methods: {
		genderChange() {
			if(this.userInfo.gender === 0){
				this.userInfo.genderShow = '未知';
			}else if(this.userInfo.gender === 1){
				this.userInfo.genderShow = '男';
			}else if(this.userInfo.gender === 2){
				this.userInfo.genderShow = '女';
			}
		},
		transformAddress(object){
			let address = Object.values(regionData['86'][object.province]) + Object.values(regionData[object.province][object.city]) + Object.values(regionData[object.city][object.area]);
			address = address.replace(/,/g,'');
			return address;
		},
		async getCustomerInfo(){
			this.userInfo = uni.getStorageSync('userInfo');
			this.genderChange();
			const userInfoArr = await this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				return res.data[0];
			});
			this.babyInfo = userInfoArr.childInfo;
			if(JSON.stringify(userInfoArr.schoolInfo) !== '{}'){
				this.babyInfo.showing_address =  this.transformAddress(userInfoArr.schoolInfo);
				this.babyInfo.school = userInfoArr.schoolInfo.name;				
				this.babyInfo.schoolInfo = userInfoArr.schoolInfo;
			}
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
}
.top-position {
	width: 95%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-content {
	width: 85%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20upx 0;
	border-bottom: 1UPX solid #F3F3F3;
	font-weight: bold;
}
.baby-position {
	width: 95%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 30upx;
}
.baby-content {
	width: 85%;
}
</style>
