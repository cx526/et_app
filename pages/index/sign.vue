<template>
	<view class="content">
		<view class="year">
			<text style="font-weight: bold;">{{calendarInfo.curYear + '年' + calendarInfo.curMonth + '月'}}</text>	
		</view>
		
		<view class="week">
			<view style="font-weight: bold;" class="day" v-for="(week, k) in weekly" :key="k">{{week}}</view>
		</view>
		<view class="calendar">
			<view class="day" v-for="(none, i) in calendarInfo.firstDay" :key="i"></view>
			<view class="day" v-for="(day, j) in calendarInfo.days" :key="j">{{day+1}}</view>
		</view>
		
		<view class="sign-button" @tap="postSign">
			<image class="sign-btn" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_button_enable.png"></image>
		</view>
		<!-- 
		<image class="sign-btn" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_button_disable.png"></image> 
		-->
	</view>
</template>

<script>
export default {
	onLoad() {
		// curDate: "2020-05-21T07:55:04.326Z"
		// curMonth: 5
		// curYear: 2020
		// days: 31
		// firstDay: 5
		this.$api.getSign().then(res => {
			this.calendarInfo = res.data
		})
	},
	data() {
		return {
			weekly: ['一', '二', '三', '四', '五', '六', '日'],
			calendarInfo: {}
		}
	},
	methods: {
		postSign() {
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo.name !== 'guest') {				
				let param = {
					userInfo
				}
				this.$api.postSign(param).then(res => {
					console.log(res.data)
				})
			} else {
				uni.reLaunch({ url: '../guide/auth' })
			}
		}
	},
}
</script>

<style scoped>
.content {
	width: 100%;
	height: 2100upx;
	background-image: url('https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_bg.png');
	background-size: 100%;
	background-repeat: no-repeat;
}
.year {
	padding-top: 150upx;
	text-align: center;
	font-size: 28upx;
}
.week {
	display: flex;
	padding-left: 50upx;
	padding-top: 20upx;
}
.calendar {
	display: flex;
	padding-top: 20upx;
	flex-wrap: wrap;
	padding-left: 50upx;
}
.day {
	width: 65upx;
	height: 65upx;
	margin-left: 28upx;
	font-size: 28upx;
	text-align: center;
}
.sign-btn {
	width: 240upx;
	height: 240upx;
}
.sign-button {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
