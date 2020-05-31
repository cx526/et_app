<template>
	<view class="content-position">
	<!-- <view :class="[listData.length < 3 ? 'content-position-one' : 'content-position-two']"> -->
		<view class="backgroundStyle">
			<view class="content">
				<view class="white-space"></view>
				<!-- 头部内容 -->
				<view class="top-position">
					<view class="top-content-left">
						<image class="top-content-left-img" src="../../static/cart/money.png"></image>
						<view style="width: 20upx;"></view>
						<text>我的积分：{{coin}}</text>
					</view>
					
					<view class="top-content-right">
						<image class="top-content-right-img-one" src="https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/cart_getMore.png"></image>
						<image class="top-content-right-img-two" src="../../static/cart/sign.png" @tap="toSign"></image>
					</view>
				</view>
				
				<!-- 列表数据 -->
				<view class="cat-detail-position">
					<view class="cat-detail" v-if="listData.length > 0" v-for="(item,index) in listData">
						<et-cart-detail :key="index" :bookID="item.id"  :select="item.select" :imgSrc="item.forGoodsPic[0].url" :title="item.title" :status="item.status" :coin="item.coin" :count="item.count" @changSelectType="changAllSelectType" @deleteData="deleteData"></et-cart-detail>
						<view class="white-space"></view>
					</view>
					<view class="cat-add-book" @tap="toKineUrl" v-if="listData.length === 0" >
						<image src="../../static/cart/add.png" style="width: 200upx; height: 200upx;"></image>
						<text style="color:#9FB2BF; font-size: 30upx;">请先添加书本</text>
					</view>
				</view>
				
				<view class="white-space" style="height: 120upx;"></view>
				
				<!-- 底部栏目 -->
				<view class="bottom-position">
					<view class="bottom-content">
						<view class="bottom-check">
							<checkbox value="cb" :checked="allSelect" @tap="allSelectOrNot" />
							<text>全选</text>
						</view>
						
						<view class="bottom-text">
							<text>合计：</text>
							<text style="color: #DB3E49;">{{moneyCount}}</text>
							<text>积分</text>
						</view>
						
						<view class="bottom-tag">
							<et-tag backgroundColor="#808080" title="删除" fontColor="#FFFFFF" class="tag-style" @tap="delectSelect"></et-tag>
							<et-tag backgroundColor="#2AA145" title="借阅" fontColor="#FFFFFF" class="tag-style" @tap="buySelect"></et-tag>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import etCartDetail from '../../components/etCartDetail.vue'
import etTag from '../../components/etTag.vue'

const bookListData = require('@/common/carDataOption');
const toUrlFunction = require('@/common/toUrlFunction');

export default {
	components: {
		etCartDetail,
		etTag
	},
	computed: {
		userInfo() {
			return uni.getStorageSync('userInfo')
		}
	},
	data() {
		return {
			coin:"40",
			moneyCount:"199",
			allSelect:"true",
			listData: []
		}
	},
	onLoad() {
		this.statusUpdate();
		this.getCustomerInfo();
	},
	onShow() {
		this.statusUpdate();
		this.getCustomerInfo();
	},
	methods: {
		toKineUrl(){
			toUrlFunction.toUrl('/pages/index/kind');
		},
		getCustomerInfo(){
			this.$api.getCustom({ filterItems: { mobile: this.userInfo.mobile } }).then(res=>{
				this.coin = res.data[0].coin;
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
			this.statusUpdate();
		},
		// 删除所有选中的记录
		delectSelect(){
			bookListData.deleteSelect();
			this.statusUpdate();
		},
		// 下订单
		buySelect() {
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
			
			if(select.length === 0){
				uni.showToast({
					title:'请先选择好书本',
					duration: 2000,
					icon: 'none'
				});
				return;
			}
			
			//插入订单缓存
			let orderObject = {
				bookCount: bookCount,
				moneyCount: this.moneyCount,
				goodsInfo: select
			};
			uni.setStorageSync('orderInfo', orderObject);

			//跳转到订单页面
			uni.navigateTo({
				url: "orderDetail"
			})
		}
	}
}
</script>

<style scoped>
.content-position{
	z-index: 1;
}	
.content-position-one {
	height: 100vh;
	background-color: #EBF8FF;
	z-index: 1;
}
.content-position-two {
	background-color: #EBF8FF;
	z-index: 1;
}
.backgroundStyle {
	background-image: url(../../static/cart/color.png);
	background-size: 100% 250upx;
	background-repeat:no-repeat;
}
.content {
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
	background-color: #EBF8FF;
	border-radius: 10upx;
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
	height: 100vh;
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
	background-color: #FFFFFF;
}
.bottom-check,.bottom-text {
	font-size: 25upx;
	font-weight: bold;
}
.bottom-tag {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
.tag-style {
	width: 80upx;
	height: 45upx;
	margin-right: 20upx;
}
</style>
