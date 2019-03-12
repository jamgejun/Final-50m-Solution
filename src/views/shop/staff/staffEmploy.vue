<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="Employsearch" class="demo-form-inline">
                <el-form-item prop="realName" label="真实姓名">
                    <el-input v-model="Employsearch.realName" placeholder="请输入员工真实姓名"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手机号">
                    <el-input v-model="Employsearch.phone" placeholder="请输入员工手机号"></el-input>
                </el-form-item>
                <el-form-item prop="createStartTime" label="注册时间">
                    <el-date-picker
                        v-model="Employsearch.createStartTime"
                        type="date"
                        placeholder="请选择起始注册时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="createEndTime" label="至">
                    <el-date-picker
                        v-model="Employsearch.createEndTime"
                        type="date"
                        placeholder="请选择最后注册时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item> 
            </el-form>
        </el-col>
        <el-table :data="employList" v-loading = "loading">
            <el-table-column type="selection" label=""></el-table-column>
            <el-table-column prop="name" label="账号名"></el-table-column>
            <el-table-column prop="realName" label="真实姓名"></el-table-column>
            <el-table-column prop="type" label="账号类型">
                <template slot-scope="scope">
                    {{ handleAccountType(scope.row.type) }}
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <el-button size="small" type="primary"  @click="handleChange(scope.$index, scope.row)">重置密码</el-button>
                    <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增账号 -->
        <el-dialog :visible.sync="sElock.add">
            <el-form :data="addForm" :rules="FormRules" ref="addForm" :inline="true">
                <el-form-item prop="name" label="账号名">
                    <el-input placeholder="请输入账号名" v-model="addForm.name" left></el-input>
                </el-form-item>
                <el-form-item prop="userType" label="选择账号类型">
                    <el-select v-model="addForm.accountType" placeholder="选择账号类型">
                        <el-option value="0" label="仓库管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" label="确认密码">
                    <el-input type="password" v-model="addForm.checkPassword" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="repository" label="选择所属仓库">
                    <el-select v-model="addForm.repository">
                        <el-option
                            v-for="(item, index) in repositoryList"
                            :key="index"
                            :value="index"
                            :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="status" label="选择账号状态">
                    <el-select v-model="addForm.status">
                        <el-option value="0" label="正常"></el-option>
                        <el-option value="1" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('add', 'addForm')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>

        <!-- 重置账号 -->
        <el-dialog  title="重置密码" :visible.sync="sElock.reset">
            <el-form :data="changeForm" ref="changeForm">
                <el-form-item prop="password" label="账号密码">
                    <el-input type="password" v-model="changeForm.password" autoComplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassword" label="重复密码">
                    <el-input type="password" v-model="changeForm.checkPassword" autoComplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('reset', 'changeForm')">取消</el-button>
                <el-button type="primary" @click.native="resetSubmit('changeForm')">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { searchEmploy,  referEmploy, addEmploy, newEmploy } from "../../../api/staffManage/staffEmploy";
import util from "../../../common/js/util";
import { valid } from 'semver';
export default {
    data() {
        return {
            loading: false,
            sElock: {
                add: false,
                reset: false
            },
            addForm: {
                name: '',
                type: '',
                password: '',
                checkPassword: '',
                repository: '',
                status: '',
            },
            changeForm: {
                name: '',
                type: '',
                password: '',
                checkPassword: '',
                repository: '',
                status: '',
            },
            FormRules: {

            },
            employList: [],
            repositoryList : [],
            Employsearch: {
                realName: '',
                phone: '',
                createStartTime: '',
                createEndTime: ''
            }
        }
    },
    mounted: function () {
        let _this = this
        _this.loading = true
        searchEmploy(_this).then((res) => {
            _this.employList = res.data.data.rows
            _this.loading = false
            }).catch((err) => {
                console.log(err)
            });  
    },
    methods: {
        handleSeach() {
            let _this = this
            _this.loading = true
            searchEmploy(_this,{
                realName:_this.Employsearch.realName,
                phone:_this.Employsearch.phone,
                createStartTime:_this.Employsearch.createStartTime,
                createEndTime:_this.Employsearch.createEndTime
            }).then((res) => {
            _this.employList = res.data.data.rows
            _this.loading = false
            }).catch((err) => {
            console.log(err)
            })
        },
        handleChange(index, row) {
            let _this = this;
            _this.sElock.reset = !_this.sElock.reset;
        },

        //处理员工删除
        handleDelete() {
            let _this = this;
            _this.$confirm('是否删除该商品？删除后不可恢复！', '提示', {
                type: 'warning'
            }).then(() => {
                let oneIds = []
                oneIds.push(row.id) 
                deleteGoods(_this, {
                    ids: oneIds
                }).then((res) => {
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    _this.loading = true
                    getGoods(_this).then((res) => {
                        _this.goodsList = res.data.data.rows
                        _this.loading = false
                    })
                })
            }).catch(() => {})
        },

        //处理账户类型
        handleAccountType(type) {
            let _this = this;
            return type === 32 ? '仓库管理员' : '' ;
        },
        handleAdd() {
            let _this = this;
            _this.sElock.add = !_this.sElock.add;
        },
        cancer(lock, formName) {
            let _this = this;
            _this.sElock[lock] = false;
            _this.$refs[formName].resetFields();
        },

        // 新增员工提交
        addSubmit(formName) {
            let _this=this;
            // 表单验证
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$confirm('是否确认添加骑手?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        addEmploy(_this,{
                            name: _this.addForm.name,
                            userType: _this.addForm.userType,
                            password: _this.addForm.password,
                            checkPassword: _this.addForm.checkPassword,
                            repository: _this.addForm.repository,
                            status: _this.addForm.status
                        }).then((res) => {
                            console.log(res)
                            _this.$message({
                                type: "success",
                                message: "添加成功!"
                            });
                        })
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
        resetSubmit() {

        }
    }
}
</script>

<style>

</style>
