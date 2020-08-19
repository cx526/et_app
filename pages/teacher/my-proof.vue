<template>
	<view class="banner" :style="{height: windowHeight}">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-proof-01.png"
		:style="{height: windowHeight}"></image>
		<view class="code">
			<tki-qrcode
			cid="qrcode" 
			ref="qrcode" 
			val="ET0123456"
			:size="296" 
			onval="true" 
			:loadMake="true" 
			:usingComponents="true" 
			@result="qrR" 
			 />
		</view>
		<view class="context">
			<text>请将二维码放至童书柜扫码区域等待系统识别</text>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	export default {
		data() {
			return {
				windowHeight: 0,//设置背景图高度
				src: '',//二维码图片路径
			}
		},
		components: {
			tkiQrcode
		},
		onLoad() {
			this.windowHeight = uni.getSystemInfoSync().windowHeight + 'px';
			console.log(this.windowHeight)
			
		},
		methods: {
			// 生成二维码图片
			qrR(res) {
				console.log(res);
				this.src = res
			},
		}
	}
</script>

<style>
	.banner {
		box-sizing: border-box;
		position: relative;
	}
	.banner image {
		width: 100%;
	}
	.banner .code {
		position: absolute;
		box-sizing: border-box;
		width: 296rpx;
		height: 296rpx;

		left: 50%;
		top: 46.5%;
		transform: translate(-50%, -50%);
	}
	.banner .context {
		width: 400rpx;
		text-align: center;
		font-size: 32rpx;
		position: absolute;
		color: #fff;
		left: 50%;
		top: 64%;
		transform: translateX(-50%);
	}
</style>
