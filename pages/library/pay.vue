<template>
	<view>
		<view class="list">
			<view class="item">
				<view class="label">
					<text>充值金额</text>
				</view>
				<view class="ipt">
					<input type="text" :value="value" 
					:disabled="flag" />
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>充值借书币</text>
				</view>
				<view class="ipt">
					<input type="text" :value="value * 10" disabled />
				</view>
			</view>
			<view class="item">
				<view class="label">
					<text>赠送积分</text>
				</view>
				<view class="ipt">
					<input type="text" :value="value * 10" disabled />
				</view>
			</view>
		</view>
		<!-- 充值金额 -->
		<view class="money">
			<view class="item"
			v-for="(item, index) in moneyList.list"
			:key="index"
			:class="moneyList.currentIndex == index ? 'active' : ''"
			@tap="changeMoney(index)">
				<text>{{ item.text }}</text>
			</view>
		</view>
		<!-- 提示 -->
		<view class="notice">
			<view class="item">
				<text>温馨提示：</text>
			</view>
			<view class="item">
				<text>1、借书币为虚拟或币，充值之后就不能回退，请谨慎充值</text>
			</view>
			<view class="item">
				<text>2、借书币仅用于校园智能书柜借书使用；</text>
			</view>
		</view>
		<!-- 充值按钮 -->
		<view class="btn">
			<button type="default">充值</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: true,
				value: 10,
				moneyList: {
					currentIndex: 0,
					list: [
						{
							value: 10,
							text: 10,
						},
						{
							value: 20,
							text: 20,
						},
						{
							value: 30,
							text: 30,
						},
						{
							value: 50,
							text: 50,
						},
						{
							value: 100,
							text: 100,
						},
						{
							value: '',
							text: '其他',
						}
					]
					
				},
				
			}
		},
		methods: {
			// 改变充值金额
			changeMoney(index) {
				this.moneyList.currentIndex = index;
				if(index !== 5) {
					this.value = this.moneyList.list[index].value;
					this.flag = true
				}else {
					this.flag = false;
					this.value = ''
				}
			},
			
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
	.money {
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx;
	}
	.money .item {
		width: 30%;
		margin-right: 5%;
		box-sizing: border-box;
		border: 1px solid #EEEEEF;
		line-height: 160rpx;
		font-size: 30rpx;
		text-align: center;
		margin-bottom: 24rpx;
	}
	.money .item:nth-child(3n) {
		margin-right: 0;
	}
	.money .item.active {
		color: #fff;
		background: #00B7CC;
	}
	.notice {
		box-sizing: border-box;
		padding: 0 20rpx;
		font-size: 28rpx;
		color: #999;
	}
	.notice .item {
		line-height: 38rpx;
	}
	.btn {
		box-sizing: border-box;
		padding: 60rpx 25%;
		
	}
	.btn button {
		font-size: 32rpx;
	}
</style>
