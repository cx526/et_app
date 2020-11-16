<template>
	<view>
		<view v-if="isShow">
			<!-- <view class="topic">
				<view class="left">
					<image :src="$aliImage + 'offline-icon-01.png'" mode="widthFix"></image>
					<text>阅读总量</text>
				</view>
				<view class="right">
					<text>300</text>
				</view>
			</view> -->
			<dataChart :rowList="rowList" :dataList="dataList" />
		</view>
		<view v-else class="none">
			<text>所在班级暂无老师绑定</text>
		</view>
	</view>
	
</template>

<script>
	import dataChart from '@/components/circle-components/data-chart.vue'
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				currentIndex: '',
				$aliImage: this.$aliImage,
				school_id: '',
				grade_id: '',
				class_id: '',
				rowList: [], // 横坐标
				dataList: [], // 纵坐标
				teacher_id: '', //所在班级教师id
				isShow: true
			}
		},
		components: {
			dataChart
		},
		onLoad(options) {
			let params = JSON.parse(options.params)
			this.currentIndex = String(params.index)
			this.school_id = params.school_id
			this.grade_id = params.grade_id
			this.class_id = params.class_id
			// 设置navTitle
			this.setNavTitle(this.currentIndex)
			if(this.currentIndex === '2') {
				// 获取所在班级教师id
				this.selTeacherStudent()
			}
		},
		methods: {
			// 设置navTitle
			setNavTitle(index) {
				switch(index) {
					case '0':
					this.getReadingStat('school')
					break
					case '1':
					this.getReadingStat('grade')
					break
					case '2':
					
					// uni.setNavigationBarTitle({
					// 	title: '本班阅读统计'
					// })
					break
					default:
					uni.setNavigationBarTitle({
						title: '阅读统计'
					})
				}
			},
			// 获取校园，年级阅读数据
			getReadingStat(type) {
				let params = {
					filterItems: {
						school_id: String(this.school_id)
					}
				}
				if(type === 'grade') {
					params.filterItems.grade_id = String(this.grade_id)
				}
				this.$api.getTeacherInfo(params).then(res => {
					let result = res.data.rows
						if(result && result.length > 0) {
							let rowList = [] //班级(横坐标)
							let orderBookCount = [] //借阅本书
							for(let i = 0; i < result.length; i++) {
								// 组合拼接班级
								if(result[i].gradeInfo.name && result[i].teacherInfo.class) {
									let gradeInfo = result[i].gradeInfo.name + result[i].teacherInfo.class + '班'
									rowList.push(gradeInfo)
									orderBookCount.push(result[i].offlineOrderCount.offlineOrderBookCount ? result[i].offlineOrderCount.offlineOrderBookCount : 0)
								}
							}
							this.rowList = rowList
							this.dataList = orderBookCount.sort((n1,n2) => {return n2 - n1})
							if(type === 'school') {
								uni.setNavigationBarTitle({
									title: '本园阅读统计'
								})
							}else {
								uni.setNavigationBarTitle({
									title: '年级阅读统计'
								})
							}				
						}
				})
			},
			// 获取所在班级教师的id
			selTeacherStudent() {
				let params = {
					filterItems: {
						custom_id: String(this.userInfo.id)
					}
				}
				this.$api.selTeacherStudent(params).then(res => {
					let result = res.data.rows
					if(!result || result.length === 0) {
						this.isShow = false
					}else {
						this.teacher_id = result[0].customInfo.teacherInfo.teacher_id
						// 获取班级学生阅读统计
						this.checkStudentRead()
					}
				})
			},
			// 获取班级学生阅读统计
			checkStudentRead() {
				let params = {
					"filterItems":{
						teacher_id: this.teacher_id,
						allTotal:"1",
					}
				}
				this.$api.checkStudentRead(params).then(res => {
					console.log(res)
					let result = res.data
					
					if(result && result.length > 0) {
						let rowList = []
						let dataList = []
						result.map(item => {
							rowList.push(item.child_name)
							dataList.push(item.reading_total)
						})
					
						this.rowList = rowList
						this.dataList = dataList.sort((n1,n2) => n2 - n1)
					}
				})
			}
			
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		padding: 25rpx;
	}
</style>
<style scoped>
	.topic {
		box-sizing: border-box;
		display: flex;
		height: 120rpx;
		justify-content: space-between;
		align-items: center;
		border-radius: 30rpx;
		background: #fff;
		padding: 0 40rpx;
		box-shadow: 0px 0px 6rpx 0px rgba(0,0,0,0.16); 
		margin-bottom: 36rpx;
	}
	.topic .left {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		color: #808080;
	}
	.topic .left image {
		width: 52rpx;
		height: 52rpx;
		margin-right: 12rpx;
	}
	.topic .right {
		font-size: 45rpx;
		color: #808080;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		text-align: center;
		font-size: 30rpx;
		color: #808080;
	}
</style>
