<template>
	
		<web-view :src="src"></web-view>
	
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(options) {
			this.src = JSON.parse(decodeURIComponent(options.src))
			console.log(this.src)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
