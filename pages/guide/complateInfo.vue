<template>
	<view class="content">
		<view class="content-position" style="background-image: url(../../static/guide/paper.png);">
			<!-- 姓名 -->
			<!-- 
			<view class="in-position">
				<text class="title-content">姓名</text>
				<input class="input-size input-style" type="text" value="" />
				
			</view>
			
			<view class="in-position">
				<text class="title-content">性别</text>
				<view class="input-size">
					<picker @change="bindSexChange" :value="sexIndex" :range="sex">
						<view class="input-style">{{sex[sexIndex]}}</view>
					</picker>
				</view>
				
			</view>
			
			<view class="in-position">
				<text class="title-content">出生时间</text>
				<view class="input-size">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="input-style">{{date}}</view>
					</picker>
				</view>
				
			</view> 
			-->
			<view class="sub-content">
				<view class="in-position">
					<text class="title-content">所在地</text>
					<picker class="input-size" @change="bindDistrictChange" :value="districtIndex" :range="district">
						<view class="input-style">{{district[districtIndex]}}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="in-position">
					<text class="title-content">幼儿园</text>
					<picker class="input-size" @change="bindKindergartenChange" :value="kindergartenIndex" :range="kindergarten">
						<view class="input-style">{{kindergarten[kindergartenIndex]}}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="in-position">
					<text class="title-content">所在年级</text>
					<picker class="input-size" @change="bindGradeChange" :value="gradeIndex" :range="grade">
						<view class="input-style">{{grade[gradeIndex]}}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="in-position">
					<text class="title-content">所在班级</text>
					<picker class="input-size" @change="bindTeamChange" :value="teamIndex" :range="team">
						<view class="input-style">{{team[teamIndex]}}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="title-position">
					<text>平台保证会对您和宝宝的信息绝对保密，请您放心！</text>
				</view>
			</view>
			
			<view class="button-position">
				<view class="act-button">保存并领取借阅币</view>
				<view class="act-button sub-act-button" @tap="goIndex">先行体验</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
    data() {
		const currentDate = this.getDate({
			format: true
		})
        return {
			sexIndex: 0,
			sex: ['男孩', '女孩'],
			date: currentDate,
			districtIndex: 0,
			district: ['禅城', '南海', '顺德', '高明', '三水'],
			kindergartenIndex: 0,
			kindergarten: ['裴蕾幼儿园', '育英幼儿园', '财贸幼儿园', '机关幼儿园'],
			gradeIndex: 0,
			grade: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
			teamIndex: 0,
			team: ['一班', '二班', '三班', '四班', '五班', '六班'],
        }
    },
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
    onLoad() {
        
    },
    methods: {
		bindSexChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.sexIndex = e.target.value
		},
		bindDistrictChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.districtIndex = e.target.value
		},
		bindKindergartenChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.kindergartenIndex = e.target.value
		},
		bindGradeChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.gradeIndex = e.target.value
		},
		bindTeamChange: function(e) {
			console.log('picker发送选择改变，携带值为', e.target.value)
			this.teamIndex = e.target.value
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year - 60;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindDateChange: function(e) {
			this.date = e.target.value
		},
		goIndex() {
			uni.reLaunch({ url: '../index/index' })
		}
	}
}
</script>

<style scoped>
.content {
	width: 100%;
	background: rgb(235,248,255);
	height: 100vh;
}
.sub-content {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.content-position {
	background-size: 90%;
	background-position: top;
	background-repeat: no-repeat;
	padding-top: 260upx;
}
.in-position {
	width: 80%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 30upx;
	padding-bottom: 30upx;
	border-bottom: 1upx solid #E8E8E8;
}
.title-content {
	font-size: 30upx;
	font-weight: bold;
}
.input-style {
	font-size: 30upx;
	color: #6A6A6A;
}
.title-position {
	font-size: 24upx;
	color: #6A6A6A;
	text-align: center;
	padding: 20upx 0;
}
.button-position {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 65upx;
	padding-bottom: 200upx;
}
.arrow {
	width: 20upx;
	height: 20upx;
}
.act-button {
	width: 80%;
	background: rgba(0,183,204,1);
	color: #fff;
	padding: 20upx 0;
	text-align: center;
	border-radius: 40upx;
}
.sub-act-button {
	color: rgba(0,183,204,1);
	background: #fff;
	margin-top: 30upx;
	border: 1px solid #f1f1f1;
}
</style>
