<template>
	<view style="padding: 40rpx 25rpx;">
		<view class="box">
			<view class="title">
				<view class="subTitle" v-for="(item, index) in navList" :key="index" :class="currentIndex === index ? ' active' : ''" >
					<text>{{ item.title }}</text>
					<text class="line" v-show="currentIndex === index"></text>
				</view>
			</view>
			<view class="list" id="list">
				<swiper :style="{'height': swiperHeight}" @change="swiperChange">
					<swiper-item class="favourite">
						<view class="item" v-for="(item, index) in bookList" :key="index">
							<image :src="$aliImage + 'book-demo.png'" mode="widthFix" class="cover"></image>
							<view class="context">
								<view class="book-title">
									<text>爸爸到底有什么用?</text>
								</view>
								<view class="book-label">
									<view>3-6岁</view>
									<view>科普百科</view>
								</view>
								<view class="book-icon">
									<view class="icon" style="margin-right: 30rpx; color: #B3B3B3;">
										<image :src="$aliImage + 'favourite-icon-02.png'" mode=""></image>
										<text>取消收藏</text>
									</view>
									<view class="icon" style="color: #2AAEC4;">
										<image :src="$aliImage + 'favourite-icon-01.png'" mode=""></image>
										<text>加入书架</text>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
					<swiper-item class="wish">
						<view class="item" v-for="(item, index) in wishBook" :key="index">
							<image :src="$aliImage + 'book-demo.png'" mode="widthFix" class="cover"></image>
							<view class="context">
								<view class="book-title" style="font-size: 28rpx;">
									<text>爸爸到底有什么用?</text>
								</view>
								<view class="publisher">
									<text>路边出版社</text>
								</view>
								<view class="name">
									<text>小明</text>
								</view>
							</view>
						</view>
						
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- btn -->
		<view style="margin-top: 40rpx;" v-if="currentIndex === 1">
			<Btn title="添加心愿书单" @handleClick="handleClick" />
		</view>
		
	</view>
</template>

<script>
	import Btn from '@/pagesFavourite/components/btn.vue'
	export default {
		data() {
			return {
				$aliImage: this.$aliImage,
				bookList: [],
				wishBook: [1,2,3],
				swiperHeight: 0, // 定义swiper高度
				currentIndex: 0,
				navList: [
					{
						title: '喜欢',
						isShow: false
					},
					{
						title: '心愿',
						isShow: false
					}
				],
				itemHeight: 0 ,
			}
		},
		components: {
			Btn
		},
		onLoad() {
			
		},
		onReady() {
			setTimeout(() => {
				this.bookList = [1,2,3,4,5,6]
				this.getEleRect('.favourite .item')
			}, 1000)
		},
		onReachBottom() {
			console.log('loadingMore')
		},
		methods: {
			// 获取元素高度
			getEleRect(ele) {
				setTimeout(() => {
					const query = uni.createSelectorQuery().in(this);
					query.select(ele).boundingClientRect(data => {
					  this.itemHeight = data.height
						switch(ele) {
							case '.favourite .item':
							this.swiperHeight = this.itemHeight * this.bookList.length + 'px'
							break
							case '.wish .item':
							this.swiperHeight = this.itemHeight * this.wishBook.length + 'px'
							break
							default:
							break
						}
					}).exec();
				}, 200)
			},
			// 监听swiper改变事件
			swiperChange(event) {
				this.currentIndex = event.detail.current
				switch(this.currentIndex) {
					case 0:
					this.getEleRect('.favourite .item')
					break
					case 1:
					this.getEleRect('.wish .item')
					break
					default:
					break
				}
			},
			// 按钮点击事件
			handleClick() {
				uni.navigateTo({
					url: '/pagesFavourite/favourite/wish-book'
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
	.box {
		width: 100%;
		background: #ffffff;
		border-radius: 30rpx;
		box-shadow: 0px 3rpx 6rpx 0px rgba(0,0,0,0.16); 
	}
	.box .title {
		line-height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		
	}
	.box .title .subTitle {
		flex: 1;
		text-align: center;
		position: relative;
	}
	.box .title .subTitle.active {
		color: #2aaec4;
		font-weight: 700;
	}
	.box .title .line {
		position: absolute;
		width: 98rpx;
		height: 12rpx;
		background: #2aaec4;
		border-radius: 6px;
		left: 50%;
		bottom: 19%;
		transform: translate(-50%,-50%);
	}
	.box .list {
		box-sizing: border-box;
		padding: 0 25rpx;
	}
	.box .list .item {
		box-sizing: border-box;
		padding: 13rpx 0;
		border-bottom: 1rpx dashed #B3B3B3;
		display: flex;
		align-items: center;
	}
	.box .list .item:last-child {
		border-bottom: 0;
	}
	.box .list .cover {
		flex-shrink: 0;
		width: 200rpx;
		height: 200rpx;
		margin-right: 6rpx;
	}
	.box .list .context {
		flex: 1;
		box-sizing: border-box;
	}
	.box .list .context .book-title {
		font-size: 28rpx;
		font-weight: 700;
	}
	.box .list .context .book-label {
		display: flex;
		align-items: center;
		margin-top: 6rpx;
	}
	.box .list .context .book-label view {
		font-size: 20rpx;
		color: #AA6428;
		font-weight: 700;
		box-sizing: border-box;
		padding: 0 12rpx;
		line-height: 28rpx;
		border-radius: 15rpx;
		margin-right: 6rpx;
		background-color: #FFFBE6;
	}
	.box .list .context .book-icon {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 24rpx;
		margin-top: 38rpx;
		font-weight: 700;
		box-sizing: border-box;
		padding-right: 12rpx;
	}
	.box .list .context .book-icon .icon {
		display: flex;
		align-items: center;
	}
	.box .list .context .book-icon image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 6rpx;
	}
	.box .list .context .publisher {
		font-size: 28rpx;
		font-weight: 700;
		margin: 18rpx 0;
	}
	.box .list .context .name {
		font-size: 28rpx;
		font-weight: 700;
	}

</style>
