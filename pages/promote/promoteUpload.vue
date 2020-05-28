<template>
	<view>
		promote
		<button @tap="doSelectPic">选择图片</button>
		<button @tap="doUploadPic">上传图片</button>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				preUploadPic: '',
				percent: 0,
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

<style>
</style>
