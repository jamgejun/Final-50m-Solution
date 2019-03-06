<template>
    <section>
        <!-- 工具搜索栏 -->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="GmSearch" class="demo-form-inline"> 
                <el-form-item label="">
                    <el-input v-model="GmSearch.name" placeholder="输入商品名"></el-input>
                </el-form-item>
                <el-form-item label="一级分类名：">
                    <el-select v-model="GmSearch.firstCategory" placeholder="选择一级分类">
                        <el-option 
                            v-for="Category in Categorys"
                            :key="Category.index"
                            :label="Category.name"
                            :value="Category.index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类名：">
                    <el-select v-model="GmSearch.secondCategory" placeholder="选择二级分类" :disabled="true">
                    </el-select>
                </el-form-item>
                <el-form-item label="商品状态：">
                    <el-select v-model="GmSearch.status" placeholder="选择商品状态">
                        <el-option value="0" label="正常"></el-option>
                        <el-option value="1" label="已下架"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSeach">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增商品</el-button>
                </el-form-item> 
            </el-form>
        </el-col>

        <div>
            <el-table :data="goodsList"  v-loading = "loading">
                <el-table-column type="selection" width="36"></el-table-column>
                <el-table-column prop="name" label="商品名称" align="center" width="100"></el-table-column>
                <el-table-column prop="sellPrice" label="卖价" align="center" width="80"></el-table-column>
                <el-table-column prop="originalPrice" label="原价" align="center" width="80"></el-table-column>
                <el-table-column prop="statusName" label="状态" align="center" width="120"></el-table-column>
                <el-table-column prop="goodsInfo" label="商品简介" align="center" width="150"></el-table-column>
                <el-table-column prop="moreInfo" label="商品更多介绍" width="180"></el-table-column>
                <el-table-column label="商品图片" width="200">
                    <template slot-scope="scope">
                        <img class="goodsImg" :src="scope.row.gooodsSymboPic" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="150" align="left">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleUp(scope.row)">{{ scope.row.status===0 ?'上架':'下架' }}</el-button>
                        <el-button size="small" v-if="scope.row.status===1" @click="handleChangePrice(scope.$index, scope.row)">补货/调价</el-button>
                        <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        <!-- 新增商品 -->
        <el-dialog title="新增商品" :visible.sync="GmLock.addGoods" :close-on-click-model="false" min-width="60vw" ref="addForm">
            <add-form @close='close'></add-form>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="修改商品" :visible.sync="GmLock.change" :close-on-click-model="false" >
            <change-form :changeForm="changeForm"></change-form>
        </el-dialog>

        <!-- 补货/调价商品 -->
        <el-dialog title="补货/调价商品" :visible.sync="GmLock.shangjia" :close-on-click-model="false" min-width="60vw">
            <el-form :model="changeForm" :inline="true" ref="changeForm">
                <el-form-item label="卖价">
                    <el-input v-model="changeForm.salePrice" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="原价">
                    <el-input v-model="changeForm.orignPrice" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="changeForm.count" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20px">
                <el-button @click.native="cancer('shangjia', 'changeForm')">取消</el-button>
                <el-button type="primary" @click.native="shangjiaSubmit">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getGoods, getOneGoods, updateGoods } from '../../../api/goods/goods.js'
import addForm from './components/add.vue'
import changeForm from './components/change.vue'
export default {
    components: {
        addForm,
        changeForm
    },
    data() {
        return {
            // 模态框控制
            loading: false,
            GmLock: {
                addGoods: false,
                change: false,
                shangjia: false,
                xiajia: false
            },
            fileList2: [],
            // 搜索框
            GmSearch: {
                name: '',
                firstCategory: '',
                secondCategory: '',
                status: ''
            },
            Categorys: [
                {
                    name: '零食类',
                    index: 1
                },
                {
                    name: '小吃类',
                    index: 22
                },
                {
                    name: '日用品',
                    index: 3
                },
                {
                    name: '必需品',
                    index: 4
                },
            ],
            formRules: {
                name: [
                    {
                        required: true,
                        message: '请填入姓名', 
                        trigger: 'blur'
                    },
                    { 
                        min: 3, 
                        max: 5, 
                        message: '长度在 3 到 5 个字符', 
                        trigger: 'blur' 
                    }
                ],
                introduce: [
                    {
                        required: true,
                        message: '',
                        trigger: 'blur',
                    }
                ],
                moreIntroduce: [
                    {
                        message: '',
                        trigger: '',
                    }
                ],
                salePrice: [
                    {
                        type: 'number',
                        required: true,
                        message: '',
                        trigger: '',
                    }
                ],
                orignPrice: [
                    {
                        type: 'number',
                        required: true,
                        message: '',
                        trigger: '',
                    }
                ],
                count: [
                    {
                        type: 'number',
                        required: true,
                        message: '',
                        trigger: '',
                    }
                ],
                iShot: [
                    {
                        type: 'number',
                        required: true,
                        message: '',
                        trigger: ''
                    }
                ],
                status: [
                    {
                        type: 'number',
                        required: true,
                        message: '请选择商品状态',
                        trigger: 'blur'
                    }
                ]
            },
            changeForm: {},
            goodsList: [
                {
                    id: '商品ID',
                    name: '商品名称',
                    status: '商品状态',
                    statusName: '商品状态名',
                    sellPrice: '商品现价',
                    orginalPrice: '商品原价',
                    goodsInfo: '商品信息',
                    moreInfo: '商品更多介绍',
                    gooodsSymboPic: '商品默认图片'
                }
            ]
        }
    },
    mounted: function  () {
        let _this = this
        _this.loading = true
        getGoods(_this).then((res) => {
            _this.goodsList = res.data.data.rows
            _this.loading = false
        })
    },
    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSeach() {
        },
        handleAdd() {
            let _this = this;
            for(let i in _this.addForm) {
               _this.addForm[i] = ''
            }
            _this.GmLock.addGoods = !_this.GmLock.addGoods;
        },
        close() {
            let _this = this;
            _this.GmLock.addGoods = !_this.GmLock.addGoods;
        },
        cancer(lock, formName) {
            let _this = this;
            _this.GmLock[lock] = false;
            _this.$refs[formName].resetFields();
        },
        addSubmit(formName) {
            let _this = this;
            _this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.$confirm('是否确认添加商品?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.goodsList.push(this.addForm);
                        _this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleStatus(status) {
           return status === 1 ? '正常' : '已下架'
        },

        handleUp(row) {
            return row.status = row.status === 0 ? 1 : 0;
        },
        handleChangePrice(index, row) {
            let _this = this;
            _this.GmLock.shangjia = !_this.GmLock.shangjia;
            _this.changeForm = row;
        },
        // 修改按钮
        handleChange(index, row) {
            let _this = this;
            _this.GmLock.change = !_this.GmLock.change;
            _this.changeForm = {}
            getOneGoods(_this, row.id).then((res) => {
                _this.changeForm = res.data.data
            })
        },
        updateSubmit() {
            let _this = this;
            _this.$confirm("是否确认提交?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                updateGoods(_this, _this.changeForm.id, _this.changeForm).then((res) => {
                    console.log(res);
                })
            })
        },
        handleDelete(index, row) {
            let _this = this;
            _this.goodsList.splice(index, 1);
        }
    }
}
</script>

<style lang="scss" scoped>
    .goodsImg {
        width: 50px;
        height: 50px; 
        margin-top: 10px;
        margin-bottom: 10px;
        vertical-align: middle;
    }
    .el-dialog--small {
        width: 70%;
    }
    .pagination {
        margin-top: 20px;
        float: right;
        margin-right: 20px;
    }
</style>
