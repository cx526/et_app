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
  
  // 处理数据
  if (carListArr.length > 0){
	  carListArr.forEach(obj=>{
		  if(obj.bookID === bookDetail.bookID) {
			  obj.count = obj.count + 1;
			  obj.coin = parseFloat(obj.coin) + parseFloat(bookDetail.coin);
			  obj.coin = obj.coin.toFixed(2);
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

// 删除购物车
function deleteToCart(bookID) {
	console.log(bookID);
	// 获取书蓝列表
	let carListArr = getBookListData();
	// 处理数据
	if (carListArr.length > 0){
		  carListArr.forEach((obj,index)=>{
			  if(parseInt(obj.bookID) === parseInt(bookID)) {
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
	// 处理数据
	if (carListArr.length > 0){
		  carListArr.forEach((obj,index)=>{
			  if(obj.select === true) {
				carListArr.splice(index,1);
			  }
		  });
	}
	// 数据插入
	uni.setStorageSync('carListInfo', carListArr);
}

// 修改购物车中状态
function changSelectType(bookID) {	
	// 获取书蓝列表
	let carListArr = getBookListData();
	carListArr.forEach(item=>{
		 if(String(item.bookID) === String(bookID)){
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

// 计算借阅币
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

module.exports = {
	getBookListData,
	insertToCart,
	deleteToCart,
	deleteSelect,
	changSelectType,
	countCoin,
	countAllSelect,
	allSelectOption
};
