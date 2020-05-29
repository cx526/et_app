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
						<text>当前积分：{{userInfo.score}}</text>
					</view>
				</view>
				
				<view class="top-right-content">
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/my_baby.png" style="width: 120upx; height: 120upx; border-radius: 50%;"></image>
				</view>
			</view>
			
			<view class="middle-conten-position white-border">
				<view class="top-content">
					<text>就读学校</text>
					<text style="color: #8E8E8E; font-weight: 400;">{{userInfo.name}}</text>
				</view>
				<view class="top-content">
					<text>所在班级</text>
					<text style="color: #8E8E8E; font-weight: 400;">{{userInfo.name}}</text>
				</view>
				<view class="top-content" style="border: 0upx;">
					<text>宝贝姓名</text>
					<text style="color: #8E8E8E; font-weight: 400;">{{userInfo.name}}</text>
				</view>
			</view>
			
			<view class="middle-conten-position white-border" style="margin-top: 30upx;">
				<view class="top-content">
					<text>作品介绍</text>
					<input type="text" value=""  placeholder="大胆说出你的创意"/>
				</view>
				<view class="top-content"  style="align-items: flex-start; border: 0;">
					<text>我的作品</text>
					<image src="../../static/cart/color.png" style="width:300upx; height: 200upx;" mode=""></image>
					<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_add.png" style="width:100upx; height: 100upx;" mode=""></image>
				</view>
				<view style="height: 100upx;"></view>
			</view>
			
			<view class="button-style">
				<text>保存并上传</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				preUploadPic: '',
				percent: 0,
				userInfo:{
					name:'小爱同学',
					score: 1223
				}
	        }
	    },
	    onLoad() {
	        
	    },
	    methods: {
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
			doUploadPic() {
				let uper = uni.uploadFile({
					// 需要上传的地址
					url:'https://www.52diyike.com/api/api/upload/uploadPicToAliyun',
				    // filePath  需要上传的文件
					filePath: this.preUploadPic,
					name: 'file',
					success: (res) => {
						console.log(res)
					}
				})
				// onProgressUpdate 上传对象更新的方法
				uper.onProgressUpdate((res) => {
					// 进度条等于 上传到的进度
					this.percent = res.progress
				})
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
	justify-content: space-between;
	align-items: center;
	padding: 20upx 0;
	border-bottom: 1UPX solid #F3F3F3;
	font-weight: bold;
	font-size: 25upx;
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
