<script>
	export default {
		onLaunch: function() {
			
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
