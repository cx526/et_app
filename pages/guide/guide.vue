<template>
	<view class="content">
		<image class="image-content" src="../../static/guide/guide.png"></image>
		<button class="buttom-content">lalal</button>
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
	top: 25%;
	left: 20%;
	height: 100%;
	width: 100%;
}
</style>
