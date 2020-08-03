<template>
	<view>
		<view class="list">
			<view class="item">
				<view class="label">
					<text>充值金额</text>
				</view>
				<view class="ipt">
					<input type="text" value="" />
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>充值借书币</text>
				</view>
				<view class="ipt">
					<input type="text" value="100" disabled />
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>赠送积分</text>
				</view>
				<view class="ipt">
					<input type="text" value="100" disabled />
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="money">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.list {
		box-sizing: border-box;
		padding: 0 20rpx;
	}
	.list .item {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		border-bottom: 1px solid #EEEEEF;
		padding-bottom: 20rpx;
		margin-bottom: 20rpx;
	}
	.list .item .ipt {
		background: #EEEEEF;
		text-align: right;
		box-sizing: border-box;
		padding-right: 12rpx;
		width: 200rpx;
	}
</style>
