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

        <section>
            <el-table :data="GcList" v-loading="loading" @select-change='handleSelect'>
                <el-table-column prop="name" label="分类名" align="center" width="200"></el-table-column>
                <el-table-column prop="displayIndex" width="120" label="显示顺序号" align="center" sorttable></el-table-column>
                <el-table-column prop="displayTypeName" label="显示状态" align="center" width="200"></el-table-column>
                <el-table-column label="操作" min-width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                        <el-button size="small" @click="handleSecond(scope.$index, scope.row)">维护二级分类</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="goodsFooter">
                <!-- <el-button @click="handleDeleteAll()"  type="danger" :disabled="!deleteIds.length">批量删除</el-button> -->
                <!-- <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination> -->
            </div>
        </section>

        <!-- 新增分类 -->
        <el-dialog title="新增分类" :visible.sync="GcLock.addCategory" :close-on-click-model="false">
            <el-form :data="addForm" label-width="100px" ref="addForm">
                <el-form-item label="分类名">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-select v-model="addForm.displayIndex" placeholder="选择显示序号">
                        <el-option 
                            v-for="CategoryIndex in categoryIndexs"
                            :key="CategoryIndex.value"
                            :label="CategoryIndex.label"
                            :value="CategoryIndex.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示类型">
                    <el-select v-model="addForm.displayType" placeholder="选择显示类型">
                        <el-option 
                            v-for="(item, index) in categoryType"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"></el-option>
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
                            v-for="CategoryIndex in categoryIndexs"
                            :key="CategoryIndex.value"
                            :label="CategoryIndex.label"
                            :value="CategoryIndex.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示类型">
                    <el-select v-model="changeForm.displayType" placeholder="选择显示类型">
                        <el-option 
                            v-for="(item, index) in categoryType"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"></el-option>
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
import { getDictorys } from '../../../api/dictorys/dictorys.js'
import secondCategory from "./secondCategory.vue"
export default {
    components: {
        secondCategory
    },
    mounted: function () {
        let _this = this;
        _this.loading = !_this.loading
        getGoodsTypes(_this, {
            parentId:0
        }).then((res) => {
            _this.GcList = res.data.data.rows
            _this.loading = !_this.loading
        })
        getDictorys(_this, 11).then((res) => {
            _this.categoryType = res.data.data
        })
    },
    data() {
        return {
            // 模态框控制
            deleteIds: [],
            loading: false,
            GcLock: {
                addCategory: false,
                change: false,
                manageSecond: false
            },
            // 搜索框
            categoryType: [], // 商品分类显示类型
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
            categoryIndexs: [
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
        // 处理查询
        handleSeach() {
            let _this = this;
            _this.loading = !_this.loading
            getGoodsTypes(_this, {
                parentId: 0,
                name: _this.GcSearch.name
            }).then((res) => {
                _this.GcList = res.data.data.rows
                _this.loading = !_this.loading
            })
        },

        // 新增一级分类
        handleAdd() {
            let _this = this;
            _this.GcLock.addCategory = !_this.GcLock.addCategory
        },
        addSubmit() {
            let _this = this;
            // 给出提示框，告知用户
            _this.$confirm('确认提交？', '提示', {
                type: 'warning'
            }).then(() => {
                _this.GcLock.addCategory = !_this.GcLock.addCategory
                // 调用新增接口
                addGoodsTypes(_this, {
                    name: _this.addForm.name,
                    parentId: 0,
                    displayIndex: _this.addForm.displayIndex,
                    displayType: _this.addForm.displayType
                }).then((res) => {
                    _this.$message({
                        message: '新增成功！',
                        type: 'success'
                    })
                    // 调用查询接口 重新获取一次一级分类
                    getGoodsTypes(_this, {parentId: 0}).then((res) => {
                        _this.GcList = res.data.data.rows
                    })
                })
            }).catch(() => {})
        },

        // 修改一级分类
        handleChange(index, row) {
            let _this = this;
            _this.GcLock.change = !_this.GcLock.change;
            _this.changeForm.id = row.id
            _this.changeForm.name = row.name;
            _this.changeForm.displayIndex = row.displayIndex;
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

        // 处理选中
        handleSelect(val) {

        },
        handleSecond(index, row) {
            console.log(row);
            let _this = this;
            _this.GcLock.manageSecond = !_this.GcLock.manageSecond;
            _this.SecondLists = row.SecondLists;
        },
        handleDelete(index, row) {
            let _this = this;
            _this.$confirm('是否删除该分类？', '提示', {
                type: 'warning'
            }).then(() => {
                deleteGoodsTypes(_this, row.id, {parentId: 0}).then((res) => {
                    if (!res.data.meta.success) {
                        _this.$message({
                            message: res.data.meta.message,
                            type: 'warning'
                        })
                    } else {
                        _this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        // 重新获取分类列表
                        getGoodsTypes(_this, {
                            parentId:0
                        }).then((res) => {
                            _this.GcList = res.data.data.rows
                        })
                    }
                }).catch((err) => {
                    _this.$message({
                        message: '删除出错，请重试！',
                        type: 'warning'
                    })
                })
            }).catch(() => {})
        }
    }
}
</script>

<style lang='scss' scoped>
    .goodsFooter {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
