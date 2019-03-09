<template>
	<section>
		<el-tabs type="border-card">
			<el-tab-pane label="待认领">
				<Claim :orderClaim="orderClaim"></Claim>
			</el-tab-pane>
			<el-tab-pane label="待出库">
				<Output :orderOutput="orderOutput"></Output>
			</el-tab-pane>
			<el-tab-pane label="待配送">
				<Distribute :orderDistribute="orderDistribute"></Distribute>
			</el-tab-pane>
		</el-tabs>
	</section>
</template>
<script>
import { getDictorys } from '../../api/dictorys/dictorys.js'
import { getOrder } from '../../api/repositoryOrder/order.js'
import Claim from './reOrderClaim.vue';
import Output from './reOrderOutput.vue';
import Distribute from './reOrderDistribute.vue';
export default {
	components: {
		Claim,
		Output,
		Distribute
	},
	mounted: function (){
		let _this = this
		getOrder(_this, {
			status: 14
		}).then((res) => {
			if(res.data.data != undefined) {
				_this.orderOutput = res.data.data.rows
			} else {
				_this.$message({
					message: '对不起！当前账号暂无权限查询订单',
					type: 'warning'
				})
			}
		})
		getOrder(_this, {
			status: 13
		}).then((res) => {
			if(res.data.data != undefined) {
				_this.orderClaim = res.data.data.rows
			} else {
				_this.$message({
					message: '对不起！当前账号暂无权限查询订单',
					type: 'warning'
				})
			}
		})
    },
	data() {
		return {
			orderOutput: [],
			orderClaim: [],
			orderDistribute: []
		}
	}
}
</script>

<style scoped>

</style>