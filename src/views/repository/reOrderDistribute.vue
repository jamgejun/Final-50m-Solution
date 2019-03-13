<template>
    <section>
        <!--待配送-->
        <el-table :data="orderDistribute">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="number" label="楼栋名" style="width: 25%;"></el-table-column>
            <el-table-column prop="money" label="订单数量" style="width: 10%;"></el-table-column>
            <el-table-column prop="riderName" label="配送骑手姓名" style="width: 10%;"></el-table-column>
            <el-table-column prop="riderPhone" label="骑手手机号" style="width: 20%;"></el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                <el-button
                    size="small" 
                    type="primary" 
                    @click="handleView(scope.$index, scope.row)" >查看订单详情</el-button>
                </template> 
            </el-table-column> 
        </el-table>
        <div class="printOrder">
            <el-button type="success" @click="DistributeAll">启动配送</el-button>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        orderDistribute: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            //待配送列表
        };
    },
    methods: {
        DistributeAll() {}
    }
}
</script>

<style lang="scss" scoped>
    .printOrder {
        margin-top: 20px;
        float: right;
    }
</style>