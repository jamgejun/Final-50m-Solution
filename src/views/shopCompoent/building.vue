<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="楼栋名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!-- 楼栋列表 -->
		<el-table :data="buildingList" class="building-table" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width:100%">
			<el-table-column type="selection" align="center" width="60" ></el-table-column>
			<el-table-column type="index" align="center" width="80"></el-table-column>
			<el-table-column prop="buildingName" label="楼栋名" align="center" width="120" sortable></el-table-column>
			<el-table-column prop="buildingMessage" label="信息描述" width="220"></el-table-column>
			<el-table-column label="运营状态" width="160">
				<template slot-scope="scope">
					{{scope.row.buildingStatus===1?'运营中':'暂停运营'}}
				</template>
			</el-table-column>
			<el-table-column prop="buildingRelatedRepository" label="所属仓库" width="220"></el-table-column>
			<el-table-column label="操作" min-width="220">
				<template scope="scope">
					<el-button size="small" @click="handleStop(scope.$index, scope.row)">{{scope.row.buildingStatus===1?'暂停运营':'恢复运营'}}</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDelBuilding(scope.$index, buildingList)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="楼栋名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="运营状态">
					<el-radio-group v-model="editForm.status">
						<el-radio class="radio" :label="1">运营</el-radio>
						<el-radio class="radio" :label="0">歇业</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="详细信息">
					<el-input type="textarea" v-model="editForm.information"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="楼栋名" prop="buildingName">
					<el-input v-model="addForm.buildingName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="运营状态">
					<el-radio-group v-model="addForm.buildingStatus">
						<el-radio class="radio" :label="1">运营</el-radio>
						<el-radio class="radio" :label="0">停业</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="详细信息">
					<el-input type="textarea" v-model="addForm.buildingMessage"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				// 楼栋列表
				buildingList: [
					{
						buildingName: '27',
						buildingMessage: '具体信息。。。',
						buildingStatus: 1,
						buildingRelatedRepository: '西门一号仓库'
					},
					{
						buildingName: '20',
						buildingMessage: '具体信息。。。',
						buildingStatus: 0,
						buildingRelatedRepository: '北门一号仓库'
					},
					{
						buildingName: '20',
						buildingMessage: '具体信息。。。',
						buildingStatus: 0,
						buildingRelatedRepository: '西门一号仓库'
					},
					{
						buildingName: '20',
						buildingMessage: '具体信息。。。',
						buildingStatus: 0,
						buildingRelatedRepository: '南门一号仓库'
					}
				],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					name:'',
					status: '',
					information: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					buildingName: [
						{ required: true, message: '请输入楼栋名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					buildingName: '',
					buildingStatus: '',
					buildingMessage: ''
				}
			}
		},
		methods: {
			// 为某行添加状态
			tableRowClassName(row) {
				if (row.buildingStatus === 0 ) {
				return 'warning-row';
				} 
				return '';
			},
			// 暂停/恢复
			handleStop(index, row) {
				var message = row.buildingStatus===1?'确认暂停运营吗？':'确认恢复运营吗?'
				this.$confirm( message, '提示', {
					type: 'warning'
				}).then(() => {
					this.buildingList[index].buildingStatus = (row.buildingStatus === 1 ? 0 : 1)
					this.$message({
						message: '操作成功',
						type: 'success'
					});
				})
			},
			// 删除楼栋
			handleDelBuilding(index, rows) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					rows.splice(index, 1);
					this.$message({
						message: '删除成功',
						type: 'success'
					});
					this.listLoading = false;
				}).catch(() => {

				});
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							console.log(para);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.buildingList.push(para);
								console.log(this.buildingList);
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.buildingName).toString();
				console.log(ids);
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
		}
	}

</script>

<style lang='scss'>
	.el-dialog__headerbtn {
		background: none;
		outline: none;
		border: none;
	}
	.building-table {
		.warning-row {
			background: #828282;
		}
	}
</style>