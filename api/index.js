import request from '@/common/request.js'
import { formatGetUri } from '@/common/util.js'

const api = {}

// POST请求方式
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp`, 'POST//必须大写，为了兼容其他应用', params, 1)
// GET请求方式
// api.register = params => request.globalRequest(`${PORT1}/mobile/signUp${formatGetUri(params)}`, 'GET //必须大写，为了兼容其他应用',{}, 1)
//==============================================================================//

//获取登录信息
api.getAuthData = params => request.globalRequest('/api/auth/getAuthData', 'POST', params)

// 新增幼儿信息
api.postChildInfo = params => request.globalRequest('/api/auth/postChildInfo', 'POST', params)

// 获取班级学校信息
api.getSchoolInfo = params => request.globalRequest('/api/school/getSchool', 'POST', params)

// 提交班级学校信息
api.postSchoolInfo = params => request.globalRequest('/api/auth/postSchoolInfo', 'POST', params)

// 发起微信支付请求
// 注意：仅限正式环境才能发起支付
// 请求参数 userInfo {}
// 请求参数 money 0.01
api.getPayment = params => request.globalRequest('/api/wxPay/payment', 'POST', params)

//获取轮播图
api.getSwiperData = params => request.globalRequest('/api/swiper/getSwiper', 'POST', params)

//获取所有分类
api.getKinds = params => request.globalRequest('/api/kinds/getKinds', 'POST', params)

//获取商品列表
api.getGoodsList = params => request.globalRequest('/api/goodslist/getGoodsListForApp', 'POST', params)

//获取商品详情
api.getGoodsInfo = params => request.globalRequest('/api/goods/getGoodsInfo', 'POST', params)

// 获取推荐书
api.getRecommend = params => request.globalRequest('/api/frontend/getRecommend', 'POST', params)

// 猜你喜欢
api.getGuess= params => request.globalRequest('/api/frontend/getGuess', 'POST', params)

// 获取签到信息
api.getSign = params => request.globalRequest('/api/frontend/sign', 'POST', params)

// 发送签到信息
api.postSign = params => request.globalRequest('/api/frontend/postSign', 'POST', params)

export default api