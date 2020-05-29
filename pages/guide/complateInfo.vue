<template>
	<view class="content">
		<view class="content-position" style="background-image: url(https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/paper.png);">
			<view class="sub-content">
				<view class="in-position">
					<text class="title-content">所在地</text>	
					<region-picker class="picker-input" @change="region_change" value="440000,440600,440606" >
					    <view style="color: #6A6A6A;">{{showing_address}}</view>
					</region-picker>
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
				<view class="act-button" @tap="postSchoolInfo">保存并领取积分</view>
				<view class="act-button sub-act-button" @tap="goIndex">先行体验</view>
			</view>
		</view>
	</view>
</template>

<script>
import regionData from '../../common/regionData.js'
import etRegion from '../../components/etRegion.vue'
import regionPicker from "../../components/region-picker/region-picker.vue"

export default {
	components: {
		etRegion,
		regionPicker
	},
    data() {
        return {
			selectedProvinceCode: '440000',
			selectedCityCode: '440600',
			selectedAreaCode: '440606',
			schoolInfo: [],
			gradeInfo: [],
			kindergartenIndex: 0,
			kindergarten: [],
			gradeIndex: 0,
			grade: [],
			teamIndex: 0,
			team: ['1班', '2班', '3班', '4班', '5班', '6班', '7班', '8班', '9班', '10班', '11班', '12班'],
			selectSchoolId: null,
			selectGradeId: null,
			showing_address: ''
        }
    },
	computed: {
		finalRegionString() {
			// return this.selectedProvinceValue + this.selectedCityValue + this.selectedAreaValue
			
			if (this.selectedProvinceValue + this.selectedCityValue + this.selectedAreaValue){
				return this.selectedProvinceValue + this.selectedCityValue + this.selectedAreaValue
			}else if(this.showing_address != ''){
				return this.showing_address;
			}else {
				return '';
			}
		},
	},
    onLoad(option) {	
		// 初始化数据
		this.dataInit();
		
		if(option.complateInfoData) { 
			const objectArr = JSON.parse(decodeURIComponent(option.complateInfoData));
			this.teamIndex = parseInt(objectArr.class) - 1;
			this.selectedProvinceCode = objectArr.schoolInfo.province;
			this.selectedCityCode = objectArr.schoolInfo.city;
			this.selectedAreaCode = objectArr.schoolInfo.area;
			this.selectSchoolId = objectArr.schoolInfo.id;
			this.selectGradeId = objectArr.grade_id;	
			
			// 控制地区展示
			this.showing_address = objectArr.showing_address;
			
			//控制学校展示
			let param = {
				filterItems: {
					province: objectArr.schoolInfo.province,
					city: objectArr.schoolInfo.city,
					area:  objectArr.schoolInfo.area
				}
			}
			this.$api.getSchoolInfo(param).then(res => {
				this.schoolInfo = res.data
				console.log(this.schoolInfo);
				if (res.data.length > 0) {
					res.data.map(item => {
						this.kindergarten.push(item.name)
					})
				}
				let arrIndex = 0;
				this.schoolInfo.forEach((item,index)=>{
					if(item.name === objectArr.school) {
						arrIndex = index;
					}
				});
				this.selectSchoolId = arrIndex;
				
				//控制班级展示
				console.log(res.data);
				let gradeArrIndex = 0;
				this.gradeInfo = res.data[0].classInfo
				res.data[0].classInfo.map((subItem,index) => {
					this.grade.push(subItem.name);
					if(parseInt(subItem.id) === parseInt(objectArr.grade_id)) {
						gradeArrIndex = index;
					}
				});
				this.gradeIndex = gradeArrIndex;
				this.selectGradeId = objectArr.grade_id;
				
			})
			//控制学校展示
			
			//
		}
    },
    methods: {
		dataInit(){
			//默认为顺德区
			this.showing_address = '广东省佛山市顺德区';
			this.selectedProvinceCode =  '440000';
			this.selectedCityCode = '440600';
			this.selectedAreaCode =  '440606';
			
			//默认幼儿园
			let param = {
				filterItems: {
					province: this.selectedProvinceCode,
					city: this.selectedCityCode,
					area: this.selectedAreaCode
				}
			}
			this.$api.getSchoolInfo(param).then(res => {
				this.schoolInfo = res.data
				console.log(this.schoolInfo);
				if (res.data.length > 0) {
					res.data.map(item => {
						this.kindergarten.push(item.name)
					})
				}
				this.selectSchoolId = this.schoolInfo[0].id;
				//默认班级
				this.gradeIndex = 0;
				this.gradeInfo = this.schoolInfo[0].classInfo;
				this.grade = [];
				this.gradeInfo.map(subItem => {
					this.grade.push(subItem.name)
				});
				this.selectGradeId = this.gradeInfo[0].id;
			})
			
			//默认班级
			// let gradeArrIndex = 0;
			// this.gradeInfo = res.data[0].classInfo;
		},
		region_change(e){
			this.showing_address = e.detail.value[0] + e.detail.value[1] + e.detail.value[2];  
			this.selectedProvinceCode =  e.detail.code[0];
			this.selectedCityCode = e.detail.code[1];
			this.selectedAreaCode =  e.detail.code[2];
		},
		bindKindergartenChange(e) {			
			this.selectSchoolId = this.schoolInfo[e.target.value].id
			this.kindergartenIndex = e.target.value
			this.schoolInfo.map(item => {
				if (item.name === this.kindergarten[e.target.value]) {
					this.gradeInfo = item.classInfo
					this.grade = [];
					item.classInfo.map(subItem => {
						this.grade.push(subItem.name)
					})
				}
			})
			this.selectGradeId = this.gradeInfo[0].id
		},
		bindGradeChange(e) {
			this.selectGradeId = this.gradeInfo[e.target.value].id
			this.gradeIndex = e.target.value
		},
		bindTeamChange(e) {
			this.teamIndex = e.target.value
		},
		goIndex() {
			uni.reLaunch({ url: '../index/index' })
		},
		postSchoolInfo() {
			if (!this.selectedProvinceCode && this.selectedProvinceCode === '') {
				uni.showToast({ icon: 'none', title: '请完善相关信息' })
				return
			}
			if (!this.selectedCityCode && this.selectedCityCode === '') {
				uni.showToast({ icon: 'none', title: '请完善相关信息' })
				return
			}
			if (!this.selectedAreaCode && this.selectedAreaCode === '') {
				uni.showToast({ icon: 'none', title: '请完善相关信息' })
				return
			}
			if (!this.selectSchoolId && this.selectSchoolId === '') {
				uni.showToast({ icon: 'none', title: '请完善相关信息' })
				return
			}
			if (!this.selectGradeId && this.selectGradeId === '') {
				uni.showToast({ icon: 'none', title: '请完善相关信息' })
				return
			}
			let tmpClass = this.team[this.teamIndex].substr(0, 1)
			const userInfo = uni.getStorageSync('userInfo')
			let param = {
				userInfo: userInfo,
				province: this.selectedProvinceCode,
				city: this.selectedCityCode,
				area: this.selectedAreaCode,
				school: this.selectSchoolId,
				grade: this.selectGradeId,
				class: tmpClass
			}
			this.$api.postSchoolInfo(param).then(res => {
				if (res.data.status === 'ok') {
					uni.reLaunch({ url: '../index/index' })
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				}
			})
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
