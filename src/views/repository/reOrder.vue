<template>
	<section>
		<el-tabs type="border-card">
			<el-tab-pane label="待认领">
				<Claim></Claim>
			</el-tab-pane>
			<el-tab-pane label="待出库">
				<Output></Output>
			</el-tab-pane>
			<el-tab-pane label="待配送">
				<Distribute></Distribute>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
import Claim from './reOrderClaim.vue';
import Output from './reOrderOutput.vue';
import Distribute from './reOrderDistribute.vue';
export default {
	components: {
		Claim,
		Output,
		Distribute
	}
}
</script>

<style scoped>

</style>