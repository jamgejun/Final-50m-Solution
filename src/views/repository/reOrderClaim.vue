<template> 
  <section>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="骑手维度" name="riderDimension" v-loading="isLoding"> 
            <!--待认领骑手维度--> 
            <el-table :data="orderRiderClaim">
            <el-table-column prop="apartmentName" label="楼栋"></el-table-column>
            <el-table-column prop="orderNum" label="订单数量"></el-table-column> 
            <el-table-column prop="riderName" label="上班骑手姓名"></el-table-column>
            <el-table-column prop="riderPhone" label="上班骑手电话"></el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                <el-button
                    size="small" 
                    type="primary" 
                    @click="handleView(scope.$index, scope.row)" >查看详情</el-button>
                <el-button 
                    type="danger" 
                    size="small"
                    @click="changeRider">更换骑手</el-button>
                </template> 
            </el-table-column> 
            </el-table> 
        </el-tab-pane> 
        <el-tab-pane label="订单维度" name="orderDimension">
            <!--待认领订单维度-->
            <el-table :data="orderClaim" :default-sort="soryByTime">
                <el-table-column prop="createTime" label="下单时间" style="width: 20%;"></el-table-column>
                <el-table-column prop="code" label="订单编号" style="width: 20%;" ></el-table-column>
                <el-table-column prop="payPrice" label="订单金额" style="width: 10%;"></el-table-column>
                <el-table-column prop="receiverName" label="收货人姓名" style="width: 10%;"></el-table-column> 
                <el-table-column prop="receiverPhone" label="收货人手机号" style="width: 10%;"></el-table-column> 
                <el-table-column prop="apartmentName" label="订单楼栋" style="width: 10%;"></el-table-column>
                <el-table-column prop="quantity" label="商品数量" style="width: 5%;"></el-table-column> 
            </el-table>
        </el-tab-pane>
    </el-tabs>
    <!--订单详情界面--> 
    <el-dialog :title="orderRiderClaimTitle" :visible.sync="GcLock.check" :close-on-click-modal="false" min-width="60vw">
        <el-table :data="detailOrder">
            <el-table-column prop="createTime" label="订单编号" style="width: 20%;"></el-table-column>
            <el-table-column prop="code" label="订单金额" style="width: 20%;" ></el-table-column>
            <el-table-column prop="payPrice" label="订单楼栋" style="width: 10%;"></el-table-column>
            <el-table-column prop="receiverName" label="下单时间" style="width: 10%;"></el-table-column> 
            <el-table-column prop="receiverPhone" label="商品件数" style="width: 10%;"></el-table-column> 
            <el-table-column prop="apartmentName" label="订单楼栋" style="width: 10%;"></el-table-column>
            <el-table-column prop="quantity" label="订单数量" style="width: 5%;"></el-table-column> 
        </el-table> 
    </el-dialog>
    <el-dialog title="更换骑手" :visible="GcLock.changeRider" :close-on-click-modal="false">
        <el-form :data="RiderChange">
            <el-form-item prop='Rider' label="选择您的骑手：">
                <el-select v-model="RiderChange.Rider" placeholder="请选择更换的骑手">
                    <el-option value="0" label="张某某"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-dialog>
  </section>
</template>

<script>
export default {
    props: {
        orderRiderClaim: {
            type: Array,
            required: true
        },
        isLoding: {
            type: Boolean,
            required:false
        }
    },
    data() {
        return {
            // 订单根据时间降序
            soryByTime: {
                prop: 'createTime',
                order: 'descending'
            },
            RiderChange: {
                Rider: ''
            },
            activeName: "riderDimension", 
            orderStatus:[], // 订单状态
            order: [], //待认领订单列表 
            //显示订单详情
            GcLock: {
                check: true,
                changeRider: false
            }, 
            loading: {
                detailOrder: false,
            },
            Riderdetail: [],
        };
  },
  computed: {
        orderRiderClaimTitle: function () {
            let _this = this
            if (_this.orderRiderClaim.riderName == undefined) {
                return '某人的' + '待认领'
            } else {
                return _this.orderRiderClaim.riderName + '的待认领'
            }
        },
  },
  methods: { 
      changeRider() {
          let _this = this;
          _this.GcLock.changeRider = !_this.GcLock.changeRider
        //   _this.get(`/api/riderworks`, {})
      },
    handleClick(tab, event) {
      console.log(tab, event);
    }, 

    //查看该骑手下的待认领所有订单
    handleView(index, row) { 
        let _this = this;
        // loding状态
        _this.loading.detailOrder = !_this.loading.detailOrder
        // 打开模态框
        _this.GcLock.check = !_this.GcLock.check
        getOrder(_this, {
            status: _this.$store.state.orderStatus.claim, // 待认领状态
            riderId: row.riderId, // 骑手id
            apartmentId: row.apartmentId // 对应楼栋
        }).then((res) => {
            _this.$message({
                message: '请耐心等待，正在查询...',
                type: 'info'
            })
            // 显示该骑手的所有待认领。
            _this.detailOrder = res.data.data.rows;
            // 关闭模态框 loading状态
            _this.GcLock.check = !_this.GcLock.check
            _this.loading.detailOrder = !_this.loading.detailOrder
        }).catch(() => {

        })
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