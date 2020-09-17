<template>
	<view>
		<view class="bg"> </view>
		<swiper :style="{'height': swiperHeight} ">
			<swiper-item>
				<view class="item" id="card">
					<view class="show">
						<image :src="$aliImage + 'member-icon-04.png'" 
						mode="widthFix"></image>
					</view>
					<view class="context">
						<view class="title">
							<view class="name"><text>畅读年卡</text></view>
							<view class="price">
								<view>
									<text style="font-size: 30rpx;margin-right: 6rpx;">									 ￥</text>
									<text>328</text>
								</view>
								<view><text>原价￥598</text></view>
							</view>
						</view>
						<!-- 富文本区域 -->
						<view class="rich-text">
							<view class="demo">
								<view class="demo-topic">
									<text>权益说明</text>
								</view>
								<rich-text :nodes="agreementContext"></rich-text>
								<!-- <view>1. 有效期1年</view> 
								<view>2. 享童书馆无限次数借阅 </view>
								<view>3. 享免押金借阅 </view>
								<view>4. 书籍破损、丢失赔付优惠 </view>
								<view>5. 双倍积分</view> -->
							</view>
							<view class="demo">
								<view class="demo-topic">
									<text>使用说明</text>
								</view>
								<view>
									1. 会员卡产品购买以现金支付，购买后不能取消、退款</view> 
								<view>2. 会员卡权益购买后自动生效，有效期满自动失效</view>
								<view>3. 会员卡仅限于绘本图书租赁，及平台指定商品</view>
								<view>
									4. 会员卡仅能在账户绑定学校童书馆使用，不能跨校使用</view>
							</view>
						</view>
						<view class="rule">
							<view class="agree">
								<radio style="transform: scale(0.6);" color="#2aaec4" 
								 @tap="agreement" :checked="isChecked" />
								<view>
									<text style="color: #808080;">我已阅读并同意</text>
									<text style="color: #2AAEC4;">会员权益协议</text>
								</view>
							</view>
						</view>
						<view class="btn">
							<view @tap="goBuy"><text>立即购买</text></view>
						</view>
					</view>
					
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				swiperHeight: '', //swiper高度
				agreementContext: '',//会员协议内容
				isChecked: false , //会员协议是否选中
			}
		},
		onLoad() {
			this.getAgreement()
		},
		onReady() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#card').boundingClientRect(data => {
				this.swiperHeight = data.height + 'px'
			}).exec();
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
			// 是否勾选协议
			agreement() {
				this.isChecked = !this.isChecked
			},
			// 立即购买
			goBuy() {
				if(!this.isChecked) {
					uni.showToast({
						title: '请先同意会员权益协议',
						icon: 'none',
						duration: 1500
					})
					return
				}else {
					// 跳转会员购买下单页面
					uni.navigateTo({
						url: '/pages/member/buy-member'
					})
				}
			},
		}
	}
</script>

<style>
	page {
		background: #f9f9f9;
		padding-bottom: 78rpx;
		box-sizing: border-box;
	}
</style>
<style scoped>
	.bg {
		background: #2B2E4D;
		height: 402rpx;
	}
	swiper {
		box-sizing: border-box;
		padding: 0 65rpx;
		margin-top: -274rpx;
	}
	swiper-item {
		box-sizing: border-box;
		position: relative;
	}
	swiper .item {
		box-sizing: border-box;
		position: relative;
	}
	
	swiper .show {
		box-sizing: border-box;
		padding: 0 12rpx;
		position: relative;
		z-index: 12;
	}
	swiper .show image {
		width: 100%;
		height: 318rpx;
	}
	swiper .context {
		box-sizing: border-box;
		padding: 0 35rpx;
		background: #fff;
		position: relative;
		width: 100%;
		z-index: 8;
		padding-top: 156rpx;
		margin-top: -156rpx;
		border-radius: 30rpx;
		box-shadow: 0px 3rpx 10rpx 0px rgba(0,0,0,0.16);
		padding-bottom: 112rpx;
	}
	swiper .context .title {
		box-sizing: border-box;
		height: 132rpx;
		border-bottom: 1px solid #e5e5e5;
		padding: 0 25rpx;
		display: flex;
		justify-content: space-between;
	}
	swiper .context .name {
		font-size: 30rpx;
		font-weight: 700;
		box-sizing: border-box;
		padding-top: 27rpx;
	}
	swiper .context .price {
		box-sizing: border-box;
		padding-top: 13rpx;
	}
	swiper .context .price view:nth-child(1) {
		color: #2aaec4;
		font-size: 45rpx;
		margin-bottom: 8rpx;
		font-weight: 700;
	}
	swiper .context .price view:nth-child(2) {
		font-size: 24rpx;
		color: #808080;
		text-decoration: line-through;
	}
	/* 富文本区域 */
	swiper .context .rich-text {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	swiper .context .rich-text .demo {
		box-sizing: border-box;
		padding-top: 32rpx;
		font-size: 20rpx;
		line-height: 40rpx;
	}
	swiper .context .rich-text .demo .demo-topic {
		font-weight: 700;
		font-size: 24rpx;
	}
	
	
	swiper .context .rule {
		box-sizing: border-box;
		padding: 56rpx 0;
	}
	swiper .context .rule .agree {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}
	swiper .context .btn {
		box-sizing: border-box;
		padding: 0 50rpx;
		
	}
	swiper .context .btn view {
		line-height: 90rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #fff;
		border-radius: 60rpx;
		text-align: center;
		background-image: linear-gradient(to right, #67DCE6, #38B2D1);
	}
</style>
