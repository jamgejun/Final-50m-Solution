<template>
  <section>
    <!--待配送-->
    <el-table :data="orderDistribute">
      <el-table-column prop="number" label="订单编号" style="width: 25%;" sortable></el-table-column>
      <el-table-column prop="money" label="订单金额" style="width: 10%;"></el-table-column>
      <el-table-column prop="building" label="订单楼栋" style="width: 10%;"></el-table-column>
      <el-table-column prop="goods" label="商品件数" style="width: 5%;"></el-table-column>
      <el-table-column prop="time" label="下单时间" style="width: 20%;" sortable></el-table-column>
      <el-table-column prop="riderName" label="配送骑手姓名" style="width: 10%;"></el-table-column>
      <el-table-column prop="riderPhone" label="骑手手机号" style="width: 20%;"></el-table-column>
    </el-table>
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
}
</script>