<template>
	<view>
		<!-- <view class="left-position">
			<icon class="search-icon" type="search"/>
			<input class="search-input" type="text"  :value="content" @input="inputChange":placeholder="placeholderString" />
		</view>
		<view class="search-button" @tap="searchData">
			<text>搜 索</text>
		</view> -->
		<view class="search-box" id="search">
			<view class="search">
				<image :src="$aliImage + 'search.png'" class="icon-search"></image>
				<input type="text"  placeholder-style="font-size: 30rpx;color: #C5C5C5" :value="content" @input="inputChange" :placeholder="placeholderString" />
				<view class="right" @tap="searchData">
					<image :src="$aliImage + 'classify.png'"></image>
					<text>搜索</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		content: String,
		placeholderString: String,
	},
	data() {
		return {
			$aliImage: this.$$aliImage
		}
	},
	methods: {
		searchData() {
			console.log('123');
			this.$emit('searchData',this.$props.content);
		},
		inputChange(e) {
			this.$emit('inputChangeAction', e)
		}
	}
}
</script>

<style>
/* .content {
	border-radius: 20upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 10upx;
	background-color: #E6E6E6;
}
.left-position {
	display: flex;
	justify-content: row;
	align-items: center;
	width: 75%;
}
.title-content {
	font-size: 25upx;
	margin: 0 auto;
}
.search-input {
	font-size: 25upx;
	color: #868886;
	padding-left: 10upx;
	width: 100%;
}
.search-button {
	color: #FFFFFF;
	background-color: #2AAEC4;
	font-size: 25upx;
	font-weight: 500;
	border-top-right-radius:20upx;
	border-bottom-right-radius:20upx;
	padding-left: 50upx;
	padding-right: 50upx;
	padding-top: 30upx;
	padding-bottom: 30upx;
} */
/* search */
.search-box {
	box-sizing: border-box;
	padding: 30rpx 0;
	/* background: #ebf7ff; */
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
.search-box .search.active {
	border: 1px solid #ebf7ff;
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
	background-image: linear-gradient(180deg, #7BCFEC , #9BE6E7);
	font-size: 30rpx;
	align-items: center;
	border-bottom-right-radius: 40rpx;
	border-top-right-radius: 40rpx;
	box-sizing: border-box;
	padding-left: 18rpx;
	color: #fff;
}
.search-box .right image {
	width: 40rpx;
	height: 40rpx;
	margin-right: 12rpx;
}

</style>
