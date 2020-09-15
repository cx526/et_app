
<script>
	const car = require('@/common/carDataOption.js')
	export default {
		onLaunch: function() {
			// 计算书篮的总数量
			car.countBookLength()
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
