<template>
	<view class="content">
		<view class="content-position" style="background-image: url(../../static/guide/paper.png);">
			<view class="sub-content">
				<view class="in-position">
					<text class="title-content">所在地</text>
					<picker 
						class="picker-input" 
						mode="multiSelector" 
						@change="regionChange"
						@columnchange="regionColChange"
						:value="regionResult" 
						:range="region"
					>
						<view class="input-style">{{ finalRegionString.length === 0 ? '选择幼儿园所在地': finalRegionString }}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="in-position">
					<text class="title-content">幼儿园</text>
					<picker class="picker-input" @change="bindKindergartenChange" :value="kindergartenIndex" :range="kindergarten">
						<view class="input-style">{{kindergarten[kindergartenIndex]}}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="in-position">
					<text class="title-content">所在年级</text>
					<picker class="picker-input" @change="bindGradeChange" :value="gradeIndex" :range="grade">
						<view class="input-style">{{grade[gradeIndex]}}</view>
					</picker>
					<image src="../../static/guide/arrow.png" class="arrow"></image>
				</view>
				
				<view class="in-position">
					<text class="title-content">所在班级</text>
					<picker class="picker-input" @change="bindTeamChange" :value="teamIndex" :range="team">
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
import regionData from '../../common/regionData.js'

export default {
    data() {
        return {
			provinceKey: '',
			cityKey: '',
			provinceArray: [],
			cityArray: [],
			areaArray: [],
			region: [
				[],
				[],
				[],
			],
			pKeysArray: [],
			cKeysArray: [],
			aKeysArray: [],
			regionResult: [
				[],
				[],
				[],
			],
			selectedProvinceCode: '',
			selectedCityCode: '',
			selectedAreaCode: '',
			selectedProvinceValue: '',
			selectedCityValue: '',
			selectedAreaValue: '',
			kindergartenIndex: 0,
			kindergarten: ['裴蕾幼儿园', '育英幼儿园', '财贸幼儿园', '机关幼儿园'],
			gradeIndex: 0,
			grade: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
			teamIndex: 0,
			team: ['一班', '二班', '三班', '四班', '五班', '六班'],
        }
    },
	computed: {
		finalRegionString() {
			return this.selectedProvinceValue + this.selectedCityValue + this.selectedAreaValue
		}
	},
    onLoad() {
        this.provinceArray = Object.values(regionData['86'])
		this.pKeysArray = Object.keys(regionData['86'])
		this.region[0] = this.provinceArray
    },
    methods: {
		regionColChange(e) {
			// console.log(e)
			let col = e.detail.column
			let val = e.detail.value
			// console.log(col, val)
			
			if (col === 0) {
				this.provinceKey = Object.keys(regionData['86'])[val]
				this.cityArray = Object.values(regionData[this.provinceKey]) 
				this.region[1] = this.cityArray
				this.cKeysArray = Object.keys(regionData[this.provinceKey])
				this.selectedProvinceValue = Object.values(regionData['86'])[val]
				this.selectedCityValue = ''
				this.selectedAreaValue = ''
				// this.regionResult[0] = this.provinceArray[val]
				// this.regionResult[1] = this.cityArray[0]
				// this.regionResult[2] = []
			}
			if (col === 1 ) {
				this.cityKey = Object.keys(regionData[this.provinceKey])[val]
				this.selectedCityValue = Object.values(regionData[this.provinceKey])[val]
				this.areaArray = Object.values(regionData[this.cityKey])
				this.region[2] = this.areaArray
				this.aKeysArray = Object.keys(regionData[this.cityKey])
				this.selectedAreaValue = ''
				// this.regionResult[1] = this.cityArray[val]
				// this.regionResult[2] = this.areaArray[0]
			}
			if (col === 2) {
				this.selectedAreaValue = Object.values(regionData[this.cityKey])[val]
			}
			// this.$forceUpdate()
		},
		regionChange(e) {
			// this.selectedProvinceValue = e.target.value[0] ? this.provinceArray[e.target.value[0]] : this.provinceArray[0]
			// this.selectedCityValue = e.target.value[1] ? this.cityArray[e.target.value[1]] : this.cityArray[0]
			// this.selectedAreaValue = e.target.value[2] ? this.areaArray[e.target.value[2]] : this.areaArray[0]
			
			this.selectedProvinceCode = this.pKeysArray[e.target.value[0]]
			this.selectedCityCode = this.cKeysArray[e.target.value[1]]
			this.selectedAreaCode = this.aKeysArray[e.target.value[2]]
			
			console.log(e.target.value)
			console.log(this.selectedProvinceCode, this.selectedCityCode, this.selectedAreaCode)
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
.picker-input {
	width: 60%;
}
</style>
