<template>
    <section>
        <el-form :model="addForm" :rules="formRules" ref="addForm" status-icon :inline="true" label-width="80">
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
            <el-form :inline="true">
                <el-form-item label="选择图片" label-width="80">
                    <el-upload
                        action=""
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :before-upload="beforeAvatarUpload"
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
            <el-button @click.native="close('addGoods', 'addForm')">取消</el-button>
            <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
import qs from 'qs'
import { addGoods } from '../../../../api/goods/goods.js'
export default {
    data() {
        return {
            addForm: {
                name: '消食片',
                code: '',
                status: 1,
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
            formRules: {},
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            let _this = this
            console.log(file);
            _this.addForm.pictures.push(file);
            console.log(_this.addForm)
        },
        close() {
            let _this = this;
            _this.$emit('close' )
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        addSubmit() {
            let _this = this;
            let params = new URLSearchParams();
               for(var key in _this.addForm){
                   params.append(key,_this.addForm[key])
            }
            addGoods(_this, params)
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
