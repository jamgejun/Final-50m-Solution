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
                <el-form-item prop="building">
                    <el-select v-model="Ridersearch.building"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="isStaff">
                    <el-select v-model="Ridersearch.isStaff" placeholder="选择是否在职">
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="0" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增骑手</el-button>
                </el-form-item> 
            </el-form>
        </el-col>


        <el-table :data="RiderList">
            <el-table-column prop="jionTime" label="加入时间" align="center" width="120" sortable></el-table-column>
            <el-table-column prop="name" label="骑手姓名" align="center" width="120"></el-table-column>
            <el-table-column prop="phone" label="骑手手机号" align="center" width="120"></el-table-column>
            <el-table-column prop="serverBuilding" label="服务楼栋" align="center" width="120"></el-table-column>
            <el-table-column prop="isStaff" label="是否在职" align="center" width="120">
                <template slot-scope="scope">
                    {{ scope.row.isStaff === 1 ? '正常' : '暂停' }}
                </template>
            </el-table-column>
            <el-table-column prop="workStatus" label="工作状态" align="center" width="120">
                <template slot-scope="scope">
                    {{ scope.row.workStatus === 1 ? '上班' : '下班' }}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <el-button size="small" :type="scope.row.isStaff === 1 ? 'danger' : 'info'" @click="handleisStaff(scope.$index, scope.row)">
                        {{ scope.row.isStaff === 1 ? '暂停' : '恢复' }}
                    </el-button>
                    <el-button size="small" :type="scope.row.workStatus === 1 ? 'warning' : 'success'" @click="handleworkStatus(scope.$index, scope.row)">
                        {{ scope.row.workStatus === 1 ? '下班' : '上班' }}
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
                    <el-input type="number" v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item prop="serverBuilding" label="服务楼栋">
                    <el-select v-model="addForm.serverBuilding"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="isStaff" label="在职情况">
                    <el-select v-model="addForm.isStaff" placeholder="选择是否在职">
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="0" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="workStatus" label="工作状态">
                    <el-select v-model="addForm.workStatus" placeholder="选择工作状态">
                        <el-option value="1" label="正常"></el-option>
                        <el-option value="0" label="暂停"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('add', 'addForm')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>

        <!-- 修改骑手 -->
        <!-- 新增骑手 -->
        <el-dialog title="增加骑手" :visible.sync="RiderLock.change" :close-on-click-model="false" min-width="60vw">
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
                    <el-input type="number" v-model="changeForm.phone"></el-input>
                </el-form-item>
                <el-form-item prop="serverBuilding" label="服务楼栋">
                    <el-select v-model="changeForm.serverBuilding"  placeholder="请选择骑手服务楼栋">
                        <el-option 
                            v-for="(item, index) in buildingList"
                            :key="index"
                            :value="item.name"
                            :label="item.name"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="isStaff" label="在职情况">
                    <el-select v-model="changeForm.isStaff" placeholder="选择是否在职">
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
export default {
    data() {
        return {
            // 搜索框处理
            Ridersearch: {
                name:'',
                phone:'',
                building: '',
                isStaff: '',
                workStatus: '',
            },
            buildingList: [
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
            // 模态框控制
            RiderLock: {
                change: false,
                add: false
            },
            addForm: {
                jionTime: '',
                name: '',
                phone: '',
                serverBuilding: '',
                isStaff: '正常',
                workStatus: '暂停',
                otherCommit: ''
            },
            changeForm: {
                jionTime: '',
                name: '',
                phone: '',
                serverBuilding: '',
                isStaff: 0,
                workStatus: 0,
                otherCommit: ''
            },
            // 骑手列表
            RiderList: [
                {
                    jionTime: '2018-9-10',
                    name: '张某',
                    phone: '110',
                    serverBuilding: '24栋',
                    isStaff: 0,
                    workStatus: 0,
                    otherCommit: ''
                },
                {
                    jionTime: '2018-10-10',
                    name: '李某',
                    phone: '120',
                    serverBuilding: '27栋',
                    isStaff: 0,
                    workStatus: 1,
                    otherCommit: ''
                },
                {
                    jionTime: '2018-9-8',
                    name: '宋某',
                    phone: '119',
                    serverBuilding: '25栋',
                    isStaff: 1,
                    workStatus: 0,
                    otherCommit: ''
                },
            ]
        }
    },
    methods: {
        handleSeach() {

        },
        handleAdd() {
            let _this = this; 
            _this.RiderLock.add = !_this.RiderLock.add;
        },
        cancer(lock, formName) {
            let _this = this;
            _this.RiderLock[lock] = false;
            _this.$refs[formName].resetFields();
        },
        handleisStaff(index, row) {
            let _this = this;
            _this.RiderList[index].isStaff = row.isStaff === 0 ? 1 : 0;
        },
        handleworkStatus(index, row) {
            let _this = this;
            _this.RiderList[index].workStatus = row.workStatus === 0 ? 1 : 0;
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
                        _this.RiderList.push(this.addForm);
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        _this.$refs[formName].resetFields();
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
        }
    }
}
</script>

<style>

</style>
