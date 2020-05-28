<template>
	<view class="content">
		<view class="left-position" v-if="address.is_default === '1'">
			<image src="../static/cart/blueRight.png" style="width: 40upx;height: 40upx;"></image>
		</view>
		
		<view class="middle-position">
			<view class="middle-top-position">
				<text>{{address.name}}</text>
				<view class="phone-content">
					<text class="phone-style">{{address.mobile}}</text>
					<view class="default-content" v-if="address.is_default === '1'">
						<text>默认</text>
					</view>
				</view>
			</view>
			
			<view class="white-space"></view>
			
			<view class="middle-address-position">
				<text>{{address.showing_address}}{{address.address}}</text>
			</view>
		</view>
		
		<view class="right-position"> 
			<view v-if="address.optionType === 'orderDetail'">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/address_change.png" style="width: 45upx;height: 45upx;" @tap='changeAddressInfo()'></image>
			</view>
			<view v-else>
				<image src="../static/cart/edit.png" style="width: 45upx;height: 45upx;" @tap='modAddressInfo(address.id)'></image>
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_rubbish.png" style="width: 45upx;height: 45upx;" @tap='delAddressInfo(address.id)'></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		address: Object
	},
	methods: {
		btnClick() {
			this.$emit('clickHandle')
		},
		modAddressInfo(id){
			uni.navigateTo({
				url:'addressEdit?id='+id
			});
		},
		delAddressInfo(id){
			this.$api.delAddress({ id: id }).then(res=>{
				uni.showToast({
	　　　　　　　　　　title: '删除成功',
	　　　　　　　　　　icon: 'none',
					  duration: 2000
	　　　　　　　});
				uni.navigateTo({
					url:'addressList'
				});
			});
			this.$emit('delAddressInfo');
		},
		changeAddressInfo(){
			this.$emit('changeAddressInfo');
		}
	}
}
</script>

<style>
.content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	padding: 10upx;
}
.middle-position {
	font-size: 28upx;
	display: flex;
	flex-direction: column;
	width: 75%;
}
.middle-top-position {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	font-weight: bold;
}
.phone-content {
	width: 60%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.default-content {
	font-size: 20upx;
	font-weight: 400;
	padding: 1upx 12upx;
	background-color: #BCEDF5;
	border-radius: 100upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
