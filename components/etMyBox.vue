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
			<et-button v-for="(item,index) in myMenuInfo.allMenu" :key='index' :title="item.title" :img="item.imgSrc" :count="item.count" :buttomContent="item.buttomContent" class="menu-botton" @btnClick="btnClick(item.toUrl)"></et-button>
		</view>
	</view>
</template>

<script>
// 安卓在组件里面加载其他组件会有问题
import etButton from './etButton.vue'

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
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.4);
	border: 1upx solid rgba(179,179,179,0.4);
}
.top-position {
	border-bottom: 1upx dotted #8B8380;
	padding: 20upx;
}
.top-content-position {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 30upx;
}
.top-content {
	font-size: 28upx;
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
