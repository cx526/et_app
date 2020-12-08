<template>
	<view class="loader">
		<view></view>
		<view></view>
		<view></view>
	</view>
</template>

<script>
	
</script>

<style scope>
.loader {
	display: flex;
	align-items: center;
	justify-content: flex-start;
}
.loader view {
	display: block;
	background: #2AAEC4;
	width: 12upx;
	border-radius: 14upx;
	margin-right: 20upx;
}
.loader view:nth-child(1) {
  animation: load 2.5s 1.4s infinite linear;
}
.loader view:nth-child(2) {
  animation: load 2.5s 1.2s infinite linear;
}
.loader view:nth-child(3) {
  animation: load 2.5s 1s infinite linear;
}
@keyframes load {
	0% {
		height: 80upx;
	}
	12% {
		height: 40upx;
	}
	24% {
		height: 10upx;
	}
	36% {
		height: 40upx;
	}
	48% {
		height: 80upx;
	}
	60% {
		height: 40upx;
	}
	72% {
		height: 10upx;
	}
	84% {
		height: 40upx;
	}
	100% {
		height: 80upx;
	}
}
</style>
