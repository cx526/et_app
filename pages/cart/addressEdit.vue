<template>
	<view class="content">
		<view class="defalut-position">
			<view class="address-list-position">
				<text class="address-list-content">收货人</text>
				<input class="address-middle-content" :value="address.name" @change="inputChangeName" type="text" maxlength="8" placeholder="请填写收货人姓名" />
				<image src="../../static/cart/addpeople.png" style="width: 50upx;height: 50upx;"></image>
			</view>
			
			<view class="address-list-position">
				<text class="address-list-content">手机号码</text>
				<input class="address-middle-content" :value="address.mobile"  @change="inputChangeMobile" type="number" maxlength="11" placeholder="请填写收货人手机号码" />
				<view style="width: 50upx;height: 50upx;"></view>
			</view>
			
			<view class="address-list-position">
				<text class="address-list-content">所在地区</text>
				<!-- <input type="text" placeholder="省市县/乡镇等" /> -->
				<view class="address-middle-content">
					<et-region @regionChange="regionChange" :showing_address="address.showing_address"  title='省市县/乡镇等'></et-region>
				</view>
				<image src="../../static/cart/position.png" style="width: 40upx;height: 50upx;"></image>
			</view>
			
			<view class="address-list-position">
				<text class="address-list-content">详细地址</text>
				<input class="address-middle-content" :value="address.address"  @change="inputChangeAddress" type="text" maxlength="100" placeholder="街道/楼牌号等" />
				<view style="width: 50upx;height: 50upx;"></view>
			</view>
			
			<view class="address-list-position" style="border: 0;">
				<text class="address-list-content">设置为默认地址</text>
				<switch color="#00B7CC" style="transform:scale(0.6)" :checked="address.is_default === '1'" @change="switchChange" />
			</view>
			
			<view class="address-list-position" style="border: 0;">
				<text class="address-list-content" style="width: 100%; font-weight: 800; font-size: 20upx; color: #4F4F4F;">提醒：每次下单会默认推荐使用该地址</text>
			</view>
		</view>
		
		<view class="white-space" style="height: 100upx;"></view>
		
		<view class="botton-position">
			<view class="botton-content" @tap="submitInfo">
				<text>保存并使用</text>
			</view>
		</view>
	</view>
</template>

<script>
import etAddress from '../../components/etAddress.vue'
import etRegion from '../../components/etRegion.vue'

const handlePhone = require('@/common/handlePhone');

export default {
	components: {
		etAddress,
		etRegion
	},
    data() {
        return {
			optionType:'add',   // 操作类型mod修改， add新增
			toBackUrl:'',
			address: {
				'id':'',
				'custom_id':'',
				'name':'',
				'mobile':'',
				'province':'',
				'city':'',
				'area':'',
				'showing_address':'',
				'address' : '',
				'is_default' : '0',
				'zip_Code':''
			}
        }
    },
    onLoad(option) {
		// 编辑时候需要加载数据
		if(option.id) {
			this.optionType = 'mod';
			let addressArr = this.$api.getAddress({ filterItems: { id: option.id } }).then(res=>{
				this.address = res.data[0];
			});
		}
		
		// 如果是有调用的返回地址应该返回到需要的地址里面
		if(option.toBackUrl) {
			this.toBackUrl = option.toBackUrl
		}
    },
    methods: {
		//由于unni-app没有双向绑定，所以要弄一个功能去处理字段变更
		inputChangeName(e) {
			this.address.name = e.target.value;
		},
		inputChangeMobile(e) {
			this.address.mobile = e.target.value;
		},
		inputChangeAddress(e) {
			this.address.address = e.target.value;
		},
		switchChange() {
			if(this.address.is_default === '0'){
				this.address.is_default = '1';
			}else if(this.address.is_default === '1') {
				this.address.is_default = '0';
			}
		},
		submitInfo() {
			if(this.address.name==='' || this.address.mobile ==='' || this.address.address === '' || this.address.showing_address === '') {
				uni.showToast({
	　　　　　　　　　　title: '请先把资料填写完整',
	　　　　　　　　　　icon: 'none',
					  duration: 3000
	　　　　　　　});
				return;
			}
			
			if(this.optionType === 'add') {
				this.addData();
			}else if(this.optionType === 'mod'){
				this.modData();
			}
		},
		async addData(){
			// 获取customerID
			let userInfo = uni.getStorageSync('userInfo');
			const userInfoArr = await this.$api.getCustom({ filterItems: { mobile: userInfo.mobile } });
			this.address.custom_id = userInfoArr.data[0].id;
			// 获取customerID
			
			this.$api.addAddress(this.address).then(res=>{
				console.log(this.address);
				console.log(res);
				uni.showToast({
	　　　　　　　　　　title: res.data.msg,
	　　　　　　　　　　icon: 'success',
					  duration: 2000
	　　　　　　　});
				
				let url = 'addressList?custom_id='+this.address.custom_id;
				if(this.toBackUrl) {
					url = this.toBackUrl;
				}
				uni.navigateTo({
					url:url
				});
			});
		},
		modData() {
			this.$api.modAddress(this.address).then(res=>{
				uni.showToast({
	　　　　　　　　　　title: res.data.msg,
	　　　　　　　　　　icon: 'success',
					  duration: 2000
	　　　　　　　});
				this.modDefault();
				
				let url = 'addressList?custom_id='+this.address.custom_id;
				if(this.toBackUrl) {
					url = this.toBackUrl;
				}
				uni.navigateTo({
					url:url
				});
			});
			this.modDefault();
		},
		modDefault(){     // 更改默认地址
			if(this.address.is_default === '1'){
				this.$api.modAddressDefault( { custom_id: this.address.custom_id,id: this.address.id }).then(res=>{
					console.log(res);
				});
			}
		},
		regionChange(e){
			this.address.province = e.filterItems.province;
			this.address.city = e.filterItems.city;
			this.address.area = e.filterItems.area;
			this.address.showing_address = e.filterItems.showAddress;
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
.defalut-position {
	width: 95%;
	border-radius: 20upx;
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.4);
	border: 1upx solid rgba(179,179,179,0.4);
	padding: 40upx 0;
	background-color: #FFFFFF;
}
.address-list-position {
	width: 95%;
	border-bottom: 1upx solid rgba(179,179,179,0.6);
	padding: 20upx 0;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 30upx;
}
.address-list-content {
	width: 30%;
	font-weight: bold;
	font-size: 28upx;
}
.address-middle-content {
	width: 40%;
}
.botton-position {
	background-color: #00B7CC;
	font-size: 30upx;
	border-radius: 40upx;
	color: #FFFFFF;
	font-weight: 600;
	padding: 20upx 100upx;
}
</style>
