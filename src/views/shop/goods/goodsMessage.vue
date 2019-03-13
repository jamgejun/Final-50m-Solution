<template>
    <section>
        <!-- 工具搜索栏 -->
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="GmSearch" class="demo-form-inline"> 
                <el-form-item label="" prop="name">
                    <el-input v-model="GmSearch.name" placeholder="输入商品名"></el-input>
                </el-form-item>
                <el-form-item label="一级分类名：" prop="goodsType">
                    <el-select v-model="goodsType" placeholder="选择一级分类">
                        <el-option 
                            v-for="(item, index) in goodsCategory"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类名：" prop="goodsType">
                    <el-select v-model="GmSearch.goodsType" placeholder="选择二级分类" :disabled="!Boolean(goodsType)">
                        <el-option 
                            v-for="(item, index) in goodsCategoryTwo"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品状态：" prop="status">
                    <el-select v-model="GmSearch.status" placeholder="选择商品状态">
                        <el-option 
                            v-for="(item, index) in goodsStatus"
                            :key="index"
                            :label="item.name"
                            :value="item.id"></el-option>
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
            <el-table 
                :data="goodsList"  
                v-loading = "loading" 
                @selection-change="handleSelectionChange"
                ref="goodsList">
                <el-table-column type="selection" width="36"></el-table-column>
                <el-table-column prop="name" label="商品名称" align="center" width="100"></el-table-column>
                <el-table-column prop="sellPrice" label="卖价" align="center" width="80"></el-table-column>
                <el-table-column prop="originalPrice" label="原价" align="center" width="80"></el-table-column>
                <el-table-column prop="statusName" label="状态" align="center" width="120"></el-table-column>
                <el-table-column prop="goodsInfo" label="商品简介" align="center" width="150"></el-table-column>
                <el-table-column prop="moreInfo" label="商品更多介绍" width="180"></el-table-column>
                <el-table-column label="商品图片" width="150">
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
            <div class="goodsFooter">
                <el-button @click="handleDeleteAll()"  type="danger" :disabled="!deleteIds.length">批量删除</el-button>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInformation.pageNumber"
                    :page-sizes="pageInformation.pagSizes"
                    :page-size="pageInformation.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInformation.total">
                </el-pagination>
            </div>
        </div>

        <!-- 新增商品 -->
        <el-dialog title="新增商品" :visible.sync="GmLock.addGoods" :close-on-click-model="false" ref="addForm">
            <add-form @addFormclose='addFormclose'></add-form>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="修改商品" :visible.sync="GmLock.change" :close-on-click-model="false" >
            <change-form :changeForm="changeForm" @changeFormclose='changeFormclose'></change-form>
        </el-dialog>

        <!-- 补货/调价商品 -->
        <el-dialog title="补货/调价商品" :visible.sync="GmLock.shangjia" :close-on-click-model="false">
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
import { getGoods, getOneGoods, deleteGoods, updateGoods } from '../../../api/goods/goods.js'
import { getDictorys } from '../../../api/dictorys/dictorys.js'
import { getGoodsTypes } from '../../../api/goods/category.js'
import addForm from './components/add.vue'
import changeForm from './components/change.vue'
export default {
    components: {
        addForm,
        changeForm
    },
    mounted: function  () {
        let _this = this
        _this.loading = true
        getGoods(_this).then((res) => {
            _this.goodsList = res.data.data.rows
            _this.goodsList = _this.goodsList.slice(0, 10)
            _this.loading = false
            _this.pageInformation.total = res.data.data.rows.length
        })
        // 获取商品状态字典表
        getDictorys(_this, 3).then((res) => {
            _this.goodsStatus = res.data.data
            _this.goodsStatus.push({
                id: '',
                name: '不限'
            })
        })
        // 获取分类
        getGoodsTypes(_this, {
            parentId: 0
        }).then((res) => {
            _this.goodsCategory = res.data.data.rows
            _this.goodsCategory.push({
                id: '',
                name: '不限'
            })
        })
    },
    data() {
        return {
            // 模态框控制
            loading: false,
            goodsCategory: [], //商品分类字典表
            goodsCategoryTwo: [], // 二级分类
            goodsStatus: [], // 商品状态
            GmLock: { // 处理模态框显示与隐藏
                addGoods: false,
                change: false,
                shangjia: false,
                xiajia: false
            },
            pageInformation: {
                pagSizes:[10,20,30,40], // 分页可选项
                pageSize: 10,
                total: 0,
                pageNumber: 1 //当前分页
            },
            ChangePrice: {},
            deleteIds: [], // 批量删除商品的id信息
            // 搜索框
            goodsType: '',
            GmSearch: {
                name: '',
                goodsType: '',
                secondCategory: '',
                status: ''
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
    computed: {
        // start: () => {
        //     let _this = this
        //     return  (_this.pageInformation.pageNumber-1)*_this.pageInformation.pageSize
        // },
        // end: () => {
        //     let _this = this
        //     return  _this.pageInformation.pageNumber*_this.pageInformation.pageSize
        // }
    },
    watch: {
        goodsType() {
            let _this = this;
            if(_this.goodsType) {
                // 获取二级分类
                getGoodsTypes(_this, {
                    parentId: _this.goodsType
                }).then((res) => {
                    _this.goodsCategoryTwo = res.data.data.rows
                    _this.goodsCategoryTwo.push({
                        id:'',
                        name: '不限'
                    })
                })
            } else {}
        }
    },
    methods: {
        getGoodList() {
            let _this = this
            _this.loading = true
            getGoods(_this, {
                pageNumber: _this.pageInformation.pageNumber,
                pageSize: _this.pageInformation.pageSize
            }).then((res) => {
                _this.goodsList = res.data.data.rows
                _this.loading = false
                let rowsCheck = _this.goodsList.find(d => {
                    for (let i = 0; i<_this.goodsList.length; i++) {
                        if(d.id === _this.deleteIds[i]) {
                            return d
                        }
                    }
                })
                if (rowsCheck.length) {
                    for (let k = 0; k<rowsCheck.length; k++) {
                        _this.$refs.goodsList.toggleRowSelection(rowsCheck[k], true) 
                    }
                } else {}
            })
        },
        // 处理分页大小变化
        handleSizeChange(val) {
            let _this = this;
            _this.pageInformation.pageSize = val
            _this.getGoodList()
        },
        handleCurrentChange(val) {
            let _this = this;
            _this.pageInformation.pageNumber = val
            _this.getGoodList()
        },
        handleSeach() {
            let _this = this
            _this.loading = !_this.loading
            getGoods(_this, {
                pageNumber: _this.GmSearch.pageNumber,
                pageSize: _this.GmSearch.pageSize,
                name: _this.GmSearch.name,
                status: _this.GmSearch.status
            }).then((res) => {
                _this.loading = !_this.loading
                _this.goodsList = res.data.data.rows
            })
        },
        handleUp(row) {
            let _this = this;
            let goodsId = _this.goodsStatus.find(v => v.id != row.status)
            updateGoods(_this, row.id, {
                status: goodsId.id
            }).then((res) => {
                console.log(res)
            })
        },

        // 新增商品的显示和隐藏
        // 关闭和打开新增商品方法
        addFormclose() {
            let _this = this;
            _this.GmLock.addGoods = !_this.GmLock.addGoods;
        },
        handleAdd() {
            let _this = this;
            _this.GmLock.addGoods = !_this.GmLock.addGoods;
        },

        // 关闭商品的显示和隐藏 
        // 关闭修改商品
        changeFormclose() {
            let _this = this;
            _this.GmLock.change = !_this.GmLock.change;
        },
        // 打开修改商品的详细信息
        handleChange(index, row) {
            let _this = this;
            _this.GmLock.change = !_this.GmLock.change;
            _this.changeForm = {}
            getOneGoods(_this, row.id).then((res) => {
                _this.changeForm = res.data.data
            })
        },

        // 修改商品价格
        handleChangePrice(index, row) {
            let _this = this;
            _this.GmLock.shangjia = !_this.GmLock.shangjia;
            _this.ChangePrice = row;
        },
        
        // 删除单个
        handleDelete(index, row) {
            let _this = this;
            _this.$confirm('是否删除该商品？删除后不可恢复！', '提示', {
                type: 'warning'
            }).then(() => {
                let oneIds = []
                oneIds.push(row.id) 
                deleteGoods(_this, {
                    ids: oneIds
                }).then((res) => {
                    _this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    _this.loading = true
                    getGoods(_this).then((res) => {
                        _this.goodsList = res.data.data.rows
                        _this.loading = false
                    })
                })
            }).catch(() => {})
        },

        // 删除多个商品逻辑和方法
        // 处理已选中的商品id
        handleSelectionChange(val) {
            let _this = this
            // if (_this.deleteIds.length>0) {
            //     for (let k = 0 ;k<_this.deleteIds; k++) {
            //         for (let i = 0; i < val.length; i++) {
            //             if (_this.deleteIds[k] !== val[i].id) {
            //                 _this.deleteIds.push(val[i].id)
            //             } else {}
            //         }
            //     }
            // } else {
            //     _this.deleteIds.push(val[0].id)
            // }
            // console.log(_this.deleteIds)
        },
        // 执行删除
        handleDeleteAll() {
            let _this = this;
            _this.$confirm('是否批量删除已选商品？删除后不可恢复！', '提示', {
                type: 'warning'
            }).then(() => {
                deleteGoods(_this, {
                    ids: _this.deleteIds
                }).then((res) => {
                    _this.$message({
                        message: '删除成功',
                        type: 'info'
                    })
                    _this.deleteIds = []
                })
            }).catch(() => {})
        },
        // 取消按钮
        cancer(lock, formName) {
            let _this = this;
            _this.GmLock[lock] = false;
            _this.$refs[formName].resetFields();
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
    .goodsFooter {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
