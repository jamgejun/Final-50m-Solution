<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="buyerSearch" class="demo-form-inline">
                <el-form-item prop="name" label="账号名">
                    <el-input v-model="buyerSearch.name" placeholder="请输入买家账号名"></el-input>
                </el-form-item>
                <el-form-item prop="realName" label="真实姓名">
                    <el-input v-model="buyerSearch.trueName" placeholder="请输入买家真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input v-model="buyerSearch.phone" placeholder="请输入买家手机号"></el-input>
                </el-form-item>
                <el-form-item prop="createTime" label="注册时间">
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
            <el-table-column prop="realName" label="真实姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" sortable></el-table-column>
        </el-table>
    </section>
</template>

<script>
import { searchBuyer, referBuyer } from "../../api/buyer";
import util from "../../common/js/util";
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
                realName: '',
                phone: '',
                createTime: ''
            },
            buyerList: []
        }
    },
    mounted: function () {
        let _this = this
        referBuyer(_this).then((res) => {
            let buyerList = res.data.data.rows
            _this.buyerList = res.data.data.rows
            searchBuyer(_this).then((res) => {
                    _this.buyerList = buyerList
            }).catch((err) => {
                console.log(err)
            });  
        })
    },
    methods: {
        //处理查询
        handleSeach() {
            let _this = this
            referBuyer(_this).then((res) => {
                let buyerList = res.data.data.rows
                this.buyerList = res.data.data.rows
                searchBuyer(_this,{
                    name:_this.buyerSearch.name,
                    realName:_this.buyerSearch.realName,
                    phone:_this.buyerSearch.phone,
                    createTime:_this.buyerSearch.createTime
                })
            }).then((res) => {
                console.log(res)
                _this.buyerList = res.data.data.rows
            }).catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>

<style>

</style>
