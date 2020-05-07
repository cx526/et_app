import urlConfig from './config.js'

const request = {}
const headers = {}
    
request.globalRequest = (url, method, data) => {        
    // switch (power){
    //     case 1:
    //         headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
    //         break;
    //     case 2:
    //         headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
    //         break;
    //     case 3:
    //         responseType = 'blob'
    //         break;
    //     default:
    //         headers['Authorization'] = `Bearer ${
    //             this.$store.getters.userInfo
    //         }`
    //         headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
    //         break;
    // }
            
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
        if (res[1].statusCode == 200) {
            return res[1]
        } else {
			console.log(res[1].data)
            throw res[1].data
        }
    }).catch(parmas => {
　　　　switch (parmas.code) {
　　　　　　case 401:
　　　　　　　　uni.clearStorageSync()
　　　　　　　　break
　　　　　　default:
　　　　　　　　uni.showToast({
　　　　　　　　　　title: parmas.message,
　　　　　　　　　　icon: 'none'
　　　　　　　　})
　　　　　　　　return Promise.reject()
　　　　　　　　break
		}
　　})
 } 

export default request