<template>
	<view class="content" style="background:url('../../static/bookdetail/book.png')">
		<text>123</text>
	</view>
</template>

<script>
export default {
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		buttonClick() {
			uni.navigateTo({url: 'auth'})
		},
	}
}
</script>

<style>
.content {
	height: 100vh;
	/* background-color: #549EAB; */
	/* background-image: url(../../static/bookdetail/book.png); */	/* background-size: 750upx 1100upx; */
}
</style>
