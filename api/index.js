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

// 获取客户信息
api.getCustom = params => request.globalRequest('/api/custom/getCustom', 'POST', params)

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
// 请求参数 usage 用途
api.getPayment = params => request.globalRequest('/api/wxPay/payment', 'POST', params)

// 支付成功后，添加订单数据
api.updatePayment = params => request.globalRequest('/api/wxPay/updatePayment', 'POST', params)

// 获取支付退款信息
api.getRefund = params => request.globalRequest('/api/refund/getRefund', 'POST', params)

// post支付退款信息
api.postRefund = params => request.globalRequest('/api/refund/postRefund', 'POST', params)

//获取轮播图
api.getSwiperData = params => request.globalRequest('/api/swiper/getSwiper', 'POST', params)

//获取所有分类
api.getKinds = params => request.globalRequest('/api/kinds/getKinds', 'POST', params)

//获取同级的三级分类
api.getKindsWithThreeKind = params => request.globalRequest('/api/kinds/getKindsWithThreeKind', 'POST', params)


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

// 新增收货地址
api.addAddress = params => request.globalRequest('/api/address/addAddress', 'POST', params)

// 获取收货地址
api.getAddress = params => request.globalRequest('/api/address/getAddress', 'POST', params)

// 删除收货地址
api.delAddress = params => request.globalRequest('/api/address/delAddress', 'POST', params)

// 修改收货地址
api.modAddress = params => request.globalRequest('/api/address/modAddress', 'POST', params)

// 修改默认收货地址
api.modAddressDefault = params => request.globalRequest('/api/address/modAddressDefault', 'POST', params)

// 获取订单信息接口
api.getOrder = params => request.globalRequest('/api/order/getOrder', 'POST', params)

// 获取用户所有订单状态 @param custom_id
api.getOrderCountWithCustomID = params => request.globalRequest('/api/order/getOrderCountWithCustomID', 'POST', params)

//检测订单是否存在
api.checkExistOrder = params => request.globalRequest('/api/order/checkExistOrder', 'POST', params)

//取消订单
api.cancelOrder = params => request.globalRequest('/api/order/cancelOrder', 'POST', params)

//确认收货
api.customConfirmOrder = params => request.globalRequest('/api/order/customConfirmOrder', 'POST', params)

//还书
api.customCloseOrder = params => request.globalRequest('/api/order/customCloseOrder', 'POST', params)

// promote 活动api
api.addPromote = params => request.globalRequest('/api/promote/addPromote', 'POST', params)

api.getPromote = params => request.globalRequest('/api/promote/getPromote', 'POST', params)

// 删除上传图片
api.delUploadPic = params => request.globalRequest('/api/upload/delUploadPic', 'POST', params)

// 获取所有商品库存状态 @param goodsIDs Array, goodsType String online
api.preOrderCheckStock = params => request.globalRequest('/api/order/preOrderCheckStock', 'POST', params)

// 礼品
api.getGiftList = params => request.globalRequest('/api/gift/getGiftList', 'POST', params)
api.getGift = params => request.globalRequest('/api/gift/getGift', 'POST', params)
api.addGiftExchange = params => request.globalRequest('/api/gift/addGiftExchange', 'POST', params)

export default api