<template>
	<view class="page-class">
		<view class="content">
			<view class="text-content">
				<text>选择更适合宝宝的故事</text>
			</view>
			
			<view class="white-space"></view>
			
			<view class="input-class">
				<et-iconinput img="../static/register/nickName.png" remark="幼儿昵称"></et-iconinput>
			</view>
			
			<view class="white-space"></view>
			
			<view class="input-class">
				<et-iconinput img="../static/register/born.png" remark="出生年月"></et-iconinput>
			</view>
			
			<view class="white-space" style="padding-top: 30upx;"></view>
			
			<view class="img-class">
				<view class="sex-class">
					<image src="../../static/register/boy.png" mode=""></image>
					<text>男孩</text>
				</view>
				<view class="sex-class">
					<image src="../../static/register/gril.png" mode=""></image>
					<text>女孩</text>
				</view>
			</view>
			
			<view class="white-space" style="padding-bottom: 80upx;"></view>
		</view>
		
		<view class="buttom-father">
			<view class="button-content">
				<view class="button-content-img">
					<image class="button-content-img-bi" src="../../static/register/currency.png"></image>
				</view>
				<view class="button-content-son button-content-son-one" @tap="goClassInfo">
					<text>填写幼儿园信息</text>
				</view>
				<view class="white-space"></view>
				<view class="button-content-son button-content-son-two" @tap="goIndex">
					<text>体验一下</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import etIconinput from '../../components/etIconinput.vue'

export default {	
	components: {
		etIconinput
	},
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		buttomClick() {
			console.log('123');
		},
		goClassInfo() {
			uni.navigateTo({ url: './complateInfo' })
		},
		goIndex() {
			uni.reLaunch({ url: '../index/index' })
		}
	}
}
</script>

<style>
.page-class {
	display: flex;
	height: 100vh;
	flex: 1;
	flex-direction: column;
	align-items: center;
	background-color: rgb(235,248,255);
	position: relative;
	padding-top: 20upx;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 200upx;
	width: 90%;
	background-color: #FFFFFF;
	border-radius: 40upx;
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.3);
	position: relative;
}
.text-content {
	font-size: 30upx;
	color: rgba(185,185,185,0.8);
}
.input-class {
	width: 60%;
}
.img-class {
	width: 70%;
	display: flex;
	flex-direction: row;
	justify-content:space-between;;
	align-items: center;
}
.sex-class {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	color: rgba(179,179,179,0.8);
	font-size: 30upx;
}
.sex-class image {
	width: 200upx;
	height: 220upx;
}
.buttom-father {
	/* position: absolute;
	bottom: 220upx; */
	margin-top: -40upx;
	
}
.button-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}
.button-content-img-bi {
	width: 168upx;
	height: 59upx;
	position: absolute;
	top: -50upx;
	left: 80upx;
}
.button-content-son {
	width: 350upx;
	height: 70upx;
	font-size: 25upx;
	border-radius: 10upx;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 1upx 1upx 1upx 1upx rgba(179,179,179,0.3);	
}
.button-content-son-one {
	color: rgba(255,255,254,1);
	background-color: rgba(0,183,204,1);
}
.button-content-son-two {
	color: rgba(0,183,204,1);
	background-color: rgba(255,255,254,1);
}
</style>
