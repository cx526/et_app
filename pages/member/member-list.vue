<template>
	<view class="list">
		<memberType :memberType="memberType" @memberDetail="memberDetail" />
	</view>
</template>
<script>
	import memberType from '@/components/member-components/member-type.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				memberType: []
			}
		},
		components: {
			memberType
		},
		onLoad() {
			this.getMemberCard()
		},
		methods: {
			// 获取会员卡
			getMemberCard() {
				let params = {
					filterItems: {
						status: '1'
					}
				}
				this.$api.getMemberCard(params).then(res => {
					this.memberType = res.data.rows
				})
			},
			// 跳转对应会员卡
			memberDetail(index) {
				uni.navigateTo({
					url: '/pages/member/member?current='+index
				})
			},
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		background: #FFFBE6;
		padding-bottom: 40rpx;
	}
</style>
<style scoped>
	.list {
		box-sizing: border-box;
		padding: 0 50rpx;
	}
</style>