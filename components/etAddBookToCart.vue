<template>
	<view class="content" >
		<view class="left-position">
			<image src= "https://et-pic-server.oss-cn-shenzhen.aliyuncs.com/app_img/index_zan.png" style="width: 30upx; height: 30upx;margin-right: 10rpx;" ></image>	
			<text>{{peopleCount}}人推荐</text>
		</view>
		
		<view class="right-position" @tap="insertToCart">
			<block v-if="type === 'online'">
				<view class="right-content" v-if="bookInfo.stockCount.totalOnlineUse !== 0">
					<text>加入书篮</text>
				</view>
				<view class="right-content" style="background-color:#ccc; color: #fff;" v-else>
					<text>加入书篮</text>
				</view>
			</block>
			<block v-else>
				<view class="right-content" v-if="bookInfo.stockCount.totalDockerUse !== 0">
					<text>加入书篮</text>
				</view>
				<view class="right-content" style="background-color:#ccc; color: #fff;" v-else>
					<text>加入书篮</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
const insertBook = require('@/common/carDataOption');

export default {
	data() {
		return {
			width: 0
		}
	},
	props: {
		peopleCount: String,
		bookInfo:Object,
		type: String
	},
	created() {
		uni.getSystemInfo({
			success: res => {
				this.width = (res.windowWidth - 30 - 12)/2 + 'px'
			}
		})
	},
	methods: {
		push(add) {
			if(this.bookInfo.stockCount.totalDockerUse === 0){
				uni.showToast({
					title:"书本暂时借完，请选择其他书本",
					duration:2000,
					icon:"none"
				})
				return;
			}
			let arrList = uni.getStorageSync('offlineCartList') ? uni.getStorageSync('offlineCartList') : [];
			let arr = [];
			if (arrList && arrList.length > 0) {
				arrList.map(obj => {
					arr.push(obj.id);
				});
				if (arr.indexOf(add.id) === -1) {
					uni.showToast({
						title: '加入书篮成功',
						duration: 2000,
						icon: 'none',
						success: () => {
							arrList.unshift(add);
							uni.setStorageSync('offlineCartList', arrList);
							this.len = insertBook.countBookLength()
						}
					});
				} else {
					uni.showToast({
						title: '相同图书请不要重复添加',
						duration: 2000,
						icon: 'none'
					});
				}
			} else {
				uni.showToast({
					title: '加入书篮成功',
					duration: 2000,
					icon: 'none',
					success: () => {
						arrList.push(add);
						uni.setStorageSync('offlineCartList', arrList);
						this.len = insertBook.countBookLength()
					}
				});
			}
		},
		insertToCart() {
			console.log(this.type)
			// 线下加入书篮
			if(this.type === 'offline') {
				this.push(this.bookInfo)
			}else {
			// 临时关闭
			uni.showToast({
				title: '邮寄借阅系统升级中，暂不对外开放！',
				icon: 'none',
				duration:2000
			})
			return
			if(this.$props.bookInfo.stockCount.totalOnlineUse === 0){
				uni.showToast({
					title:"书本暂时借完，请选择其他书本",
					duration:2000,
					icon:"none"
				})
				return;
			}
			uni.showLoading();
			// 处理数据
			// let cartList = {
			// 	'bookID': this.$props.bookInfo.id,
			// 	'title': this.$props.bookInfo.title,
			// 	'coin': this.$props.bookInfo.coin,
			// 	'cover': this.$props.bookInfo.forGoodsPic[0].url,
			// 	'select': true,
			// 	'count':1
			// };
			
			let cartList = this.$props.bookInfo;
			// cartList.select = true;
			cartList.select = false;
			cartList.count = 1;
			// 加入书篮操作
			insertBook.insertToCart(cartList);
			// 重新计算书篮书籍数量
			insertBook.countBookLength()
			try {
			    let carListArr = uni.getStorageSync('carListInfo');
			    console.log(carListArr);
			} catch (e) {
			    console.log(carListArr);
			}
			this.$emit('insertBookToCart');
			}
		}
	}
}
</script>

<style scoped>
.content {
	display: flex;
	/* width: 270upx; */
	flex-direction: row;
	justify-content: space-between;
	/* align-content: center; */
	align-items: center;
	/* padding-left: 20upx; */
}
.left-position {
	display: flex;
	flex-direction: row;
	/* justify-content: space-between; */
	/* align-content: center; */
	/* align-items: center; */
	color: #BABABA;
	font-size: 25upx;
}
.right-position {
	padding-left: 10upx;

}
.right-content {
	font-size: 22upx;
	font-weight: bold;
	color: #FFFFFF;
	background-color: #2AAEC4;
	border-top-left-radius: 20upx;
	border-bottom-left-radius: 20upx;
	padding:5upx 14upx;
	box-sizing: border-box;
/* 	position: relative;
	right: -20rpx; */
}
</style>
