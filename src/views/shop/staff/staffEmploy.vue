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
            <el-table-column prop="email" label="邮箱" min-width="100"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="100"></el-table-column>
            <el-table-column label="操作" align="left" min-width="150">
                <template slot-scope="scope">
                    <el-button size="small" type="primary"  @click="handleChange(scope.$index, scope.row)">修改账号信息</el-button>
                    <el-button size="small" type="primary"  @click="handleChange2(scope.$index, scope.row)">修改密码</el-button>
                    <el-button size="small" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    

        <!-- 新增账号 -->
        <el-dialog title="新增账号" :visible.sync="sElock.add" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="FormRules" ref="addForm" >
                <el-form :inline="true">
                    <el-form-item prop="name" label="账号名称">
                        <el-input placeholder="请输入账号名" v-model="addForm.name" left auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="realName" label="真实姓名">
                        <el-input placeholder="请输入真实姓名" v-model="addForm.realName" left auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="账号密码" prop="password">
                        <el-input placeholder="请输入密码" v-model="addForm.password" autoComplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass" label="确认密码">
                        <el-input placeholder="请再依次输入密码" v-model="addForm.checkPassword" autoComplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item prop="phone" label="手机号码">
                        <el-input placeholder="请输入手机号码" v-model="addForm.phone" left auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="邮箱地址">
                        <el-input placeholder="请输入邮箱地址" v-model="addForm.email" left auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('add')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>
        <!-- 新增账号 -->
        <el-dialog title="验证密码" :visible.sync="sElock.check">
            <p>两次密码不一致</p>
        </el-dialog>

        <!-- 修改账号 -->
        <el-dialog  title="修改账号信息" :visible.sync="sElock.change" min-width="50vw">
            <el-form :model="changeForm" ref="changeForm" label-width="100px">
                <el-form :inline="true">
                    <el-form-item prop="realName" label="真实姓名">
                        <el-input placeholder="请输入真实姓名" v-model="changeForm.realName" autoComplete="false"></el-input>
                    </el-form-item>
                    <el-form-item prop="phone" label="手机号码">
                        <el-input placeholder="请输入手机号" v-model="changeForm.phone" autoComplete="false"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item prop="email" label="邮箱地址">
                        <el-input placeholder="请输入邮箱地址" v-model="changeForm.email" autoComplete="false"></el-input>
                    </el-form-item>
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('change')">取消</el-button>
                <el-button type="primary" @click.native="resetSubmit">提交</el-button>
            </div>
        </el-dialog>
        <!-- 修改密码 -->
        <el-dialog  title="修改账号密码" :visible.sync="sElock.change2" min-width="50vw">
            <el-form :model="changeForm" ref="changeForm" label-width="100px">
                <el-form :inline="true">
                    <el-form-item prop="password" label="账号密码">
                        <el-input placeholder="请输入新密码" v-model="changeForm.password" autoComplete="false"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPassword" label="重复密码">
                        <el-input placeholder="请再依次输入新密码" v-model="changeForm.checkPassword" autoComplete="false"></el-input>
                    </el-form-item>
                </el-form>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('change2')">取消</el-button>
                <el-button type="primary" @click.native="changeSubmit">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { searchEmploy, deleteEmploy, addEmploy, changeEmploy } from "../../../api/staffManage/staffEmploy";
import util from "../../../common/js/util";
import { valid } from 'semver';
export default {
    data() {
        return {
            // 模态框控制
            loading: false,
            // 处理模态框显示与隐藏
            sElock: {
                add: false,
                change: false,
                change2: false,
                check: false
            },
            addForm: {
                name: '',
                password: '',
                realName: '',
                checkPassword: '',
                phone: '',
                email: ''
            },
            changeForm: {
                realName: '',
                password: '',
                checkPassword: '',
                phone: '',
                email: ''
            },
            FormRules: {
            },
            employList: [],
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
            _this.sElock.change = !_this.sElock.change;
            _this.changeForm.id = row.id;
            _this.changeForm.realName = row.realName;
            _this.changeForm.phone = row.phone;
            _this.changeForm.email = row.email;
        },
        handleChange2(index, row) {
            let _this = this;
            _this.sElock.change2 = !_this.sElock.change2;
            _this.changeForm.id = row.id;
        },

        //删除单个员工
        handleDelete(index, row) {
            let _this = this;
            _this.$confirm('是否删除该员工？删除后不可恢复！', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: 'warning'
            }).then(() => {
                deleteEmploy(_this, row.id).then((res) => {
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    _this.loading = true
                    searchEmploy(_this).then((res) => {
                        _this.employList = res.data.data.rows
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
        cancer(lock) {
            let _this = this;
            _this.sElock[lock] = false;
        },

        // 新增员工提交
        addSubmit(formName) {
            let _this=this;
            if(_this.addForm.password==_this.addForm.checkPassword) {
                // 表单验证
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.$confirm('是否确认添加员工?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //关闭界面
                            _this.sElock.add = false
                            //接口调用
                            addEmploy(_this,{
                                name: _this.addForm.name,
                                realName: _this.addForm.realName,
                                password: _this.addForm.password,
                                phone: _this.addForm.phone,
                                email: _this.addForm.email,
                            }).then((res) => {
                                console.log(res)
                                _this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                _this.loading = true
                                searchEmploy(_this).then((res) => {
                                    _this.employList = res.data.data.rows
                                    _this.loading = false
                                })
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
            } else {
                //显示判断密码窗口
                _this.sElock.check = true;
            };
        },

        //修改账号信息后的提交
        resetSubmit() {
            let _this = this;
            //接口调用
            changeEmploy(_this, _this.changeForm.id, {
                realName: _this.changeForm.realName,
                phone: _this.changeForm.phone,
                password: _this.changeForm.password,
                email: _this.changeForm.email
            }).then((res) => {
                _this.$message({
                    type: "success",
                    message: "修改成功!"
                });
                //关闭界面
                _this.sELock.change = !_this.sELock.change;
                //重新遍历
                searchEmploy(_this);
            })
        },

        //修改账号密码后的提交
        changeSubmit() {
            let _this = this;
            if(_this.changeForm.password==_this.changeForm.checkPassword) {
                //接口调用
                changeEmploy(_this, _this.changeForm.id, {
                    password: _this.changeForm.password
                }).then((res) => {
                    _this.$message({
                        type: "success",
                        message: "修改成功!"
                    });
                    _this.sELock.change2 = !_this.sELock.change2;
                    searchEmploy(_this);
                })
            } else {
                _this.sElock.check = true
            }
        }
    }
}
</script>

<style>

</style>
