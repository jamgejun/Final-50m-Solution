<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="buildingStatus" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="buildingStatus.name" placeholder="楼栋名"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="buildingStatus.status" placeholder="选择楼栋状态">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="停营" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
					<el-button type="primary" @click.native.prevent="openAdd">新增楼栋</el-button>
				</el-form-item>
            </el-form>
		</el-col>

		<!--列表-->
		<el-table :data="buildingList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="楼栋名" align="center" width="120" sortable>
			</el-table-column>
			<el-table-column prop="message" label="楼栋详情"  width="200" >
			</el-table-column>
			<el-table-column prop="status" label="运营状态" align="center" width="200" :forStatus="forStatus" >
                <template slot-scope="scope">
                    {{ handleStatus(scope.row.status) }}
                </template>
			</el-table-column>
			<el-table-column label="操作" min-width="180">
				<template slot-scope="scope">
					<el-button size="small" @click="handleMessage(scope.$index, scope.row)">查看详情</el-button>
                    <el-button size="small" @click="handleStatus(scope.$index, scope.row)">{{ scope.row.status === 1 ? '停止运营' : '恢复运营' }}</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

		<!--编辑界面-->
		<!-- <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog> -->

		<!--新增界面-->
		<el-dialog title="新增楼栋" :visible.sync="dialogVisible" :close-on-click-modal="false" >
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="楼栋名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="运营状态">
					<el-radio-group v-model="addForm.status">
						<el-radio class="radio" :label="1">正常</el-radio>
						<el-radio class="radio" :label="0">停营</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="详细信息">
					<el-input type="textarea" v-model="addForm.message"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="this.dialogVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../../common/js/util'
	export default {
		data() {
			return {
                // 控制表单载入状态
                listLoading: 0,

                // 新增楼栋
                dialogVisible:false,
                addLoading: 0,
                addForm: {
                    name:'',
                    message: '',
                    status: ''
                },
                addFormRules:{
                    name: {
                        required: true,
                        message: '请输入楼栋名',
                        trigger: 'blur'
                    },
                    message: {
                        required: true,
                        message: '请描述楼栋详细信息',
                        trigger: 'blur'
                    }
                },
                // 查看详情
                // 选择楼栋状态
                buildingStatus: {
                    name: '',
                    status: ''
                },

                // 楼栋列表
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
                ]
            }
		},
		methods: {
            // 处理楼栋运营状态
            handleStatus(status) {
                return status === 1 ? '正在运营' : '停运中'
            },
            selsChange() {

            },
            // 
            forStatus() {

            },
            // 处理查询
            handleSeach() {
                this.listLoading = 1;
                console.log(this.buildingStatus);
            },
            // 新增楼栋
            openAdd () {
                this.dialogVisible = true 
            },

            // 
            addSubmit() {
                // 表单验证
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确认提交?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            // 接口调用
                            this.dialogVisible = false
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
	}

</script>

<style scoped>
	.el-dialog__headerbtn {
		background: none;
		outline: none;
		border: none;
	}
</style>