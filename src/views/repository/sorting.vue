<template>
    <section>
        <!-- 工具搜索栏 -->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="GcSearch" class="demo-form-inline"> 
                <el-form-item label="订单状态：">
                    <el-select v-model="GcSearch.status" placeholder="选择商品状态">
                        <el-option value="0" label="待出库"></el-option>
                        <el-option value="1" label="正在出库"></el-option>
                        <el-option value="2" label="配送中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间段：">
                    <el-date-picker v-model="GcSearch.time" type="date" placeholder="请输入所需查询时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="订单楼栋：">
                    <el-select v-model="GcSearch.building" placeholder="选择订单楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单配送骑手：">
                    <el-input v-model="GcSearch.name" placeholder="请输入配送骑手姓名"></el-input>
                </el-form-item>
                <el-form-item label="订单买家：">
                    <el-input v-model="GcSearch.nickname" placeholder="请输入买家昵称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        
        <!-- 列表 -->
        <el-table :data="messageOrders" highlight-current-row  style="width: 100%;">
                <el-table-column prop="number" label="订单编号" align="center" width="140" sortable>
                </el-table-column>
				<el-table-column prop="money" label="订单金额" align="center" width="100">
				</el-table-column>
				<el-table-column prop="building" label="订单楼栋" align="center" width="100">
				</el-table-column>
				<el-table-column prop="goods" label="商品件数" align="center" width="100">
				</el-table-column>
				<el-table-column prop="time" label="下单时间" align="center" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.time}}</span>
                        <span>2</span>
                    </template>
				</el-table-column>
				<el-table-column prop="status" label="订单状态" align="center" width="120">
                <template slot-scope="scope">
                    {{ handleStatus(scope.row.status) }}
                </template>
				</el-table-column>
                <el-table-column prop="riderName" label="配送骑手姓名" align="center" width="120">
				</el-table-column>
                <el-table-column prop="buyerName" label="卖家昵称" align="center" width="120">
				</el-table-column>
                <el-table-column label="操作" prop="operate" align="center" min-width="120">
                    <template slot-scope="scope">
					<el-button size="small" @click="handleChange(scope.$index, scope.row)">查看详情</el-button>
                    </template>
			    </el-table-column>
			</el-table>
        <!-- 进一步查看订单详情 -->
        <el-dialog title="查看订单" :visible.sync="GcLock.check" :close-on-click-model="false" min-width="60vw">
           <el-form :data="checkForm">
                <el-form :inline="true">
                    <el-form-item label="订单编号" style="width:45%">
                        {{checkForm.number}}
                    </el-form-item>
                    <el-form-item label="订单金额">
                        {{checkForm.money}}
                    </el-form-item>
                </el-form>

                <el-form :inline="true">
                    <el-form-item label="订单楼栋" style="width:45%">
                        {{checkForm.building}}
                    </el-form-item>
                    <el-form-item label="下单时间">
                        {{checkForm.time}}
                    </el-form-item>
                </el-form>

                <el-form :inline="true">
                    <el-form-item label="商品件数" style="width:45%">
                        {{checkForm.goods}}
                    </el-form-item>
                    <el-form-item label="买家地址">
                        {{checkForm.buyerBuilding}}
                    </el-form-item>
                </el-form>

                <el-form-item label="商品照片">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form>
                    <el-form-item label="商品简介(包括购买价格以及数量)">
                        {{goodsIntroduce}}
                    </el-form-item>
                </el-form>
                
                <el-form :inline="true">
                    <el-form-item label="骑手姓名" style="width:45%">
                        {{checkForm.riderName}}
                    </el-form-item>
                    <el-form-item label="骑手手机号">
                        {{checkForm.riderPhone}}
                    </el-form-item>
                </el-form>

                <el-form :inline="true">
                    <el-form-item label="管理楼栋" style="width:45%">
                        {{checkForm.building}}
                    </el-form-item>
                    <el-form-item label="工作状态">
                        {{ handleRiderStatus(checkForm.status) }}
                    </el-form-item>
                </el-form>

                <el-form>
                    <el-form-item label="商品总数">
                        {{checkForm.ordersNumber}}
                    </el-form-item>
                </el-form>
            </el-form>
        </el-dialog>       
    </section>
</template>

<script>
export default {
    data() {
        return {
            GcLock: {
                 check: false
            },
            GcSearch: {
                 status: '',
                 time: '',
                 building: '',
                 name: '',
                 nickname: ''
            },
            checkForm: {
                number: '',
                money: '',
                building: '',
                time: '',
                goods: '',
                status:0,
                riderName: '',
                riderPhone: '',
                ordersNumber: '',
                buyerBuilding: '',
                goodsIntroduce: ''
            },
              buildingList: [
                {
                    name: '24栋',
                },
                {
                    name: '20栋',
                },
                {
                    name: '22栋',
                }
            ],
            messageOrders: [
                {
                    number:'516',
                    money:'125元',
                    building:'22栋',
                    goods:'10',
                    time:'13:00',
                    status:0,
                    buyerName:'张哥',
                    riderName: '张三生',
                    riderPhone: '64465645',
                    ordersNumber: '100',
                    buyerBuilding: '',
                    goodsIntroduce: ''
                },
                {
                    number:'521',
                    money:'150元',
                    building:'22栋',
                    goods:'15',
                    time:'13:00',
                    status:1,
                    buyerName:'李哥',
                    riderName: '李四',
                    riderPhone: '321314144',
                    ordersNumber: '50',
                    buyerBuilding: '',
                    goodsIntroduce: ''
                },
                {
                    number:'555',
                    money:'250元',
                    building:'22栋',
                    goods:'20',
                    time:'13:00',
                    status:2,
                    buyerName:'王哥',
                    riderName: '王五',
                    riderPhone: '312123123',
                    ordersNumber: '20',
                    buyerBuilding: '',
                    goodsIntroduce: ''
                }
            ]
        }
    },
    methods: {
        handleSeach() {
            alert('查询成功')
        },
        handleStatus(status) {
            if (status===0) {
                return '待出库'
            } else if (status===1) {
                return '正在出库'
            } else if (status===2) {
                return '配送中'
            } else {
                return ''
            }
        },
        handleRiderStatus(status){
            let _this = this;
            return _this.checkForm.status === 1 ? '上班' : '下班' ;
        },
        handleChange(index, row) {
            let _this = this;
            _this.checkForm = row;
            _this.GcLock.check = !_this.GcLock.check;
        }
    },
    computed: {
        aRider: function (){
            let _this = this;
            var n = _this.checkForm.status === 1 ? '上班' : '下班' ;
            return '骑手姓名： '+ _this.checkForm.riderName +'   手机号码： '+ _this.checkForm.riderPhone+'   管理楼栋： '
            + _this.checkForm.buyerBuilding+'   工作状态： '+ n +'   订单总数： '+ _this.checkForm.ordersNumber;
        }
    }
}
</script>