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
            <el-form :inline="true" enctype="multipart/form-data">
                <el-form-item label="选择图片" label-width="80">
                    <el-upload
                        action="/api/goodss"
                        :auto-upload="true"
                        :headers = 'headeObj'
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
        <!-- <form id="form1" method="post"  enctype="multipart/form-data" >
            <input type="text" name="name" placeholder="姓名">
            <input type="text" name="status" placeholder="状态">
            <input type="text" name="code" id="" placeholder="条码">
            <input type="text" name="sellPrice" id="" placeholder="卖价">
            <input type="text" name="originalPrice" id="" placeholder="原价">
            <input type="text" name="info" id="" placeholder="默认信息">
            <input type="text" name="unit" id="" placeholder="单位">
            <input type="text" name="typeId" id="" placeholder="种类ID">
            <input type="text" name="moreInfo" id="" placeholder="更多信息">
            <input type="text" name="displayIndex" id="" placeholder="顺序">
            <input type="text" name="isHot" id="" placeholder="是否热门">
            <input type="text" name="goodsInfo" id="" placeholder="商品介绍">
            <input type="file" name="pictures">
            <button type="submit" @click="submitI">提交</button>
        </form> -->
        <div class="addFormfooter">
            <el-button @click.native="close('addGoods', 'addForm')">取消</el-button>
            <el-button type="primary" @click.native="addSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
import jquery from 'jquery'
import qs from 'qs'
import { addGoods } from '../../../../api/goods/goods.js'
export default {
    data() {
        return {
            headeObj: {
                "X-SDX-Token": this.$store.state.userToken
            },
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
            formRules: {},
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    mounted: function () {
        let _this = this;
    },
    destroyed: function () {
        console.log('离开')
    },
    methods: {
        // submitI() {
        //     jquery.ajax({
        //         type: "POST",//方法类型
        //         dataType: "json",//预期服务器返回的数据类型
        //         url: "/api/goodss" ,//url
        //         data: $('#form1').serialize(),
        //         headers: {
        //             'X-SDX-Token': 'vxdg57qv17c28y24ezjv6wpcaldpfpj9'
        //         },
        //         success: function (result) {
        //             console.log(result);//打印服务端返回的数据(调试用)
        //             if (result.resultCode == 200) {
        //                 alert("SUCCESS");
        //             }
        //             ;
        //         },
        //         error : function() {
        //             alert("异常！");
        //         }
        //     });
        // },
        close() {
            let _this = this;
            _this.$emit('close' )
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
        addSubmit() {
            let _this = this;
            // let params = new URLSearchParams();
            //    for(var key in _this.addForm){
            //        params.append(key,_this.addForm[key])
            // }
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
            formData.append('pictures', _this.addForm.pictures[0])
            // addGoods(_this, formData)
            _this.$ajax.post(`/api/goodss`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
</style>
