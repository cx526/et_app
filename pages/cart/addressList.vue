<template>
	<view class="content">
		<et-address></et-address>
	</view>
</template>

<script>
import etAddress from '../../components/etAddress.vue'

export default {
	components: {
		etAddress
	},
    data() {
        return {
			
        }
    },
    onLoad() {
        
    },
    methods: {
		buttomClick() {
			console.log('123');
		},
	}
}
</script>

<style scoped>
.content {
	
}
</style>
