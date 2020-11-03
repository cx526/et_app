<template>
	<view class="chart-box">
		<view class="topic">
			<text class="name">阅读量</text>
			
		</view>
		<view class="qiun-charts" >
			<canvas 
			canvas-id="canvasColumn" 
			id="canvasColumn" 
			class="charts"
			@touchstart="touchLineA" 
			@touchmove="moveLineA" 
			@touchend="touchEndLineA"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts/u-charts.js';
	
	var canvaColumn=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				// 模拟数据
				chartData: {
				  categories: ["小小班1班", "小小班2班", "小班1班", "小班2班", "中班1班","中班2班"],
				  series: [
					{
					name: "阅读量",
					data: [30, 38, 25, 14, 34, 50]
				  }]
				}
			}
		},
		
		created() {
			this.cWidth=uni.upx2px(670)
			this.cHeight=uni.upx2px(500)
			this.chart('canvasColumn')
		},
		methods: {
			// 绘制柱状图
			chart(canvasId) {
				let _self = this;
				canvaColumn=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'column',
					padding: [24,15,4,15],
					colors: ['#b2e379'],
					legend:{show:true},
					fontSize:11,
					background:'#FFFFFF',
					pixelRatio:1,
					animation: true,
					categories: _self.chartData.categories,
					series: _self.chartData.series,
					enableScroll: true,
					xAxis: {
						disableGrid:true,
						itemCount:5,
						fontSize: 10
					},
					yAxis: {
						min: 0
					},
					dataLabel: true,
					width: _self.cWidth,
					height: _self.cHeight,
					extra: {
						column: {
							type:'group',
							width: 20
						}
					}
				});
			},
		
	
			touchLineA(e){
				canvaColumn.scrollStart(e);
			},
			moveLineA(e) {
				canvaColumn.scroll(e);
			},
			touchEndLineA(e) {
				canvaColumn.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				// canvaColumn.touchLegend(e);
				// canvaLineA.showToolTip(e, {
				// 	format: function (item, category) {
				// 		return category + ' ' + item.name + ':' + item.data 
				// 	}
				// });
			},
		}
	}
</script>

<style scoped>
	/* chart-box */
	.chart-box {
		box-sizing: border-box;
		padding: 28rpx 16rpx;
		background: #fff;
		box-shadow: 0 0 20rpx #ddd;
		border-radius: 28rpx;
	}
	.chart-box .topic {
		display: flex;
		box-sizing: border-box;
		padding-left: 16rpx;
		font-size: 30rpx;
		line-height: 60rpx;
		justify-content: space-between;
		align-items: center;
	}
	.chart-box .topic .name {
		flex: 1;
	}
	.chart-box .topic picker {
		flex-shrink: 0;
		border: 1px solid #eaeaea;
		color: #666;
		box-sizing: border-box;
		position: relative;
		padding: 0 32rpx;
		border-radius: 12rpx;
	}
	.chart-box .topic picker image {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		right: 10rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.qiun-charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
	.charts {
		width: 100%;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
