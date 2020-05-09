import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'

const api = {}

// POST请求方式
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'POST//必须大写，为了兼容其他应用', params, 1)
// GET请求方式
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp${formatGetUri(params)}`, 'GET //必须大写，为了兼容其他应用',{}, 1)
//==============================================================================//

//获取轮播图
api.getAuthData = params => request.globalRequest('/api/auth/getAuthData', 'POST', params)

//获取轮播图
api.getSwiperData = params => request.globalRequest('/api/swiper/getSwiper', 'POST', params)

export default api