
<script>
	const bookListData = require('@/common/carDataOption.js')
	export default {
		onLaunch: function() {
			// 计算书篮的总数量
			this.upDateStock()
			// 检测是否有新版本
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
			  // 请求完新版本信息的回调
			  console.log(res.hasUpdate);
			});
			updateManager.onUpdateReady(function (res) {
			  uni.showModal({
			    title: '更新提示',
			    content: '新版本已经准备好，是否重启应用？',
			    success(res) {
			      if (res.confirm) {
			        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
			        updateManager.applyUpdate();
			      }
			    }
			  });
			
			});
			
			updateManager.onUpdateFailed(function (res) {
			  // 新的版本下载失败
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			upDateStock() {
				// 获取线下书篮书籍
				let bookList = uni.getStorageSync('offlineCartList');
				console.log(bookList)
				// 如果线下书篮为空，默认不发请求
				if (bookList.length == 0) {
					return;
				}
				// 储存书篮所有书籍的id
				let goods_id = [];
				let idString = '';
				bookList &&
					bookList.map(item => {
						goods_id.push(item.id);
					});
				// 组合商品参数id去请求
				for (let i = 0; i < goods_id.length; i++) {
					idString = idString + "'" + goods_id[i] + "'" + ',';
				}
				idString = idString.substring(0, idString.lastIndexOf(','));
				this.$api
					.offlineOrderCheckStock({
						filterItems: {
							idString,
							docker_mac: this.docker_mac
						}
					})
					.then(res => {
						uni.hideLoading();
						if (res.data.rows.length == 0) {
							console.log('entry')
							this.isStock = false;
							// 如果选中但没库存更改选中状态
							bookList &&
								bookList.map(item => {
									item.stockCount.totalDockerUse = 0
									item.isSelect = false
								});
							// 更新缓存
							uni.setStorageSync('offlineCartList', bookList);
							this.price = 0
							// 若有选中计算价格
							this.coungPrice();
							return;
						} else {
							let onlineArr = []
							// 实时更新本地书籍的缓存
							res.data.rows.map((item, index) => {
								bookList && bookList.map((list, listIndex) => {
									if (item.id === list.id) {
										// 更新线下库存和后台是否做了书本隐藏/下架操作
										onlineArr.push(item)
										bookList[listIndex].stockCount.totalDockerUse = item.stockCount.totalDockerUse;
										bookList[listIndex].show_status = item.show_status
										// 选中书籍存在无库存情况
										if (!bookList[listIndex].stockCount.totalDockerUse && bookList[listIndex].isSelect){
											this.isStock = false;
										}
										// 如果选中但没库存更改选中状态
										if (bookList[listIndex].stockCount.totalDockerUse == 0 && bookList[listIndex].isSelect) {
											bookList[listIndex].isSelect = false;
										}
									}
								})
							})
							// 更新缓存
							// 去除隐藏书籍
							let arr = []
							if(onlineArr && onlineArr.length > 0) {
								onlineArr.map(item => {
									if(item.show_status === '0') {
										return
									}else {
										arr.push(item)
									}
								})
							}
							uni.setStorageSync('offlineCartList', arr);
							this.bookList = uni.getStorageSync('offlineCartList');
							// 更新tab书篮书籍数
							bookListData.countBookLength();
							console.log(this.bookList)
						}
					});
			},
		}
	}
</script>

<style>
/* 控制uni-app checkbox样式 */
checkbox .wx-checkbox-input {
	border-radius: 50% !important;
	/* color: #ffffff !important; */
}

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
	color: #fff;
	background: #09C2C9;
}
	
/*每个页面公共css */
.white-space {
	height: 30upx;
}
.white-space-width {
	width: 20upx;
}
.empty-style {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content:center;
	margin: 0 auto;
	color:rgb(106,106,106,.3);
	font-size: 60upx;
	padding-top: 60%;
}
.white-border{
	border-radius: 20upx;
	box-shadow: 0upx 0upx 20upx rgba(179,179,179,0.4);
	/* border: 1upx solid rgba(179,179,179,0.4); */
	padding: 30upx 0;
	background-color: #FFFFFF;
}
.button-style {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #00B7CC;
	border-radius: 40upx;
	padding: 20upx 100upx;
	color: #FFFFFF;
	font-size: 35upx;
	position: absolute;
	bottom: -30upx;
}
.button-style2 {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #00B7CC;
	border-radius: 40upx;
	padding: 20upx 100upx;
	color: #FFFFFF;
	font-size: 35upx;
}
</style>
