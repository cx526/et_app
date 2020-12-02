<template>
	<view>
		<image :src="$aliImage + 'member-banner.png'" mode="widthFix" class="banner"></image>
		<view class="detail">
			<image :src="$aliImage + 'member-detail.png'" mode="widthFix"></image>
		</view>
		<view class="list">
			<memberType :memberType="memberType" @memberDetail="memberDetail" />
		</view>
		<view class="btn" @click="goMember">
			<image :src="$aliImage + 'member-btn.png'" mode="widthFix"></image>
		</view>
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
		components:{
			memberType
		},
		onLoad() {
			this.getMemberCard()
		},
		onShareAppMessage(res) {
			if(res.from === 'menu') {
				return {
					title: '会员计划',
					path: '/pages/index/swiper-member'
				}
			}
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
			// 跳转会员页
			goMember() {
				uni.navigateTo({
					url: '/pages/member/member-list'
				})
			}
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		background: #FFFBE6;
		padding-bottom: 115rpx;
	}
</style>
<style scoped>
	.banner {
		width: 100%;
		display: block;
	}
	.detail {
		box-sizing: border-box;
		padding: 0 50rpx;
	}
	.detail image {
		width: 100%;
		display: block;
	}
	.btn {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		margin-top: 70rpx;
	}
	.btn image {
		display: block;
		width: 300rpx;
	}
	.list {
		box-sizing: border-box;
		padding: 0 50rpx;
	}
	.list image {
		display: block;
	}
</style>
