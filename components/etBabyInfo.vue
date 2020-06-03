<template>
	<view class="content">
		<view class="top-title-position">
			<text>我的宝贝</text>
			<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_baby.png" style="width: 60upx; height: 60upx;" ></image>
		</view>
		
		<view class="content-position" v-if="JSON.stringify(babyInfo.childInfo) !== '{}'">
			<view class="baby-content" v-if="babyInfo.childInfo.name">
				<text>宝宝姓名：{{babyInfo.childInfo.name ? babyInfo.childInfo.name : ''}}</text>
				<view class="baby-gender" style="background-color: #BCEDF5; margin-left: 10upx;" v-if="babyInfo.childInfo.gender === 1">
					<text>男孩</text>
				</view>
				<view class="baby-gender" style="background-color: #FFBDD8;  margin-left: 10upx;" v-else-if="babyInfo.childInfo.gender === 2">
					<text>女孩</text>
				</view>
			</view>
			
			<view class="baby-content" v-if="babyInfo.childInfo.name">
				<text>所在地：{{babyInfo.schoolInfo.showing_address ? babyInfo.schoolInfo.showing_address : ''}}</text>
			</view>
			
			<view class="baby-content" v-if="babyInfo.childInfo.name">
				<text>幼儿园：{{babyInfo.schoolInfo.name ? babyInfo.schoolInfo.name : ''}}</text>
			</view>
			
			<view class="baby-content" v-if="babyInfo.childInfo.name">
				<text>班级：{{babyInfo.gradeInfo.name ? babyInfo.gradeInfo.name : ''}} {{babyInfo.childInfo.class ? babyInfo.childInfo.class+'班' : ''}}</text>
			</view>
			
			<view class="baby-content" v-if="babyInfo.childInfo.name">
				<text>生日：{{babyInfo.childInfo.birth_day ? babyInfo.childInfo.birth_day : ''}}</text>
			</view>
			
			<view class="baby-content baby-buttom" v-if="babyInfo.childInfo.name">
				<text>岁数：{{babyInfo.childInfo.age ? babyInfo.childInfo.age+'岁' : ''}}</text>
				<image src="../static/cart/edit.png" style="width: 45upx;height: 45upx;" @tap='editBabyInfo'></image>
			</view>
		</view>
		<view class="" v-else>
			<view class='noData' @tap='editBabyInfo'>
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_add.png" style="width: 200upx;height: 200upx;"></image>
				<view class="white-space"></view>
				<text style="color: #CCCCCC;">请先添加数据</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		babyInfo: Object
	},
	created() {
		console.log(this.$props.babyInfo);
	},
	methods: {
		editBabyInfo() {
			let toUrl = '/pages/guide/register'
			if(this.$props.babyInfo.id){
				// console.log(this.$props.babyInfo);
				toUrl = toUrl + '?childInfo=' +  encodeURIComponent(JSON.stringify(this.$props.babyInfo))
			}
			uni.navigateTo({
				url:toUrl
			})
		}
	}
}
</script>

<style>
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-title-position{
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	padding: 20upx 0;
	border-bottom: 1upx solid #F3F3F3;
}
.content-position {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.baby-content {
	width: 100%;
	color: #848484;
	font-size: 30upx;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	margin-top: 20upx;
}
.baby-gender {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 50upx;
	height: 20upx;
	padding: 8upx 10upx;
	font-size: 20upx;
	border-radius: 30upx;
}
.baby-buttom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
</style>
