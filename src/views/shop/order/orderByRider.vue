<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :data="orderRiderSearch">
                <el-form-item>
                    <el-input placeholder="请输入骑手名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="RiderList" v-show="orderRiderLock.RiderList" :default-sort="orderRiderSort">
            <el-table-column prop="name" label="骑手名"></el-table-column>
            <el-table-column prop="phone" label="骑手手机号"></el-table-column>
            <el-table-column prop="number" label="订单数量"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" @click="handleDeatil(scope.$index, scope.row)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <section>
            <el-col :span="24">
                <el-col>
                    <span>当前骑手 </span> <strong> {{RiderName }} </strong>
                    <el-button type="primary" @click.native.prevent='hanldeBcak'>返回</el-button>
                </el-col>
            </el-col>
        </section>
    </section>
</template>

<script>
import orderTabs from './orderFourTabs.vue';
export default {
    components: {
        orderTabs,
    },
    data() {
        return {
            orderRiderSort: {
                prop:'name'
            },
            RiderName: '',
            orderRiderSearch: {
                name:'',
                phone: ''
            },
            orderRiderLock: {
                RiderList: true,
                orderList: false
            },
            RiderList: [
                {
                    jionTime: '2018-9-10',
                    name: '张某',
                    phone: '110',
                    number: 200,
                    serverBuilding: '24栋',
                    isStaff: 0,
                    workStatus: 0,
                    otherCommit: ''
                },
                {
                    jionTime: '2018-10-10',
                    name: '李某',
                    phone: '120',
                    serverBuilding: '27栋',
                    isStaff: 0,
                    workStatus: 1,
                    otherCommit: ''
                },
                {
                    jionTime: '2018-9-8',
                    name: '宋某',
                    phone: '119',
                    serverBuilding: '25栋',
                    isStaff: 1,
                    workStatus: 0,
                    otherCommit: ''
                },
            ]
        }
    },
    methods: {
        handleDeatil(index, row) {
            let _this = this; 
            _this.RiderName = row.name;
            _this.orderBuildingLock.buildingList = !_this.orderBuildingLock.buildingList;
            _this.orderBuildingLock.orderList = !_this.orderBuildingLock.orderList;
        },
        hanldeBcak() {
            let _this = this; 
            _this.RiderName = '';
            _this.orderBuildingLock.buildingList = !_this.orderBuildingLock.buildingList;
            _this.orderBuildingLock.orderList = !_this.orderBuildingLock.orderList;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleDayPrev() {

        }
    }
}
</script>

<style>

</style>
