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

        <el-table :data="goodsList">
            <el-table-column type="selection" width="36"></el-table-column>
            <el-table-column prop="name" label="商品名" align="center" width="100"></el-table-column>
            <el-table-column prop="count" label="库存" align="center" width="100"></el-table-column>
            <el-table-column prop="salePrice" label="卖价" align="center" width="100"></el-table-column>
            <el-table-column prop="orignPrice" label="原价" align="center" width="100"></el-table-column>
            <el-table-column prop="status" label="状态" align="center" width="100">
                <template slot-scope="scope">
                    {{ handleStatus(scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column prop="introduce" label="商品简介" align="center" width="100"></el-table-column>
            <el-table-column prop="moreIntroduce" width="120" label="商品更多介绍" sorttable></el-table-column>
            <el-table-column label="操作" min-width="120" align="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleUp(scope.row)">{{ scope.row.status===0 ?'上架':'下架' }}</el-button>
                    <el-button size="small" v-if="scope.row.status===1" @click="handleChangePrice(scope.$index, scope.row)">补货/调价</el-button>
                    <el-button size="small" @click="handleChange(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增商品 -->
        <el-dialog title="新增商品" :visible.sync="GmLock.addGoods" :close-on-click-model="false" min-width="60vw" ref="addForm">
            <el-form :model="addForm" :rules="formRules" ref="addForm" status-icon :inline="true">
                <el-form-item label="商品名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品状态" prop="status">
                    <el-select v-model="addForm.status" placeholder="选择商品状态">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="异常" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="卖价" prop="salePrice">
                    <el-input v-model="addForm.salePrice" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="原价" prop="orignPrice">
                    <el-input v-model="addForm.orignPrice" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否热门" prop="iShot">
                    <el-select v-model="addForm.iShot" placeholder="选择显示序号">
                        <el-option value="0" label="是"></el-option>
                        <el-option value="1" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="库存数量" prop="count">
                    <el-input v-model="addForm.count" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品简介" prop="introduce">
                    <el-input type="textarea" v-model="addForm.introduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品更多介绍" prop="moreIntroduce">
                    <el-input type="textarea" v-model="addForm.moreIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture"
                    style="margin-bottom:20px">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('addGoods', 'addForm')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit('addForm')">提交</el-button>
            </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="修改商品" :visible.sync="GmLock.change" :close-on-click-model="false" min-width="60vw">
           <el-form v-model="changeForm">
                <el-form :inline="true">
                    <el-form-item label="商品名">
                        <el-input v-model="changeForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品状态">
                        <el-select v-model="changeForm.status" placeholder="选择商品状态">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="异常" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="卖价">
                        <el-input v-model="changeForm.salePrice" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="原价">
                        <el-input v-model="changeForm.orignPrice" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="是否热门">
                        <el-select v-model="changeForm.iShot" placeholder="选择显示序号">
                            <el-option value="0" label="是"></el-option>
                            <el-option value="1" label="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="库存数量">
                        <el-input v-model="changeForm.count" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form-item label="商品简介">
                    <el-input type="textarea" v-model="changeForm.introduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品更多介绍">
                    <el-input type="textarea" v-model="changeForm.moreIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-upload
                    
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture"
                    style="margin-bottom:20px">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="GmLock.change = false">取消</el-button>
                <el-button type="primary" @click.native="changeSubmit">提交</el-button>
            </div>
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
export default {
    data() {
        return {
            // 模态框控制
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
            // 新增
            addForm: {
                name: '',
                photo: '',
                introduce: '',
                moreIntroduce: '',
                salePrice: '',
                orignPrice: '',
                count: '',
                iShot: '',
                status: '',
            },
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
            changeForm: {
                name: '',
                photo: '',
                introduce: '',
                moreIntroduce: '',
                salePrice: '',
                orignPrice: '',
                count: '',
                iShot: '',
                status: '',
            },
            goodsList: [
                {
                    name: '方便面',
                    photo: '',
                    introduce: '麻辣鲜香',
                    moreIntroduce: '吃了还想吃',
                    salePrice: 4.5,
                    orignPrice: 5,
                    count: 100,
                    iShot: 0,
                    status: 0,
                },
                {
                    name: '奥利奥',
                    photo: '',
                    introduce: '泡一泡 ',
                    moreIntroduce: '更多',
                    salePrice: 10,
                    orignPrice: 11,
                    count: 150,
                    iShot: 1,
                    status: 1,
                },
                {
                    name: '三只松鼠',
                    photo: '',
                    introduce: '互联网坚果销量领先品牌',
                    moreIntroduce: '买了才知道',
                    salePrice: 12,
                    orignPrice: 15,
                    count: 200,
                    iShot: 0,
                    status: 0
                },
                {
                    name: '鸭脖',
                    photo: '',
                    introduce: '麻辣',
                    moreIntroduce: '',
                    salePrice: 6,
                    orignPrice: 8,
                    count: 400,
                    iShot: 1,
                    status: 1,
                },
            ]
        }
    },
    methods: {
        handleSeach() {
            alert('查询成功')
        },
        handleAdd() {
            let _this = this;
            for(let i in _this.addForm) {
               _this.addForm[i] = ''
            }
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
            _this.changeForm = row;
        },
        handleDelete(index, row) {
            let _this = this;
            _this.goodsList.splice(index, 1);
        }
    }
}
</script>

<style>

</style>
