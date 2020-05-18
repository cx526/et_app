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
</style>
