<template>
	<view class="content">
		<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/promote_work.png" style="width: 100%;" mode="widthFix"></image>
		<view class="content-button" @tap="toUrl">
			
		</view>
	</view>
</template>

<script>

export default {
    data() {
        return {
			allCustomInfo: {},
			isSchool: false,
        }
    },
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
    onLoad() {
        this.getCustomInfo()
        this.isSchool = false
    },
    methods: {
		getCustomInfo() {
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.allCustomInfo = res.data[0]
				if (this.allCustomInfo.schoolInfo && Object.keys(this.allCustomInfo.schoolInfo).length > 0 ) {
					//判断是学校用户
					this.isSchool = true
				} else {
					this.uni.showToast({ icon: '', title: '请先补充学校信息' });
				}
			})
		},
		toUrl() {
			if (this.userInfo.name === 'guest') {
				//游客 发出提示
				uni.showModal({
					title: '请先登录',
					confirmText: '登录',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}
					}
				})
			} else {
				if (this.isSchool) {
					uni.navigateTo({
						url:'/pages/promote/promoteUpload?pTitle=童创手工坊',
					})
				}
			}
		},
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #CAE6CE;
	position: relative;
}
.content-button {
	width: 500UPX;
	height: 100upx;
	position: absolute;
	bottom: 120upx;
	/* background-color: #FFFFFF; */
}
</style>
