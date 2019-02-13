<template>
    <section>
        <!-- 工具搜索栏 -->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="GcSearch" class="demo-form-inline"> 
                <el-form-item label="">
                    <el-input v-model="GcSearch.name" placeholder="请输入二级分类名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增分类</el-button>
                </el-form-item> 
            </el-form>
        </el-col>

        <el-table :data="SecondList">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column prop="name" label="分类名" align="center" width="100"></el-table-column>
            <el-table-column prop="index" width="120" label="显示顺序号" sorttable></el-table-column>
            <el-table-column label="操作" min-width="120" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增分类 -->
        <el-dialog title="新增分类" :visible.sync="GcLock.addCategory" :close-on-click-model="false" :modal="false" min-width="60vh">
            <el-form :data="addForm" label-width="100px" ref="addForm">
                <el-form-item label="分类名">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序号">
                    <el-select v-model="addForm.index" placeholder="选择显示序号">
                        <el-option 
                            v-for="CategoryIndex in CategoryIndexs"
                            :key="CategoryIndex.value"
                            :label="CategoryIndex.label"
                            :value="CategoryIndex.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="GcLock.addCategory = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="新增分类" :visible.sync="GcLock.change" :close-on-click-model="false" :modal="false" min-width="60vh">
            <el-form :data="changeForm" label-width="100px" ref="changeForm">
                <el-form-item label="分类名">
                    <el-input v-model="changeForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序号">
                    <el-select v-model="changeForm.index" placeholder="选择显示序号">
                        <el-option 
                            v-for="CategoryIndex in CategoryIndexs"
                            :key="CategoryIndex.value"
                            :label="CategoryIndex.label"
                            :value="CategoryIndex.value">
                        </el-option>
                    </el-select>
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
import secondCategory from "./secondCategory.vue"
export default {
    props: {
        SecondList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            // 模态框控制
            GcLock: {
                addCategory: false,
                change: false,
                manageSecond: false
            },
            // 搜索框
            GcSearch: {
                name: ''
            },
            // 新增
            addForm: {
                name: '',
                index: '',
                status: ''
            },
            CategoryIndexs: [
                {
                    value: '1',
                    label: '1'
                },
                {
                    value: '2',
                    label: '2'
                },
                {
                    value: '3',
                    label: '3'
                }
            ],
            addFormRules: {

            },
            changeForm: {
                name: '',
                index: '',
                status: ''
            },
            GcList: [
                {
                    name: '零食',
                    index: 5,
                    status: 0
                },
                {
                    name: '果蔬',
                    index: 4,
                    status: 2
                },
                {
                    name: '生鲜',
                    index: 3,
                    status: 1
                },
                {
                    name: '零食',
                    index: 2,
                    status: 1
                },
            ]
        }
    },
    methods: {
        handleSeach() {
            console.log(this.GcSearch.name);
            alert('查询成功')
        },
        handleAdd() {
            let _this = this;
            _this.GcLock.addCategory = !_this.GcLock.addCategory
        },
        addSubmit() {
            console.log(addForm);
        },

        handleStatus(status) {
            if (status===0) {
                return '关闭'
            } else if (status===1) {
                return '显示在首页'
            } else if (status===2) {
                return '显示在分页'
            } else {
                return ''
            }
        },
        handleChange(index, row) {
            let _this = this;
            _this.GcLock.change = !_this.GcLock.change;
            _this.changeForm.name = row.name;
            _this.changeForm.index = row.index;
            _this.changeForm.status = _this.handleStatus(row.status);
        },
        handleSecond(index, row) {
            let _this = this;
            _this.GcLock.manageSecond = !_this.GcLock.manageSecond;
        }
    }
}
</script>

<style>

</style>
