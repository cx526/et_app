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

const XMoriginURL = 'https://api.ximalaya.com'

// 获取开发者收藏专辑 url
export const XMdeveloper_albumsURL = XMoriginURL + '/operation/developer_collected_albums?count=20'

// 获取开发者听单 url
export const XMdeveloper_columnsURL = XMoriginURL + '/operation/columns?count=20&scopes=developer'

// 获取开发者焦点图 url
export const XMdeveloper_bannersURL = XMoriginURL + '/operation/banners?scope=2'

// 获取开发者分类列表 url
export const XMdeveloper_categoriesURL = XMoriginURL + '/operation/categories'

// ------------------------------ //

// 获取专辑详情信息
 export const XMalbums_browseURL = XMoriginURL + '/albums/browse?count=20'



// 获取开发者听单
// let paramCol = {
// 	page: this.columnPage
// }
// const columnResult = await this.XMclient.get(XMdeveloper_columnsURL, paramCol)
// if(columnResult.code === 0) {
// 	console.log(columnResult)
// }