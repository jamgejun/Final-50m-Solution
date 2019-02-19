<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="buyerSearch" class="demo-form-inline">
                <el-form-item prop="name" label="账号名">
                    <el-input v-model="buyerSearch.name" placeholder="请输入买家账号名"></el-input>
                </el-form-item>
                <el-form-item prop="trueName" label="真实姓名">
                    <el-input v-model="buyerSearch.trueName" placeholder="真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input v-model="buyerSearch.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="duringTime" label="注册时间">
                    <el-date-picker
                        v-model="buyerSearch.duringTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="buyerList" :default-sort="sortObj">
            <el-table-column prop="name" label="昵称"></el-table-column>
            <el-table-column prop="trueName" label="真实姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="joinTime" label="注册时间" sortable></el-table-column>
        </el-table>
    </section>
</template>

<script>
export default {
    data() {
        return {
            // 指定排序的prop行和order方式
            sortObj: {
                prop: 'joinTime',
                order: 'ascending'
            },
            buyerSearch: {
                name: '',
                trueName: '',
                phone: '',
                duringTime: ''
            },
            buyerList: [
                {
                    name: '飞翔的鱼',
                    trueName: '李四',
                    phone: '123456',
                    joinTime: '2019-9-1'
                },
                {
                    name: '白云',
                    trueName: '王四',
                    phone: '123456',
                    joinTime: '2018-9-1'
                },
                {
                    name: '跳动的心',
                    trueName: '张三',
                    phone: '123456',
                    joinTime: '2019-5-1'
                }
            ]
        }
    },
    methods: {
        handleSeach() {}
    }
}
</script>

<style>

</style>
