<template>
	<view class="content">
		<view class="year">
			<text>{{calendarInfo.curYear + '年' + calendarInfo.curMonth + '月'}}</text>	
		</view>
		
		<view class="calendar">
			<view class="day none" v-for="(none, i) in calendarInfo.firstDay" :key="i"></view>
			<view class="day normal-day" v-for="(day, j) in calendarInfo.days" :key="j">{{day+1}}</view>
		</view>
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
			calendarInfo: {}
		}
	},
	methods: {
		
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
.calendar {
	display: flex;
	padding-top: 40upx;
	flex-wrap: wrap;
	padding-left: 50upx;
}
.day {
	width: 65upx;
	height: 65upx;
	margin-left: 28upx;
	font-size: 28upx;
}
.none {
	/* 
	color: #fff;
	background: #ccc; 
	*/
}
.normal-day {
	text-align: center;
}
</style>
