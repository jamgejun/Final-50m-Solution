<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="Ridersearch" class="demo-form-inline">
                <el-form-item prop="realName">
                    <el-input v-model="Ridersearch.realName" placeholder="请输入骑手姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone">
                    <el-input v-model="Ridersearch.phone" placeholder="请输入骑手手机号"></el-input>
                </el-form-item>
                <el-form-item prop="apartmentId">
                    <el-select v-model="Ridersearch.apartmentId"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.realName"
                            :label="item.realName"
                            >
                        </el-option>
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
        </el-table>

        <!-- 新增骑手 -->
        <el-dialog title="增加骑手" :visible.sync="RiderLock.add" :close-on-click-model="false" min-width="60vw">
            <el-form :model="addForm" ref="addForm">
                <el-form-item prop="realName" label="骑手姓名">
                    <el-input v-model="addForm.realName"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="骑手电话">
                    <el-input type="text" v-model="addForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('add', 'addForm')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { searchRider, referRider, addRider, changeRider, updateRider, deleteRider } from "../../../api/staffManage/staffRider";
export default {
    data() {
        return {
            // 搜索框处理
            Ridersearch: {
                realName:'',
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
                realName: '',
                phone: '',
                apartmentId: '',
                positionStatus: 10,
                workStatus: 9,
            },
            changeForm: {
                jionTime: '',
                realName: '',
                phone: '',
                apartmentId: '',
                positionStatus: '',
                workStatus: '',
            },
            // 骑手列表
            RiderList: []
        }
    },
    mounted: function () {
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
    methods: {
        handleSearch() {

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
            _this.$confirm('是否删除 '+row.realName+' 骑手？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteRider(_this,row.id);
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
                            apartmentId:_this.Ridersearch.apartmentId,
                            positionStatus:_this.Ridersearch.positionStatus
                        }))
                        newRider((_this, {
                            realName:_this.Ridersearch.realName,
                            phone:_this.Ridersearch.phone
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
        changeSubmit(formName) {
            let _this = this;
            changeRider(_this, _this.changeForm.id, {
                apartmentId: _this.changeForm.apartmentId,
                workStatus: _this.changeForm.workStatus,
                positionStatus: _this.changeForm.positionStatus
            }).then((res) => {
                _this.$message({
                    message: "操作成功",
                    type: "success"
                });
                _this.RiderLock.change = !_this.RiderLock.change;
                searchRider(_this);
            })
            updateRider(_this, _this.changeForm.id, {
                realName: _this.changeForm.realName,
                phone: _this.changeForm.phone
            }).then((res) => {
                _this.$message({
                    message: "操作成功",
                    type: "success"
                });
                _this.RiderLock.change = !_this.RiderLock.change;
                searchRider(_this);
            })

        }
    }
};
</script>

<style>

</style>
