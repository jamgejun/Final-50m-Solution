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
        <el-dialog title="新增商品" :visible.sync="GmLock.addGoods" :close-on-click-model="false" min-width="60vh">
            <el-form v-model="addForm">
                <el-form :inline="true">
                    <el-form-item label="商品名">
                        <el-input v-model="addForm.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品状态">
                        <el-select v-model="addForm.status" placeholder="选择商品状态">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="异常" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="卖价">
                        <el-input v-model="addForm.salePrice" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="原价">
                        <el-input v-model="addForm.orignPrice" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form :inline="true">
                    <el-form-item label="是否热门">
                        <el-select v-model="addForm.iShot" placeholder="选择显示序号">
                            <el-option value="0" label="是"></el-option>
                            <el-option value="1" label="否"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="库存数量">
                        <el-input v-model="addForm.count" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <el-form-item label="商品简介">
                    <el-input type="textarea" v-model="addForm.introduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品更多介绍">
                    <el-input type="textarea" v-model="addForm.moreIntroduce" auto-complete="off"></el-input>
                </el-form-item>
                <el-upload
                    :aria-label="商品图片"
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
                <el-button @click.native="GmLock.addGoods = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit">提交</el-button>
            </div>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog title="新增分类" :visible.sync="GmLock.change" :close-on-click-model="false" min-width="60vh">
           
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="GmLock.change = false">取消</el-button>
                <el-button type="primary" @click.native="changeSubmit">提交</el-button>
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
            Categorys: [
                {
                    name: '零食',
                    index: 5,
                    status: 0,
                    SecondLists: [
                        {
                            name: '小吃类',
                            index: 1
                        },
                        {
                            name: '辣条类',
                            index: 2
                        },
                        {
                            name: '水果类',
                            index: 3
                        },
                    ]
                },
                {
                    name: '果蔬',
                    index: 4,
                    status: 2,
                    SecondLists: [
                        {
                            name: '辣条类',
                            index: 2
                        },
                        {
                            name: '水果类',
                            index: 3
                        },
                    ]
                },
                {
                    name: '生鲜',
                    index: 3,
                    status: 1,
                    SecondLists: [
                        {
                            name: '小吃类',
                            index: 1
                        },
                        {
                            name: '辣条类',
                            index: 2
                        }
                    ]
                },
                {
                    name: '零食',
                    index: 2,
                    status: 1,
                    SecondLists: [
                        {
                            name: '小吃类',
                            index: 1
                        },
                        {
                            name: '辣条类',
                            index: 2
                        },
                        {
                            name: '水果类',
                            index: 3
                        },
                    ]
                }
            ],
            addFormRules: {

            },
            changeForm: {
                name: '',
                index: '',
                status: ''
            },
            goodsList: [
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
            alert('查询成功')
        },
        handleAdd() {
            let _this = this;
            _this.GmLock.addGoods = !_this.GmLock.addGoods;
        },
        addSubmit() {
            console.log(addForm);
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
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
