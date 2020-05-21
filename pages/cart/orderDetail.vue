<template>
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="member-position">
				<view class="member-content"> 
					<et-member title="会员获得更多权益"></et-member>
				</view>
			</view>
			
			<view class="white-border address-position">
				<et-address :address='defalutAddress'></et-address>
			</view>
		</view>
		
	</view>
</template>

<script>
import etMember from '../../components/etMember.vue'
import etAddress from '../../components/etAddress.vue'

export default {
	components: {
		etMember,
		etAddress
	},
	data() {
		return {
			money:"30",
			defalutAddress : {
				'name':'麦家杰',
				'phone':'13690394900',
				'address' : '广东省佛山市顺德区大良街道凤翔路创意产业园C栋301'
			}
		}
	},
	onLoad() {
		
	},
	methods: {
		
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	position: relative;
}
.top-position {
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-radius: 20upx;
	height: 230upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 99;
}
.member-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	background-color: #FFFBE6;
	padding: 10upx 0;
}
.address-position {
	width: 90%;
}

</style>
