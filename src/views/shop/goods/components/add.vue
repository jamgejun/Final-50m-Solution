<template>
    <section>
        <el-form :model="addForm" :rules="formRules" ref="addForm" status-icon :inline="true" label-width="80px" v-loading="isLoading">
            <el-form-item label="商品名" prop="name">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" prop="status">
                <el-select v-model="addForm.status" placeholder="选择商品状态">
                    <el-option label="正常" value="6"></el-option>
                    <el-option label="已下架" value="7"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="卖价" prop="originalPrice">
                <el-input v-model="addForm.sellPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
                <el-input v-model="addForm.originalPrice" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="info">
                <el-input type="textarea" v-model="addForm.info" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品更多介绍" prop="moreInfo">
                <el-input type="textarea" v-model="addForm.moreInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" prop="unit">
                <el-select v-model="addForm.unit" placeholder="选择商品状态">
                    <el-option label="个" value="19"></el-option>
                    <el-option label="张" value="20"></el-option>
                    <el-option label="袋" value="21"></el-option>
                    <el-option label="箱" value="22"></el-option>
                    <el-option label="桶" value="23"></el-option>
                    <el-option label="包" value="24"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类" prop="typeId">
                <el-select v-model="addForm.unit" placeholder="选择商品状态">
                    <el-option label="个" value="19"></el-option>
                    <el-option label="张" value="20"></el-option>
                    <el-option label="袋" value="21"></el-option>
                    <el-option label="箱" value="22"></el-option>
                    <el-option label="桶" value="23"></el-option>
                    <el-option label="包" value="24"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品更多介绍" prop="displayIndex">
                <el-select v-model="addForm.unit" placeholder="选择商品状态">
                    <el-option label="个" value="19"></el-option>
                    <el-option label="张" value="20"></el-option>
                    <el-option label="袋" value="21"></el-option>
                    <el-option label="箱" value="22"></el-option>
                    <el-option label="桶" value="23"></el-option>
                    <el-option label="包" value="24"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品更多介绍" prop="isHot">
                <el-select v-model="addForm.isHot" placeholder="选择商品状态">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品信息" prop="goodsInfo">
                <el-input type="textarea" v-model="addForm.goodsInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form :inline="true" label-width="80px" enctype="multipart/form-data">
                <el-form-item label="选择图片" label-width="80">
                    <el-upload
                        action="#"
                        :auto-upload="false"
                        accept="image/png,image/gif,image/jpg,image/jpeg"
                        :multiple="true"
                        list-type="picture-card"
                        :on-change = "changFile"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
        </el-form>
        <div class="addFormfooter">
            <el-button @click.native="close()">取消</el-button>
            <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
import { addGoods } from '../../../../api/goods/goods.js'
export default {
    data() {
        return {
            isLoading: false,
            addForm: {
                name: '消食片',
                code: '',
                status: 6,
                sellPrice: 1,
                originalPrice: '',
                info: '',
                unit: 19,
                typeId: 2,
                moreInfo: '',
                displayIndex: 2,
                isHot: 1,
                goodsInfo: '',
                pictures: []
            },
            formRules: {
                name: {

                }
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
            _this.addForm.pictures.push(file.raw)
            console.log(_this.addForm.pictures);
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
                _this.isLoading = !_this.isLoading
            }).catch(() => {
                _this.$message({
                    message: '出错，请联系管理员',
                    type: 'warning'
                })
                _this.isLoading = !_this.isLoading
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
</style>
