import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import request from '@/common/request.js'
import api from '@/api/index.js'
import url from '@/common/config.js'

Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.prototype.$aliImage = 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/'

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
