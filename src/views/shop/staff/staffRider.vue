<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="Ridersearch" class="demo-form-inline">
                <el-form-item prop="name">
                    <el-input v-model="Ridersearch.name" placeholder="请输入骑手姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="Ridersearch.phone" placeholder="请输入骑手手机号"></el-input>
                </el-form-item>
                <el-form-item prop="apartmentId">
                    <el-select v-model="Ridersearch.apartmentId"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="positionStatus">
                    <el-select v-model="Ridersearch.positionStatus" placeholder="选择是否在职">
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="0" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增骑手</el-button>
                </el-form-item> 
            </el-form>
        </el-col>


        <el-table :data="RiderList">
            <el-table-column prop="jionTime" label="加入时间" align="center" width="120" sortable></el-table-column>
            <el-table-column prop="realName" label="骑手姓名" align="center" width="120"></el-table-column>
            <el-table-column prop="phone" label="骑手手机号" align="center" width="120"></el-table-column>
            <el-table-column label="服务楼栋" align="center" width="120">
                <template slot-scope="scope">
                    {{  scope.row.apartmentId }}
                </template>
            </el-table-column>
            <el-table-column prop="positionStatus" label="是否在职" align="center" width="120">
                <template slot-scope="scope">
                    {{ scope.row.positionStatus === 10 ? '正常' : '暂停' }}
                </template>
            </el-table-column>
            <el-table-column prop="workStatus" label="工作状态" align="center" width="120">
                <template slot-scope="scope">
                    {{ scope.row.workStatus === 8 ? '上班' : '下班' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <el-button size="small" :type="scope.row.positionStatus === 10 ? 'danger' : 'info'" @click="handlePositionStatus(scope.$index, scope.row)">
                        {{ scope.row.positionStatus === 10 ? '暂停' : '恢复' }}
                    </el-button>
                    <el-button size="small" :type="scope.row.workStatus === 8 ? 'warning' : 'success'" @click="handleworkStatus(scope.$index, scope.row)">
                        {{ scope.row.workStatus === 8 ? '下班' : '上班' }}
                    </el-button>
                    <el-button size="small" type="primary"  @click="handleChange(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger"  @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增骑手 -->
        <el-dialog title="增加骑手" :visible.sync="RiderLock.add" :close-on-click-model="false" min-width="60vw">
            <el-form :model="addForm" ref="addForm" :inline="true">
                <el-form-item prop="name" label="骑手姓名">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="jionTime" label="加入时间">
                    <el-date-picker
                        v-model="addForm.jionTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="phone" label="骑手电话">
                    <el-input type="text" v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item prop="apartmentId" label="服务楼栋">
                    <el-select v-model="addForm.apartmentId"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="positionStatus" label="在职情况">
                    <el-select v-model="addForm.positionStatus" placeholder="选择是否在职">
                        <el-option value="10" label="正常"></el-option>
                        <el-option value="11" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="workStatus" label="工作状态">
                    <el-select v-model="addForm.workStatus" placeholder="选择工作状态">
                        <el-option value="8" label="上班"></el-option>
                        <el-option value="9" label="下班"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('add', 'addForm')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>

        <!-- 修改骑手 -->
        <el-dialog title="修改骑手" :visible.sync="RiderLock.change" :close-on-click-model="false" min-width="60vw">
            <el-form :model="changeForm" ref="changeForm" :inline="true">
                <el-form-item prop="name" label="骑手姓名">
                    <el-input v-model="changeForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="jionTime" label="加入时间">
                    <el-date-picker
                        v-model="changeForm.jionTime"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="phone" label="骑手电话">
                    <el-input type="text" v-model="changeForm.phone"></el-input>
                </el-form-item>
                <el-form-item prop="apartmentId" label="服务楼栋">
                    <el-select v-model="changeForm.apartmentId"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="positionStatus" label="在职情况">
                    <el-select v-model="changeForm.positionStatus" placeholder="选择是否在职">
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="0" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="workStatus" label="工作状态">
                    <el-select v-model="changeForm.workStatus" placeholder="选择工作状态">
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="0" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('change', 'changeForm')">取消</el-button>
                <el-button type="primary" @click.native="changeSubmit('changeForm')">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { searchRider, referRider, addRider, changeRider, deleteRider } from "../../../api/staffEmploy_staffRider";
export default {
    data() {
        return {
            // 搜索框处理
            Ridersearch: {
                name:'',
                phone:'',
                apartmentId: '',
                positionStatus: '',
                workStatus: '',
            },
            buildingList: [],
            // 模态框控制
            RiderLock: {
                change: false,
                add: false
            },
            addForm: {
                jionTime: '',
                name: '',
                phone: '',
                apartmentId: '',
                positionStatus: '正常',
                workStatus: '暂停',
            },
            changeForm: {
                jionTime: '',
                name: '',
                phone: '',
                apartmentId: '',
                positionStatus: 0,
                workStatus: 0,
            },
            // 骑手列表
            RiderList: []
        }
    },
    methods: {
        handleSearch() {
            let _this = this
                referRider(_this).then((res) => {
                    let RiderList = res.data.data.rows
                    _this.RiderList = res.data.data.rows
                    searchRider(_this, {
                        apartmentId:_this.Ridersearch.apartmentId,
                        positionStatus:_this.Ridersearch.positionStatus
                    }).then((res) => {
                        for (let i = 0; i<RiderList.length; i++) {
                            for (let k = 0; k<res.data.data.rows.length; k++) {
                                if (RiderList[i].id === res.data.data.rows[k].riderId) {
                                    RiderList[i].apartmentId = res.data.data.rows[k].apartmentId
                                } else {
                                    RiderList[i].apartmentId = ''
                                }
                            }
                        }
                         _this.RiderList = RiderList
                    }).catch((err) => {
                        console.log(err)
                    });  
                })
        },
        handleAdd() {
            let _this = this; 
            _this.RiderLock.add = !_this.RiderLock.add;
            console.log(_this.RiderLock.add)
        },
        cancer(lock, formName) {
            let _this = this;
            _this.RiderLock[lock] = false;
            _this.$refs[formName].resetFields();
        },
        handlePositionStatus(index, row) {
            let _this = this;
            _this.RiderList[index].positionStatus = row.positionStatus === 11 ? 10 : 11;
        },
        handleworkStatus(index, row) {
            let _this = this;
            _this.RiderList[index].workStatus = row.workStatus === 9 ? 8 : 9;
        },
        handleDel(index, row) {
            let _this = this;
            _this.$confirm('是否删除 '+row.name+' 骑手？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.RiderList.splice(index, 1);
                _this.$message({
                    message: '操作成功',
                    type: 'success'
                });
            }).catch(() => {
                _this.$message({
                    message: '已取消',
                    type: 'success'
                });
            })
        },
        addSubmit(formName) {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$confirm('是否确认添加骑手?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        addRider((_this, {
                            workStatus:_this.Ridersearch.workStatus,
                            apartmentId:_this.Ridersearch.apartmentId,
                            positionStatus:_this.Ridersearch.positionStatus
                        }).then((res) => {
                        _this.RiderList.push(this.addForm);
                        _this.$message({
                             message: '操作成功',
                             type: 'success'
                        });
                        _this.$refs[formName].resetFields();
                        }))
                        }).catch(() => {
                        _this.$message({
                            message: '已取消',
                            type: 'success'
                        });
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                };
            })
        },
        handleChange (index, row) {
            let _this = this;
            _this.RiderLock.change = !_this.RiderLock.change;
            _this.changeForm = row;
        },
    }
};
</script>

<style>

</style>
