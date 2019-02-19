<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :data="orderBuildingSearch">
                <el-form-item>
                    <el-input placeholder="请输入楼栋名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="buildingList">
            <el-table-column prop="name" label="楼栋名"></el-table-column>
            <el-table-column prop="message" label="详细信息"></el-table-column>
            <el-table-column prop="number" label="订单数量"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="handleDeatil(scope.$index, scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            orderBuildingSearch: {
                name:''
            },
            buildingList: [
                {
                    name: '24栋',
                    message: '具体详情信息',
                    status: 0,
                    number: '256'
                },
                {
                    name: '20栋',
                    message: '具体详情信息',
                    status: 1
                },
                {
                    name: '26栋',
                    message: '具体详情信息',
                    status: 0
                }
            ]
        }
    }
}
</script>

<style>

</style>
