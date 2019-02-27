<template>
  <section>
    <!--待出库-->
    <el-table :data="order">
      <el-table-column prop="number" label="订单编号" sortable></el-table-column>
      <el-table-column prop="money" label="订单金额"></el-table-column>
      <el-table-column prop="building" label="订单楼栋"></el-table-column>
      <el-table-column prop="goods" label="商品件数"></el-table-column>
      <el-table-column prop="time" label="下单时间" sortable></el-table-column>
      <el-table-column prop="riderName" label="配送骑手姓名"></el-table-column>
      <el-table-column prop="riderPhone" label="骑手手机号"></el-table-column>、
      <el-table-column prop="status" label="订单状态" min-width="120">
        <template slot-scope="scope">
          {{ handleOrderStatus(scope.row.status) }}
          <el-button size="small" type="primary" @click="Print()">打印订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form id="table">
      <el-form-item style="color: red">
        具体内容的打印
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import jquery from 'jquery'
import printMe from '../../plugin/printMe.js';
export default {
  data() {
    return {
      //待出库列表
      show: true,
      order: [
        {
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
      ],
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

<style lang="scss">
@import "../../assets/print.css";
</style>
