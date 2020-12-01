<template>
	<view>
		<text>XMradio</text>
	</view>
</template>

<script>
	const XMPlugin = requirePlugin('XiMaLaYaFM')
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				// 初始化
				XMPlugin.init({
					appKey: 'b617866c20482d133d5de66fceb37da3', // 必传，官方提供的 appKey：b617866c20482d133d5de66fceb37da3 仅供测试，有调用次数限制，上线需替换为自己的 appKey。
					// 官方提供测试使用的 sigUrl => https://api.ximalaya.com/openapi-collector-app/jssdk_sig
					// （限制了 appKey 必须是测试账号，并且限制了调用次数，上线需替换为自己的 sigUrl）
					sigUrl: 'https://api.ximalaya.com/openapi-collector-app/jssdk_sig', // 免登录授权，必须传 sigUrl，和 accessTokenUrl、getAccessToken 互斥
					debug: true, // 是否在控制台打印日志
				})
			}
		}
	}
</script>

<style>

</style>
