function checkLogin(type) {
   let userInfo = uni.getStorageSync('userInfo')
   if (userInfo.name === 'guest' || !userInfo) {
	   if (!type) {
			//游客 发出提示
			uni.showModal({
				title: '请先登录',
				confirmText: '登录',
				success: (res) => {
					if (res.confirm) {
						uni.removeStorageSync('userInfo')
						uni.reLaunch({url: '../guide/guide'})
					}
				}
			})
		}
   	return true;
   }
   return false;
}

module.exports = {
	checkLogin
};
