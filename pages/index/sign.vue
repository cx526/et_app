<template>
	<view class="content">
		<view class="model-view" v-if="show10 || show20">
			<view @tap="close" class="pic-content">
				<text class="sign-total">{{signedTotal}}</text>
				<image v-if="show10" style="width: 100%; height: 100%;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_success10.png"></image>
				<image v-if="show20" style="width: 100%; height: 100%;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_success20.png"></image>
			</view>
		</view>
		
		<view class="year">
			<text style="font-weight: bold;">{{calendarInfo.curYear + '年' + calendarInfo.curMonth + '月'}}</text>	
		</view>
		
		<view class="week">
			<view style="font-weight: bold;" class="day" v-for="(week, k) in weekly" :key="k">{{week}}</view>
		</view>
		<view class="calendar">
			<view class="day" v-for="(none, i) in calendarInfo.firstDay" :key="i"></view>
			<view 
				class="day" 
				v-for="(day, j) in daysArray" 
				:key="j"
				:style="day.isSign ? 'background: #FDCE0E;' : ''"	
			>
				{{day.label}}
			</view>
		</view>
		
		<view class="sign-button" @tap="postSign">
			<image class="sign-btn" :src="signed ? 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_button_disable.png' : 'https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_button_enable.png'"></image>
		</view>
		
	</view>
</template>

<script>
export default {
	onLoad() {
		this.getSign()
	},
	computed: {
		// isSign() {
		// 	return (day) => {
		// 		this.signedData.map(item => {
		// 			if (item.day === day) {
		// 				return true
		// 			} else {
		// 				return false
		// 			}
		// 		})
		// 	}
		// }
	},
	data() {
		return {
			weekly: ['一', '二', '三', '四', '五', '六', '日'],
			calendarInfo: {},
			signedData: [],
			daysArray: [],
			signed: false,
			signedTotal: null,
			show10: false,
			show20: false,
		}
	},
	methods: {
		getSign() {
			// curDate: "2020-05-21T07:55:04.326Z"
			// curMonth: 5
			// curYear: 2020
			// days: 31
			// firstDay: 5
			const userInfo = uni.getStorageSync('userInfo')
			let param = { userInfo }
			this.$api.getSign(param).then(res => {
				this.calendarInfo = res.data.calendar
				this.daysArray = res.data.daysArray
				if (userInfo.name !== 'guest') {
					this.signedData = res.data.signData.monthSign
					this.signed = res.data.signed
					this.signedTotal = res.data.signData.monthTotal
				}
			})
		},
		close() {
			this.show10 = false
			this.show20 = false
		},
		postSign() {
			if (this.signed) {
				uni.showToast({ icon: 'none', title: '今日已签到' })
				return 
			}
			this.signed = true
			const userInfo = uni.getStorageSync('userInfo')
			if (userInfo.name !== 'guest') {				
				let param = {
					userInfo
				}
				this.$api.postSign(param).then(res => {
					console.log(res.data)
					if (res.data.status === 'ok') {
						if (res.data.rule === '20') {
							this.show20 = true
						} else if (res.data.rule === '10') {
							this.show10 = true
						}
						this.getSign()
						//提示签到成功
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
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
	position: relative;
	width: 100%;
	height: 1700upx;
	background-image: url('https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/sign_bg-01.png');
	background-size: 100%;
	background-repeat: no-repeat;
	background-color: #EBF8FF;
}
.year {
	padding-top: 200upx;
	text-align: center;
	font-size: 28upx;
}
.week {
	display: flex;
	padding-left: 60upx;
	padding-top: 20upx;
}
.calendar {
	display: flex;
	padding-top: 20upx;
	flex-wrap: wrap;
	padding-left: 60upx;
}
.day {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 65upx;
	height: 65upx;
	margin-left: 24upx;
	margin-top: 6upx;
	font-size: 28upx;
	text-align: center;
	border-radius: 32upx;
}
.sign-btn {
	width: 240upx;
	height: 240upx;
}
.sign-button {
	margin-top: 24rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.model-view {
	position: absolute;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	height: 100%;
	width: 100%;
	z-index: 99;
	background: rgba(0, 0, 0, 0.4);
}
.pic-content {
	position: relative;
	padding-top: 100upx; 
	width: 60%; 
	height: 32%;
}
.sign-total {
	position: absolute;
	right: 36%;
	bottom: 16%;
	font-size: 28upx;
}
</style>
