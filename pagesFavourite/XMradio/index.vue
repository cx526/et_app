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
				XMclient: null,
				XMplayer: null,
			}
		},
		components: {

		},
		onLoad() {
			this.init()
		},
		methods: {
			init() {
				// 初始化
				const { xmly, player } = XMPlugin.init({
					appKey: 'e604afd5371b12fdfb5428992c3d26a2', // 必传，官方提供的 appKey：b617866c20482d133d5de66fceb37da3 仅供测试，有调用次数限制，上线需替换为自己的 appKey。
					// 官方提供测试使用的 sigUrl => https://api.ximalaya.com/openapi-collector-app/jssdk_sig
					// （限制了 appKey 必须是测试账号，并且限制了调用次数，上线需替换为自己的 sigUrl）
					// 免登录授权，必须传 sigUrl，和 accessTokenUrl、getAccessToken 互斥
					// sigUrl: 'https://api.ximalaya.com/openapi-collector-app/jssdk_sig', 
					sigUrl: 'http://127.0.0.1:7001/api/xmly/signature',
					debug: true, // 是否在控制台打印日志
				})
				this.XMclient = xmly
				this.XMplayer = player
			}
		}
	}
</script>

<style>

</style>
