// 获取书篮缓存数据
function getBookListData() {
	let carListArr = [];
	try {
	    carListArr = uni.getStorageSync('carListInfo');
	    if (carListArr) {
	    }else{
			carListArr = [];
		}
	} catch (e) {
	    carListArr = [];
	}
	return carListArr;
}

// 插入购物车
function insertToCart(bookDetail) {
  // 获取书蓝列表
  let carListArr = getBookListData();
  let countStuats = 0;
  
  // if(carListArr.length >= 10){
	 //  uni.showToast({
	 //  	title: '加入图书不能超过10本',
	 //  	duration: 2000,
	 //  	icon: 'none'
	 //  });
	 //  return;
  // }
  
  // 处理数据
  let arrList = [];
  if (carListArr.length > 0){
	  carListArr.forEach(obj=>{
		  arrList.push(obj.id);
	  });
  }
 
  
  if(arrList.includes(bookDetail.id)){
	  uni.showToast({
	  	title: '相同图书请不要重复添加',
	  	duration: 2000,
	  	icon: 'none'
	  });
	  return;
  }
  
  if(countStuats === 0) {
	carListArr.push(bookDetail);  
  }
  
  // 数据插入
  uni.setStorageSync('carListInfo', carListArr);
  
  uni.showToast({
  	title: '加入书篮成功',
  	duration: 2000,
  	icon: 'none'
  });
}

// 删除购物车
function deleteToCart(bookID) {
	console.log(bookID);
	// 获取书蓝列表
	let carListArr = getBookListData();
	// 处理数据
	if (carListArr.length > 0){
		  carListArr.forEach((obj,index)=>{
			  if(parseInt(obj.id) === parseInt(bookID)) {
				carListArr.splice(index,1);
			  }
		  });
	}
	// 数据插入
	uni.setStorageSync('carListInfo', carListArr);
}
// 删除所有选中记录
function deleteSelect() {
	// 获取书蓝列表
	let carListArr = getBookListData();
	let carListArrFinal = [];
	// 处理数据
	if (carListArr.length > 0){
		  carListArr.forEach((obj,index)=>{
			  if(obj.select !== true) {
				carListArrFinal.push(obj);
			  }
		  });
	}
	// 数据插入
	uni.setStorageSync('carListInfo', carListArrFinal);
}

// 修改购物车中状态
function changSelectType(bookID) {	
	// 获取书蓝列表
	let carListArr = getBookListData();
	carListArr.forEach(item=>{
		 if(String(item.id) === String(bookID)){
			 console.log(item);
			if(item.select === true){
				item.select = false;
			}else if(item.select === false){
				item.select = true;
			}
		 }
	});
	uni.setStorageSync('carListInfo', carListArr);
}

// 计算积分
function countCoin() {
	let carListArr = getBookListData();
	let coinAll = 0;
	carListArr.forEach(item=>{
		if(item.select === true) {
			coinAll = coinAll + parseFloat(item.coin);
		}
	});
	return coinAll.toFixed(2);
}

// 计算购物车是否是全选状态
function countAllSelect() {
	let carListArr = getBookListData();
	let allSelect = true;
	carListArr.forEach(item=>{
		if(item.select === false) {
			allSelect  = false;
		}
	});
	return allSelect;
}

// 对所有数据选择操作
function allSelectOption(option) {
	let carListArr = getBookListData();
	carListArr.forEach(item=>{
		item.select = option;
	});
	uni.setStorageSync('carListInfo', carListArr);
}

//查看购物车书本数量
function cartBookCount(){
	let bookList = getBookListData();
	let bookCount = '0';
	if(bookList.length > 99){
		bookCount = "99+";
	}else{
		bookCount = String(bookList.length);
	}
	
	uni.setTabBarBadge({
	  index: 2,
	  text: bookCount
	})
	
	return bookCount;
}

module.exports = {
	getBookListData,
	insertToCart,
	deleteToCart,
	deleteSelect,
	changSelectType,
	countCoin,
	countAllSelect,
	allSelectOption,
	cartBookCount
};
