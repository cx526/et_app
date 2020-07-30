<template>
	<view>
		<!-- tab切换线上/线下 -->
		<view class="tab-box">
			<view 
			v-for="(item, index) in tabList" 
			:key="index"
			@click="changeTab(index)"
			:class="currentIndex == index ? 'active' : ''">
				<text>{{ item.title }}</text>
				<text>({{ item.number }})</text>
			</view>
		</view>
		<view class="content">
			
			<!-- 线上部分 -->
			<view style="width: 100%;" v-if="isStatus">
				<et-book-cart-list v-if="bookCatShow" :optionData="{optionType:'cart'}"></et-book-cart-list>
			</view>
			<!-- 线下部分 -->
			<view class="offline-box" 
			v-if="!isStatus" 
			:style="{'min-height': minHeight}">
				<view class="notice-box">
					<text>我的借书币：</text>
					<text>100</text>
					<text>剩余免费本书：</text>
					<text>0</text>
				</view>
				<!-- 没有书籍时显示 -->
				<view class="none-books" 
				v-if="tabList[0].number == 0"
				@tap="chooseBooks">
					<view class="none">
						<image src="../../static/cart/add.png" mode=""></image>
						<text>请先添加书本</text>
					</view>
				</view>
				<!-- 书篮存在 -->
				<view class="books-box" v-else>
					<scroll-view scroll-y
					:style="'height:' + scrollHeight"
					>
						<view class="item" 
						v-for="(item, index) in offlineBooksList"
						:key="index">
						<view class="goods-info">
							<view class="left">
								<checkbox 
								:checked="item.isSelect" 
								style="transform: scale(0.7);"
								:disabled="item.stock.usageCount === 0"
								@tap="selechBook(item)"/>
							</view>
							<view class="main">
								<!-- 库存为零时显示 -->
								<view class="none-stock" v-if="item.stock.usageCount === 0">
									<view class="none-notice">
										<text>暂时</text>
										<text>借完</text>
									</view>
								</view>
								<image :src="item.forGoodsPic[0].url" mode=""></image>
								<view class="topic">
										<text>{{ item.title }}</text>
								</view>
							</view>
							<view class="right">
								<view style="color: #549EAB;font-size: 24rpx;margin-top: 8rpx;">X1
								</view>
							
							</view>
							
						</view>
						<view class="price-box">
							<view class="price">
								<text>借书币：</text>
								<text style="color: #f00;font-weight: blod;">39.00</text>
							</view>
							<image src="../../static/cart/rubbish.png" mode=""
							@tap="delBook(item.id)"></image>
						</view>
							
							
						</view>
					</scroll-view>
				</view>
				<!-- 底部 -->
				<view class="bottom-box">
					<view class="left">
							<checkbox value="cb" 
							:checked="offlineAllSelect" 
							style="transform: scale(0.7);"
							@tap="selectAllBooks" />
							<text>全选</text>
					</view>
					<view class="center">
						<view><text>借书币：30</text></view>
						<view><text style="color: #999;">押金：40(可退)</text></view>
					</view>
					<view class="right">
						<view class="tag-style" style="background-color: #808080;">
							<text @tap="delBooksList">删除</text>
						</view>
						<view class="tag-style" style="background-color: #2AA145;">
							<text>借阅</text>
						</view>
					</view>
				</view>
			
			
			
			</view>
		</view>
	</view>
	
</template>

<script>
import etBookCartList from '../../components/etBookCartList.vue'

export default {
	components: {
		etBookCartList
	},
	data() {
		return {
			minHeight: 0,
			scrollHeight: 0,
			flag: '',
			bookCatShow:false,
			isStatus: true,
			currentIndex: 0,
			tabList: [
				{
					title: '智慧图书馆',
					number: 2
				},
				{
					title: '线上书馆',
					number: 3
				}
			],
			offlineAllSelect: false,
			offlineBooksList: []
		}
	},

	onShow(){
		this.bookCatShow = true;
		
		
		// 线下逻辑
		// 判断当前页面显示线上/线下
		if(this.flag) {
			this.isStatus  = false;
			this.currentIndex = 0
		}else {
			this.isStatus  = true;
			this.currentIndex = 1
		}
		// 获取线上/线下书篮的书籍数量
		this.tabList[0].number = uni.getStorageSync("offlineCartList").length;
		this.tabList[1].number = uni.getStorageSync("carListInfo").length;
		this.offlineBooksList =  uni.getStorageSync("offlineCartList");
		// 实时更新线下缓存书籍的库存
		this.upDateStock()
		
	},
	onHide() {
		this.bookCatShow = false;
		
		// 线下逻辑
		this.flag = ''
	},
	onLoad(option){
		this.bookCatShow = true;
		
		// 线下逻辑
		this.flag = option.flag;
		// 获取屏幕高度
		uni.getSystemInfo({
			success: res => {
				this.minHeight = (res.windowHeight - 40) + 'px'
				this.scrollHeight = (res.windowHeight - res.navigationBarHeight - res.statusBarHeight) + 'px'
			}
		})
	},
	methods: {
		// 线上/线下显示切换
		changeTab(index) {
			this.currentIndex = index;
			switch(index) {
				case 0:
					this.isStatus = false;
					break;
				case 1:
					this.isStatus = true
					break;
				default:
					this.isStatus = true
			}
		},
		// 选取书籍
		chooseBooks() {
			uni.switchTab({
				url: '../library/library'
			})
		},
		// 实时更新线下缓存书籍的库存
		upDateStock() {
			let goodsIDs = [];
			this.offlineBooksList.forEach(item=>{
				goodsIDs.push(item.id);
			});
			this.$api.preOrderCheckStock({ goodsIDs : goodsIDs, goodsType : 'online'}).then(res=>{
				res.data.map((item,index)=>{
					this.offlineBooksList.map((sitem,sindex)=>{
						// 动态添加isSelect属性用于判定是否选中
						sitem.isSelect = false;
						if(item.goods_id === sitem.id){
							this.offlineBooksList[sindex].usageCount = item.usageCount;
						}
					})
				})
			}) 
		},
		// 选择书本(点击复选框) 
		selechBook(item) {
			let flag = true;
			item.isSelect = !item.isSelect;
			this.offlineBooksList.map(list => {
				if(!list.isSelect) {
					flag = false;
				}
			})
			this.offlineAllSelect = flag
		},
		// 全选/全部选
		selectAllBooks() {
			this.offlineAllSelect = !this.offlineAllSelect;
			this.offlineBooksList.map(item => {
				// 如果库存数为0,依然不给选
				if(item.stock.usageCount) {
					item.isSelect = this.offlineAllSelect
				}
			})
		},
		// 删除书籍(单独)
		delBook(id) {
			let dataList = this.offlineBooksList;
			uni.showModal({
				title: '是否确认移除此书籍?',
				success: res => {
					if(res.confirm) {
						dataList.map((item, index) => {
							if(item.id === id) {
								dataList.splice(index, 1)
							}
						})
						this.offlineBooksList = dataList;
						uni.setStorageSync("offlineCartList", this.offlineBooksList);
						this.tabList[0].number = uni.getStorageSync("offlineCartList").length;
					}
				}
			})
		},
		// 点击删除键
		delBooksList() {
			let flag = false;
			let dataList = this.offlineBooksList;
			// 判断是否选中书籍
			this.offlineBooksList.map((item, index) => {
				if(item.isSelect) {
					flag = true;
				}
			})
			
			if(!flag) {
				uni.showToast({
					title: '请选择要移除的书籍',
					duration:1000,
					icon: 'none'
				})
			}else {
				uni.showModal({
					title: '是否确认要移除此书籍?',
					success: res => {
						if(res.confirm) {
							for(let i = 0; i <  dataList.length; i++) {
								if(dataList[i].isSelect) {
									dataList.splice(i, 1);
									i--;
								}
							}
							this.offlineBooksList = dataList;
							uni.setStorageSync("offlineCartList", this.offlineBooksList);
							this.tabList[0].number = uni.getStorageSync("offlineCartList").length
						}
					}
				})
			}
		},
		
		
		
	}
}
</script>

<style scoped>
	/* tab切换 */
	.tab-box {
		box-sizing: border-box;
		display: flex;
		line-height: 80rpx;
		color: #333;
		font-size: 28rpx;
	}
	.tab-box view {
		flex: 1;
		text-align: center;
	}
	.tab-box view.active {
		color: #fff;
		background: #007AFF;
	}
	/* 线下部分 */
	.offline-box {
		height: 100%;
		background-color: rgba(249,249,249,1);
		width: 100%;
		position: relative;
		box-sizing: border-box;
		padding-bottom: 120rpx;
	}
	.offline-box .notice-box {
		box-sizing: border-box;
		text-align: center;
		font-size: 30rpx;
		background: #fff;
		color: #333;
		line-height: 60rpx;
		margin-top: 20rpx;
	}
	.offline-box .notice-box text:nth-child(2) {
		color: rgb(0,128,0);
		margin-right: 12rpx;
	}
	.offline-box .notice-box text:nth-child(4) {
		color: #f00;
	}
	.offline-box .none-books {
		text-align: center;
		position: absolute;
		left: 50%;
		top: 45%;
		transform: translate(-50%,-50%);
	}
	.offline-box .none-books .none {
		display: flex;
		flex-direction: column;
		color: #9FB2BF;
		font-size: 24rpx;
	}
	.offline-box .none-books .none image {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 10rpx;
	}
	/* 书篮存在 */
	.offline-box scroll-view {
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-bottom: 20rpx;
	}
	.offline-box .item {
		background: #fff;
		box-shadow: 0rpx 0rpx 20rpx rgba(179,179,179,0.3);
		border-radius: 16rpx;
		margin-top: 24rpx;
		padding: 0 20rpx 20rpx 20rpx;
		width: 98%;
		margin-left: 1%;
		box-sizing: border-box;
	}
	.offline-box scroll-view .goods-info {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		
	}
	.offline-box scroll-view .main {
		font-size: 30rpx;
		display: flex;
		box-sizing: border-box;
		margin: 0 52rpx 0 24rpx ;
		align-items: center;
		position: relative;
	}
	.offline-box  .main .none-stock {
		width: 230rpx;
		height: 230rpx;
		background: rgba(157,160,174,.6);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 12;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.offline-box .main .none-notice {
		background-color: rgba(110,116,125,.8);
		color: #FFFFFF;
		width: 160rpx;
		height: 160rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		border-radius: 50%;
	}
	.offline-box scroll-view .main image {
		width: 230rpx;
		height: 230rpx;
		margin-right: 12rpx;
	}
	.offline-box scroll-view .main .topic {
		width: 250rpx;
		text-align: left;
	}
	.offline-box scroll-view .title {
		font-weight: bold;
	}
	.offline-box scroll-view .right {
		display: flex;
	}
	.offline-box scroll-view .right image {
		width: 35rpx;
		height: 35rpx;
	}
	.offline-box .item .price-box {
		box-sizing: border-box;
		display: flex;
		padding: 10rpx 20rpx 0 80rpx;
		align-items: center;
	}
	
	.offline-box .item .price {
		flex: 1;
		font-size: 24rpx;
	}
	.offline-box .item .price-box image {
		width: 30rpx;
		height: 30rpx;
		flex-shrink: 0;
	}
	/* 底部 */
	.bottom-box {
		position: fixed;
		width: 100%;
		background: #fff;
		z-index: 20;
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		display: flex;
		font-size: 26rpx;
		left: 0;
		bottom: 0;
	}
	.bottom-box .left {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-right: 40rpx;
	}
	.bottom-box .center {
		box-sizing: border-box;
		margin-right: 80rpx;
	}
	.bottom-box .right {
		display: flex;
	}
	.bottom-box .right .tag-style {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-radius: 20rpx;
		color: #FFFFFF;
		padding: 10rpx 20rpx;
		width: 80rpx;
		height: 45rpx;
		margin-right: 20rpx;
		font-size: 30rpx;
	}
	
	/* 线上部分 */
	.content {
		width: 100%;
		display: flex;
	}
</style>
