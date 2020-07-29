<template>
	<view>
		<!-- 头部 -->
		<view class="header-box">
			<view class="topic">
				<text>林头幼儿园智慧童书馆欢迎您！</text>
			</view>
			<view class="user-info">
				<text>我的积分：10000</text>
				<text>我的借书币：300</text>
			</view>
		</view>
		<!-- 搜索框 -->
		<view class="search-box">
			<input type="text" 
			placeholder="书籍名称/作者姓名"
			placeholder-style="font-size: 12px; color: #999" />
			<view class="icon">
				<icon class="search-icon" type="search"/>
			</view>
		</view>
		<!-- 分类 -->
		<view class="type-box">
			<view class="topic">
				<view class="left">
					<view class="line"></view>
					<view class="text">
						<text>童书分类</text>
					</view>
				</view>
				<view class="right">
					<text>展开</text>
					<image src="../../static/library/icon-down.png" mode=""></image>
				</view>
			</view>
			<!-- 列表 -->
			<view class="list">
				<template v-if="productList && productList.length > 0">
					<view class="item" v-for="(item, index) in productList" :key="index">
						<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589935565682.jpg" mode="" class="show"></image>
						<view class="title">
							<text>标题标题标题标题标题标题</text>
						</view>
						<view class="price">
							<text>借书币：30</text>
						</view>
						<view class="label">
							<text>3-6岁</text>
							<text>自我认知</text>
						</view>
						<view class="recommend">
							<image src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_zan.png" mode=""></image>
							<text>331人推荐</text>
						</view>
					</view>
				</template>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [1,2,3,4]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	/* header */
	.header-box {
		box-sizing: border-box;
		padding: 32rpx 20rpx;
		color: #333;
		font-size: 30rpx;
	}
	.header-box .user-info {
		margin-top: 40rpx;
	}
	.header-box .user-info text {
		margin-right: 24rpx;
	}
	/* search */
	.search-box {
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
	}
	.search-box input {
		flex: 1;
		height: 80rpx;
		box-sizing: border-box;
		border: 1px solid #999;
		border-radius: 8rpx;
		padding-left: 18rpx;
	}

	.search-box .icon {
		display: flex;
		justify-content: center;
		border: 1px solid #999;
		border-radius: 8rpx;
		box-sizing: border-box;
		flex-shrink: 0;
		width: 80rpx;
		height: 80rpx;
		margin-left: 24rpx;
	}
	.search-box .search-icon {
		position: relative;
		top: 10rpx;
	}
	/* type */
	.type-box {
		box-sizing: border-box;
		padding: 20rpx;
	}
	.type-box .topic {
		box-sizing: border-box;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
	}
	.type-box .topic .left,
	.type-box .topic .right {
		display: flex;
		align-items: center;
	}
	.type-box .topic .line {
		width: 8rpx;
		height: 80rpx;
		background: #00FF00;
		margin-right: 30rpx;
	}
	.type-box .topic .text {
		color: #00FF00;
	}
	.type-box .topic .right text {
		color: #00B4C9;
	}
	.type-box .topic .right image {
		width: 30rpx;
		height: 30rpx;
		margin-left: 12rpx;
	}
	/* list */
	.type-box .list {
		box-sizing: border-box;
		display: flex;
		padding: 0 20rpx;
		flex-wrap: wrap;
	}
	.type-box .list .item {
		text-align: center;
		box-sizing: border-box;
		width: 48%;
		margin-top: 20rpx;
		box-shadow: 0rpx 0rpx 20rpx rgba(179,179,179,0.3);
		border-radius: 8rpx;
		padding: 20rpx 24rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.type-box .list .item:nth-child(2n-1) {
		margin-right: 10rpx;
	}
	.type-box .list .item:nth-child(2n) {
		margin-left: 10rpx;
	}
	.type-box .list .show {
		width: 280rpx;
		height: 260rpx;
	}
	.type-box .list .title {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 30rpx;
		color: rgb(94,94,94);
		padding-top: 8rpx;
	}
	.type-box .list .price {
		font-size: 30rpx;
		color: rgb(94,94,94);
		padding-top: 8rpx;
		text-align: left;
	}
	.type-box .list .label {
		
		display: flex;
		font-size: 22rpx;
		box-sizing: border-box;
		padding-top: 8rpx;
	}
	.type-box .list .label text {
		background-color: #FFFBE6;
		color: #AA6428;
		margin-right: 4rpx;
	}
	.type-box .list .recommend {
		display: flex;
		align-items: center;
		color: #BABABA;
		font-size: 25rpx;
		padding-top: 8rpx;
	}
	.type-box .list .recommend image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}
</style>
