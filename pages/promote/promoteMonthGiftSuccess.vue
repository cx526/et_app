<template>
	<view class="content">
		<view class="img-style"></view>
		
		<view class="margin-style">
			<text style="font-weight: bold;">兑换成功</text>
		</view>
		
		<view class="button-position margin-style">
			<view class="button-style2 margin-style" style="padding: 20upx 150upx;">
				<text>查看礼品</text>
			</view>
			
			<view class="button-style2  white-border margin-style" style="background-color: #FFFFFF; color: #00B7CC; padding: 20upx 150upx;">
				<text>返回</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
		
	},
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		
	}
}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(235,248,255,1);
	min-height: 100vh;
}
.img-style{
	 animation: moving 2s ease;
	 animation-iteration-count: infinite;
	 height: 450upx;
	 width: 450upx;
	 background-size: 450upx 450upx;
}
 @keyframes moving{
	0%{
		background-image: url('https://et-bak.oss-cn-heyuan.aliyuncs.com/promote/promote_month_gift_01.png');
	}
	25%{
		background-image: url('https://et-bak.oss-cn-heyuan.aliyuncs.com/promote/promote_month_gift_02.png');
	}
	50%{
		background-image: url('https://et-bak.oss-cn-heyuan.aliyuncs.com/promote/promote_month_gift_03.png');
	}
	75%{
		background-image: url('https://et-bak.oss-cn-heyuan.aliyuncs.com/promote/promote_month_gift_04.png');
	}
	100%{
		background-image: url('https://et-bak.oss-cn-heyuan.aliyuncs.com/promote/promote_month_gift_05.png');
	}
}
.margin-style{
	margin-top: 20upx;
}
</style>
