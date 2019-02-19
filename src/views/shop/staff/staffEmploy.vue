<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="Employsearch" class="demo-form-inline">
                <el-form-item prop="name">
                    <el-input v-model="Employsearch.name" placeholder="请输入员工账号名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item> 
            </el-form>
        </el-col>
        <el-table :data="employList">
            <el-table-column type="selection" label=""></el-table-column>
            <el-table-column prop="name" label="账号名"></el-table-column>
            <el-table-column prop="accountType" label="账号类型">
                <template slot-scope="scope">
                    {{ handleAccountType(scope.row.accountType) }}
                </template>
            </el-table-column>
            <el-table-column prop="Time" label="创建时间"></el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <el-button size="small" type="primary"  @click="handleChange(scope.$index, scope.row)">重置</el-button>
                    <el-button size="small" type="danger"  @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增账号 -->
        <el-dialog :visible.sync="sElock.add">
            <el-form :data="addForm" :rules="FormRules" ref="addForm" :inline="true">
                <el-form-item prop="name" label="账号名">
                    <el-input placeholder="请输入账号名" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="accountType" label="选择账号类型">
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
export default {
    data() {
        return {
            sElock: {
                add: false,
                reset: false
            },
            addForm: {
                name: '',
                accountType: '',
                password: '',
                checkPassword: '',
                repository: '',
                status: ''
            },
            changeForm: {
                name: '',
                accountType: '',
                password: '',
                checkPassword: '',
                repository: '',
                status: ''
            },
            FormRules: {

            },
            employList: [
                {
                    name: '121354',
                    accountType: 0,
                    Time: '2016-9-2',
                    status: 0,
                    password: '',
                    repository: ''
                }
            ],
            repositoryList : [
                {
                    name:'西门一号仓',
                    status: 0,
                    detail: '1212',
                    MyBuilding: [
                        {
                            name: '24栋',
                            message: '具体详情信息',
                            status: 0
                        },
                        {
                            name: '20栋',
                            message: '具体详情信息',
                            status: 1
                        },
                        {
                            name: '26栋',
                            message: '具体详情信息',
                            status: 0
                        }
                    ],
                },
                {
                    name:'南门一号仓',
                    status: 1,
                    detail: '1212',
                    MyBuilding: [
                        {
                            name: '26栋',
                            message: '具体详情信息',
                            status: 0
                        }
                    ],
                },
                {
                    name:'北门一号仓',
                    status: 0,
                    detail: '1212',
                    MyBuilding: [
                        {
                            name: '24栋',
                            message: '具体详情信息',
                            status: 0
                        },
                        {
                            name: '20栋',
                            message: '具体详情信息',
                            status: 1
                        }
                    ],
                }
            ],
            Employsearch: {
                name: ''
            }
        }
    },
    methods: {
        handleSeach() {

        },
        handleChange(index, row) {
            let _this = this;
            _this.sElock.reset = !_this.sElock.reset;
        },
        handleDel() {},
        handleAccountType(accountType) {
            let _this = this;
            return accountType === 0 ? '仓库管理员' : '' ;
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
        addSubmit() {

        },
        resetSubmit() {

        }
    }
}
</script>

<style>

</style>
