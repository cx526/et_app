<template>
	<view class="content">
		<view class="defalut-position">
			<et-address :address='defalutAddress'></et-address>
		</view>
		
		<view class="white-space"></view>
		
		<view class="defalut-position">
			<view class="address-list-position" v-for="(item,index) in addressListData">
				<et-address  :key='index' :address='item'></et-address>
			</view>
		</view>
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
			defalutAddress : {
				'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301',
				'defalut' : '1'
			},
			addressListData  : [
				{
					'name':'麦家杰',
					'phone':'13690394900',
					'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
				},
				{
					'name':'麦家杰',
					'phone':'13690394900',
					'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
				},
				{
					'name':'麦家杰',
					'phone':'13690394900',
					'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
				}
			]
        }
    },
    onLoad() {
		// 转换电话号码为加密号码
        this.defalutAddress.phone = handlePhone.phoneSecret(this.defalutAddress.phone);
		this.addressListData.forEach(obj=>{
			obj.phone = handlePhone.phoneSecret(obj.phone);
		});
    },
    methods: {
		buttomClick() {
			console.log('123');
		},
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
	padding: 10upx 0;
	margin: 0 auto;
}
</style>
