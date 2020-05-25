// 获取缓存数据
function getListData(listName) {
	let listArr = [];
	try {
	    listArr = uni.getStorageSync(listName);
	    if (listArr) {
	    }else{
			listArr = [];
		}
	} catch (e) {
	    listArr = [];
	}
	return listArr;
}

// 插入列表
function insertData(listName,detailInfo) {
  // 状态为1插入，否则不插入
  let status = 1;
  // 获取列表
  let listArr = getListData(listName);
  listArr.forEach(obj=>{
	  if(obj === detailInfo){
		status = 0; 
	  }
  });
  if(status) {
	listArr.unshift(detailInfo);	
	// 数据插入
	uni.setStorageSync(listName, listArr);  
  }
 
}

//清空列表
function deleteALL(listName) {
	uni.setStorageSync(listName, []);
}

module.exports = {
	getListData,
	insertData,
	deleteALL
};
