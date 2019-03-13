<template>
  <section>
    <!--待出库-->
    <el-table id="table" :data="orderOutput" :default-sort="sortByTime">
        <el-table-column type="selection"></el-table-column>
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
        <el-button type="success" @click="PrintAll">打印所有订单</el-button>
    </div>

    <ul id="output" v-show="isPrint">
        <li 
            v-for="(item, index) in ordersList"
            :key="index"
            style="margin-bottom: 20px; margin-top:20px;width:80%; margin: 0 auto; border-bottom: 1px solid #ccc;list-style:none;">
            <h2 style="width:80%; text-align:center;margin:0 auto;">{{ item.apartmentName }}</h2>
            <!-- <div>
                <h3>骑手信息</h3>
                <span>骑手姓名：{{ item.riderName }}</span>
            </div> -->
            <div>
                <h3>配送信息</h3>
                <span>收货地址：{{ item.address }}</span><br>
                <span>收 货 人：{{ item.receiverName }}</span><br>
                <span>联系方式：{{ item.receiverPhone }}</span><br/>
            </div>
            <div>
                <h3>订单详情</h3>
                <table border="0" style="">
                    <tr 
                        style="text-align:center;">
                        <th>商品名</th>
                        <th>商品数量</th>
                        <th>商品价格</th>
                    </tr>
                    <tr v-for="(detail, index) in item.orderDetailResultList"
                        :key="index"
                        style="text-align:center;">
                        <td>{{ detail.goodsSsName }}</td>
                        <td>{{ detail.goodsQuantity }}</td>
                        <td>{{ detail.price }} 元</td>
                    </tr>
                </table>
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
import { updateAllOrder, getOderDetail, getOrder } from '../../api/repositoryOrder/order.js'
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
            isPrint: false,
            //待出库列表
            ordersList: [
                {
                    id: 4,
                    code: "565489486",
                    wxuserId: 3,
                    payPrice: 33,        
                    receiverName: "李某某",  
                    receiverPhone: "15486515651",        
                    apartmentId: 1,        
                    address: "404寝室",        
                    createTime: "2019-02-22 13:02:53",        
                    payTime: "2019-02-22 13:04:14",        
                    shipTime: "2019-02-22 13:05:22",        
                    receiptTime: "2019-02-22 13:20:31",
                    updateTime: "2019-02-22 14:04:26",
                    riderId: 4,
                    status: 16,
                    riderName: "骑手一号",
                    apartmentName: "测试楼栋",
                    statusName: "配送中",
                    quantity: 6,
                    orderDetailResultList: [
                        {
                            id: 4,
                            orderId: 4,
                            goodsSsId: 2,
                            goodsQuantity: 6,
                            createTime: "2019-02-22 14:07:14",
                            updateTime: "2019-02-22 14:07:18",
                            goodsSsName: "×××薯片",
                            goodsPictureUrl: "图片地址",
                            price: 4
                        },
                        {
                            id: 5,
                            orderId: 4,
                            goodsSsId: 8,
                            goodsQuantity: 2,
                            createTime: "2019-02-22 09:11:48",
                            updateTime: "2019-02-22 09:12:00",
                            goodsSsName: "×××辣条",
                            goodsPictureUrl: "图片地址",
                            price: 4.5
                        }
                    ]
                }
            ],
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
  watch:{
      orderOutput(val) {
        // 获取订单详细内容
        let _this = this;
        for(let i=0; i<_this.orderOutput.length; i++) {
            _this.orderStatus.push(_this.orderOutput[i].id)
            getOderDetail(_this, _this.orderOutput[i].id).then((res) => {
                _this.ordersList[i] = res.data.data
            })
        }
      }
  },
  methods: {
    // 打印订单
    PrintAll() {
        let _this = this;
        // 获取最新的待出库订单
        getOrder(_this, {
            status: 14
        }).then((res) => {
            if(res.data.data != undefined) {
                _this.orderOutput = res.data.data.rows
            } else {
                _this.$message({
                    message: '对不起！当前账号暂无权限查询订单',
                    type: 'warning'
                })
            }
        })
        // 更新订单之后
        updateAllOrder(_this, {
            ids: _this.orderStatus,
            status: 15
        }).then((res) => {
            _this.$message({
                message: '更新订单成功，即将为您打印！',
                type: 'success'
            })
        }).catch((err) => {
            _this.$message({
                message: '打印出错，请尽快联系管理员',
                type: 'warning'
            })
        })
        jquery('#output').printMe()
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
