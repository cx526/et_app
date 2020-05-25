<template>
	<view class="content">
		<view class="left-position">
			<icon class="search-icon" type="search"/>
			<input class="search-input" type="text"  :value="content" @input="inputChange":placeholder="placeholderString" />
		</view>
		<view class="search-button" @tap="searchData">
			<text>搜 索</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		content: String,
		placeholderString: String,
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
.content {
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
}
.title-content {
	font-size: 25upx;
	margin: 0 auto;
}
.search-input {
	font-size: 25upx;
	color: #868886;
	padding-left: 10upx;
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
}
</style>
