<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="楼栋名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!-- 楼栋列表 -->
		<el-table :data="buildingList" class="building-table" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width:100%">
			<el-table-column type="selection" min-width=""></el-table-column>
			<el-table-column type="index" min-width=""></el-table-column>
			<el-table-column prop="buildingName" label="楼栋名" min-width="" sortable></el-table-column>
			<el-table-column prop="buildingMessage" label="详细信息" min-width=""></el-table-column>
			<el-table-column prop="buildingStatus" label="运营状态" min-width=""></el-table-column>
			<el-table-column label="操作" min-width="">
				<template scope="scope">
					<el-button size="small" @click="handleStop(scope.$index, scope.row)">{{scope.row.buildingStatus==="运营中"?'暂停运营':'恢复运营'}}</el-button>
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDelBuilding(scope.$index, scope.row, tableDate)">删除</el-button>
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
						<el-radio class="radio" :label="1">暂停</el-radio>
						<el-radio class="radio" :label="0">恢复</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="选择骑手">
					<el-select v-model="rider" clearable placeholder="请选择">
						<el-option
						v-for="item in riderList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="详细信息">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
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
				<el-form-item label="楼栋名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="骑手">
					<el-input v-model="addForm.riderName" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="服务仓库">
					<el-select v-model="addForm.repository" clearable placeholder="请选择">
						<el-option
						v-for="item in repositoryList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运营状态">
					<el-radio-group v-model="addForm.status">
						<el-radio class="radio" :label="1">运营</el-radio>
						<el-radio class="radio" :label="0">停业</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="详细信息">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
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
						buildingStatus: '暂停运营'
					},
					{
						buildingName: '20',
						buildingMessage: '具体信息。。。',
						buildingStatus: '运营中'
					},
					{
						buildingName: '20',
						buildingMessage: '具体信息。。。',
						buildingStatus: '运营中'
					},
					{
						buildingName: '20',
						buildingMessage: '具体信息。。。',
						buildingStatus: '运营中'
					}
				],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				
				editFormVisible: false,//编辑界面是否显示
				// 骑手列表
				riderList:  [
					{
						value: '选项1',
						label: '张三'
					},
					{
						value: '选项2',
						label: '李四'
					},
					{
						value: '选项3',
						label: '王某'
					}
				],
				rider: '',
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
					riderName: [
						{ required: true, message: '请输入骑手姓名', trigger: 'blur' }
					],
					repository: [
						{
							required: true, message: '请选择服务仓库' , trigger: 'blur'
						}
					]
				},
				repositoryList: [
					{
						value: '1',
						label:'北门一号仓'
					},
					{
						value: '2',
						label:'西门一号仓'
					},
					{
						value: '3',
						label:'樱花园一号仓',
					}
				],
				//新增界面数据
				addForm: {
					name: '',
					riderName: '',
					repository: '',
					status: 1,
					addr: ''
				}
			}
		},
		methods: {
			// 为某行添加状态
			tableRowClassName(row) {
				if (row.buildingStatus === '暂停运营') {
					console.log(row)
				return 'warning-row';
				} 
				return '';
			},
			// 删除楼栋
			handleDelBuilding(index, row) {
				console.log(index, row)
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$messa	ge({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
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
								this.getUsers();
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
								this.getUsers();
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
				var ids = this.sels.map(item => item.id).toString();
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
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		},
		mounted() {
			this.getUsers();
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