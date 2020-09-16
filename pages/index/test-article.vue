<template>
	<view style="width: 100%;">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&album_id=1510855389280567302&__biz=MzU1NjA5NzM2Ng==#wechat_redirect'
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
