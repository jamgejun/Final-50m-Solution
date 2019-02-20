<template>
    <section>
        
        <order-tabs></order-tabs>
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
        <el-table :data="buildingList" v-show="orderBuildingLock.buildingList">
            <el-table-column prop="name" label="楼栋名"></el-table-column>
            <el-table-column prop="message" label="详细信息"></el-table-column>
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
                    <span>您所在的当前楼栋 </span> <strong> {{currentBuilding }} </strong>
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
            currentBuilding: '',
            orderBuildingSearch: {
                name:''
            },
            orderBuildingLock: {
                buildingList: true,
                orderList: false
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
            ],
            activeName: 'first',
            orderList: [{}],
            show: true,
            orderByTime: {
                startTime: '',
                endTime: ''
            },
            orderTime: '',
            orderCount: 266
        }
    },
    methods: {
        handleDeatil(index, row) {
            let _this = this; 
            _this.currentBuilding = row.name;
            _this.orderBuildingLock.buildingList = !_this.orderBuildingLock.buildingList;
            _this.orderBuildingLock.orderList = !_this.orderBuildingLock.orderList;
        },
        hanldeBcak() {
            let _this = this; 
            _this.currentBuilding = '';
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
