<template>
  <section>
    <el-col :span="24" class="toolbar">
      <el-form :inline="true" :model="RpSearch" class="demo-form-inline">
        <el-form-item label>
          <el-input v-model="RpSearch.name" placeholder="仓库名"></el-input>
        </el-form-item>
        <el-form-item label>
          <el-select v-model="RpSearch.status" placeholder="选择仓库状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="停营" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAddRp">新增仓库</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="RpList">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="仓库名" align="center" width="120" sorttable></el-table-column>
      <el-table-column prop="detail" label="仓库详情" width="200"></el-table-column>
      <el-table-column prop="status" label="运营状态" align="center" width="200">
        <template slot-scope="scope">{{ scope.row.status === 1 ? '恢复运营' : '暂停运营' }}</template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" @click="handleMyBuilding(scope.$index, scope.row)">关联楼栋</el-button>
          <el-button
            size="small"
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            @click="changeStatus(scope.$index, scope.row)"
          >{{ scope.row.status ===1 ? '暂停运营' : '恢复运营' }}</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改仓库 -->
    <el-dialog title="修改仓库" :visible.sync="SwitchLock.changeStatus" :close-on-click-model="false">
      <el-form :data="changeForm" label-width="80px" ref="changeForm">
        <el-form-item label="仓库名" prop="name">
          <el-input v-model="changeForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="仓库详情" prop="detail">
          <el-input type="textarea" v-model="changeForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="SwitchLock.changeStatus = false">取消</el-button>
        <el-button type="primary" @click.native="changeSubmit">提交</el-button>
      </div>
    </el-dialog>

    <!-- 关联楼栋 -->
    <el-dialog
      title="关联楼栋"
      width="80%"
      custom-class="aRelationStatus"
      :visible.sync="SwitchLock.RelationStatus"
      :close-on-click-modal="true"
    >
      <div>
        <el-col>
          <h2>已关联</h2>
          <el-table :data="RelationForm.areadyRelation">
            <el-table-column type="selection"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="name" label="仓库名" align="center" sorttable></el-table-column>
            <el-table-column prop="message" label="楼栋详情"></el-table-column>
            <el-table-column prop="status" label="运营状态" align="center">
              <template slot-scope="scope">{{ handleStatus(scope.row.status) }}</template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col>
          <h2>未关联</h2>
          <el-table :data="RelationForm.noRelation"></el-table>
        </el-col>
        <div :span="24" :inline="false" slot="footer" class="dialog-footer" style="margin-top:20x;">
          <el-button @click.native="SwitchLock.RelationStatus = false">取消</el-button>
          <el-button type="primary" @click.native="changeSubmit">提交</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 新增仓库 -->
    <el-dialog title="新增仓库" :visible.sync="SwitchLock.addStatus" :close-on-click-model="false">
      <el-form :data="addForm" label-width="80px" ref="changeForm">
        <el-form-item label="仓库名" prop="name">
          <el-input v-model="changeForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="运营状态">
          <el-radio-group v-model="addForm.status">
            <el-radio class="radio" :label="1">正常</el-radio>
            <el-radio class="radio" :label="0">停营</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="仓库详情" prop="detail">
          <el-input type="textarea" v-model="changeForm.detail"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="margin-top:20x;">
        <el-button @click.native="SwitchLock.addStatus = false">取消</el-button>
        <el-button type="primary" @click.native="changeSubmit">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // 模态框开关
      SwitchLock: {
        // 增加仓库
        addStatus: false,
        // 关联仓库
        RelationStatus: false,
        // 修改
        changeStatus: false
      },
      changeForm: {
        name: "",
        detail: ""
      },
      RelationForm: {
        areadyRelation: [],
        noRelation: []
      },
      addForm: {
        name: "",
        detail: "",
        status: 1
      },
      // 顶部搜索框
      RpSearch: {
        name: "",
        status: ""
      },
      RpList: [
        {
          name: "西门一号仓",
          status: 0,
          detail: "1212",
          MyBuilding: [
            {
              name: "24栋",
              message: "具体详情信息",
              status: 0
            },
            {
              name: "20栋",
              message: "具体详情信息",
              status: 1
            },
            {
              name: "26栋",
              message: "具体详情信息",
              status: 0
            }
          ]
        },
        {
          name: "南门一号仓",
          status: 1,
          detail: "1212",
          MyBuilding: [
            {
              name: "26栋",
              message: "具体详情信息",
              status: 0
            }
          ]
        },
        {
          name: "北门一号仓",
          status: 0,
          detail: "1212",
          MyBuilding: [
            {
              name: "24栋",
              message: "具体详情信息",
              status: 0
            },
            {
              name: "20栋",
              message: "具体详情信息",
              status: 1
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 搜索工具栏

    // 处理搜索
    handleSearch() {},
    // 新增
    handleAddRp() {
      let _this = this;
      _this.SwitchLock.addStatus = !_this.SwitchLock.addStatus;
    },

    // 处理运营状态
    changeStatus(index, row) {
      let _this = this;
      _this.RpList[index].status = row.status === 0 ? 1 : 0;
    },
    // 修改
    handleChange(index, row) {
      let _this = this;
      _this.SwitchLock.changeStatus = !_this.SwitchLock.changeStatus;
      _this.changeForm.name = row.name;
      _this.changeForm.detail = row.detail;
    },
    // 关联仓库
    handleMyBuilding(index, row) {
      let _this = this;
      _this.SwitchLock.RelationStatus = !_this.SwitchLock.RelationStatus;
      _this.RelationForm.areadyRelation = row.MyBuilding;
      _this.RelationForm.noRelation = [];
    },
    // 删除
    handleDelete(index, row) {
      let _this = this;
      _this
        .$confirm("是否删除 " + row.name + " 仓库？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.RpList.splice(index, 1);
          _this.$message({
            message: "操作成功",
            type: "success"
          });
        })
        .catch(() => {
          _this.$message({
            message: "已取消",
            type: "success"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dialog--small {
  width: 80% !important;
}
h2 {
  font-size: 14px;
  color: rgb(36, 36, 36);
}
</style>
