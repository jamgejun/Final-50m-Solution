<template>
    <section>
        <el-table :data="orderList">
            <el-table-column prop="number" label="订单编号"></el-table-column>
            <el-table-column prop="money" label="订单金额"></el-table-column>
            <el-table-column prop="building" label="订单楼栋"></el-table-column>
            <el-table-column prop="count" label="商品件数"></el-table-column>
            <el-table-column prop="time" label="下单时间"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="handleDeatil(scope.$index, scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
        </el-table>
        <el-dialog title="订单详情" :visible.sync="orderLock.detail">
          <el-form :data="orderDetailForm" :inline="true">
            <el-form-item label="订单编号" prop="number" >
                <el-input v-model="orderDetailForm.number"></el-input>
            </el-form-item>
            <el-form-item label="订单金额" prop="money" >
                <el-input v-model="orderDetailForm.money"></el-input>
            </el-form-item>
            <el-form-item label="订单楼栋" prop="building" >
                <el-input v-model="orderDetailForm.building"></el-input>
            </el-form-item>
            <el-form-item label="下单时间" prop="time" >
                <el-input v-model="orderDetailForm.time"></el-input>
            </el-form-item>
            <el-form-item label="商品件数" prop="count" >
                <el-input v-model="orderDetailForm.count"></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="url" >
                <img :url="orderDetailForm.url" />
            </el-form-item>
            <el-form-item label="商品简介" prop="content" >
                <el-input v-model="orderDetailForm.content"></el-input>
            </el-form-item>
            <el-form-item label="购买价格" prop="price" >
                <el-input v-model="orderDetailForm.price"></el-input>
            </el-form-item>
            <el-form-item label="购买数量" prop="buycount" >
                <el-input v-model="orderDetailForm.buycount"></el-input>
            </el-form-item>
            <el-form-item label="买家地址" prop="adress" >
                <el-input v-model="orderDetailForm.adress"></el-input>
            </el-form-item>
          </el-form>
        </el-dialog>
    </section>
</template>
<script>
  export default {
    props: [],
    data() {
      return {
        orderLock: {
          detail: false,
        },
        orderList: [
          {
             number: '20190220166',
             money: 24.5,
             building: '24栋',
             count: '1件',
             time: '2019-2-20 20:30:10',
             url: '',
             content: '奥利奥巧心脆',
             price: 3.5,
             buycount: '2',
             adress: '27栋'
          },
          {
             number: '20190220196',
             money: 25.5,
             building: '27栋',
             count: '5件',
             time: '2019-2-20 14:30:10',
             url: '',
             content: '奥利奥巧心脆',
             price: 4,
             buycount: '5',
             adress: '26栋'
          },
        ],
        orderDetailForm: {
             number: '',
             money: 0,
             building: '',
             count: '',
             time: '',
             url: '',
             content: '',
             price: 0,
             buycount: '',
             adress: ''
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleDayPrev() {

      },
      handleDeatil(index, row) {
        let _this = this;
        _this.orderDetailForm = row;
        _this.orderLock.detail = !_this.orderLock.detail;
      }
    }
  };
</script>