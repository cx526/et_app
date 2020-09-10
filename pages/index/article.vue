<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			console.log(options.from)
			let param = {
				filterItems :
				{
				target_usage : options.from
				}
			}
			this.$api.skipBanner(param).then(res => {
				this.src = res.data.rows[0].remark
				console.log(this.src)
			})
		},
		data() {
			return {
				from: '',
				src: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
