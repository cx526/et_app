<template>
	<view>
		<!-- 个人信息 -->
		<userInfo />
		<!-- 活力排版 -->
		<typesetting />
		<!-- 通告栏 -->
		<message />
		<!-- 阅读统计 -->
		<stat />
		<!-- 话题 -->
		<topic />
		<!-- 热门打卡 -->
		<punchCard />
	</view>
</template>

<script>
	import userInfo from '@/components/circle-components/user-info.vue'
	import typesetting from '@/components/circle-components/typesetting.vue'
	import message from '@/components/circle-components/message.vue'
	import stat from '@/components/circle-components/stat.vue'
	import topic from '@/components/circle-components/topic.vue'
	import punchCard from '@/components/circle-components/punch-card.vue'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			userInfo,
			typesetting,
			message,
			stat,
			topic
		},
		methods: {
			
		}
	}
</script>
<style>
	page {
		box-sizing: border-box;
		background: #EBF8FF;
	}
</style>
<style scoped>

</style>
