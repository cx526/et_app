<template>
	<view class="content" >
		<picker
			class="picker-input" 
			mode="multiSelector" 
			@change="regionChange"
			@columnchange="regionColChange"
			:value="regionResult" 
			:range="region"
		>
		<view :style="inputStyle ? 'font-size: 30upx;color: #6A6A6A;' : ''" :class="[finalRegionString.length === 0 ? 'color-one' : 'color-two']">{{ finalRegionString.length === 0 ? title : finalRegionString }}</view>
		</picker>
	</view>
</template>

<script>
import regionData from '../common/regionData.js'

export default {
	props: {
		title: String,
		showing_address: String,
		inputStyle: Boolean,
	},
	computed: {
		finalRegionString() {
			if (this.selectedProvinceValue + this.selectedCityValue + this.selectedAreaValue){
				return this.selectedProvinceValue + this.selectedCityValue + this.selectedAreaValue
			}else if(this.$props.showing_address != ''){
				return this.$props.showing_address;
			}else {
				return '';
			}
		}
	},
	created(){
		this.provinceArray = Object.values(regionData['86'])
		this.pKeysArray = Object.keys(regionData['86'])
		this.region[0] = this.provinceArray
		this.selectedProvinceValue = this.$props.showing_address;
	},
	data() {
		return {
			provinceKey: '',
			cityKey: '',
			provinceArray: [],
			cityArray: [],
			areaArray: [],
			region: [
				[],
				[],
				[],
			],
			pKeysArray: [],
			cKeysArray: [],
			aKeysArray: [],
			regionResult: [
				[],
				[],
				[],
			],
			selectedProvinceCode: '',
			selectedCityCode: '',
			selectedAreaCode: '',
			selectedProvinceValue: '',
			selectedCityValue: '',
			selectedAreaValue: ''
		}
	},
	methods: {
		regionColChange(e) {
			// console.log(e)
			let col = e.detail.column
			let val = e.detail.value
			// console.log(col, val)
			
			if (col === 0) {
				this.provinceKey = Object.keys(regionData['86'])[val]
				this.cityArray = Object.values(regionData[this.provinceKey]) 
				this.region[1] = this.cityArray
				this.cKeysArray = Object.keys(regionData[this.provinceKey])
				this.selectedProvinceValue = Object.values(regionData['86'])[val]
				this.selectedCityValue = ''
				this.selectedAreaValue = ''
				// this.regionResult[0] = this.provinceArray[val]
				// this.regionResult[1] = this.cityArray[0]
				// this.regionResult[2] = []
			}
			if (col === 1 ) {
				this.cityKey = Object.keys(regionData[this.provinceKey])[val]
				this.selectedCityValue = Object.values(regionData[this.provinceKey])[val]
				this.areaArray = Object.values(regionData[this.cityKey])
				this.region[2] = this.areaArray
				this.aKeysArray = Object.keys(regionData[this.cityKey])
				this.selectedAreaValue = ''
				// this.regionResult[1] = this.cityArray[val]
				// this.regionResult[2] = this.areaArray[0]
			}
			if (col === 2) {
				this.selectedAreaValue = Object.values(regionData[this.cityKey])[val]
			}
			// this.$forceUpdate()
		},
		regionChange(e) {
			
			this.selectedProvinceCode = this.pKeysArray[e.target.value[0]]
			this.selectedCityCode = this.cKeysArray[e.target.value[1]]
			this.selectedAreaCode = this.aKeysArray[e.target.value[2]]
			
			
			let param = {
				filterItems: {
					province: this.selectedProvinceCode,
					city: this.selectedCityCode,
					area: this.selectedAreaCode,
					showAddress: this.finalRegionString
				}
			}
			
			this.$emit('regionChange',param);
		},
	}
}
</script>

<style scoped>
.content {
	width: 100%;
}
.color-one{
	color:#81888F;
}
.color-two{
	color:#000000;
}
.input-style {
	font-size: 30upx;
	color: #6A6A6A;
}
</style>
