<template>
	<view class="content">
		<!-- 左边栏 -->
		<scroll-view scroll-y class="left-aside">
			<view v-for="(item, index) in secondKind" :key="index" class="f-item" :class="{active: index === currentId}" @click="tabtap(item,index)">
				{{item.name}}
			</view>
		</scroll-view>
		<!-- 右边栏 -->
		<scroll-view scroll-with-animation scroll-y class="right-aside" >
			<view v-for="(item,index) in thirdKind" :key="item.id" class="s-list" :id="'main-'+item.id" @tap="toKindList(index,thirdKind)">
				<view class="item-img">
					<image class="item-img-img" :src="item.kind_img"></image>
				</view>
				
				<view class="item-content-father">
					<view class="item-content">
						<image class="item-content-img" :src="item.kind_icon" mode=""></image>
						<text class="s-item">{{item.name}}</text>
					</view>
				</view>
				
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
				thirdKind: [],
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 0,
			}
		},
		onLoad() {
			// 获取分类数据
			uni.showLoading();
			this.$api.getKinds().then(res =>{
				res.data.forEach(item=>{
					console.log(item.name);
					if(this.oneKind === item.name) {
						this.secondKind = item.children;
						this.thirdKind = this.secondKind[0].children;
						
					}
				})
				uni.hideLoading();
			})
		},
		methods: {
			tabtap(item,index){
				this.thirdKind = item.children;
				this.currentId = index;
			},
			toKindList(selectID,tabBars) {
				//传递三级分类去商品列表
				uni.navigateTo({url: 'kindlist?selectID='+ JSON.stringify(selectID) +'&tabBars='+ JSON.stringify(tabBars)});
			}
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
	/* 选择菜单后的样式 */
	.active {
		color: rgba(0,128,0,1);		
	}
	.active::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		height: 36upx;
		width: 8upx;
		background-color: rgba(0,128,0,1);
		border-radius: 0 4px 4px 0;
		opacity: .8;
	}
	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
		display: flex;
		flex-direction: column;
		background-color: rgba(230,230,230,1);
		height: 100vh;
	}
	.s-list{
		width: 94%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		border-radius: 25upx;
		padding: 10upx;
		box-shadow: 2upx 2upx 2upx 2upx rgba(179,179,179,0.4);
		margin-top: 20upx;
	}
	.item-img-img {
		width: 480upx;
		height: 120upx;
	}
	.item-content-father {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.item-content {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		/* margin-left: -350upx; */
	}
	.item-content-img {
		width: 50upx;
		height: 50upx;
	}
	
</style>
