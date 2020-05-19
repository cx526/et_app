<template>
	<view class="content" @click="btnClick()">
		
		<view class="top-position">
			<view class="top-content-position">
				<view class="top-content">
					<text style="font-weight: bold;">{{myMenuInfo.menuTitle}}</text>
				</view>
				<view class="top-content">
					<text>{{myMenuInfo.moreMenu}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
// 安卓在组件里面加载其他组件会有问题
import etTag from './etTag.vue'

export default {
	components: {
		etTag
	},
	props: {
		myMenuInfo:Object
	},
	onLoad(){
		console.log(this.myMenuInfo);
	},
	methods: {
		btnClick() {
			this.$emit('click')
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
	border-bottom: 1upx dotted #008000;
	padding: 20upx;
}
.top-content-position {
	border-left: 10upx solid #008000;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 30upx;
}
.top-content {
	font-size: 28upx;
	color: #008000;
}
</style>
