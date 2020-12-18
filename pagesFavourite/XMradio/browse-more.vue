<template>
	<view>
		<view class="like-album">
			<view class="album">
				<browse-list></browse-list>
			</view>
		</view>
	</view>
</template>

<script>
	import browseList from '../components/browse-list.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			browseList
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		padding: 24rpx 0;
	}
</style>
<style scoped>
	.like-album {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-bottom: 24rpx;
	}
	.like-album .album {
		box-sizing: border-box;
		background: #fff;
		padding: 0 30rpx;
		border-radius: 30rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16)
	}
</style>
