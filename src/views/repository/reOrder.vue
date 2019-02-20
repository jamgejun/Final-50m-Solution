<template>
<div >
    <!--订单状态栏-->
    <div class="menuList">
        <el-ul>
            <el-li class="nav" v-for="(item,index) in list" :key="item.id" :class="{active:num==index}" @click="getNum(index)">
                {{item}}
            </el-li>
        </el-ul>
    </div>
    <div class="menuList2" v-show="0 == num">
        <el-li class="nav2" v-for="(item,index) in list2" :key="item.id2" :class="{active:num2==index}" @click="getNum2(index)" >
            {{item}}
        </el-li>
    </div>
    
    <!--不同界面显示-->
    <div class="tabCon">
        <!--待出库-->
        <el-table :data="order2" highlight-current-row v-loading="loading" v-show="num == 1">
            <el-table-column prop="goodsNumber" label="订单编号" sortable></el-table-column>
            <el-table-column prop="money" label="订单金额" align="center"></el-table-column>
            <el-table-column prop="buildingName" label="订单楼栋" align="center"></el-table-column>
            <el-table-column prop="number" label="商品件数" align="center"></el-table-column>
            <el-table-column prop="time" label="下单时间" sortable></el-table-column>
            <el-table-column prop="riderName" label="配送骑手姓名" align="center" ></el-table-column>
            <el-table-column prop="riderPhone" label="骑手手机号" align="center" ></el-table-column>、
            <el-table-column prop="status" label="订单状态" align="center" >
                <template slot-scope="scope">
                    {{ handleOrder2Status(scope.row.status) }}
                    <el-button size="small">打印订单</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!--带配送-->
        <el-table :data="order" highlight-current-row v-loading="loading" style="width: 100%;" v-show="num == 2">
            <el-table-column prop="goodsNumber" label="订单编号" style="width: 25%;" sortable></el-table-column>
            <el-table-column prop="money" label="订单金额" align="center" style="width: 10%;" ></el-table-column>
            <el-table-column prop="buildingName" label="订单楼栋" align="center" style="width: 10%;"></el-table-column>
            <el-table-column prop="number" label="商品件数" align="center" style="width: 5%;"></el-table-column>
            <el-table-column prop="time" label="下单时间" style="width: 20%;" sortable></el-table-column>
            <el-table-column prop="riderName" label="配送骑手姓名" align="center" style="width: 10%;"></el-table-column>
            <el-table-column prop="riderPhone" label="骑手手机号" align="center" style="width: 20%;"></el-table-column>
        </el-table>

        <!--待认领订单维度-->
        <div v-for='(itemCon,index) in tabContents' :key="itemCon.id2" v-show="index == num2 && num == 0">
            <el-table :data="order" highlight-current-row v-loading="loading" style="width: 100%;" v-show="num2 == 0 && num == 0">
                <el-table-column prop="goodsNumber" label="订单编号" style="width: 25%;" sortable></el-table-column>
                <el-table-column prop="money" label="订单金额" align="center" style="width: 10%;" ></el-table-column>
                <el-table-column prop="buildingName" label="订单楼栋" align="center" style="width: 10%;"></el-table-column>
                <el-table-column prop="number" label="商品件数" align="center" style="width: 5%;"></el-table-column>
                <el-table-column prop="time" label="下单时间" style="width: 20%;" sortable></el-table-column>
                <el-table-column prop="riderName" label="配送骑手姓名" align="center" style="width: 10%;"></el-table-column>
                <el-table-column prop="riderPhone" label="骑手手机号" align="center" style="width: 20%;"></el-table-column>
            </el-table>

            <!--待认领骑手维度-->
            <el-table :data="rider" style="width: 100%;" v-show="num2 == 1 && num == 0">
                <el-table-column prop="riderName" label="骑手姓名" align="center" style="width: 10%;"></el-table-column>
                <el-table-column prop="riderPhone" label="骑手手机号" style="width: 25%;"></el-table-column>
                <el-table-column prop="status" label="骑手工作状态" style="width: 35%;">
                    <template slot-scope="scope">
                        {{ handleRiderStatus(scope.row.status) }}
                    </template>
                </el-table-column>
                <el-table-column prop="ordersNumber" label="待认领订单总数" align="center" style="width: 5%;"></el-table-column>
                <el-table-column label="操作" style="width: 25%;">
                    <template slot-scope="scope">
                        <el-button size="small" @click="openOrder()">查看订单详情</el-button>
                        <el-button type="danger" size="small">更换骑手</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    
    <!--订单详情界面-->
    <el-dialog title="订单信息" :visible.sync="dialogVisible" :close-on-click-modal="false" >
        <el-table :data="order" label-width="80px">
            <el-table-column label="订单编号" prop="goodsNumber" width="220">
            </el-table-column>
            <el-table-column label="订单金额" prop="money" width="120">
            </el-table-column>
            <el-table-column label="订单楼栋" prop="buildingName" width="120">
            </el-table-column>
            <el-table-column label="商品件数" prop="number" width="120">
            </el-table-column>
            <el-table-column label="下单时间" prop="time" width="120" sortable>
            </el-table-column>
        </el-table>
    </el-dialog>

</div>
</template>

<script>
export default {
    data(){
        return{
            //维度控制表单载入状态
            listLoading: 0,
            num:0,
            num2:0,
            list:["待认领","待出库","带配送"],
            list2:["订单维度","骑手维度"],
            tabContents: [
                "订单",
                "骑手" 
            ],
            //订单列表
            order:[
                {
                    goodsNumber: '0000000',
                    money: '25元',
                    buildingName: '22栋',
                    number: '2件',
                    time: '2019-01-28',
                    riderName: '张三',
                    riderPhone: '2142354325'
                },
                {
                    goodsNumber: '1111111',
                    money: '15元',
                    buildingName: '22栋',
                    number: '1件',
                    time: '2019-01-28',
                    riderName: '李四',
                    riderPhone: '159873947'
                }
            ],
            //骑手列表
            rider:[
                {
                riderName:'张三',
                riderPhone: '2142354325',
                status:0,
                ordersNumber:'1',
                reason:'一天 生病'
                },
                {
                riderName:'李四',
                riderPhone: '159873947',
                status:1,
                ordersNumber:'1',
                reason:''
                }
            ],

            //显示订单详情
            dialogVisible:false,
            showLoading: 0,
            showOrder:[
                {
                goodsNumber: '0000000',
                money: '25元',
                buildingName: '22栋',
                number: '2件',
                time: '2019-01-28'
                }
            ],

            //待出库列表
            order2:[
                {
                    goodsNumber: '0000002',
                    money: '15元',
                    buildingName: '22栋',
                    number: '1件',
                    time: '2019-01-29',
                    riderName: '王五',
                    riderPhone: '142354325',
                    status:0

                }
            ],
        }
    },
    
    methods:{
        //更换订单界面
        getNum(index){
            this.num = index;
        },
        //更换维度
        getNum2(index){
            this.num2 = index;
        },
        // 处理查询
        handleSeach() {
            this.listLoading = 1;
            console.log(this.buildingStatus);
        },
        //查看订单
        openOrder(){
            this.dialogVisible = true
        },
        //处理骑手状态
        handleRiderStatus(rider) {
            return rider.status === 1 ? '上班' : '下班 '+ rider.reason;
        },
        //处理订单状态
        handleOrder2Status(order2) {
            return order2.status === 1 ? '正在出库' : '待出库 ';
        }
    } 
}
</script>

<style scoped>
.active {
color: #18c79c;
background: rgb(228, 241, 241);
}

.menuList {
height: 35px ;
background-color: rgb(228, 241, 241);
color:rgb(72, 106, 103);
font-size: 22px;
}
.menuList2 {
height: 35px ;
background-color: rgb(228, 241, 241);
color:rgb(72, 106, 103);
font-size: 18px;
}

.nav{
display: inline-block;
margin-left: 180px;
cursor: pointer;
}
.nav2{
display: inline-block;
margin-left: 260px;
cursor: pointer;
}
.tabCon {
margin: 0 auto;
padding: 0px 0px;
color: #999;
font-size: 14px;
background-color: #fff;
}
</style>