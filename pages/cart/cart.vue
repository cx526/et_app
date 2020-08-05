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
				<text v-if="item.number > 0">({{ item.number }})</text>
			</view>
		</view>
		<view class="content">
			
			<!-- 线上部分 -->
			<view style="width: 100%;" v-if="isStatus">
				<et-book-cart-list 
				v-if="bookCatShow" 
				:optionData="{optionType:'cart'}"
				@deleteData="deleteData"
				@delectSelect="delectSelect"></et-book-cart-list>
			</view>
			<!-- 线下部分 -->
			<view class="offline-box" 
			v-if="!isStatus" 
			>
				<offline-cart-list 
				:count="tabList[0].number" 
				:offlineBooksList="offlineBooksList"
				:scrollHeight="scrollHeight"
				:minHeight="minHeight"
				:popUpWidth="popUpWidth"
				@countChange="countChange"></offline-cart-list>
			</view>
		</view>
	</view>
	
</template>

<script>
import etBookCartList from '../../components/etBookCartList.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import offlineCartList from '@/components/offline-components/offline-cart-list.vue'
export default {
	components: {
		etBookCartList,
		uniPopup,
		offlineCartList
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
					title: '书柜取还',
					number: 2
				},
				{
					title: '快递取还',
					number: 3
				}
			],
			offlineAllSelect: false,
			offlineBooksList: [],
			popUpWidth: 0
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
		// 实时更新线下缓存书籍的库存
		this.upDateStock()
		// 线下逻辑
		this.flag = option.flag;
		// 获取屏幕高度
		uni.getSystemInfo({
			success: res => {
				this.minHeight = (res.windowHeight - 40) + 'px'
				this.scrollHeight = (res.windowHeight - res.navigationBarHeight - res.statusBarHeight) + 'px'
				this.popUpWidth = res.windowWidth * 0.8 + 'px'
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
		// 监听线上点击删除图标,更新数据
		deleteData() {
			this.tabList[1].number = uni.getStorageSync("carListInfo").length
		},
		// 监听线上点击批量删除按钮,更新数据
		delectSelect() {
			this.tabList[1].number = uni.getStorageSync("carListInfo").length
		},
		// 更新页面数据
		countChange() {
			this.tabList[0].number = uni.getStorageSync("offlineCartList").length
		},
		// 实时更新线下缓存书籍的库存
		upDateStock() {
			let goodsIDs = [];
			this.offlineBooksList.forEach(item => {
				goodsIDs.push(item.id);
			});
			this.$api.preOrderCheckStock({ goodsIDs: goodsIDs, goodsType: 'online' }).then(res => {
				console.log(res)
				res.data.map((item, index) => {
					this.offlineBooksList.map((sitem, sindex) => {
						// 动态添加isSelect属性用于判定是否选中
						if(sitem.isSelect) {
							sitem.isSelect = sitem.isSelect
						}else {
							sitem.isSelect = false
						}
						if (item.goods_id === sitem.id) {
							// 同步更新本地缓存书籍数量
							this.offlineBooksList[sindex].usageCount = item.usageCount;
						}
					});
				});
			});
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
		background: #EBF8FF;
	}
	.tab-box view {
		flex: 1;
		text-align: center;
		border-bottom: 6px solid #BDEBF5;
		
	}
	.tab-box view.active {
		border-color: #30AAC3;
		color: #3FB0C8;
	}
	.offline-box {
		height: 100%;
		background-color: rgba(249, 249, 249, 1);
		width: 100%;
		position: relative;
		box-sizing: border-box;
		padding-bottom: 120rpx;
	}
	/* 线上部分 */
	.content {
		width: 100%;
		display: flex;
	}
</style>
