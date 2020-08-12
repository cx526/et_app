<template>
	<view v-if="isLogin">
		<!-- tab切换 -->
		<view class="tab-box">
			<block 
			v-for="( item, index ) in tabList.list"
			:key="index"
			>
				<view class="item" 
				:class=" tabList.currentIndex == index ? ' active' : '' "
				@tap="changTab(index)">
				{{ item.title }}
				</view>
			</block>
		</view>
		<!-- 待归还书单 -->
		<block v-if="tabList.currentIndex == 0">
			<view class="order-list"
			v-if="orderList && orderList.length > 0"
			v-for="(item, index) in orderList"
			:key="index"
			>
				<view class="item">
					<view class="topic">
						<view style="font-weight: bold;">订单号：{{ item.order_no }}</view>
						<view class="status">
								<text>{{ item.msg }}</text>
						</view>
					</view>
					<view class="book-list" 
					v-if="item.dockerInfo && item.dockerInfo.length > 0">
						<block 
						v-for="(list,listIndex) in item.dockerInfo" 
						:key="listIndex">
							<view class="book-item">
								<view class="show">
									<image :src="list.pic"></image>
								</view>
								
								<view class="title">
									{{ list.title }}
								</view>
								<view class="number">
									<text style="margin-bottom: 20rpx;">{{ list.price }}贝</text>
									<tetx>x1</tetx>
								</view>
							</view>
						</block>
					</view>
					<view class="order-info">
						<view class="left">
							<view class="text">
								<text>创建时间：{{ item.hanlde_create_time }}</text>
							</view>
							<view class="text spcial">
								<view v-if="item.pay_type != 'shell' ">
									<text>积分：-50</text>
									<text style="color: #f00;">（优惠{{ item.price }}贝）</text>
								</view>
								<view style="font-weight: bold; color: #000;">
									<text>实付：{{ item.price }}</text>
								</view>
							</view>
						</view>
						<view class="btn">
							<view style="flex: 1;"></view>
							<view class="btn-box">
								<view class="borrow" @tap="open">
									<text>取书码</text>
								</view>
							</view>
								
						</view>
					</view>
				</view>
			</view>
			<!-- 显示暂无订单组件 -->
			<view v-else>
				<offline-none-order></offline-none-order>
			</view>
		</block>
		<!-- 已归还书单 -->
		<block v-else>
			<view class="order-list" 
			v-if="failOrderList && failOrderList.length > 0">
				<view class="item">
					<view class="topic">
						<view style="font-weight: bold;">订单号：23123123123342</view>
						<view class="status">
								<text style="color: #868686;">已失效</text>
						</view>
					</view>
					<view class="book-list">
						<block v-for="n in 4" :key="n">
							<view class="book-item">
								<view class="show">
									<image src="http://et-pic-server.oss-cn-shenzhen.aliyuncs.com/1589783780428.jpg"></image>
								</view>
								
								<view class="title">
									不要告状，除非是大事
								</view>
								<view class="number">
									<text style="margin-bottom: 20rpx;">39.99贝</text>
									<tetx>x1</tetx>
								</view>
							</view>
						</block>
					</view>
					<view class="order-info">
						<view class="left">
							<view class="text">
								<text>创建时间：2020-07-19 16：00</text>
							</view>
							<view class="text spcial">
								<view>
									<text>积分：-100</text>
									<text style="color: #f00;">（优惠10贝）</text>
								</view>
								<view style="font-weight: bold; color: #000;">
									<text>实付：20</text>
								</view>
							</view>
							
							
							
						</view>
						<view class="btn">
							<view style="flex: 1;"></view>
							<view class="btn-box">
								<view class="del">
									<text>删除</text>
								</view>
							</view>
								
						</view>
					</view>
				</view>
			</view>
			<!-- 显示暂无订单组件 -->
			<view v-else>
				<offline-none-order></offline-none-order>
			</view>
		</block>
		<!-- 订单凭证弹窗 -->
		<uni-popup ref="orderPopUp">
			<view class="order-box"  :style="{ width: popUpWidth }">
				
				<view class="title">
					<text class="line" style="margin-right: 16rpx;"></text>
					<text class="circle" style="margin-right: 20rpx;"></text>
					<text>取书二维码</text>
					<text class="circle" style="margin-left: 20rpx;"></text>
					<text class="line" style="margin-left: 16rpx;"></text>
				</view>
				<view class="notice">
					<view>请将此二维码放至扫码区</view>
					<view>获取个人书单信息</view>
				</view>
				<view class="code">
					<image src="../../static/library/code.png.png" mode=""></image>
				</view>
				<view class="title">
					<text class="line" style="margin-right: 16rpx;"></text>
					<text class="circle" style="margin-right: 20rpx;"></text>
					<text>取书验证码</text>
					<text class="circle" style="margin-left: 20rpx;"></text>
					<text class="line" style="margin-left: 16rpx;"></text>
				</view>
				<view class="notice">
					<view>请输入以下验证码，点击确认</view>
					<view>获取个人书单信息</view>
				</view>
				<view class="code-number" >
					<text>229922</text>
				</view>
			</view>
		</uni-popup>
		<uni-load-more :status="loadStatus" :content-text="loadText" />
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import offlineNoneOrder from '@/components/offline-components/offline-none-order.vue'
	export default {
		data() {
			return {
				loadStatus: 'loading',
				loadText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '暂无更多数据'
				},
				isLogin: false,//是否登录
				isLoadingMore: true, //是否开启上拉加载更多
				popUpWidth: 0,
				pageSize: 4, // 返回待取书单条数
				currentPage: 1, // 待取书单当前页码
				userInfo: '',
				orderList: [],//待取书书单
				failOrderList: [], //失效书单
				faliPageSize: 4, // 返回失效书单条数
				failCurrentPage: 1, // 失效书单当前页码
				current_timestamp: 0,
				timer: null,
				tabList: {
					currentIndex: 0,
					list: [
						{
							title: '待取书单'
						},
						{
							title: '失效书单',
						}
					]
				},
			}
		},
		components: {
			uniPopup,
			uniLoadMore,
			offlineNoneOrder
		},
		onLoad(option) {
			if(option !== '{}') {
				this.tabList.currentIndex = option.status ? option.status : 0;
			}
			// 设置弹窗高度
			uni.getSystemInfo({
				success: res => {
					this.popUpWidth = res.windowWidth * 0.7 + 'px'
				}
			})
			
		},
		onShow() {
			// 获取当前的时间戳
			this.current_timestamp = new Date().getTime();
			this.getLogin();
			// 获取用户信息
			this.getUserInfo()
		},
		onUnload() {
			clearInterval(this.timer)
		},
		// 上拉加载更多
		onReachBottom() {
			// 待取书单上拉加载更多
			if(this.isLoadingMore && this.tabList.currentIndex == 0) {
				// 每次上拉加载之前需要清除下定时器防止重复开启造成错乱
				clearInterval(this.timer);
				this.currentPage = this.currentPage + 1;
				this.getUserOrderList()
			}
		},
		methods: {
			// 检测登录状态
			getLogin() {
				let userInfo = uni.getStorageSync('userInfo');
				if (userInfo.name === 'guest' || !userInfo) {
					uni.showModal({
						title: '您还未登录！',
						content: '是否前往登录页面?',
						success: (res) => {
							if (res.confirm) {
								uni.removeStorageSync('userInfo')
								uni.reLaunch({url: '../guide/guide'})
							}else {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							}
						}
					})
				}else {
					this.isLogin = true
				}
			},
			// 获取待取书书单
			getUserOrderList() {
				this.$api.offlineUserOrderList({
					pageSize: this.pageSize,
					currentPage: this.currentPage,
					docker_mac: this.userInfo.dockerInfo.docker_mac,
					filterItems:{
						custom_id: this.userInfo.id,
						order_type: 0 //待取书单类型
					}
				}).then(res => {
					// 如果不存在，改变加载组件的状态
					if(res.data.rows.length == 0) {
						this.loadStatus = "noMore"
					}
					// 判断是否开启上拉加载更多
					if(this.currentPage == Math.ceil(res.data.totalPage / 3)) {
						this.loadStatus = "noMore",
						this.isLoadingMore = false
					}
					res.data.rows && res.data.rows.map(item => {
						item.hanlde_create_time = this.handleTime(item.create_time)
						// 订单失效时间
						item.fail_timestamp = new Date(item.pre_get_book_time).getTime();
						item.difference = item.fail_timestamp - this.current_timestamp > 86400000 ? 0 : item.fail_timestamp - this.current_timestamp;
					})
					// 开启定时器
					this.timer = setInterval(() => {
						res.data.rows && res.data.rows.map(list => {
							list.difference = list.difference - 1000;
							list.msg =  this.countDown(list.difference);
						})						
					}, 1000)
					this.orderList = [...this.orderList, ...res.data.rows];
				})
			},
			// 获取失效书单
			getFailOrderList() {
				this.$api.offlineUserOrderList({
					pageSize: this.faliPageSize,
					currentPage: this.faliCurrentPage,
					docker_mac: this.userInfo.dockerInfo.docker_mac,
					filterItems:{
						custom_id: this.userInfo.id,
						order_type: 3 //待取书单类型
					}
				}).then(res => {
					console.log(res)
					this.failOrderList = res.data.rows
					// 如果不存在，改变加载组件的状态
					if(res.data.rows.length == 0) {
						this.loadStatus = "noMore"
					}
				})
			},
			// 倒计时
			countDown(time) {
				let msg = '';
				if (time > 0) {
					// time = time - 1000 ;
					let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) >= 10 ? 
					parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) 					: 
					'0' + parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
					let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) >= 10 ? 
					parseInt((time % (1000 * 60 * 60)) / (1000 * 60)) 
					: 
					'0' + parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
					let seconds = parseInt((time % (1000 * 60)) / 1000) >= 10 ? 
					parseInt((time % (1000 * 60)) / 1000) 
					: 
					'0' + parseInt((time % (1000 * 60)) / 1000);
					msg = (`${hours}:${minutes}:${seconds}`)
					return msg 
					
				}else {
					msg = '已失效';
					clearInterval(this.timer)
					return msg
				}
			},
			// 获取个人账户信息
			getUserInfo() {
				let mobile = uni.getStorageSync("userInfo").mobile;
				this.$api.getCustom({ filterItems: { mobile } }).then(res => {
					this.userInfo = res.data[0];
					// 获取待取书书单
					this.getUserOrderList()
					// 获取失效书单
					this.getFailOrderList()
				})
			},
			// 格式化时间
			handleTime(time) {
				let currentTime = new Date(time)
				let year = currentTime.getFullYear()
				let month =  this.complement(currentTime.getMonth() + 1)
				let day = this.complement(currentTime.getDate())
				let hour = this.complement(currentTime.getHours())
				let minute = this.complement(currentTime.getMinutes())
				let second = this.complement(currentTime.getSeconds())
				let create_time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
				
				return create_time
			},
			// 补零
			complement(value) {
				if(value >= 10) {
					return value
				}else {
					return '0' + value
				}
			},
			// tab切换
			changTab(index) {
				this.tabList.currentIndex = index;
				// 重置加载组件的加载状态
				this.loadStatus = 'loading'
			},
			// 打开订单凭证弹窗
			open() {
				this.$refs.orderPopUp.open()
			},
			// 关闭订单凭证弹窗
			close() {
				this.$refs.orderPopUp.close()
			},
		}
	}
	
</script>

<style>
	
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
	/* 订单 */
	page {
		background: #F9F9F9;
		box-sizing: border-box;
		padding-bottom: 30rpx;
	}
	.order-list {
		box-sizing: border-box;
		box-shadow: 0rpx 0rpx 20rpx rgba(179, 179, 179, 0.3);
		border-radius: 28rpx;
		margin-top: 20rpx;
		padding: 0 30rpx;
	}
	
	.order-list .item {
		box-sizing: border-box;
		background: #fff;
		padding: 20rpx;
		border-radius: 20rpx;
	}
	.order-list .topic {
		display: flex;
		padding: 0 24rpx;
		border-bottom: 1px solid #EAEAEA;
		justify-content: space-between;
		font-size: 28rpx;
		align-items: center;
		line-height: 60rpx;
		
	}
	.order-list .topic .status {
		color: #68C1D4;
		text-align: right;
	}
	.order-list .topic .status.active {
		color: #f00;
	}
	.order-list .book-list {
		box-sizing: border-box;
		padding: 20rpx;
		border-bottom: 1px solid #EEEEEF;
	}
	.order-list .book-item {
		box-sizing: border-box;
		display: flex;
		margin-bottom: 20rpx;
	}
	.order-list .book-item:last-child {
		margin-bottom: 0;
	}
	.order-list .book-item .show {
		box-sizing: border-box;
		border: 1px solid #EBEBEB;
		margin-right: 20rpx;
	}
	.order-list .book-item image {
		width: 120rpx;
		height: 120rpx;
		flex-shrink: 0;
	}
	.order-list .book-item .title {
		font-size: 28rpx;
		flex: 1;
		font-weight: bold;
		box-sizing: border-box;
		margin-top: 28rpx;
	}
	.order-list .book-item .number {
		flex-shrink: 0;
		margin-left: 80rpx;
		font-size: 26rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		margin-top: 28rpx;
		color: #868686;
		text-align: right;
	}
	.order-list .order-info {
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 20rpx;
	}
	.order-list .order-info .left {
		font-size: 24rpx;
		color: #333;
	}
	.order-list .order-info .left .text {
		line-height: 36rpx;
	}
	.order-list .order-info .left .spcial {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		margin-top: 24rpx;
	}
	.order-list .btn {
		display: flex;
		padding: 20rpx 0;
		box-sizing: border-box;
	}
	.order-list .btn .btn-box {
		display: flex;
	}
	.order-list .btn .del,
	.order-list .btn .borrow{
		box-sizing: border-box;
		padding: 0 30rpx;
		border: 1px solid #EEEEEF;
		border-radius: 40rpx;
		font-size: 26rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #039EB9;
		height: 60rpx;
		
	}
	.order-list .btn .del {
		background: #fff;
		margin-right: 12rpx;
		color: #666;
	}
	.order-list .btn .borrow {
		background-image: linear-gradient(180deg, #40AED1, #69D9E4);
		color: #fff;
	}
	/* 订单凭证弹窗 */
	.order-box {
		box-sizing: border-box;
		background: #fff;
		border-radius: 16rpx;
		padding: 60rpx 40rpx;
		position: relative;
	}
	.order-box .title {
		text-align: center;
		font-weight: bold;
		font-size: 36rpx;
		display: flex;
		color: #3CAFC7;
		align-items: center;
		justify-content: center;
		margin-bottom: 30rpx;
	}
	.order-box .title .line {
		width: 74rpx;
		background: #CAE6F2;
		height: 1px;
	}
	.order-box .title .circle {
		width: 16rpx;
		height: 16rpx;
		background: #CAE6F2;
		transform: rotate(45deg);
	}
	.order-box .notice {
		text-align: center;
		box-sizing: border-box;
		font-size: 32rpx;

	}
	.order-box .code {
		text-align: center;
		box-sizing: border-box;
		padding: 28rpx 0;
	}
	.order-box .code image {
		width: 200rpx;
		height: 200rpx;
	}
	.order-box .code-number {
		font-size: 50rpx;
		font-weight: bold;
		text-align: center;
		margin-top: 14rpx;
		color: #30AAC3;
	}
</style>
