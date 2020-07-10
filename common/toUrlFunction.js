function toUrl(url) {
	   
   if(url === '/pages/index/index' || url === '/pages/promote/promoteSummeryBook' || url === '/pages/cart/cart' || url === '/pages/my/my'){
	   uni.switchTab({
			url:url
	   })
   }else {
	  uni.navigateTo({
			url:url
	  }) 
   }
}

module.exports = {
	toUrl
};
