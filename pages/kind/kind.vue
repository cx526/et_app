<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in secondKind" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in thirdKind" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<!-- <view class="t-list">
					<view @click="navToList(item.id, titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.picture"></image>
						<text>{{titem.name}}</text>
					</view>
				</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//一级分类
				oneKind: '绘本',
				// 二级分类
				secondKind: [],
				// 三级分类
				thirdKind: [] 
			}
		},
		onLoad() {
			// 获取分类数据
			this.$api.getKinds().then(res =>{
				res.data.forEach(item=>{
					console.log(item.name);
					if(this.oneKind === item.name) {
						this.secondKind = item.children;
						this.thirdKind = this.secondKind[0].children;
						
					}
				})
				// console.log(res.data);
			})
		}
	}
</script>

<style>
	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
	}
</style>
