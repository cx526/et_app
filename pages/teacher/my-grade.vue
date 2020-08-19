<template>
	<view>
		<!-- grade-info -->
		<view class="grade-info">
			<view class="grade">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-entry-bg.png"></image>
				<view class="context">
					<view class="topic">
						<text>林头幼儿园中班2班</text>
						<text>ET00888888</text>
					</view>
					<view class="teacher">
						<text>王老师</text>
						<text>13488888888</text>
					</view>
					<view class="number">
						<text>人数：</text>
						<text>3/20</text>
					</view>
				</view>
				
			</view>
		</view>
		<!-- search -->
		<view class="search-box" id="search">
			<view class="search">
				<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/search.png" class="icon-search"></image>
				<input 
				type="text" 
				placeholder="请输入学号/学生姓名/家长姓名" 
				placeholder-style="font-size: 30rpx;color: #C5C5C5"/>
				<view class="right">
					<text>搜索</text>
				</view>
			</view>
		</view>
		<!-- students -->
		<view class="students-list">
			<scroll-view scroll-y :style="{maxHeight: maxHeight}">
				<block v-for="n in 10" :key="n">
					<view class="item">
						<view class="left">
							<view class="line">
								<text>{{n+1}}</text>
							</view>
							<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/user-default.png" mode=""></image>
							<view class="user">
								<view class="small">小朋友</view>
								<view class="big">
									<text>家长</text>
									<text>13488888888</text>
								</view>
							</view>
						</view>
						<view class="right">
							<image 
							src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/teacher-icon-04.png" 
							mode="widthFix"
							@tap="goInfo"></image>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxHeight: 0
			}
		},
		onReady() {
			const res = uni.getSystemInfoSync();
			console.log(res)
			const query = uni.createSelectorQuery().in(this);
			query.select('#search').boundingClientRect(data => {
			  console.log("得到布局位置信息" + JSON.stringify(data));
				this.maxHeight = res.windowHeight - parseInt(data.top + data.height + 20) + 'px';
				console.log(this.maxHeight)
			}).exec();
		},
		methods: {
			// 跳转到成员信息
			goInfo() {
				uni.navigateTo({
					url: '/pages/teacher/student-info'
				})
			}
		}
	}
</script>
<style>
	page {
		background: #ebf8ff;
	}
</style>
<style>
	/* grade-info */
	.grade-info {
		box-sizing: border-box;
		padding: 32rpx;
	}
	.grade-info .grade {
		box-sizing: border-box;
		position: relative;
	}
	.grade-info image {
		width: 100%;
		height: 300rpx;
	}
	.grade-info .context {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		padding: 40rpx 26rpx 40rpx 32rpx;
		width: 100%;
	}
	.grade-info .topic {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.grade-info .topic text:nth-child(1) {
		font-size: 32rpx;
		color: #fff;
		font-weight: bold;
		flex: 1;
	}
	.grade-info .topic text:nth-child(2) {
		flex-shrink: 0;
		background: rgba(0,0,0,0.3);
		font-size: 28rpx;
		box-sizing: border-box;
		padding: 4rpx 20rpx;
		border-radius: 24rpx;
		color: #fff;
		text-align: center;
	}
	.grade-info .teacher {
		color: #fff;
		font-size: 28rpx;
		margin-top: 24rpx;
	}
	.grade-info .teacher text:nth-child(1) {
		margin-right: 18rpx;
	}
	.grade-info .number {
		box-sizing: border-box;
		margin-top: 78rpx;
		font-size: 32rpx;
		color: #fff;
	}
	/* search */
	.search-box {
		box-sizing: border-box;
		padding: 0 34rpx 40rpx 34rpx;
		background: #ebf7ff;
	}
	.search-box.active {
		background: #fff;
	}
	.search-box .search {
		height: 80rpx;
		box-sizing: border-box;
		background: #fff;
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		border-radius: 40rpx;
	}
	.search-box input {
		flex: 1;
	}
	.search-box .icon-search {
		width: 40rpx;
		height: 40rpx;
		flex-shrink: 0;
		margin-right: 12rpx;
	}
	.search-box .right {
		position: absolute;
		right: 0;
		top: 0;
		height: 80rpx;
		width: 150rpx;
		display: flex;
		background-image: linear-gradient(to right,#3ab4d2, #66dbe5);
		font-size: 30rpx;
		align-items: center;
		border-bottom-right-radius: 40rpx;
		border-top-right-radius: 40rpx;
		box-sizing: border-box;
		color: #fff;
		justify-content: center;
	}
	.search-box .right image {
		width: 40rpx;
		height: 40rpx;
		margin-right: 12rpx;
	}
	/* students */
	.students-list {
		box-sizing: border-box;
		padding: 0 34rpx;
	}
	.students-list scroll-view {
		box-sizing: border-box;
		background: #fff;
		box-shadow: 0 0 20rpx #ddd;
		border-radius: 20rpx;
		padding: 0 26rpx;
	}
	.students-list .item {
		border-bottom: 1px dashed #b3b3b3;
		display: flex;
		align-items: center;
		height: 136rpx;
		display: flex;
		align-items: center;
	}
	.students-list .item:last-child {
		border-bottom: none;
	}
	.students-list .left {
		flex: 1;
		display: flex;
		align-items: center;
	}
	.students-list .line {
		width: 40rpx;
		height: 84rpx;
		background-image: linear-gradient(to bottom,#9BE6E7, #7BCFEC);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #fff;
		border-top-left-radius: 12rpx;
		border-bottom-left-radius: 12rpx;
	}
	.students-list .left image {
		width: 84rpx;
		height: 84rpx;
		margin: 0 20rpx;
	}
	.students-list .left .big {
		font-size: 26rpx;
		color: #808080;
	}
	.students-list .left .small {
		font-size: 30rpx;
		font-weight: bold;
	}
	.students-list .right {
		flex-shrink: 0;
	}
	.students-list .right image {
		width: 40rpx;
	}
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
</style>
