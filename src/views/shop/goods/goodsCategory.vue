<template>
    <section>
        <!-- 工具搜索栏 -->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="GcSearch" class="demo-form-inline"> 
                <el-form-item label="">
                    <el-input v-model="GcSearch.name" placeholder="请输入一级分类名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增一级分类</el-button>
                </el-form-item> 
            </el-form>
        </el-col>

        <el-table :data="GcList">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="分类名" align="center" width="120"></el-table-column>
            <el-table-column prop="displayIndex" width="120" label="显示顺序号" sorttable></el-table-column>
            <el-table-column prop="displayTypeName" label="显示状态" align="center" width="200"></el-table-column>
            <el-table-column label="操作" min-width="200" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" @click="handleSecond(scope.$index, scope.row)">维护二级分类</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000">
        </el-pagination>
        <!-- 新增分类 -->
        <el-dialog title="新增分类" :visible.sync="GcLock.addCategory" :close-on-click-model="false">
            <el-form :data="addForm" label-width="100px" ref="addForm">
                <el-form-item label="分类名">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-select v-model="addForm.displayIndex" placeholder="选择显示序号">
                        <el-option 
                            v-for="CategoryIndex in CategoryIndexs"
                            :key="CategoryIndex.value"
                            :label="CategoryIndex.label"
                            :value="CategoryIndex.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示类型">
                    <el-select v-model="addForm.displayType" placeholder="选择显示分类">
                        <el-option label="停用分类" value="36"></el-option>
                        <el-option label="普通分类" value="37"></el-option>
                        <el-option label="首页分类" value="38"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="GcLock.addCategory = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="新增分类" :visible.sync="GcLock.change" :close-on-click-model="false">
            <el-form :data="changeForm" label-width="100px" ref="changeForm">
                <el-form-item label="分类名">
                    <el-input v-model="changeForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-select v-model="changeForm.displayIndex" placeholder="选择显示序号">
                        <el-option 
                            v-for="CategoryIndex in CategoryIndexs"
                            :key="CategoryIndex.value"
                            :label="CategoryIndex.label"
                            :value="CategoryIndex.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示类型">
                    <el-select v-model="changeForm.displayType" placeholder="选择显示状态">
                        <el-option label="停用分类" value="36"></el-option>
                        <el-option label="普通分类" value="37"></el-option>
                        <el-option label="首页分类" value="38"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="GcLock.change = false">取消</el-button>
                <el-button type="primary" @click.native="changeSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!-- 二级列表 -->
        <el-dialog title="二级列表" :visible.sync="GcLock.manageSecond" :close-on-click-model="false">
            <secondCategory v-bind:SecondList="SecondLists" ></secondCategory>
        </el-dialog>
    </section>
</template>

<script>
import { getGoodsTypes, addGoodsTypes, updateGoodsTypes, deleteGoodsTypes } from '../../../api/goods/category.js'
import secondCategory from "./secondCategory.vue"
export default {
    components: {
        secondCategory
    },
    created: function () {
        let _this = this;
        getGoodsTypes(_this, {
            parentId:0
        }).then((res) => {
            _this.GcList = res.data.data.rows
        })
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
                parentId: '',
                displayIndex: '',
                displayType: ''
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
                id: '',
                name: '',
                parentId: '',
                displayIndex: '',
                displayType: ''
            },
            GcList: [],
            SecondLists: [
                
            ]
        }
    },
    methods: {
        handleSeach() {
            let _this = this;
            getGoodsTypes(_this, {
                parentId: 0,
                name: _this.GcSearch.name
            }).then((res) => {
                _this.GcList = res.data.data.rows
            })
        },
        handleAdd() {
            let _this = this;
            _this.GcLock.addCategory = !_this.GcLock.addCategory
        },
        addSubmit() {
            let _this = this;
            addGoodsTypes(_this, {
                name: _this.addForm.name,
                parentId: 0,
                displayIndex: _this.addForm.displayIndex,
                displayType: _this.addForm.displayType
            }).then((res) => {
                console.log(res)
            })
        },
        changeSubmit() {
            let _this = this;
            updateGoodsTypes(_this, _this.changeForm.id, {
                name: _this.changeForm.name,
                parentId: 0,
                displayIndex: _this.changeForm.displayIndex,
                displayType: _this.changeForm.displayType
            }).then((res)=> {
                
            })
        },
        handleChange(index, row) {
            let _this = this;
            _this.GcLock.change = !_this.GcLock.change;
            _this.changeForm.id = row.id
            _this.changeForm.name = row.name;
            _this.changeForm.displayIndex = row.displayIndex;
        },
        handleSecond(index, row) {
            console.log(row);
            let _this = this;
            _this.GcLock.manageSecond = !_this.GcLock.manageSecond;
            _this.SecondLists = row.SecondLists;
        },
        handleDelete(index, row) {
            let _this = this;
            deleteGoodsTypes(_this, row.id, {
                parentId: 0
            }).then((res) => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>
