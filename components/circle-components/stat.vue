<template>
	<view class="stat-box">
		<view class="stat">
			<view class="item" v-for="(item, index) in dataList" :key="index" @tap="checkReadingDetail(index)">
				<image :src="$aliImage + item.path" mode="widthFix" class="bg"></image>
				<view class="data" >
					<!-- 显示排名 -->
					<view v-if="item.sort && item.length">
						<image :src="$aliImage + 'read-info.png'" mode="widthFix" class="info"></image>
						<text style="font-size: 42rpx;font-weight: 700;">{{ item.sort }}</text>
						<text style="font-size: 26rpx;color: rgba(255,255,255,.6);margin: 0 4rpx;">/</text>
						<text style="font-size: 26rpx;color: rgba(255,255,255,.6);"> {{ item.length }}人</text>
					</view>
					<view style="font-size: 24rpx;color: rgba(255,255,255,.6);">{{ item.title }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				dataList: [
					{
						path: 'read-school.png',
						title: '校园阅读排名',
						sort: '',
						length: '',
					},
					{
						path: 'read-grade.png',
						title: '年级阅读排名',
						sort: '',
						length: '',
					},
					{
						path: 'read-class.png',
						title: '班级阅读排名',
						sort: '',
						length: '',
					}
				]
			}
		},
		created() {
			this.updateSort()
		},
		methods: {
			checkReadingDetail(index) {
				this.$emit('checkReadingDetail', index)
			},
			updateSort() {
				let school_sort = uni.getStorageSync('school_sort')
				let grade_sort = uni.getStorageSync('grade_sort')
				let class_sort = uni.getStorageSync('class_sort')
				if(school_sort && school_sort.length > 0) {
					this.dataList[0].sort = school_sort[0]
					this.dataList[0].length = school_sort[1]
				}
				if(grade_sort && grade_sort.length > 0) {
					this.dataList[1].sort = grade_sort[0]
					this.dataList[1].length = grade_sort[1]
				}
				if(class_sort && class_sort.length > 0) {
					this.dataList[2].sort = class_sort[0]
					this.dataList[2].length = class_sort[1]
				}
			},
		}
	}
</script>

<style scoped>
	.stat-box {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-top: 20rpx;
	}
	.stat {
		box-sizing: border-box;
		display: flex;
	}
	.stat .item {
		box-sizing: border-box;
		width: 216rpx;
		height: 260rpx;
		position: relative;
		margin-right: 26rpx;
	}
	.stat .item .bg {
		display: block;
		width: 100%;
		height: 100%;
	}
	.stat .item:last-child {
		margin-right: 0;
	}
	.stat .item .data {
		position: absolute;
		width: 100%;
		box-sizing: border-box;
		padding: 0 24rpx;
		top: 24rpx;
		z-index: 8;
		color: #fff;
	}
	.stat .item .data .info {
		width: 36rpx;
		height: 36rpx;
		margin-right: 6rpx;
	}
</style>
