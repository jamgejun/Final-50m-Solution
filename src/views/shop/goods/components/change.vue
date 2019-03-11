<template>
    <section>
        <el-form :rules="formRules" :model="changeForm" label-width="80px" ref="changeForm">
            <el-form-item label="商品名" prop="name">
                <el-input v-model="changeForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="changeForm.originalPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="卖价" prop="sellPrice">
                <el-input v-model="changeForm.sellPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品单位" prop="unit" class="inline-form">
                <el-select v-model="changeForm.unit" placeholder="选择商品单位">
                    <el-option 
                        v-for="(item, index) in goodsUnit"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品状态" prop="status" class="inline-form">
                <el-select v-model="changeForm.status" placeholder="选择商品状态">
                    <el-option
                            v-for="(item, index) in goodsStatus"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类" prop="typeId" class="inline-form">
                <el-select v-model="changeForm.typeId" placeholder="选择商品分类">
                    <el-option
                            v-for="(item, index) in goodsCategory"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="显示顺序" prop="displayIndex" class="inline-form">
                <el-select v-model="changeForm.displayIndex" placeholder="选择商品显示顺序">
                    <el-option
                        v-for="(item, index) in goodsDisplayIndex"
                        :key="index"
                        :label="item.name" 
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否热门" prop="isHot" class="inline-form">
                <el-select v-model="changeForm.isHot" placeholder="选择是否热门">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品信息" prop="goodsInfo">
                <el-input type="textarea" class="noResize-form" v-model="changeForm.goodsInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="info">
                <el-input type="textarea" class="noResize-form" v-model="changeForm.info" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品更多" prop="moreInfo">
                <el-input type="textarea" class="noResize-form" v-model="changeForm.moreInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="已有图片" v-show="changeFormgoodsOtherPic.length">
                <ul class="el-upload-list el-upload-list--picture-card changePicture">
                    <li 
                    class="el-upload-list__item is-ready" 
                    v-for="(item,index) in changeFormgoodsOtherPic"
                    :key='item'>
                        <img :src="item" alt="" class="el-upload-list__item-thumbnail">
                        <a class="el-upload-list__item-name"></a>
                        <i class="el-icon-close"></i><!---->
                        <span class="el-upload-list__item-actions"><!---->
                            <span class="el-upload-list__item-delete"><i class="el-icon-delete2" @click="deleteImg(index)"></i></span>
                        </span>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="新增图片">
                <el-upload
                    action="#"
                    :auto-upload="false"
                    accept="image/png,image/gif,image/jpg,image/jpeg"
                    :multiple="true"
                    list-type="picture-card"
                    :on-change="changFile"
                    limit='10'
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <div class="changeFormfooter">
            <el-button @click.native="close()">取消</el-button>
            <el-button type="primary" @click.native="updateSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
import { updateGoods, updatePicture } from '../../../../api/goods/goods.js'
import { getDictorys } from '../../../../api/dictorys/dictorys.js'
export default {
    props: {
        changeForm: {
            type: Object,
            required: true
        }
    },
    mounted: function () {
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
        getDictorys(_this, 11).then((res) => {
            _this.goodsCategory = res.data.data
        })
    },
    watch: {
        changeForm: {
            handler(newValue, oldVaule) {
                let _this = this;
                let attr, oldattr
                for (attr in newValue) {
                    for(oldattr in oldVaule) {
                        if(attr != oldattr) {
                            if(_this.isChanged) {
                                return
                            } else {
                                _this.isChanged = !_this.isChanged
                            }
                        }
                    }
                }
            },
            deep:true
        }
    },
    data() {
        // 检查商品原价
        var originalPrice = (rule, value, callback) => {
            let Price = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
            if (!Price.test(value) && value!='') {
                console.log('aa')
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
            } else if(value>_this.changeForm.originalPrice && _this.changeForm.originalPrice!='') {
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
            isChanged:false,
            dialogImageUrl: '',
            dialogVisible: false,
            changeFormgoodsOtherPic: ['http://jwzx.cqu.pt/images/book2.jpg'], // 本地测试的删除图片信息
            PhotoList: [],
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
                    { validator: checkPirce, trigger: 'blur change' }
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
        }
    },
    methods: {
        // 关闭模态框，并向上级组件通信
        close() {
            let _this = this;
            _this.isChanged = !_this.isChanged
            _this.$emit('changeFormclose')
        },
        handleRemove() {

        },
        // 处理图片删除时的方法
        deleteImg(index) {
            let _this = this;
            _this.$confirm('是否删除该图片？', '提示', {
                type: 'warning'
            }).then(() => {
                // 调用接口，删除图片
                updatePicture(_this, {
                    id: _this.changeForm.goodsOtherPic.id, // 传入删除图片的id
                    goodsId: _this.changeForm.id, // 传入删除图片的商品id
                }).then((res) => {
                    // 删除成功后
                    _this.$message({
                        message: '删除成功！',
                        type: 'success'
                    }).then(() => {
                        // 更新显示视图
                        _this.changeForm.goodsOtherPic.splice(index, 1)
                    })
                })
            }).catch(() => {})
        },
        // 检测图片更改时的情况
        changFile(file, fileList) {
            let _this = this;
            if((file.size/1024/1024) > 5) {
                _this.$message({
                    message: '图片大小不能超过5M！请删除该图片！',
                    type: 'warning'
                })
            } else {
                _this.PhotoList = []
                for( let i=0; i<fileList.length; i++) {
                    _this.PhotoList[i] = fileList[i].raw
                }
            }
        },
        updateSubmit() {
            let _this = this;
            // 更新基本的商品信息
            if (_this.isChanged) {
                _this.$refs.changeForm.validate((value) => {
                    if(value) {
                        _this.$confirm('是否提交更改?', '提示', {
                            type: 'warning'
                        }).then((res) => {
                            updateGoods(_this, _this.changeForm.id, {
                                name: _this.changeForm.name,
                                code: _this.changeForm.code,
                                status: _this.changeForm.status,
                                sellPrice: _this.changeForm.sellPrice,
                                originalPrice: _this.changeForm.originalPrice,
                                info: _this.changeForm.info,
                                unit: _this.changeForm.unit,
                                typeId: _this.changeForm.typeId,
                                moreInfo: _this.changeForm.moreInfo,
                                displayIndex: _this.changeForm.displayIndex,
                                isHot: _this.changeForm.isHot
                            }).then((res) => {
                                // 设置formData对象，更新图片信息
                                let formData = new formData()
                                formData.append('goodsId', _this.changeForm.id) // 属于哪个商品的图片
                                for( let i = 0 ;i < _this.PhotoList.length; i++) {
                                    formData.append('newPic', _this.PhotoList[i]) //存入图片
                                }
                                formData.append('flag', '0') // 是否默认
                                updatePicture(_this, formData).then(() => {
                                    _this.$message({
                                        message: '更新成功！',
                                        type: 'success'
                                    })
                                }).catch(() => {
                                    _this.$message({
                                        message: '更新失败！',
                                        type: 'danger'
                                    })
                                })
                            }).catch(() => {})
                        }).catch(() => {})
                    }
                })
            } else {
                _this.$message({
                    message: '并未做任何更改！'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .changeFormfooter {
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
