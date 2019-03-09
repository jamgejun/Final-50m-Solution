<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="buildingStatus" class="demo-form-inline">
        <el-form-item label>
          <el-input v-model="buildingStatus.name" placeholder="楼栋名"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-select v-model="buildingStatus.status" placeholder="选择楼栋状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="停营" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="openAdd">新增楼栋</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      :data="buildingList"
      highlight-current-row
      v-loading="loading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="楼栋名" align="center" width="120" sortable></el-table-column>
      <el-table-column prop="info" label="楼栋详情" width="200"></el-table-column>
      <el-table-column prop="statusName" label="运营状态" align="center" width="200"></el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="small" @click="handleMessage(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="small"
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            @click="handleStatus(scope.$index, scope.row)"
          >{{ scope.row.status === 1 ? '暂停运营' : '恢复运营' }}</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增楼栋" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="楼栋名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="运营状态" prop="status">
          <el-radio-group v-model="addForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停营</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="详细信息" prop="info">
          <el-input type="textarea" v-model="addForm.info"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="this.dialogVisible = false">取消</el-button>        
        <el-button type="primary" @click.native="addSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改楼栋" :visible.sync="GcLock.change" :close-on-click-model="false">
      <el-form :data="changeForm" label-width="100px" :rules="changeRules" ref="changeForm">
        <el-form-item label="楼栋名" prop="name">
          <el-input v-model="changeForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="楼栋详情" prop="info">
          <el-input v-model="changeForm.info" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:20x;">
        <el-button @click.native="GcLock.change = false">取消</el-button>
        <el-button type="primary" @click.native="changeSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from "../../../common/js/util";
//获取楼栋接口
import { searchBuilding, addBuilding, changeBuilding, deleteBuilding } from "../../../api/building_repository";
export default {
  data() {
    return {
      // 控制表单载入状态
      loading: false,
      id: '',
      // 模态框控制
      GcLock: {
        change: false
      },
      // 新增楼栋
      dialogVisible: false,
      addForm: {
        name: "",
        info: "",
        status: 1,
        storageId: '',
      },
      addFormRules: {
        name: [
          {
          required: true,
          message: "请输入楼栋名",
          trigger: "blur"
        },
        { max: 15, message: '用户名长度不超过15个字符', trigger: 'blur change' }
        ],
        status: {
          required: true,
          message: "选择楼栋运营状态",
        },
        info: {
          max: 40, message: '详细信息长度不超过40个字符'
        }

      },
      // 查看详情
      // 选择楼栋状态
      buildingStatus: {
        name: "",
        status: ""
      },

      // 楼栋列表
      buildingList: [],
      //修改
      changeForm: {
        id: '',
        name: "",
        info: ""
      },
      changeRules: {
        name: {
          max: 10, message: '楼栋名长度不超过10个字符'
        },
        info: {
          max: 40, message: '楼栋详情长度不超过40个字符'
        }
      }
    };
  },
  mounted: function () {
    let _this = this;
    _this.loading = !_this.loading
    searchBuilding(_this).then((res) => {
      _this.loading = !_this.loading
      _this.BuildingList = res.data.data.rows
    }).catch((err) => {

    });
  },
  methods: {
    // 处理楼栋运营状态
    handleStatus(index, row) {
      let _this = this;
      changeBuilding(_this, row.id, {
        status: row.status === 1 ? 2 : 1
      }).then((res) => {
        _this.$message({
            message: "操作成功",
            type: "success"
        });
        searchBuilding(_this);
      })
    },
    selsChange() {},
    //
    forStatus() {},
    // 处理查询
    handleSearch() {
      let _this = this
      _this.loading = !_this.loading
      searchBuilding(_this,{
        name:_this.buildingStatus.name,
        status:_this.buildingStatus.status
      }).then((res) => {
        _this.loading = !_this.loading
        _this.buildingList = res.data.data.rows
      }).catch((err) => {
        console.log(err)
      });
    },
    // 新增楼栋按钮
    openAdd() {
      let _this = this
      _this.dialogVisible = true
    },
    // 新增楼栋提交
    addSubmit() {
      let _this = this;
      // 表单验证
      _this.$refs["addForm"].validate(valid => {
        if (valid) {
          _this.$confirm("是否确认提交?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
              // 接口调用
              _this.dialogVisible = false;
              addBuilding(_this, {
                name: _this.addForm.name,
                info: _this.addForm.info,
                status: _this.addForm.status,
                storageId: _this.addForm.storageId
              }).then((res) => {
                console.log(res)
                _this.$message({
                  type: "success",
                  message: "添加成功!"
                });
                searchBuilding(_this);
              })
            }).catch(() => {
              
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //修改按钮
    handleMessage(index, row) {
      let _this = this;
      _this.GcLock.change = !_this.GcLock.change;
      _this.changeForm.id = row.id;
      _this.changeForm.name = row.name;
      _this.changeForm.info = row.info;
    },
    //修改后的提交按钮
    changeSubmit() {
      let _this = this;
      changeBuilding(_this, _this.changeForm.id, {
        name: _this.changeForm.name,
        info: _this.changeForm.info
      }).then((res) => {
        _this.$message({
            message: "操作成功",
            type: "success"
        });
        _this.GcLock.change = !_this.GcLock.change;
        searchBuilding(_this);
      })
    },
    //删除
    handleDel(index, row) {
      let _this = this
      _this
        .$confirm("是否删除 " + row.name + " ？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteBuilding(_this,row.id);
          _this.buildingList.splice(index, 1);
          _this.$message({
            message: "操作成功",
            type: "success"
          });
        }).catch(() => {
          _this.$message({
            message: "已取消",
            type: "success"
          });
        });
    },
  }
};
</script>

<style scoped>
.el-dialog__headerbtn {
  background: none;
  outline: none;
  border: none;
}
</style>