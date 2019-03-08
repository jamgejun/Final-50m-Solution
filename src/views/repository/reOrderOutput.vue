<template>
  <section>
    <!--待出库-->
    <el-table id="table" :data="orderOutput" :default-sort="sortByTime">
        <el-table-column prop="createTime" label="下单时间"></el-table-column>
        <el-table-column prop="code" label="订单编号"></el-table-column>
        <el-table-column prop="payPrice" label="订单金额"></el-table-column>
        <el-table-column prop="apartmentName" label="订单楼栋"></el-table-column>
        <el-table-column prop="address" label="收货地址"></el-table-column>
        <el-table-column prop="receiverName" label="收货人姓名"></el-table-column>
        <el-table-column prop="riderName" label="配送骑手姓名"></el-table-column>
        <el-table-column prop="riderPhone" label="骑手手机号"></el-table-column>
    </el-table>
    <div class="printOrder">
        <el-button type="success" @click="Print">打印所有订单</el-button>
    </div>
  </section>
</template>

<script>
import jquery from 'jquery'
import printMe from '../../plugin/printMe.js';
export default {
    props: {
        orderOutput: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            sortByTime: {
                prop: 'createTime',
                order: 'descending'
            },
            //待出库列表
            show: true,
            orderStatus: [],
            order: [],
            orderPrint: {
                number: "0000002",
                money: "15元",
                building: "22栋",
                goods: "1件",
                time: "2019-01-29",
                riderName: "王五",
                riderPhone: "142354325",
                riderStatus: 1,
                ordersNumber: "1",
                reason: ""
            }
        };
  },
  methods: {
    //处理订单状态
    handleOrderStatus(status) {
      return status === 1 ? "正在出库" : "待出库 ";
    },
    // 打印订单
    Print() {
      jquery('#table').printMe()
    }
  }
};
</script>

<style lang="scss" scoped>
    .printOrder {
        margin-top: 20px;
        float: right;
    }
</style>
