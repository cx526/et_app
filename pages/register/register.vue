<template>
	<view class="content">
		
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
		buttomClick() {
			console.log('123');
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
