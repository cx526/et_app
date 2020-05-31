<template>
	<view class="page-class">
		<view class="content">
			<view class="text-content">
				<text>选择更适合宝宝的故事</text>
			</view>
			
			<view class="white-space"></view>
			
			<view class="input-class">
				<et-iconinput img="../static/register/nickName.png" remark="幼儿昵称" :inputData="name" @inputChangeAction="inputChangeAction"></et-iconinput>
			</view>
			
			<view class="white-space"></view>
			
			<view class="input-class">
				<picker class="birthday-picker" mode="date" :value="birth_day" :start="startDate" :end="endDate" @change="bindDateChange">
					<view>{{birth_day}}</view>
				</picker>
				<et-iconinput img="../static/register/born.png" remark=" " @inputFocusAction="birthInputFocus"></et-iconinput>
			</view>
			
			<view class="white-space" style="padding-top: 30upx;"></view>
			
			<view class="img-class">
				<view class="sex-class" @tap="selectGender(1)">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/boy.png" mode=""></image>
					<text :class="gender === 1 ? 'selected-gender' : ''">男孩</text>
				</view>
				<view class="sex-class" @tap="selectGender(2)">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/gril.png" mode=""></image>
					<text :class="gender === 2 ? 'selected-gender' : ''">女孩</text>
				</view>
			</view>
			
			<view class="white-space" style="padding-bottom: 80upx;"></view>
		</view>
		
		<view class="buttom-father">
			<view class="button-content">
				<view class="button-content-img">
					<image class="button-content-img-bi" src="../../static/register/currency.png"></image>
				</view>
				<view class="button-content-son button-content-son-one" @tap="goClassInfo">
					<text>填写幼儿园信息</text>
				</view>
				<view class="white-space"></view>
				<view class="button-content-son button-content-son-two" @tap="goIndex">
					<text>体验一下</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import etIconinput from '../../components/etIconinput.vue'

export default {	
	components: {
		etIconinput
	},
	computed: {
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
    data() {
        return {
			userInfo:{},
			child_id: '',
			name: '',
			birth_day: this.getDate(),
			gender: 0,
			complateInfo: {}    //传递变量给幼儿园编辑
        }
    },
    onLoad(option) {
		// 如果传递了信息过来，就是编辑不是新增
        if(option.childInfo){
			this.userInfo = JSON.parse(decodeURIComponent(option.childInfo));
			console.log(this.userInfo);
			this.name = this.userInfo.childInfo.name;
			this.birth_day = this.userInfo.childInfo.birth_day;
			this.gender = parseInt(this.userInfo.gender);
			this.child_id = this.userInfo.childInfo.id;
			this.complateInfo = this.userInfo;
		}
    },
    methods: {
		goClassInfo() {
			if (this.name.length === 0) {
				uni.showToast({
					icon: 'none',
					title: '请输入幼儿昵称'
				})
				return
			}
			if (this.gender === 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择幼儿性别'
				})
				return
			}
			const userInfo = uni.getStorageSync('userInfo')
			let param = {
				userInfo: userInfo,
				childInfo: {
					name: this.name,
					gender: this.gender,
					birth_day: this.birth_day,
					child_id: this.child_id
				}
			}
			this.$api.postChildInfo(param).then(res => {
				if (res.data.status === 'ok') {
					let toUrl = './complateInfo';
					if(this.child_id){     //存在child_id 就是编辑信息，否则就是新增信息
						toUrl = toUrl + '?complateInfoData=' + encodeURIComponent(JSON.stringify(this.complateInfo));
					}
					uni.navigateTo({ url: toUrl })	
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				}
			})
		},
		goIndex() {
			uni.reLaunch({ url: '../index/index' })
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
			this.birth_day = e.target.value
			console.log(this.birth_day)
		},
		birthInputFocus() {
			console.log('birthInputFocus')
		},
		selectGender(gender) {
			this.gender = gender
		},
		inputChangeAction(e) {
			this.name = e.target.value
		}
	}
}
</script>

<style scoped>
.page-class {
	display: flex;
	height: 100vh;
	flex: 1;
	flex-direction: column;
	align-items: center;
	background-color: rgb(235,248,255);
	position: relative;
	padding-top: 20upx;
}
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 200upx;
	width: 90%;
	background-color: #FFFFFF;
	border-radius: 40upx;
	box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.3);
	position: relative;
}
.text-content {
	font-size: 30upx;
	color: rgba(185,185,185,0.8);
}
.input-class {
	position: relative;
	width: 60%;
}
.img-class {
	width: 70%;
	display: flex;
	flex-direction: row;
	justify-content:space-between;;
	align-items: center;
}
.sex-class {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	color: rgba(179,179,179,0.8);
	font-size: 30upx;
}
.sex-class image {
	width: 200upx;
	height: 220upx;
}
.buttom-father {
	/* position: absolute;
	bottom: 220upx; */
	margin-top: -40upx;
	
}
.button-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
}
.button-content-img-bi {
	width: 168upx;
	height: 59upx;
	position: absolute;
	top: -50upx;
	left: 80upx;
}
.button-content-son {
	width: 350upx;
	height: 70upx;
	font-size: 25upx;
	border-radius: 10upx;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 1upx 1upx 1upx 1upx rgba(179,179,179,0.3);	
}
.button-content-son-one {
	color: rgba(255,255,254,1);
	background-color: rgba(0,183,204,1);
}
.button-content-son-two {
	color: rgba(0,183,204,1);
	background-color: rgba(255,255,254,1);
}
.birthday-picker {
	position: absolute;
	z-index: 999;
	left: 22%;
	top: 25%;
	color: rgba(185,185,185,0.8);
	font-size: 30upx;
	width: 80%;
}
.selected-gender {
	background: rgba(0,183,204,1);
	color: #fff;
	padding: 0 12upx;
	border-radius: 32upx;
}
</style>
