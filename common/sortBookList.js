function sortBookList(a,b) {
   return  (b.goods_info.stock.usageCount - a.goods_info.stock.usageCount)
}

module.exports = {
	sortBookList
};
