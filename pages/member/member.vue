<template>
	<view>
		<view class="bg" v-if="memberCard && memberCard.length > 0"></view>
		<swiper 
		:style="{'height': swiperHeight}"
		v-if="memberCard && memberCard.length > 0"
		previous-margin = "60rpx"
		next-margin = "60rpx"
		>
			<swiper-item v-for="(item,index) in memberCard" :key="index" 
			:style="{'height': swiperHeight}">
				<view class="item card" :style="{'height': swiperHeight}">
					<view class="show">
						<image :src="item.img_url" 
						v-if="item.img_url && item.img_url != ''"
						mode="widthFix"></image>
						<image :src="$aliImage + 'member-icon-04.png'" v-else
						mode="widthFix"></image>
						<text style="font-size: 24rpx; position: absolute; right: 56rpx; bottom: 50rpx; color: #fff;">五车书校园智慧童书馆</text>
					</view>
					<view class="context" style="height: 1100rpx;">
						<view class="title">
							<view class="name"><text>{{ item.name }}</text></view>
							<view class="price">
								<view>
									<text style="font-size: 30rpx;margin-right: 6rpx;">									 			{{ item.price_name ? item.price_name : '' }}￥
									</text>
									<text>{{ item.price }}</text>
								</view>
								<view style="text-align: right;">
									<text>原价￥{{ item.original_price }}</text>
								</view>
							</view>
						</view>
						<!-- 富文本区域 -->
						<view class="rich-text">
							<view class="demo" >
								<view class="demo-topic">
									<text>权益说明</text>
								</view>
								<view style="max-height: 200rpx; overflow-y: scroll;">
									<rich-text :nodes="item.remark_power" style="overflow: hidden;"></rich-text>
								</view>
							<!-- 	<view>1. 有效期1年</view> 
								<view>2. 享童书馆无限次数借阅 </view>
								<view>3. 享免押金借阅 </view>
								<view>4. 书籍破损、丢失赔付优惠 </view>
								<view>5. 双倍积分</view> -->
							</view>
							<view class="demo">
								<view class="demo-topic">
									<text>使用说明</text>
								</view>
								<view style="max-height: 200rpx; overflow-y: scroll;">
									<rich-text :nodes="item.remark_use" style="overflow: hidden;"></rich-text>
								</view>
							<!-- 	<view>
									1. 会员卡产品购买以现金支付，购买后不能取消、退款
								</view> 
								<view>2. 会员卡权益购买后自动生效，有效期满自动失效</view>
								<view>3. 会员卡仅限于绘本图书租赁，及平台指定商品</view>
								<view>
									4. 会员卡仅能在账户绑定学校童书馆使用，不能跨校使用
								</view> -->
							</view>
						</view>
						<view style="position: absolute;bottom: 60rpx;left: 26rpx;width: 100%;box-sizing: border-box;">
							<view class="rule">
								<view class="agree">
									<radio style="transform: scale(0.6);" color="#2aaec4" 
									 @tap="agreement(item, index)" :checked="item.isChecked" />
									<view>
										<text style="color: #808080;">我已阅读并同意</text>
										<text style="color: #2AAEC4;" @tap="checkMember">
											会员权益协议</text>
									</view>
								</view>
							</view>
							<view class="btn">
								<view @tap="goBuy(item)" style="width: 416rpx;"><text>立即购买</text></view>
							</view>
						</view>
						
						
					</view>
					
				</view>
			</swiper-item>
		</swiper>
		<view v-else class="none">
			<text>暂无会员卡信息</text>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				swiperHeight: '1278rpx', //swiper高度
				isChecked: false , //会员协议是否选中
				popUpWidth: 0 , //会员协议弹窗高度
				memberCard: [], //储存会员卡数据
				userInfo: uni.getStorageSync("userInfo"),//个人信息
				member_status: '',//表示用户是否开通过会员
				formatMemberDueDate: '',//会员到期日
				expireTime: '', //会员到期时间
			}
		},
		
		onLoad() {
			// 获取会员卡列表
			this.getMemberCard()
			// 获取用户个人信息
			this.getUserInfo()
			// 设置会员协议弹窗宽度
			uni.getSystemInfo({
				success: data => {
					this.popUpWidth = data.windowWidth * 0.8 + 'px'
					// this.swiperHeight = data.windowHeight - 60 + 'px'
					// console.log(this.swiperHeight)
				}
			})
		},
		onReady() {

		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				let mobile = this.userInfo.mobile
				if(mobile && mobile != '') {
					this.$api.offlineUserDockerInfo({ mobile })
					.then(res => {
						let result = res.data
						this.member_status = result.member_status //是否开通会员
						
						//会员到期时间
						this.expireTime = result.formatMemberDueDate ? result.formatMemberDueDate.replace(/-/g, '/') : ''
						if(result.formatMemberDueDate && result.formatMemberDueDate.replace(/\s*/g, '') != '') {
							let date = result.formatMemberDueDate.split(' ')[0]
							let time = date.split('-')
							this.formatMemberDueDate =time[0]+'年'+time[1]+'月'+time[2]+'日'
						}
					})
				}else {
					uni.showToast({
						title: '请前往授权登录',
						icon: 'none',
						duration: 1500,
						success: () => {
							uni.redirectTo({
								url: '/pages/guide/auth'
							})
						}
					})
				}
			},
			
			// 获取会员卡
			getMemberCard() {
				let params = {
					filterItems: {
						status: '1'
					}
				}
				
				this.$api.getMemberCard(params)
				.then(res => {
					this.memberCard = res.data.rows;
					if(this.memberCard && this.memberCard.length > 0) {
						// 动态添加属性
						this.memberCard.map(item => {
							this.$set(item,'isChecked',false)
						})
						
					}
				})
			},
			// 是否勾选协议
			agreement(item, index) {
				// 排他
				if(this.memberCard && this.memberCard.length > 0) {
					this.memberCard.map((item, n) => {
						if(n == index) {
							return
						}
						item.isChecked = false
					})
				}
				item.isChecked = !item.isChecked
			},
			// 立即购买
			goBuy(item) {
				if(!item.isChecked) {
					uni.showToast({
						title: '请先同意会员权益协议',
						icon: 'none',
						duration: 1500
					})
				}else {
					// 判断当前用户是否有开通过会有，有的话提示会员到期日弹窗
					if(this.member_status == "1") {
						uni.showModal({
							title: '您已开通过会员！',
							content: '会员到期日为'+this.formatMemberDueDate+',是否再次续费?',
							success: res => {
								if(res.confirm) {
									let param = {
										name: item.name,
										price: item.price,
										id: item.id,
										day: item.day,
										expireTime: this.expireTime ? this.expireTime : ''
									}
									// 跳转会员购买下单页面
									uni.navigateTo({
										url: '/pages/member/buy-member?param='+ JSON.stringify(param)
									})
								}else {
									uni.showToast({
										title: '取消购买',
										icon: 'none',
										duration: 1500
									})
								}
							}
						})
						return
					}
					// 不是会员不显示提示
					let param = {
						name: item.name,
						price: item.price,
						id: item.id,
						day: item.day,
						expireTime: this.expireTime ? this.expireTime : ''
					}
					// 跳转会员购买下单页面
					uni.navigateTo({
						url: '/pages/member/buy-member?param='+ JSON.stringify(param)
					})
				}
			},
			// 查看会员协议
			checkMember() {
				uni.navigateTo({
					url: '/pages/member/member-agreement'
				})
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
		position: absolute;
		left: 0;
		top: 66rpx;
		width: 100%;
	}
	swiper-item {
		box-sizing: border-box;
		padding: 0 16rpx;
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
		position: absolute;
		padding-top: 156rpx;
		left: 0;
		top: 156rpx;
		/* padding-top: 156rpx;
		margin-top: -156rpx; */
		border-radius: 30rpx;
		box-shadow: 0px 3rpx 10rpx 0px rgba(0,0,0,0.16);
		padding-bottom: 40rpx;
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
		padding: 30rpx 0;
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
