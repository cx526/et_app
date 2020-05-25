<template>
	<view class="content">
		<view class="top-position">
			<text>{{search.title}}</text>
			<view class="top-img" v-if='search.img' @tap="deleteData">
				<image :src="search.img"  style="height: 40upx; width: 40upx;"></image>
			</view>
		</view>
		
		<view class="content-position">
			<view class="content-father"  v-for="(item,index) in search.contentList">
				<view class="content-style" @tap="selectContent(item)">
					<text>{{item}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		search:Object
	},
	methods: {
		deleteData() {
			this.$emit('deleteData');
		},
		selectContent(e) {
			this.$emit('selectContent',e);
		}
	}
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
}
.top-position {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 30upx;
	font-weight: 500;
}
.content-position {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-flow: row;
	flex-wrap: wrap;
}
.content-father {
	padding: 10upx;
}
.content-style {
	font-size: 20upx;
	color: #939696;
	background-color: #EBF8FF;
	border-radius: 20upx;
	padding: 10upx;
}

</style>
/*  */