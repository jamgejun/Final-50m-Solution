<template>
	<section>
		<el-tabs type="border-card">
			<el-tab-pane label="待认领">
				<Claim :orderRiderClaim="orderRiderClaim"></Claim>
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
import { getOrder, getOrderByStatus } from '../../api/repositoryOrder/order.js'
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

        // 返回待认领订单下骑手维度的统计信息
		getOrderByStatus(_this, _this.$store.state.orderStatus.claim).then((res) => {
			if(res.data.data != undefined) {
				_this.orderRiderClaim = res.data.data.rows
			} else {
				_this.$message({
					message: '对不起！当前账号暂无权限查询订单',
					type: 'warning'
				})
			}
		})
        
        // 返回待配送订单统计信息
		getOrderByStatus(_this, _this.$store.state.orderStatus.distribute).then((res) => {
			if(res.data.data != undefined) {
				_this.orderOutput = res.data.data.rows
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
			orderRiderClaim: [], // 骑手维度下的待认领统计订单信息
			orderDistribute: []
		}
	}
}
</script>

<style scoped>

</style>