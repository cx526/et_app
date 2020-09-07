<template>
	<view class="content">
		
		<view class="top-position">
			<view class="top-content-position">
				<!-- 我的订单 -->
				<view class="top-content">
					<text style="font-weight: bold;">{{myMenuInfo.menuTitle}}</text>
				</view>
				<!-- 更多 -->
				<view class="8B8380" v-if="myMenuInfo.moreMenu">
					<text style="color: #2BAEC4; font-size: 25upx;" @tap="menuUrl(myMenuInfo.moreMenuUrl)">{{myMenuInfo.moreMenu}}</text>
				</view>
			</view>
		</view>
		<!-- 间隙 -->
		<!-- <view class="white-space"></view> -->
		
		<view class="menu-position">
			<et-button v-for="(item,index) in myMenuInfo.allMenu" :key='index' :title="item.title" :img="item.imgSrc" :count="item.count" :buttomContent="item.buttomContent" class="menu-botton" @btnClick="btnClick(item.toUrl)"></et-button>
		</view>
		
		<view class="white-space"></view>
	</view>
</template>

<script>
// 安卓在组件里面加载其他组件会有问题
import etButton from './etButton.vue'

const checkLogin = require('@/common/checkLogin');

export default {
	components: {
		etButton
	},
	props: {
		myMenuInfo:Object
	},
	data() {
		return {
			custom_type: ''
		}
	},
	created(){
		console.log(this.myMenuInfo);
		this.getUserInfo()
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	methods: {
		// 获取用户信息
		getUserInfo() {
			let mobile = uni.getStorageSync("userInfo").mobile
			this.$api.getCustom({
				filterItems: { mobile }
			}).then(res => {
				this.custom_type = res.data[0].custom_type
				console.log(this.custom_type)
			})
		},
		menuUrl(toUrl){
			let guestStatus = checkLogin.checkLogin();
			if(guestStatus){
				return;
			}
			uni.navigateTo({
				url:toUrl
			})
		},
		btnClick(toUrl) {
			if (this.userInfo.name === 'guest') {
				//游客 发出提示
				uni.showModal({
					title: '请先登录',
					confirmText: '登录',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}
					}
				})
			} else {
				if(toUrl === '敬请期待' || toUrl === '暂未开放' || toUrl === '请前往【我的五车书】公众号咨询客服'){
					uni.showToast({
						title:toUrl,
						duration:3000,
						icon:"none"
					})
					
					return;
				}
				if(toUrl === '/pages/library/tied-card') {
					// 如果是教师身份默认不给进修改信息页面
					if(this.custom_type == 0 && this.custom_type != '') {
						uni.showToast({
							title: "您的身份是老师，请前往老师端修改信息",
							icon: 'none',
							duration: 2000
						})
						return
					}
				}
				uni.navigateTo({url: toUrl});
				if (toUrl === '/pages/promote/promoteSummeryBook'){
					uni.switchTab({
						url:toUrl
					})
				}
			}
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	background-color: #FFFFFF;
	border-radius: 20upx;
	box-shadow: 0upx 0upx 20upx rgba(179,179,179,0.3);
	/* border: 1upx solid rgba(179,179,179,0.4); */
}
.top-position {
	/* border-bottom: 1upx dotted #8B8380; */
	padding: 20upx;
}
.top-content-position {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	/* padding-left: 30upx; */
	padding-left: 8rpx;
	padding-bottom: 20upx;
	border-bottom: 1upx dotted #CCCCCC;
}
.top-content {
	/* font-size: 28upx; */
	font-size: 30rpx;
}
.menu-position {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
}
.menu-botton {
	width: 25%;
}
</style>
