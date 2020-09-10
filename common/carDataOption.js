import api from '../api/index.js'
//插入剩余数量缓存
async function getBookListStockToData(docker_mac) {
	// 获取本地缓存书籍
	let carListArr = uni.getStorageSync('carListInfo') ? uni.getStorageSync('carListInfo') : [];
	let goodsIDs = [];
	let idString = ''
	carListArr.forEach(item=>{
		goodsIDs.push(item.id.toString())    //组合商品ID去获取库存
	});
	for(let i = 0; i < goodsIDs.length; i++) {
		idString = idString + "'" + goodsIDs[i] + "'" + ',' 
	}
	idString = idString.substring(0, idString.lastIndexOf(","));
	await api.preOrderCheckStock({ 
		filterItems: {idString, docker_mac},
		}).then(res=>{
			res.data.rows.map((item,index)=>{
			carListArr.map((sitem,sindex)=>{
				if(item.id === sitem.id){
					carListArr[sindex].stockCount.totalOnlineUse = item.stockCount.totalOnlineUse;
				}
			})
		})
	}) 
	// 数据插入
	uni.setStorageSync('carListInfo', carListArr);
}






// async function getBookListStockToData() {
// 	let carListArr = [];
// 	try {
// 	    carListArr = uni.getStorageSync('carListInfo');
// 	    if (carListArr) {
// 	    }else{
// 			carListArr = [];
// 		}
// 	} catch (e) {
// 	    carListArr = [];
// 	}
// 	let goodsIDs = [];
// 	carListArr.forEach(item=>{
// 		goodsIDs.push(item.id);    //组合商品ID去获取库存
// 	});
// 	await api.preOrderCheckStock({ goodsIDs : goodsIDs, goodsType : 'online'}).then(res=>{
// 		res.data.map((item,index)=>{
// 			carListArr.map((sitem,sindex)=>{
// 				if(item.goods_id === sitem.id){
// 					carListArr[sindex].usageCount = item.usageCount;
// 				}
// 			})
// 		})
// 	}) 
// 	// 数据插入
// 	uni.setStorageSync('carListInfo', carListArr);
// }

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
	}else if(bookList.length === 0){
		bookCount = "";
	}else{
		bookCount = String(bookList.length);
	}
	
	if(bookList.length === 0){
		uni.removeTabBarBadge({
			index:2
		});
	}else{
		uni.setTabBarBadge({
		  index: 2,
		  text: bookCount
		});
		
	}
	
	return bookCount;
}

// 计算书本量
function countBookDetail() {
	let carListArr = getBookListData();
	let allBookCount = carListArr.length;
	let selectBookCount = 0;
	let unSelectBookCount = 0;
	carListArr.forEach(item=>{
		if(item.select === true) {
			selectBookCount = selectBookCount + 1;
		}
		if(item.select === false){
			unSelectBookCount = unSelectBookCount + 1;
		}
	});
	let detail = {
		allBookCount : allBookCount,
		selectBookCount : selectBookCount,
		unSelectBookCount : unSelectBookCount
	};
	return detail;
}

module.exports = {
	getBookListStockToData,
	getBookListData,
	insertToCart,
	deleteToCart,
	deleteSelect,
	changSelectType,
	countCoin,
	countAllSelect,
	allSelectOption,
	cartBookCount,
	countBookDetail
};
