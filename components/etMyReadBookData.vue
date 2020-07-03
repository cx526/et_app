<template>
	<view class="content">
		
		<view class="top-position">
			<view class="top-content-position">
				<view class="top-content">
					<text style="font-weight: bold;">{{myMenuInfo.menuTitle}}</text>
				</view>
				<view class="8B8380" v-if="myMenuInfo.moreMenu">
					<text style="color: #2BAEC4; font-size: 25upx;" @tap="menuUrl(myMenuInfo.moreMenuUrl)">{{myMenuInfo.moreMenu}}</text>
				</view>
			</view>
		</view>
		
		<view class="white-space"></view>
		
		<view class="menu-position">
			<view class="menu-content" v-for="(item,index) in myMenuInfo.allMenu">
				<view class="menu-left">
					<image src="../static/cart/blueRight.png" style="width: 40upx;" mode="widthFix"></image>
					<text style="margin-left: 10upx; font-weight: 600;">{{item.title}}</text>
				</view>
				<view class="menu-right">
					<text>{{item.count}}本</text>
				</view>
			</view>
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
	onLoad(){
		console.log(this.myMenuInfo);
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	methods: {
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
				
				uni.navigateTo({url: toUrl});
				if (toUrl === '/pages/promote/pictureMonth'){
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
	box-shadow: 0upx 0upx 20upx rgba(179,179,179,0.4);
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
	padding-left: 30upx;
	padding-bottom: 20upx;
	border-bottom: 1upx dotted #8B8380;
}
.top-content {
	font-size: 28upx;
}
.menu-position {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.menu-botton {
	width: 25%;
}
.menu-content{
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	
	font-size: 30upx;
	
	padding: 15upx 0;
	border-bottom: 2upx dotted #ECECEC;
}
.menu-left {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
</style>
