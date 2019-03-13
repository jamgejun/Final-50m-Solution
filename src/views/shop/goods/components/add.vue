<template>
    <section>
        <el-form :model="addForm" :rules="formRules" ref="addForm" status-icon label-width="80px" v-loading="isLoading">
            <el-form-item label="商品名" prop="name">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="addForm.originalPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="卖价" prop="sellPrice">
                <el-input v-model="addForm.sellPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" prop="unit" class="inline-form">
                <el-select v-model="addForm.unit" placeholder="选择商品单位">
                    <el-option 
                        v-for="(item, index) in goodsUnit"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品状态" prop="status" class="inline-form">
                <el-select v-model="addForm.status" placeholder="选择商品状态">
                    <el-option
                            v-for="(item, index) in goodsStatus"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="一级分类" prop="typeId" class="inline-form">
                <el-select v-model="addForm.typeId" placeholder="选择一级分类">
                    <el-option
                            v-for="(item, index) in goodsCategory"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" prop="typeIds" class="inline-form">
                <el-select v-model="addForm.typeIds" placeholder="选择二级分类" :disabled="!Boolean(addForm.typeId)">
                    <el-option
                            v-for="(item, index) in goodsCategoryTwo"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示顺序" prop="displayIndex" class="inline-form">
                <el-select v-model="addForm.displayIndex" placeholder="选择商品显示顺序">
                    <el-option
                        v-for="(item, index) in goodsDisplayIndex"
                        :key="index"
                        :label="item.name" 
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否热门" prop="isHot" class="inline-form">
                <el-select v-model="addForm.isHot" placeholder="选择是否热门">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品信息" prop="goodsInfo">
                <el-input type="textarea" class="noResize-form" v-model="addForm.goodsInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="info">
                <el-input type="textarea" class="noResize-form" v-model="addForm.info" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品更多" prop="moreInfo">
                <el-input type="textarea" class="noResize-form" v-model="addForm.moreInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="选择图片">
                <el-upload
                    action="#"
                    ref="addFilePictures"
                    :auto-upload="false"
                    accept="image/png,image/gif,image/jpg,image/jpeg"
                    :multiple="true"
                    list-type="picture-card"
                    :on-change ="changFile"
                    :limit = '10'
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <div class="addFormfooter">
            <el-button @click.native="close()">取消</el-button>
            <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
import { addGoods } from '../../../../api/goods/goods.js'
import { getDictorys } from '../../../../api/dictorys/dictorys.js'
import { getGoodsTypes } from '../../../../api/goods/category.js'
export default {
    mounted: function (){
        let _this = this;
        // 从字典表获取商品状态
        getDictorys(_this, 3).then((res) => {
            _this.goodsStatus = res.data.data
        })
        // 获取商品单位
        getDictorys(_this, 6).then((res) => {
            _this.goodsUnit = res.data.data
        })
        // 获取商品分类
        getGoodsTypes(_this, {
            parentId:0
        }).then((res) => {
            _this.goodsCategory = res.data.data.rows
        })
    },
    watch: {
        addForm(newValue, oldValue) {
            let _this = this;
            if(oldValue.typeId != newValue.typeId) {
                // 获取二级分类
                getGoodsTypes(_this, {
                    parentId: _this.addForm.typeId
                }).then((res) => {
                    constants.log(res)
                    _this.goodsCategoryTwo = res.data.data.rows
                })
            } else {}
        }
    },
    data() {
        // 检查商品原价
        var originalPrice = (rule, value, callback) => {
            let Price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if (!Price.test(value) && value.length!='') {
                callback(new Error('请检查正确的商品格式！例如2.00'))
            } else if(value.length>64){
                callback(new Error('商品价格不能超过64位！'))
            } else {
                callback()
            }
        }
        // 检查商品卖价
        var checkPirce = (rule, value, callback) => {
            let _this = this;
            let Price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if(value === '') {
                callback(new Error('请填写商品价格'))
            } else if (!Price.test(value)) {
                callback(new Error('请检查正确的商品格式！例如2.00'))
            } else if(value>_this.addForm.originalPrice && _this.addForm.originalPrice!='') {
                callback(new Error('卖价不能高于原价！'))
            } else if(value.length>64){
                callback(new Error('商品价格不能超过64位！'))
            } else {
                callback()
            }
        }
        // 检查商品状态
        var checkStatus = (rule, value, callback) => {
            if(value==='') {
                callback(new Error('请选择商品状态'))
            } else {
                callback()
            }
        }
        // 检查商品单位
        var checkUnit = (rule, value, callback) => {
            if(value==='') {
                callback(new Error('请选择商品单位'))
            } else {
                callback()
            }
        }
        // 检查商品分类
        var checkTypeId = (rule, value, callback) => {
            if(value==='') {
                callback(new Error('请选择商品分类'))
            } else {
                callback()
            }
        }
        // 检查商品显示顺序
        var checkDisplayIndex = (rule, value, callback) => {
            if(value==='') {
                callback(new Error('请选择商品显示顺序'))
            } else {
                callback()
            }
        }
        return {
            goodsStatus: [], // 获取商品的状态
            goodsUnit: [], // 商品的单位
            goodsCategory: [], // 商品的分类
            goodsCategoryTwo: [],
            goodsDisplayIndex: [// 商品显示顺序
                {
                    id: 0,
                    name: '靠前'
                },
                {
                    id: 1,
                    name: '第二'
                },
                {
                    id: 2,
                    name: '第三'
                },
                {
                    id: 3,
                    name: '第四'
                },
            ],
            isLoading: false,
            addForm: {
                name: '',
                code: '',
                status: '',
                sellPrice: '',
                originalPrice: '',
                info: '',
                unit: '',
                typeId: '',
                typeIds: '',
                moreInfo: '',
                displayIndex: '',
                isHot: '',
                goodsInfo: '',
                pictures: []
            },
            formRules: {
                name: [
                    { required: true, message:'请填写商品名！', trigger: 'blur'},
                    { max: 20, message: '商品名不能超过20位', trigger: 'blur change'}
                ],
                code: [
                    { max: 20, message: '商品条码不能超过20位', trigger: 'blur change'}
                ],
                originalPrice: [
                    { validator: originalPrice,  trigger: 'blur change' }
                ],
                sellPrice: [
                    { validator: checkPirce, trigger: 'blur change' },
                    { required: true, message: '请填写商品价格', trigger: 'blur' }
                ],
                status: [
                    { validator: checkStatus, trigger: 'blur' },
                ],
                unit: [
                    { validator: checkUnit, trigger: 'blur' },
                ],
                typeId: [
                    { validator: checkTypeId, trigger: 'blur' },
                ],
                displayIndex: [
                    { validator: checkDisplayIndex, trigger: 'blur' },
                ],
                
                isHot: [
                    { required: true, message: '请选择商品是否热门！', trigger: 'blur' },
                ],
                pictures: [
                    { required: true, message: '请选择商品图片！', trigger: 'blur' }
                ],
                info: [
                    { max: 200, message: '商品信息位数超过最大值', trigger: 'blur change'}
                ],
                moreInfo: [
                    { max: 200, message: '商品更多介绍数超过最大值', trigger: 'blur change'}
                ],
                goodsInfo: [
                    { max: 200, message: '商品更多介绍数超过最大值', trigger: 'blur change'}
                ],
            },
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        close() {
            let _this = this;
            _this.$emit('addFormclose')
        },
        beforeAvatarUpload(file) {
            console.log(file)
        },
        changFile(file, fileList) {
            let _this = this;
            if((file.size/1024/1024) > 5) {
                _this.$confirm('商品大小不能超过5M 是否继续添加？', '提示', {
                    type: 'warning'
                }).then(() => {
                    _this.addForm.pictures.push(file.raw)
                }).catch(() => {
                    fileList = fileList.slice(fileList.length-1, 1)
                })
            } else {
                _this.addForm.pictures.push(file.raw)
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {//预览图片时调用
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 处理新增商品提交
        addSubmit() {
            let _this = this;
            _this.$refs.addForm.validate((value) => {
                if(value) {
                    _this.$confirm('是否添加商品？', '提示', {
                            type: 'warning'
                        }).then(() => {
                            _this.isLoading = !_this.isLoading
                            let formData = new FormData()
                            formData.append('name', _this.addForm.name)
                            formData.append('code', _this.addForm.code)
                            formData.append('status', _this.addForm.status)
                            formData.append('sellPrice', _this.addForm.sellPrice)
                            formData.append('originalPrice', _this.addForm.originalPrice)
                            formData.append('info', _this.addForm.info)
                            formData.append('unit', _this.addForm.unit)
                            formData.append('typeId', _this.addForm.typeId)
                            formData.append('moreInfo', _this.addForm.moreInfo)
                            formData.append('displayIndex', _this.addForm.displayIndex)
                            formData.append('isHot', _this.addForm.isHot)
                            formData.append('goodsInfo', _this.addForm.goodsInfo)
                            for(let i = 0; i<_this.addForm.pictures.length; i++) {
                                formData.append('pictures', _this.addForm.pictures[i])
                            }
                            // 对返回的信息进行处理
                            _this.$ajax.post(`/api/goodss`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then((res) => {
                                _this.$message({
                                    message: '添加成功！',
                                    type: 'success'
                                })
                                // 清空图片数组 保留其他信息
                                _this.isLoading = !_this.isLoading
                                _this.$refs.addFilePictures.uploadFiles.length = 0
                                _this.$refs['addForm'].resetFields()
                                _this.addForm.pictures = []
                                _this.close()
                            }).catch(() => {
                                _this.$message({
                                    message: '新增失败！',
                                    type: 'warning'
                                })
                                _this.isLoading = !_this.isLoading
                            })
                        }).catch(() => {})
                } else {
                    _this.$message({
                        message: '请检查商品表单是否填写规范',
                        type: 'warning'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .addFormfooter {
        margin-top:20x; 
        margin-bottom: 20px; 
        float: right;
    }
    .inline-form {
        display: inline-block;
    }
    .noResize-form>textarea {
        resize: none;
    }
</style>
