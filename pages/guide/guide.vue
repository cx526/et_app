<template>
	<view class="content">
		<image class="image-content" src="../../static/guide/guide.png"></image>
		<button class="buttom-content" @tap="buttonClick"></button>
	</view>
</template>

<script>

export default {
    data() {
        return {
			
        }
    },
    onLoad() {
        uni.getStorage({
        	key: 'guideShow',
        	success: (res) => {
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						uni.reLaunch({url: '../index/index'})
					},
					fail: (err) => {
						uni.reLaunch({url: '../guide/auth'})
					}
				})
				
        	},
        	fail: (err) => {
        		// uni.redirectTo({url: '../guide/guide'})
        		console.log(err)
        	}
        })
    },
    methods: {
		buttonClick() {
			uni.setStorageSync('guideShow', 'showed');
			uni.navigateTo({url: 'auth'})
		},
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	height: 100%;
	position: relative;
}
.image-content {
	height: 100vh;
	width: 100vw;
}
.buttom-content {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0);
}
</style>
