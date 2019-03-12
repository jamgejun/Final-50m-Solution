<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="buyerSearch" class="demo-form-inline">
                <el-form-item prop="realName" label="真实姓名">
                    <el-input v-model="buyerSearch.realName" placeholder="请输入买家真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input v-model="buyerSearch.phone" placeholder="请输入买家手机号"></el-input>
                </el-form-item>
                <el-form-item prop="createStartTime" label="注册时间">
                    <el-date-picker
                        v-model="buyerSearch.createStartTime"
                        type="date"
                        placeholder="开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="createEndTime" label="至">
                    <el-date-picker
                        v-model="buyerSearch.createEndTime"
                        type="date"
                        placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :data="buyerList" :default-sort="sortObj" v-loading = "loading" >
            <el-table-column prop="name" label="账户名"></el-table-column>
            <el-table-column prop="realName" label="真实姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="createTime" label="注册时间" sortable></el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="handleView(scope.$index, scope.row)" >查看订单详情</el-button>
                </template> 
            </el-table-column>
        </el-table>
        <!--订单详情界面--> 
        <el-dialog title="员工详细信息" :visible.sync="GcLock.check" :close-on-click-modal="false" min-width="60vw"> 
            <el-form v-model="buyerList2">
                <el-form :inline="true"> 
                <el-form-item label="微信昵称" style="width: 45%">{{buyerList2.nickName}}</el-form-item>
                <el-form-item label="性别">{{judgeSex(buyerList2.gender)}}</el-form-item>
                </el-form> 
                <el-form :inline="true">
                <el-form-item label="国家：" style="width: 45%">{{buyerList2.country}}</el-form-item> 
                <el-form-item label="省份：">{{buyerList2.province}}</el-form-item>
                </el-form> 
                <el-form :inline="true">
                <el-form-item label="城市：" style="width: 45%">{{buyerList2.city}}</el-form-item> 
                <el-form-item label="专业：">{{buyerList2.major}}</el-form-item>
                </el-form> 
            </el-form>
        </el-dialog>
    </section>
</template>

<script>
import { searchBuyer } from "../../api/buyer";
import util from "../../common/js/util";
export default {
    data() {
        return {
            //显示加载图标
            loading: false,
            //显示订单详情
            GcLock: {
                check: false
            }, 
            // 指定排序的prop行和order方式
            sortObj: {
                prop: 'joinTime',
                order: 'ascending'
            },
            buyerSearch: {
                realName: '',
                phone: '',
                createStartTime: '',
                createEndTime: ''
            },
            buyerList: [],
            buyerList2:[]
        }
    },
    //遍历所有卖家
    mounted: function () {
        let _this = this
        _this.loading = true
            searchBuyer(_this).then((res) => {
                _this.buyerList = res.data.data.rows
                _this.loading = false
            }).catch((err) => {
                console.log(err)
            });  
    },
    methods: {
        //处理查询
        handleSearch() {
            let _this = this
            _this.loading = true
            searchBuyer(_this,{
                realName:_this.buyerSearch.realName,
                phone:_this.buyerSearch.phone,
                createStartTime:_this.buyerSearch.createStartTime,
                createEndTime:_this.buyerSearch.createEndTime
            }).then((res) => {
            _this.buyerList = res.data.data.rows
            _this.loading = false
            }).catch((err) => {
            console.log(err)
            })
        },

        //点击查看员工信息
        handleView(index, row) { 
        let _this = this; 
        _this.GcLock.check = !_this.GcLock.check;
        _this.buyerList2 = row; 
        }, 

        //判断性别
        judgeSex(status) {
            return status === 1 ?  "男" : "女"
        }
    }
}
</script>

<style>

</style>
