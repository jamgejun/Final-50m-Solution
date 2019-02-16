<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="Employsearch" class="demo-form-inline">
                <el-form-item prop="name">
                    <el-input v-model="Employsearch.name" placeholder="请输入员工账号名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item> 
            </el-form>
        </el-col>
        <el-table :data="employList">
            <el-table-column type="selection" label=""></el-table-column>
            <el-table-column prop="name" label="账号名"></el-table-column>
            <el-table-column prop="accountType" label="账号类型"></el-table-column>
            <el-table-column prop="Time" label="创建时间"></el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <el-button size="small" type="primary"  @click="handleChange(scope.$index, scope.row)">重置</el-button>
                    <el-button size="small" type="danger"  @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            employList: [
                {
                    name: '121354',
                    accountType: '仓库管理员',
                    Time: '2016-9-2'
                }
            ],
            Employsearch: {
                name: ''
            }
        }
    },
    methods: {
        handleChange() {

        },
        handleDel() {}
    }
}
</script>

<style>

</style>
