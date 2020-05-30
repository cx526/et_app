<template>
	<!-- <view>
		promote
		<button @tap="doSelectPic">选择图片</button>
		<button @tap="doUploadPic">上传图片</button>
	</view> -->
	
	<view class="content">
		<view class="top-position"></view>
		
		<view class="content-position">
			<view class="top-content-position">
				<view class="top-left-content">
					<text style="font-size: 35upx;">{{userInfo.name}}</text>
					<view class="intergal-type" style="font-size: 20upx; margin-top: 5upx;">
						<text class="spacing">当前积分：{{allCustomInfo.coin}}</text>
					</view>
				</view>
				
				<view class="top-right-content">
					<!-- <image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_baby.png" style="width: 120upx; height: 120upx; border-radius: 50%;"></image> -->
					<image :src="allCustomInfo.avatar" style="width: 120upx; height: 120upx; border-radius: 50%;"></image>
				</view>
			</view>
			
			<view class="middle-conten-position white-border">
				<view class="top-content">
					<text class="spacing">就读学校</text>
					<text style="color: #8E8E8E; font-weight: 400;">{{allCustomInfo.schoolInfo.name}}</text>
				</view>
				<view class="top-content">
					<text class="spacing">所在班级</text>
					<text style="color: #8E8E8E; font-weight: 400;">{{allCustomInfo.gradeInfo.name}}</text>
				</view>
				<view class="top-content" style="border: 0upx;">
					<text class="spacing">宝贝姓名</text>
					<text style="color: #8E8E8E; font-weight: 400;">{{allCustomInfo.childInfo.name}}</text>
				</view>
			</view>
			
			<view class="middle-conten-position white-border" style="margin-top: 30upx;">
				<view class="top-content">
					<text class="spacing">作品介绍</text>
					<input type="text" :value="inputText"  placeholder="大胆说出你的创意" @input="inputChange"/>
				</view>
				<view class="top-content"  style="align-items: flex-start; border: 0;">
					<text class="spacing">我的作品</text>
					<!-- <image src="../../static/cart/color.png" style="width:300upx; height: 200upx;" mode=""></image> -->
					<view @tap="doSelectPic" v-if="preUploadPic === ''">
						<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_add.png" style="width:160upx; height: 160upx;" mode=""></image>
					</view>
					<view v-if="preUploadPic !== ''" @tap="preViewPic">
						<image :src="preUploadPic" style="width:160upx; height: 160upx;" mode=""></image>
					</view>
				</view>
				<view style="height: 100upx;"></view>
			</view>
			
			<view class="button-style" @tap="doUploadPic" v-if="!hasPromote">
				<text>保存并上传</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				allCustomInfo: {},
				preUploadPic: '',
				percent: 0,
				inputText: '',
				promoteTitle: '',
				hasPromote: false
	        }
	    },
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo')
			}
		},
	    onLoad(option) {
			this.promoteTitle = option.pTitle
	        this.getCustomInfo()
	    },
	    methods: {
			getPromote() {
				let param = {
					custom_id: this.allCustomInfo.id,
					promote_name: this.promoteTitle
				}
				this.$api.getPromote(param).then(res => {
					if (res.data && res.data.length > 0) {
						let result = res.data[0]
						this.preUploadPic = result.promote_pic
						this.inputText = result.promote_text
						this.hasPromote = true
					}
				})
			},
			getCustomInfo() {
				this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
					this.allCustomInfo = res.data[0]
					this.getPromote()
				})
			},
			inputChange(e) {
				this.inputText = e.target.value
			},
			doSelectPic() {
				uni.chooseImage({
				    count: 1, 
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: (res) => {
				        this.preUploadPic = res.tempFilePaths[0]
				    }
				});
			},
			preViewPic() {
				// 预览图片
				uni.previewImage({
					urls: [this.preUploadPic],
					longPressActions: { 
						itemList: ['保存图片'],
					}
				})
			},
			doUploadPic() {
				if (this.inputText === '') {
					uni.showToast({ icon: '', title: '请完善相关信息' })	
					return 
				}
				if (this.preUploadPic === '') {
					uni.showToast({ icon: '', title: '请完善相关信息' })	
					return 
				}
				uni.showLoading()
				uni.uploadFile({
					// 需要上传的地址
					url:'https://www.52diyike.com/api/api/upload/uploadPicToAliyun',
				    // filePath  需要上传的文件
					filePath: this.preUploadPic,
					name: 'file',
					success: (res) => {
						let result = JSON.parse(res.data)
						let param = {
							promote_name: this.promoteTitle,
							custom_id: this.allCustomInfo.id,
							promote_pic: result.url,
							promote_text: this.inputText,
							promote_title: '',
							remark: result.name
						}
						this.$api.addPromote(param).then(res => {
							if (res.data.status === 'fail') {
								uni.showToast({ icon: '', title: res.data.msg })	
							} else {
								uni.showToast({ icon: '', title: '上传作品成功' })	
							}
							uni.hideLoading()
						})
					}
				})
				// onProgressUpdate 上传对象更新的方法
				// uper.onProgressUpdate((res) => {
				// 	// 进度条等于 上传到的进度
				// 	this.percent = res.progress
				// })
			}
		}
	}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #FFFFFF;
	position: relative;
}
.top-position {
	background-image: linear-gradient(to bottom, #7ED1E7 , #8CD9D8);
	border-bottom-right-radius: 30upx;
	border-bottom-left-radius: 30upx;
	height: 280upx;
	width: 100%;
}
.content-position {
	position: absolute;
	top: 0;
	z-index: 99;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 90upx;
	width: 100%;
}
.top-content-position {
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	color:#FFFFFF;
	
}
.intergal-type {
	background-color: #2AAEC4;
	border-radius: 30upx;
	padding: 5upx 10upx;
}
.middle-conten-position {
	width: 95%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-content {
	width: 85%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding: 20upx 0;
	border-bottom: 1UPX solid #F3F3F3;
	font-weight: bold;
	font-size: 25upx;
}
.spacing {
	padding-right: 50upx;
}
.button-style {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #00B7CC;
	border-radius: 40upx;
	padding: 20upx 100upx;
	color: #FFFFFF;
	font-size: 35upx;
	position: absolute;
	bottom: -30upx;
}
</style>
