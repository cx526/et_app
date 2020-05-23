function insertToCart(bookDetail) {
  // 获取书蓝列表
  let carListArr = [];
  let countStuats = 0;
  try {
      carListArr = uni.getStorageSync('carListInfo');
      if (carListArr) {
          console.log('取数据:'+carListArr);
      }else{
  		carListArr = [];
  	}
  } catch (e) {
      carListArr = [];
  }
  
  // 处理数据
  if (carListArr.length > 0){
	  carListArr.forEach(obj=>{
		  if(obj.bookID === bookDetail.bookID) {
			  obj.count = obj.count + 1;
			  countStuats = 1; 
		  }
	  });
  }
  
  if(countStuats === 0) {
	carListArr.push(bookDetail);  
  }
  
  // 数据插入
  uni.setStorageSync('carListInfo', carListArr);
}

module.exports = {
	insertToCart
};
