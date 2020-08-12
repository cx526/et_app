<template>
	<view class="father-position">
		<view class="btn-content" @tap="btnClick">
			<view class="img-content">
				<view class="count-content" v-if='count'>
					<text>{{count}}</text>
				</view>
				<image :src="img" class="img"></image>
			</view>
			<text class="title">{{title}}</text>
			<text class="buttom-content">{{buttomContent}}</text>
		</view>
		
		<view class="customer-position" v-if="title === '客服'">
			<button  class="service" style="width: 130upx;line-height:5;background-color: rgba(255,255,255,0);color: rgba(255,255,255,0);border-color: rgba(255,255,255,0);" open-type="contact" :session-from="sessionFromData">客服</button>
		</view>
	</view>
	
</template>

<script>
export default {
	props: {
		title: String,
		img: String,
		count: String,
		buttomContent: String
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		},
		sessionFromData(){
			let data = {
				source:"五车书小程序",
				avatarUrl:this.userInfo.avatar,
				mobile:this.userInfo.mobile,
				sex: String(this.userInfo.gender),
				nickName:this.userInfo.name
			}
			let dataReturn = JSON.stringify(data)
			return  dataReturn
		}
	},
	created() {
		console.log(this.sessionFromData);
	},
	methods: {
		btnClick() {
			this.$emit('btnClick')
		}
	}
}
</script>

<style scoped>
.service::after {
	background-color: rgba(255,255,255,0);
	color: rgba(255,255,255,0);
	border-color: rgba(255,255,255,0) !important;
}
.father-position {
	position: relative;
}
.customer-position {
	position: absolute;
	top:0
}
.btn-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 12upx 12upx;

}
.img-content {
	position: relative;
}
.count-content {
	width: 30upx;
	height: 30upx;
	background-color: #DD524D;
	border-radius: 50%;
	padding: 8upx;
	color: #FFFFFF;
	font-size: 20upx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top:0;
	right: 10upx;
	z-index: 99;
}
.img {
	height: 100upx;
	width: 100upx;
}
.title {
	padding-top: 8upx;
	font-size: 26upx;
	color: rgba(128,128,128,1)
}
.buttom-content {
	font-size: 20upx;
	color: rgba(128,128,128,1)
}
</style>
