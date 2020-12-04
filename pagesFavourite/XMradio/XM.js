const XMPlugin = requirePlugin('XiMaLaYaFM')

export function initXMLY() {
	// 初始化
	return XMPlugin.init({
		appKey: 'e604afd5371b12fdfb5428992c3d26a2', // 必传，官方提供的 appKey：b617866c20482d133d5de66fceb37da3 仅供测试，有调用次数限制，上线需替换为自己的 appKey。
		// 官方提供测试使用的 sigUrl => https://api.ximalaya.com/openapi-collector-app/jssdk_sig
		// （限制了 appKey 必须是测试账号，并且限制了调用次数，上线需替换为自己的 sigUrl）
		// 免登录授权，必须传 sigUrl，和 accessTokenUrl、getAccessToken 互斥
		// sigUrl: 'https://api.ximalaya.com/openapi-collector-app/jssdk_sig', 
		// sigUrl: 'http://127.0.0.1:7001/api/xmly/signature',
		sigUrl: 'https://52diyike.com/api/api/xmly/signature2',
		debug: false, // 是否在控制台打印日志
	})
}

// 获取分类列表 url
export const XMcategoriesURL = 'https://api.ximalaya.com/categories/list'