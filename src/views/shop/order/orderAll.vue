<template>
	<section>
		<el-tabs type="border-card">
			<el-tab-pane label="整体">
				<Total></Total>
			</el-tab-pane>
			<el-tab-pane label="楼栋">
				<Building></Building>
			</el-tab-pane>
			<el-tab-pane label="骑手">
				<Rider></Rider>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
import Total from './orderBytotal.vue';
import Building from './orderByBuilding.vue'
import Rider from './orderByRider.vue'
export default {
	components: {
		Total,
		Building,
		Rider
	}
}
</script>

<style scoped>

</style>