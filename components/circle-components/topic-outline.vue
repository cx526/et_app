<template>
	<view>
		<view class="topic">
			<view class="left">
				<view class="show">
					<image :src="topicDetail.imgInfo[0].url" v-if="topicDetail.imgInfo && topicDetail.imgInfo.length > 0 " class="cover"></image>
					<image :src="$aliImage + 'read-demo.png'" mode="widthFix" class="cover" v-else></image>
				</view>
				<view class="vigour">
					<image :src="$aliImage + 'read-vitality.png'"></image>
					<text>当前话题活力值: {{ vitality }}</text>
				</view>
			</view>
			<!-- 话题详情页才显示，获奖名单页不显示 -->
			<view class="right" v-if="parent !== 'award-list' && custom_type !== '1'" @tap="addRemark" >
				
				<image :src="$aliImage + 'read-message.png'" mode="widthFix"></image>
				<text>新建打卡</text>
			</view>
		</view>
		<view class="topic-intro">
			<view class="intro">
				<view class="share">
					<image :src="$aliImage + 'read-share.png'" mode="widthFix"></image>
					<text>分享</text>
				</view>
				<view class="title">
					<text>{{ topicDetail.title }}</text>
					<!-- 根据话题类型显示对应的图片 -->
					<image :src="$aliImage + 'read-topic-01.png'"  v-if="topicDetail.type === 'pk'"></image>
					<image :src="$aliImage + 'read-topic-02.png'"  v-else-if="topicDetail.type === 'chat'"></image>
					<image :src="$aliImage + 'read-topic-03.png'" v-else></image>
					<image :src="$aliImage + 'read-topic-03.png'" mode="widthFix" v-else></image>
				</view>
				<view class="info">
					<!-- 只有活力打卡类型有活力目标 -->
					<view class="item" v-if="topicDetail.type === 'vitality'">
						<image :src="$aliImage + 'read-target.png'" mode="widthFix"></image>
						<text>目标活力值：{{ topicDetail.target_vitality }}</text>
					</view>
					<view class="item" v-if="topicDetail.reward_gift">
						<image :src="$aliImage + 'read-gift.png'" mode="widthFix"></image>
						<text>奖励：{{topicDetail.reward_gift}}</text>
					</view>
				</view>
				<view class="explain">
					<view>{{ topicDetail.description }}</view>
					<view class="more" @tap="checkMoreDetail">
						<text>更多</text>
						<image :src="$aliImage + 'read-icon-right.png'" mode="widthFix"></image>
					</view>
				</view>
				<view class="time">
					<view class="left">
						<text>话题周期：{{ topicDetail.start_time }}-{{ topicDetail.end_time }}</text>
					</view>
					<!-- 只有活力打卡类型话题才显示 -->
					<view class="right" v-if="vitalityList && vitalityList.length > 0">
						<text>话题活力之星</text>
						<view class="show">
							<block v-for="(item, index) in vitalityList" :key="index">
								<image mode="widthFix" :src="item.customInfo.avatar" v-if="index < 3"></image>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		props: {
			// 区别从哪个页面引用该组件
			parent: {
				type: String,
				default: 'topic-detail'
			},
			custom_type: String,
			dataList: Object,
			// 活力值
			vitality: {
				type: Number,
				default: 0
			},
			// 活力之星数据
			vitalityList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				$aliImage: this.$aliImage,
				userInfo: uni.getStorageSync('userInfo'),
				title: '#21天养成阅读习惯#',
				topicDetail: null
			}
		},
		watch: {
			dataList(newVal) {
				this.topicDetail = newVal
			},
			vitality(newVal) {
				this.vitality = newVal
			},
			vitalityList(newVal) {
				this.vitalityList = newVal
				console.log(this.vitalityList)
			}
		},
		methods: {
			// 查看话题更多内容
			checkMoreDetail() {
				this.$emit('checkMoreDetail')
			},
			addRemark() {
				this.$emit('addRemark', this.topicDetail.title,this.topicDetail.id,this.topicDetail.show_comment)
			}
		}
	}
</script>

<style scoped>
	.topic {
		box-sizing: border-box;
		padding: 38rpx 60rpx 0 60rpx;
		display: flex;
	}
	.topic .left {
		flex: 1;
		display: flex;
		/* align-items: center; */
		box-sizing: border-box;
	}
	.topic .left .show {
		width: 210rpx;
		height: 210rpx;
		background: #ffffff;
		box-shadow: 0px 3rpx 6rpx 0px rgba(0,0,0,0.16);
		margin-right: 28rpx;
		position: relative;
	}
	.topic .left .cover {
		width: 200rpx;
		height: 200rpx;
		display: block;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.topic .left .vigour {
		margin-top: 74rpx;
		width: 232rpx;
		height: 36rpx;
		background: #ffffff;
		border: 1px solid #bcedf5;
		border-radius: 18rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
	.topic .left .vigour image {
		width: 17rpx;
		height: 26rpx;
		margin-right: 6rpx;
	}
	.topic .right {
		box-sizing: border-box;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		font-size: 18rpx;
		color: #2AAEC4;
		align-items: center;
		position: relative;
		top: 8rpx;
	}
	.topic .right image {
		width: 69rpx;
		height: 64rpx;
	}
	.topic-intro {
		box-sizing: border-box;
		padding: 0 25rpx;
		margin-top: -60rpx;
	}
	.topic-intro .intro {
		box-sizing: border-box;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 2rpx 5rpx 0px rgba(0,0,0,0.16); 
		padding: 0 30rpx;
	}
	.intro .share {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		height: 60rpx;
		font-size: 22rpx;
		color: #808080;
	}
	.intro .share image {
		width: 30rpx;
		height: 30rpx;
		display: block;
		margin-right: 4rpx;
	}
	.intro .title {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: 700;
		margin-top: 36rpx;
	}
	.intro .title image {
		width: 96rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}
	.intro .info {
		box-sizing: border-box;
		display: flex;
		margin-top: 12rpx;
		flex-wrap: wrap
	}
	.intro .info .item {
		font-size: 22rpx;
		color: #2AAEC4;
		display: flex;
		align-items: center;
		
	}
	.intro .info .item:nth-child(1) {
		margin-right: 45rpx;
	}
	.intro .info .item image {
		width: 30rpx;
		height: 30rpx;
		display: block;
		margin-right: 6rpx;
	}
	.intro .explain {
		font-size: 22rpx;
		display: flex;
		margin-top: 14rpx;
		padding-bottom: 28rpx;
		border-bottom: 1px dashed #B3B3B3;
	}
	.intro .explain view:nth-child(1) {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.intro .explain .more {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		color: #2AAEC4;
		margin-left: 145rpx;
	}
	.intro .explain .more image {
		width: 21rpx;
		height: 21rpx;
	}
	.intro .time {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 82rpx;
		font-size: 20rpx;
		color: #999999;
	}
	.intro .time .right {
		display: flex;
		align-items: center;
	}
	.intro .time .right .show {
		box-sizing: border-box;
		margin-left: 10rpx;
	}
	.intro .time .right image {
		width: 28rpx;
		height: 28rpx;
		border-radius: 50%;
		margin-left: -14rpx;
	}
	.intro .time .right image:first-child {
		margin-left: 0;
	}
</style>
