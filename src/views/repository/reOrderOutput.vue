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

    <ul id="output">
        <li 
            v-for="(item, index) in ordersList"
            :key="index"
            style="margin-bottom: 20px; width:80%; margin: 0 auto; border-bottom: 1px solid #ccc;">
            <h2>{{ item.apartmentName }}</h2>
            <div>
                <h3>骑手信息</h3>
                <span>骑手姓名：{{ item.riderName }}</span>
            </div>
            <div>
                <h3>配送信息</h3>
                <span>收货人：{{ item.receiverName }}</span><br>
                <span>收货人电话：{{ item.receiverPhone }}</span><br/>
                <span>详细地址：{{ item.address }}</span>
            </div>
            <div>
                <h3>订单信息</h3>
                <p style="display:flex; align-item:center; justify-content: space-bettwen">
                    <span>订单编号：</span><span>{{ item.code }}</span>
                </p>
                <p style="display:flex; align-item:center; justify-content: space-bettwen">
                    <span>下单时间：</span><span>{{ item.createTime }}</span>
                </p>
                <p style="display:flex; align-item:center; justify-content: space-bettwen">
                    <span>支付金额：</span><span>{{ item.payPrice }}</span>
                </p>
            </div>
        </li>
    </ul>
  </section>
</template>

<script>
import { updateAllOrder, getOderDetail } from '../../api/repositoryOrder/order.js'
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
            ordersList: [],
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
        let _this = this;
        for(let i=0; i<orderOutput.length; i++) {
            _this.orderStatus.push(orderOutput[i].id)
            getOderDetail(_this, orderOutput[i].id).then((res) => {
                _this.ordersList[i] = res.data.data
            })
        }
        updateAllOrder(_this, {
            ids: _this.orderStatus,
            status: 14
        }).then((res) => {
            _this.$message({
                message: '更新订单成功，即将为您打印！',
                type: 'success'
            })
            jquery('#output').printMe()
        }).catch((err) => {
            _this.$message({
                message: '打印出错，请尽快联系管理员',
                type: 'warning'
            })
        })
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
