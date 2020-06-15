<template>
	<view class="content-position">
	<!-- <view :class="[listData.length < 3 ? 'content-position-one' : 'content-position-two']"> -->
		<view class="backgroundStyle">
			<view class="content">
				 <!-- :style="{height: scrollViewHeight+'upx'}" -->
				<scroll-view  scroll-y="true"  :style=" 'height:' + scrollViewHeight +'rpx'">
					<view class="score-coontent-position">
						<view class="white-space"></view>
						<!-- 头部内容 -->
						<view class="top-position">
							<view class="top-content-left">
								<image class="top-content-left-img" src="../static/cart/money.png"></image>
								<view style="width: 20upx;"></view>
								<text>我的积分：{{coin}}</text>
							</view>
							
							<view class="top-content-right">
								<image class="top-content-right-img-one" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_getMore.png"></image>
								<image class="top-content-right-img-two" src="../static/cart/sign.png" @tap="toSign"></image>
							</view>
						</view>
						
						<view class="white-space" style="height: 20upx;"></view>
						
						<!-- banner -->
						<view class="banner-position">
							<image style="width: 100%;" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/bookcartlist_banner.png" mode="widthFix"></image>
						</view>
						
						<view class="white-space" style="height: 20upx;"></view>
						
						<!-- 列表数据 -->
						<view class="cat-detail-position">
							<view class="cat-detail" v-if="listData.length > 0" v-for="(item,index) in listData">
								<et-cart-detail :key="index" :bookID="item.id"  :select="item.select" :imgSrc="item.forGoodsPic[0].url" :title="item.title" :status="item.status" :coin="item.coin" :count="item.count" @changSelectType="changAllSelectType" @deleteData="deleteData"></et-cart-detail>
								<view class="white-space"></view>
							</view>
							<view class="cat-add-book" @tap="toKineUrl" v-if="listData.length === 0" >
								<image src="../static/cart/add.png" style="width: 200upx; height: 200upx;"></image>
								<text style="color:#9FB2BF; font-size: 30upx;">请先添加书本</text>
							</view>
						</view>
						
						<view class="white-space" style="height: 120upx;"></view>
					</view>
				</scroll-view>
				
				
				<!-- 底部栏目 -->
				<view class="bottom-position">
					<view class="bottom-content">
						<view class="bottom-check">
							<checkbox value="cb" :checked="allSelect" @tap="allSelectOrNot" />
							<text>全选</text>
						</view>
						
						<view >
							<view class="bottom-text" style="font-size: 25upx;">
								<text>合计：</text>
								<text style="color: #DB3E49;">{{bookCount}}</text>
								<text>本</text>
							</view>
							
							<view v-if="listOutShow">
								<text style="font-size: 18upx; color: #808080;">数量不在1-10范围不能计算金额</text>
							</view>
							
							<view class="price-style" v-if="!listOutShow">
								<view class="price-text">
									<text style="color: #808080;">价格：</text>
									<text style="color: #DB3E49;">{{orderInfo.afterDiscountMoney}}</text>
									<text style="color: #808080;">元</text>
								</view>
								
								<view class="price-text" style="margin-left: 15upx;">
									<text style="color: #808080;">押金：</text>
									<text style="color: #DB3E49;">{{orderInfo.deposit}}</text>
									<text style="color: #808080;">元</text>
								</view>
								
								<view class="price-text" style="margin-left: 15upx;">
									<text style="color: #808080;">合计：</text>
									<text style="color: #DB3E49;">{{orderInfo.payMoney}}</text>
									<text style="color: #808080;">元</text>
								</view>
							</view>
						</view>
						
						<view class="bottom-tag">
							<!-- <et-tag backgroundColor="#808080" title="删除" fontColor="#FFFFFF" class="tag-style" @tap="delectSelect"></et-tag>
							<et-tag backgroundColor="#2AA145" title="借阅" fontColor="#FFFFFF" class="tag-style" @tap="buySelect"></et-tag> -->
							
							<view class="tag-style" style="background-color: #808080;" @tap="delectSelect">
								<text>删除</text>
							</view>
							
							<!-- <view class="tag-style" style="background-color: #2AA145;" @tap="buySelect">
								<text>借阅</text>
							</view> -->
							
							<view class="tag-style" style="background-color: #2AA145;" @tap="preBuy">
								<text>借阅</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 借阅确认弹窗 -->
				<uni-popup ref="popup">
					<view style="display: flex; flex-direction: column; align-items: center;">
						<view class="popup-content-position">
							<view class="popup-content">
								<text>您的书籍数量为：{{selectBookCount}}，最多10本可享受优惠，是否仍要继续</text>
							</view>
							<view class="popup-button-position">
								<view class="popup-button" style="background-color: #EB5A46;" @tap='buySelect'>
									<text>确认</text>
								</view>
								
								<view class="popup-button" style="background-color: #F2D600;" @tap='toKineUrl'>
									<text>去选书</text>
								</view>
								
								<view class="popup-button" style="background-color: #C377E0;" @tap='canclePop'>
									<text>取消</text>
								</view>
							</view>
						</view>
						
					</view>
				</uni-popup>
				<!-- 借阅确认弹窗 -->
				
			</view>
		</view>
	</view>
</template>

<script>
import etCartDetail from './etCartDetail.vue'
import etTag from './etTag.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'

const bookListData = require('@/common/carDataOption');
const toUrlFunction = require('@/common/toUrlFunction');
const checkLogin = require('@/common/checkLogin');
const orderHandle = require('@/common/orderHandle');

export default {
	components: {
		etCartDetail,
		etTag
	},
	props: {
		optionData: Object
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		},
		scrollViewHeight(){
			let height = 1000;
			if(this.$props.optionData.optionType === 'kindlist'){
				height  = 800-70;
			}else{
				uni.getSystemInfo({
					success(res) {
						height  = res.screenHeight - res.navigationBarHeight - res.statusBarHeight - 70
					}
				});
				
			}
			return height 
		}
	},
	data() {
		return {
			coin:"40",
			moneyCount:"199",
			allSelect:"true",
			listData: [],
			bookCount:0,
			selectBookCount:0,
			listOutShow:Boolean,
			customerInfo:{},
			hestoryOrderInfo:{},
			orderInfo:{} //价格信息
		}
	},
	created() {
		this.getCustomerInfo();
	},
	mounted() {
		this.getCustomerInfo();
	},
	methods: {
		toKineUrl(){
			console.log(this.$props.optionData.optionType);
			if(this.$props.optionData.optionType === 'kindlist'){
				this.$emit('toKineUrl');
			}else{
				toUrlFunction.toUrl('/pages/index/kind');
			}
		},
		getCustomerInfo(){
			//没登录不显示积分
			let guestStatus = checkLogin.checkLogin(true);
			if(guestStatus){
				this.coin = 0;
				return;
			}
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.coin = res.data[0].coin;
				this.customerInfo = res.data[0];
				//获取历史订单信息
				this.$api.checkExistOrder({ custom_id: this.customerInfo.id }).then(res=>{
					this.hestoryOrderInfo = res.data;
					
					//更新数据状态
					this.statusUpdate();
				});
			});
		},
		toSign(){
			uni.navigateTo({
				url:'/pages/index/sign'
			})
		},
		// 数据更新
		statusUpdate(){
			// 获取书篮列表数据
			this.listData = bookListData.getBookListData();
			console.log(this.listData);
			
			// 获取合计金额
			this.moneyCount = bookListData.countCoin();
			
			// 获取全选状态
			this.allSelect = bookListData.countAllSelect();
			
			let bookCount = 0;
			this.listData.forEach(item=>{
				if(item.select) {
					bookCount = bookCount + 1;					
				}
			});
			this.bookCount = bookCount;
			
			//超过10本书不显示价格
			this.checkListOut();
			
			//计算当前价格
			this.orderInfo = orderHandle.orderHandle(this.customerInfo,this.bookCount,this.hestoryOrderInfo);
		},
		changAllSelectType(){
			this.statusUpdate();
		},
		// 全选与不全选
		allSelectOrNot() {
			if(this.allSelect === true) {
				this.allSelect = false;
				bookListData.allSelectOption(false);
			}else if(this.allSelect === false) {
				this.allSelect = true;
				bookListData.allSelectOption(true);
			}
			this.statusUpdate();
			
		},
		deleteData() {
			this.$emit('deleteData');
			this.statusUpdate();
		},
		// 删除所有选中的记录
		delectSelect(){
			this.$emit('delectSelect');
			bookListData.deleteSelect();
			this.statusUpdate();
		},
		//检查选项是否超出限制
		checkListOut(){
			let dataCount = bookListData.countBookDetail();
			if(dataCount.selectBookCount == 0){
				this.listOutShow = true;
			}
			if(dataCount.selectBookCount > 0 && dataCount.selectBookCount <= 10){
				this.listOutShow = false;
			}
			if(dataCount.selectBookCount > 10){
				this.listOutShow = true;
			}
			
			this.selectBookCount = dataCount.selectBookCount;
		},
		//检测下单书本情况
		checkBuyBookStatus(){
			let result = true;
			let dataCount = bookListData.countBookDetail();
			if(dataCount.selectBookCount === 0){
				uni.showToast({
					title:'请先选择好书本',
					duration: 2000,
					icon: 'none'
				});
				result = false
			}
			
			if(dataCount.selectBookCount > 10){
				uni.showToast({
					title:'最多只能借10本书',
					duration: 2000,
					icon: 'none'
				});
				result = false
			}
			
			return result;
		},
		//关闭弹出层
		canclePop(){
			this.$refs.popup.close()
		},
		//下单前确认数据
		preBuy(){
			//检测书本数量是否在范围内
			let bookResult = this.checkBuyBookStatus();
			if(!bookResult){
				return;
			}
			this.$refs.popup.open()
		},
		// 下订单
		buySelect() {
			if (this.userInfo.name === 'guest') {
				//游客 发出提示
				uni.showModal({
					title: '请先登录',
					confirmText: '登录',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('userInfo')
							uni.reLaunch({url: '../guide/guide'})
						}
					}
				})
				return;
			}
			
			//检测书本数量是否在范围内
			let bookResult = this.checkBuyBookStatus();
			if(!bookResult){
				return;
			}
			
			let select = [];
			let unSelect = [];
			let bookCount = 0;
			this.listData.forEach(item=>{
				if(item.select) {
					select.push(item);
					bookCount = bookCount + item.count;					
				}else{
					unSelect.push(item);
				}
			});
			
			//插入订单缓存
			let orderObject = {
				bookCount: bookCount,
				moneyCount: this.moneyCount,
				goodsInfo: select
			};
			uni.setStorageSync('orderInfo', orderObject);
			
			//跳转到订单页面
			uni.navigateTo({
				url: "/pages/cart/orderDetail"
			})
		}
	}
}
</script>

<style scoped>
.content-position{
	z-index: 1;
}	
/* .content-position-one {
	height: 100vh;
	background-color: #EBF8FF;
	z-index: 1;
}
.content-position-two {
	background-color: #EBF8FF;
	z-index: 1;
} */
.backgroundStyle {
	/* background-image: url(../static/cart/color.png); */
	background-size: 100% 250upx;
	background-repeat:no-repeat;
}
.content {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.score-position-type{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.score-coontent-position {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.top-position {
	width: 90%;
	padding:20upx 0;
	margin-bottom: 20upx;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	/* background-color: #EBF8FF; */
	border-radius: 50upx;
	border:1upx solid #E8E8E8;
}
.top-content-left {
	display: flex;
	flex-direction: row;
}
.top-content-left text {
	font-size: 30upx;
}
.top-content-left-img {
	width: 40upx;
	height: 40upx;
}
.top-content-left {
	display: flex;
	flex-direction: row;
}
.top-content-right-img-one {
	width: 150upx;
	height: 40upx;
}
.top-content-right-img-two {
	width: 40upx;
	height: 40upx;
}
.banner-position {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.cat-detail-position {
	width: 90%;
}
.cat-detail {

}
.cat-add-book {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	/* height: 100vh; */
	padding-top: 150upx;
}
.bottom-position {
	z-index: 3;
	width: 100%;
	background-color: #FFFFFF;
	padding: 30upx;
	position: fixed;
	bottom: 0;
}
.bottom-content {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	background-color: #FFFFFF;
}
.bottom-check,.bottom-text {
	font-size: 20upx;
	font-weight: bold;
}
.price-text{
	font-size: 18upx;
	font-weight: bold;
}
.bottom-tag {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
/* .tag-style {
	width: 80upx;
	height: 45upx;
	margin-right: 20upx;
} */
.tag-style {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 20upx;
	color: #FFFFFF;
	padding: 10upx 20upx;
	width: 80upx;
	height: 45upx;
	margin-right: 20upx;
}
.price-style {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.popup-content-position{
	width: 80%;
	background-color: #FFFFFF;
	border-radius: 30upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20upx;
}
.popup-content{
	font-weight: bold;
}
.popup-button-position{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 20upx;
}
.popup-button{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10upx 15upx;
	border-radius: 20upx;
	color: #FFFFFF;
	background-color: #007AFF;
	margin-left: 10upx;
}
</style>
