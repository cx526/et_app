<template>
	<view class="box">
		<rich-text :nodes="agreementContext"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				agreementContext: '',//会员协议内容
			}
		},
		onLoad() {
			// 获取会员协议
			this.getAgreement()
		},
		methods: {
			// 获取会员协议
			getAgreement() {
				let params = {
					pageSize:"1",
					currentPage:"1",
					filterItems:{
					name:"memberRuleContent"
					}
				}
				this.$api.getMemberAgreement(params)
				.then(res => {
					this.agreementContext = res.data.rows[0].content
				})
			},
		}
	}
</script>
<style>
	page {
		background: #f9f9f9;
	}
</style>
<style scoped>
	.box {
		box-sizing: border-box;
		padding:  30rpx;
	}
</style>
