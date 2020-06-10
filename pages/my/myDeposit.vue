<template>
	<view class="content">
		<view class="img-content-position">
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_deposit.png" style="width: 500upx;" mode="widthFix"></image>
			<view class="content-position">
				<view class="money-style">
					<text>¥ {{userInfoAll.deposit ? userInfoAll.deposit:0}}</text>
				</view>
				
				<text style="color:#7D4700; font-size: 25upx; margin-top: 10upx;">可退还押金</text>
			</view>
		</view>
		<view class="content-button" @tap="toRefund" v-if="refundInfo.canRefund && refundInfo.canRefund > 0">
			<view class="button-style">
				<text>{{refundInfo.status_text}}</text>
			</view>
		</view>
	</view>
</template>

<script>

export default {
    data() {
        return {
			userInfoAll:{},
			refundInfo: {},
        }
    },
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    onLoad() {
        this.getCustomerInfo();
    },
    methods: {
		toRefund() {
			if (this.refundInfo.status === 1) {
				let param = { custom_id: this.userInfoAll.id }
				this.$api.postRefund(param).then(res => {
					console.log(res)
				})
			} else {
				uni.showModal({ title: this.refundInfo.msg, confirmText: '确定' })
			}
		},
		getCustomerInfo(){
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.userInfoAll = res.data[0];
				if(!this.userInfoAll.deposit) {
					this.userInfoAll.deposit = 0;
				}
				
				let param = { custom_id: this.userInfoAll.id }
				this.$api.getRefund(param).then(res => {
					this.refundInfo = res.data
				})
			});
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #EBF8FF;
}
.img-content-position {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}
.content-position {
	position: absolute;
	bottom: 450upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.money-style {
	color:#FFFFFF;
	font-weight: bold;
	font-size: 60upx;
}
.button-style {
	position: relative;
	bottom: 0;
}
</style>
