<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.4);
	border: 1upx solid rgba(179,179,179,0.4);
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
</style>
