<template>
	<view style="position: relative;">
		<image class="banner" :src="$aliImage + 'member-list-banner-02.png'" mode="widthFix" />
		<view class="type">
			<memberType :memberType="memberType" @memberDetail="memberDetail" parent="another" />
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
		background: #ffda75;
		/* padding-bottom: 40rpx; */
	}
</style>
<style scoped>
	.banner {
		width: 100%;
		display: block;
	}
	.list {
		box-sizing: border-box;
		padding: 0 50rpx;
	}
	.type {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 8%;
		
	}
</style>