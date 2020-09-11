let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://47.112.145.215:7001'
		// url_config = 'https://52diyike.com/api'
}else{
    // 生产环境
    url_config = 'https://www.52diyike.com/api'
		// url_config = 'http://47.112.145.215:7001'
}

export default url_config