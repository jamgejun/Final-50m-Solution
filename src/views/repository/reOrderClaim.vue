<template> 
  <section>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="订单维度" name="orderDimension">
            <!--待认领订单维度-->
            <el-table :data="orderClaim" :default-sort="soryByTime">
                <el-table-column prop="createTime" label="下单时间" style="width: 20%;" sortable></el-table-column>
                <el-table-column prop="code" label="订单编号" style="width: 20%;" sortable></el-table-column>
                <el-table-column prop="payPrice" label="订单金额" style="width: 10%;"></el-table-column>
                <el-table-column prop="receiverName" label="收货人姓名" style="width: 10%;"></el-table-column> 
                <el-table-column prop="receiverPhone" label="收货人手机号" style="width: 10%;"></el-table-column> 
                <el-table-column prop="apartmentName" label="订单楼栋" style="width: 10%;"></el-table-column>
                <el-table-column prop="quantity" label="订单数量" style="width: 5%;"></el-table-column> 
            </el-table>
        </el-tab-pane>
      <el-tab-pane label="骑手维度" name="riderDimension"> 
        <!--待认领骑手维度--> 
        <el-table :data="orderClaim">
          <el-table-column prop="riderName" label="骑手姓名"></el-table-column> 
          <el-table-column prop="riderPhone" label="骑手手机号"></el-table-column>
          <el-table-column prop="riderStatus" label="骑手工作状态"> 
            <template slot-scope="scope">
              <span>{{ handleRiderStatus(scope.row.riderStatus) }}</span> 
              <span>{{ handleRiderReason(scope.row.riderStatus,scope.row.reason) }}</span> 
            </template>
          </el-table-column> 
          <el-table-column prop="ordersNumber" label="待认领订单总数"></el-table-column> 
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleView(scope.$index, scope.row)" >查看订单详情</el-button>
              <el-button type="danger" size="small">更换骑手</el-button>
            </template> 
          </el-table-column> 
        </el-table> 
      </el-tab-pane> 
    </el-tabs>
    <!--订单详情界面--> 
    <el-dialog title="订单信息" :visible.sync="GcLock.check" :close-on-click-modal="false" min-width="60vw"> 
      <el-form v-model="checkForm">
        <el-form :inline="true"> 
          <el-form-item label="订单编号" style="width: 45%">{{checkForm.number}}</el-form-item>
          <el-form-item label="订单金额">{{checkForm.money}}</el-form-item>
        </el-form> 
        <el-form :inline="true">
          <el-form-item label="订单楼栋" style="width: 45%">{{checkForm.building}}</el-form-item> 
          <el-form-item label="下单时间">{{checkForm.time}}</el-form-item>
        </el-form> 
        <el-form>
          <el-form-item label="商品件数">{{checkForm.goods}}</el-form-item> 
        </el-form>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
export default {
    props: {
        orderClaim: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            // 订单根据时间降序
            soryByTime: {
                prop: 'createTime',
                order: 'descending'
            },
            activeName: "riderDimension", 
            orderStatus:[], // 订单状态
            order: [], //待认领订单列表 
            //显示订单详情
            GcLock: {
                check: false
            }, 
            checkForm: { 
                number: "",
                money: "", 
                building: "", 
                time: "", 
                goods: "" 
            } 
        };
  }, 
  methods: { 
    handleClick(tab, event) {
      console.log(tab, event);
    }, 
    //点击查看订单信息
    handleView(index, row) { 
      let _this = this; 
      _this.GcLock.check = !_this.GcLock.check;
      _this.checkForm = row; 
    }, 
    //处理骑手状态 
    handleRiderStatus(riderStatus) { 
      return riderStatus === 1 ? "上班" : "下班 "; 
    }, 
    //添加下班原因
    handleRiderReason(riderStatus, reason) { 
      return riderStatus === 1 ? "" : " ( " + reason + " )"; 
    } 
  } 
};

</script> 