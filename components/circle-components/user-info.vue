<template>
	<view class="user-box">
		<view class="user">
			<view class="left" @tap="checkMyRemark">
				<!-- 根据身份显示不同的标识，没有登录显示默认头像 -->
				<image :src="$aliImage + 'read-student.png'" class="identity" mode="widthFix"></image>
				<image :src="avatar" class="header"></image>
			</view>
			<view class="center" @tap="checkMyRemark">
				<view class="user-name" v-if="userInfo.childInfo.name">
					<text>{{ userInfo.childInfo.name }}</text>
					<text v-if="userInfo.custom_type === '1'">小朋友</text>
					<text v-else-if="userInfo.custom_type === '0'">老师</text>
					<text v-else>园长</text>
				</view>
				<view class="user-name" v-else>游客，你好！</view>
				<view class="grade-info">
					<text style="margin-right: 8rpx;">{{ userInfo.schoolInfo.name }}</text>
					<text v-if="userInfo.gradeInfo.name">{{ userInfo.gradeInfo.name + userInfo.childInfo.class + '班' }}</text>
				</view>
			</view>
			<view class="right">
				<!-- 只有首页应用才展示 -->
				<view class="vitality" @tap="checkTopicRecord" v-if="parent === 'index'">
					<view class="topic">
						<image :src="$aliImage + 'read-vitality.png'" mode="widthFix"></image>
						<text>活力值</text>
					</view>
					<view class="number">{{ userInfo.vitality }}</view>
				</view>
				<!-- 首页不显示 -->
				<view class="message" @tap="chooseItem" v-if="parent !== 'index'">
					<image :src="$aliImage + 'read-message.png'" mode="widthFix"></image>
					<!-- 只有在我的打卡页面才显示 -->
					<text v-if="parent !== 'index'">我要发圈</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			parent: {
				type: String,
				default: 'index'
			},
			user_data: Object,
		},
		data() {
			return {
				$aliImage: this.$aliImage,
				// userInfo: uni.getStorageSync('userInfo'),
				userInfo: null
			}
		},
		watch:{
			user_data(newVal,oldVal) {
				this.userInfo = newVal
			}
		},
		computed: {
			avatar() {
				let userInfo = uni.getStorageSync('userInfo')
				if(userInfo.avatar) {
					return userInfo.avatar
				}else {
					return this.$aliImage + 'user_default.png'
				}
				
			}
		},
		methods: {
			// 查看话题记录
			checkTopicRecord() {
				this.$emit('checkTopicRecord')
			},
			// 查看我的打卡记录
			checkMyRemark() {
				// 只有点击首页头像才可进入
				if(this.parent === 'index') {
					this.$emit('checkMyRemark')
				}else {
					return
				}
				
			},
			// 点击message图标
			chooseItem() {
				this.$emit('chooseItem')
			}
		}
	}
</script>

<style scoped>
	.user-box {
		box-sizing: border-box;
		padding: 62rpx 42rpx 30rpx 42rpx;
	}
	.user {
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.user .left {
		box-sizing: border-box;
		width: 150rpx;
		height: 150rpx;
		flex-shrink: 0;
		position: relative;
		margin-right: 16rpx;
	}
	.left .identity {
		width: 100%;
		height: 100%;
		display: block;
	}
	.left .header {
		width: 102rpx;
		height: 102rpx;
		position: absolute;
		left: 49%;
		top: 49%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}
	.user .center {
		box-sizing: border-box;
		flex: 1;
	}
	.center .user-name {
		font-size: 30rpx;
		font-weight: 700;
	}
	.center .grade-info {
		font-size: 22rpx;
		margin-top: 8rpx;
	}
	.user .right {
		flex-shrink: 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.right .vitality {
		box-sizing: border-box;
	}
	.vitality .topic {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		font-size: 24rpx;
		font-weight: 500;
	}
	.vitality .topic image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.vitality .number {
		font-size: 32rpx;
		font-weight: 700;
		color: #2AAEC4;
		text-align: right;
		margin-top: 6rpx;
	}
	.right .message {
		box-sizing: border-box;
		/* width: 70rpx;
		height: 64rpx; */
		margin-left: 36rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #2AAEC4;
		font-size: 18rpx;
	}
	.right .message image {
		width: 70rpx;
		height: 64rpx;
		display: block;
	}
</style>
