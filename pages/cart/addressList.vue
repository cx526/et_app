<template>
	<view class="content" v-if="defalutAddress.name || addressListData.length > 0">
		<view class="defalut-position" v-if="defalutAddress.name">
			<et-address :address='defalutAddress' @delAddressInfo="delAddressInfo"></et-address>
		</view>
		
		<view class="white-space"></view>
		
		<view class="defalut-position" v-if="addressListData.length > 0">
			<view class="address-list-position" v-for="(item,index) in addressListData">
				<et-address  :key='index' :address='item' @delAddressInfo="delAddressInfo"></et-address>
			</view>
		</view>	
			
		<view class="">
			<view class="botton-content" @tap="addAddress">
				<text> + 新建收货地址</text>
			</view>
		</view>
	</view>
	<view class='noData' v-else>
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_add.png" style="width: 200upx;height: 200upx;" @tap="addAddress"></image>
		<view class="white-space"></view>
		<text style="color: #CCCCCC;">请先添加数据</text>
	</view>
</template>

<script>
import etAddress from '../../components/etAddress.vue'

const handlePhone = require('@/common/handlePhone');

export default {
	components: {
		etAddress
	},
    data() {
        return {
			custom_id:'',
			defalutAddress : {},
			addressListData  : []
        }
    },
    onLoad(option) {
		this.setAddresData();		
    },
	onShow() {
		this.setAddresData();		
	},
    methods: {
		delAddressInfo() {
			
		},
		addAddress() {
			uni.navigateTo({
				url:'addressEdit'
			});
		},
		async setAddresData() {
			// 获取customerID
			const userInfo = uni.getStorageSync('userInfo');
			const userInfoArr = await this.$api.getCustom({ filterItems: { mobile: userInfo.mobile } });
			const customID = userInfoArr.data[0].id;
		
			
			// const customID = 20;
			
			//设置defual
			let addressArr = await this.$api.getAddress({ filterItems: { custom_id: customID } }).then(res=>{
				console.log(res);
				return res.data;
			});
			
			if(addressArr.length <= 0) {
				return;
			}
			
			// 查看数据是否有默认参数，如果没有的话先设置一下
			let arrStatus = 0;
			addressArr.forEach(obj=>{
				console.log(obj.is_default);
				if(obj.is_default == 1) {
					arrStatus = 1; 
				}
			});
			
			if(arrStatus === 0) {
				addressArr[0].is_default=1;
				this.$api.modAddressDefault(addressArr[0]).then(res=>{
					console.log(res.data);
				});
			}
			//设置defual
			
			//设置输出数据
			addressArr = await this.$api.getAddress({ filterItems: { custom_id: customID } }).then(res=>{
				return res.data;
			});
			
			this.addressListData = [];
			addressArr.forEach(item=>{
				if(item.is_default == 1) {
					this.defalutAddress = item;
				}else{
					this.addressListData.push(item);
				}
			});
			//设置输出数据
			
			// 保密电话号码
			this.defalutAddress.mobile = handlePhone.phoneSecret(this.defalutAddress.mobile);
			this.addressListData.forEach(obj=>{
				obj.mobile = handlePhone.phoneSecret(obj.mobile);
			});
						
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
}
.noData {
	height: 500upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.defalut-position {
	width: 95%;
	border-radius: 20upx;
	box-shadow: 0upx 0upx 20upx rgba(179,179,179,0.3);
	/* border: 1upx solid rgba(179,179,179,0.4); */
	padding: 40upx 0;
	background-color: #FFFFFF;
}
.address-list-position {
	width: 95%;
	border-bottom: 1upx solid rgba(179,179,179,0.6);
	padding: 10upx 0;
	margin: 0 auto;
}
.botton-content {
	background-color: #00B7CC;
	padding: 20upx 60upx;
	border-radius: 30upx;
	color: #FFFFFF;
	font-weight: bold;
	font-size: 30upx;
	margin-top: 50upx;
}
</style>
