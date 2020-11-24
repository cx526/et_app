<template>
	<view>
		<view class="user">
			<view class="left">
				<view class="avatar">
					<image :src="userList.customInfo.avatar" mode="widthFix" class="user-avatar" v-if="userList.customInfo.avatar"></image>
					<image v-else :src="userInfo.avatar" class="user-avatar"></image>
				</view>
				<view class="info">
					<view class="name" v-if="userList.customInfo.childName">{{ userList.customInfo.childName }}</view>
					<view v-else class="name">
						<text v-if="custom_type === '0'">老师</text>
						<text v-else-if="custom_type === '1'">小朋友</text>
						<text v-else>园长</text>
					</view>
					<view class="sort">
						<view class="rank">
							<view>
								<text style="font-size: 24rpx;">校园排名</text>
								<text style="opacity: 0.6;font-size: 22rpx;" v-if="JSON.stringify(userList) !== '{}'">/ {{ dataList.length }}</text>
								<text style="opacity: 0.6;font-size: 22rpx;" v-else>/ {{ dataList.length + 1 }}</text>
							</view>
							<view style="font-size: 40rpx;" v-if="userList.sort">{{ userList.sort }}</view>
							<view v-else style="font-size: 40rpx;">{{ dataList.length + 1 }}</view>
						</view>
						<view class="read">
							<view>
								<text style="font-size: 24rpx;">累计阅读</text>
								<text style="opacity: 0.6;font-size: 22rpx;">/本</text>
							</view>
							<view style="font-size: 40rpx;" v-if="userList.readCount">{{ userList.readCount }}</view>
							<view v-else>0</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="list" v-if="dataList && dataList.length > 0">
			<!-- style="max-height: 1032rpx;" -->
			<scroll-view scroll-y >
				<view class="item" v-for="(item, index) in dataList" :key="index">
					<view class="left">
						<view class="rank">
							<text>{{ index+1 > 9 ? index+1 : '0' + (index+1) }}</text>
						</view>
						<image :src="item.customInfo.avatar"></image>
						<text class="name" v-if="item.customInfo.childName">{{ item.customInfo.childName }}</text>
						<text v-else>小朋友</text>
					</view>
					<view class="right">
						<image :src="$aliImage + 'read-medal-No'+(index+1)+'.png'" mode="widthFix" class="medal"
						v-if="(index+1) <= 3"></image>
						<view class="vigour">
							<image :src="$aliImage + 'read-books.png'" mode="widthFix"></image>
							<text>阅读数：{{ item.readCount }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-else class="none">暂无数据</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				userInfo: uni.getStorageSync('userInfo'),
				currentIndex: '',
				$aliImage: this.$aliImage,
				school_id: '',
				grade_id: '',
				class_id: '',
				custom_type: '', //身份
				userList: null, //个人数据
				dataList: [], //总数据
			}
		},
		onLoad(options) {
			let params = JSON.parse(options.params)
			console.log(params)
			this.currentIndex = String(params.index)
			this.school_id = params.school_id
			this.grade_id = params.grade_id
			this.class_id = params.class_id
			this.custom_type = params.custom_type
			// 设置navTitle
			this.setNavTitle(this.currentIndex)
			// 获取排名数据
			this.sortReadingByApp(this.currentIndex)
		},
		methods: {
			// 设置navTitle
			setNavTitle(index) {
				switch(index) {
					case '0':
					uni.setNavigationBarTitle({
						title: '校园阅读排名'
					})
					break
					case '1':
					uni.setNavigationBarTitle({
						title: '年级阅读排名'
					})
					break
					case '2':
					
					uni.setNavigationBarTitle({
						title: '班级阅读排名'
					})
					break
					default:
					uni.setNavigationBarTitle({
						title: '阅读统计'
					})
				}
			},
			// 获取排名数据
			sortReadingByApp(index) {
				let custom_id = String(this.userInfo.id)
				let params = {
					filterItems: {
						school_id: this.school_id,
						my_custom_id: custom_id
					}
				}
				// 查看年级
				if(index == 1) {
					params.filterItems.grade_id = this.grade_id
				}
				// 查看班级
				if(index == 2) {
					params.filterItems.grade_id = this.grade_id
					params.filterItems.class = this.class_id
				}
				this.$api.sortReadingByApp(params).then(res => {
					this.userList = res.data.mySort
					this.dataList = res.data.rows
				})
			},
			
			
		}
	}
</script>

<style>
	page {
		background: #EBF8FF;
		box-sizing: border-box;
		
	}
</style>
<style scoped>
	.user {
		box-sizing: border-box;
		height: 320rpx;
		background-image: linear-gradient(to bottom, #7BCFEC, #9BE6E7);
		border-radius: 0px 0px 30rpx 30rpx;
		padding: 0 56rpx;
		display: flex;
	}
	.user .left {
		flex: 1;
		box-sizing: border-box;
		display: flex;
		padding-top: 70rpx;
		/* align-items: center; */
	}

	.user .left .avatar {
		width: 105rpx;
		height: 105rpx;
		position: relative;
		background: #fff;
		border-radius: 50%;
		margin-right: 28rpx;
		box-sizing: border-box;
	}
	.user .left .avatar .user-avatar {
		width: 100rpx;
		height: 100rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 8;
		border-radius: 50%;
	}
	.user .left .info {
		box-sizing: border-box;
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.user .left .name {
		font-size: 30rpx;
		color: #fff;
	}
	.user .left .sort {
		display: flex;
		color: #fff;
	}
	.user .left .rank {
		margin-right: 55rpx;
	}
	
	.list {
		box-sizing: border-box;
		padding: 0 25rpx;
		position: relative;
		top: -73rpx;
	}
	.list scroll-view {
		box-sizing: border-box;
		background: #fff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 6rpx 0px rgba(0,0,0,0.16); 
		padding: 0 30rpx;
	}
	.list .item {
		box-sizing: border-box;
		
		border-bottom: 1px dashed  #b3b3b3;
		height: 130rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.list .item:last-child {
		border-bottom: 0;
	}
	.list .item .left {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.list .item .left .rank {
		width: 40rpx;
		height: 83rpx;
		background: linear-gradient(180deg,#7bcfec, #9be6e7);
		border-radius: 10rpx 0px 0px 10rpx;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.list .item .left image {
		width: 100rpx;
		height: 100rpx;
		margin: 0 20rpx;
		border-radius: 50%;
	}
	.list .item .left .name {
		font-size: 28rpx;
		font-weight: 700;
	}
	.list .item .right {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.list .item .right .medal {
		width: 40rpx;
		height: 50rpx;
		margin-right: 18rpx;
	}
	.list .item .right .vigour {
		width: 180rpx;
		height: 36rpx;
		background: #ffffff;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
	.list .item .right .vigour image {
		width: 24rpx;
		height: 22rpx;
		margin-right: 6rpx;
	}
	.none {
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 30rpx;
		color: #808080;
		text-align: center;
	}
</style>
